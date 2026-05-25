# 02 · Routes & Pages

The route table lives in `src/App.tsx`. Every route maps 1:1 to a page component in `src/pages/`.

---

## Route Table

| Route | Page component | What it does | Reads from |
|-------|----------------|--------------|------------|
| `/` | `pages/Index.tsx` | Hero, pillars, featured case studies, CTA | `data/case-studies.ts` |
| `/about` | `pages/About.tsx` | Background, beliefs, leadership approach | static copy |
| `/work` | `pages/Work.tsx` | Filterable case study grid | `data/case-studies.ts` |
| `/work/:id` | `pages/CaseStudyPage.tsx` | Full case study, TOC, related article | `data/case-studies.ts` |
| `/projects` | `pages/Projects.tsx` | GitHub project cards | `data/github-projects/` |
| `/thinking` | `pages/Thinking.tsx` | Articles index, grouped by topic | `data/articles.ts` |
| `/thinking/:slug` | `pages/ArticlePage.tsx` | Full article, TOC, key takeaways, series nav | `data/articles.ts` |
| `/books` | `pages/Books.tsx` | Book summaries + mental models index | `data/books.ts` |
| `/books/:slug` | `pages/BookPage.tsx` | Full book summary, linked models | `data/books.ts` |
| `/books/models/:slug` | `pages/MentalModelPage.tsx` | One mental model | `data/books.ts` |
| `/resume` | `pages/Resume.tsx` | Experience, skills, PDF download | static copy + `public/resume.pdf` |
| `/contact` | `pages/Contact.tsx` | Contact form + direct links | `components/ContactForm.tsx` |
| `*` | `pages/NotFound.tsx` | 404 | — |

The `*` catch-all is necessary because `vercel.json` rewrites every URL to `index.html` (SPA), so React Router has to handle unknown paths itself.

---

## How Routing Works

```
src/App.tsx
  ├── ThemeProvider (next-themes, class strategy, default "dark")
  ├── QueryClientProvider (react-query — present, currently unused for data)
  ├── TooltipProvider
  ├── Toaster + Sonner
  └── ErrorBoundary
       └── BrowserRouter
            ├── ScrollToTop      // resets scroll on route change
            ├── PageTransition   // fade/slide between pages
            └── Routes
                 └── <Route path="…" element={…} />  ×13
```

`ScrollToTop` is a side-effect-only component that resets `window.scrollY` whenever the pathname changes. `PageTransition` is the wrapper that animates page-to-page transitions.

---

## Page Anatomy

Every page conforms to the same shell:

```tsx
<PageLayout title="Work">
  {/* page body */}
</PageLayout>
```

`PageLayout` (`src/components/PageLayout.tsx`) does three things:

1. Sets `document.title` (suffixed with the site name).
2. Renders `SiteHeader` (fixed, blurred, scroll-aware).
3. Renders `SiteFooter` and `BackToTop`.

So a "page" is really just the middle block.

---

## Dynamic Routes

Three routes carry a URL parameter:

- `/work/:id` — `id` matches `CaseStudy.id` in `src/data/case-studies/*`.
- `/thinking/:slug` — `slug` matches `Article.slug` in `src/data/articles/*`.
- `/books/:slug` — `slug` matches `Book.slug` in `src/data/books/*`.
- `/books/models/:slug` — `slug` matches `MentalModel.slug` in `src/data/mental-models/*`.

Each page resolves the parameter against the relevant `getXBySlug` / `find` helper and renders a 404-ish state when no match exists.

Note: `/books/models/:slug` is registered **before** `/books/:slug` in `App.tsx` so that the more specific pattern wins.
