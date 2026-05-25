/** Single source of truth for the list of public routes the prerenderer and
 * sitemap generator should walk. Dynamic routes (articles, case studies, books,
 * mental models) are expanded at build time from the content modules; this file
 * only lists the static ones. */

export interface StaticRoute {
  /** Path matched by react-router. Always starts with "/". */
  path: string;
  /** Sitemap changefreq hint. */
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Sitemap priority hint, 0.0 – 1.0. */
  priority: number;
  /** Set true to keep the URL out of the sitemap (but still prerender it). */
  noSitemap?: boolean;
}

export const STATIC_ROUTES: StaticRoute[] = [
  { path: "/", changefreq: "monthly", priority: 1.0 },
  { path: "/about", changefreq: "monthly", priority: 0.9 },
  { path: "/work", changefreq: "monthly", priority: 0.9 },
  { path: "/code", changefreq: "monthly", priority: 0.8 },
  { path: "/thinking", changefreq: "weekly", priority: 0.9 },
  { path: "/books", changefreq: "monthly", priority: 0.7 },
  { path: "/resume", changefreq: "monthly", priority: 0.9 },
  { path: "/now", changefreq: "monthly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.7 },
];
