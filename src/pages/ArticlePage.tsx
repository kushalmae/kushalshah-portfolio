import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReadingProgress from "@/components/ReadingProgress";
import ShareLinks from "@/components/ShareLinks";
import { ArticleDiagram } from "@/components/ArticleDiagram";
import ArticleTableOfContents from "@/components/ArticleTableOfContents";
import {
  articles,
  getAdjacentInSeries,
  getSeriesArticles,
} from "@/data/articles";
import {
  articleSchema,
  breadcrumbListSchema,
  parseLooseDateToIso,
} from "@/lib/seo/jsonld";
import { absoluteUrl, articleOgImageUrl } from "@/lib/seo/urls";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PageLayout title="Not Found">
        <div className="container py-40 text-center">
          <h1 className="text-2xl text-foreground mb-4">Article not found.</h1>
          <Link to="/thinking" className="text-primary hover:underline">
            Back to Thinking
          </Link>
        </div>
      </PageLayout>
    );
  }

  const { prev, next } = getAdjacentInSeries(articles, article);
  const seriesArticles = article.series
    ? getSeriesArticles(articles, article.series.id)
    : [];

  const path = `/thinking/${article.slug}`;
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Thinking", to: "/thinking" },
    ...(article.series
      ? [
          {
            label: article.series.title,
            to: `/thinking?series=${article.series.id}`,
          },
        ]
      : []),
    { label: article.title },
  ];

  return (
    <PageLayout title={article.title}>
      <Seo
        title={article.title}
        description={article.description}
        path={path}
        type="article"
        image={articleOgImageUrl(article.slug)}
        publishedTime={parseLooseDateToIso(article.date)}
        articleTags={article.tags}
        jsonLd={[
          articleSchema({
            url: absoluteUrl(path),
            title: article.title,
            description: article.description,
            datePublished: article.date,
            image: articleOgImageUrl(article.slug),
            tags: article.tags,
          }),
          breadcrumbListSchema(breadcrumbItems),
        ]}
      />
      <ReadingProgress />
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <Reveal>
            <Breadcrumbs items={breadcrumbItems} />

            <Link
              to="/thinking"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase mb-8 transition-colors"
            >
              <ArrowLeft size={14} aria-hidden /> Back to Thinking
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                {article.date}
              </span>
              <span className="text-muted-foreground/30" aria-hidden>
                ·
              </span>
              <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                {article.readTime}
              </span>
              {article.series && (
                <>
                  <span className="text-muted-foreground/30" aria-hidden>
                    ·
                  </span>
                  <Link
                    to={`/thinking?series=${article.series.id}`}
                    className="font-mono text-xs text-primary tracking-wider hover:text-primary/80 transition-colors"
                  >
                    {article.series.title} — Part {article.series.part} of{" "}
                    {article.series.total}
                  </Link>
                </>
              )}
            </div>

            <SectionLabel>Essay</SectionLabel>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              {article.subtitle}
            </p>

            {article.keyTakeaways.length > 0 && (
              <aside
                aria-label="Key takeaways"
                className="mb-8 max-w-3xl border border-line rounded-sm p-5 bg-card/30"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary mb-3">
                  In brief
                </p>
                <ul className="space-y-2">
                  {article.keyTakeaways.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <span
                        className="mt-[7px] w-1 h-1 rounded-full bg-primary/50 shrink-0"
                        aria-hidden
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            <div
              className={`flex flex-wrap gap-1.5 ${article.attachment ? "mb-8" : "mb-10"}`}
            >
              <Link
                to={`/thinking?topic=${encodeURIComponent(article.topic)}`}
                className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground border border-line px-2 py-0.5 rounded hover:text-foreground hover:border-muted-foreground/40 transition-colors"
              >
                {article.topic}
              </Link>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/thinking?tag=${encodeURIComponent(tag)}`}
                  className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground border border-line px-2 py-0.5 rounded hover:text-foreground hover:border-muted-foreground/40 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {article.attachment && (
              <Button variant="subtle" size="default" className="mb-10 gap-2" asChild>
                <a
                  href={article.attachment.url}
                  download={article.attachment.downloadFilename}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={14} aria-hidden />
                  {article.attachment.label}
                </a>
              </Button>
            )}
          </Reveal>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <div className="h-px bg-line mb-10 lg:mb-14" />

              <Reveal>
                <div className="space-y-5 mb-12 lg:mb-16">
                  {article.intro.map((para, i) => (
                    <p
                      key={i}
                      className="text-base md:text-[17px] text-foreground/80 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              <ArticleTableOfContents
                sections={article.sections}
                className="lg:hidden"
              />

              <div className="space-y-16">
                {article.sections.map((section, i) => (
                  <Reveal key={section.id} delay={i * 40}>
                    <div id={section.id} className="scroll-mt-24">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                        {section.label}
                      </span>
                      <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mt-1 mb-6">
                        {section.heading}
                      </h2>
                      <div className="space-y-4">
                        {section.paragraphs.map((para, j) => (
                          <p
                            key={j}
                            className="text-base md:text-[17px] text-foreground/80 leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                      {section.diagramId && (
                        <ArticleDiagram id={section.diagramId} />
                      )}
                      {section.relatedArticle && (
                        <div className="mt-8 pt-6 border-t border-line/40">
                          <Link
                            to={`/thinking/${section.relatedArticle.slug}`}
                            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-primary hover:text-primary/70 transition-colors"
                          >
                            {section.relatedArticle.label}
                            <ArrowRight size={12} aria-hidden />
                          </Link>
                        </div>
                      )}
                      {section.table && (
                        <div className="overflow-x-auto mt-8">
                          <table className="w-full text-sm border-collapse">
                            <caption className="sr-only">
                              {section.heading} data
                            </caption>
                            <thead>
                              <tr className="border-b border-line">
                                {section.table.headers.map((header, idx) => (
                                  <th
                                    key={idx}
                                    scope="col"
                                    className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground text-left py-3 pr-8 first:pl-0 whitespace-nowrap"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows.map((row, rowIdx) => (
                                <tr
                                  key={rowIdx}
                                  className="border-b border-line/40 hover:bg-muted/10 transition-colors"
                                >
                                  {row.map((cell, cellIdx) => (
                                    <td
                                      key={cellIdx}
                                      className={`py-3 pr-8 first:pl-0 align-top leading-relaxed text-foreground/75 ${
                                        cellIdx === 0
                                          ? "font-medium text-foreground whitespace-nowrap"
                                          : ""
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>

              {article.featuredWork && article.featuredWork.length > 0 && (
                <>
                  <div className="h-px bg-line my-16" />
                  <Reveal>
                    <div>
                      <SectionLabel>Featured In Work</SectionLabel>
                      <p className="text-sm text-muted-foreground mt-2 mb-8">
                        Where these concepts were applied in practice.
                      </p>
                      <div className="space-y-5">
                        {article.featuredWork.map((item, i) => (
                          <div
                            key={i}
                            className="border border-line rounded-sm p-5 md:p-6 bg-card/40"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                              <div>
                                <h3 className="text-base font-semibold text-foreground leading-snug">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {item.org} · {item.year}
                                </p>
                              </div>
                              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground border border-line px-2 py-0.5 rounded shrink-0">
                                {item.type}
                              </span>
                            </div>
                            <div className="mb-4">
                              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-primary">
                                Role
                              </span>
                              <p className="text-sm text-foreground/80 mt-0.5">{item.role}</p>
                            </div>
                            <ul className="space-y-2">
                              {item.highlights.map((h, j) => (
                                <li key={j} className="flex items-start gap-2.5">
                                  <span className="mt-[7px] w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                                  <span className="text-sm text-foreground/75 leading-relaxed">
                                    {h}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                </>
              )}

              <div className="h-px bg-line my-16" />

              <Reveal>
                <div>
                  <SectionLabel>What It Reveals</SectionLabel>
                  <blockquote className="text-lg md:text-xl font-medium text-primary leading-relaxed italic mt-4">
                    &ldquo;{article.insight}&rdquo;
                  </blockquote>
                </div>
              </Reveal>

              <div className="h-px bg-line my-12" />

              <ShareLinks path={path} title={article.title} />

              {(prev || next) && (
                <nav
                  aria-label="Series navigation"
                  className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                  {prev ? (
                    <Link
                      to={`/thinking/${prev.slug}`}
                      className="group border border-line rounded-sm p-4 hover:border-muted-foreground/30 transition-colors"
                    >
                      <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
                        Previous
                      </span>
                      <p className="text-sm font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                        {prev.title}
                      </p>
                    </Link>
                  ) : (
                    <div />
                  )}
                  {next ? (
                    <Link
                      to={`/thinking/${next.slug}`}
                      className="group border border-line rounded-sm p-4 hover:border-muted-foreground/30 transition-colors sm:text-right"
                    >
                      <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground">
                        Next
                      </span>
                      <p className="text-sm font-medium text-foreground mt-1 group-hover:text-primary transition-colors">
                        {next.title}
                      </p>
                    </Link>
                  ) : null}
                </nav>
              )}

              {seriesArticles.length > 1 && (
                <div className="mt-10 border border-line rounded-sm p-5 bg-card/20">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                    {article.series?.title} series
                  </p>
                  <ol className="space-y-2">
                    {seriesArticles.map((part) => (
                      <li key={part.slug}>
                        <Link
                          to={`/thinking/${part.slug}`}
                          className={`text-sm transition-colors ${
                            part.slug === article.slug
                              ? "text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          aria-current={part.slug === article.slug ? "page" : undefined}
                        >
                          Part {part.series?.part}: {part.title}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              <div className="mt-14">
                <Link
                  to="/thinking"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} aria-hidden /> Back to Thinking
                </Link>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ArticleTableOfContents sections={article.sections} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ArticlePage;
