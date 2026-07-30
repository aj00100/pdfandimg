import { c as createComponent } from "./astro-component_n1fR6C3-.mjs";
import { v as maybeRenderHead, K as renderTemplate } from "./sequence_AEcFSQau.mjs";
import { r as renderComponent } from "./worker-entry_DkCG0Wsc.mjs";
import { r as renderScript, $ as $$Layout } from "./Layout_DyrtNKf4.mjs";
const $$PDFUnlocker = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="unlock-root" style="max-width: 860px; margin: 0 auto; padding: 0 24px;"> <div class="panel p-5 md:p-8"> <div id="unlock-drop-zone" class="drop-zone" style="min-height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin-bottom: 24px; position: relative; border-radius: 16px;"> <input type="file" id="unlock-file-input" style="display: none;" accept="application/pdf"> <div id="unlock-upload-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px;"> <div style="width: 56px; height: 56px; border-radius: 12px; background: var(--color-surface-3); border: 1px solid var(--color-border-mid); display: flex; align-items: center; justify-content: center;"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> </div> <div> <p style="font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; color: var(--color-ink); margin: 0 0 4px;">Select Locked PDF</p> <p style="font-family: var(--font-mono); font-size: 0.6875rem; color: var(--color-ink-3); margin: 0;">Upload a password-protected PDF to unlock it locally</p> </div> <button onclick="document.getElementById('unlock-file-input').click()" class="btn-ghost" type="button" style="font-size: 0.75rem; z-index: 10;">Browse file</button> </div> <div id="unlock-preview-container" class="hidden" style="position: absolute; inset: 2px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px; background: var(--color-surface-2); border-radius: 14px; z-index: 5;"> <div style="font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-ink); text-align: center;"> <strong id="unlock-filename" style="display: block; margin-bottom: 4px;"></strong> <span id="unlock-filesize" style="color: var(--color-ink-2);"></span> </div> <button id="unlock-change-btn" class="btn-ghost" type="button" style="position: absolute; top: 12px; right: 12px; font-size: 0.75rem; z-index: 10;">Change</button> </div> </div> <!-- Password Input Field (Hidden Initially) --> <div id="unlock-password-container" class="hidden" style="margin-bottom: 24px;"> <label for="unlock-password" style="display: block; font-family: var(--font-mono); font-size: 0.6875rem; text-transform: uppercase; color: var(--color-ink-3); margin-bottom: 8px;">Document Password</label> <input type="password" id="unlock-password" class="input-number" placeholder="Enter password to open the file..." style="width: 100%; height: 56px; font-size: 1rem; padding: 0 16px; background: var(--color-surface-1); border: 2px solid var(--color-border); border-radius: 12px; color: var(--color-ink); outline: none;"> <p id="unlock-password-error" class="hidden" style="color: #f43f5e; font-size: 0.75rem; margin: 8px 0 0 0;">Incorrect password. Please try again.</p> </div> <button id="unlock-convert-btn" class="btn-primary" disabled style="width: 100%; height: 56px; font-size: 1rem;" type="button">
Unlock PDF
</button> </div> <div id="unlock-status-panel" class="hidden animate-up" style="margin-top: 24px;"> <div class="panel" style="padding: 24px;"> <div id="unlock-processing" class="hidden" style="flex-direction: column; width: 100%; gap: 16px; padding: 16px 0;"> <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-ink-2); text-align: center;" id="unlock-status-text">Loading secure engine...</div> <div style="width: 100%; max-width: 500px; margin: 0 auto; height: 4px; background: var(--color-surface-3); border-radius: 10px; overflow: hidden;"> <div id="unlock-progress-bar" style="width: 0%; height: 100%; background: currentColor; transition: width 0.3s ease;"></div> </div> </div> <div id="unlock-result-view" class="hidden flex-col gap-8 items-center w-full text-center"> <h2 style="font-size: 1.5rem; font-weight: 800; margin: 0;">PDF Unlocked!</h2> <div style="font-family: var(--font-mono); font-size: 0.875rem; color: var(--color-ink-2);" id="unlock-result-details">
All passwords and restrictions have been securely removed.
</div> <a id="unlock-download-link" href="#" class="btn-download" style="width: 100%; max-width: 400px; height: 56px; font-size: 1rem;">
Download Unlocked PDF
</a> <button id="unlock-reset-btn" class="btn-ghost" type="button" style="font-size: 0.75rem;">
← Unlock another file
</button> </div> </div> </div> </div> ${renderScript($$result, "/home/asus/mini_web/src/components/PDFUnlocker.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/asus/mini_web/src/components/PDFUnlocker.astro", void 0);
const $$SEOContentUnlockPDF = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SEOContentUnlockPDF;
  const { toolName } = Astro2.props;
  let isUnlock = toolName === "unlock-pdf";
  let title = isUnlock ? "How to Unlock PDF Files Online" : "How to Remove Passwords from PDFs Offline";
  let descIntro = isUnlock ? "Unlocking a PDF document" : "Removing a password or permission lock from a PDF document";
  let strongText = isUnlock ? "Unlock PDF" : "Remove Password from PDF";
  let h3_1 = isUnlock ? "Instant PDF Unlocking" : "Automatic Permission Unlocking";
  let faq_q1 = isUnlock ? "Can I unlock a PDF without the password?" : "Why do I need to enter a password for some files but not others?";
  let faq_a1 = isUnlock ? "If the PDF only has an owner password (restricting printing or copying), our tool unlocks it instantly without asking for a password. If it has a user password (restricting opening), you must provide the password to decrypt it." : 'PDFs have two types of passwords. "User passwords" encrypt the entire document and require the password to even open it. "Owner passwords" only restrict permissions like printing. Our tool can automatically bypass owner restrictions, but requires the password to decrypt user-locked files.';
  return renderTemplate`${maybeRenderHead()}<section class="seo-content-section container-stripe" data-astro-cid-agosyy4r> <div class="seo-content-wrapper" data-astro-cid-agosyy4r> <h2 data-astro-cid-agosyy4r>${title}</h2> <p class="seo-p" data-astro-cid-agosyy4r> ${descIntro} usually means uploading your highly sensitive financial or legal documents to a third-party server. Our <strong data-astro-cid-agosyy4r>${strongText}</strong> tool changes the paradigm. By leveraging WebAssembly, we securely unlock and decrypt your PDF documents entirely within your local browser.
</p> <div class="seo-grid" data-astro-cid-agosyy4r> <div class="seo-card" data-astro-cid-agosyy4r> <h3 data-astro-cid-agosyy4r>100% Client-Side Decryption</h3> <p class="seo-p" data-astro-cid-agosyy4r>
We utilize an enterprise-grade QPDF WebAssembly engine that runs locally on your device. Your sensitive passwords and confidential documents never leave your computer, ensuring absolute privacy.
</p> </div> <div class="seo-card" data-astro-cid-agosyy4r> <h3 data-astro-cid-agosyy4r>Lossless Quality</h3> <p class="seo-p" data-astro-cid-agosyy4r>
Unlike other offline tools that flatten or rasterize your PDF into an image (destroying text selection and links), our tool manipulates the raw PDF structure. Text, vector graphics, and forms remain perfectly intact.
</p> </div> <div class="seo-card" data-astro-cid-agosyy4r> <h3 data-astro-cid-agosyy4r>${h3_1}</h3> <p class="seo-p" data-astro-cid-agosyy4r>
If your PDF only has an "owner" password (restricting printing or copying), you don't even need to enter a password. Our tool automatically detects and strips these restrictions silently in the background.
</p> </div> </div> <h2 data-astro-cid-agosyy4r>Frequently Asked Questions</h2> <div class="seo-faq" data-astro-cid-agosyy4r> <div class="faq-item" data-astro-cid-agosyy4r> <h4 data-astro-cid-agosyy4r>Is this really safe for tax documents and bank statements?</h4> <p class="seo-p" data-astro-cid-agosyy4r>
Yes. Because the decryption engine is downloaded to your browser and runs locally in your RAM, there is zero risk of your files being intercepted or stored on a remote server. You can even disconnect from the internet before unlocking the file.
</p> </div> <div class="faq-item" data-astro-cid-agosyy4r> <h4 data-astro-cid-agosyy4r>${faq_q1}</h4> <p class="seo-p" data-astro-cid-agosyy4r> ${faq_a1} </p> </div> <div class="faq-item" data-astro-cid-agosyy4r> <h4 data-astro-cid-agosyy4r>Will my unlocked PDF look identical?</h4> <p class="seo-p" data-astro-cid-agosyy4r>
Absolutely. The decryption process is 100% mathematically lossless. All fonts, images, hyperlinks, and vector data are preserved exactly as they were in the original document.
</p> </div> </div> </div> </section>`;
}, "/home/asus/mini_web/src/components/SEOContentUnlockPDF.astro", void 0);
const $$UnlockPdf = createComponent(($$result, $$props, $$slots) => {
  const SEO_TITLE = "Unlock PDF Without Password — Remove PDF Password Online";
  const SEO_DESC = "Unlock PDF without password and remove PDF passwords securely. Remove print, copy, and editing restrictions instantly in your browser. No server uploads.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": SEO_TITLE, "description": SEO_DESC }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative z-20 pt-20 container-stripe"> <div style="text-align: center; margin-bottom: 48px;"> <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(244, 63, 94, 0.08); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 100px; padding: 5px 14px; margin-bottom: 24px;"> <span style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-lime);">Zero-Server Privacy</span> </div> <h1 style="font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1; margin: 0 0 24px; letter-spacing: -0.05em;">
Unlock PDF <span style="color: var(--color-lime);">Without</span><br> <span style="font-size: clamp(1.5rem, 4vw, 2.5rem); letter-spacing: -0.02em;">Password.</span> </h1> <p style="color: var(--color-ink-2); font-size: 1.125rem; margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6;">
Unlock PDFs and remove passwords securely without sending them to the cloud. Decryption happens 100% offline on your device.
</p> </div> ${renderComponent($$result2, "PDFUnlocker", $$PDFUnlocker, {})} </section> ${renderComponent($$result2, "SEOContentUnlockPDF", $$SEOContentUnlockPDF, { "toolName": "unlock-pdf" })} ` })}`;
}, "/home/asus/mini_web/src/pages/unlock-pdf.astro", void 0);
const $$file = "/home/asus/mini_web/src/pages/unlock-pdf.astro";
const $$url = "/unlock-pdf";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$UnlockPdf,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
