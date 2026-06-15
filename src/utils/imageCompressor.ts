export interface CompressionResult {
  blob: Blob;
  quality: number;
  iterations?: number;
  size: number;
  scale?: number;
}

// @ts-ignore
import { jsPDF } from "jspdf";

async function addSafePadding(blob: Blob, targetBytes: number): Promise<Blob> {
  const currentSize = blob.size;
  if (currentSize >= targetBytes) return blob;
  
  // Safe padding: append null bytes after the JPEG EOI (End of Image) marker
  const diff = targetBytes - currentSize;
  const padding = new Uint8Array(diff);
  padding.fill(0);
  
  return new Blob([blob, padding], { type: blob.type });
}

function drawDownscaled(ctx: CanvasRenderingContext2D, img: HTMLImageElement | HTMLCanvasElement, targetWidth: number, targetHeight: number) {
  let curWidth = img.width;
  let curHeight = img.height;
  
  // If downscaling by a factor greater than 2, use step-down scaling to prevent aliasing/blur
  if (curWidth / targetWidth > 2 || curHeight / targetHeight > 2) {
    let tempCanvas = document.createElement('canvas');
    let tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) {
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
      return;
    }
    tempCanvas.width = curWidth;
    tempCanvas.height = curHeight;
    tempCtx.drawImage(img, 0, 0, curWidth, curHeight);
    
    while (curWidth / targetWidth > 2 || curHeight / targetHeight > 2) {
      curWidth = Math.max(targetWidth, curWidth / 2);
      curHeight = Math.max(targetHeight, curHeight / 2);
      let nextCanvas = document.createElement('canvas');
      nextCanvas.width = curWidth;
      nextCanvas.height = curHeight;
      let nextCtx = nextCanvas.getContext('2d');
      if (!nextCtx) break;
      nextCtx.imageSmoothingEnabled = true;
      nextCtx.imageSmoothingQuality = 'high';
      nextCtx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, curWidth, curHeight);
      tempCanvas = nextCanvas;
    }
    ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, targetWidth, targetHeight);
  } else {
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
  }
}

export async function compressToTarget(
  f: File,
  t: number,
  m: number = 12, // Increased iterations for more precision
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | 'auto' = 'auto'
): Promise<CompressionResult> {
  const isPdf = targetFormat === 'application/pdf';
  const actualFormat = isPdf ? 'image/jpeg' : (targetFormat === 'auto' ? (f.type === 'image/png' ? 'image/png' : f.type === 'image/webp' ? 'image/webp' : 'image/jpeg') : targetFormat);
  
  // Target in bytes. We use a 5% margin (0.95) to stay strictly under the limit.
  // This guarantees that 1 "Binary MB" (1048576 * 0.95 = 996147 bytes) is always LESS than 1 "Metric MB" (1,000,000 bytes).
  const _t = t * 1024 * 0.95;
  
  const _i = await (async (file: File): Promise<HTMLImageElement> => {
    return new Promise((r, j) => {
      const rd = new FileReader();
      rd.onload = (e) => {
        const i = new Image();
        i.onload = () => r(i);
        i.onerror = j;
        i.src = e.target?.result as string;
      };
      rd.onerror = j;
      rd.readAsDataURL(file);
    });
  })(f);
  
  const _g = async (i: HTMLImageElement, q: number, s: number = 1.0): Promise<Blob> => {
    return new Promise((r, j) => {
      const c = document.createElement('canvas');
      const w = Math.max(1, i.width * s);
      const h = Math.max(1, i.height * s);
      c.width = w;
      c.height = h;
      const x = c.getContext('2d');
      if (!x) return j(new Error("Canvas context could not be created."));
      
      if (actualFormat === 'image/jpeg') {
        x.fillStyle = '#FFFFFF';
        x.fillRect(0, 0, w, h);
      }
      
      x.imageSmoothingEnabled = true;
      x.imageSmoothingQuality = 'high';
      drawDownscaled(x, i, w, h);
      c.toBlob((b) => b ? r(b) : j(), actualFormat, q);
    });
  };

  // 1. Initial check at 100% quality
  const ib = await _g(_i, 1.0, 1.0);
  
  if (ib.size > _t) {
    // --- COMPRESSION MODE ---
    let targetDim = 1600; // Default max dimension
    if (t <= 30) targetDim = 800;
    else if (t <= 100) targetDim = 1200;
    else if (t <= 500) targetDim = 2000;

    const currentMax = Math.max(_i.width, _i.height);
    let startScale = currentMax > targetDim ? targetDim / currentMax : 1.0;

    let lowQ = 0.3, highQ = 1.0, bestBlob: Blob | null = null, bestQ = 1.0, bestS = startScale, it = 0;

    // First attempt: Fixed scale, binary search quality
    while (it < m / 2) {
      it++;
      const midQ = (lowQ + highQ) / 2;
      const b = await _g(_i, midQ, startScale);
      if (b.size <= _t) {
        bestBlob = b; bestQ = midQ; bestS = startScale; lowQ = midQ;
      } else {
        highQ = midQ;
      }
    }

    // Second attempt: If quality is still too low (< 0.6), reduce scale instead of quality
    if (!bestBlob || bestQ < 0.6) {
      let lowS = 0.1, highS = startScale;
      while (it < m) {
        it++;
        const midS = (lowS + highS) / 2;
        const b = await _g(_i, 0.85, midS); 
        if (b.size <= _t) {
          bestBlob = b; bestQ = 0.85; bestS = midS; lowS = midS;
        } else {
          highS = midS;
        }
      }
    }

    if (!bestBlob) {
      throw new Error("Target is physically impossible for this image at this resolution. Try a higher KB limit.");
    }

    // Apply padding for ALL formats to guarantee exact size even in compression mode
    bestBlob = await addSafePadding(bestBlob, Math.floor(_t));

    if (isPdf) {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(bestBlob as Blob);
      });
      
      const w = _i.width * bestS;
      const h = _i.height * bestS;
      const pdf = new jsPDF({
        orientation: w > h ? 'l' : 'p',
        unit: 'px',
        format: [w, h]
      });
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, w, h);
      bestBlob = pdf.output('blob');
    }

    return { blob: bestBlob, quality: bestQ, iterations: it, size: bestBlob.size, scale: bestS };

  } else {
    // --- ENHANCEMENT MODE (Upsize) ---
    let l = 1.0, h = 4.0, bb: Blob = ib, bs = 1.0, it = 0;
    while (it < m) {
      it++;
      const md = (l + h) / 2;
      const b = await _g(_i, 1.0, md);
      if (b.size <= Math.floor(_t)) {
        bb = b; bs = md; l = md;
      } else {
        h = md;
      }
      if (h - l < 0.02) break;
    }
    
    // Apply padding for ALL formats to guarantee exact size
    bb = await addSafePadding(bb, Math.floor(_t));
    
    if (isPdf) {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(bb);
      });
      
      const w = _i.width * bs;
      const h = _i.height * bs;
      const pdf = new jsPDF({
        orientation: w > h ? 'l' : 'p',
        unit: 'px',
        format: [w, h]
      });
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, w, h);
      bb = pdf.output('blob');
    }
    
    return { blob: bb, quality: 1.0, iterations: it, size: bb.size, scale: bs };
  }
}

export async function convertFormat(
  f: File,
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf',
  quality: number = 0.92
): Promise<CompressionResult> {
  const isPdf = targetFormat === 'application/pdf';
  const actualFormat = isPdf ? 'image/jpeg' : targetFormat;
  const _i = await (async (file: File): Promise<HTMLImageElement> => {
    return new Promise((r, j) => {
      const rd = new FileReader();
      rd.onload = (e) => {
        const i = new Image();
        i.onload = () => r(i);
        i.onerror = j;
        i.src = e.target?.result as string;
      };
      rd.onerror = j;
      rd.readAsDataURL(file);
    });
  })(f);
  
  return new Promise((r, j) => {
    const c = document.createElement('canvas');
    c.width = _i.width;
    c.height = _i.height;
    const x = c.getContext('2d');
    if (!x) return j(new Error("Canvas context could not be created."));
    
    if (actualFormat === 'image/jpeg') {
      x.fillStyle = '#FFFFFF';
      x.fillRect(0, 0, c.width, c.height);
    }
    
    x.imageSmoothingEnabled = true;
    x.imageSmoothingQuality = 'high';
    drawDownscaled(x, _i, c.width, c.height);
    c.toBlob(async (b) => {
      if (!b) return j();
      if (isPdf) {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(b);
        });
        
        const pdf = new jsPDF({
          orientation: c.width > c.height ? 'l' : 'p',
          unit: 'px',
          format: [c.width, c.height]
        });
        
        pdf.addImage(dataUrl, 'JPEG', 0, 0, c.width, c.height);
        const pdfBlob = pdf.output('blob');
        return r({ blob: pdfBlob, quality: quality, iterations: 1, size: pdfBlob.size, scale: 1.0 });
      }
      return r({ blob: b, quality: quality, iterations: 1, size: b.size, scale: 1.0 });
    }, actualFormat, quality);
  });
}

export async function resizeImageExact(
  f: File,
  width: number,
  height: number,
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | 'auto' = 'auto',
  quality: number = 0.92
): Promise<CompressionResult> {
  const isPdf = targetFormat === 'application/pdf';
  const actualFormat = isPdf ? 'image/jpeg' : (targetFormat === 'auto' ? (f.type === 'image/png' ? 'image/png' : f.type === 'image/webp' ? 'image/webp' : 'image/jpeg') : targetFormat);
  
  const _i = await (async (file: File): Promise<HTMLImageElement> => {
    return new Promise((r, j) => {
      const rd = new FileReader();
      rd.onload = (e) => {
        const i = new Image();
        i.onload = () => r(i);
        i.onerror = j;
        i.src = e.target?.result as string;
      };
      rd.onerror = j;
      rd.readAsDataURL(file);
    });
  })(f);
  
  return new Promise((r, j) => {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    const x = c.getContext('2d');
    if (!x) return j(new Error("Canvas context could not be created."));
    
    if (actualFormat === 'image/jpeg') {
      x.fillStyle = '#FFFFFF';
      x.fillRect(0, 0, c.width, c.height);
    }
    
    x.imageSmoothingEnabled = true;
    x.imageSmoothingQuality = 'high';
    drawDownscaled(x, _i, width, height);
    c.toBlob(async (b) => {
      if (!b) return j();
      
      if (isPdf) {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(b);
        });
        
        const pdf = new jsPDF({
          orientation: width > height ? 'l' : 'p',
          unit: 'px',
          format: [width, height]
        });
        
        pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
        const pdfBlob = pdf.output('blob');
        return r({ blob: pdfBlob, quality: quality, iterations: 1, size: pdfBlob.size, scale: 1.0 });
      }
      
      return r({ blob: b, quality: quality, iterations: 1, size: b.size, scale: 1.0 });
    }, actualFormat, quality);
  });
}

export async function resizeAndCompressExact(
  f: File,
  width: number,
  height: number,
  t: number,
  m: number = 12,
  targetFormat: 'image/jpeg' | 'image/png' | 'image/webp' | 'application/pdf' | 'auto' = 'auto'
): Promise<CompressionResult> {
  const isPdf = targetFormat === 'application/pdf';
  const actualFormat = isPdf ? 'image/jpeg' : (targetFormat === 'auto' ? (f.type === 'image/png' ? 'image/png' : f.type === 'image/webp' ? 'image/webp' : 'image/jpeg') : targetFormat);
  
  const _t = t * 1024 * 0.95; // Target in bytes with 5% safety margin
  
  const _i = await (async (file: File): Promise<HTMLImageElement> => {
    return new Promise((r, j) => {
      const rd = new FileReader();
      rd.onload = (e) => {
        const i = new Image();
        i.onload = () => r(i);
        i.onerror = j;
        i.src = e.target?.result as string;
      };
      rd.onerror = j;
      rd.readAsDataURL(file);
    });
  })(f);
  
  const _g = async (i: HTMLImageElement, q: number): Promise<Blob> => {
    return new Promise((r, j) => {
      const c = document.createElement('canvas');
      c.width = width;
      c.height = height;
      const x = c.getContext('2d');
      if (!x) return j(new Error("Canvas context could not be created."));
      
      if (actualFormat === 'image/jpeg') {
        x.fillStyle = '#FFFFFF';
        x.fillRect(0, 0, width, height);
      }
      
      x.imageSmoothingEnabled = true;
      x.imageSmoothingQuality = 'high';
      drawDownscaled(x, i, width, height);
      c.toBlob((b) => b ? r(b) : j(), actualFormat, q);
    });
  };

  // Check size at 100% quality with exact dimensions
  const ib = await _g(_i, 1.0);
  
  let bestBlob: Blob | null = null;
  let bestQ = 1.0;
  let it = 0;

  if (ib.size > _t) {
    // Binary search for quality
    let lowQ = 0.05, highQ = 1.0;
    while (it < m) {
      it++;
      const midQ = (lowQ + highQ) / 2;
      const b = await _g(_i, midQ);
      if (b.size <= _t) {
        bestBlob = b; bestQ = midQ; lowQ = midQ;
      } else {
        highQ = midQ;
      }
    }
    
    if (!bestBlob) {
      // Fallback to lowest quality if target is extremely strict
      bestBlob = await _g(_i, 0.05);
      bestQ = 0.05;
    }
  } else {
    // It's already smaller than target, just pad it if needed
    bestBlob = ib;
  }

  // Apply padding to guarantee exact target size if needed
  bestBlob = await addSafePadding(bestBlob, Math.floor(_t));

  if (isPdf) {
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(bestBlob as Blob);
    });
    
    const pdf = new jsPDF({
      orientation: width > height ? 'l' : 'p',
      unit: 'px',
      format: [width, height]
    });
    
    pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
    bestBlob = pdf.output('blob');
  }

  return { blob: bestBlob, quality: bestQ, iterations: it, size: bestBlob.size, scale: 1.0 };
}
