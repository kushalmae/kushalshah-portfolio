# 07 · Adding Content

Runbook. Each content type follows the same three-step pattern:

> **1.** Create the per-item file → **2.** Import it in the index → **3.** Render.

You shouldn't need to touch any page component when adding content; the pages already iterate over the indices.

---

## Add A Case Study

**1.** Create `src/data/case-studies/<id>.ts`:

```ts
import type { CaseStudy } from "./types";

const myCaseStudy: CaseStudy = {
  id: "my-case-study",      // URL: /work/my-case-study
  label: "Platform",
  title: "Short, declarative title",
  image: "/case-studies/my-case-study.jpg",  // place file in /public
  summary: "One sentence shown on the card.",
  featured: true,            // optional — surfaces on home page
  tags: ["Platform", "Aerospace"],
  technologies: ["Python", "PostgreSQL", "Grafana"],
  tldr: {
    problem: "What was broken.",
    solution: "What you built.",
    impact: "What changed.",
  },
  metrics: [
    { value: "10×", label: "throughput" },
    { value: "<5s",  label: "ingest latency" },
  ],
  context:     ["…"],
  problem:     ["…"],
  constraints: ["…"],
  role:        ["…"],
  approach:    ["…"],
  solution:    ["…"],
  impact:      ["…"],
  insight: "The single sentence that captures what was learned.",
  // optional:
  relatedArticle: { slug: "article-slug", label: "Read the deep dive" },
  githubUrl: "https://github.com/kushalmae/repo",
};

export default myCaseStudy;
```

**2.** Add it to `src/data/case-studies.ts`:

```ts
import myCaseStudy from "./case-studies/my-case-study";

export const caseStudies = [
  // …existing entries…
  myCaseStudy,
];
```

**3.** Done. `/work` lists it, `/work/my-case-study` renders it.

If your case study uses a tag not in `ALL_TAGS` (also in `case-studies.ts`), add it there too — the filter set is deliberately small and curated.

---

## Add An Article

**1.** Create `src/data/articles/<slug>.ts`:

```ts
import type { ArticleContent } from "./types";

const article: ArticleContent = {
  slug: "my-article",                   // URL: /thinking/my-article
  title: "…",
  subtitle: "…",
  description: "Shown on cards and meta.",
  date: "2026-05-24",
  readTime: "8 min",
  tags: ["Spacecraft Systems"],
  intro: ["Lede paragraph.", "Second paragraph."],
  sections: [
    {
      id: "section-one",
      label: "01",
      heading: "Section heading",
      paragraphs: ["…", "…"],
      // optional:
      table: { headers: ["A", "B"], rows: [["1", "2"]] },
      relatedArticle: { slug: "other", label: "Related read" },
      diagramId: "my-diagram",          // resolved by ArticleDiagram
    },
  ],
  insight: "Closing one-liner.",
  // featuredWork, attachment also optional — see types.ts
};

export default article;
```

**2.** Register the article body in `src/data/articles.ts`:

```ts
import myArticle from "./articles/my-article";

const articleContents = [
  // …existing…
  myArticle,
];
```

**3.** Add navigation metadata in `src/data/articles/navigation.ts`:

```ts
export const articleNavigation: Record<string, ArticleNavigation> = {
  // …existing…
  "my-article": {
    topic: "Spacecraft Systems",       // one of ARTICLE_TOPICS
    startHere: false,                   // true puts it in the "Start Here" set
    series: { id: "x", title: "X", part: 2, total: 3 }, // optional
    keyTakeaways: [
      "First takeaway.",
      "Second takeaway.",
    ],
  },
};
```

The `attachNavigation()` step in `articles.ts` merges body + navigation. Forgetting step 3 yields a TS error — navigation is required.

---

## Add A Book

**1.** Create `src/data/books/<slug>.ts`:

```ts
import type { Book } from "./types";

const book: Book = {
  slug: "the-book",                     // URL: /books/the-book
  title: "The Book",
  subtitle: "Optional subtitle",
  author: "Author Name",
  year: "2024",
  description: "Card-level summary.",
  readTime: "12 min",
  tags: ["Leadership"],                 // BOOK_THEMES only
  intro: ["…"],
  sections: [
    { id: "core-idea", label: "01", heading: "Core idea", paragraphs: ["…"] },
  ],
  insight: "Closing one-liner.",
  keyTakeaways: ["…", "…"],
  mentalModelSlugs: ["the-model"],      // links to MentalModel.slug
};

export default book;
```

**2.** Register in `src/data/books.ts`:

```ts
import theBook from "./books/the-book";

export const books = [
  // …existing…
  theBook,
];
```

---

## Add A Mental Model

**1.** Create `src/data/mental-models/<slug>.ts`:

```ts
import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "the-model",                    // URL: /books/models/the-model
  name: "The Model",
  oneLiner: "Compressed essence.",
  description: "One-paragraph framing.",
  tags: ["Leadership"],
  definition:  ["…"],
  whenToUse:   ["…", "…"],
  pitfalls:    ["…"],
  application: "How Kushal uses this in practice.",
  sourceBook: { slug: "the-book", title: "The Book" },  // optional
};

export default model;
```

**2.** Register in `src/data/books.ts`:

```ts
import theModel from "./mental-models/the-model";

export const mentalModels = [
  // …existing…
  theModel,
];
```

**3.** Link from the book by adding the slug to `Book.mentalModelSlugs`. The book page uses `getModelsForBook(slug)` to render linked models.

---

## Add A GitHub Project

Single file. Edit `src/data/github-projects/index.ts` and append an entry:

```ts
{
  slug: "my-repo",
  name: "My Repo",
  repo: "my-repo",
  description: "What it does.",
  url: "https://github.com/kushalmae/my-repo",
  homepage: "https://my-repo.vercel.app",  // optional
  language: "Python",
  tags: ["Aerospace", "Platform"],          // GITHUB_PROJECT_TAGS
  featured: true,                            // optional
  caseStudyId: "spacecraft-telemetry-pipeline", // optional, links back to /work/:id
},
```

No per-item file; no navigation file. Just push.

---

## Quick Sanity Checks Before Committing

- `npm run lint` — catches stray TS/ESLint issues, including unused imports.
- `npm test` — runs Vitest.
- `npm run build` — most reliable check that your content typechecks end-to-end.
- Visit the new URL in `npm run dev` and click around — case studies and articles render TOCs, related links, and series nav, so a missing field is usually visible.

---

## House Style

- Keep `summary`, `description`, and `insight` to one sentence.
- Prefer short bulleted paragraphs over long prose blocks — sections render arrays as separate `<p>`s.
- Imagery in `public/` should be optimized (≤ 200 KB where possible).
- Use existing tags / themes / topics before adding new ones — these enum-like sets are deliberately small.
