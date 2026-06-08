# ImgShrink: The Science of Precision Image Optimization

ImgShrink is a powerful, client-side web application built with **Astro**, **Tailwind CSS**, and modern HTML5 Canvas APIs. It is engineered to solve the "trial and error" problem of manual image compression by using advanced mathematical binary search to hit exact target KB sizes with maximum visual fidelity.

## 🚀 Key Features

### 1. Target-Lock Image Compression
Instead of arbitrary "quality" sliders, ImgShrink lets users define an exact file size limit (e.g., 20KB or 50KB). The engine performs a multi-iteration binary search entirely in local memory to find the mathematically highest quality image that fits precisely under the requested limit.

### 2. Dual-Mode Scaling (KB Enhancer)
Unlike typical compressors that only shrink files, ImgShrink's enhancement engine can successfully up-size a low-KB image to meet strict government or portal minimum size requirements (e.g., minimum 100KB) by combining high-fidelity upscaling with metadata padding.

### 3. Comprehensive Format Suite
- **Convert PNG to JPG / JPG to PNG** 
- **Convert to PDF:** Package any image (JPG, PNG, WEBP) directly into perfectly sized PDF documents.
- **Keep Original:** Process images dynamically while perfectly maintaining their original formats.

### 4. Zero-Server Privacy
All image processing, resizing, format conversion, and PDF packaging happens **100% locally** in the user's browser using HTML5 Canvas APIs, `jszip`, and `jspdf`. User data never touches a remote server.

### 5. Advanced Bulk Processing
Process up to 50 images concurrently. ImgShrink batches processing operations in the background and delivers an instantly downloadable ZIP file containing all optimized assets.

---

## 🛠️ Technology Stack

- **Framework:** [Astro](https://astro.build) (Static Site Generation for insane load speeds and perfect SEO)
- **Styling:** CSS & [Tailwind CSS](https://tailwindcss.com/)
- **Core Processing:** HTML5 Canvas API (Client-side)
- **Utilities:** 
  - `jszip` (Client-side ZIP packaging)
  - `jspdf` (Client-side PDF document generation)

---

## 📂 Project Structure

```text
/
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── components/         # Reusable UI tools (Compressor, Resizer, etc.)
│   ├── layouts/            # Global page layouts and navigation components
│   ├── pages/              # Astro routing for individual SEO tool pages
│   └── utils/              
│       └── imageCompressor.ts # Core algorithms (Binary Search compression & scaling)
└── astro.config.mjs        # Astro configuration & SEO Sitemap Integrations
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
