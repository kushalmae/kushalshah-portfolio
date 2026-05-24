# Kushal Shah — Portfolio

Personal portfolio for **Kushal Shah** — Systems Architect & Technical Strategist. Aerospace systems leadership, mission operations, and software platform work across OPIR/SBIRS, PWSA, and LEO constellation programs.

Built with React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui.

## Stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build
- **Tailwind CSS** — styling with dark/light mode
- **shadcn/ui** — UI primitives over Radix
- **React Router v6** — client-side routing
- **next-themes** — theme management
- **react-hook-form** — contact form validation
- **Formspree** — contact form submission (optional)
- **Vitest** + **Testing Library** — tests

## Commands

```bash
npm install
npm run dev          # http://localhost:8080
npm run build        # production build → dist/
npm run build:dev    # dev-mode build
npm run preview      # preview production build
npm run lint         # ESLint
npm run test         # Vitest run
npm run test:watch   # Vitest watch
```

## Project Structure

```text
src/
├── pages/        Route-level page components
├── components/   Shared UI; ui/ contains shadcn primitives
├── config/       Site-wide constants (site.ts)
├── data/         Typed content (case studies, articles, books, mental models, github projects)
├── hooks/        useScrollReveal, useToast, useMobile
├── lib/          cn() utility
├── assets/       Bundled images
└── test/         Vitest setup and tests
public/
├── resume.pdf       Downloadable resume
├── favicon.svg
└── hero-visual.jpg  OG image for social sharing
docs/
└── PORTFOLIO-ROADMAP.md  Roadmap and audit for the site
```

## Routes

| Route | Page |
|---|---|
| `/` | Home — hero, pillars, featured case studies, GitHub projects |
| `/about` | Background, beliefs |
| `/work` | Filterable case study grid |
| `/work/:id` | Full case study with table of contents |
| `/projects` | GitHub projects |
| `/thinking` | Long-form writing index (topics + series) |
| `/thinking/:slug` | Article |
| `/books` | Book summaries and mental models index |
| `/books/:slug` | Full book summary |
| `/books/models/:slug` | Mental model detail |
| `/resume` | Experience, expertise, PDF download |
| `/contact` | Contact form + direct links |

## Content layer

Content is defined as typed TypeScript objects, not fetched from an API.

- `src/data/case-studies.ts` re-exports each case study from `src/data/case-studies/<id>.ts`
- `src/data/articles.ts` re-exports each article from `src/data/articles/<slug>.ts`
- `src/data/books.ts` re-exports each book from `src/data/books/<slug>.ts` and each mental model from `src/data/mental-models/<slug>.ts`

To add new content: create the file in the matching subdirectory, then import and add it to the index.

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Deployed domain (used for OG image absolute URL, sitemap, etc.)
VITE_SITE_URL=https://your-domain.vercel.app

# Formspree endpoint for the contact form
# Create a free form at https://formspree.io and paste the endpoint
# e.g. https://formspree.io/f/xabcdefg
VITE_FORMSPREE_ENDPOINT=
```

Without `VITE_FORMSPREE_ENDPOINT`, the contact form falls back to opening a pre-filled `mailto:` link.

## Deploying to Vercel

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add environment variables in **Project Settings → Environment Variables**:
   - `VITE_SITE_URL` → your Vercel domain (e.g. `https://kushalshah.vercel.app`).
   - `VITE_FORMSPREE_ENDPOINT` → your Formspree form endpoint.
4. Deploy — SPA routing is handled by `vercel.json`.

## Roadmap

See [`docs/PORTFOLIO-ROADMAP.md`](docs/PORTFOLIO-ROADMAP.md) for the current audit and the prioritized roadmap (SEO, RSS, breadcrumbs, hiring funnel, performance).
