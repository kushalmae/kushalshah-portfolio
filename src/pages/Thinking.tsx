import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { articles } from "@/data/articles";

const Thinking = () => (
  <PageLayout title="Thinking">
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Thinking</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Writing on systems, strategy, and structure.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-16">
            Essays on technical architecture, systems design, and the
            intersection of engineering leadership and software leverage.
          </p>
        </Reveal>

        <div className="space-y-0">
          {articles.map((article, i) => (
            <Reveal key={article.slug} delay={i * 80}>
              <Link
                to={`/thinking/${article.slug}`}
                className="group block border-t border-line py-8 hover:no-underline"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                  <span className="font-mono text-xs text-muted-foreground/50 tracking-wider w-28 shrink-0 mt-1">
                    {article.date}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground/80 mb-2 group-hover:text-foreground transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/60">
                      {article.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Thinking;
