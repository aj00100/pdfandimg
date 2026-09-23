/**
 * Central tool registry for dynamic internal linking.
 * Used by SmartRelatedTools component to show contextually relevant tools per page.
 */

export interface Tool {
  name: string;
  href: string;
  category: ToolCategory;
  desc: string;
}

export type ToolCategory = 
  | 'compress-image'
  | 'compress-pdf'
  | 'format-convert'
  | 'exam-resize'
  | 'resize-crop'
  | 'pdf-tools'
  | 'heic-convert'
  | 'visa-photo'
  | 'use-case';

export const allTools: Tool[] = [
  // Image Compression
  { name: 'Compress to 10KB', href: '/compress-image-to-10kb', category: 'compress-image', desc: 'Signature-size compression' },
  { name: 'Compress to 15KB', href: '/compress-image-to-15kb', category: 'compress-image', desc: 'Ultra-small avatar target' },
  { name: 'Compress to 20KB', href: '/compress-image-to-20kb', category: 'compress-image', desc: 'Signature & thumbnail standard' },
  { name: 'Compress to 30KB', href: '/compress-image-to-30kb', category: 'compress-image', desc: 'Exam application photos' },
  { name: 'Compress to 40KB', href: '/compress-image-to-40kb', category: 'compress-image', desc: 'State portal uploads' },
  { name: 'Compress to 50KB', href: '/compress-image-to-50kb', category: 'compress-image', desc: 'Passport & candidate photos' },
  { name: 'Compress to 100KB', href: '/compress-image-to-100kb', category: 'compress-image', desc: 'Professional profile standard' },
  { name: 'Compress to 200KB', href: '/compress-image-to-200kb', category: 'compress-image', desc: 'Certificate-grade photos' },
  { name: 'Compress to 500KB', href: '/compress-image-to-500kb', category: 'compress-image', desc: 'High-detail archive quality' },
  { name: 'Compress to 1MB', href: '/compress-image-to-1mb', category: 'compress-image', desc: 'Professional documents' },
  { name: 'Reduce Image Size in KB', href: '/reduce-image-size-in-kb', category: 'compress-image', desc: 'Custom target size reducer' },
  { name: 'Bulk Image Compressor', href: '/bulk-image-compressor', category: 'compress-image', desc: 'Batch compress multiple images' },
  { name: 'Increase Image Size in KB', href: '/increase-image-size-in-kb', category: 'compress-image', desc: 'Meet minimum KB requirements' },

  // PDF Compression
  { name: 'Compress PDF to 50KB', href: '/compress-pdf-to-50kb', category: 'compress-pdf', desc: 'Strict portal PDF limits' },
  { name: 'Compress PDF to 100KB', href: '/compress-pdf-to-100kb', category: 'compress-pdf', desc: 'Government portal PDFs' },
  { name: 'Compress PDF to 200KB', href: '/compress-pdf-to-200kb', category: 'compress-pdf', desc: 'Document submission PDFs' },
  { name: 'JPG to PDF 100KB', href: '/convert-jpg-to-pdf-100kb', category: 'compress-pdf', desc: 'Photo-to-PDF at exact 100KB' },
  { name: 'JPG to PDF 200KB', href: '/convert-jpg-to-pdf-200kb', category: 'compress-pdf', desc: 'Photo-to-PDF at exact 200KB' },

  // Format Converters
  { name: 'PNG to JPG', href: '/png-to-jpg', category: 'format-convert', desc: 'Lossless to compressed format' },
  { name: 'JPEG to PNG', href: '/jpeg-to-png', category: 'format-convert', desc: 'JPG to lossless PNG' },
  { name: 'JPG to PDF', href: '/jpg-to-pdf', category: 'format-convert', desc: 'Images to PDF documents' },
  { name: 'PNG to PDF', href: '/png-to-pdf', category: 'format-convert', desc: 'PNG images to PDF' },
  { name: 'WEBP to PDF', href: '/webp-to-pdf', category: 'format-convert', desc: 'Modern format to PDF' },
  { name: 'Photo PDF Converter', href: '/photo-pdf-converter', category: 'format-convert', desc: 'Master photo-to-PDF converter' },

  // HEIC Converters
  { name: 'HEIC to JPG', href: '/convert-heic-to-jpg', category: 'heic-convert', desc: 'iPhone photos to JPG' },
  { name: 'HEIC to PNG', href: '/convert-heic-to-png', category: 'heic-convert', desc: 'iPhone photos to PNG' },
  { name: 'HEIC to PDF', href: '/convert-heic-to-pdf', category: 'heic-convert', desc: 'iPhone photos to PDF' },

  // Advanced Format Converters
  { name: 'AVIF to JPG', href: '/avif-to-jpg', category: 'format-convert', desc: 'Next-gen AVIF to universal JPG' },
  { name: 'TIFF to JPG', href: '/tiff-to-jpg', category: 'format-convert', desc: 'Scanner/legal docs to JPG' },
  { name: 'BMP to JPG', href: '/bmp-to-jpg', category: 'format-convert', desc: 'Legacy bitmap to compressed JPG' },

  // Visa & Passport Photo Tools
  { name: 'Schengen Visa Photo', href: '/schengen-visa-photo-size', category: 'visa-photo', desc: '35×45mm EU visa photo resizer' },
  { name: 'Canada Visa Photo', href: '/canada-visa-photo-size', category: 'visa-photo', desc: 'IRCC-spec Canadian visa photos' },
  { name: 'Green Card Photo', href: '/green-card-photo-requirements', category: 'visa-photo', desc: 'USCIS 600×600px photo tool' },
  { name: 'Australian Passport Photo', href: '/australian-passport-photo-size', category: 'visa-photo', desc: 'AU passport 35-40×45-50mm' },

  // Indonesian Market (Kompres Foto)
  { name: 'Kompres Foto 200KB', href: '/id/kompres-foto-200kb', category: 'compress-image', desc: 'Kompres foto untuk CPNS & BUMN' },
  { name: 'Kompres Foto 100KB', href: '/id/kompres-foto-100kb', category: 'compress-image', desc: 'Kompres foto untuk pendaftaran online' },

  // Exam Resizers
  { name: 'IBPS Photo Resizer', href: '/ibps-photo-resizer', category: 'exam-resize', desc: 'Banking exam photos (20-50KB)' },
  { name: 'SSC CGL Photo Resizer', href: '/ssc-cgl-photo-resizer', category: 'exam-resize', desc: 'SSC photos (100x120px)' },
  { name: 'SSC CGL Signature', href: '/ssc-cgl-signature-resizer', category: 'exam-resize', desc: 'SSC signatures (140x60px)' },
  { name: 'NEET Photo Resizer', href: '/neet-photo-resizer', category: 'exam-resize', desc: 'NTA NEET exam photos' },
  { name: 'UPSC Photo Resizer', href: '/upsc-photo-resizer', category: 'exam-resize', desc: 'UPSC photos (350x350px)' },
  { name: 'GATE Photo Resizer', href: '/gate-photo-resizer', category: 'exam-resize', desc: 'GATE GOAPS portal photos' },
  { name: 'PAN Card Photo', href: '/pan-card-photo-resizer', category: 'exam-resize', desc: 'PAN card photos (213x213px)' },
  { name: 'Exam Photo Hub', href: '/exam-photo-resizer', category: 'exam-resize', desc: 'All exam photo tools' },

  // Resize & Crop
  { name: 'LinkedIn Image Optimizer', href: '/linkedin-image-optimizer', category: 'resize-crop', desc: 'Optimize & resize LinkedIn photos' },
  { name: 'Crop Image Online', href: '/crop-image-online', category: 'resize-crop', desc: 'Free-form image cropping' },
  { name: 'Passport Size Photo', href: '/passport-size-photo', category: 'resize-crop', desc: 'Official passport photo maker' },
  { name: 'Passport Photo 2x2', href: '/passport-photo-2x2', category: 'resize-crop', desc: 'US standard 2x2 passport photos' },
  { name: 'Passport Crop Tool', href: '/crop-image-to-passport-size', category: 'resize-crop', desc: 'Auto passport size cropper' },
  { name: 'Resize to Passport Size', href: '/resize-a-photo-to-passport-size', category: 'resize-crop', desc: 'Resize any photo to passport' },
  { name: 'Resize Image in Pixels', href: '/resize-image-in-pixels', category: 'resize-crop', desc: 'Exact pixel dimensions' },
  { name: 'Resize Image Dimensions', href: '/resize-image-dimensions', category: 'resize-crop', desc: 'Width & height resizer' },

  // PDF Tools (noindexed but still useful for internal linking)
  { name: 'Unlock PDF', href: '/unlock-pdf', category: 'pdf-tools', desc: 'Remove PDF restrictions locally' },
];

/**
 * Get related tools for a given page path.
 * Returns tools from the same category + 1-2 cross-category tools, excluding the current page.
 */
export function getRelatedTools(currentPath: string, maxCount = 6): Tool[] {
  const currentTool = allTools.find(t => t.href === currentPath);
  if (!currentTool) {
    // Fallback: return popular tools
    return allTools
      .filter(t => t.href !== currentPath)
      .filter(t => ['compress-image', 'exam-resize', 'resize-crop'].includes(t.category))
      .slice(0, maxCount);
  }

  // Same category tools (exclude self)
  const sameCategory = allTools
    .filter(t => t.category === currentTool.category && t.href !== currentPath);

  // Cross-category tools (popular picks from other categories)
  const crossCategory = allTools
    .filter(t => t.category !== currentTool.category && t.href !== currentPath)
    .filter(t => [
      '/compress-image-to-50kb',
      '/passport-size-photo',
      '/crop-image-online',
      '/jpg-to-pdf',
      '/exam-photo-resizer',
      '/reduce-image-size-in-kb',
      '/png-to-jpg',
      '/compress-pdf-to-100kb',
      '/avif-to-jpg',
      '/schengen-visa-photo-size',
    ].includes(t.href));

  // Take up to maxCount-2 from same category, then fill with cross-category
  const sameCategoryPicks = sameCategory.slice(0, maxCount - 2);
  const crossCategoryPicks = crossCategory
    .filter(t => !sameCategoryPicks.find(s => s.href === t.href))
    .slice(0, maxCount - sameCategoryPicks.length);

  return [...sameCategoryPicks, ...crossCategoryPicks].slice(0, maxCount);
}
