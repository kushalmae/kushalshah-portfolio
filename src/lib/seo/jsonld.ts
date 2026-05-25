import { site } from "@/config/site";
import { absoluteUrl } from "./urls";

/** Strongly typed structured-data builders. Output is JSON-serializable and meant to be
 * stringified into a single `<script type="application/ld+json">` tag per page. */

type JsonLd = Record<string, unknown>;

export function personSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.siteUrl,
    image: absoluteUrl(site.ogImage),
    jobTitle: site.jobTitle,
    description: site.longDescription,
    email: `mailto:${site.email}`,
    sameAs: [site.linkedin, site.github],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  };
}

export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.title,
    url: site.siteUrl,
    description: site.description,
    author: { "@type": "Person", name: site.name, url: site.siteUrl },
  };
}

export interface ArticleSchemaInput {
  url: string;
  title: string;
  description: string;
  /** Free-form date string (e.g. "May 2026"). We parse it best-effort into ISO 8601. */
  datePublished: string;
  image: string;
  tags?: readonly string[];
}

/** Best-effort parser for the `date: "May 2026"` shape used in article data.
 * Returns an ISO date string at the first day of the parsed month, or undefined
 * if the input can't be parsed — in which case we omit the field rather than
 * emit an invalid date. */
export function parseLooseDateToIso(input: string): string | undefined {
  const parsed = new Date(input);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString().slice(0, 10);
}

export function articleSchema(input: ArticleSchemaInput): JsonLd {
  const iso = parseLooseDateToIso(input.datePublished);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    image: input.image,
    ...(iso ? { datePublished: iso, dateModified: iso } : {}),
    ...(input.tags && input.tags.length > 0 ? { keywords: input.tags.join(", ") } : {}),
    author: {
      "@type": "Person",
      name: site.name,
      url: site.siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: site.name,
      url: site.siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": input.url,
    },
  };
}

export interface BreadcrumbSchemaItem {
  label: string;
  /** Site-relative path or absolute URL. */
  to?: string;
}

export function breadcrumbListSchema(items: BreadcrumbSchemaItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.to ? { item: absoluteUrl(item.to) } : {}),
    })),
  };
}
