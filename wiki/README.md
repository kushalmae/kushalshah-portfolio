# Wiki

How this site is built, in the smallest number of words that are still useful.

Read in order if you're new. Jump to a section if you know what you need.

---

## Table of Contents

| Doc | What it covers |
|-----|----------------|
| [01 · Overview](01-overview.md) | What this repo is, the one-sentence mental model, the dependency graph |
| [02 · Routes & Pages](02-routes-and-pages.md) | Every route, what page renders it, what data it pulls |
| [03 · Content Model](03-content-model.md) | Case studies, articles, books, mental models, GitHub projects — how content is shaped and indexed |
| [04 · Components & Layout](04-components-and-layout.md) | Page layout, shared components, shadcn primitives, hooks |
| [05 · Styling & Theming](05-styling-and-theming.md) | Tailwind, design tokens, dark/light mode |
| [06 · Config & Deploy](06-config-and-deploy.md) | Env vars, Vite config, Vercel, scripts |
| [07 · Adding Content](07-adding-content.md) | Runbook: how to add a case study, article, book, mental model, or GitHub project |

---

## The One-Liner

> A static React SPA. Content is hand-typed TypeScript objects in `src/data/`. React Router walks them. Vite builds. Vercel serves.

That's it. There is no API, no CMS, no database. Everything you see on the site lives as a typed object in this repo.

---

## The Smallest Mental Model

```
TS content objects (src/data/)
        │
        ▼
  Page components (src/pages/)
        │
        ▼
  React Router (src/App.tsx)
        │
        ▼
   Vite build → dist/ → Vercel
```

If you want to change what's on the site, you edit `src/data/`. If you want to change how it looks, you edit `src/pages/`, `src/components/`, or `src/index.css`. If you want to change how it ships, you touch `vite.config.ts` or `vercel.json`. Nothing else is load-bearing.
