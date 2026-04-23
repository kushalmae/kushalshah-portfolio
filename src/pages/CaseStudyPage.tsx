import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import CaseStudyTOC from "@/components/CaseStudyTOC";
import { caseStudies } from "@/data/case-studies";

const CaseStudyPage = () => {
  const { id } = useParams<{ id: string }>();
  const index = caseStudies.findIndex((s) => s.id === id);
  const study = caseStudies[index];
  const prev = index > 0 ? caseStudies[index - 1] : null;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : null;

  if (!study) {
    return (
      <PageLayout title="Not Found">
        <div className="container py-40 text-center">
          <h1 className="text-2xl text-foreground mb-4">Case study not found.</h1>
          <Link to="/work" className="text-primary hover:underline">Back to Work</Link>
        </div>
      </PageLayout>
    );
  }

  const sections = [
    { id: "context", label: "Context", value: study.context },
    { id: "problem", label: "Problem", value: study.problem },
    { id: "constraints", label: "Constraints", value: study.constraints },
    { id: "role", label: "My Role", value: study.role },
    { id: "approach", label: "Approach", value: study.approach },
    { id: "solution", label: "Solution", value: study.solution },
    { id: "impact", label: "Impact", value: study.impact },
  ];

  const tocItems = [
    { id: "summary", label: "Overview" },
    { id: "tldr", label: "TL;DR" },
    ...sections.map((s) => ({ id: s.id, label: s.label })),
    ...(study.technologies.length > 0 ? [{ id: "tech", label: "Tech" }] : []),
    { id: "insight", label: "Insight" },
  ];

  return (
    <PageLayout title={study.title}>
      <CaseStudyTOC items={tocItems} />

      {/* Hero */}
      <div className="relative">
        <div className="w-full h-[28vh] md:h-[34vh] overflow-hidden">
          <img
            src={study.image}
            alt=""
            className="w-full h-full object-cover opacity-60"
            width={1200}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container max-w-4xl pb-6 md:pb-8">
            <Link to="/work" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase mb-3 transition-colors">
              <ArrowLeft size={14} /> Back to Work
            </Link>
            <SectionLabel>{study.label}</SectionLabel>
            <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-foreground">
              {study.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Summary + TL;DR */}
      <section id="summary" className="pt-8 md:pt-10 pb-6 scroll-mt-24">
        <div className="container max-w-4xl">
          <Reveal>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {study.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section id="tldr" className="pb-10 md:pb-12 scroll-mt-24">
        <div className="container max-w-4xl">
          <Reveal>
            <div className="bg-card border border-line rounded-lg p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary">
                  TL;DR
                </span>
                <div className="h-px bg-line flex-1" />
                {study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground border border-line px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-5">
                {(["problem", "solution", "impact"] as const).map((key) => (
                  <div key={key}>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                      {key}
                    </p>
                    <p className="text-sm text-foreground/85 leading-snug">
                      {study.tldr[key]}
                    </p>
                  </div>
                ))}
              </div>

              {study.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-line">
                  {study.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-base md:text-lg font-semibold text-foreground">{m.value}</p>
                      <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container max-w-4xl"><div className="h-px bg-line" /></div>

      {/* Sections */}
      <section className="py-10 md:py-14">
        <div className="container max-w-4xl">
          <div className="space-y-8 md:space-y-9">
            {sections.map(({ id, label, value }, i) => (
              <Reveal key={label} delay={i * 40}>
                <div id={id} className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-10 scroll-mt-24">
                  <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground pt-1">
                    {label}
                  </h3>
                  <ul className="space-y-1.5">
                    {value.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-sm md:text-[15px] text-foreground/85 leading-snug">
                        <span aria-hidden className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}

            {study.technologies.length > 0 && (
              <Reveal delay={sections.length * 40}>
                <div id="tech" className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-10 scroll-mt-24">
                  <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-muted-foreground pt-1">
                    Tech & Methods
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {study.technologies.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] tracking-wide text-foreground/85 bg-card border border-line px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <div className="container max-w-4xl"><div className="h-px bg-line" /></div>

      {/* Insight */}
      <section id="insight" className="py-10 md:py-14 scroll-mt-24">
        <div className="container max-w-4xl">
          <Reveal>
            <div className="md:ml-[160px] md:pl-10">
              <SectionLabel>What It Reveals</SectionLabel>
              <blockquote className="text-lg md:text-xl font-medium text-primary leading-relaxed italic">
                "{study.insight}"
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container max-w-4xl"><div className="h-px bg-line" /></div>

      {/* Navigation */}
      <section className="py-8 md:py-10">
        <div className="container max-w-4xl flex justify-between">
          {prev ? (
            <Link to={`/work/${prev.id}`} className="group flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <div>
                <p className="font-mono text-xs tracking-wider uppercase mb-1">Previous</p>
                <p className="text-sm font-medium text-foreground">{prev.title}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link to={`/work/${next.id}`} className="group flex items-center gap-3 text-right text-muted-foreground hover:text-foreground transition-colors">
              <div>
                <p className="font-mono text-xs tracking-wider uppercase mb-1">Next</p>
                <p className="text-sm font-medium text-foreground">{next.title}</p>
              </div>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </section>
    </PageLayout>
  );
};

export default CaseStudyPage;
