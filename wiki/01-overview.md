# 01 · Overview

## What This Is

The personal portfolio of **Kushal Shah** — Systems Architect & Technical Strategist. The site presents his professional identity, selected work, long-form technical writing, and book notes.

It is a **static client-rendered React SPA**. No backend. No database. No CMS. Content lives in this repo as typed TypeScript.

---

## The Core Abstraction

Think of the site as a function:

```
data (TS objects) → routes (React Router) → pages (React components) → HTML
```

Everything else — Tailwind, shadcn, hooks, theming — is decoration around that pipeline.

---

## What's In The Repo

```
/                       repo root
├── index.html          Vite entry, OG/meta tags
├── src/
│   ├── main.tsx        React mount
│   ├── App.tsx         Router + global providers
│   ├── pages/          One file per route
│   ├── components/     Shared UI (header, footer, cards, layout)
│   │   └── ui/         shadcn primitives (button, toast, tooltip, sonner)
│   ├── config/site.ts  Single source for name, email, links, env-derived URLs
│   ├── data/           Content as typed objects (case studies, articles, …)
│   ├── hooks/          useScrollReveal, useMobile, useToast
│   ├── lib/utils.ts    cn() helper (clsx + tailwind-merge)
│   ├── index.css       Tailwind layers + CSS variable design tokens
│   └── test/           Vitest setup
├── public/             Static assets served at /
├── wiki/               You are here
├── vite.config.ts      Vite + path alias `@/` → `src/`
├── tailwind.config.ts  Theme tokens, container, fonts
├── vercel.json         SPA rewrite (all routes → index.html)
└── package.json        Scripts and deps
```

---

## The Dependency Graph

What depends on what, top-down:

```
        index.html
            │
        main.tsx
            │
        App.tsx ─────────── providers (theme, react-query, tooltip, toaster)
            │
     React Router routes
            │
        src/pages/*
            │
      src/components/*
            │
       src/data/*  (pure TS, no I/O)
```

The right column is global; the left column is what gets rendered. **Pages never fetch anything.** They `import` from `src/data/` and render.

---

## Why This Shape

- **No CMS.** Content velocity is low and authorship is one person. A typed TS object is a better editor than a web form.
- **No backend.** There is nothing to read or write at runtime except the contact form, which posts to Formspree directly.
- **Vite + React SWC.** Fast dev server, fast builds, no ceremony.
- **shadcn/ui over a component library.** UI primitives live in this repo (`src/components/ui/`), so they're owned and forkable.
- **Tailwind with CSS variables.** Dark/light is a class toggle, themed via HSL tokens in `src/index.css`.

---

## The Five Files Worth Knowing First

If you only read five files, read these:

1. `src/App.tsx` — the route table.
2. `src/config/site.ts` — global constants (name, email, links, env vars).
3. `src/data/case-studies.ts` — example of the content-as-TS pattern.
4. `src/components/PageLayout.tsx` — every page wraps in this.
5. `src/index.css` — design tokens (colors, surfaces, accents) for both themes.

Everything else is consequences of these.
