import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ArticleTableOfContents from "@/components/ArticleTableOfContents";
import MentalModelCard from "@/components/MentalModelCard";
import ThemeTag from "@/components/ThemeTag";
import { getBookBySlug, getModelsForBook } from "@/data/books";

const BookPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const book = slug ? getBookBySlug(slug) : undefined;
  const relatedModels = slug ? getModelsForBook(slug) : [];

  if (!book) {
    return (
      <PageLayout title="Not Found">
        <div className="container py-40 text-center">
          <h1 className="text-2xl text-foreground mb-4">Book not found.</h1>
          <Link to="/books" className="text-primary hover:underline">
            Back to Books
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={book.title}>
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                <li>
                  <Link to="/books" className="hover:text-foreground transition-colors">
                    Books
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight size={12} className="opacity-50" />
                </li>
                <li className="text-foreground/80 truncate max-w-[min(100%,20rem)]" aria-current="page">
                  {book.title}
                </li>
              </ol>
            </nav>

            <Link
              to="/books"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase mb-8 transition-colors"
            >
              <ArrowLeft size={14} aria-hidden /> Back to Books
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                {book.year}
              </span>
              <span className="text-muted-foreground/30" aria-hidden>
                ·
              </span>
              <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                {book.readTime}
              </span>
              <span className="text-muted-foreground/30" aria-hidden>
                ·
              </span>
              <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                {book.author}
              </span>
            </div>

            <SectionLabel>Book Summary</SectionLabel>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              {book.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-3xl">
              {book.subtitle}
            </p>

            {book.keyTakeaways.length > 0 && (
              <aside
                aria-label="Key takeaways"
                className="mb-8 max-w-3xl border border-line rounded-sm p-5 bg-card/30"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary mb-3">
                  In brief
                </p>
                <ul className="space-y-2">
                  {book.keyTakeaways.map((point) => (
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

            <div className="flex flex-wrap gap-0.5 mb-10" aria-label="Themes">
              {book.tags.map((tag) => (
                <ThemeTag key={tag} tag={tag} />
              ))}
            </div>
          </Reveal>

          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <div className="h-px bg-line mb-10 lg:mb-14" />

              <Reveal>
                <div className="space-y-5 mb-12 lg:mb-16">
                  {book.intro.map((para, i) => (
                    <p
                      key={i}
                      className="text-base md:text-[17px] text-foreground/80 leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              <ArticleTableOfContents sections={book.sections} className="lg:hidden" />

              <div className="space-y-16">
                {book.sections.map((section, i) => (
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
                      {section.table && (
                        <div className="overflow-x-auto mt-8">
                          <table className="w-full text-sm border-collapse">
                            <caption className="sr-only">{section.heading} data</caption>
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

              <div className="h-px bg-line my-16" />

              <Reveal>
                <div>
                  <SectionLabel>What It Reveals</SectionLabel>
                  <blockquote className="text-lg md:text-xl font-medium text-primary leading-relaxed italic mt-4">
                    &ldquo;{book.insight}&rdquo;
                  </blockquote>
                </div>
              </Reveal>

              {relatedModels.length > 0 && (
                <div className="mt-16">
                  <Reveal>
                    <SectionLabel>Mental models from this book</SectionLabel>
                    <p className="text-sm text-muted-foreground mt-2 mb-6 max-w-2xl">
                      Extracted frameworks you can apply independently of the summary.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {relatedModels.map((model) => (
                        <MentalModelCard key={model.slug} model={model} />
                      ))}
                    </div>
                  </Reveal>
                </div>
              )}

              <div className="mt-14">
                <Link
                  to="/books"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} aria-hidden /> Back to Books
                </Link>
              </div>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ArticleTableOfContents sections={book.sections} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BookPage;
