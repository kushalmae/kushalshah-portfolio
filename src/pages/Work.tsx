import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { caseStudies, ALL_TAGS } from "@/data/case-studies";
import { cn } from "@/lib/utils";

const Work = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(
    () => (activeTag ? caseStudies.filter((s) => s.tags.includes(activeTag)) : caseStudies),
    [activeTag]
  );

  return (
    <PageLayout title="Work">
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <Reveal>
            <SectionLabel>Selected Work</SectionLabel>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
              Case studies in systems thinking.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Each project: a different complex problem. The connection — map the system, find the leverage point, design for constraints, ship with clarity.
            </p>
          </Reveal>

          {/* Tag filter */}
          <Reveal delay={80}>
            <div className="flex flex-wrap items-center gap-1.5 mb-10">
              <button
                onClick={() => setActiveTag(null)}
                className={cn(
                  "font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors",
                  activeTag === null
                    ? "bg-foreground text-background border-foreground"
                    : "border-line text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                )}
              >
                All
              </button>
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors",
                    activeTag === tag
                      ? "bg-foreground text-background border-foreground"
                      : "border-line text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>

          {filtered.length > 0 ? (
            <div key={activeTag} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 animate-fade-in">
              {filtered.map((study, i) => (
                <Reveal key={study.id} delay={i * 40}>
                  <Link
                    to={`/work/${study.id}`}
                    className="group flex flex-col bg-card border border-line rounded-lg overflow-hidden hover:border-muted-foreground/30 transition-all duration-300 h-full"
                  >
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={study.image}
                        alt=""
                        loading="lazy"
                        width={800}
                        height={450}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-[1.04] transition-all duration-500"
                      />
                      {study.featured && (
                        <span className="absolute top-1.5 right-1.5 font-mono text-[9px] tracking-wider uppercase text-primary bg-background/80 backdrop-blur border border-primary/30 px-1.5 py-0.5 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      {study.technologies && study.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {study.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground bg-muted/40 border border-line px-1.5 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {study.technologies.length > 3 && (
                            <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground/70 px-1 py-0.5">
                              +{study.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <span className="font-mono text-[9px] text-muted-foreground tracking-wider uppercase mb-1">
                        {study.label}
                      </span>
                      <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
                        {study.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-snug line-clamp-2 mb-3">
                        {study.tldr.impact}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-line">
                        {study.metrics[0] && (
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground leading-none truncate">
                              {study.metrics[0].value}
                            </p>
                            <p className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground mt-1 truncate">
                              {study.metrics[0].label}
                            </p>
                          </div>
                        )}
                        <ArrowRight
                          size={12}
                          className="shrink-0 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12 text-sm">
              No case studies match this filter yet.
            </p>
          )}

          <Reveal delay={220}>
            <div className="mt-16 border border-line rounded-lg p-6 md:p-8 bg-card/30">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Foundations
              </p>
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-foreground mb-3">
                Legacy engineering portfolio: hands-on depth before leadership scope.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-3xl">
                Earlier work includes aircraft design optimization, robotics controls, wind-tunnel testing, solar thermal design,
                and manufacturing builds (manual machining, CNC, molding, and 3D printing). That build-and-test foundation still
                shapes how I make architectural and program decisions today.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <a
                  href="https://kushalshahmae.weebly.com/projects.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-line rounded-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors"
                >
                  Projects Archive
                </a>
                <a
                  href="https://kushalshahmae.weebly.com/research-experience.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-line rounded-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors"
                >
                  Research Archive
                </a>
                <a
                  href="https://kushalshahmae.weebly.com/3d-modeling-and-manufacturing.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 border border-line rounded-sm text-muted-foreground hover:text-foreground hover:border-muted-foreground/40 transition-colors"
                >
                  CAD / Manufacturing Archive
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageLayout>
  );
};

export default Work;
