# Portfolio Roadmap

A grounded audit + prioritized plan to take this site to the next level as a hiring-conversion asset — the goal is to maximize the number and quality of hiring-manager / recruiter conversations that lead to future roles.

Each tier below is intended to ship as one or more self-contained PRs so we can measure impact before moving on.

The audit is based on the current state of the repo on `main`: React 18 SPA with Vite + Tailwind + shadcn, typed content layer under `src/data/`, ~16 long-form articles, ~10 case studies, books + mental models, GitHub project cards, resume, and a contact form.

---

## Positioning decision (drives everything below)

- **Primary audience:** hiring managers, technical recruiters, and engineering leaders evaluating Kushal for a future role (staff / principal IC, technical PM, systems architect, mission ops lead, AI/platform leadership).
- **Secondary audience:** peers / collaborators who find articles in search and read them — useful only insofar as they amplify reach to the primary audience.
- **Explicitly not the goal:** newsletter audience growth, content creator brand, course sales. We are not building a list.

This changes the optimization target from *audience capture* to *credibility verification + low-friction outreach*. A hiring manager lands, gets convinced in <60 seconds, and either downloads the resume, books a screen, or shares the link with their team.

---

## What the site already does well

- **Strong raw content surface area.** Case studies, long-form articles grouped by topic + series, book summaries, mental models, GitHub project cards, resume. Most candidates' portfolios don't have a tenth of this.
- **Clean stack and code.** React 18 + Vite + Tailwind + shadcn, typed content layer, route-level pages, `ErrorBoundary`, `ScrollToTop`, `Reveal` with reduced-motion support, theme toggle.
- **Consistent positioning.** "Systems Architect & Technical Strategist" runs through hero, header, footer, OG tags.
- **Distinct voice.** The writing is technical, direct, and non-generic — exactly the right tone for the target audience (defense / aerospace / startup engineering leadership).

---

## Where leverage is currently being left on the table

### 1. SEO & discoverability — the biggest miss for a content-heavy candidate site

This is a pure client-rendered SPA, which means a portfolio whose value depends on long-form articles ranking in Google and looking good when shared on LinkedIn / Slack / email is:

- Serving empty HTML to crawlers and link unfurlers (no SSR / SSG / prerender).
- Missing per-page `<title>` / `<meta description>` / OG tags. `index.html` has one static OG card for the whole site, and `%VITE_SITE_URL%/hero-visual.jpg` only substitutes when the env var is set at build time — otherwise the OG URL is broken.
- Missing `sitemap.xml` (referenced in `robots.txt` but doesn't exist, and the placeholder URL is still `your-domain.vercel.app`).
- Missing JSON-LD (`Person`, `Article`, `BreadcrumbList`) — these directly drive the "Kushal Shah" knowledge-panel-style search result, which is the first thing a hiring manager Googles after seeing the resume.
- Missing RSS / Atom feed despite ~16 long-form articles.
- Missing per-article OG images — every link share looks identical, including the ones a hiring manager pastes into their team Slack.

### 2. No breadcrumbs (UI or schema)

- Article, case study, book, and mental-model pages drop visitors deep with no visible "where am I in the site" cue and no easy way back to the parent index.
- No `BreadcrumbList` JSON-LD, so Google search results don't show breadcrumb trails under links to your articles — that breadcrumb display measurably increases CTR on long-tail queries.

### 3. No measurement

- No analytics (Plausible / Umami / Vercel) → no signal on which articles or CTAs actually work. For a hiring funnel, we want to know: which page do recruiters land on, what they read, whether they download the resume, whether they click LinkedIn or contact.

### 4. Hiring-funnel friction

- No "Book a call" (Cal.com / Calendly). Formspree contact form + `mailto:` fallback is high-friction — a busy recruiter won't fill in a form.
- No `/hire-me` (or `/work-with-me`) page that explicitly states what kind of roles you're looking for, geography, comp band (or "open to discussion"), notice period, etc. This is the single page a hiring manager wants to find.
- Contact page doesn't surface LinkedIn as the primary channel even though it's the channel recruiters actually use.

### 5. Information architecture duplication

- `/work` (case studies) and `/projects` (GitHub) are two separate top-level surfaces visitors won't differentiate. Relabel: **Work = strategic case studies**, **Code = repos & demos**.
- Books / mental models routing (`/books/models/:slug`) is nested awkwardly. Promote `/mental-models` to a top-level route — or keep but make breadcrumbs explicit so the nesting is at least legible.
- Header has 7 items on desktop and stacks vertically on mobile. Group into 4 primary items + a "More" cluster.

### 6. Home page doesn't yet sell the rare combination

The pillars ("Technical Strategy / Systems Architecture / Software Leverage") are accurate but abstract. What's actually rare about this profile is the **triangulation**: flight software for LEO constellations + technical BOEs for $10M+ defense proposals + AI agents for startups. The home page should:

- Open with one positioning sentence used identically on LinkedIn, GitHub bio, and Twitter/X.
- Show 3–4 quantified proof tiles: $5M IPT budget, 25-engineer team, $10M+ proposals, $1M+ tooling savings, 6 USSF programs.
- Surface a single hero proof: one architecture diagram or one signature case study above the fold.
- End with a sharp "Available for:" frame (staff/principal IC, technical PM, systems architect roles) instead of just "Get in touch."

### 7. Performance & build hygiene

- `ArticleDiagram.tsx` is 1,204 lines — almost certainly a giant switch of SVGs loaded for every article. Should be code-split per diagram.
- No route-level `React.lazy` + `Suspense`. All 13 pages ship in the initial bundle.
- Many unused radix-ui packages in `package.json` (carousel, day-picker, otp, drawer, resizable panels, menubar, navigation-menu, etc.). Trim.
- No image optimization: hero is a raw JPG. No AVIF/WebP, no responsive `srcset`, no blurred placeholder.
- Google Fonts has `preconnect` but no actual stylesheet `<link>` — fonts probably aren't loading at all.

### 8. Repo polish (the GitHub repo *is* part of the brand — recruiters do open it)

- `README.md` is literally duplicated — the same content appears twice in the file. Anyone visiting the repo from your GitHub profile sees this.
- `package.json` `name` is still `vite_react_shadcn_ts` (Lovable starter default).
- `.env` is checked in. Needs verification it has no real secrets; even so, untrack it.
- `wiki/` folder contains documentation for an unrelated project (ingestion engine, Grafana, ERD). Should be removed or moved out of the repo.
- No CI: no `.github/workflows/` for build + lint + test.
- Only one example test (`src/test/example.test.ts`). Easy wins: data-integrity tests asserting every article / case study / book has required fields.

### 9. Hiring-signal assets the site doesn't yet host

- No **/now** page (what you're focused on this quarter — answers "is this person currently engaged elsewhere?").
- No **/speaking** or **/talks** even with 1–2 entries — talks are strong proof for senior IC / lead roles.
- No **logos** of programs / orgs (OPIR, SBIRS, PWSA, Rocket Lab, Northrop Grumman, USSF) — these compress trust instantly for a recruiter who's skimming.

> Testimonials and LinkedIn recommendations are intentionally kept on LinkedIn rather than mirrored on the site. The site links to LinkedIn prominently; that's where hiring-grade social proof belongs.
- No **photo** of you anywhere — the site is well-credentialed but cool. One human-warm photo + a single line on *why* you do this raises conversion for hiring managers who want to picture you on their team.

---

## Proposed roadmap (ordered by ROI for the hiring funnel)

Each tier is a self-contained PR-able unit so we can ship and measure independently.

### Tier 1 — Foundations & repo polish

Low effort, high signal. Removes embarrassing surface area before any sharp-eyed engineering manager lands on the repo from your GitHub.

1. Fix the duplicated `README.md`, rename the package in `package.json` to `kushal-portfolio`, remove `wiki/`, untrack `.env`, replace the placeholder sitemap URL in `robots.txt`.
2. Add `.github/workflows/ci.yml` running install + lint + test + build on PRs.
3. Install ESLint as a real dependency (currently `npm run lint` fails because eslint isn't installed until you run `npm install`).
4. Add `src/test/data-integrity.test.ts` that asserts every article / case study / book / mental model has required fields and unique slugs.
5. Switch theme provider to `enableSystem` and respect user system preference (currently forced dark, which fights the recruiter who opens the link on a light-themed work laptop).

### Tier 2 — SEO, sharing, RSS, breadcrumbs

This is what makes the site rank for "Kushal Shah" + topic searches, look professional when pasted into Slack/LinkedIn, and orient deep-link visitors instantly.

1. Introduce `react-helmet-async` for per-page `<title>`, `<meta description>`, OG + Twitter cards. Default values from `site` config, page-level overrides on every route.
2. Add JSON-LD structured data:
   - `Person` on `/`, `/about`, `/resume` with `sameAs` linking GitHub, LinkedIn, etc.
   - `Article` on each `/thinking/:slug` (headline, author, datePublished, image).
   - `BreadcrumbList` on every nested page (`/work/:id`, `/thinking/:slug`, `/books/:slug`, `/books/models/:slug`).
3. **Visible breadcrumb UI component.** New `Breadcrumbs.tsx` rendered above the H1 on all nested pages (Work, Thinking, Books, Mental Models). Examples:
   - `Home › Work › OPIR System Performance`
   - `Home › Thinking › PWSA Architecture`
   - `Home › Library › Books › Radical Candor`
   - `Home › Library › Mental Models › Golden Circle`
   - Mobile-collapsing, accessible (`aria-label="Breadcrumb"`, `<ol>` with `aria-current="page"` on the last item), keyboard-navigable.
4. **RSS / Atom feed.** Generate `public/rss.xml` at build time from the articles module. Include full content (not just excerpts) so feed readers and aggregators work. Add `<link rel="alternate" type="application/rss+xml">` in `<head>` so feed readers auto-discover it. Link visibly from `/thinking` (`RSS` button in header of articles index).
5. **`sitemap.xml`** generated at build time from all routes + article slugs + case study ids + book slugs + mental model slugs. Fix the placeholder URL in `robots.txt`.
6. **Prerender all routes at build time** using `vite-plugin-prerender` (or migrate to `vike` if we want full SSG later). Without prerender, the per-page meta + JSON-LD + breadcrumbs work in browsers but not for crawlers, which defeats the purpose. Start with prerender, measure, only migrate frameworks if numbers warrant.
7. **Per-article OG images.** `scripts/generate-og.ts` using `satori` + `resvg` renders a title-card PNG per article at build time. Output to `public/og/<slug>.png` and wire up via Helmet.

### Tier 3 — Hiring funnel & measurement

1. Add Plausible or Vercel Analytics. Track: resume download, article read >60s, contact CTA click, GitHub click, LinkedIn click, `/hire-me` view, Cal.com booking redirect.
2. Add `/hire-me` (or `/available`) page. Explicit content:
   - What roles you're open to (titles + scope).
   - Geography / remote preference.
   - Time horizon ("actively looking" / "open to the right thing" / "happy where I am, advisory only").
   - Notice period / earliest start.
   - "Fast path" CTA → Cal.com 20-min intro call.
   - "Share this with your team" — generates an OG-rich link for forwarding.
3. Rework `/contact` to surface **LinkedIn first**, then Cal.com, then email — in that order. Drop or de-emphasize the Formspree form (recruiters won't fill it out).
4. Add a "Download resume" sticky CTA on the home page hero and on `/resume` (and a print-stylesheet pass on `/resume` so the page itself is a clean printable — let's eventually retire the static PDF in favor of the live page + `window.print()`).

### Tier 4 — Home page sharpening & IA cleanup

Once recruiters are finding the site and have a clear conversion path, sharpen the first-impression.

1. Rewrite hero: one positioning sentence + 3–4 quantified stat tiles + one signature diagram or case study card.
2. Add a **"Currently"** strip pulled from a single object in `src/data/now.ts` (what you're working on, last shipped, what role you're open to).
3. Add a **program-logos** strip on the home page: Northrop Grumman, Rocket Lab, USSF, SDA, Lockheed Martin, Thales, UCLA, UCI. Visual proof in under a second.
4. Reconcile `/work` vs `/projects` — relabel `/projects` to `/code` and integrate visually, or fold into `/work` with a tab.
5. Promote mental models out of `/books/models/:slug` to `/mental-models/:slug` (with redirects). Group `/books` + `/mental-models` under a "Library" parent in the header.
6. Group header into 4 primary items (Work · Writing · About · Hire Me) + a "More" group for Library, Resume, Contact.

### Tier 5 — Performance, content depth, personality

1. Route-level `React.lazy` + `Suspense` for all pages.
2. Split `ArticleDiagram.tsx` into per-diagram modules, dynamically imported by article.
3. Audit and trim unused radix-ui dependencies; add `rollup-plugin-visualizer` to CI as a bundle budget check.
4. Image pipeline: convert hero + case-study images to AVIF/WebP with responsive `srcset` via `vite-imagetools`.
5. Add a `/speaking` page (placeholder OK to start, even one entry helps).
6. Add a small personal-warmth element on `/about`: one photo, one paragraph on *why* you work across these domains. Tells a hiring manager what kind of teammate you'd be.
7. Article enhancements: reading-progress bar, estimated read time, "next in series" footer, social share links (LinkedIn first).

---

## Suggested measurement

Once Tier 2 + Tier 3 ship, set baseline metrics and re-check monthly:

- **Google Search Console:** indexed pages, impressions, clicks per article — especially queries that include your name.
- **Plausible (or Vercel Analytics):** top pages, time-on-page, source attribution (LinkedIn vs Google vs direct).
- **Hiring funnel metrics:** resume downloads / contact form submits / Cal.com bookings, attributed to source where possible.

Don't ship anything in Tier 4+ until there are at least 30 days of data from Tier 2+3 — otherwise we're guessing.

---

## Open questions for the next iteration of this plan

1. Want a Cal.com / Calendly embed on `/hire-me`, or just a link? (Embed converts better but takes more visual real-estate.)
2. Comfortable listing role titles + geography + availability publicly on `/hire-me`, or keep that behind the contact form?
3. Any case studies / programs that are NDA-sensitive and shouldn't get more SEO surface area? That changes how aggressively we prerender + index.
4. Open to migrating off pure SPA to a static-site framework (Astro / vike) for content pages? Bigger lift but compounding SEO returns. Recommended only if Tier 2 prerender doesn't move Search Console numbers within ~6 weeks.
