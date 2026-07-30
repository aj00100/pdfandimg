import { c as createComponent } from "./astro-component_n1fR6C3-.mjs";
import { K as renderTemplate, v as maybeRenderHead } from "./sequence_AEcFSQau.mjs";
import { r as renderComponent } from "./worker-entry_DkCG0Wsc.mjs";
import { $ as $$Layout } from "./Layout_DyrtNKf4.mjs";
import { $ as $$SEOContent } from "./SEOContent_D66uN7ay.mjs";
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$CropImageOnline = createComponent(($$result, $$props, $$slots) => {
  const SEO_TITLE = "Online Image Cropper — Crop Photos for Government Forms";
  const SEO_DESC = "Crop your photos and signatures to exact dimensions. Perfect for Passport size, SSC, and UPSC requirements. Free, private, and secure.";
  return renderTemplate(_a || (_a = __template(["", ` <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"><\/script>  <script>
  let cropper = null;
  let originalFilename = 'cropped_image';
  const input = document.getElementById('crop-input');
  const target = document.getElementById('crop-target');
  const uploadStage = document.getElementById('upload-stage');
  const croppingStage = document.getElementById('cropping-stage');
  const applyBtn = document.getElementById('apply-crop');
  
  let lastTop, lastBottom, lastLeft, lastRight;
  let glowTimeout;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    originalFilename = (file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
    document.getElementById('rename-input').value = originalFilename + '_cropped';

    const reader = new FileReader();
    reader.onload = (event) => {
      target.src = event.target.result;
      uploadStage.classList.add('hidden');
      croppingStage.classList.remove('hidden');
      
      if (cropper) cropper.destroy();
      cropper = new Cropper(target, {
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.8,
        background: false,
        modal: true,
        guides: true,
        highlight: true,
        responsive: true,
        restore: true,
        minCropBoxWidth: 50,
        minCropBoxHeight: 50,
        crop(event) {
          try {
            const imageData = cropper.getImageData();
            if (!imageData || !imageData.naturalWidth) return;
            const w = imageData.naturalWidth;
            const h = imageData.naturalHeight;
            const leftPct = Math.max(0, Math.min(100, Math.round(100 - (event.detail.x / w) * 100)));
            const rightPct = Math.max(0, Math.min(100, Math.round(((event.detail.x + event.detail.width) / w) * 100)));
            const topPct = Math.max(0, Math.min(100, Math.round(100 - (event.detail.y / h) * 100)));
            const bottomPct = Math.max(0, Math.min(100, Math.round(((event.detail.y + event.detail.height) / h) * 100)));
            
            const elTop = document.getElementById('crop-top');
            const elBottom = document.getElementById('crop-bottom');
            const elLeft = document.getElementById('crop-left');
            const elRight = document.getElementById('crop-right');

            elTop.textContent = 'Top: ' + topPct + '%';
            elBottom.textContent = 'Bottom: ' + bottomPct + '%';
            elLeft.textContent = 'Left: ' + leftPct + '%';
            elRight.textContent = 'Right: ' + rightPct + '%';

            if (lastTop !== topPct) { elTop.classList.add('value-glow'); lastTop = topPct; }
            if (lastBottom !== bottomPct) { elBottom.classList.add('value-glow'); lastBottom = bottomPct; }
            if (lastLeft !== leftPct) { elLeft.classList.add('value-glow'); lastLeft = leftPct; }
            if (lastRight !== rightPct) { elRight.classList.add('value-glow'); lastRight = rightPct; }

            clearTimeout(glowTimeout);
            glowTimeout = setTimeout(() => {
              elTop.classList.remove('value-glow');
              elBottom.classList.remove('value-glow');
              elLeft.classList.remove('value-glow');
              elRight.classList.remove('value-glow');
            }, 150);
          } catch (err) {}
        }
      });
    };
    reader.readAsDataURL(file);
  });

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ratio = parseFloat(btn.dataset.ratio);
      cropper.setAspectRatio(isNaN(ratio) ? NaN : ratio);
    });
  });

  applyBtn.addEventListener('click', () => {
    const canvas = cropper.getCroppedCanvas({ maxWidth: 2000, maxHeight: 2000 });
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const customName = document.getElementById('rename-input').value.trim() || 'cropped_image';
      const a = document.createElement('a');
      a.href = url;
      a.download = \`\${customName}.jpg\`;
      a.click();
      window.location.reload(); // Reset after download
    }, 'image/jpeg', 0.95);
  });
<\/script>`], ["", ` <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css"> <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js"><\/script>  <script>
  let cropper = null;
  let originalFilename = 'cropped_image';
  const input = document.getElementById('crop-input');
  const target = document.getElementById('crop-target');
  const uploadStage = document.getElementById('upload-stage');
  const croppingStage = document.getElementById('cropping-stage');
  const applyBtn = document.getElementById('apply-crop');
  
  let lastTop, lastBottom, lastLeft, lastRight;
  let glowTimeout;

  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    originalFilename = (file.name.substring(0, file.name.lastIndexOf('.')) || file.name);
    document.getElementById('rename-input').value = originalFilename + '_cropped';

    const reader = new FileReader();
    reader.onload = (event) => {
      target.src = event.target.result;
      uploadStage.classList.add('hidden');
      croppingStage.classList.remove('hidden');
      
      if (cropper) cropper.destroy();
      cropper = new Cropper(target, {
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 0.8,
        background: false,
        modal: true,
        guides: true,
        highlight: true,
        responsive: true,
        restore: true,
        minCropBoxWidth: 50,
        minCropBoxHeight: 50,
        crop(event) {
          try {
            const imageData = cropper.getImageData();
            if (!imageData || !imageData.naturalWidth) return;
            const w = imageData.naturalWidth;
            const h = imageData.naturalHeight;
            const leftPct = Math.max(0, Math.min(100, Math.round(100 - (event.detail.x / w) * 100)));
            const rightPct = Math.max(0, Math.min(100, Math.round(((event.detail.x + event.detail.width) / w) * 100)));
            const topPct = Math.max(0, Math.min(100, Math.round(100 - (event.detail.y / h) * 100)));
            const bottomPct = Math.max(0, Math.min(100, Math.round(((event.detail.y + event.detail.height) / h) * 100)));
            
            const elTop = document.getElementById('crop-top');
            const elBottom = document.getElementById('crop-bottom');
            const elLeft = document.getElementById('crop-left');
            const elRight = document.getElementById('crop-right');

            elTop.textContent = 'Top: ' + topPct + '%';
            elBottom.textContent = 'Bottom: ' + bottomPct + '%';
            elLeft.textContent = 'Left: ' + leftPct + '%';
            elRight.textContent = 'Right: ' + rightPct + '%';

            if (lastTop !== topPct) { elTop.classList.add('value-glow'); lastTop = topPct; }
            if (lastBottom !== bottomPct) { elBottom.classList.add('value-glow'); lastBottom = bottomPct; }
            if (lastLeft !== leftPct) { elLeft.classList.add('value-glow'); lastLeft = leftPct; }
            if (lastRight !== rightPct) { elRight.classList.add('value-glow'); lastRight = rightPct; }

            clearTimeout(glowTimeout);
            glowTimeout = setTimeout(() => {
              elTop.classList.remove('value-glow');
              elBottom.classList.remove('value-glow');
              elLeft.classList.remove('value-glow');
              elRight.classList.remove('value-glow');
            }, 150);
          } catch (err) {}
        }
      });
    };
    reader.readAsDataURL(file);
  });

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ratio = parseFloat(btn.dataset.ratio);
      cropper.setAspectRatio(isNaN(ratio) ? NaN : ratio);
    });
  });

  applyBtn.addEventListener('click', () => {
    const canvas = cropper.getCroppedCanvas({ maxWidth: 2000, maxHeight: 2000 });
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const customName = document.getElementById('rename-input').value.trim() || 'cropped_image';
      const a = document.createElement('a');
      a.href = url;
      a.download = \\\`\\\${customName}.jpg\\\`;
      a.click();
      window.location.reload(); // Reset after download
    }, 'image/jpeg', 0.95);
  });
<\/script>`])), renderComponent($$result, "Layout", $$Layout, { "title": SEO_TITLE, "description": SEO_DESC, "data-astro-cid-ysnqgxyi": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative z-20 pt-20 container-stripe" data-astro-cid-ysnqgxyi> <!-- Header --> <div style="text-align: center; margin-bottom: 48px;" data-astro-cid-ysnqgxyi> <div style="
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,241,53,0.08);
          border: 1px solid rgba(200,241,53,0.2);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 24px;
        " data-astro-cid-ysnqgxyi> <span style="
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-lime);
          " data-astro-cid-ysnqgxyi>Free Online Tool: Smart Crop</span> </div> <h1 style="font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1; margin: 0 0 24px; letter-spacing: -0.05em;" data-astro-cid-ysnqgxyi>
Crop <span style="color: var(--color-lime);" data-astro-cid-ysnqgxyi>Any Image.</span> <br data-astro-cid-ysnqgxyi>
Meet the Spec.
</h1> <p style="font-size: 1.125rem; color: var(--color-ink-2); line-height: 1.6; max-width: 540px; margin: 0 auto;" data-astro-cid-ysnqgxyi>
Perfectly frame your signatures and passport photos before optimization. 100% browser-side processing.
</p> </div> <!-- Cropper Container --> <div class="panel p-6 md:p-8" style="max-width: 860px; margin: 0 auto; width: 100%;" data-astro-cid-ysnqgxyi> <div id="crop-interface" style="min-height: 400px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; width: 100%;" data-astro-cid-ysnqgxyi> <!-- Upload Stage --> <div id="upload-stage" style="width: 100%;" data-astro-cid-ysnqgxyi> <div style="
                 width: 100%; 
                 border: 2px dashed var(--color-border-mid); 
                 border-radius: 16px; 
                 padding: 48px 24px; 
                 text-align: center;
                 background: rgba(200,241,53,0.02);
                 cursor: pointer;
                 transition: all 0.2s ease;
               " onclick="document.getElementById('crop-input').click()" onmouseover="this.style.borderColor='var(--color-lime)'; this.style.background='rgba(200,241,53,0.04)';" onmouseout="this.style.borderColor='var(--color-border-mid)'; this.style.background='rgba(200,241,53,0.02)';" data-astro-cid-ysnqgxyi> <div style="width: 64px; height: 64px; background: var(--color-surface-3); border: 1px solid var(--color-border); border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;" data-astro-cid-ysnqgxyi> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" stroke-width="2" data-astro-cid-ysnqgxyi><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-ysnqgxyi></path><polyline points="17 8 12 3 7 8" data-astro-cid-ysnqgxyi></polyline><line x1="12" y1="3" x2="12" y2="15" data-astro-cid-ysnqgxyi></line></svg> </div> <p style="font-family: var(--font-display); font-size: 1.125rem; font-weight: 700; color: var(--color-ink); margin: 0 0 8px;" data-astro-cid-ysnqgxyi>Select image to crop</p> <p style="font-size: 0.875rem; color: var(--color-ink-3); margin: 0 0 20px;" data-astro-cid-ysnqgxyi>JPEG · PNG · WEBP</p> <button class="btn-ghost" style="font-size: 0.75rem;" data-astro-cid-ysnqgxyi>Browse files</button> <input type="file" id="crop-input" style="display:none" accept="image/*" data-astro-cid-ysnqgxyi> </div> </div> <!-- Cropping Area --> <div id="cropping-stage" class="hidden" style="width: 100%; display: flex; flex-direction: column; align-items: center;" data-astro-cid-ysnqgxyi> <div style="width: 100%; display: flex; justify-content: center; gap: 8px; margin-bottom: 12px; flex-wrap: wrap;" data-astro-cid-ysnqgxyi> <span id="crop-top" style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; color: var(--color-lime); background: var(--color-surface-3); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--color-border); transition: all 0.2s ease;" data-astro-cid-ysnqgxyi>Top: 0%</span> <span id="crop-bottom" style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; color: var(--color-lime); background: var(--color-surface-3); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--color-border); transition: all 0.2s ease;" data-astro-cid-ysnqgxyi>Bottom: 100%</span> <span id="crop-left" style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; color: var(--color-lime); background: var(--color-surface-3); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--color-border); transition: all 0.2s ease;" data-astro-cid-ysnqgxyi>Left: 0%</span> <span id="crop-right" style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 700; color: var(--color-lime); background: var(--color-surface-3); padding: 4px 10px; border-radius: 6px; border: 1px solid var(--color-border); transition: all 0.2s ease;" data-astro-cid-ysnqgxyi>Right: 100%</span> </div> <div class="checkerboard-bg" style="width: 100%; height: 55vh; min-height: 300px; max-height: 500px; overflow: hidden; border-radius: 12px; border: 1px solid var(--color-border); display: block;" data-astro-cid-ysnqgxyi> <img id="crop-target" style="display: block; max-width: 100%; max-height: 100%; margin: 0 auto;" data-astro-cid-ysnqgxyi> </div> <div class="crop-controls" style="padding: 16px 0; width: 100%;" data-astro-cid-ysnqgxyi> <div class="preset-group" style="display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; width: 100%;" data-astro-cid-ysnqgxyi> <button class="btn-ghost preset-btn" style="flex: 1 1 auto; min-width: 100px;" data-ratio="1" data-astro-cid-ysnqgxyi>UPSC / 1:1</button> <button class="btn-ghost preset-btn" style="flex: 1 1 auto; min-width: 100px;" data-ratio="0.778" data-astro-cid-ysnqgxyi>Passport</button> <button class="btn-ghost preset-btn" style="flex: 1 1 auto; min-width: 100px;" data-ratio="2.33" data-astro-cid-ysnqgxyi>SSC Signature</button> <button class="btn-ghost preset-btn" style="flex: 1 1 auto; min-width: 100px;" data-ratio="NaN" data-astro-cid-ysnqgxyi>Free Form</button> </div> <div style="position: relative; width: 100%; margin-top: 16px;" data-astro-cid-ysnqgxyi> <label for="rename-input" style="display: block; font-family: var(--font-mono); font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-ink-3); margin-bottom: 6px;" data-astro-cid-ysnqgxyi>Rename File (Optional)</label> <input type="text" id="rename-input" placeholder="Enter custom name..." style="width: 100%; height: 40px; font-size: 0.875rem; padding: 0 12px; background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-ink); outline: none;" data-astro-cid-ysnqgxyi> </div> <button id="apply-crop" class="btn-primary save-btn" style="width: 100%; margin-top: 12px;" data-astro-cid-ysnqgxyi>Save & Download</button> </div> </div> </div> </div> ${renderComponent($$result2, "SEOContent", $$SEOContent, { "targetKB": "Custom", "type": "crop", "customTitle": "Precision Image Cropper: Frame for 100% Portal Acceptance", "uniqueContent": `
        <p class="seo-p">
          Cropping is the <strong>foundation of image optimization</strong>. Before you can compress an image to a specific KB size, 
          you must ensure it has the correct aspect ratio and focal point. Our <strong>Crop Image Onlineper</strong> is 
          designed specifically for formal requirements like Passport Photos, Digital Signatures, and ID Cards.
        </p>
        <p class="seo-p">
          Unlike generic mobile editors, PdfAndImg provides <strong>Surgical Presets</strong> for major platforms. 
          Whether it is the SSC (140x60px), UPSC (350x350px), or standard Passport specs (3.5cm x 4.5cm), our tool 
          helps you frame the subject perfectly. This ensures that when you later use our <a href="/reduce-image-size-in-kb" style="color: var(--color-lime);">KB Reducer</a>, 
          the engine has the best possible pixels to work with, resulting in a cleaner, more professional file.
        </p>
        <p class="seo-p">
          Our cropper runs entirely in your browser using the <strong>GPU-accelerated Canvas API</strong>. 
          This means your high-resolution originals are never uploaded—they are processed locally, 
          keeping your sensitive identity documents 100% private and secure from the moment you select the file.
        </p>
      `, "data-astro-cid-ysnqgxyi": true })} </section> ` }));
}, "/home/asus/mini_web/src/pages/crop-image-online.astro", void 0);
const $$file = "/home/asus/mini_web/src/pages/crop-image-online.astro";
const $$url = "/crop-image-online";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$CropImageOnline,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
