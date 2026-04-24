import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { articles } from "@/data/articles";

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

  return (
    <PageLayout title={article.title}>
      <section className="py-24 md:py-40">
        <div className="container max-w-3xl">
          <Reveal>
            <Link
              to="/thinking"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase mb-10 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Thinking
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                {article.date}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="font-mono text-xs text-muted-foreground/50 tracking-wider">
                {article.readTime}
              </span>
            </div>

            <SectionLabel>Essay</SectionLabel>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-3">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {article.subtitle}
            </p>

            <div className="flex flex-wrap gap-1.5 mb-14">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground border border-line px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="h-px bg-line mb-14" />

          <Reveal>
            <div className="space-y-5 mb-16">
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
                  {section.table && (
                    <div className="overflow-x-auto mt-8">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-line">
                            {section.table.headers.map((header, idx) => (
                              <th
                                key={idx}
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
                "{article.insight}"
              </blockquote>
            </div>
          </Reveal>

          <div className="mt-16">
            <Link
              to="/thinking"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} /> Back to Thinking
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ArticlePage;
