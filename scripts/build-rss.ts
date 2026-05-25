import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Feed } from "feed";
import { articles } from "../src/data/articles";
import {
  absoluteUrl,
  siteAuthorEmail,
  siteLinkedin,
  siteName,
  siteUrl,
} from "./lib/site";

/** Build a clean text body from an article's intro + sections. RSS readers
 * vary in how they handle HTML; plain paragraphs separated by blank lines work
 * everywhere and avoid escaping headaches. */
function articleBody(article: (typeof articles)[number]): string {
  const lines: string[] = [];
  lines.push(...article.intro);
  for (const section of article.sections) {
    lines.push("");
    lines.push(`# ${section.heading}`);
    lines.push(...section.paragraphs);
  }
  lines.push("");
  lines.push(`Insight: ${article.insight}`);
  return lines.join("\n\n");
}

function isoDate(loose: string): Date {
  const parsed = new Date(loose);
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

export async function generateRss(distDir: string): Promise<number> {
  const feed = new Feed({
    title: `${siteName} — Thinking`,
    description:
      "Long-form writing on systems, spacecraft engineering, mission operations, and platform architecture.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteName}`,
    updated: new Date(),
    feedLinks: {
      rss2: absoluteUrl("/rss.xml"),
      atom: absoluteUrl("/atom.xml"),
    },
    author: {
      name: siteName,
      email: siteAuthorEmail,
      link: siteLinkedin,
    },
  });

  const sorted = [...articles].sort(
    (a, b) => isoDate(b.date).getTime() - isoDate(a.date).getTime()
  );

  for (const article of sorted) {
    const url = absoluteUrl(`/thinking/${article.slug}`);
    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: articleBody(article),
      author: [
        {
          name: siteName,
          email: siteAuthorEmail,
          link: siteLinkedin,
        },
      ],
      date: isoDate(article.date),
      category: article.tags.map((tag) => ({ name: tag })),
    });
  }

  writeFileSync(resolve(distDir, "rss.xml"), feed.rss2(), "utf8");
  writeFileSync(resolve(distDir, "atom.xml"), feed.atom1(), "utf8");
  return sorted.length;
}
