# 05 · Styling & Theming

Tailwind utility classes for layout. CSS variables for color. `next-themes` to flip a class on `<html>`. That's the whole system.

---

## The Token Layer

All colors are HSL variables defined in `src/index.css`:

```css
:root {           /* light */
  --background: 0 0% 98%;
  --foreground: 0 0% 9%;
  --primary:    35 30% 38%;
  /* ... */
}
.dark {           /* dark */
  --background: 0 0% 4%;
  --foreground: 40 10% 87%;
  /* ... */
}
```

`tailwind.config.ts` exposes them as Tailwind colors:

```ts
colors: {
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary:    { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  // ...
}
```

So `bg-background`, `text-foreground`, `border-line`, `bg-primary`, etc. work in both themes without conditionals.

### Notable extra tokens

Beyond shadcn defaults, this site adds:

- `--surface-elevated` → `bg-surface-elevated`
- `--text-dim` → `text-text-dim`
- `--accent-warm` → `bg-accent-warm` (warm brown accent, used sparingly)
- `--line` → `border-line` (subtle dividers)

If you find yourself reaching for an unstyled gray, check whether one of these tokens already exists.

---

## Dark / Light

`next-themes` is configured in `src/App.tsx`:

```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
```

- `attribute="class"` → toggles `class="dark"` on `<html>`.
- `defaultTheme="dark"` → the brand default; dark is the canonical look.
- `enableSystem={false}` → users explicitly choose, we don't follow OS.

The toggle is the sun/moon button in `SiteHeader`. It calls `setTheme("dark" | "light")`.

Tailwind's `darkMode: ["class"]` (in `tailwind.config.ts`) ties this all together — any `dark:bg-foo` utility activates when the root has `class="dark"`.

---

## Typography

Two fonts, loaded via Google Fonts in `src/index.css`:

- **Inter** — body & UI (`font-sans`)
- **JetBrains Mono** — code & numeric callouts (`font-mono`)

No serif. No display face.

Inter weights loaded: 300, 400, 500, 600, 700.

---

## Layout

- Container is centered, max width `1200px` at `2xl`, padding `2rem` (`tailwind.config.ts`).
- Use `container` class for any horizontally constrained block — don't roll your own width caps.
- Vertical rhythm is whatever Tailwind's spacing scale gives you; favor `py-16` / `py-24` for page sections.

---

## Animations

- `tailwindcss-animate` plugin is on, gives accordion/expand keyframes.
- Page-to-page transitions live in `PageTransition`.
- Scroll-reveals come from `useScrollReveal` + the `<Reveal>` wrapper.

No Framer Motion. No GSAP. CSS + IntersectionObserver is enough.

---

## When To Add A New Token vs A New Class

- **New token** — when the value is semantic and will be reused (e.g. a new surface tier, a new accent). Edit `src/index.css` in both blocks (`:root` and `.dark`) and expose it in `tailwind.config.ts`.
- **New class** — when the value is one-off. Just use Tailwind utilities inline.

If you write the same custom class twice, promote it to a token.
