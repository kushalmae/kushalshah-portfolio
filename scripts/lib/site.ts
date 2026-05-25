/** Site-config helpers for the postbuild scripts. Mirrors a subset of
 * `src/config/site.ts` but reads from `process.env` since the build scripts
 * run outside Vite and don't have `import.meta.env`. */

const PROD_SITE_URL = "https://kushalshah.vercel.app";

export const siteUrl = (
  process.env.VITE_SITE_URL || PROD_SITE_URL
).replace(/\/+$/, "");

export const siteName = "Kushal Shah";
export const siteAuthorEmail = "kushalshah.kai@gmail.com";
export const siteLinkedin = "https://www.linkedin.com/in/kushalmae/";
export const siteGithub = "https://github.com/kushalmae";

export function absoluteUrl(path: string): string {
  if (!path) return siteUrl;
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized}`;
}
