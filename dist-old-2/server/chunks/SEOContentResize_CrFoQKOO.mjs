import { c as createComponent } from "./astro-component_n1fR6C3-.mjs";
import { v as maybeRenderHead, a0 as addAttribute, K as renderTemplate, bj as unescapeHTML } from "./sequence_AEcFSQau.mjs";
import { r as renderScript } from "./Layout_DyrtNKf4.mjs";
const $$Resizer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Resizer;
  const { allowMultiple = true, defaultWidth = 1080, defaultHeight = 1080 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="resizer-root" style="max-width: 860px; margin: 0 auto; padding: 0 24px;"> <div class="panel p-5 md:p-8"> <div id="rs-drop-zone" class="drop-zone" style="min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin-bottom: 24px; position: relative; border-radius: 16px;"> <input type="file" id="rs-file-input" style="display: none;" accept="image/jpeg,image/png,image/webp"${addAttribute(allowMultiple, "multiple")}> <div id="rs-upload-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px;"> <div style="width: 56px; height: 56px; border-radius: 12px; background: var(--color-surface-3); border: 1px solid var(--color-border-mid); display: flex; align-items: center; justify-content: center;"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> </div> <div> <p style="font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; color: var(--color-ink); margin: 0 0 4px;">${allowMultiple ? "Drop images here" : "Drop image here"}</p> <p style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-ink-3); margin: 0;">to resize</p> </div> <button onclick="document.getElementById('rs-file-input').click()" class="btn-ghost" type="button" style="font-size: 0.75rem; z-index: 10;">Browse files</button> </div> <div id="rs-preview-container" class="hidden" style="position: absolute; inset: 2px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px; background: var(--color-surface-2); border-radius: 14px; z-index: 5;"> <img id="rs-upload-preview" src="" alt="Preview" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px; display: none;"> <div id="rs-bulk-text" style="display: none; font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-ink); max-height: 200px; overflow-y: auto; width: 100%;"></div> <button id="rs-change-btn" class="btn-ghost" type="button" style="position: absolute; top: 12px; right: 12px; font-size: 0.75rem; z-index: 10;">Change</button> </div> </div> <div style="display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap;"> <div style="flex: 1; min-width: 120px;"> <label for="rs-width" style="display: block; font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-ink-3); margin-bottom: 8px; text-align: center;">Width (px)</label> <input type="number" id="rs-width"${addAttribute(defaultWidth, "value")} class="input-number" style="width: 100%; height: 56px; font-size: 1.25rem; text-align: center;"> </div> <div style="flex: 1; min-width: 120px;"> <label for="rs-height" style="display: block; font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-ink-3); margin-bottom: 8px; text-align: center;">Height (px)</label> <input type="number" id="rs-height"${addAttribute(defaultHeight, "value")} class="input-number" style="width: 100%; height: 56px; font-size: 1.25rem; text-align: center;"> </div> <div style="flex: 1; min-width: 120px;"> <label for="rs-format" style="display: block; font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-ink-3); margin-bottom: 8px; text-align: center;">Format</label> <select id="rs-format" class="input-number" style="width: 100%; height: 56px; font-size: 1.125rem; text-align: center; background: var(--color-surface-1) url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L5%205L9%201%22%20stroke%3D%22%2362666D%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E') no-repeat right 16px center; appearance: none; cursor: pointer; border: 2px solid var(--color-border); border-radius: 12px; color: var(--color-ink); outline: none;"> <option value="auto" selected>Keep Original</option> <option value="image/jpeg">JPG</option> <option value="image/png">PNG</option> <option value="image/webp">WEBP</option> <option value="application/pdf">PDF</option> </select> </div> </div> <button id="rs-convert-btn" class="btn-primary" disabled style="width: 100%; height: 56px; font-size: 1rem; display: flex; align-items: center; justify-content: center; gap: 8px;" type="button"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"> <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon> </svg>
Instant Resize
</button> </div> <div id="rs-status-panel" class="hidden animate-up" style="margin-top: 24px;"> <div class="panel" style="padding: 24px;"> <div id="rs-processing" class="hidden" style="flex-direction: column; width: 100%; gap: 16px; padding: 16px 0;"> <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-ink-2); text-align: center;" id="rs-status-text">Processing...</div> <div style="width: 100%; max-width: 500px; margin: 0 auto; height: 4px; background: var(--color-surface-3); border-radius: 10px; overflow: hidden;"> <div id="rs-progress-bar" style="width: 0%; height: 100%; background: currentColor; transition: width 0.3s ease;"></div> </div> </div> <div id="rs-result-view" class="hidden flex-col gap-8 items-center w-full text-center"> <h2 style="font-size: 1.5rem; font-weight: 800; margin: 0;">Resize Complete!</h2> <a id="rs-download-link" href="#" class="btn-download" style="width: 100%; max-width: 400px; height: 56px; font-size: 1rem;">
Download Resized
</a> <button id="rs-reset-btn" class="btn-ghost" type="button" style="font-size: 0.75rem;">
← Resize another
</button> </div> </div> </div> </div> ${renderScript($$result, "/home/asus/mini_web/src/components/Resizer.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/asus/mini_web/src/components/Resizer.astro", void 0);
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$SEOContentResize = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SEOContentResize;
  const { isPassport = false } = Astro2.props;
  const faqData = [
    {
      q: `Is it safe to upload my personal photo for ${isPassport ? "passport resizing" : "pixel resizing"}?`,
      a: `Yes, it is 100% safe. PdfAndImg processes your images locally in your web browser. Your sensitive identity photographs are never uploaded to a remote server, ensuring total privacy and preventing identity theft.`
    },
    {
      q: `Will changing the pixel dimensions reduce the file size?`,
      a: `Usually, yes. Reducing the pixel dimensions (width and height) removes a massive amount of data from the image, which naturally lowers the file size in KB or MB. However, if you are increasing the dimensions (upscaling), the file size will increase.`
    },
    {
      q: `Does this tool meet official government requirements?`,
      a: isPassport ? `Yes! Our Passport Size Photo maker is pre-calibrated for the standard US passport and visa dimensions (600x600 pixels). However, always double-check your specific local government portal's requirements.` : `Our Pixel Resizer allows you to set the exact mathematical width and height required by your target platform, ensuring 100% compliance with strict upload portals.`
    }
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
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
    "name": isPassport ? `PdfAndImg Passport Photo Maker` : `PdfAndImg Exact Pixel Resizer`,
    "url": Astro2.url.href,
    "operatingSystem": "WebBrowser",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };
  const relatedTools = [
    { name: "Crop Image", href: "/crop-image" },
    { name: "Compress to 20KB", href: "/compress-image-to-20kb" },
    { name: "Compress to 50KB", href: "/compress-image-to-50kb" },
    { name: "PNG to JPG", href: "/png-to-jpg" }
  ];
  return renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> ", '<section class="seo-section" data-astro-cid-4kiryi26> <!-- Divider --> <div class="seo-divider" data-astro-cid-4kiryi26></div> <div class="seo-grid" data-astro-cid-4kiryi26> <!-- Main Content Area --> <div class="seo-main" data-astro-cid-4kiryi26> <!-- Dynamic Heading --> <div class="seo-intro" data-astro-cid-4kiryi26> <h2 class="seo-h2" data-astro-cid-4kiryi26> ', ` </h2> <p class="seo-p" data-astro-cid-4kiryi26>
In an increasingly strict digital landscape, uploading photos with incorrect dimensions is the leading cause of application rejection. Whether you are submitting a job application to a corporate portal, uploading a headshot for a government ID card, or preparing assets for a high-performance website, getting the pixel dimensions exactly right is non-negotiable.
</p> <p class="seo-p" data-astro-cid-4kiryi26>
Most modern smartphone cameras take incredibly high-resolution photos—often exceeding 4000x3000 pixels. While these look stunning, they are far too large for standard web portals, which usually require specific dimensions like 600x600 pixels or 1080x1080 pixels. Our browser-based resizing engine allows you to mathematically redefine the exact width and height of your image without relying on slow, privacy-invading cloud services.
</p> </div> <!-- How it works --> <div class="seo-steps" data-astro-cid-4kiryi26> <h3 class="seo-h3" data-astro-cid-4kiryi26>Technical Workflow: How the Resizer Engine Works</h3> <ol class="seo-list" data-astro-cid-4kiryi26> <li data-astro-cid-4kiryi26> <div class="seo-step-num" data-astro-cid-4kiryi26>01</div> <div data-astro-cid-4kiryi26> <h4 class="seo-step-title" data-astro-cid-4kiryi26>Zero-Upload Ingestion</h4> <p class="seo-p-small" data-astro-cid-4kiryi26>
Your photograph is instantly read into your device's local memory. We do not upload your sensitive identity photos to any remote server, guaranteeing absolute privacy.
</p> </div> </li> <li data-astro-cid-4kiryi26> <div class="seo-step-num" data-astro-cid-4kiryi26>02</div> <div data-astro-cid-4kiryi26> <h4 class="seo-step-title" data-astro-cid-4kiryi26>Mathematical Scaling</h4> <p class="seo-p-small" data-astro-cid-4kiryi26>
Our algorithm calculates the difference between your original resolution and your target dimensions. It utilizes bicubic interpolation to smoothly downscale or upscale the pixels.
</p> </div> </li> <li data-astro-cid-4kiryi26> <div class="seo-step-num" data-astro-cid-4kiryi26>03</div> <div data-astro-cid-4kiryi26> <h4 class="seo-step-title" data-astro-cid-4kiryi26>Canvas Rendering</h4> <p class="seo-p-small" data-astro-cid-4kiryi26>
The calculated pixels are drawn onto an HTML5 Canvas matching your exact required width and height, effectively cropping and scaling the image in a fraction of a second.
</p> </div> </li> <li data-astro-cid-4kiryi26> <div class="seo-step-num" data-astro-cid-4kiryi26>04</div> <div data-astro-cid-4kiryi26> <h4 class="seo-step-title" data-astro-cid-4kiryi26>Instant Local Export</h4> <p class="seo-p-small" data-astro-cid-4kiryi26>
The canvas is immediately converted back into an optimized JPEG or PNG file. If you are processing multiple photos, they are instantly compiled into a ZIP archive for one-click downloading.
</p> </div> </li> </ol> </div> <!-- Detailed Use Cases --> <div class="seo-details" data-astro-cid-4kiryi26> <h3 class="seo-h3" data-astro-cid-4kiryi26>Why Exact Dimensions Matter</h3> <p class="seo-p" data-astro-cid-4kiryi26>
Automated web portals utilize rigid bounding boxes. If you upload a massive smartphone photo to a government application portal, the system's automated AI will often attempt to crop it randomly, potentially cutting off vital parts of your face or signature. By taking control of the resizing process locally, you ensure that your subject matter remains perfectly centered and visible.
</p> <p class="seo-p" data-astro-cid-4kiryi26> `, ` </p> <p class="seo-p" data-astro-cid-4kiryi26>
Avoid the security risks of uploading your face and identity to sketchy free-tier websites. With PdfAndImg's client-side processing architecture, you achieve professional-grade results instantly, with the absolute certainty that your data never left your computer.
</p> </div> <!-- FAQ Section --> <div class="seo-faq" data-astro-cid-4kiryi26> <h3 class="seo-h3" data-astro-cid-4kiryi26>Frequently Asked Questions</h3> <div class="faq-stack" data-astro-cid-4kiryi26> `, ' </div> </div> </div> <!-- Sidebar / Context --> <div class="seo-sidebar" data-astro-cid-4kiryi26> <div class="sidebar-box" data-astro-cid-4kiryi26> <h3 class="sidebar-title" data-astro-cid-4kiryi26>Optimized Use Cases</h3> <ul class="sidebar-list" data-astro-cid-4kiryi26> <li data-astro-cid-4kiryi26> <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-4kiryi26><polyline points="20 6 9 17 4 12" data-astro-cid-4kiryi26></polyline></svg> <span data-astro-cid-4kiryi26>Passports & Visas</span> </li> <li data-astro-cid-4kiryi26> <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-4kiryi26><polyline points="20 6 9 17 4 12" data-astro-cid-4kiryi26></polyline></svg> <span data-astro-cid-4kiryi26>Government ID Cards</span> </li> <li data-astro-cid-4kiryi26> <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-4kiryi26><polyline points="20 6 9 17 4 12" data-astro-cid-4kiryi26></polyline></svg> <span data-astro-cid-4kiryi26>Social Media Profile Pics</span> </li> <li data-astro-cid-4kiryi26> <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" data-astro-cid-4kiryi26><polyline points="20 6 9 17 4 12" data-astro-cid-4kiryi26></polyline></svg> <span data-astro-cid-4kiryi26>eCommerce Galleries</span> </li> </ul> </div> <div class="sidebar-stats" data-astro-cid-4kiryi26> <h3 class="stats-title" data-astro-cid-4kiryi26>Technical Specifications</h3> <p class="stats-text" data-astro-cid-4kiryi26><strong data-astro-cid-4kiryi26>Algorithm:</strong> Bicubic Canvas Scaling</p> <p class="stats-text" data-astro-cid-4kiryi26><strong data-astro-cid-4kiryi26>Privacy:</strong> No Server Upload</p> </div> <!-- Related Tools Cluster --> <div class="sidebar-box" style="margin-top: 40px;" data-astro-cid-4kiryi26> <h3 class="sidebar-title" data-astro-cid-4kiryi26>Related Tools</h3> <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;" data-astro-cid-4kiryi26> ', " </div> </div> </div> </div> </section>"])), unescapeHTML(JSON.stringify(jsonLd)), unescapeHTML(JSON.stringify(softwareSchema)), maybeRenderHead(), isPassport ? "Comprehensive Guide: Creating Official Passport & Visa Photos" : "Comprehensive Guide: Resizing Images to Exact Pixel Dimensions", isPassport ? "For official passports, visas, and ID cards, the requirements are heavily standardized. The US Department of State, for example, demands a minimum of 600x600 pixels. Our Passport Maker tool defaults to these exact dimensions, removing the guesswork and ensuring your application avoids the dreaded 'Photo Rejected' delay." : "For social media professionals, web developers, and eCommerce managers, maintaining consistent image dimensions is key to a polished visual aesthetic. Our bulk resizer allows you to drag 50 diverse images into the engine and instantly unify them to the exact same width and height.", faqData.map((item) => renderTemplate`<div class="faq-item" data-astro-cid-4kiryi26> <h4 class="faq-q" data-astro-cid-4kiryi26>${item.q}</h4> <p class="faq-a" data-astro-cid-4kiryi26>${item.a}</p> </div>`), relatedTools.map((tool) => renderTemplate`<a${addAttribute(tool.href, "href")} class="related-tag" data-astro-cid-4kiryi26>${tool.name}</a>`));
}, "/home/asus/mini_web/src/components/SEOContentResize.astro", void 0);
export {
  $$Resizer as $,
  $$SEOContentResize as a
};
