# 03 · Content Model

All site content is **typed TypeScript objects**. No JSON, no markdown files, no fetch calls.

The pattern is the same everywhere:

```
src/data/<kind>/types.ts          // The TS interfaces
src/data/<kind>/<slug>.ts         // One file per piece of content
src/data/<kind>.ts                // Index: imports each file, re-exports an array
```

When you add content, you create the per-item file and append the import to the index. That's the whole workflow.

---

## The Five Kinds of Content

| Kind | Index | Item dir | Type file |
|------|-------|----------|-----------|
| Case studies | `src/data/case-studies.ts` | `src/data/case-studies/` | `case-studies/types.ts` |
| Articles | `src/data/articles.ts` | `src/data/articles/` | `articles/types.ts` |
| Books | `src/data/books.ts` (re-export) | `src/data/books/` | `books/types.ts` |
| Mental models | `src/data/books.ts` (re-export) | `src/data/mental-models/` | `books/types.ts` |
| GitHub projects | `src/data/github-projects/index.ts` | `src/data/github-projects/` | `github-projects/types.ts` |

---

## Case Studies

```ts
// src/data/case-studies/types.ts
interface CaseStudy {
  id: string;          // matches /work/:id
  label: string;       // short tag shown on cards
  title: string;
  image: string;       // /public asset path
  summary: string;
  featured?: boolean;  // shown on /
  tags: string[];      // filterable on /work
  technologies: string[];
  tldr: { problem: string; solution: string; impact: string };
  metrics: { value: string; label: string }[];
  context:    string[];
  problem:    string[];
  constraints: string[];
  role:       string[];
  approach:   string[];
  solution:   string[];
  impact:     string[];
  insight: string;
  relatedArticle?: { slug: string; label: string };
  githubUrl?: string;
}
```

The `paragraphs[]` shape (context/problem/…/impact) maps directly to the section structure of `CaseStudyPage`. Each array becomes a block.

Indexed in `src/data/case-studies.ts`, which also exports `ALL_TAGS` — the canonical (small, fixed) filter set used by `/work`.

---

## Articles

Articles have a richer shape because they support series, topics, tables, diagrams, and a "Start Here" flag.

```ts
// src/data/articles/types.ts
interface Article {
  slug: string;        // /thinking/:slug
  title: string;
  subtitle: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  intro: string[];
  sections: ArticleSection[];     // ordered body
  featuredWork?: ArticleFeaturedWork[];
  attachment?: ArticleAttachment; // PDF/file download
  insight: string;
  topic: ArticleTopic;            // 5-value enum
  series?: ArticleSeries;         // multi-part series ref
  startHere?: boolean;
  keyTakeaways: string[];
}
```

### Two-layer authoring

Per-article files export `ArticleContent` (body only). Navigation metadata (topic, series, takeaways) lives in `src/data/articles/navigation.ts` and is **merged in** by `attachNavigation(article)` inside `src/data/articles.ts`.

This separates *what the article says* from *where it sits in the index*. Useful when reshuffling topics or series without touching article bodies.

### Series

Series are denormalized: each article records its own `series: { id, title, part, total }`. Helpers `getSeriesArticles(id)` and `getAdjacentInSeries(slug)` provide prev/next links.

---

## Books & Mental Models

Books are long-form notes; mental models are atomic ideas usually extracted from a book.

```ts
interface Book {
  slug: string;            // /books/:slug
  title: string;
  subtitle: string;
  author: string;
  year: string;
  description: string;
  readTime: string;
  tags: BookTheme[];       // "Leadership" | "Learning" | "Strategy" | "Culture"
  intro: string[];
  sections: BookSection[];
  insight: string;
  keyTakeaways: string[];
  mentalModelSlugs: string[];   // links to MentalModel.slug
}

interface MentalModel {
  slug: string;            // /mental-models/:slug
  name: string;
  oneLiner: string;
  description: string;
  tags: BookTheme[];
  definition: string[];
  whenToUse: string[];
  pitfalls: string[];
  application: string;
  sourceBook?: { slug: string; title: string };
}
```

Both are indexed together in `src/data/books.ts`, which also exports:

- `BOOK_THEMES` — the four-value filter set.
- `getBookBySlug` / `getMentalModelBySlug`
- `getModelsForBook(bookSlug)` — joins via `mentalModelSlugs`.

---

## GitHub Projects

Lighter shape — each entry is a card, optionally linked to a case study.

```ts
interface GitHubProject {
  slug: string;
  name: string;
  repo: string;
  description: string;
  url: string;             // github.com/...
  homepage?: string;       // optional live demo
  language: string;
  tags: GitHubProjectTag[]; // "Aerospace" | "Platform" | "AI" | "Automation" | "Web"
  featured?: boolean;      // appears in featured slice
  caseStudyId?: string;    // links back to /work/:id
}
```

All defined in a single file, `src/data/github-projects/index.ts`. No per-item file.

---

## Why This Shape

- **Typechecked content.** Renaming a field is a compiler error, not a runtime surprise.
- **No runtime resolution.** Imports are static — bundler tree-shakes unused content.
- **Authoring is editing TS.** No template syntax to learn, full editor tooling (autocomplete, jump-to-def, find-references) works on content.
- **One file per item.** Diffs are small, content moves cleanly through git.
