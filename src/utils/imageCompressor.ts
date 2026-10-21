// @ts-ignore
import { jsPDF } from 'jspdf';

export interface CompressionResult {
  blob: Blob;
  size: number;
  quality: number;
  width: number;
  height: number;
  iterations?: number;
  scale?: number;
}

export type FitMode = 'cover' | 'contain' | 'stretch';

/**
 * Loads a File or Blob into an HTMLImageElement safely using ObjectURLs
 */
async function loadImage(file: File | Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to decode image file.'));
    };
    img.src = url;
  });
}

/**
 * Multi-step high-quality downscaling with smart aspect-ratio handling:
 * - 'cover': Center-crops to fill targetW x targetH (zero facial squishing on 1:1 / 3:4 photos)
 * - 'contain': Letterboxes onto pure #FFFFFF white background (never clips signature edges)
 * - 'stretch': Legacy direct stretch
 */
function renderToCanvas(
  img: HTMLImageElement,
  targetW: number,
  targetH: number,
  fillWhite: boolean = true,
  fitMode: FitMode = 'cover'
): HTMLCanvasElement {
  // Compute source crop rectangle or destination letterbox rectangle
  let sx = 0,
    sy = 0,
    sw = img.width,
    sh = img.height;
  let dx = 0,
    dy = 0,
    dw = targetW,
    dh = targetH;

  const srcRatio = img.width / img.height;
  const dstRatio = targetW / targetH;

  if (fitMode === 'cover' && Math.abs(srcRatio - dstRatio) > 0.01) {
    if (srcRatio > dstRatio) {
      // Source is wider than target: crop left/right
      sw = Math.round(img.height * dstRatio);
      sx = Math.round((img.width - sw) / 2);
    } else {
      // Source is taller than target: crop top/bottom (bias slightly toward top for headshots)
      sh = Math.round(img.width / dstRatio);
      sy = Math.round((img.height - sh) * 0.35);
    }
  } else if (fitMode === 'contain' && Math.abs(srcRatio - dstRatio) > 0.01) {
    if (srcRatio > dstRatio) {
      dh = Math.max(1, Math.round(targetW / srcRatio));
      dy = Math.round((targetH - dh) / 2);
    } else {
      dw = Math.max(1, Math.round(targetH * srcRatio));
      dx = Math.round((targetW - dw) / 2);
    }
  }

  // Step-down halving for crisp Lanczos-like anti-aliasing when shrinking >2x
  let curCanvas = document.createElement('canvas');
  let curW = sw;
  let curH = sh;
  curCanvas.width = curW;
  curCanvas.height = curH;
  const curCtx = curCanvas.getContext('2d');
  if (!curCtx) return curCanvas;

  if (fillWhite) {
    curCtx.fillStyle = '#FFFFFF';
    curCtx.fillRect(0, 0, curW, curH);
  }
  curCtx.drawImage(img, sx, sy, sw, sh, 0, 0, curW, curH);

  while (curW * 0.5 > dw && curH * 0.5 > dh) {
    const nextW = Math.max(dw, Math.floor(curW * 0.5));
    const nextH = Math.max(dh, Math.floor(curH * 0.5));
    const nextCanvas = document.createElement('canvas');
    nextCanvas.width = nextW;
    nextCanvas.height = nextH;
    const nextCtx = nextCanvas.getContext('2d');
    if (!nextCtx) break;
    nextCtx.imageSmoothingEnabled = true;
    nextCtx.imageSmoothingQuality = 'high';
    nextCtx.drawImage(curCanvas, 0, 0, curW, curH, 0, 0, nextW, nextH);
    curCanvas.width = 0;
    curCanvas.height = 0;
    curCanvas = nextCanvas;
    curW = nextW;
    curH = nextH;
  }

  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = targetW;
  finalCanvas.height = targetH;
  const finalCtx = finalCanvas.getContext('2d');
  if (!finalCtx) return curCanvas;

  if (fillWhite) {
    finalCtx.fillStyle = '#FFFFFF';
    finalCtx.fillRect(0, 0, targetW, targetH);
  }
  finalCtx.imageSmoothingEnabled = true;
  finalCtx.imageSmoothingQuality = 'high';
  finalCtx.drawImage(curCanvas, 0, 0, curW, curH, dx, dy, dw, dh);

  curCanvas.width = 0;
  curCanvas.height = 0;

  return finalCanvas;
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Canvas encoding failed.'))),
      mimeType,
      quality
    );
  });
}

/**
 * Injects 300 DPI (or custom DPI) into the JFIF APP0 header (0xFFE0) of a JPEG Blob.
 * Satisfies NSDL / UTIITSL PAN Card & strict government scanner DPI checks.
 */
export async function injectJpegDpi(jpegBlob: Blob, dpi: number = 300): Promise<Blob> {
  if (jpegBlob.type !== 'image/jpeg') return jpegBlob;
  const buffer = await jpegBlob.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Check SOI (0xFFD8) and APP0 (0xFFE0) with "JFIF\0" magic
  if (
    bytes.length > 20 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff &&
    bytes[3] === 0xe0 &&
    bytes[6] === 0x4a && // J
    bytes[7] === 0x46 && // F
    bytes[8] === 0x49 && // I
    bytes[9] === 0x46 && // F
    bytes[10] === 0x00
  ) {
    bytes[13] = 1; // Density units: 1 = dots per inch (DPI)
    bytes[14] = (dpi >> 8) & 0xff; // Xdensity MSB
    bytes[15] = dpi & 0xff; // Xdensity LSB
    bytes[16] = (dpi >> 8) & 0xff; // Ydensity MSB
    bytes[17] = dpi & 0xff; // Ydensity LSB
    return new Blob([bytes], { type: 'image/jpeg' });
  }
  return jpegBlob;
}

/**
 * Safely pads a JPEG blob using standard 0xFFFE (COM - Comment) segments before 0xFFD9 (EOI).
 * Ensures tiny 140x60px signatures (~2.5KB) safely reach the 10KB-20KB window (e.g., ~13.5KB)
 * without altering pixel dimensions or corrupting strict JPEG parsers.
 */
export async function padJpegToTargetBytes(jpegBlob: Blob, targetBytes: number): Promise<Blob> {
  if (jpegBlob.type !== 'image/jpeg' || jpegBlob.size >= targetBytes) {
    return jpegBlob;
  }

  const buffer = await jpegBlob.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    return jpegBlob;
  }

  // Locate final EOI marker (0xFFD9)
  let eoiIndex = bytes.length - 2;
  for (let i = bytes.length - 2; i >= 2; i--) {
    if (bytes[i] === 0xff && bytes[i + 1] === 0xd9) {
      eoiIndex = i;
      break;
    }
  }

  let remaining = targetBytes - bytes.length;
  const chunks: (Uint8Array | Blob)[] = [bytes.subarray(0, eoiIndex)];

  // Each COM segment: [0xFF, 0xFE, lenMSB, lenLSB, ...payload]
  while (remaining > 4) {
    const segTotal = Math.min(remaining, 60000);
    const payloadLen = segTotal - 4;
    const lengthField = payloadLen + 2; // includes the 2 length bytes

    const comSegment = new Uint8Array(segTotal);
    comSegment[0] = 0xff;
    comSegment[1] = 0xfe;
    comSegment[2] = (lengthField >> 8) & 0xff;
    comSegment[3] = lengthField & 0xff;
    // Fill payload with deterministic ASCII '0' (0x30)
    comSegment.fill(0x30, 4);

    chunks.push(comSegment);
    remaining -= segTotal;
  }

  chunks.push(bytes.subarray(eoiIndex));
  return new Blob(chunks, { type: 'image/jpeg' });
}

function wrapImageInPdf(dataUrl: string, width: number, height: number): Blob {
  const orientation = width > height ? 'l' : 'p';
  const doc = new jsPDF({
    orientation,
    unit: 'px',
    format: [width, height],
  });
  doc.addImage(dataUrl, 'JPEG', 0, 0, width, height);
  return doc.output('blob');
}

/**
 * Core Target-Lock Binary Search Engine (used by Compressor.astro & KB routes)
 */
export async function compressToTarget(
  file: File,
  targetKB: number,
  maxIterations: number = 12,
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | 'auto' = 'auto'
): Promise<CompressionResult> {
  const img = await loadImage(file);
  const targetBytes = Math.floor(targetKB * 1024 * 0.96); // 4% safety buffer under ceiling
  const minFloorBytes = Math.floor(targetKB * 1024 * 0.85);

  const isPdf = outputFormat === 'application/pdf';
  const actualMime =
    outputFormat === 'auto'
      ? file.type === 'image/webp'
        ? 'image/webp'
        : 'image/jpeg'
      : isPdf
      ? 'image/jpeg'
      : outputFormat === 'image/png'
      ? 'image/jpeg' // PNG is lossless; use JPEG quantization if user requests exact KB target
      : outputFormat;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const maxSafeDim = isMobile ? 2560 : 4096;

  let curW = img.width;
  let curH = img.height;
  if (curW > maxSafeDim || curH > maxSafeDim) {
    const ratio = Math.min(maxSafeDim / curW, maxSafeDim / curH);
    curW = Math.max(1, Math.round(curW * ratio));
    curH = Math.max(1, Math.round(curH * ratio));
  }

  // Check if upsizing / enhancement is requested (file is already smaller than targetKB)
  const initialCanvas = renderToCanvas(img, curW, curH, true, 'stretch');
  let maxQualityBlob = await canvasToBlob(initialCanvas, actualMime, 0.98);
  if (isPdf) {
    maxQualityBlob = wrapImageInPdf(initialCanvas.toDataURL('image/jpeg', 0.95), curW, curH);
  }

  if (maxQualityBlob.size < minFloorBytes && !isPdf) {
    initialCanvas.width = 0;
    initialCanvas.height = 0;
    const dpiBlob = await injectJpegDpi(maxQualityBlob, 300);
    const paddedBlob = await padJpegToTargetBytes(dpiBlob, Math.floor(targetKB * 1024 * 0.94));
    return {
      blob: paddedBlob,
      size: paddedBlob.size,
      quality: 0.98,
      width: curW,
      height: curH,
      iterations: 1,
      scale: 1.0,
    };
  }
  initialCanvas.width = 0;
  initialCanvas.height = 0;

  let bestBlob: Blob | null = null;
  let bestQuality = 0.85;
  let bestW = curW;
  let bestH = curH;
  let totalIterations = 0;

  // Outer loop scales dimensions down if even quality=0.15 is still above targetBytes
  for (let scaleStep = 0; scaleStep < 6; scaleStep++) {
    const canvas = renderToCanvas(img, curW, curH, true, 'stretch');

    let low = 0.08;
    let high = 0.96;
    const iters = Math.max(6, Math.floor(maxIterations / (scaleStep === 0 ? 1 : 2)));

    for (let i = 0; i < iters; i++) {
      totalIterations++;
      const mid = (low + high) / 2;
      let candidate: Blob;

      if (isPdf) {
        const dataUrl = canvas.toDataURL('image/jpeg', mid);
        candidate = wrapImageInPdf(dataUrl, curW, curH);
      } else {
        candidate = await canvasToBlob(canvas, actualMime, mid);
      }

      if (candidate.size <= targetBytes) {
        bestBlob = candidate;
        bestQuality = mid;
        bestW = curW;
        bestH = curH;
        low = mid; // Try higher quality while staying under ceiling
        if (candidate.size >= targetBytes * 0.9) break;
      } else {
        high = mid;
      }
    }

    canvas.width = 0;
    canvas.height = 0;

    if (bestBlob && bestBlob.size <= targetBytes) {
      break;
    }

    // Scale dimensions down by 75% and retry binary search
    curW = Math.max(60, Math.round(curW * 0.75));
    curH = Math.max(60, Math.round(curH * 0.75));
  }

  // Fallback if still too large
  if (!bestBlob) {
    const fallbackCanvas = renderToCanvas(img, curW, curH, true, 'stretch');
    bestBlob = isPdf
      ? wrapImageInPdf(fallbackCanvas.toDataURL('image/jpeg', 0.05), curW, curH)
      : await canvasToBlob(fallbackCanvas, actualMime, 0.05);
    fallbackCanvas.width = 0;
    fallbackCanvas.height = 0;
    bestQuality = 0.05;
  }

  if (!isPdf && bestBlob.type === 'image/jpeg') {
    bestBlob = await injectJpegDpi(bestBlob, 300);
  }

  return {
    blob: bestBlob,
    size: bestBlob.size,
    quality: bestQuality,
    width: bestW,
    height: bestH,
    iterations: totalIterations,
    scale: bestW / img.width,
  };
}

/**
 * Exact Pixel Resizer (used by Resizer.astro and International Visa/Passport pages)
 * Uses Center-Crop ('cover') by default so 1:1 and 35x45mm portraits never squish faces.
 */
export async function resizeImageExact(
  file: File,
  targetWidth: number,
  targetHeight: number,
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | 'auto' = 'auto',
  quality: number = 0.92,
  fitMode: FitMode = 'cover'
): Promise<CompressionResult> {
  const img = await loadImage(file);
  const isPdf = outputFormat === 'application/pdf';
  const actualMime =
    outputFormat === 'auto'
      ? file.type === 'image/png' || file.type === 'image/webp'
        ? file.type
        : 'image/jpeg'
      : isPdf
      ? 'image/jpeg'
      : outputFormat;

  const fillWhite = actualMime === 'image/jpeg' || isPdf;
  const canvas = renderToCanvas(img, targetWidth, targetHeight, fillWhite, fitMode);

  let blob: Blob;
  if (isPdf) {
    blob = wrapImageInPdf(canvas.toDataURL('image/jpeg', quality), targetWidth, targetHeight);
  } else {
    blob = await canvasToBlob(canvas, actualMime, quality);
    if (blob.type === 'image/jpeg') {
      blob = await injectJpegDpi(blob, 300);
    }
  }

  canvas.width = 0;
  canvas.height = 0;

  return {
    blob,
    size: blob.size,
    quality,
    width: targetWidth,
    height: targetHeight,
  };
}

/**
 * Combined Exact Pixel + Exact KB Resizer (used by ExamResizer.astro)
 * - Auto-selects 'cover' (center-crop) for photos and 'contain' (white-letterbox) for signatures
 * - Injects 300 DPI JFIF header for NSDL/UTIITSL PAN & exam portals
 * - Guarantees 140x60px signatures never fall below the 10KB portal rejection floor via 0xFFFE COM padding
 */
export async function resizeAndCompressExact(
  file: File,
  targetWidth: number,
  targetHeight: number,
  targetKB: number,
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg',
  fitMode?: FitMode,
  dpi: number = 300
): Promise<CompressionResult> {
  const img = await loadImage(file);

  // Auto-detect fit mode if not explicitly provided:
  // Wide aspect ratios (w/h >= 1.6 like 140x60 signatures or 800x400 declarations) use 'contain'
  // Portrait/square aspect ratios (like 350x350 UPSC, 213x213 PAN, 200x230 IBPS) use 'cover'
  const resolvedFit: FitMode =
    fitMode || (targetWidth / targetHeight >= 1.6 ? 'contain' : 'cover');

  const canvas = renderToCanvas(img, targetWidth, targetHeight, true, resolvedFit);

  const ceilingBytes = Math.floor(targetKB * 1024 * 0.96);
  // Safe minimum floor (82% of targetKB, ensuring a 15KB SSC signature lands around ~13.2KB, well above 10KB)
  const floorBytes = Math.floor(targetKB * 1024 * 0.82);

  let low = 0.05;
  let high = 0.98;
  let bestBlob: Blob | null = null;
  let bestQuality = 0.92;

  for (let i = 0; i < 10; i++) {
    const mid = (low + high) / 2;
    const candidate = await canvasToBlob(canvas, outputFormat, mid);

    if (candidate.size <= ceilingBytes) {
      bestBlob = candidate;
      bestQuality = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  if (!bestBlob) {
    bestBlob = await canvasToBlob(canvas, outputFormat, 0.05);
    bestQuality = 0.05;
  }

  canvas.width = 0;
  canvas.height = 0;

  if (outputFormat === 'image/jpeg') {
    bestBlob = await injectJpegDpi(bestBlob, dpi);
    // If tiny canvas dimensions (e.g., 140x60px signature = ~3KB) caused underflow below the portal floor,
    // elevate safely using a standard 0xFFFE COM marker to ~88% of targetKB.
    if (bestBlob.size < floorBytes) {
      const safeTargetBytes = Math.floor(targetKB * 1024 * 0.88);
      bestBlob = await padJpegToTargetBytes(bestBlob, safeTargetBytes);
    }
  }

  return {
    blob: bestBlob,
    size: bestBlob.size,
    quality: bestQuality,
    width: targetWidth,
    height: targetHeight,
  };
}

/**
 * Format Converter (used by FormatConverter.astro & MasterConverter.astro)
 */
export async function convertFormat(
  file: File,
  targetMime: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf',
  quality: number = 0.92
): Promise<CompressionResult> {
  const img = await loadImage(file);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const maxSafeDim = isMobile ? 2560 : 4096;

  let w = img.width;
  let h = img.height;
  if (w > maxSafeDim || h > maxSafeDim) {
    const ratio = Math.min(maxSafeDim / w, maxSafeDim / h);
    w = Math.max(1, Math.round(w * ratio));
    h = Math.max(1, Math.round(h * ratio));
  }

  const isPdf = targetMime === 'application/pdf';
  const fillWhite = targetMime === 'image/jpeg' || isPdf;
  const canvas = renderToCanvas(img, w, h, fillWhite, 'stretch');

  let blob: Blob;
  if (isPdf) {
    blob = wrapImageInPdf(canvas.toDataURL('image/jpeg', quality), w, h);
  } else {
    blob = await canvasToBlob(canvas, targetMime, quality);
    if (blob.type === 'image/jpeg') {
      blob = await injectJpegDpi(blob, 300);
    }
  }

  canvas.width = 0;
  canvas.height = 0;

  return {
    blob,
    size: blob.size,
    quality,
    width: w,
    height: h,
  };
}
