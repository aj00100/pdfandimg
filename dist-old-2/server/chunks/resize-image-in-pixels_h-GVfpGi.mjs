import { c as createComponent } from "./astro-component_n1fR6C3-.mjs";
import { K as renderTemplate, v as maybeRenderHead } from "./sequence_AEcFSQau.mjs";
import { r as renderComponent } from "./worker-entry_DkCG0Wsc.mjs";
import { $ as $$Layout } from "./Layout_DyrtNKf4.mjs";
import { $ as $$Resizer, a as $$SEOContentResize } from "./SEOContentResize_CrFoQKOO.mjs";
const $$ResizeImageInPixels = createComponent(($$result, $$props, $$slots) => {
  const SEO_TITLE = "Change Image Size in Pixel — Fast Online Resizer";
  const SEO_DESC = "Instantly change image size in pixel (width & height). Fast, bulk resizing directly in your browser with no quality loss.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": SEO_TITLE, "description": SEO_DESC }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative z-20 pt-20 container-stripe"> <div style="text-align: center; margin-bottom: 48px;"> <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(163, 44, 245, 0.08); border: 1px solid rgba(163, 44, 245, 0.2); border-radius: 100px; padding: 5px 14px; margin-bottom: 24px;"> <span style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-lime);">Feature: Pixel Resizer</span> </div> <h1 style="font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1; margin: 0 0 24px; letter-spacing: -0.05em;">
Change Image Size <br> <span style="color: var(--color-lime);">in Pixel.</span> </h1> <p style="color: var(--color-ink-2); font-size: 1.125rem; margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6;">
Change the width and height of multiple images at once. Set exact pixel dimensions for perfect social media posts or website assets.
</p> </div> ${renderComponent($$result2, "Resizer", $$Resizer, { "allowMultiple": true })} </section> ${renderComponent($$result2, "SEOContentResize", $$SEOContentResize, { "isPassport": false })} ` })}`;
}, "/home/asus/mini_web/src/pages/resize-image-in-pixels.astro", void 0);
const $$file = "/home/asus/mini_web/src/pages/resize-image-in-pixels.astro";
const $$url = "/resize-image-in-pixels";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$ResizeImageInPixels,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
