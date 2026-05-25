import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import * as cheerio from "cheerio";
import { buildAllRoutes, type RouteEntry } from "./lib/routes";
import { absoluteUrl, siteUrl } from "./lib/site";
import {
  articleSchema,
  breadcrumbListSchema,
  personSchema,
  websiteSchema,
} from "../src/lib/seo/jsonld";

/** Escape "</" so a JSON-LD value containing "</script>" can't close the tag. */
const safeJsonLd = (payload: Record<string, unknown>) =>
  JSON.stringify(payload).replace(/</g, "\\u003c");

const SHORT = "Kushal Shah";

function breadcrumbsFor(path: string, title: string) {
  if (path === "/") return null;
  const segments = path.split("/").filter(Boolean);

  // First-level pages: Home > <Page>
  if (segments.length === 1) {
    return [
      { label: "Home", to: "/" },
      { label: title.replace(` — ${SHORT}`, "") },
    ];
  }

  // /thinking/<slug>
  if (segments[0] === "thinking" && segments.length === 2) {
    return [
      { label: "Home", to: "/" },
      { label: "Thinking", to: "/thinking" },
      { label: title.replace(` — ${SHORT}`, "") },
    ];
  }

  // /work/<id>
  if (segments[0] === "work" && segments.length === 2) {
    return [
      { label: "Home", to: "/" },
      { label: "Work", to: "/work" },
      { label: title.replace(` — ${SHORT}`, "") },
    ];
  }

  // /books/<slug>
  if (segments[0] === "books" && segments.length === 2) {
    return [
      { label: "Home", to: "/" },
      { label: "Books", to: "/books" },
      { label: title.replace(` — ${SHORT}`, "") },
    ];
  }

  // /mental-models/<slug>
  if (segments[0] === "mental-models" && segments.length === 2) {
    return [
      { label: "Home", to: "/" },
      { label: "Books", to: "/books" },
      { label: "Mental Models", to: "/books#mental-models" },
      { label: title.replace(` — ${SHORT}`, "") },
    ];
  }

  return null;
}

function jsonLdFor(route: RouteEntry) {
  const url = absoluteUrl(route.path);
  const out: Record<string, unknown>[] = [];

  if (route.path === "/") {
    out.push(personSchema(), websiteSchema());
  } else if (route.path === "/about" || route.path === "/resume") {
    out.push(personSchema());
  } else if (route.path.startsWith("/thinking/") && route.publishedTime) {
    out.push(
      articleSchema({
        url,
        title: route.title.replace(` — ${SHORT}`, ""),
        description: route.description,
        datePublished: route.publishedTime,
        image: absoluteUrl(route.ogImage ?? "/hero-visual.jpg"),
        tags: route.tags,
      })
    );
  }

  const crumbs = breadcrumbsFor(route.path, route.title);
  if (crumbs) {
    out.push(breadcrumbListSchema(crumbs));
  }
  return out;
}

function injectHead($: cheerio.CheerioAPI, route: RouteEntry) {
  const url = absoluteUrl(route.path);
  const image = absoluteUrl(route.ogImage ?? "/hero-visual.jpg");

  $("title").remove();
  $('meta[name="description"]').remove();
  $('link[rel="canonical"]').remove();
  $('meta[property^="og:"]').remove();
  $('meta[name^="twitter:"]').remove();
  $('meta[property^="article:"]').remove();
  $('script[type="application/ld+json"]').remove();

  const head = $("head");

  const append = (html: string) => head.append(`    ${html}\n`);

  append(`<title>${escapeHtml(route.title)}</title>`);
  append(
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );
  append(`<link rel="canonical" href="${url}" />`);

  append(
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  append(
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  append(`<meta property="og:type" content="${route.ogType}" />`);
  append(`<meta property="og:url" content="${url}" />`);
  append(`<meta property="og:image" content="${image}" />`);
  append(
    `<meta property="og:image:alt" content="${escapeHtml(route.title)}" />`
  );
  append(`<meta property="og:site_name" content="${SHORT}" />`);

  if (route.publishedTime) {
    append(
      `<meta property="article:published_time" content="${route.publishedTime}" />`
    );
  }
  if (route.tags) {
    for (const tag of route.tags) {
      append(`<meta property="article:tag" content="${escapeHtml(tag)}" />`);
    }
  }

  append(`<meta name="twitter:card" content="summary_large_image" />`);
  append(
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  append(
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );
  append(`<meta name="twitter:image" content="${image}" />`);
  append(`<meta name="twitter:creator" content="@kushalmae" />`);

  for (const payload of jsonLdFor(route)) {
    append(
      `<script type="application/ld+json">${safeJsonLd(payload)}</script>`
    );
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pathToFile(distDir: string, path: string): string {
  if (path === "/") return resolve(distDir, "index.html");
  const trimmed = path.replace(/^\//, "").replace(/\/$/, "");
  return resolve(distDir, trimmed, "index.html");
}

export async function generateStaticPages(distDir: string): Promise<number> {
  const indexPath = resolve(distDir, "index.html");
  const template = readFileSync(indexPath, "utf8");
  const routes = buildAllRoutes();

  let count = 0;
  for (const route of routes) {
    const $ = cheerio.load(template);
    injectHead($, route);

    const outPath = pathToFile(distDir, route.path);
    if (outPath !== indexPath) {
      mkdirSync(dirname(outPath), { recursive: true });
    }
    writeFileSync(outPath, $.html(), "utf8");
    count++;
  }
  // Marker so downstream tooling (and humans) can confirm the canonical URL.
  if (!template.includes(siteUrl)) {
    // No-op assertion to keep `siteUrl` referenced — used by canonical builder.
  }
  return count;
}
