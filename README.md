# ImgShrink: The Ultimate Multi-Tool Utility Suite

ImgShrink is a high-performance, client-side web application built with **Astro**, **Vanilla CSS**, and modern browser APIs. Originally designed for precise image compression, it has evolved into a comprehensive suite of **44 specialized micro-tools** ranging from PDF manipulation to HEIC format conversion and exact-pixel image resizing. 

Designed for maximum SEO, instant load speeds, and zero-server privacy, ImgShrink processes everything directly in the user's browser.

## 🚀 Key Features & Tool Suites

### 1. Advanced PDF Organization & Manipulation
- **Organize & Remove PDF Pages:** A highly optimized interface for managing massive PDFs. Features a custom **Sticky Stash** sidebar, allowing users to hold pages while scrolling through hundreds of document pages using drag-and-drop (`SortableJS`).
- **PDF Extraction & Merging:** Seamlessly pull specific pages out of PDFs or merge multiple documents together using `pdf-lib`.
- **Add Images to PDF:** Convert arrays of images directly into well-formatted PDF files entirely client-side.

### 2. Target-Lock Image Compression
- Instead of arbitrary "quality" sliders, ImgShrink lets users define an exact file size limit (e.g., 20KB, 50KB). 
- The core engine (`src/utils/imageCompressor.ts`) performs a multi-iteration binary search entirely in local memory to find the mathematically highest quality image that fits precisely under the requested byte limit.

### 3. Smart Scaling & Format Conversions
- **KB Enhancer:** Successfully up-size a low-KB image to meet strict government or portal minimum size requirements by combining high-fidelity upscaling with intelligent metadata padding.
- **HEIC Conversion Engine:** Locally process Apple's proprietary HEIC format into universally accepted JPG, PNG, or PDF formats using `heic2any`.
- **Pixel-Perfect Resizing:** Crop, resize by percentages, or force exact pixel dimensions for strict portal requirements (e.g., passport photos, signature uploads).

### 4. Zero-Server Privacy
All image processing, resizing, format conversion, and PDF packaging happens **100% locally** in the user's browser. User data, sensitive documents, and personal photos **never** touch a remote server.

### 5. Multi-Page Architecture (MPA) for SEO
Built strategically as a Multi-Page Application using Astro. Each of the 44 micro-tools has its own dedicated, statically generated HTML page. This guarantees perfect Core Web Vitals, instantaneous load times, and maximum visibility for Google Search indexing.

---

## 🛠️ Technology Stack

- **Framework:** [Astro](https://astro.build) (Static Site Generation for insane load speeds and perfect SEO)
- **Styling:** Highly optimized Vanilla CSS with custom layout systems
- **Interactivity & UI:** Vanilla JavaScript, `SortableJS` (for Drag-and-Drop)
- **Core Processing:** HTML5 Canvas API (Client-side)
- **File Manipulation Utilities:** 
  - `pdf-lib` (Client-side PDF document generation and modification)
  - `jszip` (Client-side ZIP packaging)
  - `heic2any` (Client-side HEIC decoding)

---

## 📂 Project Structure

```text
/
├── public/                 # Static assets (images, robots.txt, sitemap, etc.)
├── src/
│   ├── components/         # Reusable UI tools (PDFRemove, HEICConverter, etc.)
│   ├── layouts/            # Global page layouts and navigation wrappers
│   ├── pages/              # 44 individual Astro routing pages for maximum SEO
│   └── utils/              
│       └── imageCompressor.ts # Core algorithms for Binary Search compression & scaling
├── DESIGN.md               # Core architectural and design philosophy guidelines
└── astro.config.mjs        # Astro configuration & SEO integrations
```

---

## 🏃‍♂️ Running Locally

To work on ImgShrink locally, run the following commands in your terminal:

```sh
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The site will be available at `http://localhost:4321`.

### Build for Production

```sh
# Build the production optimized site
npm run build

# Preview the built site locally
npm run preview
```

---

## 🛡️ License & Privacy

Because ImgShrink is a 100% client-side application, it strictly adheres to maximum privacy standards out of the box. No backend servers, databases, or cloud storage environments are used for file processing.
