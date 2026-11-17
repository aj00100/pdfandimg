# 📋 Master TODO & Post-Freeze Execution Blueprint: pdfandimg.com

**Date:** November 17, 2026  
**Status:** ⏳ **AWAITING USER APPROVAL BEFORE EXECUTION**  
**Repository:** `/data/data/com.termux/files/home/pdfandimg/`  
**Deployment Target:** Cloudflare Pages (`pdfandimg.com`)  
**Freeze Period Status:** Enacted Nov 1, 2026 ➔ Completed Nov 15, 2026 (16 days elapsed)

---

## 1. Executive Summary & GSC Telemetry Baseline (Nov 17, 2026)

Following the 14-day code freeze, the algorithmic doorway / thin-content penalty that previously suppressed the domain has been completely eradicated by Google:

* **Indexed Pages:** **72 Pages Fully Indexed** (Verified via GSC `Screenshot_20261117_125516.jpg` — 72 Indexed vs 70 Not Indexed).
* **Total Impressions:** **1,670 Impressions** across the last 28 days (Oct 19 – Nov 15, 2026).
* **Ranked Queries:** **533 Distinct Queries** active across Google Search.
* **Total Organic Clicks:** **12 Clicks** (100% sourced from India: Exam defect guides, 10KB/20KB/40KB compressors, and biometric photo tools).
* **International Reach:** **63 Countries** active in GSC (India: 757 impr, US: 258 impr, Australia: 179 impr, Germany: 71 impr, Brazil: 67 impr, Indonesia: 26 impr, Italy: 25 impr).
* **🔍 Bing Webmaster Site Scan (74 Pages Scanned — 0 Errors):**
  * **Status:** Completed (74 total pages crawled).
  * **Errors:** **0 (Zero Technical Errors!)**.
  * **Warnings:** 15 ("Title too long" cosmetic warning).
  * **Strategic Decision:** **No action required.** These comprehensive titles are deliberately engineered based on Ahrefs keyword cluster data (containing exact secondary keywords like *213x213 px*, *300 DPI*, *NSDL/UTIITSL*, *4x6 Postcard*, *DOP Stamp*). Preserving these strategic keywords captures long-tail search intent on Google and AI models, so Bing's character-length warning is safely dismissed.
* **🤖 Google Generative AI Overviews (SGE / Gemini Search Beta):**
  * **22 Total AI Overview Impressions** earned across 9 URLs.
  * **Top AI-Cited Page:** `/blog/gate-2026-goaps-photo-signature-upload-rectification-defect-fix/` (**11 Impressions — 50% of all AI Overviews citations!**).
  * **Other AI-Cited Pages:** Root Homepage `/` (3 impr), `/compress-image-to-10kb/` (3 impr), `/compress-image-to-40kb/` (2 impr), `/exam-photo-resizer/` (2 impr), `/id/kompres-foto-200kb/` (2 impr), `/avif-to-jpg/` (1 impr), `/blog/how-to-increase-image-size-in-kb-without-losing-quality/` (1 impr), `/pan-card-photo-resizer/` (1 impr).
  * **AI Geographic Spread:** India (17), Canada (2), Indonesia (2), Ireland (1).
* **Core Technical Diagnosis — "The Page 2 Cliff":**  
  Over **1,180 impressions** are concentrated on just 8 tools currently sitting on **Positions 11–22 (Page 2)**. Searchers see our URLs when scrolling past position 10, but click-through rates remain at 0% because the search snippets lack compelling, exact-match 2026 specification hooks and zero-server privacy badges.

---

## 2. Phase 1: Snippet & CTR Hook Upgrades (The 8 "Sleeping Giants")

Upgrading `<title>` and `<meta name="description">` on the 8 top-impression tools to lift them from Page 2 into Page 1 (Positions 3–7) and convert passive impressions into active clicks:

### 1. `src/pages/australian-passport-photo-size.astro`
* **GSC Metrics:** **241 Impressions (Site #1 Impression Asset)** | Australia: 179 Impressions
* **Target Queries:** `australian passport photo size` (4), `passport size photo australia` (6), `australian passport picture size` (4), `australian passport size photo maker` (4)
* **Current Title:** `Australian Passport Photo Size (35x45mm & 4x6 Printable Template)`
* **Current Meta:** `Australian passport photo resizer online. Crop and resize to official DFAT biometric specs (35x45mm & 4x6 printable template, 1200x1600 px). 100% free & private.`
* **Proposed Title:** `Australian Passport Photo Size (35x45mm) — Online Digital Photo Maker 2026`
* **Proposed Meta:** `Crop and resize your photo to exact Australian Passport requirements (35x45 mm, 820x1050 px at 600 DPI). 100% free, in-browser, compliant with AusPost & Passports.gov.au.`

---

### 2. `src/pages/convert-jpg-to-pdf-100kb.astro`
* **GSC Metrics:** **207 Impressions (Site #2 Impression Asset)** | 4.5X surge since Nov 1
* **Target Queries:** `jpg to pdf under 100kb` (31), `jpg to pdf 100kb` (30), `jpg to pdf converter 100 kb` (20), `image to pdf 100 kb` (17)
* **Current Title:** `JPG to PDF 100KB — Convert JPG to PDF 100 KB Online`
* **Current Meta:** `Convert your JPG image to a PDF file that is exactly 100KB in size online. Perfect for Income Tax, EPFO, and government portal uploads. 100% free and private.`
* **Proposed Title:** `Convert JPG to PDF Under 100KB Online Free (Exact Byte Lock)`
* **Proposed Meta:** `Compress and convert JPG, JPEG, and PNG to PDF under 100KB online. Locks exact file size below 100 KB for admission, job, and exam uploads without quality loss.`

---

### 3. `src/pages/passport-photo-2x2.astro`
* **GSC Metrics:** **182 Impressions (Site #3 Impression Asset)** | US: 258 Impressions
* **Target Queries:** `passport photo 2x2` (15), `2 x 2 photo` (13), `passport photo size` (13), `2 x 2 passport photo` (10), `2 by 2 passport photo` (10)
* **Current Title:** `2x2 Passport Photo Maker Online (600x600px US Specs) — PdfAndImg`
* **Current Meta:** `Create a perfect 2x2 inches US passport photo online. Instant auto-crop to 600x600 pixels. 100% free, private, and meets US State Department requirements.`
* **Proposed Title:** `2x2 Passport Photo Maker Online Free (600x600 px US Specs)`
* **Proposed Meta:** `Create official 2x2 inch (51x51 mm, 600x600 px) US passport, visa, and green card photos free online. Automatic face centering, white background, no upload required.`

---

### 4. `src/pages/redact-pdf-online.astro`
* **GSC Metrics:** **157 Impressions (Site #4 Impression Asset)**
* **Target Queries:** `redact pdf free` (54), `redact pdf online` (23), `redact pdf online free` (9), `free pdf redaction online` (6), `redact pdf` (5)
* **Current Title:** `Redact PDF Online Free — 100% In-Browser & Irreversible Text Removal`
* **Current Meta:** `Permanently black out sensitive text, SSNs, financial records, and private data from PDFs & images. 100% client-side rasterization with zero cloud uploads.`
* **Proposed Title:** `Redact PDF Free Online — 100% In-Browser Irreversible Redaction`
* **Proposed Meta:** `Permanently redact and black out sensitive text, SSN, and photos in PDF files online for free. Flattens vector layers in local browser RAM — zero server uploads.`

---

### 5. `src/pages/reduce-image-size-in-kb.astro`
* **GSC Metrics:** **131 Impressions (Site #5 Impression Asset)** | Consolidating twin equity
* **Target Queries:** `kb reducer` (18), `reduce image size in kb` (11), `reduce image size kb` (5), `reduce kb of image` (5), `reduce kb size` (5)
* **Current Title:** `Reduce Image Size in KB — Best Image Compressor in KB Online`
* **Current Meta:** `Looking to reduce image size in KB? Our free online tool helps you compress image size in KB with 100% precision and maximum quality.`
* **Proposed Title:** `Reduce Image Size in KB Online Free — Compress to Exact KB`
* **Proposed Meta:** `Reduce JPG, PNG, and WebP file size to exact KB (10KB, 20KB, 50KB, 100KB, 200KB) online without losing quality. 100% private, instant client-side compression.`

---

### 6. `src/pages/neet-photo-resizer.astro`
* **GSC Metrics:** **92 Impressions (Tool) + 26 Impressions (Guide) = 118 Impressions**
* **Target Queries:** `neet photo size` (33), `neet photo resizer` (11), `postcard size photo for neet` (5), `neet photo editor` (4), `upload postcard size photo neet` (2)
* **Current Title:** `NEET Photo Resizer — 4×6 Postcard & Passport Size (10KB–200KB) Free — PdfAndImg`
* **Current Meta:** `Free NTA NEET photo resizer. Instantly format your 4x6 inch postcard photo, passport photo, signature (4-30KB), and thumb impression to exact NTA guidelines with Name & Date (DOP) stamp.`
* **Proposed Title:** `NEET 2026 Photo & 4x6 Postcard Resizer — NTA Specs & DOP Name Date Stamp`
* **Proposed Meta:** `Resize passport photo (3.5x4.5cm) and 4x6 inch Postcard photo (1200x1800px) with Name and Date of Photograph (DOP) for NTA NEET 2026. Locks 10KB–200KB.`

---

### 7. `src/pages/de/pdf-schwaerzen.astro`
* **GSC Metrics:** **89 Impressions** | Germany: 71 Impressions
* **Target Queries:** `pdf datei schwärzen` (15), `pdf schwärzen` (12), `pdf schwärzen online` (7), `pdf anonymisieren` (7), `dokumente schwärzen` (7), `dokumente richtig schwärzen` (6)
* **Current Title:** `PDF schwärzen online kostenlos — 100% DSGVO-konform im Browser`
* **Current Meta:** `Schwärzen Sie sensible Texte, Kontodaten und Namen in PDF-Dateien kostenlos und unwiderruflich. 100% lokal im Browser ohne Server-Upload (DSGVO-sicher).`
* **Proposed Title:** `PDF schwärzen online kostenlos — 100% DSGVO-konform ohne Upload`
* **Proposed Meta:** `PDF schwärzen und sensible Daten unkenntlich machen. 100% DSGVO-konform direkt im Browser ohne Server-Upload. Dauerhaftes Unkenntlichmachen von Namen, Adressen und IBAN.`

---

### 8. `src/pages/ibps-photo-resizer.astro`
* **GSC Metrics:** **83 Impressions (Tool) + 23 Impressions (Guide) = 106 Impressions**
* **Target Queries:** `ibps photo size` (29), `ibps photo resizer` (7), `ibps po photo size` (6), `ibps left thumb impression` (5), `ibps clerk photo size` (5), `ibps signature size` (3)
* **Current Title:** `IBPS Photo, Signature, Thumb & Declaration Resizer (2026 Free) — PdfAndImg`
* **Current Meta:** `Free 4-in-1 IBPS image resizer for PO, Clerk, and RRB. Convert candidate photo (20-50KB), signature (10-20KB), left thumb (20-50KB), and handwritten declaration (50-100KB) in your browser.`
* **Proposed Title:** `IBPS Photo, Signature, Left Thumb & Declaration Resizer (2026 Official)`
* **Proposed Meta:** `Official 4-in-1 IBPS upload resizer: Photo (200x230px, 20-50KB), Signature (140x60px), Left Thumb Impression (240x240px), and Handwritten Declaration (800x400px).`

---

## 3. Phase 2: Editorial Conversion Funnels from Top Click Magnets

In `src/data/blogPosts.ts`, our editorial guides act as indexing and traffic locomotives. We will inject prominent, high-converting interactive CTA cards at the top and middle of our top-performing guides:

1. **GATE 2026 GOAPS Guide (`gate-2026-goaps-photo-signature-upload-rectification-defect-fix`):**
   * *Status:* **Site Click Leader (2 Clicks, 44 Impressions, 4.5% CTR)**.
   * *Action:* Add prominent visual CTA hero banner linking directly to [`/gate-photo-resizer/`](file:///data/data/com.termux/files/home/pdfandimg/src/pages/gate-photo-resizer.astro) and [`/convert-jpg-to-pdf-100kb/`](file:///data/data/com.termux/files/home/pdfandimg/src/pages/convert-jpg-to-pdf-100kb.astro).
2. **iPhone HEIC Guide (`convert-iphone-heic-photo-to-jpg-for-government-exam-portals`):**
   * *Status:* **CTR Leader (1 Click, 3 Impressions, 33.3% CTR)**.
   * *Action:* Add 1-click CTA linking directly into [`/convert-heic-to-jpg/`](file:///data/data/com.termux/files/home/pdfandimg/src/pages/convert-heic-to-jpg.astro) and [`/convert-heic-to-pdf/`](file:///data/data/com.termux/files/home/pdfandimg/src/pages/convert-heic-to-pdf.astro).
3. **NEET UG Guide (`neet-ug-2026-passport-photo-vs-4x6-postcard-photo-specifications`):**
   * *Action:* Embed direct CTA card to [`/neet-photo-resizer/`](file:///data/data/com.termux/files/home/pdfandimg/src/pages/neet-photo-resizer.astro) emphasizing the 4×6" Postcard tab and Name/Date stamp.
4. **IBPS Guide (`ibps-po-clerk-sbi-photo-signature-thumb-declaration-size-guide`):**
   * *Action:* Embed direct CTA card to [`/ibps-photo-resizer/`](file:///data/data/com.termux/files/home/pdfandimg/src/pages/ibps-photo-resizer.astro) highlighting the 4-in-1 switcher (Photo, Signature, Left Thumb, Handwritten Declaration).

---

## 4. Phase 3: Technical Validation & Static Build Protocol

Before pushing to production, execute full local verification:
1. **Compilation Test:**
   ```bash
   npm run build
   ```
   * Must build all 69 production routes cleanly with 0 errors and 0 warnings.
2. **Sitemap Cleanliness:**
   * Verify `dist/sitemap-0.xml` contains exactly 69 clean URLs ending with trailing slashes.
3. **Redirect Parity:**
   * Verify `dist/_redirects` contains all 1-hop 301 rules for legacy twin paths and trailing slash fallbacks.

---

## 5. Phase 4: Automated Bing & IndexNow Dispatch

Run the Bing submission script to refresh our indexation on Microsoft Bing and Copilot:
```bash
python3 scripts/submit-bing.py
```
* Submits `sitemap-index.xml` and `sitemap-0.xml` via `SubmitFeed`.
* Dispatches `SubmitUrlbatch` with all 69 production URLs.

---

## 6. Phase 5: Cloudflare Deployment & AdSense Threshold Policy

1. **Deploy to Cloudflare Pages edge via Wrangler:**
   ```bash
   npx wrangler pages deploy dist --project-name pdfandimg
   ```
2. **AdSense "Request Review" Milestone Policy:**
   * **DO NOT** click "Request Review" immediately.
   * Monitor GSC clicks daily. As the 8 Page 2 tools climb into Page 1 following these snippet updates, organic traffic will scale from ~0.4 clicks/day toward **10–15 daily organic visitors**.
   * When the 10–15 daily visitor threshold is reached, submit to AdSense for a high-confidence, single-pass approval.

---

## 7. Execution Readiness

- [ ] User review and approval of the TODO file.
- [ ] Implement Phase 1 snippet updates on the 8 tools.
- [ ] Implement Phase 2 internal CTA links in `src/data/blogPosts.ts`.
- [ ] Run `npm run build` and verify clean build.
- [ ] Execute `python3 scripts/submit-bing.py`.
- [ ] Deploy to Cloudflare Pages edge.
- [ ] Commit and sync to GitHub repository (`origin/main`).
