import { c as createComponent } from "./astro-component_n1fR6C3-.mjs";
import { K as renderTemplate, v as maybeRenderHead } from "./sequence_AEcFSQau.mjs";
import { r as renderComponent } from "./worker-entry_CYIhEAsG.mjs";
import { $ as $$Layout } from "./Layout_m3kaUHue.mjs";
import { $ as $$Resizer, a as $$SEOContentResize } from "./SEOContentResize_Bdl07Y48.mjs";
const $$ResizeImageDimensions = createComponent(($$result, $$props, $$slots) => {
  const SEO_TITLE = "Resize Image Dimensions — Width & Height Editor";
  const SEO_DESC = "Resize image dimensions securely. Set specific width and height easily with our completely free client-side tool.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": SEO_TITLE, "description": SEO_DESC }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="relative z-20 pt-20 container-stripe"> <div style="text-align: center; margin-bottom: 48px;"> <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(163, 44, 245, 0.08); border: 1px solid rgba(163, 44, 245, 0.2); border-radius: 100px; padding: 5px 14px; margin-bottom: 24px;"> <span style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-lime);">Exact Match Dimension Resizer</span> </div> <h1 style="font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1; margin: 0 0 24px; letter-spacing: -0.05em;">
Resize Image <br> <span style="color: var(--color-lime);">Dimensions.</span> </h1> <p style="color: var(--color-ink-2); font-size: 1.125rem; margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6;">
Enter your required width and height to instantly resize image to exact pixels. Fast, free bulk processing with 100% privacy.
</p> </div> ${renderComponent($$result2, "Resizer", $$Resizer, { "allowMultiple": true })} </section> ${renderComponent($$result2, "SEOContentResize", $$SEOContentResize, { "isPassport": false })} ` })}`;
}, "/home/asus/mini_web/src/pages/resize-image-dimensions.astro", void 0);
const $$file = "/home/asus/mini_web/src/pages/resize-image-dimensions.astro";
const $$url = "/resize-image-dimensions";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$ResizeImageDimensions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
