/** Orchestrates everything that should happen after `vite build`:
 *  1. Generate per-article OG images (PNG via satori + resvg).
 *  2. Generate sitemap.xml.
 *  3. Generate rss.xml and atom.xml.
 *  4. Inject per-route meta + JSON-LD into static index.html copies so crawlers
 *     and social unfurlers see the right head without executing JS.
 *
 * Run via `vite-node scripts/postbuild.ts`. vite-node gives us Vite's asset
 * pipeline so `@/assets/*.jpg` imports inside the data modules resolve.
 */

import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { generateOgImages } from "./build-og-images";
import { generateSitemap } from "./build-sitemap";
import { generateRss } from "./build-rss";
import { generateStaticPages } from "./build-static-pages";

const distDir = resolve(process.cwd(), "dist");

async function main() {
  if (!existsSync(resolve(distDir, "index.html"))) {
    console.error(
      `[postbuild] ${distDir}/index.html not found — did 'vite build' run first?`
    );
    process.exit(1);
  }

  const start = Date.now();
  console.log("[postbuild] Generating per-article OG images…");
  const ogCount = await generateOgImages(distDir);
  console.log(`[postbuild]   ${ogCount} OG images written to dist/og/`);

  console.log("[postbuild] Generating sitemap.xml…");
  const sitemapCount = await generateSitemap(distDir);
  console.log(`[postbuild]   ${sitemapCount} urls in dist/sitemap.xml`);

  console.log("[postbuild] Generating RSS + Atom feeds…");
  const rssCount = await generateRss(distDir);
  console.log(
    `[postbuild]   ${rssCount} items in dist/rss.xml and dist/atom.xml`
  );

  console.log("[postbuild] Writing per-route static HTML…");
  const pageCount = await generateStaticPages(distDir);
  console.log(`[postbuild]   ${pageCount} prerendered HTML files in dist/`);

  console.log(
    `[postbuild] Done in ${((Date.now() - start) / 1000).toFixed(2)}s`
  );
}

main().catch((err) => {
  console.error("[postbuild] Failed:", err);
  process.exit(1);
});
