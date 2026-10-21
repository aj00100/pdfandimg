# 🎨 PdfAndImg.com — Complete Brand Assets, SVG Source Code & Argon Redesign Kit

> **Target Model:** Gemini 4 Argon / Ultra / Pro  
> **Brand Identity:** `PdfAndImg` (100% Client-Side In-Browser Image Compressor & Local PDF Studio)  
> **Aesthetic Theme:** Dark Cyberpunk / Linear Minimalist (Neon Cyber Lime `#C8F135`, Slate Obsidian `#0A0A0B`, Dark Surface `#111111`)

---

## 1. Brand Tokens & Design System

| Token | Hex / Value | Usage |
|---|---|---|
| **Primary Accent (Lime)** | `#C8F135` | Main brand color, buttons, active states, key gradients |
| **Secondary Accent (Emerald)** | `#38E54D` | Gradient blend paired with `#C8F135` |
| **Glow Accent (Cyan)** | `#22D3EE` | Subtle radial glow in marketing & OpenGraph assets |
| **Canvas Background** | `#0A0A0B` | Deep obsidian background of all pages & banners |
| **Surface 1 (Card Background)** | `#111111` / `#161618` | Elevated tool containers and icon backgrounds |
| **Border Subdued** | `rgba(255, 255, 255, 0.08)` | Minimal hairline dividers |
| **Border Active** | `rgba(200, 241, 53, 0.3)` | Hover borders and focus rings |
| **Typography Display** | `'Inter', system-ui, sans-serif` | Weight 800, tight letter-spacing (`-0.04em`) |
| **Squircle Curvature** | `25%` (`rx="128"` on 512x512) | Modern Apple / OneUI rounded icon silhouette |

---

## 2. Master Favicon & App Icon Source Code (`public/favicon.svg`)

This is the canonical SVG source used for browser tabs, web app manifests, and mobile bookmarks:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C8F135" />
      <stop offset="100%" stop-color="#38E54D" />
    </linearGradient>
    <filter id="shadow3" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="512" height="512" rx="128" fill="#111111"/>
  
  <g filter="url(#shadow3)">
    <rect x="120" y="120" width="272" height="272" rx="64" fill="url(#g3)" />
    
    <path d="M 256 160 L 256 320" stroke="#111111" stroke-width="44" stroke-linecap="round" />
    <path d="M 170 246 L 256 160 L 342 246" fill="none" stroke="#111111" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M 170 340 L 342 340" stroke="#111111" stroke-width="44" stroke-linecap="round" />
  </g>
</svg>
```

---

## 3. In-App Navigation Logo Mark (`src/layouts/Layout.astro`)

This is the exact markup and CSS rendering the logo in the website header and footer:

### HTML / JSX Markup:
```html
<a href="/" style="display: flex; align-items: center; gap: 10px; text-decoration: none;" aria-label="PdfAndImg">
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
  <span style="font-family: var(--font-display); font-size: 1.125rem; font-weight: 800; letter-spacing: -0.04em; color: var(--color-ink);">
    Pdf<span style="color: var(--color-lime);">And</span>Img
  </span>
</a>
```

### CSS Styling:
```css
.logo-mark {
  width: 32px;
  height: 32px;
  background: var(--color-lime); /* #C8F135 */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
}

.logo-mark:hover {
  transform: scale(1.06);
  box-shadow: 0 0 16px rgba(200, 241, 53, 0.35);
}
```

---

## 4. OpenGraph Social Share Card Source (`public/og-image.svg`)

Full 1200×630 vector banner rendered when links are shared on Twitter/X, WhatsApp, LinkedIn, Reddit, and Facebook:

```xml
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background base -->
    <rect id="bg" width="1200" height="630"/>

    <!-- Subtle grid pattern -->
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>

    <!-- Lime glow radial -->
    <radialGradient id="limeGlow" cx="18%" cy="80%" r="55%">
      <stop offset="0%" stop-color="#c8f135" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#c8f135" stop-opacity="0"/>
    </radialGradient>

    <!-- Cyan glow radial -->
    <radialGradient id="cyanGlow" cx="85%" cy="20%" r="45%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="#22d3ee" stop-opacity="0"/>
    </radialGradient>

    <!-- Gradient Defs -->
    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C8F135" />
      <stop offset="100%" stop-color="#38E54D" />
    </linearGradient>
    <filter id="shadow3" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Base background -->
  <rect width="1200" height="630" fill="#0a0a0b"/>

  <!-- Grid overlay -->
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Glow accents -->
  <rect width="1200" height="630" fill="url(#limeGlow)"/>
  <rect width="1200" height="630" fill="url(#cyanGlow)"/>

  <!-- Border frame -->
  <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

  <!-- Top-left corner accent -->
  <line x1="24" y1="24" x2="120" y2="24" stroke="#c8f135" stroke-width="2" stroke-linecap="round"/>
  <line x1="24" y1="24" x2="24" y2="120" stroke="#c8f135" stroke-width="2" stroke-linecap="round"/>

  <!-- Bottom-right corner accent -->
  <line x1="1176" y1="606" x2="1080" y2="606" stroke="#c8f135" stroke-width="2" stroke-linecap="round"/>
  <line x1="1176" y1="606" x2="1176" y2="510" stroke="#c8f135" stroke-width="2" stroke-linecap="round"/>

  <!-- Logo mark (upload arrow icon) -->
  <g transform="translate(80, 220)">
    <g transform="scale(0.125)">
      <rect width="512" height="512" rx="128" fill="#111113" stroke="rgba(200,241,53,0.3)" stroke-width="12"/>
      <g filter="url(#shadow3)">
        <rect x="120" y="120" width="272" height="272" rx="64" fill="url(#g3)" />
        <path d="M 256 160 L 256 320" stroke="#111111" stroke-width="44" stroke-linecap="round" />
        <path d="M 170 246 L 256 160 L 342 246" fill="none" stroke="#111111" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M 170 340 L 342 340" stroke="#111111" stroke-width="44" stroke-linecap="round" />
      </g>
    </g>
  </g>

  <!-- Brand Wordmark -->
  <text x="160" y="265" font-family="'Inter', system-ui, sans-serif" font-size="34" font-weight="800" letter-spacing="-1" fill="#f4f4f5">
    Pdf<tspan fill="#c8f135">And</tspan>Img
  </text>

  <!-- Tagline Badge -->
  <rect x="80" y="316" width="180" height="30" rx="6" fill="rgba(200,241,53,0.1)" stroke="rgba(200,241,53,0.3)" stroke-width="1"/>
  <text x="170" y="336" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="12" font-weight="600" fill="#c8f135" letter-spacing="1.5" text-anchor="middle">
    100% IN-BROWSER
  </text>

  <!-- Main Headline -->
  <text x="80" y="415" font-family="'Inter', system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5" fill="#ffffff">
    Precision Image Compression.
  </text>
  <text x="80" y="475" font-family="'Inter', system-ui, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5" fill="#a1a1aa">
    Target Any Exact File Size.
  </text>

  <!-- Key Tool Pills (Footer) -->
  <!-- Pill 1: 10KB-100KB -->
  <g transform="translate(80, 524)">
    <rect width="180" height="36" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <text x="90" y="23" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="600" fill="#e4e4e7" text-anchor="middle">10KB – 100KB Exact</text>
  </g>

  <!-- Pill 2: PDF Studio -->
  <g transform="translate(272, 524)">
    <rect width="160" height="36" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
    <text x="80" y="23" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="600" fill="#e4e4e7" text-anchor="middle">Local PDF Tools</text>
  </g>

  <!-- Pill 3: Zero Uploads -->
  <g transform="translate(444, 524)">
    <rect width="180" height="36" rx="8" fill="rgba(200,241,53,0.08)" stroke="rgba(200,241,53,0.25)" stroke-width="1"/>
    <text x="90" y="23" font-family="'Inter', system-ui, sans-serif" font-size="13" font-weight="600" fill="#c8f135" text-anchor="middle">Zero Server Uploads</text>
  </g>

  <!-- Right Decorative Hero Visual -->
  <g transform="translate(730, 160)">
    <!-- Back card -->
    <rect x="40" y="40" width="360" height="260" rx="16" fill="#141417" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
    
    <!-- Main Card -->
    <rect x="0" y="0" width="360" height="260" rx="16" fill="#18181b" stroke="rgba(200,241,53,0.2)" stroke-width="1.5"/>
    
    <!-- Card header -->
    <rect x="0" y="0" width="360" height="44" rx="16" fill="#1e1e24"/>
    <circle cx="24" cy="22" r="5" fill="#ef4444" opacity="0.8"/>
    <circle cx="40" cy="22" r="5" fill="#eab308" opacity="0.8"/>
    <circle cx="56" cy="22" r="5" fill="#22c55e" opacity="0.8"/>
    <text x="180" y="27" font-family="'JetBrains Mono', monospace" font-size="12" fill="#71717a" text-anchor="middle">compress-to-20kb.jpg</text>
    
    <!-- Stat 1: Before -->
    <text x="32" y="88" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#71717a">Original Size</text>
    <text x="32" y="116" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700" fill="#f43f5e">2.4 MB</text>
    
    <!-- Arrow -->
    <text x="180" y="116" font-family="'Inter', sans-serif" font-size="20" fill="#52525b" text-anchor="middle">→</text>
    
    <!-- Stat 2: After -->
    <text x="230" y="88" font-family="'Inter', sans-serif" font-size="12" font-weight="500" fill="#71717a">Target Output</text>
    <text x="230" y="116" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="800" fill="#c8f135">19.8 KB</text>
    
    <!-- Progress bar -->
    <rect x="32" y="146" width="296" height="8" rx="4" fill="#27272a"/>
    <rect x="32" y="146" width="290" height="8" rx="4" fill="#c8f135"/>
    
    <!-- Compliance tags -->
    <rect x="32" y="184" width="80" height="26" rx="6" fill="#27272a"/>
    <text x="72" y="201" font-family="'JetBrains Mono', monospace" font-size="11" fill="#a1a1aa" text-anchor="middle">SSC CGL</text>
    
    <rect x="122" y="184" width="70" height="26" rx="6" fill="#27272a"/>
    <text x="157" y="201" font-family="'JetBrains Mono', monospace" font-size="11" fill="#a1a1aa" text-anchor="middle">UPSC</text>
    
    <rect x="202" y="184" width="60" height="26" rx="6" fill="#27272a"/>
    <text x="232" y="201" font-family="'JetBrains Mono', monospace" font-size="11" fill="#a1a1aa" text-anchor="middle">GATE</text>
  </g>
</svg>
```

---

## 5. Required Binary Dimensions & Target Formats

When exporting or generating new artwork, create these exact files in `public/`:

| File Path | Dimensions | Format | Usage |
|---|---|---|---|
| `public/favicon.svg` | Scalable Vector | SVG | Primary scalable modern browser icon |
| `public/favicon.ico` | 16×16, 32×32, 48×48 | Multi-layer ICO | Legacy browser fallback |
| `public/favicon-16x16.png` | 16×16 | PNG | Browser tab icon |
| `public/favicon-32x32.png` | 32×32 | PNG | High-DPI browser tab icon |
| `public/apple-touch-icon.png` | 180×180 | PNG | iOS Home Screen Bookmark |
| `public/android-chrome-192x192.png` | 192×192 | PNG | Android PWA icon & manifest |
| `public/android-chrome-512x512.png` | 512×512 | PNG | High-Res splash screen icon & Google Play |
| `public/og-image.png` | 1200×630 | PNG | Social preview card (Twitter/X, WhatsApp, LinkedIn) |
| `public/og-image.svg` | 1200×630 | SVG | Vector master of social preview card |

---

## 6. Copy-Paste Prompt for Gemini Argon (Logo Redesign)

Give the following prompt to Gemini Argon when asking it to create new logos:

```markdown
You are a World-Class Senior Brand Designer & Vector SVG Artist.

I want you to redesign the brand logo and visual identity for "PdfAndImg" (https://pdfandimg.com).

### Context & Brand Essence:
- "PdfAndImg" is a blazing-fast, 100% client-side privacy-first web utility for:
  1) Precision image compression to exact KB sizes (10KB, 20KB, 50KB, 100KB for government exam & job forms)
  2) In-browser PDF studio (merge, split, extract, unlock, redact) with ZERO server uploads.
- The visual vibe is Dark Mode Cyberpunk / Modern Linear Minimalist.
- Core Color Palette:
  - Background: Deep Obsidian `#0A0A0B` and Surface `#111111`
  - Accent: Electric Cyber Lime `#C8F135` & Emerald `#38E54D`
  - Subtle Contrast: Cyan Glow `#22D3EE` or crisp white `#FFFFFF`

### Deliverables Needed:
1. **Concept 1: Geometric Precision (SaaS Icon)**
   - A modern 512x512 vector SVG icon representing compression, documents, or image pixels converging into a compact diamond/shield/squircle.
2. **Concept 2: Dynamic Dual Identity (PDF + Image)**
   - A clever icon showing the fusion of a document sheet (PDF) and visual frame/aperture (IMG) interlocking cleanly.
3. **Concept 3: Minimalist Monogram (P + I)**
   - A bold, high-contrast glyph merging the letters 'P' and 'I' with a downward compression or upward arrow accent.
4. **Header Micro-Mark (18x18 / 32x32)**
   - A simplified inline SVG version optimized for 18px-32px navbars with thick, crisp strokes.
5. **OpenGraph Banner (1200x630)**
   - Updated layout featuring the winning logo concept, cyber grid, stats card, and typography.

Please output the complete, valid, self-contained SVG code for each concept with no missing tags or external dependencies.
```
