# Kushal Shah — Portfolio

Personal portfolio site for a Systems Architect & Technical Strategist. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build
- **Tailwind CSS** — styling
- **shadcn/ui** — UI primitives
- **React Router v6** — client-side routing
- **Framer-style scroll reveals** — custom IntersectionObserver hook

## Project Structure

```
src/
├── pages/          Route-level page components
├── components/     Shared UI components
│   └── ui/         shadcn primitives (button, toast, tooltip, sonner)
├── data/           Case study content (case-studies.ts)
├── hooks/          Custom hooks (scroll-reveal, mobile, toast)
├── lib/            Utilities (cn)
├── assets/         Images
└── test/           Vitest setup and example tests
```

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, pillars, featured work, CTA |
| `/about` | Background, beliefs |
| `/work` | Filterable case study grid |
| `/work/:id` | Full case study with TOC |
| `/thinking` | Writing index |
| `/resume` | Experience and expertise |
| `/contact` | Contact info |

## Getting Started

```bash
npm install
npm run dev       # http://localhost:8080
npm run build     # production build → dist/
npm run preview   # preview production build
npm test          # run vitest
```
