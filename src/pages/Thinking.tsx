import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";

const articles = [
  {
    slug: "satellite-engineering-budgets",
    title: "The Hidden Architecture of Satellites",
    description:
      "Every gram, watt, and arc-second is allocated before a satellite ever leaves the ground. Missions don't fail from a single catastrophe — they fail from budget violations that cascade through interconnected systems.",
    date: "Apr 2025",
  },
  {
    title: "Why Systems Architects Think Differently",
    description:
      "On the difference between solving problems and designing the structure that prevents them.",
    date: "Coming Soon",
  },
  {
    title: "Software as Leverage in Hardware-Defined Organizations",
    description:
      "How software thinking transforms engineering teams that have historically been hardware-first.",
    date: "Coming Soon",
  },
  {
    title: "Architecture in High-Stakes Environments",
    description:
      "Lessons from aerospace on designing systems where failure isn't an option — and how it applies everywhere.",
    date: "Coming Soon",
  },
  {
    title: "The Gap Between Operational Reality and Architecture Theory",
    description: "Why most architecture diagrams lie, and what to do about it.",
    date: "Coming Soon",
  },
  {
    title: "Scaling Complex Technical Organizations",
    description:
      "On the structural patterns that allow technical teams to grow without losing coherence.",
    date: "Coming Soon",
  },
];

const Thinking = () => (
  <PageLayout title="Thinking">
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Thinking</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Writing on systems, strategy, and structure.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Essays on technical architecture, systems design, and the
            intersection of engineering leadership and software leverage.
          </p>
          <p className="text-sm text-muted-foreground/60 mb-16">
            More essays in progress — publishing soon.
          </p>
        </Reveal>

        <div className="space-y-0">
          {articles.map((article, i) => (
            <Reveal key={article.title} delay={i * 80}>
              {"slug" in article && article.slug ? (
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
              ) : (
                <div className="group border-t border-line py-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                    <span className="font-mono text-xs text-muted-foreground/50 tracking-wider w-28 shrink-0 mt-1">
                      {article.date}
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-foreground/60 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/60">
                        {article.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>

        <Reveal delay={articles.length * 80 + 80}>
          <div className="mt-12 pt-2">
            <p className="text-sm text-muted-foreground">
              To be notified when essays are published, reach out via the{" "}
              <a
                href="/contact"
                className="text-foreground hover:text-primary underline underline-offset-4 transition-colors"
              >
                contact page
              </a>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default Thinking;
