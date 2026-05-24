# 04 · Components & Layout

Two component layers:

1. **App components** in `src/components/` — built for this site.
2. **UI primitives** in `src/components/ui/` — shadcn/Radix primitives, owned in-tree.

---

## The Page Shell

Every route renders inside `PageLayout`:

```tsx
<PageLayout title="Work">
  {/* page-specific content */}
</PageLayout>
```

`PageLayout` (`src/components/PageLayout.tsx`) provides:

- Document title side-effect (e.g. `Work — Kushal Shah`).
- `SiteHeader` — fixed, blurred, scroll-aware, mobile-collapsing nav with theme toggle.
- `SiteFooter` — links + meta.
- `BackToTop` — appears once scrolled.

Pages do not import the header/footer directly. They only render their body.

---

## App-Level Components

| Component | Role |
|-----------|------|
| `SiteHeader` | Top nav, theme toggle, mobile menu. Nav items: About / Work / Projects / Thinking / Books / Resume / Contact. |
| `SiteFooter` | Footer with site links and contact handles. |
| `PageLayout` | The shell described above. |
| `PageTransition` | Wraps `<Routes>` to fade/slide between pages on route change. |
| `ScrollToTop` | Side-effect: resets scroll on pathname change. |
| `BackToTop` | Floating button visible after scroll. |
| `Reveal` | Wrapper that fades in children when scrolled into view (uses `useScrollReveal`). |
| `SectionLabel` | Small uppercase eyebrow text used above headings. |
| `ThemeTag` | Pill-style tag, used in filters and cards. |
| `NavLink` | Internal link that knows its active state. |
| `ErrorBoundary` | Top-level error wall; renders a fallback if a page throws. |
| `SystemsHero` | The animated hero on `/`. |

Content-specific cards & tools:

| Component | Role |
|-----------|------|
| `ArticleCard` | One article in a grid. |
| `ArticleDiagram` | Inline diagram block inside an article. |
| `ArticleTableOfContents` | Sticky TOC for `ArticlePage`. |
| `CaseStudyTOC` | Sticky TOC for `CaseStudyPage`. |
| `BookCard` | One book in the books index. |
| `MentalModelCard` | One mental model in a grid. |
| `GitHubProjectCard` | One project on `/projects`. |
| `ContactForm` | Form on `/contact`, posts to Formspree or falls back to `mailto:`. |

---

## UI Primitives (`src/components/ui/`)

Only the shadcn primitives actually used are present:

- `button.tsx`
- `toast.tsx` / `toaster.tsx` — Radix toast
- `sonner.tsx` — Sonner toast
- `tooltip.tsx`

The full shadcn library is **not** vendored — only what the site uses. To add more, copy the relevant primitive from the shadcn docs into `src/components/ui/` and import via `@/components/ui/<name>`.

---

## Hooks (`src/hooks/`)

| Hook | What it does |
|------|--------------|
| `useScrollReveal` | IntersectionObserver-based "is in view?" boolean, used by `Reveal`. Returns `{ ref, isVisible }`. |
| `useIsMobile` | Reactive boolean for the `< 768px` breakpoint, backed by `matchMedia`. |
| `useToast` | Bridge to the Radix toast queue, mirrors shadcn's hook. |

---

## Utilities (`src/lib/utils.ts`)

One export: `cn(...classes)`. Wraps `clsx` and `tailwind-merge` so conflicting Tailwind classes resolve correctly. Used everywhere — when in doubt, `cn()`.

```ts
import { cn } from "@/lib/utils";
<div className={cn("p-4", isActive && "bg-primary text-primary-foreground")} />
```

---

## Path Alias

`@/` resolves to `src/`. Configured in two places (must stay in sync):

- `vite.config.ts` → `resolve.alias`
- `tsconfig.app.json` → `compilerOptions.paths` (also mirrored in `tsconfig.json`)

Always import as `@/components/...`, `@/data/...`, `@/lib/utils`, etc. Never relative paths beyond a sibling file.
