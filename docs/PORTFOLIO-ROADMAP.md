# Portfolio Roadmap

A grounded audit + prioritized plan to take this site to the next level as a personal-branding asset, not just a portfolio. Each tier below is intended to ship as one or more self-contained PRs so we can measure impact before moving on.

The audit is based on the current state of the repo on `main`: React 18 SPA with Vite + Tailwind + shadcn, typed content layer under `src/data/`, ~16 long-form articles, ~10 case studies, books + mental models, GitHub project cards, resume, and a contact form.

---

## What the site already does well

- **Strong raw content surface area.** Case studies, long-form articles grouped by topic + series, book summaries, mental models, GitHub project cards, resume. Most personal sites don't have a tenth of this.
- **Clean stack and code.** React 18 + Vite + Tailwind + shadcn, typed content layer, route-level pages, `ErrorBoundary`, `ScrollToTop`, `Reveal` with reduced-motion support, theme toggle.
- **Consistent positioning.** "Systems Architect & Technical Strategist" runs through hero, header, footer, OG tags.
- **Distinct voice.** The writing is technical, direct, and non-generic — exactly the right tone for the target audience (defense / aerospace / startup engineering leadership).

---

## Where leverage is currently being left on the table

### 1. SEO & discoverability — the single biggest miss for a content-heavy brand site

This is a pure client-rendered SPA, which means a portfolio whose value depends on long-form articles ranking in Google and looking good when shared is:

- Serving empty HTML to crawlers and link unfurlers (no SSR / SSG / prerender).
- Missing per-page `<title>` / `<meta description>` / OG tags. `index.html` has one static OG card for the whole site, and `%VITE_SITE_URL%/hero-visual.jpg` only substitutes when the env var is set at build time — otherwise the OG URL is broken.
- Missing `sitemap.xml` (referenced in `robots.txt` but doesn't exist, and the placeholder URL is still `your-domain.vercel.app`).
- Missing JSON-LD (`Person`, `Article`, `BreadcrumbList`) — these directly drive the "Kushal Shah" knowledge-panel-style search result.
- Missing RSS / Atom feed despite ~16 long-form articles. Loses subscribers + cross-platform syndication (Substack, Feedly, etc.).
- Missing per-article OG images — every link share looks identical.

### 2. No audience capture loop

- No newsletter / email signup anywhere. With this volume of writing, that is the single biggest brand multiplier missing.
- No analytics (Plausible / Umami / Vercel) → no signal on which articles or CTAs actually work, so we can't iterate.
- No "Book a call" (Cal.com / Calendly) — Formspree contact form + `mailto:` fallback is high-friction for advisory inbound.

### 3. Information architecture is duplicated in places

- `/work` (case studies) and `/projects` (GitHub) are two separate top-level surfaces visitors won't differentiate. Relabel: **Work = strategic case studies**, **Code = repos & demos**.
- Books / mental models routing (`/books/models/:slug`) is nested awkwardly. Either rename the surface to `/library` or promote `/mental-models` to a top-level route — they are some of the most distinctive "personal brand" content.
- Header has 7 items on desktop and stacks vertically on mobile. Group into 4 primary items + a "More" cluster.

### 4. Home page doesn't yet sell the rare combination

The pillars ("Technical Strategy / Systems Architecture / Software Leverage") are accurate but abstract. What's actually rare about this profile is the **triangulation**: flight software for LEO constellations + technical BOEs for $10M+ defense proposals + AI agents for startups. The home page should:

- Open with one positioning sentence used identically on LinkedIn, GitHub bio, and Twitter/X.
- Show 3–4 quantified proof tiles: $5M IPT budget, 25-engineer team, $10M+ proposals, $1M+ tooling savings, 6 USSF programs.
- Surface a single hero proof: one architecture diagram or one signature case study above the fold.
- End with a sharp "Available for:" frame (advisory / staff IC / consulting / speaking) instead of just "Get in touch."

### 5. Performance & build hygiene

- `ArticleDiagram.tsx` is 1,204 lines — almost certainly a giant switch of SVGs loaded for every article. Should be code-split per diagram.
- No route-level `React.lazy` + `Suspense`. All 13 pages ship in the initial bundle.
- Many unused radix-ui packages in `package.json` (carousel, day-picker, otp, drawer, resizable panels, menubar, navigation-menu, etc.). Trim.
- No image optimization: hero is a raw JPG. No AVIF/WebP, no responsive `srcset`, no blurred placeholder.
- Google Fonts has `preconnect` but no actual stylesheet `<link>` — fonts probably aren't loading at all.

### 6. Repo polish (the GitHub repo *is* part of the brand)

- `README.md` is literally duplicated — the same content appears twice in the file. Anyone visiting the repo from your GitHub profile sees this.
- `package.json` `name` is still `vite_react_shadcn_ts` (Lovable starter default).
- `.env` is checked in. Needs verification it has no real secrets; even so, untrack it.
- `wiki/` folder contains documentation for an unrelated project (ingestion engine, Grafana, ERD). Should be removed or moved out of the repo.
- No CI: no `.github/workflows/` for build + lint + test + Lighthouse.
- Only one example test (`src/test/example.test.ts`). Easy wins: data-integrity tests asserting every article / case study / book has required fields.

### 7. Personal-branding assets the site doesn't yet host

- No **/now** page (the [nownownow.com](https://nownownow.com/) pattern — what you're focused on this month/quarter).
- No **/speaking** or **/talks** even with 1–2 entries.
- No **press / media kit** (short bio, long bio, headshot, preferred titles, logos worked with) — makes inbound coverage and podcast bookings frictionless.
- No **testimonials** / LinkedIn recommendation pull-quotes.
- No **logos** of programs / orgs (OPIR, SBIRS, PWSA, Rocket Lab, Northrop Grumman, USSF) — these compress trust instantly.
- No **photo** of you anywhere — the site is well-credentialed but cool. One human-warm photo + a single line on *why* you do this raises conversion.

---

## Proposed roadmap (ordered by ROI, not by effort)

Each tier is a self-contained PR-able unit so we can ship and measure independently.

### Tier 1 — Foundations & repo polish

Low effort, high signal. Removes the embarrassing surface area before anyone with a sharp eye lands on the repo.

1. Fix the duplicated `README.md`, rename the package in `package.json` to `kushal-portfolio`, remove `wiki/`, untrack `.env`, replace placeholder sitemap URL in `robots.txt`.
2. Add `.github/workflows/ci.yml` running install + lint + test + build on PRs.
3. Install ESLint as a real dependency (currently `npm run lint` fails because eslint isn't installed in `node_modules` until you run `npm install`).
4. Add `src/test/data-integrity.test.ts` that asserts every article / case study / book / mental model has required fields and unique slugs.
5. Switch theme provider to `enableSystem` and respect user system preference (currently forced dark).

### Tier 2 — SEO + sharing (the biggest single brand multiplier)

This is what turns the site from "portfolio" into "ranking content asset."

1. Introduce `react-helmet-async` for per-page `<title>`, `<meta description>`, OG + Twitter cards.
2. Add JSON-LD: `Person` on `/`, `/about`, `/resume`; `Article` on each article; `BreadcrumbList` site-wide.
3. Generate `sitemap.xml` + `rss.xml` at build time from the typed content modules in `src/data/`.
4. Prerender all routes at build time using `vite-plugin-prerender` or `vite-plugin-react-pages`. I'd recommend `vite-plugin-prerender` first — minimal disruption, immediate SEO win. Migrate to full SSG (Astro, vike) only if measurement warrants it.
5. Per-article OG images: small Node script in `scripts/generate-og.ts` using `satori` + `resvg` to render a title-card PNG per article at build time. Output to `public/og/<slug>.png` and wire up via Helmet.

### Tier 3 — Audience capture & measurement

Without these we can't tell which Tier 4/5 work is actually paying off.

1. Add Plausible or Vercel Analytics. Track: resume download, article read >60s, contact CTA click, GitHub click, newsletter signup.
2. Newsletter signup component (Buttondown or ConvertKit — both have free tiers). Place at top of `/thinking`, end of every article, and as a secondary home-page CTA.
3. Add `/hire-me` (or `/work-with-me`) page with explicit availability + Cal.com embed.
4. Add print stylesheet to `/resume` so the page itself is a clean printable (and consider removing the PDF dependency entirely).

### Tier 4 — Home page sharpening & IA cleanup

Once people are finding the site, this is what converts them.

1. Rewrite hero: one positioning sentence + 3–4 quantified stat tiles + one signature diagram or case study card.
2. Add a "Currently" strip (what you're working on, reading, writing) — pulls from a single object in `src/data/now.ts`.
3. Add a testimonials section (start with 2–3 LinkedIn quotes).
4. Reconcile `/work` vs `/projects` — relabel `/projects` to `/code` and integrate visually, or fold into `/work` with a tab.
5. Promote mental models out of `/books/models/:slug` to `/mental-models/:slug`. Keep redirects.
6. Group header into 4 primary items (Work · Writing · About · Contact) + a "More" group for Books, Mental Models, Resume.

### Tier 5 — Performance, content depth, personality

Once the foundation, distribution, and conversion paths are solid, polish for retention and signal.

1. Route-level `React.lazy` + `Suspense` for all pages.
2. Split `ArticleDiagram.tsx` into per-diagram modules, dynamically imported by article.
3. Audit and trim unused radix-ui dependencies; add `rollup-plugin-visualizer` to CI as a bundle budget check.
4. Image pipeline: convert hero + case-study images to AVIF/WebP with responsive `srcset` via `vite-imagetools`.
5. Add a `/speaking` page (placeholder OK to start) and a `/press` page with short/long bio + headshot + program logos.
6. Add a small personal-warmth element on `/about`: one photo, one paragraph on *why* you work across these domains.
7. Article enhancements: reading-progress bar, estimated read time, "next in series" footer, social share buttons.

---

## Suggested measurement

Once Tier 2 + Tier 3 ship, set baseline metrics and re-check monthly:

- Google Search Console: indexed pages, impressions, clicks per article.
- Plausible (or Vercel Analytics): top pages, time-on-page, source attribution.
- Newsletter list size and growth rate.
- Resume downloads / contact form submits / Cal.com bookings.

Don't ship anything in Tier 4+ until you have at least 30 days of data from Tier 2+3 — otherwise we're guessing.

---

## Open questions for the next iteration of this plan

1. What's the **primary** audience right now — hiring managers, advisory clients, podcast bookers, peers, or recruiters? The home page CTA + IA should optimize for one.
2. Is the goal a job, advisory income, or audience growth? That changes whether we prioritize Tier 4 (conversion) or Tier 2 (reach).
3. Are you open to migrating off pure SPA to a static-site framework (Astro / vike) for content pages? It's a bigger lift but pays compounding SEO dividends for years.
4. Newsletter platform preference (Buttondown / ConvertKit / Substack / self-hosted)?
5. Are there any case studies / programs that are NDA-sensitive and shouldn't get more SEO surface area? That changes how aggressively we prerender + index.
