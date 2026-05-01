# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this project

Personal portfolio site for **Kushal Shah** — Systems Architect and Technical Strategist. The site presents his professional identity, selected work, and writing to prospective employers, collaborators, and advisors.

Kushal's background spans aerospace/defense (payload systems, signal processing, missile classification), spacecraft engineering (power, GNC, flight software, ground software), software platform development (APIs, microservices, automation pipelines), and AI/workflow automation. The portfolio reflects that breadth: case studies show cross-domain systems thinking, and the "Thinking" section hosts long-form technical writing.

The tone throughout is direct, confident, and technical — not a generic dev portfolio.

## Commands

```bash
npm run dev          # Dev server on http://localhost:8080
npm run build        # Production build → dist/
npm run build:dev    # Dev-mode build
npm run lint         # ESLint
npm run preview      # Preview production build
npm run test         # Run tests once (Vitest)
npm run test:watch   # Vitest in watch mode
```

## Architecture

React 18 + TypeScript SPA built with Vite and React SWC. Client-side routing via React Router v6. Styling via Tailwind CSS with shadcn/ui components (Radix UI primitives). Path alias `@/` maps to `src/`.

### Route structure (src/App.tsx)

| Route | Page |
|---|---|
| `/` | Home — hero, pillars, featured case studies |
| `/about` | About |
| `/work` | Filterable case study grid |
| `/work/:id` | Full case study |
| `/thinking` | Articles index |
| `/thinking/:slug` | Full article |
| `/resume` | Experience, skills, PDF download |
| `/contact` | Contact form + direct links |

### Data layer (src/data/)

Content is defined as typed TypeScript objects, not fetched from an API.

- `src/data/case-studies.ts` — imports and re-exports all case study objects; each case study lives in `src/data/case-studies/<id>.ts`
- `src/data/articles.ts` — imports and re-exports all article objects; each article lives in `src/data/articles/<slug>.ts`
- `src/data/articles/types.ts` — `Article` interface (slug, title, date, description, sections, diagrams)
- Case study shape: id, label, title, image, summary, tags, technologies, tldr, metrics, context, problem, constraints, role, approach, solution, impact, insight

To add a new case study or article: create the file in the matching subdirectory, then import and add it to the index file.

### Key directories

```
src/
├── pages/       Route-level components
├── components/  Shared UI; ui/ contains shadcn primitives
├── config/      Site constants (site.ts — email, LinkedIn, resume URL, env vars)
├── data/        Content objects (case studies, articles)
├── hooks/       useScrollReveal, useToast, useMobile
└── lib/         cn() utility (clsx + tailwind-merge)
```

### Environment variables

```
VITE_SITE_URL            # Deployed domain (used for OG image URLs)
VITE_FORMSPREE_ENDPOINT  # Contact form submission endpoint
```

### Deployment

Vercel SPA — `vercel.json` rewrites all routes to `index.html`. Dark/light theme handled by next-themes via class strategy on `<html>`.
