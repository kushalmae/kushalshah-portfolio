/** Enumerates every public URL on the site. Used by the sitemap and prerender
 * steps. Dynamic routes are expanded from the typed content modules so the
 * build output stays in sync with what the app actually renders. */

import { articles } from "../../src/data/articles";
import { caseStudies } from "../../src/data/case-studies";
import { books, mentalModels } from "../../src/data/books";
import { STATIC_ROUTES, type StaticRoute } from "../../src/config/routes";

export interface RouteEntry {
  /** Site-relative path, always starts with "/". */
  path: string;
  /** Last-modified ISO date if known. */
  lastmod?: string;
  changefreq: StaticRoute["changefreq"];
  priority: number;
  /** Page title used in `<title>` and OG `og:title`. */
  title: string;
  /** Page description used in meta description and OG. */
  description: string;
  /** OG image URL, site-relative or absolute. */
  ogImage?: string;
  /** "website" for index pages, "article" for content pages. */
  ogType: "website" | "article";
  /** Optional published date for article OG (`article:published_time`). */
  publishedTime?: string;
  /** Optional tags for `article:tag`. */
  tags?: readonly string[];
  /** Set true to skip the sitemap (still prerendered). */
  noSitemap?: boolean;
}

const SITE_TITLE = "Kushal Shah — Systems Architect & Technical Strategist";
const SITE_DESCRIPTION =
  "I lead complex technical systems from ambiguity to execution. Systems architecture, technical strategy, and cross-functional leadership.";
const SHORT = "Kushal Shah";

/** Best-effort: turn "May 2026" or similar into an ISO date string. */
function looseDateToIso(input: string): string | undefined {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

const STATIC_META: Record<
  string,
  { title: string; description: string; ogType?: "website" | "article" }
> = {
  "/": {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  "/about": {
    title: `About — ${SHORT}`,
    description:
      "Aerospace systems leader spanning mission operations, OPIR/SBIRS payload systems, mission algorithms, and software platforms. Background, beliefs, and how I work.",
  },
  "/work": {
    title: `Work — ${SHORT}`,
    description:
      "Selected case studies in systems thinking — aerospace, defense, mission operations, software platforms, and AI.",
  },
  "/code": {
    title: `Code — ${SHORT}`,
    description:
      "Satellite operations platforms, telemetry pipelines, automation tooling, and AI workflows — GitHub projects you can inspect.",
  },
  "/thinking": {
    title: `Thinking — ${SHORT}`,
    description:
      "Essays on systems thinking, spacecraft engineering, mission operations, communications protocols, and platform architecture.",
  },
  "/books": {
    title: `Books & Mental Models — ${SHORT}`,
    description:
      "Book summaries and extracted mental models — leadership, learning, strategy, and culture. The frameworks I actually apply.",
  },
  "/speaking": {
    title: `Speaking — ${SHORT}`,
    description:
      "Talks and topics. Available for engineering org tech talks, hiring conferences, and aerospace systems forums.",
  },
  "/resume": {
    title: `Resume — ${SHORT}`,
    description:
      "Aerospace systems leadership and technical execution — Rocket Lab, Northrop Grumman, OPIR/SBIRS, PWSA. Experience, education, certifications, and skills.",
  },
  "/contact": {
    title: `Contact — ${SHORT}`,
    description:
      "Open to technical program leadership, systems engineering management, and select advisory work. LinkedIn is the fastest channel.",
  },
};

export function buildAllRoutes(): RouteEntry[] {
  const out: RouteEntry[] = [];

  for (const r of STATIC_ROUTES) {
    const meta = STATIC_META[r.path];
    if (!meta) continue;
    out.push({
      path: r.path,
      changefreq: r.changefreq,
      priority: r.priority,
      title: meta.title,
      description: meta.description,
      ogType: meta.ogType ?? "website",
      noSitemap: r.noSitemap,
    });
  }

  for (const article of articles) {
    out.push({
      path: `/thinking/${article.slug}`,
      changefreq: "monthly",
      priority: 0.8,
      title: `${article.title} — ${SHORT}`,
      description: article.description,
      ogImage: `/og/${article.slug}.png`,
      ogType: "article",
      publishedTime: looseDateToIso(article.date),
      tags: article.tags,
      lastmod: looseDateToIso(article.date),
    });
  }

  for (const study of caseStudies) {
    out.push({
      path: `/work/${study.id}`,
      changefreq: "monthly",
      priority: 0.8,
      title: `${study.title} — ${SHORT}`,
      description: study.summary,
      ogImage: study.image,
      ogType: "article",
    });
  }

  for (const book of books) {
    out.push({
      path: `/books/${book.slug}`,
      changefreq: "monthly",
      priority: 0.6,
      title: `${book.title} — ${SHORT}`,
      description: book.description,
      ogType: "article",
    });
  }

  for (const model of mentalModels) {
    out.push({
      path: `/mental-models/${model.slug}`,
      changefreq: "monthly",
      priority: 0.5,
      title: `${model.name} — ${SHORT}`,
      description: model.oneLiner,
      ogType: "article",
    });
  }

  return out;
}
