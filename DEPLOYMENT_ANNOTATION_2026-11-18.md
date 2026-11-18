# 📅 Deployment & Telemetry Reset Annotation (November 18, 2026)

**Target Property:** `pdfandimg.com`  
**Deployment Date:** November 18, 2026  
**Git HEAD:** `31460d2` (Branch `main`, synced with `origin/main`)  
**Deployment Platform:** Cloudflare Pages (Static Astro MPA)

---

## 1. What Was Deployed Today

* **Commit `cf57fa8`:** Multi-source analytics monitoring scripts configured and tested (GSC, GA4 Property `541422451`, Cloudflare Zone `fc9bf80583f9beeb93f1f7fc9d26776c`, Bing Webmaster). 28-day baseline snapshot captured in `baselines/2026-11-18/`.
* **Commit `77d2498`:**
  * Removed `src/middleware.ts` to eliminate edge Worker / Pages Function invocation overhead and eliminate 504 timeouts.
  * Injected wildcard preview quarantine in `public/_headers`: `https://*.pdfandimg.pages.dev/*` set to `X-Robots-Tag: noindex, nofollow` to prevent duplicate indexing of staging branches.
* **Commit `31460d2`:**
  * **PageRank Distribution & Orphan Healing:** Added dedicated grids in `src/pages/tools.astro` for *International Visa & Biometric Resizers*, *Zero-Server PDF Suite*, and *Localized Country Portals*.
  * **Global Footer Distribution:** Injected direct canonical links to `/australian-passport-photo-size/`, `/convert-jpg-to-pdf-100kb/`, and `/schengen-visa-photo-size/` in `src/data/i18nMap.ts` across all 75 pages.
  * **GA4 Developer Exclusion Flag:** Injected pre-tag inline check in `src/layouts/Layout.astro` setting `window['ga-disable-G-S9WR64YT2D'] = true` when `disable_analytics=1` is passed, when `localStorage.getItem('disable_analytics') === '1'`, or when running on `localhost` / `*.pages.dev`.
* **Cloudflare API Edge Rules (Live):**
  * Hardened WAF Block Rule `420285e351da4f948a5abb568067e05d` (blocking `.env`, `.yml`, `.yaml`, `/models`, `/actuator/`, etc. with 403 Forbidden).
  * Enforced `always_use_https = on`.
  * Verified `early_hints = off`.

---

## 2. Telemetry Baseline Reset (Nov 18, 2026)

* **GSC Indexing Baseline:** 72 URLs indexed on Google (`Table.csv`).
* **GA4 Baseline:** 148 active users over previous 28 days (heavily skewed by developer testing and bot noise; future readouts after today must be evaluated with internal traffic excluded).
* **Bing Baseline:** Fresh sitemaps submitted; rotated API key active (`678ab57c...`).

---

## 3. 8-Week Checkpoint Schedule (January 13, 2027)

* **Site Content Status:** Strict freeze on existing URLs (no rewrites, no deletions).
* **Execution Focus:** Build 5–10 high-quality external referring domains (exam forums, student portals, educational directories) and monitor organic climb.
* **Success Criteria at 8 Weeks:**
  1. Quality referring domains $\ge 5$.
  2. Pages ranking in Google Top 30 $\ge 10$ pages.
  3. Organic clicks $\ge 100$ / month.
