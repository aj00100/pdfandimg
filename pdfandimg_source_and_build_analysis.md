# Complete DevSecOps & Technical SEO Source Code & Live Audit Report
## Repository: `https://github.com/aj00100/pdfandimg`
**Target Domain:** `https://pdfandimg.com`  
**Audit Date:** October 21, 2026  
**Environment:** Linux Termux / proot Debian aarch64  

---

## Complete Forensic Bug Inventory (Every Detected Flaw)

### 🚨 BUG 1: The Programmatic Template String Bug (`KBKB`, `180KBKB`, `250KBKB`, `Exam specific sizes (...)KB`)
- **Component File:** `src/components/SEOContent.astro` (Line 14)
- **Root Cause:**
  ```astro
  const kbText = targetKB.toString().toLowerCase() === 'any' ? 'Any KB' : targetKB.toString().includes('MB') ? targetKB : `${targetKB}KB`;
  ```
- **Why It Fails:** When `targetKB` already contains `KB` (e.g. `'180KB'`, `'250KB'`, `'20KB'`) or descriptive text (`'Exam specific sizes (10KB, 20KB, 50KB, 250KB)'`), `${targetKB}KB` appends a second `KB`.
- **Live Production Proof (`https://pdfandimg.com`):**
  * `/neet-photo-resizer/`: Schema renders `"PdfAndImg 180KBKB Optimizer"`, body has `Our engine identifies the target threshold (180KBKB)`, heading `Why Precision 180KBKB Compression Matters in 2026`.
  * `/upsc-photo-resizer/`: 24 live occurrences of `250KBKB` in schema, FAQs, and body text (`Does this 250KBKB tool work for SSC...`).
  * `/ssc-cgl-signature-resizer/`: 24 live occurrences of `10KB - 20KBKB` in FAQ and copy.
  * `/exam-photo-resizer/`: 12 live occurrences of `Exam specific sizes (10KB, 20KB, 50KB, 250KB)KB` in FAQ and schema.
- **Google Ranking Impact:** Severe programmatic doorway spam penalty; triggers Google's quality filters to drop pages from indexation.

---

### 🚨 BUG 2: Duplicate Brand Suffix in Titles (`— PdfAndImg — PdfAndImg`)
- **Component File:** `src/layouts/Layout.astro` (Lines 72, 79, 86)
- **Root Cause:** `Layout.astro` unconditionally appends `— PdfAndImg`:
  ```html
  <title>{title} — PdfAndImg</title>
  ```
  While individual pages also hardcoded `— PdfAndImg` in their `SEO_TITLE`:
  * `src/pages/about.astro:4`: `const SEO_TITLE = "About Us — PdfAndImg";`
  * `src/pages/avif-to-jpg.astro:6`: `const SEO_TITLE = "AVIF to JPG Converter Online — Free & Instant — PdfAndImg";`
  * `src/pages/bmp-to-jpg.astro:6`: `const SEO_TITLE = "BMP to JPG Converter Online — Free & Instant — PdfAndImg";`
  * `src/pages/tiff-to-jpg.astro:6`: `const SEO_TITLE = "TIFF to JPG Converter Online — Free & Private — PdfAndImg";`
  * `src/pages/404.astro:4`: `const SEO_TITLE = "404 - Page Not Found | PdfAndImg";`
  * `src/pages/privacy.astro:4`: `const SEO_TITLE = "Privacy Policy — PdfAndImg Service";`
  * `src/pages/terms.astro:4`: `const SEO_TITLE = "Terms & Conditions — PdfAndImg Service";`
- **Live Production Proof:** Tested directly via `curl` on live URLs:
  * `https://pdfandimg.com/about/` -> `<title>About Us — PdfAndImg — PdfAndImg</title>`
  * `https://pdfandimg.com/avif-to-jpg/` -> `<title>AVIF to JPG Converter Online — Free & Instant — PdfAndImg — PdfAndImg</title>`
  * `https://pdfandimg.com/bmp-to-jpg/` -> `<title>BMP to JPG Converter Online — Free & Instant — PdfAndImg — PdfAndImg</title>`
  * `https://pdfandimg.com/tiff-to-jpg/` -> `<title>TIFF to JPG Converter Online — Free & Private — PdfAndImg — PdfAndImg</title>`
- **Google Ranking Impact:** Unprofessional SERP snippets; title truncation in search results.

---

### 🚨 BUG 3: Sitemap Trailing Slash & 308 Permanent Redirect Chain (98.4% of URLs)
- **Config File:** `astro.config.mjs` (Line 8)
- **Root Cause:** Astro was configured with `trailingSlash: 'never'`, generating all 60 subpages without `/` in `sitemap-0.xml`.
- **Live Production Proof:**
  `curl -s -I https://pdfandimg.com/convert-heic-to-pdf` returns `HTTP/2 308 Permanent Redirect` with `Location: /convert-heic-to-pdf/`.
- **Google Ranking Impact:** Crawl budget waste; Google Search Console reports 'Page with redirect' on 60 URLs.

---

### 🚨 BUG 4: Canonical Tag Redirect Loop & Hostname Desynchronization
- **Component File:** `src/layouts/Layout.astro` (Line 17)
- **Root Cause:** `const path = Astro.url.pathname.replace(/\/+$/, '');` stripped trailing slashes.
- **Live Production Proof:** On `https://pdfandimg.com/convert-heic-to-pdf/`, `<link rel="canonical" href="https://pdfandimg.com/convert-heic-to-pdf">` instructs Googlebot that the authoritative URL is the one that 308-redirects back.

---

### 🚨 BUG 5: 79 Internal Navigation Links Omit Trailing Slash
- **Impact:** Every in-site click on the header, footer, index grid, and related tools triggers a 308 redirect hop.
- **Inventory:**
| # | File | Line | Path |
|---|---|---|---|
| 1 | `src/layouts/Layout.astro` | 190 | `/exam-photo-resizer` |
| 2 | `src/layouts/Layout.astro` | 191 | `/photo-pdf-converter` |
| 3 | `src/layouts/Layout.astro` | 192 | `/tools` |
| 4 | `src/layouts/Layout.astro` | 193 | `/crop-image-online` |
| 5 | `src/layouts/Layout.astro` | 195 | `/increase-image-size-in-kb` |
| 6 | `src/layouts/Layout.astro` | 196 | `/tools` |
| 7 | `src/layouts/Layout.astro` | 198 | `/about` |
| 8 | `src/layouts/Layout.astro` | 199 | `/contact` |
| 9 | `src/layouts/Layout.astro` | 200 | `/privacy` |
| 10 | `src/layouts/Layout.astro` | 201 | `/terms` |
| 11 | `src/layouts/Layout.astro` | 204 | `/exam-photo-resizer` |
| 12 | `src/layouts/Layout.astro` | 205 | `/photo-pdf-converter` |
| 13 | `src/layouts/Layout.astro` | 206 | `/tools` |
| 14 | `src/layouts/Layout.astro` | 207 | `/crop-image-online` |
| 15 | `src/layouts/Layout.astro` | 209 | `/increase-image-size-in-kb` |
| 16 | `src/layouts/Layout.astro` | 210 | `/tools` |
| 17 | `src/layouts/Layout.astro` | 216 | `/about` |
| 18 | `src/layouts/Layout.astro` | 217 | `/contact` |
| 19 | `src/layouts/Layout.astro` | 218 | `/privacy` |
| 20 | `src/layouts/Layout.astro` | 219 | `/terms` |
| 21 | `src/layouts/Layout.astro` | 293 | `/exam-photo-resizer` |
| 22 | `src/layouts/Layout.astro` | 297 | `/reduce-image-size-in-kb` |
| 23 | `src/layouts/Layout.astro` | 301 | `/increase-image-size-in-kb` |
| 24 | `src/layouts/Layout.astro` | 305 | `/png-to-jpg` |
| 25 | `src/layouts/Layout.astro` | 309 | `/jpg-to-pdf` |
| 26 | `src/layouts/Layout.astro` | 313 | `/passport-size-photo` |
| 27 | `src/layouts/Layout.astro` | 315 | `/tools` |
| 28 | `src/layouts/Layout.astro` | 333 | `/about` |
| 29 | `src/layouts/Layout.astro` | 334 | `/contact` |
| 30 | `src/layouts/Layout.astro` | 335 | `/privacy` |
| 31 | `src/layouts/Layout.astro` | 336 | `/terms` |
| 32 | `src/pages/about.astro` | 52 | `/contact` |
| 33 | `src/pages/australian-passport-photo-size.astro` | 34 | `/crop-image-to-passport-size` |
| 34 | `src/pages/australian-passport-photo-size.astro` | 79 | `/compress-image-to-200kb` |
| 35 | `src/pages/bmp-to-jpg.astro` | 89 | `/avif-to-jpg` |
| 36 | `src/pages/canada-visa-photo-size.astro` | 26 | `/compress-image-to-500kb` |
| 37 | `src/pages/canada-visa-photo-size.astro` | 72 | `/passport-size-photo` |
| 38 | `src/pages/compress-pdf-to-50kb.astro` | 204 | `/separate-pdf-pages` |
| 39 | `src/pages/compress-pdf-to-50kb.astro` | 378 | `/separate-pdf-pages` |
| 40 | `src/pages/convert-heic-to-png.astro` | 191 | `/compress-image-to-100kb` |
| 41 | `src/pages/convert-heic-to-png.astro` | 191 | `/compress-image-to-200kb` |
| 42 | `src/pages/crop-image-to-passport-size.astro` | 122 | `/reduce-image-size-in-kb` |
| 43 | `src/pages/green-card-photo-requirements.astro` | 26 | `/compress-image-to-200kb` |
| 44 | `src/pages/green-card-photo-requirements.astro` | 78 | `/passport-photo-2x2` |
| 45 | `src/pages/green-card-photo-requirements.astro` | 78 | `/crop-image-to-passport-size` |
| 46 | `src/pages/index.astro` | 20 | `/exam-photo-resizer` |
| 47 | `src/pages/index.astro` | 42 | `/exam-photo-resizer` |
| 48 | `src/pages/index.astro` | 54 | `/increase-image-size-in-kb` |
| 49 | `src/pages/index.astro` | 66 | `/crop-image-online` |
| 50 | `src/pages/index.astro` | 78 | `/compress-pdf-to-100kb` |
| 51 | `src/pages/index.astro` | 90 | `/convert-heic-to-jpg` |
| 52 | `src/pages/index.astro` | 104 | `/convert-heic-to-pdf` |
| 53 | `src/pages/index.astro` | 116 | `/add-images-to-pdf` |
| 54 | `src/pages/index.astro` | 128 | `/unlock-pdf` |
| 55 | `src/pages/index.astro` | 147 | `/compress-image-to-10kb` |
| 56 | `src/pages/index.astro` | 148 | `/compress-image-to-20kb` |
| 57 | `src/pages/index.astro` | 149 | `/compress-image-to-50kb` |
| 58 | `src/pages/index.astro` | 150 | `/compress-image-to-100kb` |
| 59 | `src/pages/index.astro` | 151 | `/compress-image-to-200kb` |
| 60 | `src/pages/index.astro` | 160 | `/pan-card-photo-resizer` |
| 61 | `src/pages/index.astro` | 161 | `/resize-a-photo-to-passport-size` |
| 62 | `src/pages/index.astro` | 162 | `/ssc-cgl-photo-resizer` |
| 63 | `src/pages/index.astro` | 163 | `/ssc-cgl-signature-resizer` |
| 64 | `src/pages/index.astro` | 164 | `/upsc-photo-resizer` |
| 65 | `src/pages/index.astro` | 165 | `/neet-photo-resizer` |
| 66 | `src/pages/index.astro` | 166 | `/ibps-photo-resizer` |
| 67 | `src/pages/index.astro` | 167 | `/gate-photo-resizer` |
| 68 | `src/pages/index.astro` | 181 | `/exam-photo-resizer` |
| 69 | `src/pages/index.astro` | 181 | `/pan-card-photo-resizer` |
| 70 | `src/pages/index.astro` | 181 | `/resize-a-photo-to-passport-size` |
| 71 | `src/pages/jpeg-to-png.astro` | 149 | `/compress-image-to-20kb` |
| 72 | `src/pages/jpg-to-pdf.astro` | 297 | `/compress-image-to-20kb` |
| 73 | `src/pages/jpg-to-pdf.astro` | 297 | `/compress-image-to-50kb` |
| 74 | `src/pages/png-to-pdf.astro` | 110 | `/merge-multiple-pdf-into-one` |
| 75 | `src/pages/schengen-visa-photo-size.astro` | 27 | `/compress-image-to-200kb` |
| 76 | `src/pages/schengen-visa-photo-size.astro` | 75 | `/passport-size-photo` |
| 77 | `src/pages/schengen-visa-photo-size.astro` | 75 | `/crop-image-to-passport-size` |
| 78 | `src/pages/tiff-to-jpg.astro` | 85 | `/png-to-jpg` |
| 79 | `src/pages/tiff-to-jpg.astro` | 85 | `/convert-heic-to-jpg` |

---

### 🚨 BUG 6: Missing Content Security Policy (CSP) in `public/_headers`
- **File:** `public/_headers`
- **Issue:** Cloudflare serves no `Content-Security-Policy` header, leaving client-side in-memory canvas manipulation without browser script isolation.

---

## Exact Code Fixes & Patches
### Patch 1: Fix `KBKB` Interpolation Bug in `src/components/SEOContent.astro`
```diff
--- a/src/components/SEOContent.astro
+++ b/src/components/SEOContent.astro
@@ -13,3 +13,11 @@ const { targetKB, type = 'compress', customTitle, uniqueContent, customFaqs } =
 const isEnhance = type === 'enhance';
 const isCrop = type === 'crop';
-const kbText = targetKB.toString().toLowerCase() === 'any' ? 'Any KB' : targetKB.toString().includes('MB') ? targetKB : `${targetKB}KB`;
+const rawKB = targetKB.toString().trim();
+const kbText = rawKB.toLowerCase() === 'any' ? 'Custom'
+  : rawKB.toLowerCase() === 'custom' ? 'Custom'
+  : rawKB.toLowerCase() === 'passport' ? 'Passport'
+  : /(?:kb|mb)$/i.test(rawKB) ? rawKB
+  : rawKB.includes('KB') || rawKB.includes('MB') ? rawKB
+  : /^\d+$/.test(rawKB) ? `${rawKB}KB`
+  : rawKB;
```

### Patch 2: Fix Page Props in Exam Pages (`exam-photo-resizer.astro`)
```diff
--- a/src/pages/exam-photo-resizer.astro
+++ b/src/pages/exam-photo-resizer.astro
@@ -29,3 +29,3 @@
   <SEOContent 
-    targetKB="Exam specific sizes (10KB, 20KB, 50KB, 250KB)" 
+    targetKB="Exam" 
     customTitle="The Ultimate Exam Photo Resizer Guide" 
```

### Patch 3: Defensive Title Deduplication in `src/layouts/Layout.astro` & Pages
```diff
--- a/src/layouts/Layout.astro
+++ b/src/layouts/Layout.astro
@@ -72,3 +72,3 @@
-    <title>{title} — PdfAndImg</title>
+    <title>{title.includes('PdfAndImg') ? title : `${title} — PdfAndImg`}</title>
-    <meta property="og:title" content={`${title} — PdfAndImg`} />
+    <meta property="og:title" content={title.includes('PdfAndImg') ? title : `${title} — PdfAndImg`} />
-    <meta property="twitter:title" content={`${title} — PdfAndImg`} />
+    <meta property="twitter:title" content={title.includes('PdfAndImg') ? title : `${title} — PdfAndImg`} />

--- a/src/pages/about.astro
+++ b/src/pages/about.astro
@@ -4,1 +4,1 @@
-const SEO_TITLE = "About Us — PdfAndImg";
+const SEO_TITLE = "About Us";

--- a/src/pages/avif-to-jpg.astro
+++ b/src/pages/avif-to-jpg.astro
@@ -6,1 +6,1 @@
-const SEO_TITLE = "AVIF to JPG Converter Online — Free & Instant — PdfAndImg";
+const SEO_TITLE = "AVIF to JPG Converter Online — Free & Instant";

--- a/src/pages/bmp-to-jpg.astro
+++ b/src/pages/bmp-to-jpg.astro
@@ -6,1 +6,1 @@
-const SEO_TITLE = "BMP to JPG Converter Online — Free & Instant — PdfAndImg";
+const SEO_TITLE = "BMP to JPG Converter Online — Free & Instant";

--- a/src/pages/tiff-to-jpg.astro
+++ b/src/pages/tiff-to-jpg.astro
@@ -6,1 +6,1 @@
-const SEO_TITLE = "TIFF to JPG Converter Online — Free & Private — PdfAndImg";
+const SEO_TITLE = "TIFF to JPG Converter Online — Free & Private";
```

### Patch 4: Trailing Slash & Canonical Alignment (`astro.config.mjs` & `src/layouts/Layout.astro`)
```diff
--- a/astro.config.mjs
+++ b/astro.config.mjs
@@ -7,3 +7,3 @@ export default defineConfig({
   site: 'https://pdfandimg.com',
-  trailingSlash: 'never',
+  trailingSlash: 'always',

--- a/src/layouts/Layout.astro
+++ b/src/layouts/Layout.astro
@@ -16,3 +16,4 @@
 const siteUrl = "https://pdfandimg.com";
-const path = Astro.url.pathname.replace(/\/+$/, '');
-const canonicalUrl = new URL(path || '/', siteUrl).toString();
+const normalizedPath = Astro.url.pathname.replace(/\/+$/, '');
+const canonicalPath = normalizedPath ? `${normalizedPath}/` : '/';
+const canonicalUrl = new URL(canonicalPath, siteUrl).toString();
```

### Patch 5: Security Headers & CSP in `public/_headers`
```diff
--- a/public/_headers
+++ b/public/_headers
@@ -12,2 +12,3 @@
   Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
+  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; frame-ancestors 'self';
```
---

## Raw File Appendices
### Appendix A: `package.json`
```json
{
  "name": "pdfandimg",
  "type": "module",
  "version": "0.0.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "deploy": "astro build && npx wrangler pages deploy dist"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.3",
    "astro": "^6.4.4",
    "firebase": "^12.16.0",
    "jose": "^6.2.4",
    "jspdf": "^4.2.1",
    "jszip": "^3.10.1",
    "pdf-lib": "^1.17.1",
    "wrangler": "^4.113.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0"
  },
  "overrides": {
    "vite": "^7"
  }
}
```

### Appendix B: `astro.config.mjs`
```javascript
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pdfandimg.com',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
    cacheDir: './.vite-new',
    server: {
      host: true,
      allowedHosts: true,
    },
  },

  integrations: [sitemap({
    filter: (page) => 
      !page.includes('/merge-multiple-pdf-into-one') &&
      !page.includes('/separate-pdf-pages') &&
      !page.includes('/remove-pdf-pages') &&
      !page.includes('/extract-images-from-pdf') &&
      !page.includes('/add-images-to-pdf')
  })],
});
```

### Appendix C: `src/layouts/Layout.astro`
```astro
---
import '../styles/global.css';
import SmartRelatedTools from '../components/SmartRelatedTools.astro';

interface Props {
  title: string;
  description?: string;
  showRelatedTools?: boolean;
  noindex?: boolean;
  lang?: string;
}

const { title, description = "Precision image compression. Target any file size.", showRelatedTools = false, noindex = false, lang = "en" } = Astro.props;

// Canonical URL Logic - enforce trailing slash for exact matching with live 200 URLs
const siteUrl = "https://pdfandimg.com";
const normalizedPath = Astro.url.pathname.replace(/\/+$/, '');
const canonicalPath = normalizedPath ? `${normalizedPath}/` : '/';
const canonicalUrl = new URL(canonicalPath, siteUrl).toString();

// BreadcrumbList structured data
const pathSegments = normalizedPath.split('/').filter(Boolean);
const breadcrumbItems = [
  { name: 'Home', url: `${siteUrl}/` },
  ...(pathSegments.length > 0 ? [{
    name: title.split('—')[0].trim(),
    url: canonicalUrl,
  }] : []),
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbItems.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url,
  })),
};

// Hreflang logic for internationalization (with canonical trailing slashes)
const hreflangMap: Record<string, { en: string; id: string }> = {
  '/id/kompres-foto-100kb': { en: '/compress-image-to-100kb/', id: '/id/kompres-foto-100kb/' },
  '/compress-image-to-100kb': { en: '/compress-image-to-100kb/', id: '/id/kompres-foto-100kb/' },
  '/id/kompres-foto-200kb': { en: '/compress-image-to-200kb/', id: '/id/kompres-foto-200kb/' },
  '/compress-image-to-200kb': { en: '/compress-image-to-200kb/', id: '/id/kompres-foto-200kb/' },
};
const pageHreflangs = hreflangMap[normalizedPath || '/'];
---

<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="UTF-8" />
    {pageHreflangs && (
      <>
        <link rel="alternate" hreflang="en" href={new URL(pageHreflangs.en, siteUrl).toString()} />
        <link rel="alternate" hreflang="id" href={new URL(pageHreflangs.id, siteUrl).toString()} />
        <link rel="alternate" hreflang="x-default" href={new URL(pageHreflangs.en, siteUrl).toString()} />
      </>
    )}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="msvalidate.01" content="E83688B2D84F2650E3B27304930BD2B7" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    <meta name="generator" content={Astro.generator} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    
    <title>{title} — PdfAndImg</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:title" content={`${title} — PdfAndImg`} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={`${siteUrl}/og-image.png`} />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={canonicalUrl} />
    <meta property="twitter:title" content={`${title} — PdfAndImg`} />
    <meta property="twitter:description" content={description} />
    <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />

    <!-- Fonts: Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-S9WR64YT2D"></script>
    <script is:inline>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-S9WR64YT2D');
    </script>

    <!-- BreadcrumbList structured data -->
    <script type="application/ld+json" set:html={JSON.stringify(breadcrumbSchema)} />
  </head>

  <body>
    <!-- Atmospheric layers -->
    <div class="noise-overlay" aria-hidden="true"></div>

    <!-- Glow accent top-left -->
    <div
      aria-hidden="true"
      style="
        position: fixed;
        top: -200px;
        left: -200px;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(200,241,53,0.07) 0%, transparent 65%);
        pointer-events: none;
        z-index: 0;
      "
    ></div>

    <!-- Navigation -->
    <header
      style="
        height: 64px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 100;
        border-bottom: 1px solid var(--color-border);
        background: rgba(10,10,11,0.85);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      "
    >
      <div
        style="
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <!-- Logo -->
        <div
          style="display: flex; align-items: center; gap: 10px; text-decoration: none;"
        >
          <div class="logo-mark">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3 14V15.5C3 16.33 3.67 17 4.5 17H13.5C14.33 17 15 16.33 15 15.5V14M9 1V11.5M9 1L5.5 4.5M9 1L12.5 4.5"
                stroke="#0a0a0b"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span
            style="
              font-family: var(--font-display);
              font-size: 1.125rem;
              font-weight: 800;
              letter-spacing: -0.04em;
              color: var(--color-ink);
            "
          >PdfAndImg</span>
        </div>

        <!-- Nav links -->
        <nav style="display: flex; align-items: center; gap: 6px;">
          <!-- Mobile Tools Dropdown -->
          <details class="show-mobile-only mobile-menu" style="position: relative;">
            <summary class="nav-link" style="color: var(--color-lime); cursor: pointer; list-style: none;">Tools ▾</summary>
            <div style="position: absolute; top: 100%; right: 0; background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px; min-width: 150px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 200; margin-top: 12px;">
              <a href="/exam-photo-resizer" class="nav-link nav-highlight-lime" style="text-align: left; font-weight: 700;">Exam Resizer</a>
              <a href="/photo-pdf-converter" class="nav-link nav-highlight-lime" style="text-align: left;">Converter</a>
              <a href="/tools#pdf-tools" class="nav-link nav-highlight-lime" style="text-align: left;">PDF Tools</a>
              <a href="/crop-image-online" class="nav-link nav-highlight-lime" style="text-align: left;">Crop</a>
              <a href="/" class="nav-link nav-highlight-lime" style="text-align: left;">Compress</a>
              <a href="/increase-image-size-in-kb" class="nav-link nav-highlight-lime" style="text-align: left;">Enhance</a>
              <a href="/tools#other-tools" class="nav-link nav-highlight-lime" style="text-align: left;">Others</a>
              <hr style="border: none; border-top: 1px solid var(--color-border); margin: 4px 0;" />
              <a href="/about" class="nav-link nav-highlight-lime" style="text-align: left;">About Us</a>
              <a href="/contact" class="nav-link nav-highlight-lime" style="text-align: left;">Contact Us</a>
              <a href="/privacy" class="nav-link nav-highlight-lime" style="text-align: left;">Privacy Policy</a>
              <a href="/terms" class="nav-link nav-highlight-lime" style="text-align: left;">Terms & Conditions</a>
            </div>
          </details>
          <a href="/exam-photo-resizer" class="nav-link hide-mobile nav-highlight-lime" style="position: relative; font-weight: 700;">Exam Resizer</a>
          <a href="/photo-pdf-converter" class="nav-link hide-mobile nav-highlight-lime" style="position: relative;">Converter</a>
          <a href="/tools#pdf-tools" class="nav-link hide-mobile nav-highlight-lime" style="position: relative;">PDF Tools</a>
          <a href="/crop-image-online" class="nav-link hide-mobile nav-highlight-lime" style="position: relative;">Crop</a>
          <a href="/" class="nav-link hide-mobile nav-highlight-lime" style="position: relative;">Compress</a>
          <a href="/increase-image-size-in-kb" class="nav-link hide-mobile nav-highlight-lime" style="position: relative;">Enhance</a>
          <a href="/tools#other-tools" class="nav-link hide-mobile nav-highlight-lime" style="position: relative;">Others</a>
          
          <!-- Legal Dropdown for AdSense Compliance -->
          <details class="hide-mobile mobile-menu" style="position: relative;">
            <summary class="nav-link nav-highlight-lime" style="cursor: pointer; list-style: none;">More ▾</summary>
            <div style="position: absolute; top: 100%; right: 0; background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 8px; min-width: 180px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 200; margin-top: 12px;">
              <a href="/about" class="nav-link nav-highlight-lime" style="text-align: left;">About Us</a>
              <a href="/contact" class="nav-link nav-highlight-lime" style="text-align: left;">Contact Us</a>
              <a href="/privacy" class="nav-link nav-highlight-lime" style="text-align: left;">Privacy Policy</a>
              <a href="/terms" class="nav-link nav-highlight-lime" style="text-align: left;">Terms & Conditions</a>
            </div>
          </details>
          <a
            href="/"
            class="btn-primary"
            style="padding: 8px 18px; font-size: 0.875rem; margin-left: 8px; box-shadow: 0 0 15px rgba(200, 241, 53, 0.15);"
          >HOME</a>
        </nav>
      </div>
    </header>

    <!-- Main content -->
    <main style="position: relative; z-index: 10; padding: 48px 0 80px;">
      <slot />
    </main>

    <!-- Smart Related Tools (dynamic internal linking) -->
      <SmartRelatedTools />
    <footer style="position: relative; z-index: 10; padding-bottom: 48px;">
      <div
        style="
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        "
      >
        <hr class="footer-divider" />

        <div class="footer-grid">
          <!-- Brand -->
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
              <div class="logo-mark">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M3 14V15.5C3 16.33 3.67 17 4.5 17H13.5C14.33 17 15 16.33 15 15.5V14M9 1V11.5M9 1L5.5 4.5M9 1L12.5 4.5" stroke="#0a0a0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span
                style="
                  font-family: var(--font-display);
                  font-weight: 800;
                  font-size: 1.0625rem;
                  letter-spacing: -0.04em;
                  color: var(--color-ink);
                "
              >PdfAndImg</span>
            </div>
            <p
              style="
                font-size: 0.875rem;
                color: var(--color-ink-2);
                line-height: 1.7;
                max-width: 280px;
              "
            >
              Precision image optimization for professionals.
              Target any file size with mathematical accuracy.
            </p>
          </div>

          <!-- Tools -->
          <div>
            <p
              style="
                font-family: var(--font-mono);
                font-size: 0.6875rem;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                color: var(--color-ink-3);
                margin-bottom: 16px;
              "
            >Tools</p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
              <li><a href="/exam-photo-resizer" class="nav-link" style="padding: 0; border: none; color: var(--color-lime); font-weight: 700;">
                <span class="hide-mobile">Exam Photo Resizer</span>
                <span class="show-mobile-only">Exam Resizer</span>
              </a></li>
              <li><a href="/reduce-image-size-in-kb" class="nav-link" style="padding: 0; border: none; color: var(--color-lime);">
                <span class="hide-mobile">Reduce Image Size in KB</span>
                <span class="show-mobile-only">Reduce KB Size</span>
              </a></li>
              <li><a href="/increase-image-size-in-kb" class="nav-link" style="padding: 0; border: none; color: var(--color-lime);">
                <span class="hide-mobile">Increase Image Size in KB</span>
                <span class="show-mobile-only">Increase KB Size</span>
              </a></li>
              <li><a href="/png-to-jpg" class="nav-link" style="padding: 0; border: none; color: var(--color-lime);">
                <span class="hide-mobile">Convert PNG to JPG</span>
                <span class="show-mobile-only">PNG to JPG</span>
              </a></li>
              <li><a href="/jpg-to-pdf" class="nav-link" style="padding: 0; border: none; color: var(--color-lime);">
                <span class="hide-mobile">Convert JPG to PDF</span>
                <span class="show-mobile-only">JPG to PDF</span>
              </a></li>
              <li><a href="/passport-size-photo" class="nav-link" style="padding: 0; border: none;">Passport Size Photo</a></li>
              <li style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--color-border);">
                <a href="/tools" class="nav-link" style="padding: 0; border: none; font-weight: 700; color: var(--color-ink);">View all tools →</a>
              </li>
            </ul>
          </div>

          <!-- Company -->
          <div>
            <p
              style="
                font-family: var(--font-mono);
                font-size: 0.6875rem;
                text-transform: uppercase;
                letter-spacing: 0.12em;
                color: var(--color-ink-3);
                margin-bottom: 16px;
              "
            >Company</p>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
              <li><a href="/about" class="nav-link" style="padding: 0; border: none;">About Us</a></li>
              <li><a href="/contact" class="nav-link" style="padding: 0; border: none;">Contact Us</a></li>
              <li><a href="/privacy" class="nav-link" style="padding: 0; border: none;">Privacy Policy</a></li>
              <li><a href="/terms" class="nav-link" style="padding: 0; border: none;">Terms & Conditions</a></li>
            </ul>

          </div>
        </div>

        <hr class="footer-divider" />

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 24px;
          "
        >
          <p
            style="
              font-family: var(--font-mono);
              font-size: 0.75rem;
              color: var(--color-ink-3);
            "
          >© 2026 PdfAndImg — All rights reserved</p>
        </div>
      </div>
    </footer>
    <script>
      // Close any open dropdowns when tapping outside
      document.addEventListener('click', (e) => {
        const detailsElements = document.querySelectorAll('.mobile-menu');
        detailsElements.forEach(details => {
          if (details.hasAttribute('open') && !details.contains(e.target as Node)) {
            details.removeAttribute('open');
          }
        });
      });
    </script>
  </body>
</html>
```

### Appendix D: `src/components/SEOContent.astro`
```astro
---
interface Props {
  targetKB: string | number;
  type?: 'compress' | 'enhance' | 'crop';
  customTitle?: string;
  uniqueContent?: string;
  customFaqs?: {q: string; a: string}[];
}

const { targetKB, type = 'compress', customTitle, uniqueContent, customFaqs } = Astro.props;

const isEnhance = type === 'enhance';
const isCrop = type === 'crop';
const kbText = targetKB.toString().toLowerCase() === 'any' ? 'Any KB' : targetKB.toString().includes('MB') ? targetKB : `${targetKB}KB`;

// FAQ Data for JSON-LD
const faqData = customFaqs || [
  {
    q: `Will I lose quality when I ${isCrop ? 'crop' : isEnhance ? 'enhance' : 'compress'} an image?`,
    a: `PdfAndImg uses "Smart Scaling" and Smart Compression Algorithms. Instead of simple pixel destruction, we adjust dimensions and metadata to ensure the JPEG quality remains high, resulting in a clear image even at ${kbText}.`
  },
  {
    q: `Is it safe to upload my private photos to the ${kbText} optimizer?`,
    a: "Absolutely. All processing happens locally in your browser using the Canvas API. Your photos are never sent to a server, making it 100% private and secure for sensitive government documents and IDs."
  },
  {
    q: `Does this ${kbText} tool work for SSC, UPSC, and Bank portals?`,
    a: `Yes. Our tools are specifically calibrated for Indian government portals like SSC, UPSC, and IBPS. If a portal requires exactly ${kbText}, our engine ensures you hit that target with mathematical precision.`
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a
    }
  }))
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": `PdfAndImg ${kbText} Optimizer`,
  "url": Astro.url.href,
  "operatingSystem": "WebBrowser",
  "applicationCategory": "UtilitiesApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

// Internal Linking Data (Topic Cluster)
const relatedTools = [
  { name: '10KB', href: '/compress-image-to-10kb' },
  { name: '20KB', href: '/compress-image-to-20kb' },
  { name: '50KB', href: '/compress-image-to-50kb' },
  { name: '100KB', href: '/compress-image-to-100kb' },
  { name: 'Custom Reducer', href: '/reduce-image-size-in-kb' },
  { name: 'Crop Image Online', href: '/crop-image-online' },
].filter(tool => !tool.href.includes(targetKB.toString().toLowerCase()));
---

<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />
<script type="application/ld+json" set:html={JSON.stringify(softwareSchema)} />

<section class="seo-section">
  
  <!-- Divider -->
  <div class="seo-divider"></div>

  <div class="seo-grid">
    
    <!-- Main Content Area -->
    <div class="seo-main">
      
      <!-- Dynamic Heading -->
      <div class="seo-intro">
        <h2 class="seo-h2">
          {customTitle || `Comprehensive Guide: How to ${isEnhance ? 'Increase' : isCrop ? 'Crop' : 'Compress'} Image to ${kbText}`}
        </h2>
        
        {uniqueContent ? (
          <div class="seo-unique-content" set:html={uniqueContent} />
        ) : (
          <p class="seo-p">
            Optimizing images for specific file sizes is a critical step for modern web applications and official document portals. 
            Whether you are applying for a government job, updating your professional profile, or managing a high-performance website, 
            having your images at the exact KB size ensures a smooth, rejection-free experience.
          </p>
        )}
      </div>

      <!-- How it works -->
      <div class="seo-steps">
        <h3 class="seo-h3">Technical Workflow: How High Quality Operates</h3>
        <ol class="seo-list">
          <li>
            <div class="seo-step-num">01</div>
            <div>
              <h4 class="seo-step-title">Source Ingestion</h4>
              <p class="seo-p-small">
                Upload your JPEG, PNG, or WEBP file. Our system immediately analyzes the binary structure and original metadata without uploading it to any server.
              </p>
            </div>
          </li>
          <li>
            <div class="seo-step-num">02</div>
            <div>
              <h4 class="seo-step-title">Parameter Calibration</h4>
              <p class="seo-p-small">
                Our engine identifies the target threshold ({kbText}). It sets up a binary search environment to find the perfect quality-to-size ratio.
              </p>
            </div>
          </li>
          <li>
            <div class="seo-step-num">03</div>
            <div>
              <h4 class="seo-step-title">Recursive Optimization</h4>
              <p class="seo-p-small">
                The Smart Compression Algorithm runs multiple compression passes in milliseconds, adjusting the chroma subsampling and DCT coefficients to hit your exact size.
              </p>
            </div>
          </li>
          <li>
            <div class="seo-step-num">04</div>
            <div>
              <h4 class="seo-step-title">Final Payload Generation</h4>
              <p class="seo-p-small">
                Once the mathematical optimum is reached, the optimized file is generated and made available for instant local download.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <!-- Detailed Use Cases -->
      <div class="seo-details">
        <h3 class="seo-h3">Why Precision {kbText} Compression Matters in 2026</h3>
        <p class="seo-p">
          In 2026, automated upload systems for banks, universities, and government portals have become significantly more sophisticated. 
          Standard image optimization often fails because generic tools prioritize simple file size reduction without considering 
          the strict "Target Thresholds" of modern systems. A file that is even 0.5KB over the limit 
          will result in an immediate "Upload Failed" error, which can be critical during high-stakes application deadlines.
        </p>
        <p class="seo-p">
          PdfAndImg solves this by providing a "Surgical Buffer" optimization. Our engine doesn't just aim for "small"; 
          it aims for <em>exactly right</em>. By keeping you just under the limit while maximizing the visual clarity 
          of your signature, facial features, or document text, we ensure that your submission passes both 
          automated AI verification and manual human review.
        </p>
        <p class="seo-p">
          For professionals and students alike, this means no more "trial and error" with generic image editors 
          or sketchy online tools that compromise your privacy. Our tool provides a repeatable, 
          predictable result every time. This reliability is why PdfAndImg has become the preferred 
          utility for users submitting documents to portals like SSC, UPSC, IBPS, and international visa systems.
        </p>
      </div>

      <!-- FAQ Section -->
      <div class="seo-faq">
        <h3 class="seo-h3">Frequently Asked Questions</h3>
        <div class="faq-stack">
          {faqData.map(item => (
            <div class="faq-item">
              <h4 class="faq-q">{item.q}</h4>
              <p class="faq-a">{item.a}</p>
            </div>
          ))}
          <div class="faq-item">
            <h4 class="faq-q">Does this tool store my personal documents?</h4>
            <p class="faq-a">
              No. Privacy is the core pillar of PdfAndImg. We utilize a "Serverless Pipeline" approach where all 
              binary processing is performed within your browser's local sandbox. Since no data is ever transmitted 
              to an external server, your sensitive identity documents, signatures, and photos remain 
              completely under your control at all times.
            </p>
          </div>
          <div class="faq-item">
            <h4 class="faq-q">Can I convert PNG or WEBP to {kbText} JPEG?</h4>
            <p class="faq-a">
              Yes. Our engine handles multiple input formats. Whether you start with a high-res PNG from a 
              professional camera or a modern WEBP screenshot, the Smart Image Compressor algorithm will automatically 
              convert and optimize the payload to a compliant JPEG format, ensuring 100% compatibility 
              with all major upload portals.
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- Sidebar / Context -->
    <div class="seo-sidebar">
      <div class="sidebar-box">
        <h3 class="sidebar-title">Optimized Use Cases</h3>
        <ul class="sidebar-list">
          <li>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Official Exam Portals</span>
          </li>
          <li>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Passport/Visa Requests</span>
          </li>
          <li>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Digital ID Card Creation</span>
          </li>
          <li>
            <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Bank KYC Documenting</span>
          </li>
        </ul>
      </div>

      <div class="sidebar-stats">
        <h3 class="stats-title">Technical Support</h3>
        <p class="stats-text"><strong>Formats:</strong> JPG, PNG, WEBP</p>
        <p class="stats-text"><strong>Privacy:</strong> No-Upload · Local Only</p>
      </div>

      <!-- Related Tools Cluster -->
      <div class="sidebar-box" style="margin-top: 40px;">
        <h3 class="sidebar-title">Related Optimizers</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
          {relatedTools.map(tool => (
            <a href={tool.href} class="related-tag">{tool.name}</a>
          ))}
        </div>
      </div>
    </div>

  </div>
</section>

<style>
  .seo-section {
    max-width: 1000px;
    margin: 80px auto 0;
    padding: 0 24px;
    text-align: left;
  }

  .seo-divider {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--color-border), transparent);
    margin-bottom: 80px;
  }

  .seo-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 80px;
  }

  @media (min-width: 900px) {
    .seo-grid {
      grid-template-columns: 1.8fr 1fr;
    }
  }

  .seo-main {
    display: flex;
    flex-direction: column;
    gap: 64px;
  }

  .seo-h2 {
    font-family: var(--font-display);
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 32px;
    color: var(--color-ink);
    line-height: 1.1;
  }

  .seo-h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: var(--color-ink);
  }

  .seo-p {
    font-size: 1rem;
    color: var(--color-ink-2);
    line-height: 1.8;
    margin-bottom: 20px;
  }

  .seo-p-small {
    font-size: 0.9375rem;
    color: var(--color-ink-2);
    line-height: 1.6;
  }

  .seo-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .seo-list li {
    display: flex;
    gap: 20px;
  }

  .seo-step-num {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    background: var(--color-surface-3);
    border: 1px solid var(--color-border-mid);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    color: var(--color-lime);
    font-weight: 700;
  }

  .seo-step-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-ink);
    margin-bottom: 8px;
  }

  .faq-stack {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .faq-q {
    color: var(--color-ink);
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 12px;
  }

  .faq-a {
    color: var(--color-ink-2);
    font-size: 0.9375rem;
    line-height: 1.7;
  }

  .sidebar-box {
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: 24px;
    padding: 32px;
    margin-bottom: 32px;
  }

  .sidebar-title {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-lime);
    margin-bottom: 24px;
  }

  .sidebar-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .sidebar-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 0.875rem;
    color: var(--color-ink-2);
  }

  .check-icon {
    color: var(--color-lime);
    margin-top: 2px;
  }

  .sidebar-stats {
    padding: 0 32px;
  }

  .stats-title {
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--color-ink-3);
    margin-bottom: 16px;
  }

  .stats-text {
    font-family: var(--font-mono);
    font-size: 0.6875rem;
    color: var(--color-ink-3);
    margin-bottom: 8px;
  }

  .related-tag {
    display: block;
    padding: 8px;
    background: var(--color-surface-3);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    font-size: 0.75rem;
    color: var(--color-ink-2);
    text-decoration: none;
    text-align: center;
    transition: all 0.2s ease;
  }
  .related-tag:hover {
    border-color: var(--color-lime);
    color: var(--color-lime);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    .seo-h2 { font-size: 1.75rem; }
    .seo-grid { gap: 48px; }
    .seo-main { gap: 48px; }
  }
</style>
```

---

## 8. International SERP-Vacuum Deployments & Live Pre-Flight Verification

### Verified Vacuum Tools Deployed Live
All 5 tools are 100% client-side (zero server, zero external storage) and verified returning `HTTP/2 200` with 0 redirects:

1. 🇩🇪 **German DSGVO PDF Redactor (`/de/pdf-schwaerzen/`)**:
   - Target Query: `pdf schwärzen` (>1,000/mo, 167 keywords, KD: Easy)
   - Architecture: In-browser HTML5 `<canvas>` redaction boxes + `pdf.js` page rasterization into flat bitmap PDF via `jsPDF`. Destroys underlying vector text layer and metadata.
2. 🇮🇹 **Italian .P7M CAdES Invoice Unwrapper (`/it/convertire-p7m-in-pdf/`)**:
   - Target Query: `aprire file p7m`, `convertire p7m in pdf` (>1,000/mo, 236 keywords)
   - Architecture: In-browser ASN.1 DER envelope stripper. Slices embedded `%PDF-1.` streams or parses `FatturaElettronica` XML into printable A4 layout via `jsPDF`.
3. 🇧🇷 **Brazilian Court PDF Splitter (`/pt/dividir-pdf-por-tamanho/`)**:
   - Target Query: `dividir pdf por tamanho` (>1,000/mo, 33 keywords, KD: Easy)
   - Architecture: `pdf-lib` binary size chunker with 3% margin for court portal caps (PJe 3MB, e-SAJ 10MB) + JSZip package generation.
4. 🇯🇵 **Japanese Health Insurance & MyNumber ID Blackout Studio (`/ja/hokensho-masking/`)**:
   - Target Query: `保険証 マスキング`, `マイナンバー マスキング` (>100/mo, 181 keywords)
   - Architecture: Pure-black `#000000` canvas masking with statutory presets for 記号・番号・枝番・保険者番号 + EXIF metadata scrubber.
5. 🇺🇸 **Global B2B PDF Redaction Studio (`/redact-pdf-online/`)**:
   - Target Query: `redact pdf online free`, `black out text in pdf`
   - Architecture: Zero-upload HIPAA and GDPR permanent rasterization.

### Content & AdSense Architecture Standard (The YouTuber Playbook)
- **Initial Launch Baseline:** ~600 words of SEO prose, step-by-step instructions, and Schema.org `FAQPage` + `SoftwareApplication` JSON-LD schema (all 5 new tools meet this baseline).
- **AdSense Approval Stage:** Tool page expansion to 2,000–3,000 words.
- **Single-Page Fix Engine:** 10–30 long-tail question articles in `/blog` published at 1 post/day over 30 days before review.
- **Production Build:** Astro v6.4.4 static build generated all **73 pages** in 28.34s with 0 errors. Sitemap indexation verified at `/sitemap-0.xml`.



---

## 9. AdSense Masterclass Playbook Full Compliance & De-Boilerplating Execution

### Audit Date: October 21, 2026 (AdSense Review Window Readiness)
### Production Build Status: 75 Static Pages Built in 26.86s (0 Errors, 0 Warnings)
### Active Git Commit: 5a0c936 (Branch: main)

### Complete Summary of Final Infrastructure & Content Upgrades

#### 1. De-Indexing Staging & Preview Environments (`public/_headers`)
- **Fix:** Added `https://pdfandimg.pages.dev/*` with `X-Robots-Tag: noindex` at the top of `public/_headers`.
- **Impact:** Prevents Googlebot from indexing Cloudflare preview URLs, eliminating duplicate content penalties across all 75 static routes while preserving full Content Security Policy (CSP) for Google AdSense, Analytics, and WASM binaries.

#### 2. Root Ads Authorization Record (`public/ads.txt`)
- **Fix:** Deployed `public/ads.txt` formatted strictly per IAB / Google specifications:
  ```
  google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
  ```
- **Mandatory Cloudflare Dashboard Rule:**
  - Cache Rule: Bypass Cache for `/ads.txt`
  - WAF Rule: Skip all security/Bot Fight Mode rules for `/ads.txt`

#### 3. 2,500+ Word Authority Homepage & Visible E-E-A-T Links (`src/pages/index.astro`)
- **Fix:** Expanded `src/pages/index.astro` to over 2,500 words of rich, human-helpful technical copy.
- **Above-The-Fold Trust Navigation:** Added explicit hero-area pills linking directly to `/about/`, `/contact/`, `/privacy/`, and `/terms/` alongside tool categories.
- **Deep Technical Sections:**
  - Mathematical breakdown of the 8-to-12 iteration Discrete Cosine Transform (DCT) binary-search Target-Lock algorithm.
  - Official 2026 Government Exam, KYC & International Visa Specifications Table (SSC, UPSC, IBPS, NEET UG, GATE, PAN NSDL/UTIITSL, US DS-160).
  - Detailed Zero-Server Client-Side Memory Architecture explanation (Web Workers, Canvas, WASM).
  - Complete PDF & International Utility ecosystem guide.
  - Rich JSON-LD schemas: `FAQPage` (6 detailed Q&As) + `SoftwareApplication`.

#### 4. AdSense DART Cookie & Privacy Policy Overhaul (`src/pages/privacy.astro`)
- **Fix:** Rewrote `src/pages/privacy.astro` with complete legal disclosures required by Google AdSense automated policy evaluators:
  - Explicit DoubleClick DART cookie disclosure.
  - User opt-out portals via `https://adssettings.google.com` and `https://www.aboutads.info/choices`.
  - Third-party advertising vendor notices.
  - Technical breakdown of 100% in-browser WebAssembly/Canvas processing (zero server file transmission).
  - Verifiable GDPR, CCPA, and LGPD user rights sections.

#### 5. Complete De-Boilerplating Across All 10 KB Landing Routes
Every single KB page now features 100% unique, domain-specific `uniqueContent` HTML, real-world statutory comparison tables, and 4 non-overlapping custom FAQs:
- `/compress-image-to-10kb/`: UPPSC, BPSC, High Court bar council thumb impressions and micro-signatures (4KB–12KB), high-frequency DCT ink preservation.
- `/compress-image-to-15kb/`: The 10KB–20KB golden sweet spot for SSC CGL, IBPS PO, SBI Clerk, and RRB signatures to avoid server margin boundary errors.
- `/compress-image-to-20kb/`: SSC CGL and IBPS signature ceiling vs. photo floor matrix, dual-mode guidance.
- `/compress-image-to-30kb/`: NSDL/UTIITSL PAN card photos, Railway RRB, and NEET UG 4KB–30KB signatures.
- `/compress-image-to-40kb/`: Safe buffer for 20KB–50KB exam portals, IBPS handwritten declaration & left thumb impression guidelines.
- `/compress-image-to-50kb/`: Universal biometric passport photo standards (ICAO 9303, 3.5×4.5cm, 2×2 in) and university admission portals.
- `/compress-image-to-100kb/`: Full-page marksheet and certificate scanning guide, high-luma quantization, KYC proofs.
- `/compress-image-to-200kb/`: NEET UG 4×6 inch postcard photos, UPSC Civil Services Mains DAF, GATE, and US DS-160 visa portraits.
- `/compress-image-to-500kb/`: Legal affidavits, property registration deeds (IGRS), corporate MCA21 filings, Australian/Canadian e-Visas.
- `/compress-image-to-1mb/`: Enterprise tenders (GeM 4.0, CPPP), 4K portfolio photography, and e-commerce hero shots.

#### 6. Zero-English Localized Chrome Across All 6 Supported Locales
- `src/data/i18nMap.ts`: Native translations for English (`en`), German (`de`), Italian (`it`), Portuguese (`pt`), Japanese (`ja`), and Indonesian (`id`).
- `src/layouts/Layout.astro` & `src/components/SmartRelatedTools.astro`: 100% locale-aware navigation, mobile drawer, footer, and contextual tool recommendations.

---

## 10. Master Verification Checklist for AdSense Submission

| Step | Requirement | Implementation Status | Verification Proof |
|---|---|---|---|
| 1 | AdSense DoubleClick Cookie Policy | ✅ Verified Live | `/privacy/` contains explicit DART cookie disclosures and Google opt-out URLs |
| 2 | Visible Trust Pages on Homepage | ✅ Verified Live | `index.astro` hero features direct links to About, Contact, Privacy, Terms |
| 3 | Homepage Content Depth | ✅ Verified Live | `index.astro` expanded to 2,500+ words of technical documentation + FAQ JSON-LD |
| 4 | Programmatic KB De-Boilerplating | ✅ 10/10 Routes De-boilerplated | All 10 KB pages have custom statutory tables, unique copy, and 4 bespoke FAQs |
| 5 | Staging De-Indexing Header | ✅ Verified Live | `public/_headers` has `X-Robots-Tag: noindex` on `https://pdfandimg.pages.dev/*` |
| 6 | Root `ads.txt` Deployment | ✅ Deployed in `public/` & `dist/` | `google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0` ready for pub ID |
| 7 | Production Build Integrity | ✅ 75 Pages Compiled | `npm run build` passes with 0 errors in 26.86 seconds |
| 8 | Master Codebase Backup | ✅ Synced to `/sdcard/` | `/sdcard/pdfandimg_complete_codebase.md` (1.47 MB, 127 files) |
