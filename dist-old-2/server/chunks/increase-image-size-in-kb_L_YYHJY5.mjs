import { c as createComponent } from "./astro-component_n1fR6C3-.mjs";
import { v as maybeRenderHead, K as renderTemplate, a0 as addAttribute } from "./sequence_AEcFSQau.mjs";
import { r as renderComponent } from "./worker-entry_DkCG0Wsc.mjs";
import { r as renderScript, $ as $$Layout } from "./Layout_DyrtNKf4.mjs";
import { $ as $$SEOContent } from "./SEOContent_D66uN7ay.mjs";
const $$Compressor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Compressor;
  const { defaultKB = 20, hideHeader = false, allowMultiple = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="compressor-root" style="max-width: 860px; margin: 0 auto; padding: 0 24px;" data-astro-cid-ff5zyige> ${!hideHeader && renderTemplate`<!-- Page header -->
    <div style="text-align: center; margin-bottom: 48px;" data-astro-cid-ff5zyige> <div style="
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,241,53,0.08);
          border: 1px solid rgba(200,241,53,0.2);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 24px;
        " data-astro-cid-ff5zyige> <span style="
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-lime);
          " data-astro-cid-ff5zyige>Free Online Tool: Image Compression</span> </div> <h1 style="
          font-size: clamp(2.5rem, 6vw, 4.25rem);
          line-height: 1.05;
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        " data-astro-cid-ff5zyige>
Compress to<br data-astro-cid-ff5zyige> <span style="
            color: var(--color-lime);
            display: inline-block;
          " data-astro-cid-ff5zyige>Exact Size</span> </h1> <p style="
          font-size: 1.0625rem;
          color: var(--color-ink-2);
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.65;
        " data-astro-cid-ff5zyige>
Upload your images, set a KB target. Supports instant bulk processing.
</p> </div>`} <!-- Main panel --> <div class="panel p-5 md:p-8" data-astro-cid-ff5zyige> <!-- Drop Zone --> <div id="drop-zone" class="drop-zone" style="
        min-height: 280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin-bottom: 24px;
        position: relative;
        border-radius: 16px;
      " data-astro-cid-ff5zyige> ${allowMultiple ? renderTemplate`<input type="file" id="file-input" style="display: none;" accept="image/jpeg,image/png,image/webp" multiple="multiple" data-astro-cid-ff5zyige>` : renderTemplate`<input type="file" id="file-input" style="display: none;" accept="image/jpeg,image/png,image/webp" data-astro-cid-ff5zyige>`} <!-- Upload placeholder --> <div id="upload-placeholder" style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px;" data-astro-cid-ff5zyige> <div style="
            width: 56px;
            height: 56px;
            border-radius: 12px;
            background: var(--color-surface-3);
            border: 1px solid var(--color-border-mid);
            display: flex;
            align-items: center;
            justify-content: center;
          " data-astro-cid-ff5zyige> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ff5zyige> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-ff5zyige></path> <polyline points="17 8 12 3 7 8" data-astro-cid-ff5zyige></polyline> <line x1="12" y1="3" x2="12" y2="15" data-astro-cid-ff5zyige></line> </svg> </div> <div data-astro-cid-ff5zyige> <p style="
              font-family: var(--font-display);
              font-size: 1.125rem;
              font-weight: 700;
              letter-spacing: -0.03em;
              color: var(--color-ink);
              margin: 0 0 4px;
            " data-astro-cid-ff5zyige>${allowMultiple ? "Drop image(s) here" : "Drop image here"}</p> <p style="
              font-family: var(--font-mono);
              font-size: 0.6875rem;
              color: var(--color-ink-3);
              margin: 0;
              text-transform: uppercase;
              letter-spacing: 0.08em;
            " data-astro-cid-ff5zyige>JPEG · PNG · WEBP</p> </div> <button onclick="document.getElementById('file-input').click()" class="btn-ghost" type="button" style="font-size: 0.75rem;" data-astro-cid-ff5zyige>
Browse files
</button> </div> <!-- Uploading state --> <div id="upload-loading" class="hidden" style="display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 32px;" data-astro-cid-ff5zyige> <div class="spinner" data-astro-cid-ff5zyige></div> <p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-ink-3); text-transform: uppercase; letter-spacing: 0.08em;" data-astro-cid-ff5zyige>
Reading file...
</p> </div> <!-- Preview state --> <div id="image-preview-container" class="hidden" style="
          position: absolute;
          inset: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          background: var(--color-surface-2);
          border-radius: 14px;
        " data-astro-cid-ff5zyige> <img id="upload-preview" src="" alt="Preview" style="
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
          " data-astro-cid-ff5zyige> <button id="change-image-btn" class="btn-ghost" type="button" style="position: absolute; top: 12px; right: 12px; font-size: 0.75rem;" data-astro-cid-ff5zyige>
Change
</button> </div> </div> <!-- File info pills --> <div id="file-info-bar" class="hidden" style="
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 24px;
      " data-astro-cid-ff5zyige> <span class="stat-pill" style="font-size: 0.6875rem; padding: 4px 12px;" data-astro-cid-ff5zyige> <span class="label" data-astro-cid-ff5zyige>Original</span> <span class="value" id="preview-size-tag" data-astro-cid-ff5zyige>—</span> </span> <span class="stat-pill" style="font-size: 0.6875rem; padding: 4px 12px;" data-astro-cid-ff5zyige> <span class="label" data-astro-cid-ff5zyige>Format</span> <span class="value" id="preview-type-tag" data-astro-cid-ff5zyige>—</span> </span> </div> <!-- Controls row --> <div style="
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-bottom: 24px;
      " data-astro-cid-ff5zyige> <!-- Target KB input --> <div style="flex: 1; min-width: 140px;" data-astro-cid-ff5zyige> <label for="target-kb" style="
            display: block;
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-ink-3);
            margin-bottom: 8px;
            text-align: center;
          " data-astro-cid-ff5zyige>Target size</label> <div style="position: relative; display: flex; align-items: center;" data-astro-cid-ff5zyige> <input type="number" id="target-kb"${addAttribute(defaultKB > 5e3 ? (defaultKB / 1024).toFixed(0) : defaultKB, "value")} min="5" max="50000" class="input-number" style="padding-right: 70px; padding-left: 16px; font-size: 1.25rem; height: 56px; width: 100%; text-align: center;" data-astro-cid-ff5zyige> <select id="target-unit" style="
              position: absolute;
              right: 8px;
              top: 50%;
              transform: translateY(-50%);
              background: var(--color-surface-3) url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L5%205L9%201%22%20stroke%3D%22%2362666D%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E') no-repeat right 10px center;
              border: 1px solid var(--color-border);
              border-radius: 6px;
              color: var(--color-ink-3);
              font-family: var(--font-mono);
              font-size: 0.6875rem;
              font-weight: 700;
              padding: 4px 24px 4px 8px;
              cursor: pointer;
              outline: none;
              appearance: none;
              text-align: left;
              min-width: 58px;
            " data-astro-cid-ff5zyige> <option value="kb"${addAttribute(defaultKB <= 5e3, "selected")} data-astro-cid-ff5zyige>KB</option> <option value="mb"${addAttribute(defaultKB > 5e3, "selected")} data-astro-cid-ff5zyige>MB</option> </select> </div> </div> <!-- Output Format input --> <div style="flex: 1; min-width: 140px;" data-astro-cid-ff5zyige> <label for="output-format" style="
            display: block;
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-ink-3);
            margin-bottom: 8px;
            text-align: center;
          " data-astro-cid-ff5zyige>Output Format</label> <select id="output-format" class="input-number" style="
            width: 100%;
            height: 56px;
            font-size: 1.125rem;
            text-align: center;
            background: var(--color-surface-1) url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%226%22%20viewBox%3D%220%200%2010%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M1%201L5%205L9%201%22%20stroke%3D%22%2362666D%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E') no-repeat right 16px center;
            appearance: none;
            cursor: pointer;
            border: 2px solid var(--color-border);
            border-radius: 12px;
            color: var(--color-ink);
            outline: none;
          " data-astro-cid-ff5zyige> <option value="auto" selected data-astro-cid-ff5zyige>Keep Original</option> <option value="image/jpeg" data-astro-cid-ff5zyige>JPG</option> <option value="image/png" data-astro-cid-ff5zyige>PNG</option> <option value="image/webp" data-astro-cid-ff5zyige>WEBP</option> <option value="application/pdf" data-astro-cid-ff5zyige>PDF</option> </select> </div> </div> <!-- Compress button --> <button id="compress-btn" class="btn-primary" disabled style="width: 100%; height: 56px; font-size: 1rem; margin-top: 8px;" type="button" data-astro-cid-ff5zyige> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ff5zyige> <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" data-astro-cid-ff5zyige></polygon> </svg>
Instant Optimize
</button> </div> </div> <!-- Result / Status Panel --> <div id="status-panel" class="hidden animate-up" style="margin-top: 24px;" data-astro-cid-ff5zyige> <div class="panel" style="padding: 24px md:padding: 32px;" data-astro-cid-ff5zyige> <!-- Processing state (Terminal Style) --> <div id="processing" class="hidden" style="flex-direction: column; width: 100%; gap: 24px; padding: 24px 0;" data-astro-cid-ff5zyige> <!-- Terminal Window --> <div style="background: #0a0a0b; border: 1px solid var(--color-border-mid); border-radius: 12px; width: 100%; max-width: 500px; margin: 0 auto; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.4);" data-astro-cid-ff5zyige> <!-- Title Bar --> <div style="background: var(--color-surface-3); padding: 8px 16px; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: 8px;" data-astro-cid-ff5zyige> <div style="display: flex; gap: 6px;" data-astro-cid-ff5zyige> <div style="width: 10px; height: 10px; border-radius: 50%; background: #ff5f56;" data-astro-cid-ff5zyige></div> <div style="width: 10px; height: 10px; border-radius: 50%; background: #ffbd2e;" data-astro-cid-ff5zyige></div> <div style="width: 10px; height: 10px; border-radius: 50%; background: #27c93f;" data-astro-cid-ff5zyige></div> </div> <span style="font-family: var(--font-mono); font-size: 11px; color: var(--color-ink-3); text-transform: uppercase; letter-spacing: 0.1em; margin-left: 8px;" data-astro-cid-ff5zyige>High Quality Console v3.0</span> </div> <!-- Lines --> <div style="padding: 20px; text-align: left; font-family: var(--font-mono); min-height: 160px; display: flex; flex-direction: column; justify-content: flex-start;" data-astro-cid-ff5zyige> <div id="terminal-lines" data-astro-cid-ff5zyige></div> <div style="display: flex; align-items: center; gap: 4px;" data-astro-cid-ff5zyige> <span id="terminal-cursor" class="terminal-cursor" data-astro-cid-ff5zyige>_</span> </div> </div> </div> <div style="width: 100%; max-width: 500px; margin: 0 auto;" data-astro-cid-ff5zyige> <div style="width: 100%; height: 4px; background: var(--color-surface-3); border-radius: 10px; overflow: hidden; margin-bottom: 8px;" data-astro-cid-ff5zyige> <div id="progress-bar" style="width: 0%; height: 100%; background: var(--color-lime); transition: width 0.3s ease;" data-astro-cid-ff5zyige></div> </div> <p style="font-family: var(--font-mono); font-size: 0.625rem; color: var(--color-ink-3); text-transform: uppercase; letter-spacing: 0.1em; margin: 0;" data-astro-cid-ff5zyige>System processing payload...</p> </div> </div> <!-- Result view --> <div id="result-view" class="hidden flex-col gap-8 items-start w-full" data-astro-cid-ff5zyige> <!-- Top Half: Grid for Image & Stats --> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start w-full" data-astro-cid-ff5zyige> <!-- Left: preview --> <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;" data-astro-cid-ff5zyige> <div style="
                aspect-ratio: 4/3;
                background: var(--color-surface-2);
                border: 1px solid var(--color-border);
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                width: 100%;
              " data-astro-cid-ff5zyige> <img id="preview-img" src="" alt="Compressed result" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 6px;" data-astro-cid-ff5zyige> <div id="pdf-preview-icon" style="display: none; flex-direction: column; align-items: center; gap: 12px; color: var(--color-ink-2);" data-astro-cid-ff5zyige> <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ff5zyige> <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" data-astro-cid-ff5zyige></path> <polyline points="14 2 14 8 20 8" data-astro-cid-ff5zyige></polyline> <path d="M12 18v-6" data-astro-cid-ff5zyige></path> <path d="M9 15h6" data-astro-cid-ff5zyige></path> </svg> <span style="font-family: var(--font-mono); font-weight: 700; font-size: 0.875rem; letter-spacing: 0.05em;" data-astro-cid-ff5zyige>PDF READY</span> </div> </div> <div class="badge-success" style="align-self: flex-start;" data-astro-cid-ff5zyige>
SUCCESS
</div> </div> <!-- Right: stats --> <div style="display: flex; flex-direction: column; gap: 24px; width: 100%;" data-astro-cid-ff5zyige> <div data-astro-cid-ff5zyige> <h2 style="
                  font-size: 1.5rem;
                  font-weight: 800;
                  letter-spacing: -0.04em;
                  margin: 0 0 8px;
                " data-astro-cid-ff5zyige>Ready for download</h2> <p id="algo-log" style="
                  font-family: var(--font-mono);
                  font-size: 0.75rem;
                  color: var(--color-ink-2);
                  margin: 0;
                  line-height: 1.6;
                " data-astro-cid-ff5zyige>Mathematical optimum identified.</p> </div> <!-- Metrics grid --> <div class="grid grid-cols-2 gap-2" data-astro-cid-ff5zyige> <div class="metric-card" style="padding: 12px;" data-astro-cid-ff5zyige> <span class="metric-label" style="font-size: 0.625rem;" data-astro-cid-ff5zyige>Final Size</span> <span class="metric-value" style="font-size: 1.25rem;" id="result-size" data-astro-cid-ff5zyige>—</span> </div> <div class="metric-card accent" style="padding: 12px;" data-astro-cid-ff5zyige> <span class="metric-label" style="font-size: 0.625rem;" data-astro-cid-ff5zyige>Savings</span> <span class="metric-value" style="font-size: 1.25rem;" id="savings-percent" data-astro-cid-ff5zyige>—</span> </div> <div class="metric-card" style="padding: 12px;" data-astro-cid-ff5zyige> <span class="metric-label" style="font-size: 0.625rem;" data-astro-cid-ff5zyige>Quality</span> <span class="metric-value" style="font-size: 1.25rem;" id="quality-tag" data-astro-cid-ff5zyige>—</span> </div> <div class="metric-card" style="padding: 12px;" data-astro-cid-ff5zyige> <span class="metric-label" style="font-size: 0.625rem;" data-astro-cid-ff5zyige>Time</span> <span class="metric-value" style="font-size: 1.25rem;" id="processing-time" data-astro-cid-ff5zyige>—</span> </div> </div> </div> </div> <!-- Full Width Buttons --> <div style="display: flex; flex-direction: column; gap: 12px; width: 100%;" data-astro-cid-ff5zyige> <div style="position: relative;" data-astro-cid-ff5zyige> <label for="rename-input" style="display: block; font-family: var(--font-mono); font-size: 0.625rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-ink-3); margin-bottom: 6px; text-align: center;" data-astro-cid-ff5zyige>Rename File (Optional)</label> <input type="text" id="rename-input" placeholder="Enter custom name..." class="input-number" style="width: 100%; height: 56px; font-size: 1rem; padding: 0 12px; text-align: center;" data-astro-cid-ff5zyige> </div> <a id="download-link" href="#" download="compressed.jpg" class="btn-download" style="width: 100%; height: 56px; font-size: 1rem;" data-astro-cid-ff5zyige> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-ff5zyige> <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-astro-cid-ff5zyige></path> <polyline points="17 8 12 3 7 8" data-astro-cid-ff5zyige></polyline> <line x1="12" y1="3" x2="12" y2="15" data-astro-cid-ff5zyige></line> </svg>
Download JPEG
</a> <!-- Compress again --> <button id="reset-btn" class="btn-ghost" type="button" style="align-self: center; font-size: 0.75rem; margin-top: 12px;" data-astro-cid-ff5zyige>
← Optimize another
</button> </div> </div> </div> </div> ${renderScript($$result, "/home/asus/mini_web/src/components/Compressor.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/asus/mini_web/src/components/Compressor.astro", void 0);
const $$IncreaseImageSizeInKb = createComponent(($$result, $$props, $$slots) => {
  const SEO_TITLE = "Increase Image Size in KB — Upscale Quality & File Size";
  const SEO_DESC = "Increase image size in KB safely without losing quality. Perfect for online portals that require a minimum file size. 100% free and client-side.";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": SEO_TITLE, "description": SEO_DESC, "data-astro-cid-gtuvchik": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="relative z-20 pt-20 container-stripe" data-astro-cid-gtuvchik> <!-- Header --> <div style="text-align: center; margin-bottom: 48px;" data-astro-cid-gtuvchik> <div style="
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(200,241,53,0.08);
          border: 1px solid rgba(200,241,53,0.2);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 24px;
        " data-astro-cid-gtuvchik> <span style="
            font-family: var(--font-mono);
            font-size: 0.6875rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--color-lime);
          " data-astro-cid-gtuvchik>Feature: KB Enhancement</span> </div> <h1 style="font-size: clamp(2.5rem, 8vw, 4.5rem); line-height: 1; margin: 0 0 24px; letter-spacing: -0.05em;" data-astro-cid-gtuvchik>
Increase Image <br data-astro-cid-gtuvchik> <span style="color: var(--color-lime);" data-astro-cid-gtuvchik>Size in KB.</span> </h1> <p style="color: var(--color-ink-2); font-size: 1.125rem; margin-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto; line-height: 1.6;" data-astro-cid-gtuvchik>
Upload multiple images at once for instant bulk processing. We safely upscale and pad them to meet your exact target.
</p> </div> <!-- The Tool --> ${renderComponent($$result2, "Compressor", $$Compressor, { "defaultKB": 50, "hideHeader": true, "allowMultiple": true, "data-astro-cid-gtuvchik": true })} ${renderComponent($$result2, "SEOContent", $$SEOContent, { "targetKB": "Custom", "type": "enhance", "uniqueContent": `
        <p class="seo-p">Sometimes portals require a <strong>minimum file size</strong>. Our <strong>KB Enhancer</strong> solves this by safely upscaling pixels and injecting non-visual data blocks to meet your target without altering the photo's appearance.</p>
        <p class="seo-p">This is essential for systems that reject files for being "too small," a common issue with high-efficiency modern smartphones.</p>
      `, "data-astro-cid-gtuvchik": true })} <!-- Technical Note --> <div class="enhance-grid" data-astro-cid-gtuvchik> <div class="tech-card" data-astro-cid-gtuvchik> <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;" data-astro-cid-gtuvchik> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-gtuvchik><path d="M23 6l-9.5 9.5-5-5L1 18" data-astro-cid-gtuvchik></path><path d="M17 6h6v6" data-astro-cid-gtuvchik></path></svg>
Pixel Upscaling
</h3> <p style="color: var(--color-ink-2); font-size: 0.875rem; line-height: 1.7;" data-astro-cid-gtuvchik>
We enhance your photo's dimensions to naturally increase file size. This adds legitimate data while often improving sharpness on high-resolution displays.
</p> </div> <div class="tech-card" data-astro-cid-gtuvchik> <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 10px;" data-astro-cid-gtuvchik> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-lime)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-gtuvchik><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-astro-cid-gtuvchik></rect><line x1="9" y1="9" x2="15" y2="15" data-astro-cid-gtuvchik></line><line x1="15" y1="9" x2="9" y2="15" data-astro-cid-gtuvchik></line></svg>
Metadata Padding
</h3> <p style="color: var(--color-ink-2); font-size: 0.875rem; line-height: 1.7;" data-astro-cid-gtuvchik>
For exact targets, we inject non-visual data blocks. This increases the KB count to your target without altering the photo's appearance.
</p> </div> </div> </section> ` })}`;
}, "/home/asus/mini_web/src/pages/increase-image-size-in-kb.astro", void 0);
const $$file = "/home/asus/mini_web/src/pages/increase-image-size-in-kb.astro";
const $$url = "/increase-image-size-in-kb";
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$IncreaseImageSizeInKb,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
