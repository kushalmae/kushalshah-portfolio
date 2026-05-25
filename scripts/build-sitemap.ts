import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "node:stream";
import { buildAllRoutes } from "./lib/routes";
import { siteUrl } from "./lib/site";

export async function generateSitemap(distDir: string): Promise<number> {
  const routes = buildAllRoutes().filter((r) => !r.noSitemap);

  const links = routes.map((r) => ({
    url: r.path,
    changefreq: r.changefreq,
    priority: r.priority,
    lastmod: r.lastmod,
  }));

  const stream = new SitemapStream({ hostname: siteUrl });
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then(
    (buf) => buf.toString()
  );

  writeFileSync(resolve(distDir, "sitemap.xml"), xml, "utf8");
  return links.length;
}
