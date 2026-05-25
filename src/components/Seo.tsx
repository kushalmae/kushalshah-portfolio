import { Helmet } from "react-helmet-async";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/seo/urls";

export interface SeoProps {
  /** Page-specific title (without the site name suffix). */
  title?: string;
  /** Full title override (skips the " — Kushal Shah" suffix). */
  fullTitle?: string;
  description?: string;
  /** Site-relative path, e.g. "/work/foo". */
  path: string;
  /** Absolute or site-relative image URL for og:image / twitter:image. */
  image?: string;
  /** "website" (default) or "article". */
  type?: "website" | "article";
  /** ISO 8601 publish date for og:article. */
  publishedTime?: string;
  /** Tags for og:article. */
  articleTags?: readonly string[];
  /** Mark this page as noindex. */
  noindex?: boolean;
  /** Inline JSON-LD payloads. Each becomes a separate `<script type="application/ld+json">`. */
  jsonLd?: ReadonlyArray<Record<string, unknown>>;
}

/** Escape "</" so a JSON-LD value containing "</script>" can't close the tag. */
const safeJsonLd = (payload: Record<string, unknown>) =>
  JSON.stringify(payload).replace(/</g, "\\u003c");

const Seo = ({
  title,
  fullTitle,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  articleTags,
  noindex,
  jsonLd,
}: SeoProps) => {
  const resolvedTitle =
    fullTitle ?? (title ? `${title} — ${site.shortTitle}` : site.title);
  const resolvedDescription = description ?? site.description;
  const canonical = absoluteUrl(path);
  const resolvedImage = absoluteUrl(image ?? site.ogImage);

  return (
    <Helmet prioritizeSeoTags>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:alt" content={resolvedTitle} />
      <meta property="og:site_name" content={site.shortTitle} />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {articleTags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:creator" content={site.twitterHandle} />

      {jsonLd?.map((payload, idx) => (
        <script key={idx} type="application/ld+json">
          {safeJsonLd(payload)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
