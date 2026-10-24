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

declare global {
  interface Window {
    UTIF?: any;
  }
}

async function ensureUtifLoaded(): Promise<any> {
  if (typeof window !== 'undefined' && window.UTIF) return window.UTIF;
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="UTIF.min.js"]');
    if (existing) {
      const check = setInterval(() => {
        if (window.UTIF) {
          clearInterval(check);
          resolve(window.UTIF);
        }
      }, 50);
      setTimeout(() => {
        clearInterval(check);
        reject(new Error('UTIF.js load timeout'));
      }, 8000);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/utif/3.1.0/UTIF.min.js';
    script.onload = () => resolve(window.UTIF);
    script.onerror = () => reject(new Error('Failed to load TIFF decoder library.'));
    document.head.appendChild(script);
  });
}

export function isTiffFile(file: File | Blob): boolean {
  if (file instanceof File) {
    const name = file.name.toLowerCase();
    if (file.type === 'image/tiff' || file.type === 'image/tif' || name.endsWith('.tiff') || name.endsWith('.tif')) {
      return true;
    }
  }
  return file.type === 'image/tiff' || file.type === 'image/tif';
}

/**
 * Loads any browser-supported image OR .tif/.tiff file into a drawable CanvasImageSource
 */
export async function loadImageSource(file: File | Blob): Promise<{
  source: CanvasImageSource;
  width: number;
  height: number;
  cleanup: () => void;
}> {
  if (isTiffFile(file)) {
    const UTIF = await ensureUtifLoaded();
    const buffer = await file.arrayBuffer();
    const ifds = UTIF.decode(buffer);
    if (!ifds || ifds.length === 0) {
      throw new Error('Failed to decode TIFF structure.');
    }
    UTIF.decodeImage(buffer, ifds[0]);
    const rgba = UTIF.toRGBA8(ifds[0]);
    const width = ifds[0].width;
    const height = ifds[0].height;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D context for TIFF decoding.');

    const imgData = ctx.createImageData(width, height);
    imgData.data.set(rgba);
    ctx.putImageData(imgData, 0, 0);

    return {
      source: canvas,
      width,
      height,
      cleanup: () => {
        canvas.width = 0;
        canvas.height = 0;
      }
    };
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      resolve({
        source: img,
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height,
        cleanup: () => URL.revokeObjectURL(objectUrl)
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to decode image file.'));
    };

    img.src = objectUrl;
  });
}

/**
 * High-performance bicubic-quality canvas renderer supporting FitMode (cover, contain, stretch)
 */
function renderToCanvas(
  img: CanvasImageSource,
  imgWidth: number,
  imgHeight: number,
  targetW: number,
  targetH: number,
  fillWhite: boolean = true,
  fitMode: FitMode = 'cover'
): HTMLCanvasElement {
  let sx = 0,
    sy = 0,
    sw = imgWidth,
    sh = imgHeight;
  let dx = 0,
    dy = 0,
    dw = targetW,
    dh = targetH;

  const srcRatio = imgWidth / imgHeight;
  const dstRatio = targetW / targetH;

  if (fitMode === 'cover' && Math.abs(srcRatio - dstRatio) > 0.01) {
    if (srcRatio > dstRatio) {
      sw = Math.round(imgHeight * dstRatio);
      sx = Math.round((imgWidth - sw) / 2);
    } else {
      sh = Math.round(imgWidth / dstRatio);
      sy = Math.round((imgHeight - sh) * 0.35); // Slight bias for portraits
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

  let curCanvas = document.createElement('canvas');
  curCanvas.width = sw;
  curCanvas.height = sh;
  const curCtx = curCanvas.getContext('2d');
  if (!curCtx) return curCanvas;

  curCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  let curW = sw;
  let curH = sh;

  // Step-down scaling (halving steps) to prevent aliasing
  while (curW / 2 > dw * 1.2 && curH / 2 > dh * 1.2) {
    const nextW = Math.max(dw, Math.round(curW / 2));
    const nextH = Math.max(dh, Math.round(curH / 2));
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

function wrapJpegDataUrlInPdf(dataUrl: string, width: number, height: number): Blob {
  const orientation = width > height ? 'l' : 'p';
  const pdf = new jsPDF({
    orientation,
    unit: 'px',
    format: [width, height]
  });
  pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
  return pdf.output('blob');
}

/**
 * Injects 300 DPI (or custom DPI) into the JFIF APP0 header (0xFFE0) of a JPEG Blob.
 */
export async function injectJpegDpi(jpegBlob: Blob, dpi: number = 300): Promise<Blob> {
  if (jpegBlob.type !== 'image/jpeg') return jpegBlob;
  const buffer = await jpegBlob.arrayBuffer();
  const bytes = new Uint8Array(buffer);

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
    bytes[13] = 0x01; // units: dots per inch
    bytes[14] = (dpi >> 8) & 0xff;
    bytes[15] = dpi & 0xff;
    bytes[16] = (dpi >> 8) & 0xff;
    bytes[17] = dpi & 0xff;
    return new Blob([bytes], { type: 'image/jpeg' });
  }

  // Prepend standard JFIF APP0 header if missing
  const jfif = new Uint8Array([
    0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01,
    (dpi >> 8) & 0xff, dpi & 0xff, (dpi >> 8) & 0xff, dpi & 0xff, 0x00, 0x00
  ]);
  const combined = new Uint8Array(2 + jfif.length + (bytes.length - 2));
  combined[0] = 0xff;
  combined[1] = 0xd8;
  combined.set(jfif, 2);
  combined.set(bytes.subarray(2), 2 + jfif.length);
  return new Blob([combined], { type: 'image/jpeg' });
}

export async function padJpegToTargetBytes(jpegBlob: Blob, targetBytes: number): Promise<Blob> {
  if (jpegBlob.type !== 'image/jpeg' || jpegBlob.size >= targetBytes) return jpegBlob;
  const buffer = await jpegBlob.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  const needed = targetBytes - bytes.length;
  if (needed < 5) return jpegBlob;

  const maxPayloadPerMarker = 65530;
  const chunks: Uint8Array[] = [];
  let remainingNeeded = needed;

  while (remainingNeeded >= 5) {
    const payloadLen = Math.min(remainingNeeded - 4, maxPayloadPerMarker);
    const marker = new Uint8Array(4 + payloadLen);
    const markerLengthField = 2 + payloadLen;
    marker[0] = 0xff;
    marker[1] = 0xfe; // COM marker
    marker[2] = (markerLengthField >> 8) & 0xff;
    marker[3] = markerLengthField & 0xff;
    marker.fill(0x20, 4); // Space characters
    chunks.push(marker);
    remainingNeeded -= (4 + payloadLen);
  }

  let totalChunkLen = 0;
  for (const c of chunks) totalChunkLen += c.length;

  const result = new Uint8Array(bytes.length + totalChunkLen);
  result.set(bytes.subarray(0, 2), 0);
  let offset = 2;
  for (const c of chunks) {
    result.set(c, offset);
    offset += c.length;
  }
  result.set(bytes.subarray(2), offset);
  return new Blob([result], { type: 'image/jpeg' });
}

export async function convertFormat(
  file: File,
  targetMime: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf',
  quality: number = 0.92
): Promise<CompressionResult> {
  const decoded = await loadImageSource(file);
  try {
    const { source, width: origW, height: origH } = decoded;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const maxSafeDim = isMobile ? 2560 : 4096;

    let w = origW;
    let h = origH;
    if (w > maxSafeDim || h > maxSafeDim) {
      const ratio = Math.min(maxSafeDim / w, maxSafeDim / h);
      w = Math.max(1, Math.round(w * ratio));
      h = Math.max(1, Math.round(h * ratio));
    }

    const isPdf = targetMime === 'application/pdf';
    const fillWhite = targetMime === 'image/jpeg' || isPdf;
    const canvas = renderToCanvas(source, origW, origH, w, h, fillWhite, 'stretch');

    let blob: Blob;
    if (isPdf) {
      blob = wrapJpegDataUrlInPdf(canvas.toDataURL('image/jpeg', quality), w, h);
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
      iterations: 1
    };
  } finally {
    decoded.cleanup();
  }
}

export async function compressToTarget(
  file: File,
  targetKB: number,
  maxIterations: number = 12,
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | 'auto' = 'auto'
): Promise<CompressionResult> {
  const targetBytes = Math.floor(targetKB * 1024);
  const actualMime =
    targetFormat === 'auto'
      ? isTiffFile(file)
        ? 'image/jpeg'
        : (file.type as any) || 'image/jpeg'
      : targetFormat;

  const encodeMime =
    actualMime === 'application/pdf' || actualMime === 'image/png' ? 'image/jpeg' : actualMime;

  const decoded = await loadImageSource(file);
  try {
    const { source, width: origW, height: origH } = decoded;

    let scale = 1.0;
    let bestBlob: Blob | null = null;
    let bestQuality = 0.85;
    let totalIterations = 0;

    for (let scaleStep = 0; scaleStep < 5; scaleStep++) {
      const curW = Math.max(16, Math.round(origW * scale));
      const curH = Math.max(16, Math.round(origH * scale));

      const canvas = document.createElement('canvas');
      canvas.width = curW;
      canvas.height = curH;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, curW, curH);
      ctx.drawImage(source, 0, 0, curW, curH);

      let minQ = 0.05;
      let maxQ = 0.96;
      let midQ = 0.75;

      for (let i = 0; i < maxIterations; i++) {
        totalIterations++;
        midQ = (minQ + maxQ) / 2;

        let candidateBlob: Blob;
        if (actualMime === 'application/pdf') {
          const dataUrl = canvas.toDataURL('image/jpeg', midQ);
          candidateBlob = wrapJpegDataUrlInPdf(dataUrl, curW, curH);
        } else {
          candidateBlob = await canvasToBlob(canvas, encodeMime, midQ);
        }

        if (candidateBlob.size <= targetBytes) {
          bestBlob = candidateBlob;
          bestQuality = midQ;
          minQ = midQ;
          if (candidateBlob.size >= targetBytes * 0.93) break;
        } else {
          maxQ = midQ;
        }
      }

      canvas.width = 0;
      canvas.height = 0;

      if (bestBlob && bestBlob.size <= targetBytes) {
        return {
          blob: bestBlob,
          size: bestBlob.size,
          quality: bestQuality,
          width: curW,
          height: curH,
          iterations: totalIterations
        };
      }

      scale *= 0.72;
    }

    const finalW = Math.max(16, Math.round(origW * scale));
    const finalH = Math.max(16, Math.round(origH * scale));
    const fallbackCanvas = document.createElement('canvas');
    fallbackCanvas.width = finalW;
    fallbackCanvas.height = finalH;
    const fCtx = fallbackCanvas.getContext('2d')!;
    fCtx.fillStyle = '#FFFFFF';
    fCtx.fillRect(0, 0, finalW, finalH);
    fCtx.drawImage(source, 0, 0, finalW, finalH);

    const fallbackBlob =
      actualMime === 'application/pdf'
        ? wrapJpegDataUrlInPdf(fallbackCanvas.toDataURL('image/jpeg', 0.1), finalW, finalH)
        : await canvasToBlob(fallbackCanvas, encodeMime, 0.1);

    fallbackCanvas.width = 0;
    fallbackCanvas.height = 0;

    return {
      blob: bestBlob || fallbackBlob,
      size: (bestBlob || fallbackBlob).size,
      quality: bestQuality,
      width: finalW,
      height: finalH,
      iterations: totalIterations
    };
  } finally {
    decoded.cleanup();
  }
}

export async function resizeImageExact(
  file: File,
  targetWidth: number,
  targetHeight: number,
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | 'auto' = 'auto',
  quality: number = 0.92,
  fitMode: FitMode = 'cover'
): Promise<CompressionResult> {
  const decoded = await loadImageSource(file);
  try {
    const { source, width: origW, height: origH } = decoded;
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
    const canvas = renderToCanvas(source, origW, origH, targetWidth, targetHeight, fillWhite, fitMode);

    let blob: Blob;
    if (isPdf) {
      blob = wrapJpegDataUrlInPdf(canvas.toDataURL('image/jpeg', quality), targetWidth, targetHeight);
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
      height: targetHeight
    };
  } finally {
    decoded.cleanup();
  }
}

export async function resizeAndCompressExact(
  file: File,
  targetWidth: number,
  targetHeight: number,
  targetKB: number,
  outputFormat: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg',
  fitMode?: FitMode,
  dpi: number = 300
): Promise<CompressionResult> {
  const decoded = await loadImageSource(file);
  try {
    const { source, width: origW, height: origH } = decoded;
    const resolvedFit: FitMode =
      fitMode || (targetWidth / targetHeight >= 1.6 ? 'contain' : 'cover');

    const canvas = renderToCanvas(source, origW, origH, targetWidth, targetHeight, true, resolvedFit);

    const ceilingBytes = Math.floor(targetKB * 1024 * 0.96);
    const floorBytes = Math.floor(targetKB * 1024 * 0.82);

    let low = 0.05;
    let high = 0.98;
    let bestBlob: Blob | null = null;
    let bestQuality = 0.92;

    for (let i = 0; i < 9; i++) {
      const mid = (low + high) / 2;
      const candidate = await canvasToBlob(canvas, outputFormat, mid);
      if (candidate.size <= ceilingBytes) {
        bestBlob = candidate;
        bestQuality = mid;
        low = mid;
        if (candidate.size >= floorBytes) break;
      } else {
        high = mid;
      }
    }

    let finalBlob = bestBlob || (await canvasToBlob(canvas, outputFormat, 0.05));
    if (outputFormat === 'image/jpeg') {
      finalBlob = await injectJpegDpi(finalBlob, dpi);
      if (finalBlob.size < floorBytes) {
        finalBlob = await padJpegToTargetBytes(finalBlob, floorBytes);
      }
    }

    canvas.width = 0;
    canvas.height = 0;

    return {
      blob: finalBlob,
      size: finalBlob.size,
      quality: bestQuality,
      width: targetWidth,
      height: targetHeight
    };
  } finally {
    decoded.cleanup();
  }
}
