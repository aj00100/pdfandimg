# PROJECT: DOMAIN PRICE RADAR (Next Build)

## 💡 The Core Idea
A high-speed domain availability and price comparison engine. Unlike "Instant Domain Search," this tool focuses on **Price Transparency** by showing real-time costs from multiple registrars (GoDaddy, Namecheap, Hostinger, BigRock) including the hidden "Renewal Prices."

## 🚀 Key Features (The Competitive Edge)
1. **Live Price Comparison**: Fetch real-time data via Registrar APIs.
2. **Renewal Transparency**: Show the "Year 2" cost to expose "Introductory Price" traps.
3. **Smart Game UX**: A 3-5 second "Negotiating with Registrars" delay to build perceived value.
4. **Affiliate Integration**: Earn $5-$15 per sale by recommending the best value registrar.
5. **Mobile-First Design**: Optimized for quick "on-the-go" idea checking.

## 🛠 Technical Architecture
- **Frontend**: Astro (Static HTML for maximum SEO).
- **Backend**: Cloudflare Workers (Global, fast, and free for up to 100k requests/day).
- **Data Source**: Hybrid approach (Registrar APIs + Reverse Engineering hidden endpoints).
- **Caching**: Cloudflare KV to store daily price lists for instant results.

---

# 🧠 KEY LEARNINGS FROM IMGSHRINK PROJECT

### 1. The "Smart Game" (Psychology)
- **The Labor Illusion**: Instant is forgettable. A 10-15s "Deep AI" delay makes the user value the result more.
- **Micro-Delays**: Use a 3s "Secure Upload" delay to build trust before showing the tool.

### 2. The "SEO-Below-Fold" Strategy
- Keep the top area clean for the tool (Conversion focus).
- Put 600+ words of keyword-rich content, How-Tos, and FAQs below the tool (SEO focus).
- Use **JSON-LD Schema** for FAQs to dominate Google "Rich Results."

### 3. Programmatic SEO (pSEO)
- Don't just build one page. Build a "Hub and Spoke" model.
- A dedicated `/tools` page acts as an index hub for crawlers.
- Target "Easy" KD keywords (e.g., 20KB, 50KB, 1MB) with specific landing pages.

### 4. Technical Security
- Purge proprietary logic from Git history using `filter-branch` before pushing to public repos.
- Use `.gitignore` to keep core "Engines" local but keep the site functional.

### 5. Mobile UX Optimization
- **Smart Header**: Only show Logo, Tools, and Home on mobile. Hide specific tool links to keep it centered.
- **Centered Layout**: Always verify that cropping/preview elements are responsive and perfectly centered.

---

# 📝 CLEANED STRATEGY (Based on Blog & Transcript)

## AdSense Approval Blueprint
- [ ] **MPA Architecture**: Multi-page application is better for SEO than SPA.
- [ ] **The "Big 4" Pages**: About Us, Contact Us, Privacy Policy, Terms of Service.
- [ ] **Content Rule**: 600 words of text on the homepage.
- [ ] **Indexing**: Sitemap.xml + Robots.txt + Google Search Console + Bing Webmaster.
- [ ] **Duplicate Content Fix**: Use `_headers` to `noindex` the `pages.dev` subdomain.

## Monetization Path
1. Build Traffic (Targeting India/US high-intent keywords).
2. Wait for 10+ consistent daily users.
3. Apply for AdSense (Expect 1-2 rejections, then approval).
4. Integrate Affiliate Links (For Domain Project).
