// src/data/blogPosts.ts

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishDate: string; // YYYY-MM-DD
  readTime: string;
  category: 'Exam Portals' | 'PDF Security' | 'Format Guides' | 'International Compliance';
  primaryKeyword: string;
  primaryToolHref: string;
  primaryToolName: string;
  relatedSlugs: string[];
  faqs: { q: string; a: string }[];
  contentHtml: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-resize-photo-and-signature-for-ssc-cgl-2026',
    title: 'How to Resize Photo (20–50KB) and Signature (10–20KB) for SSC CGL 2026 Without Losing Quality',
    description: 'Step-by-step technical guide to formatting your SSC CGL 2026 passport photo (3.5cm x 4.5cm, 20-50KB) and scanned signature (4.0cm x 2.0cm, 10-20KB) without blur.',
    publishDate: '2026-10-21',
    readTime: '6 min read',
    category: 'Exam Portals',
    primaryKeyword: 'resize photo and signature for ssc cgl',
    primaryToolHref: '/ssc-cgl-photo-resizer/',
    primaryToolName: 'SSC CGL Photo Resizer',
    relatedSlugs: [
      'upsc-photo-and-signature-size-requirements-350x350-guide',
      'how-to-increase-image-size-in-kb-without-photoshop'
    ],
    faqs: [
      {
        q: 'What is the exact photo and signature size for SSC CGL 2026?',
        a: 'SSC requires a JPEG photograph between 20KB and 50KB (3.5cm width by 4.5cm height, or 100x120 pixels) and a scanned signature between 10KB and 20KB (4.0cm width by 2.0cm height, or 140x60 pixels).'
      },
      {
        q: 'Why does the SSC portal reject my signature as blurred?',
        a: 'Signing with a faint ballpoint pen or photographing the signature in dim lighting causes thresholding artifacts when compressed to 15KB. Sign with a black gel or marker pen on white unruled paper and crop tightly around the ink.'
      }
    ],
    contentHtml: `
      <p>Every year, thousands of Staff Selection Commission (SSC) Combined Graduate Level (CGL), CHSL, MTS, and GD Constable applications are rejected due to non-compliant photographs and illegible signatures. The SSC online portal enforces strict automated validation on both pixel dimensions and kilobyte boundaries.</p>
      <h2>Official SSC CGL 2026 Photo & Signature Specifications</h2>
      <ul>
        <li><strong>Passport Photograph:</strong> 20 KB to 50 KB in JPEG/JPG format. Physical dimensions: 3.5 cm (width) × 4.5 cm (height), corresponding to 100 × 120 pixels at standard portal density.</li>
        <li><strong>Scanned Signature:</strong> 10 KB to 20 KB in JPEG/JPG format. Physical dimensions: 4.0 cm (width) × 2.0 cm (height), corresponding to 140 × 60 pixels.</li>
        <li><strong>Facial Compliance Rules:</strong> No cap, no spectacles or tinted glasses, both ears visible, and a plain light/white background.</li>
      </ul>
      <h2>Step-by-Step: Formatting Your SSC Photo & Signature Locally</h2>
      <p>Instead of manually guessing quality sliders in desktop software, use our dedicated <a href="/ssc-cgl-photo-resizer/">SSC CGL Photo Resizer</a> and <a href="/ssc-cgl-signature-resizer/">SSC CGL Signature Resizer</a>. Our client-side binary search locks your photograph to ~35KB and your signature to ~15KB in under one second—without uploading your personal identity documents to any server.</p>
      <p>If your cropped signature drops below the 10KB minimum limit (for example, 6KB), use our <a href="/increase-image-size-in-kb/">Increase Image Size in KB</a> tool to safely pad the JPEG luminance table up to 15KB.</p>
    `
  }
];
