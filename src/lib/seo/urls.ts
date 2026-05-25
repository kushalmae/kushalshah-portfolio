import { site } from "@/config/site";

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  if (!path) return site.siteUrl;
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${site.siteUrl}${normalized}`;
}

/** Build the OG image URL for a given article slug. Falls back to the site OG image. */
export function articleOgImageUrl(slug?: string): string {
  if (slug) return absoluteUrl(`/og/${slug}.png`);
  return absoluteUrl(site.ogImage);
}
