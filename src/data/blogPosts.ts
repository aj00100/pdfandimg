export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: string;
  category: string;
  primaryToolHref: string;
  primaryToolLabel: string;
  faqs: { q: string; a: string }[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-ssc-cgl-rejects-signature-uploads-and-how-to-fix-blurry-10kb-20kb-jpg',
    title: 'Why SSC CGL Rejects Signature Uploads (And How to Fix Blurry 10KB–20KB JPGs)',
    description: 'Complete technical breakdown of SSC OTR & CGL signature rejections: fixing blurry ink, dimensions (4.0cm × 2.0cm / 140×60 px), and hitting the strict 10KB–20KB window.',
    publishedAt: '2026-10-15',
    readTime: '7 min read',
    category: 'SSC Recruitment Guides',
    primaryToolHref: '/ssc-cgl-signature-resizer/',
    primaryToolLabel: 'Open SSC Signature Resizer (140×60px, 10–20KB)',
    faqs: [
      {
        q: 'Why does the SSC portal say "Invalid Signature Size" even when my file is 19KB?',
        a: 'SSC servers validate both byte size (10,240 to 20,480 bytes) and pixel aspect ratio (140×60 pixels or 4.0cm × 2.0cm). If your image has a vertical portrait orientation or exceeds 20,000 bytes due to EXIF camera metadata, the portal rejects it.'
      },
      {
        q: 'Can I sign with a blue ballpoint pen for SSC CGL 2026?',
        a: 'While some regional notices permit blue ink, official SSC One-Time Registration (OTR) guidelines strongly recommend black ink on pure white unruled paper to prevent automated contrast check failures.'
      },
      {
        q: 'Why does my signature become unreadable when compressed under 20KB?',
        a: 'Standard compression tools apply heavy 4:2:0 chroma subsampling across high-resolution smartphone photos (e.g., 4000×3000 px), turning thin ink strokes into blocky gray artifacts. Resizing dimensions to 140×60 px before applying DCT compression keeps ink edges razor-sharp at 15KB.'
      }
    ],
    content: `
      <p>Every year, tens of thousands of Staff Selection Commission (SSC) applications for CGL, CHSL, MTS, and GD Constable are flagged or rejected during scrutiny due to <strong>illegible, blurred, or improperly dimensioned signatures</strong>. Because the SSC One-Time Registration (OTR) portal enforces a narrow <strong>10KB to 20KB JPEG file size limit</strong> alongside a strict horizontal aspect ratio (4.0 cm × 2.0 cm), candidates using generic mobile compressors often destroy the legibility of their handwriting.</p>

      <h2>1. Official SSC Signature Specifications (2026 Statutory Matrix)</h2>
      <p>Before troubleshooting your image, verify that your scan complies with the exact parameters enforced by the SSC NIC upload validator:</p>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Official SSC Requirement</th>
            <th>Recommended Target-Lock Setting</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Physical Dimensions</strong></td>
            <td>4.0 cm (Width) × 2.0 cm (Height)</td>
            <td>2:1 Horizontal Aspect Ratio</td>
          </tr>
          <tr>
            <td><strong>Pixel Resolution</strong></td>
            <td>140 × 60 pixels (up to 280 × 120 px)</td>
            <td>140 × 60 px exact</td>
          </tr>
          <tr>
            <td><strong>File Size Window</strong></td>
            <td>10 KB to 20 KB</td>
            <td>15 KB – 18 KB (Safe Buffer)</td>
          </tr>
          <tr>
            <td><strong>File Format</strong></td>
            <td>JPEG / JPG only (.jpg / .jpeg)</td>
            <td>Baseline Standard JPEG (No PNG/WEBP)</td>
          </tr>
          <tr>
            <td><strong>Ink & Paper</strong></td>
            <td>Black/Blue ink on white unruled paper</td>
            <td>Black gel/ballpoint pen on bright white bond paper</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Top 4 Reasons SSC Rejects Signature Uploads</h2>
      <h3>A. Compressing Without Downscaling Dimensions First</h3>
      <p>A modern smartphone captures photos at 12MP to 48MP (roughly 4000 × 3000 pixels). If you force a 4000-pixel image down to 15KB without changing its pixel dimensions, the JPEG encoder must drop its quality factor below <code>Q=5</code>. This creates severe 8×8 macroblock artifacts around your pen strokes. By resizing the canvas to <strong>140 × 60 pixels</strong> first via our <a href="/ssc-cgl-signature-resizer/">SSC CGL Signature Resizer</a>, the file naturally drops under 18KB at <code>Q=92</code> quality.</p>

      <h3>B. Grey, Shadowed, or Ruled Notebook Backgrounds</h3>
      <p>Automated scrutiny bots run a histogram contrast check between the background paper and the foreground ink. If you photograph your signature indoors under warm yellow lighting or on lined notebook paper, the background registers as mid-tone grey rather than white. Always photograph your signature in natural daylight near a window, holding the phone slightly angled to avoid casting a hand shadow across the paper.</p>

      <h3>C. Signing in BLOCK / CAPITAL Letters</h3>
      <p>Per official SSC examination instructions, signatures written entirely in capital letters (e.g., <code>RAHUL SHARMA</code>) are treated as invalid and lead to summary rejection of the application form. Always use your running cursive signature.</p>

      <h3>D. Miniscule "Floating" Signatures Inside a Huge White Box</h3>
      <p>If your signature occupies less than 30% of the cropped rectangle because you left massive white margins around the ink, the printed admit card thumbnail will render your signature as a microscopic dot. Crop tightly around the outer edges of your signature, leaving only a 4-pixel to 6-pixel white border on all four sides.</p>

      <h2>3. Step-by-Step Fix Using Client-Side Target-Lock</h2>
      <ol>
        <li>Sign clearly with a black pen on a blank white sheet of paper.</li>
        <li>Crop tightly around the signature using the <a href="/crop-image-online/">Online Image Cropper</a> so the box is roughly twice as wide as it is tall.</li>
        <li>Open the <a href="/ssc-cgl-signature-resizer/">SSC CGL Signature Resizer</a> or the <a href="/compress-image-to-15kb/">15KB Image Compressor</a>.</li>
        <li>Upload your cropped signature. The tool automatically locks dimensions to 140×60 pixels and binary-searches the exact JPEG quantization table to land safely between 14KB and 18KB.</li>
      </ol>
    `
  },
  {
    slug: 'upsc-civil-services-otr-photo-signature-resize-guide-350x350-px',
    title: 'How to Format UPSC Civil Services & OTR Photos (350×350 to 1000×1000 px, 20–300KB)',
    description: 'Master the exact UPSC One-Time Registration (OTR) rules for IAS, IPS, NDA, and CDS: square 1:1 pixel bounding boxes, name/date placards, and 20KB–300KB JPG compression.',
    publishedAt: '2026-10-16',
    readTime: '8 min read',
    category: 'UPSC Portal Guides',
    primaryToolHref: '/upsc-photo-resizer/',
    primaryToolLabel: 'Open UPSC Photo & Signature Resizer',
    faqs: [
      {
        q: 'Why does the UPSC portal say "Image dimension should be between 350x350 and 1000x1000 pixels"?',
        a: 'Unlike SSC or IBPS which use rectangular passport ratios, UPSC enforces a strict 1:1 square aspect ratio for both photographs and signatures on its online portal, where both width and height must sit between 350 pixels and 1000 pixels.'
      },
      {
        q: 'Is it mandatory to print my name and date on the UPSC photograph in 2026?',
        a: 'Yes. Latest UPSC notifications require the candidate’s name and the date on which the photograph was taken to be clearly printed on the bottom of the portrait, with the face occupying at least 75% of the frame.'
      },
      {
        q: 'What happens if my 350x350 pixel UPSC photo is only 14KB?',
        a: 'The UPSC portal rejects any JPEG under 20KB (20,480 bytes). Either resize the photo to 500×500 pixels or run it through our Increase Image Size in KB tool to safely reach 45KB–100KB.'
      }
    ],
    content: `
      <p>The Union Public Service Commission (UPSC) operates one of the strictest image validation scripts in India across its One-Time Registration (OTR) portal for Civil Services (IAS/IPS), NDA, CDS, CAPF, and Engineering Services. Unlike virtually every other recruitment board that uses a rectangular 3.5cm × 4.5cm ratio, <strong>UPSC requires both your photograph and your signature to fit inside a 350×350 pixel to 1000×1000 pixel bounding box</strong> and weigh between <strong>20KB and 300KB</strong>.</p>

      <h2>1. Official UPSC 2026 Image Upload Specifications</h2>
      <table>
        <thead>
          <tr>
            <th>Document Type</th>
            <th>Allowed Pixel Dimensions</th>
            <th>Allowed File Size</th>
            <th>Ideal Calibration Target</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Passport Photograph</strong></td>
            <td>Min: 350 × 350 px<br/>Max: 1000 × 1000 px</td>
            <td>20 KB to 300 KB (JPG)</td>
            <td><strong>600 × 600 px</strong> at <strong>95 KB</strong></td>
          </tr>
          <tr>
            <td><strong>Scanned Signature</strong></td>
            <td>Min: 350 × 350 px<br/>Max: 1000 × 1000 px</td>
            <td>20 KB to 300 KB (JPG)</td>
            <td><strong>500 × 500 px</strong> at <strong>45 KB</strong></td>
          </tr>
          <tr>
            <td><strong>Photo ID Card Document</strong></td>
            <td>A4 Portrait PDF</td>
            <td>20 KB to 300 KB (PDF)</td>
            <td>Single-page PDF under <strong>150 KB</strong></td>
          </tr>
        </tbody>
      </table>

      <h2>2. Solving the "Under 20KB" Trap on 350×350 Signatures</h2>
      <p>Here is the most common technical failure UPSC aspirants face: when you resize a clean black-and-white signature to exactly <code>350 × 350 pixels</code>, a standard JPEG encoder compresses the large white areas so efficiently that the resulting file is only <strong>8KB to 14KB</strong>. When you upload it, the UPSC portal throws an error: <em>"File size must not be less than 20 KB."</em></p>
      <p>You have two ways to solve this immediately:</p>
      <ul>
        <li><strong>Use the UPSC Resizer Preset:</strong> Our <a href="/upsc-photo-resizer/">UPSC Photo & Signature Resizer</a> automatically calibrates the output quantization table and pixel density so your file lands comfortably between 40KB and 100KB—never dropping below the 20KB floor.</li>
        <li><strong>Use the KB Enhancer:</strong> If you already have a perfectly cropped 350×350px image that is too small in KB, upload it to our <a href="/increase-image-size-in-kb/">Increase Image Size in KB</a> utility and set the target to <strong>50KB</strong>.</li>
      </ul>

      <h2>3. The 75% Face Coverage & Name/Date Placard Rule</h2>
      <p>Recent UPSC Civil Services and NDA notifications mandate three visual rules that automated AI checks verify upon upload:</p>
      <ol>
        <li><strong>Three-Fourth (75%) Face Visibility:</strong> Do not upload a waist-up portrait. Your head (from the crown of the hair to the bottom of the chin) and upper shoulders must occupy roughly 75% of the total image area.</li>
        <li><strong>Name & Date Stamp:</strong> The bottom 15% of the photo must feature a clean white rectangular strip with your full name and the date the photo was taken (e.g., <code>AARAV VERMA | 12-10-2026</code>) written in clear black text.</li>
        <li><strong>Recency Rule:</strong> The photograph must not be more than 10 days old from the commencement of the online application window.</li>
      </ol>

      <h2>4. Formatting Your Photo ID PDF (20KB–300KB)</h2>
      <p>In addition to the JPG photo and signature, UPSC requires your Aadhaar Card, Voter ID, PAN Card, or Passport in <strong>PDF format between 20KB and 300KB</strong>. If you have a JPG scan of your ID card, use our <a href="/convert-jpg-to-pdf-100kb/">Convert JPG to PDF 100KB</a> tool to package it into an exact 100KB PDF in one click.</p>
    `
  },
  {
    slug: 'how-to-increase-image-size-in-kb-without-losing-quality',
    title: 'How to Increase Image Size in KB When Your Photo Is Below the Portal Minimum',
    description: 'Why WhatsApp photos and small signatures drop below 10KB or 20KB, and how to safely increase image size in KB using high-luma chroma encoding and super-sampling.',
    publishedAt: '2026-10-17',
    readTime: '6 min read',
    category: 'Image Optimization Technicals',
    primaryToolHref: '/increase-image-size-in-kb/',
    primaryToolLabel: 'Open Image KB Enhancer (Increase KB)',
    faqs: [
      {
        q: 'Why did my photo drop to 7KB after sending it over WhatsApp?',
        a: 'WhatsApp strips all EXIF metadata, downscales dimensions, and applies aggressive chroma subsampling to save mobile data, often shrinking cropped passport photos and signatures below 10KB.'
      },
      {
        q: 'Is it safe to increase image KB using zero-byte file padding?',
        a: 'No. Many government portals (including NIC, TCS iON, and UPSC) re-parse uploaded JPEGs using server-side libraries like ImageMagick or libjpeg. Zero-byte padding after the EOI (End of Image) marker is either stripped—causing the file to fail the minimum size check—or flagged as a corrupted/malicious payload.'
      },
      {
        q: 'How does PdfAndImg increase image KB safely?',
        a: 'Our engine re-encodes the image using a higher JPEG quality factor (up to Q=1.0 with 4:4:4 chroma retention) and, when necessary, performs bicubic canvas super-sampling so the extra bytes are genuine pixel data.'
      }
    ],
    content: `
      <p>Most people look for ways to shrink huge smartphone photos, but millions of applicants hit the exact opposite wall: <strong>"Uploaded file size is too small—minimum required size is 20KB."</strong> This happens constantly when you transfer a cropped passport photo via WhatsApp, crop a small signature on your phone, or export a low-resolution webcam snapshot.</p>

      <h2>1. Why Cropped Signatures and WhatsApp Photos Drop Below 10KB</h2>
      <p>JPEG compression works by dividing an image into 8×8 pixel blocks and applying the Discrete Cosine Transform (DCT). When an image contains mostly flat, uniform colors—such as the pure white background of a signature or the plain studio backdrop of a passport photo—high-frequency spatial data is nearly zero. As a result:</p>
      <ul>
        <li>A <code>140 × 60 px</code> signature saved at standard 75% quality often weighs only <strong>3.2 KB to 5.8 KB</strong>.</li>
        <li>A <code>200 × 230 px</code> passport photo forwarded over WhatsApp often weighs only <strong>8 KB to 14 KB</strong>.</li>
      </ul>
      <p>When you upload that 6KB signature to an IBPS, SSC, or State PSC portal that mandates a <strong>10KB minimum</strong> (or a UPSC portal that mandates a <strong>20KB minimum</strong>), the upload is blocked immediately.</p>

      <h2>2. Why "Null-Byte Padding" Tools Get Your Application Rejected</h2>
      <p>Many outdated online KB increasers take a lazy shortcut: they leave the compressed image untouched and append thousands of empty null bytes (<code>0x00</code>) or space characters after the JPEG End-Of-Image (<code>0xFFD9</code>) marker. This causes two serious problems on modern 2026 recruitment portals:</p>
      <ol>
        <li><strong>WAF & Security Rejection:</strong> Government Web Application Firewalls inspect binary headers and footers for steganography or injected payloads. Trailing data after the <code>0xFFD9</code> marker triggers a security "Corrupted Image File" error.</li>
        <li><strong>Server Re-Encoding Drop:</strong> Portals strip metadata upon ingestion. Once the dummy bytes are stripped, your file drops back to 6KB on the server and fails validation.</li>
      </ol>

      <h2>3. How Authentic Pixel-Level KB Enhancement Works</h2>
      <p>Instead of appending fake trailing bytes, our <a href="/increase-image-size-in-kb/">Increase Image Size in KB</a> tool uses a two-stage mathematical pipeline right inside your browser:</p>
      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Technical Mechanism</th>
            <th>Resulting File Integrity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Stage 1: Quantization Table Unfolding</strong></td>
            <td>Re-encodes the HTML5 Canvas at high JPEG quality (<code>Q=0.92</code> to <code>Q=1.0</code>), minimizing DCT coefficient rounding.</td>
            <td>100% compliant baseline JPEG stream; zero trailing byte padding.</td>
          </tr>
          <tr>
            <td><strong>Stage 2: Bicubic Super-Sampling</strong></td>
            <td>If <code>Q=1.0</code> at original dimensions is still below your target KB, the engine scales pixel dimensions proportionally using high-interpolation smoothing.</td>
            <td>Authentic pixel density that passes libjpeg, ImageMagick, and human scrutiny.</td>
          </tr>
        </tbody>
      </table>

      <h2>4. How to Increase Your Photo or Signature Size in 3 Seconds</h2>
      <ol>
        <li>Open the <a href="/increase-image-size-in-kb/">Increase Image Size in KB</a> tool.</li>
        <li>Upload your undersized JPEG, PNG, or WEBP image.</li>
        <li>Enter your exact target size—for example, enter <strong>15 KB</strong> for a 10KB–20KB signature window, or <strong>35 KB</strong> for a 20KB–50KB passport photo window.</li>
        <li>Click <strong>Enhance Size</strong> and download your compliant JPEG immediately.</li>
      </ol>
    `
  },
  {
    slug: 'ibps-po-clerk-sbi-photo-signature-thumb-declaration-size-guide',
    title: 'IBPS PO & Clerk 2026: Complete Photo, Black-Ink Signature & Thumb Impression Guide',
    description: 'Avoid disqualification in IBPS PO, Clerk, RRB, and SBI exams. Exact pixel & KB specs for all 4 uploads: photo, black-ink signature, left thumb impression, and handwritten declaration.',
    publishedAt: '2026-10-18',
    readTime: '8 min read',
    category: 'Banking Exam Guides',
    primaryToolHref: '/ibps-photo-resizer/',
    primaryToolLabel: 'Open IBPS & SBI Photo/Signature Resizer',
    faqs: [
      {
        q: 'Why does IBPS reject signatures signed in blue ink?',
        a: 'IBPS and SBI official notifications explicitly state that the candidate’s signature must be signed on white paper with a BLACK ink pen only. Signatures in blue ink—or in capital letters—are rejected during biometric/document verification.'
      },
      {
        q: 'What is the exact text for the IBPS Handwritten Declaration in 2026?',
        a: 'The standard declaration text is: "I, _______ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required." It must be written in your own handwriting in English with black ink.'
      },
      {
        q: 'Can I use black ink for the Left Thumb Impression in IBPS exams?',
        a: 'No. While the signature and handwritten declaration must be in black ink, the Left Thumb Impression must be stamped using a blue or black stamp pad on white paper, clearly showing ridge lines without smudging.'
      }
    ],
    content: `
      <p>Applying for banking examinations conducted by <strong>IBPS (PO, Clerk, SO, RRB)</strong>, <strong>SBI (PO, Junior Associates)</strong>, <strong>RBI</strong>, and <strong>LIC</strong> is uniquely challenging because candidates must upload <strong>four separate image files</strong>—each governed by different pixel dimensions, file size brackets, and strict ink-color rules.</p>

      <h2>1. The Master IBPS & SBI 4-Document Specification Table (2026)</h2>
      <table>
        <thead>
          <tr>
            <th>Upload Item</th>
            <th>Dimensions (cm / pixels)</th>
            <th>Mandatory KB Range</th>
            <th>Mandatory Ink / Color Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Passport Photograph</strong></td>
            <td>4.5 cm × 3.5 cm<br/><strong>200 × 230 pixels</strong></td>
            <td><strong>20 KB – 50 KB</strong></td>
            <td>Color photo against a light/white background</td>
          </tr>
          <tr>
            <td><strong>2. Applicant Signature</strong></td>
            <td>3.5 cm × 1.5 cm<br/><strong>140 × 60 pixels</strong></td>
            <td><strong>10 KB – 20 KB</strong></td>
            <td><strong>BLACK INK ONLY</strong> on white paper (No Capitals)</td>
          </tr>
          <tr>
            <td><strong>3. Left Thumb Impression</strong></td>
            <td>3.0 cm × 3.0 cm (or 240×240 px)<br/><strong>240 × 240 pixels</strong></td>
            <td><strong>20 KB – 50 KB</strong></td>
            <td><strong>Blue or Black</strong> stamp pad on white paper</td>
          </tr>
          <tr>
            <td><strong>4. Handwritten Declaration</strong></td>
            <td>10 cm × 5 cm<br/><strong>800 × 400 pixels</strong></td>
            <td><strong>50 KB – 100 KB</strong></td>
            <td><strong>BLACK INK ONLY</strong> in English on white paper</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Critical Disqualification Traps in Banking Forms</h2>
      <h3>Trap #1: Mixing Up Ink Colors Between Signature and Thumb</h3>
      <p>In IBPS and SBI exams, <strong>blue ink is strictly prohibited for signatures and handwritten declarations</strong>. Both must be written with a black ballpoint or gel pen on clean white unruled paper. Conversely, your Left Thumb Impression (LTI) can be made with either a blue or black ink pad. Do not press your thumb too hard on the paper; excessive ink fills in the friction ridges and causes biometric software to flag the image as a solid blotch.</p>

      <h3>Trap #2: Blurry Handwritten Declarations at 800×400 Pixels</h3>
      <p>The handwritten declaration contains roughly 35 words across 3 to 4 lines. If you compress it using a generic 20KB tool, the words become illegible. Because IBPS allows a generous <strong>50KB to 100KB window</strong> at <strong>800 × 400 pixels</strong>, use our <a href="/compress-image-to-100kb/">Compress Image to 100KB</a> or <a href="/resize-image-in-pixels/">Resize Image in Pixels</a> tool set to <code>800×400 px</code> and <code>75KB</code> so every single letter remains crisp.</p>

      <h2>3. How to Format All 4 IBPS Files in Under 2 Minutes</h2>
      <ol>
        <li><strong>Photograph & Signature:</strong> Open our <a href="/ibps-photo-resizer/">IBPS Photo & Signature Resizer</a>. Select "Photograph" (auto-locks <code>200×230 px, 45KB</code>) for your portrait, then toggle to "Signature" (auto-locks <code>140×60 px, 18KB</code>) for your black-ink sign.</li>
        <li><strong>Left Thumb Impression:</strong> Use the <a href="/compress-image-to-40kb/">40KB Image Compressor</a> to lock your thumb scan right in the middle of the 20KB–50KB requirement.</li>
        <li><strong>Handwritten Declaration:</strong> Open <a href="/resize-image-dimensions/">Resize Image Dimensions</a>, enter <code>800</code> width by <code>400</code> height, and compress to <strong>80KB</strong>.</li>
      </ol>
    `
  },
  {
    slug: 'neet-ug-2026-passport-photo-vs-4x6-postcard-photo-specifications',
    title: 'NEET UG 2026: Passport Photo vs. 4×6 Inch Postcard Photo Specifications',
    description: 'Understand the exact difference between the NEET UG passport-size photo and the 4×6 inch postcard photo required by NTA, including white background rules and 10KB–200KB sizing.',
    publishedAt: '2026-10-19',
    readTime: '7 min read',
    category: 'Medical Entrance Guides',
    primaryToolHref: '/neet-photo-resizer/',
    primaryToolLabel: 'Open NEET UG Photo & Signature Resizer',
    faqs: [
      {
        q: 'Can I use the same studio photo for both the NEET passport photo and the 4x6 postcard photo?',
        a: 'Yes! In fact, the National Testing Agency (NTA) requires both photographs to be taken from the same studio capture—including the candidate’s name and date of photography at the bottom—formatted at two different aspect ratios and resolutions.'
      },
      {
        q: 'What are the pixel dimensions for a 4x6 inch NEET postcard photo?',
        a: 'At standard screen/print calibration, a 4×6 inch vertical postcard photograph translates to 400 × 600 pixels (at 100 DPI) or 600 × 900 pixels (at 150 DPI), with a file size between 10KB and 200KB in JPG format.'
      },
      {
        q: 'Are spectacles or caps allowed in the NEET UG 2026 photograph?',
        a: 'Caps and dark goggles are strictly prohibited. Regular prescription spectacles are allowed only if you wear them daily and there is zero flash reflection or glare obscuring your eyes. Both ears must be clearly visible.'
      }
    ],
    content: `
      <p>The National Testing Agency (NTA) application portal for <strong>NEET UG 2026</strong> requires medical aspirants to upload two distinct versions of their portrait photograph: a standard <strong>Passport-Size Photograph</strong> and a large <strong>Postcard-Size (4" × 6") Photograph</strong>, alongside their signature and left/right hand fingers and thumb impressions. Understanding the exact technical difference between these uploads prevents NTA Correction Window notices.</p>

      <h2>1. NEET UG 2026 Complete Upload Specification Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Upload Document</th>
            <th>Physical Size</th>
            <th>Recommended Pixels</th>
            <th>Mandatory File Size</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Passport Size Photo</strong></td>
            <td>3.5 cm × 4.5 cm</td>
            <td><strong>200 × 230 px</strong> (or 350 × 450 px)</td>
            <td><strong>10 KB – 200 KB</strong> (JPG)</td>
          </tr>
          <tr>
            <td><strong>2. Postcard Size Photo</strong></td>
            <td>4.0 inch × 6.0 inch</td>
            <td><strong>400 × 600 px</strong> (or 600 × 900 px)</td>
            <td><strong>10 KB – 200 KB</strong> (JPG)</td>
          </tr>
          <tr>
            <td><strong>3. Candidate Signature</strong></td>
            <td>3.5 cm × 1.5 cm</td>
            <td><strong>140 × 60 px</strong></td>
            <td><strong>4 KB – 30 KB</strong> (JPG)</td>
          </tr>
          <tr>
            <td><strong>4. Left & Right Hand Fingers + Thumb</strong></td>
            <td>Horizontal Box</td>
            <td><strong>400 × 200 px</strong></td>
            <td><strong>10 KB – 200 KB</strong> (JPG)</td>
          </tr>
        </tbody>
      </table>

      <h2>2. Passport Photo vs. 4×6 Postcard Photo: What Is the Difference?</h2>
      <p>During physical counseling and exam-center verification, NTA pastes your 4×6 inch postcard photo onto the official attendance sheet to match your facial biometrics. Both photos must be generated from the <strong>exact same studio photograph</strong> and must follow these rules:</p>
      <ul>
        <li><strong>80% Face Coverage:</strong> Your face and ears must be clearly visible against a <strong>pure white background</strong>, covering at least 80% of the frame.</li>
        <li><strong>Name & Date of Taking Photograph:</strong> Both the passport and postcard versions must display a clean white nameplate at the bottom containing your full name and the date the photo was clicked.</li>
        <li><strong>Aspect Ratio Difference:</strong> The passport photo has an aspect ratio of roughly <code>7:9</code> (200×230 px), whereas the postcard photo has a taller <code>2:3</code> aspect ratio (400×600 px). Stretching one into the other without proper cropping distorts facial geometry.</li>
      </ul>

      <h2>3. Formatting Your NEET Photos & Finger Impressions</h2>
      <ol>
        <li>For your standard passport photo and signature, open the <a href="/neet-photo-resizer/">NEET Photo & Signature Resizer</a>. It automatically configures the exact NTA dimensions and locks the file size safely under 150KB (for photos) and 25KB (for signatures).</li>
        <li>For your 4×6 inch postcard photo, open <a href="/resize-image-in-pixels/">Resize Image in Pixels</a>, enter <code>400</code> Width and <code>600</code> Height, and keep the format set to JPG.</li>
        <li>For your 10-finger and thumb impression sheet, use the <a href="/compress-image-to-100kb/">Compress Image to 100KB</a> tool so the ridge details of all ten fingers remain sharp for NTA verification.</li>
      </ol>
    `
  },
  {
    slug: 'how-to-compress-pdf-to-100kb-for-government-university-portals',
    title: 'How to Compress PDF to 100KB for State PSC & University Application Forms',
    description: 'Why scanned marksheets, caste certificates, and Aadhaar cards exceed 2MB, and how to compress PDFs under 100KB or 200KB locally in your browser without blurring text.',
    publishedAt: '2026-10-20',
    readTime: '7 min read',
    category: 'PDF Optimization Guides',
    primaryToolHref: '/compress-pdf-to-100kb/',
    primaryToolLabel: 'Open 100KB PDF Target-Lock Compressor',
    faqs: [
      {
        q: 'Why is my single-page mobile scan PDF over 1.5MB?',
        a: 'Mobile scanner apps (like Adobe Scan or CamScanner) embed raw 300-DPI color smartphone images inside a PDF wrapper along with custom font tables and XML metadata, easily inflating a single A4 page to 1.5MB–3MB.'
      },
      {
        q: 'How can I compress a PDF to 100KB without uploading my Aadhaar or marksheet to a third-party server?',
        a: 'PdfAndImg processes your PDF 100% locally inside your browser using WebAssembly and HTML5 Canvas. Your sensitive identity proofs and academic certificates never leave your device.'
      },
      {
        q: 'What if I have two separate JPG photos of the front and back of my ID card?',
        a: 'First use our Add Images to PDF tool to combine the front and back photos onto a single page or two pages, and then run the resulting file through the Compress PDF to 100KB tool.'
      }
    ],
    content: `
      <p>Whether you are uploading a 10th/12th marksheet for CUET or university admissions, submitting an OBC/SC/ST/EWS category certificate on a State PSC portal (UPPSC, BPSC, MPSC), or attaching a Photo ID proof for UPSC, you will inevitably run into a strict <strong>100KB or 200KB PDF file size limit</strong>. When a single smartphone scan produces a 2.4MB PDF, standard "High / Medium / Low" PDF compressors fail because they cannot target an exact kilobyte ceiling.</p>

      <h2>1. Common Portal PDF Size Limits in India (2026)</h2>
      <table>
        <thead>
          <tr>
            <th>Portal / Authority</th>
            <th>Document Type</th>
            <th>Strict PDF Limit</th>
            <th>Recommended Tool</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>UPSC OTR & DAF</strong></td>
            <td>Photo ID Card (Aadhaar/PAN/Passport)</td>
            <td>20 KB – 300 KB</td>
            <td><a href="/compress-pdf-to-100kb/">Compress PDF to 100KB</a></td>
          </tr>
          <tr>
            <td><strong>NTA (JEE / NEET / CUET)</strong></td>
            <td>Category / PwBD / Class 10 Certificate</td>
            <td>50 KB – 300 KB</td>
            <td><a href="/compress-pdf-to-200kb/">Compress PDF to 200KB</a></td>
          </tr>
          <tr>
            <td><strong>State Scholarship & DigiLocker KYC</strong></td>
            <td>Income / Domicile Certificate</td>
            <td>Under 100 KB</td>
            <td><a href="/compress-pdf-to-100kb/">Compress PDF to 100KB</a></td>
          </tr>
          <tr>
            <td><strong>Strict Municipal / University Portals</strong></td>
            <td>Single-Page Gazette / Affidavit</td>
            <td>Under 50 KB</td>
            <td><a href="/compress-pdf-to-50kb/">Compress PDF to 50KB</a></td>
          </tr>
        </tbody>
      </table>

      <h2>2. Why Standard PDF Compressors Fail on Scanned Certificates</h2>
      <p>A PDF file can contain two very different types of data: vector text (created in Microsoft Word) or raster image streams (created by a scanner or phone camera). Generic PDF tools only compress internal font streams and metadata dictionaries. Because 99% of a scanned marksheet’s byte weight sits inside its embedded JPEG stream, metadata stripping reduces a 2MB scan by less than 1%.</p>
      <p>Our <a href="/compress-pdf-to-100kb/">100KB PDF Compressor</a> solves this by rendering each PDF page onto an adaptive resolution canvas and running an <strong>8-iteration binary search</strong> on the JPEG quantization stream until the rebuilt PDF lands at <strong>94KB to 98KB</strong>—right beneath your 100KB ceiling.</p>

      <h2>3. Best Practices for Scanning Marksheets & IDs Before Compression</h2>
      <ul>
        <li><strong>Crop Out the Table Surface:</strong> Never leave wooden desks or bedsheets around the edges of your document. Complex background textures waste up to 40% of your available kilobyte budget.</li>
        <li><strong>Flatten Multi-Page Scans Only When Required:</strong> If a portal asks for a single-page PDF under 100KB, use <a href="/remove-pdf-pages/">Remove PDF Pages</a> to delete blank or unnecessary instruction pages before compressing.</li>
        <li><strong>Convert Directly from JPG if Starting with a Photo:</strong> If your marksheet is still a <code>.jpg</code> file in your phone gallery, skip creating a huge PDF first—use <a href="/convert-jpg-to-pdf-100kb/">Convert JPG to PDF 100KB</a> to go straight from photo to a 100KB-locked PDF in one step.</li>
      </ul>
    `
  }
];
