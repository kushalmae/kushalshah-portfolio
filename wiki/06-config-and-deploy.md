# 06 · Config & Deploy

How the site is configured, built, and shipped.

---

## Scripts

From `package.json`:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server at `http://localhost:8080` |
| `npm run build` | Production build → `dist/` |
| `npm run build:dev` | Build using `--mode development` (source maps, no minify) |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint over the repo |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Vitest in watch mode |

Local dev typically: `npm install && npm run dev`.

---

## Environment Variables

Only two, both consumed via `import.meta.env` and centralized in `src/config/site.ts`:

| Variable | Used by | What it does |
|----------|---------|--------------|
| `VITE_SITE_URL` | `index.html` OG tags, `site.siteUrl` | Absolute URL for OG/Twitter card images. If unset, OG image URLs become relative and don't preview properly when shared. |
| `VITE_FORMSPREE_ENDPOINT` | `ContactForm.tsx` | Where the contact form POSTs. If empty, the form falls back to a pre-filled `mailto:` link to `site.email`. |

Copy `.env.example` → `.env.local` for local dev. In Vercel, set them under **Project Settings → Environment Variables**.

Both must be prefixed `VITE_` — Vite only exposes `VITE_*` to the client bundle.

---

## Vite Config

`vite.config.ts` is small on purpose:

```ts
{
  server: { host: "::", port: 8080, hmr: { overlay: false } },
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime",
             "@tanstack/react-query", "@tanstack/query-core"],
  },
}
```

Notes:

- React plugin is the **SWC** variant (`@vitejs/plugin-react-swc`) — faster than Babel.
- `dedupe` prevents bundling two copies of React / react-query when a dep declares its own.
- `host: "::"` binds IPv6 too — handy for mobile testing on LAN.
- `hmr.overlay: false` disables the red error overlay — `ErrorBoundary` already renders a graceful fallback.

---

## TypeScript

Two configs:

- `tsconfig.app.json` — application code (the bundle).
- `tsconfig.node.json` — config files run by Node (e.g. `vite.config.ts`).
- `tsconfig.json` — references both.

Path alias `@/* → src/*` is declared in `tsconfig.app.json`. Keep it aligned with `vite.config.ts`.

---

## Tests

`vitest.config.ts` sets up a jsdom environment with `src/test/setup.ts` (jest-dom matchers). The example spec is `src/test/example.test.ts`. Tests live alongside what they test, by convention.

Run `npm test` before pushing changes that touch components or content shape.

---

## Deployment (Vercel)

The site is a single-page app, so `vercel.json` rewrites every URL to `index.html`:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Without this, deep links (e.g. `/work/foo`) would 404 because there's no static file at that path.

### First-time deploy

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. In **Project Settings → Environment Variables**, add:
   - `VITE_SITE_URL` → your Vercel domain (e.g. `https://kushalshah.vercel.app`)
   - `VITE_FORMSPREE_ENDPOINT` → your Formspree endpoint (optional)
4. Deploy. SPA routing is handled by `vercel.json`.

Subsequent pushes to `main` auto-deploy. Branches deploy to preview URLs.

---

## Contact Form Wiring (Formspree)

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy the endpoint (looks like `https://formspree.io/f/xabcdefg`).
3. Set `VITE_FORMSPREE_ENDPOINT` in Vercel env vars.

If the variable is missing, `ContactForm` opens a pre-filled `mailto:${site.email}` instead of POSTing. Nothing breaks.

---

## What's Configured Where (Quick Map)

| Concern | File |
|---------|------|
| Routes | `src/App.tsx` |
| Global site constants | `src/config/site.ts` |
| Path alias | `vite.config.ts` + `tsconfig.app.json` |
| Design tokens | `src/index.css` + `tailwind.config.ts` |
| Theme strategy | `<ThemeProvider>` in `src/App.tsx` |
| OG / meta tags | `index.html` |
| SPA rewrite | `vercel.json` |
| Test env | `vitest.config.ts` + `src/test/setup.ts` |
| Lint | `eslint.config.js` |
