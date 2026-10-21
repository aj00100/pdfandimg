import fs from 'fs';
import path from 'path';

const projectRoot = '/data/data/com.termux/files/home/pdfandimg';
const outputFile = '/sdcard/pdfandimg_complete_codebase.md';

const excludeDirs = new Set([
  '.git', 
  '.astro', 
  '.astro-old', 
  'node_modules', 
  'dist', 
  'dist-old-2', 
  '.vite-new', 
  '.wrangler', 
  '.wrangler-old', 
  '.vscode'
]);
const excludeFiles = new Set(['package-lock.json', 'generate_argon_dump.mjs', 'pdfandimg_source_and_build_analysis.md']);
const binaryExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.ico', '.pdf', '.woff', '.woff2', '.ttf', '.eot']);

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (excludeDirs.has(file)) continue;
    if (excludeFiles.has(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = getFiles(projectRoot).sort();
const textFiles = [];
const binaryFiles = [];

for (const f of allFiles) {
  const ext = path.extname(f).toLowerCase();
  const relPath = path.relative(projectRoot, f);
  if (binaryExtensions.has(ext)) {
    binaryFiles.push({ path: relPath, size: fs.statSync(f).size });
  } else {
    textFiles.push(relPath);
  }
}

let dump = `# Complete Codebase Dump: pdfandimg.com

> **Generated:** ${new Date().toISOString()}
> **Target Model:** Gemini Argon / Ultra / Pro (Full Repository Context)
> **Architecture:** Astro v6.4.4 (MPA) · Cloudflare Pages · Tailwind CSS · 100% Pure Client-Side Static Utilities (Zero Server / Zero Functions)
> **Total Source Files:** ${textFiles.length}
> **Total Binary Assets:** ${binaryFiles.length}

---

## Section 1: Complete Forensic Defect & Strategic Remediation Archive (50 Total Issues & Portfolios Resolved)

### Part 1: Technical SEO & Infrastructure (BUG-01 to BUG-10)

| Defect ID | Defect Name | Severity | Primary Files Affected | Status |
|---|---|---|---|---|
| **BUG-01** | Programmatic String Interpolation (\`KBKB\`, \`CustomKB\`, \`PassportKB\`) | 🔴 Critical | \`src/components/SEOContent.astro\`, \`src/pages/exam-photo-resizer.astro\` | ✅ Resolved & Verified Live |
| **BUG-02** | Double Brand Suffix in \`<title>\` & Social Meta Tags | 🟡 Medium | \`src/layouts/Layout.astro\`, \`src/pages/404.astro\` | ✅ Resolved & Verified Live |
| **BUG-03** | Trailing Slash 308 Redirect Inconsistency | 🔴 Critical | \`astro.config.mjs\`, \`src/layouts/Layout.astro\` | ✅ Resolved & Verified Live |
| **BUG-04** | Internal Links Omitting Trailing Slashes (79+ instances) | 🟠 High | \`src/components/*\`, \`src/pages/*\`, \`src/data/toolsMap.ts\`, \`Layout.astro\` | ✅ Resolved & Verified Live |
| **BUG-05** | Restrictive CSP Header Threat (Breaking HEIC, PDF, WASM tools) | 🔴 Critical | \`public/_headers\` | ✅ Resolved & Verified Live |
| **BUG-06** | 5 Functional PDF Tools Excluded from Google Sitemap | 🟠 High | \`astro.config.mjs\` | ✅ Resolved & Verified Live |
| **BUG-07** | Non-Canonical \`Astro.url.href\` in \`SoftwareApplication\` JSON-LD | 🟠 High | \`SEOContent.astro\`, \`SEOContentFormat.astro\`, \`SEOContentResize.astro\` | ✅ Resolved & Verified Live |
| **BUG-08** | Legacy Sitemap Indexing Conflict | 🟡 Medium | \`public/_redirects\` | ✅ Resolved & Verified Live |
| **BUG-09** | Breadcrumb Schema Trailing Slash Non-Canonicals | 🟡 Medium | \`src/layouts/Layout.astro\` | ✅ Resolved & Verified Live |
| **BUG-10** | Unlinked Tools Dropdown in Mobile Navigation Drawer | 🟠 High | \`src/layouts/Layout.astro\` | ✅ Resolved & Verified Live |

### Part 2: Security, Logic & Memory Leaks (SEC-01..02, FUNC-01..06, SEO-01..04)

| Defect ID | Defect Name | Severity | Primary Files Affected | Status |
|---|---|---|---|---|
| **SEC-01** | Unauthenticated FCM Endpoint & Secrets | 🔴 Critical | Deleted \`functions/api/send-command.ts\`, deleted \`src/secrets/firebase.js\` | ✅ Resolved |
| **SEC-02** | DOM XSS via Unescaped Filenames in innerHTML | 🟠 High | All upload & preview components | ✅ Resolved |
| **FUNC-01** | Space-Byte Trailing Padding Inflating Compressed Files | 🔴 Critical | \`PDFCompressor.astro\`, \`JPGToPDFSize.astro\` | ✅ Resolved |
| **FUNC-02** | PDF Password Field Hidden Behind Failed Attempt & Case-Sensitive Ext | 🔴 Critical | \`PDFUnlocker.astro\` | ✅ Resolved |
| **FUNC-03** | Duplicate CDN jsPDF & Canvas Scale Factor Hardcoded | 🟠 High | \`MasterConverter.astro\` | ✅ Resolved |
| **FUNC-04** | Exam Preset Spec Inconsistencies (UPSC, GATE, SSC, PAN) | 🔴 Critical | \`ExamResizer.astro\` | ✅ Resolved |
| **FUNC-05** | Memory Leak: Unrevoked Object URLs Across Resets | 🟠 High | \`PDFExtract.astro\`, \`PDFSeparate.astro\`, \`PDFInsertImages.astro\`, \`PDFRemove.astro\` | ✅ Resolved |
| **FUNC-06** | Destructive Action Without Stash Confirmation | 🟡 Medium | \`PDFRemove.astro\` | ✅ Resolved |
| **SEO-01** | Missing SoftwareApplication Schemas | 🟠 High | \`SEOContentHEIC.astro\`, \`SEOContentPDF.astro\`, \`SEOContentUnlockPDF.astro\` | ✅ Resolved |
| **SEO-02** | Hardcoded Dynamic FAQ Missing Standard Exam Questions | 🟡 Medium | \`SEOContent.astro\` | ✅ Resolved |
| **SEO-03** | Brand Logo in Header Rendered as Non-Navigable \`<div>\` | 🟡 Medium | \`src/layouts/Layout.astro\` | ✅ Resolved |
| **SEO-04** | Manifest Theme Color Mismatch (#ffffff vs #0a0a0b) | 🟡 Medium | \`public/site.webmanifest\` | ✅ Resolved |

### Part 3: Deep Technical SEO, Accessibility & Robustness (Issues 1.1 to 3.6)

| Defect ID | Defect Category | Primary Files Affected | Summary Description | Status |
|---|---|---|---|---|
| **1.1** | Self-Filtering Logic | \`src/components/SEOContent.astro\` | Replaced \`.includes(targetKB)\` with \`.filter(tool => tool.href !== currentPath)\` | ✅ Resolved |
| **1.2** | Schema Disambiguation | \`src/components/SEOContentHEIC.astro\` | Dynamic \`PdfAndImg HEIC to \${targetFormat} Converter\` schema name and description | ✅ Resolved |
| **1.3** | Rich Snippets | All \`SEOContent*.astro\` components | Added descriptive summaries and \`featureList\` entity markup across all schemas | ✅ Resolved |
| **1.4** | Breadcrumbs | \`src/layouts/Layout.astro\` | Multi-segment subfolder breadcrumbs (\`Home > Indonesia > Kompres...\`) and title symbol stripping | ✅ Resolved |
| **2.1** | Heading Flow | \`ExamResizer.astro\`, \`Compressor.astro\` | Harmonized result view headings to avoid skipping heading levels | ✅ Resolved |
| **2.2** | CWV / A11y | Upload components, \`JPGToPDFSize.astro\` | Added missing \`alt\` attributes and replaced empty \`src=""\` with safe \`data:,\` | ✅ Resolved |
| **2.3** | Accessibility | \`src/components/ExamResizer.astro\` | Added explicit \`for\` attributes on all \`<label>\` elements | ✅ Resolved |
| **2.4** | Core Web Vitals | HEIC, PDF, and MasterConverter components | Added \`defer\` to all external inline third-party scripts | ✅ Resolved |
| **2.5** | CSS Syntax | \`src/components/Compressor.astro\` | Replaced invalid inline style with Tailwind \`class="panel p-6 md:p-8"\` | ✅ Resolved |
| **3.2** | Redundant Code | \`MasterConverter.astro\`, \`Compressor.astro\` | Removed duplicated variable assignment and state-resetting lines | ✅ Resolved |
| **3.3** | UX Accuracy | \`JPGToPDFSize.astro\`, \`PDFCompressor.astro\` | Corrected \`Padding metadata...\` to \`Finalizing PDF...\` | ✅ Resolved |
| **3.4** | Password Prompt UX | \`src/components/PDFUnlocker.astro\` | Contextual error guidance for encrypted PDFs requiring user passwords | ✅ Resolved |
| **3.5** | Multi-Frame HEIC | \`src/components/HEICConverterPNG.astro\` | Sequential index naming (\`_1.png\`, \`_2.png\`) for multi-frame bursts | ✅ Resolved |

### Part 4: Verified International SERP-Vacuum Portfolios Deployed Live

| Portfolio ID | Target URL | Primary Keyword & Volume | Market Opportunity | Status |
|---|---|---|---|---|
| **Portfolio G** | \`/de/pdf-schwaerzen/\` | 🇩🇪 \`pdf schwärzen\` (>1,000/mo, 167 kw, KD: Easy) | German DSGVO PDF Redactor. Rank #2 has 7 links, Reddit thread on Page 1. | ✅ Deployed & Live |
| **Portfolio H** | \`/it/convertire-p7m-in-pdf/\` | 🇮🇹 \`convertire p7m in pdf\`, \`aprire file p7m\` (>1,000/mo, 236 kw) | Italian CAdES .p7m & FatturaPA XML unwrapper. Rank #2 pulls 17k visits with 1 link! | ✅ Deployed & Live |
| **Portfolio F** | \`/pt/dividir-pdf-por-tamanho/\` | 🇧🇷 \`dividir pdf por tamanho\` (>1,000/mo, 33 kw, KD: Easy) | Brazil Legal PDF Splitter for PJe/e-SAJ. Rank #1 has 4 links; Page 1 padded with YouTube. | ✅ Deployed & Live |
| **Portfolio BB** | \`/ja/hokensho-masking/\` | 🇯🇵 \`保険証 マスキング\`, \`マイナンバー マスキング\` (>100/mo, 181 kw) | Japan Health Insurance & MyNumber ID Blackout Studio. 0 web tools on Page 1! | ✅ Deployed & Live |
| **Global B2B** | \`/redact-pdf-online/\` | 🇺🇸 \`redact pdf online free\`, \`black out text in pdf\` | 100% In-browser irreversible text layer destruction for HIPAA / GDPR compliance. | ✅ Deployed & Live |

### Part 5: Mandatory Content Architecture & AdSense Approval Engine (The YouTuber Playbook)

| Stage | Target Word Count | Purpose | Core Architectural Standard |
|---|---|---|---|
| **Initial Launch Stage** | **~600 words** | Rapid Google Indexing & Early Ranking | Tool UI above the fold, mobile responsive; step-by-step "How to Use" + features targeting primary & LSI keywords; FAQ section with \`SoftwareApplication\` + \`FAQPage\` JSON-LD schema (sourced from Ahrefs Questions & PAA). |
| **AdSense Approval Stage** | **2,000–3,000 words** | Overcoming "Low Value Content" Flags | Comprehensive technical guide, statutory regulations, edge-case troubleshooting, and extensive FAQ expansion directly on the tool page. |
| **Single-Page Fix (\`/blog\`)** | **10–30 Posts** (1/day over 30 days) | Overcoming "Thin Content / Too Few Pages" | Hyper-focused long-tail how-to questions (~800–1,500 words each). Published at strictly 1 post/day cadence, internally interlinked, indexed in GSC, with a 30-day waiting period before review. |
| **International Localization** | **100% Native** | 10X Traffic Advantage | Full native translation, zero mixed English, localized search intent and statutory terminology (Spain, Germany, Brazil, Italy, Japan). |

### Part 6: Production Build & Cloudflare Deployment Verification

- **Commit:** \`72e9aa4\` (\`feat(international): deploy 4 verified SERP-vacuum tools (DE, IT, BR, JP) & global redact tool\`)
- **Astro Static Compilation:** 73 static pages built cleanly in 28.34s with 0 errors.
- **Sitemap Indexation:** All 73 routes, including \`/de/pdf-schwaerzen/\`, \`/it/convertire-p7m-in-pdf/\`, \`/pt/dividir-pdf-por-tamanho/\`, \`/ja/hokensho-masking/\`, and \`/redact-pdf-online/\`, verified in \`sitemap-0.xml\`.
- **Live HTTP Status:** Verified live returning \`HTTP/2 200\` with 0 redirects on apex domain \`https://pdfandimg.com\`.
- **Content-Security-Policy (CSP):** Full AdSense creative domains allowlisted (\`pagead2.googlesyndication.com\`, \`partner.googleadservices.com\`, \`tpc.googlesyndication.com\`, \`*.adtrafficquality.google\`, \`ep2.adtrafficquality.google\`).
- **Memory Safety:** Mobile Safari iOS canvas memory lifecycle cleanup (\`canvas.width = 0\`, \`page.cleanup()\`, \`pdf.destroy()\`) implemented across all canvas and PDF tools.

---

## Section 2: Table of Contents & File Manifest

### Source Code Files (${textFiles.length} files)
`;

for (let i = 0; i < textFiles.length; i++) {
  const rel = textFiles[i];
  const anchor = 'file-' + rel.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
  dump += `${i + 1}. [${rel}](#${anchor})\n`;
}

dump += `
---

## Section 3: Binary Assets & Static Images Registry (${binaryFiles.length} assets)

| Path | Size (KB) | Role |
|---|---|---|
`;

for (const b of binaryFiles) {
  dump += `| \`${b.path}\` | ${(b.size / 1024).toFixed(2)} KB | Static Image / Icon Asset |\n`;
}

dump += `
---

## Section 4: Complete Source Code Repository

`;

for (let i = 0; i < textFiles.length; i++) {
  const rel = textFiles[i];
  const full = path.join(projectRoot, rel);
  const content = fs.readFileSync(full, 'utf8');
  const anchor = 'file-' + rel.replace(/[^a-zA-Z0-9_-]/g, '-').toLowerCase();
  
  let lang = 'text';
  if (rel.endsWith('.astro')) lang = 'astro';
  else if (rel.endsWith('.ts')) lang = 'typescript';
  else if (rel.endsWith('.js') || rel.endsWith('.mjs')) lang = 'javascript';
  else if (rel.endsWith('.json') || rel.endsWith('.webmanifest')) lang = 'json';
  else if (rel.endsWith('.css')) lang = 'css';
  else if (rel.endsWith('.svg')) lang = 'xml';
  else if (rel.endsWith('.md')) lang = 'markdown';
  else if (rel.endsWith('.html')) lang = 'html';

  dump += `<a id="${anchor}"></a>\n`;
  dump += `### [${i + 1}/${textFiles.length}] File: \`${rel}\`\n\n`;
  dump += `\`\`\`\`${lang}\n`;
  dump += content;
  if (!content.endsWith('\n')) dump += '\n';
  dump += `\`\`\`\`\n\n`;
  dump += `[Back to Top](#complete-codebase-dump-pdfandimgcom)\n\n---\n\n`;
}

fs.writeFileSync(outputFile, dump, 'utf8');
const stat = fs.statSync(outputFile);
console.log(`✅ Dump complete: ${outputFile} (${(stat.size / 1024 / 1024).toFixed(2)} MB, ${textFiles.length} files)`);
