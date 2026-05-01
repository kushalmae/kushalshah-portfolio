# Kushal Shah - Portfolio

Portfolio site for Kushal Shah, a Technical Program Manager and systems leader focused on mission-critical aerospace and defense programs.

Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Positioning

The site content reflects resume-based experience across:

- OPIR / SBIRS payload system performance
- Mission algorithms and LOS/radiometry analysis
- Cross-functional technical program leadership
- Engineering automation with Python, Flask, Streamlit, and React

## Stack

- **React 18** + **TypeScript**
- **Vite** - dev server and build
- **Tailwind CSS** - styling with dark/light mode
- **shadcn/ui** - UI primitives
- **React Router v6** - client-side routing
- **next-themes** - dark/light mode toggle
- **react-hook-form** - contact form validation
- **Formspree** - contact form submission (optional)

## Project Structure

```text
src/
|- pages/          Route-level page components
|- components/     Shared UI components
|  \- ui/          shadcn primitives (button, toast, tooltip, sonner)
|- config/         Site-wide constants (site.ts)
|- data/           Case study content (case-studies.ts)
|- hooks/          Custom hooks (scroll-reveal, mobile, toast)
|- lib/            Utilities (cn)
|- assets/         Images
\- test/           Vitest setup and example tests
public/
|- resume.pdf      Downloadable resume
|- favicon.svg
\- favicon.ico
```

## Pages

| Route | Page |
|---|---|
| `/` | Home - hero, value pillars, featured work, CTA |
| `/about` | Background, leadership approach, core beliefs |
| `/work` | Filterable case study grid |
| `/work/:id` | Full case study with table of contents |
| `/thinking` | Writing index |
| `/resume` | Detailed experience, impact, education, certifications, skills |
| `/contact` | Contact form + direct email/LinkedIn |

## Getting Started

```bash
npm install
npm run dev       # http://localhost:8080
npm run build     # production build -> dist/
npm run preview   # preview production build
npm test          # run vitest
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Your deployed Vercel domain (for OG image absolute URL)
VITE_SITE_URL=https://your-domain.vercel.app

# Formspree endpoint for contact form (https://formspree.io)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Deploying to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in **Project Settings -> Environment Variables**:
   - `VITE_SITE_URL` -> your Vercel domain (e.g. `https://kushalshah.vercel.app`)
   - `VITE_FORMSPREE_ENDPOINT` -> your Formspree form endpoint
4. Deploy - SPA routing is handled by `vercel.json`

## Contact Form Setup

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the endpoint URL
3. Set `VITE_FORMSPREE_ENDPOINT` in your Vercel environment variables

Without `VITE_FORMSPREE_ENDPOINT`, the form falls back to opening a pre-filled `mailto:` link.
# Kushal Shah — Portfolio

Personal portfolio site for a Systems Architect & Technical Strategist. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui.

## Stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build
- **Tailwind CSS** — styling with dark/light mode
- **shadcn/ui** — UI primitives
- **React Router v6** — client-side routing
- **next-themes** — dark/light mode toggle
- **react-hook-form** — contact form validation
- **Formspree** — contact form submission (optional)

## Project Structure

```
src/
├── pages/          Route-level page components
├── components/     Shared UI components
│   └── ui/         shadcn primitives (button, toast, tooltip, sonner)
├── config/         Site-wide constants (site.ts)
├── data/           Case study content (case-studies.ts)
├── hooks/          Custom hooks (scroll-reveal, mobile, toast)
├── lib/            Utilities (cn)
├── assets/         Images
└── test/           Vitest setup and example tests
public/
├── resume.pdf      Downloadable resume
├── hero-visual.jpg OG image for social sharing
└── favicon.ico
```

## Pages

| Route | Page |
|---|---|
| `/` | Home — hero, pillars, featured work, CTA |
| `/about` | Background, beliefs |
| `/work` | Filterable case study grid |
| `/work/:id` | Full case study with TOC |
| `/thinking` | Writing index |
| `/resume` | Experience, expertise, PDF download |
| `/contact` | Contact form + direct links |

## Getting Started

```bash
npm install
npm run dev       # http://localhost:8080
npm run build     # production build → dist/
npm run preview   # preview production build
npm test          # run vitest
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# Your deployed Vercel domain (for OG image absolute URL)
VITE_SITE_URL=https://your-domain.vercel.app

# Formspree endpoint for contact form (https://formspree.io)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Deploying to Vercel

1. Push to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in **Project Settings → Environment Variables**:
   - `VITE_SITE_URL` → your Vercel domain (e.g. `https://kushalshah.vercel.app`)
   - `VITE_FORMSPREE_ENDPOINT` → your Formspree form endpoint
4. Deploy — SPA routing is handled by `vercel.json`

## Contact Form Setup

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and copy the endpoint URL
3. Set `VITE_FORMSPREE_ENDPOINT` in your Vercel env variables

Without `VITE_FORMSPREE_ENDPOINT` set, the form falls back to opening a pre-filled mailto link.
