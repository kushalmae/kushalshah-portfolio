import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/case-studies";
import SystemsHero from "@/components/SystemsHero";

const pillars = [
  {
    title: "Technical Strategy",
    description: "Translating ambiguity into structured technical direction. Defining roadmaps, architectures, and priorities that align engineering with mission outcomes.",
  },
  {
    title: "Systems Architecture",
    description: "Designing end-to-end systems across hardware, software, and operational boundaries. Building structures that survive contact with reality.",
  },
  {
    title: "Software & Platform Leverage",
    description: "Applying software automation, APIs, and tooling to multiply the impact of technical teams. Turning manual processes into scalable platforms.",
  },
];

const featuredWork = caseStudies.slice(0, 3);

const Index = () => (
  <PageLayout>
    {/* Hero */}
    <section className="relative py-24 md:py-40 overflow-hidden">
      {/* Animated systems diagram */}
      <div className="absolute inset-0 pointer-events-none">
        <SystemsHero />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/30 to-transparent" />
      </div>

      <div className="container max-w-4xl relative">
        <SectionLabel>Systems Architect · Technical Strategist</SectionLabel>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground mb-8 text-balance animate-fade-up">
          I lead complex technical systems from ambiguity to execution.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Combining systems thinking, technical strategy, architecture, software leverage, and cross-functional leadership to design and deliver what matters.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button variant="hero" size="lg" asChild>
            <Link to="/work">View Selected Work</Link>
          </Button>
          <Button variant="subtle" size="lg" asChild>
            <Link to="/about">About Me</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Divider */}
    <div className="container"><div className="h-px bg-line" /></div>

    {/* Pillars */}
    <section className="py-24 md:py-32">
      <div className="container">
        <Reveal>
          <SectionLabel>How I Create Value</SectionLabel>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 100}>
              <div className="group">
                <div className="w-8 h-px bg-primary mb-6" />
                <h3 className="text-lg font-semibold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <div className="container"><div className="h-px bg-line" /></div>

    {/* Featured Work */}
    <section className="py-24 md:py-32">
      <div className="container">
        <Reveal>
          <SectionLabel>Selected Work</SectionLabel>
        </Reveal>
        <div className="space-y-0">
          {featuredWork.map((work, i) => (
            <Reveal key={work.id} delay={i * 80}>
              <Link
                to={`/work/${work.id}`}
                className="group flex flex-col md:flex-row gap-6 py-8 border-b border-line first:border-t transition-colors hover:bg-secondary/20 -mx-4 px-4 md:-mx-8 md:px-8"
              >
                <div className="w-full md:w-48 h-28 rounded overflow-hidden shrink-0">
                  <img
                    src={work.image}
                    alt=""
                    loading="lazy"
                    width={1200}
                    height={600}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <span className="font-mono text-xs text-muted-foreground tracking-wider uppercase mb-1">
                    {work.label}
                  </span>
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{work.summary}</p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 hidden md:block self-center" />
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <div className="mt-8">
            <Button variant="subtle" asChild>
              <Link to="/work">View All Case Studies</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>

    <div className="container"><div className="h-px bg-line" /></div>

    {/* How I Think */}
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>How I Think</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 tracking-tight">
            Structure creates clarity. Clarity enables execution.
          </h2>
        </Reveal>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <Reveal delay={100}>
            <p>
              I approach every problem as a system. Before writing a line of code or making a recommendation, I map the constraints, dependencies, stakeholders, and failure modes. The best architecture isn't the most clever — it's the one that works under real-world pressure.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p>
              My career has moved across aerospace systems, software platforms, and startup execution — not because I lack focus, but because the same architectural thinking applies everywhere. Understanding signal processing makes me better at API design. Leading spacecraft operations makes me better at building internal tools.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              I design for coherence, not just correctness.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    <div className="container"><div className="h-px bg-line" /></div>

    {/* CTA */}
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
            Let's build something that works.
          </h2>
          <p className="text-muted-foreground mb-8">
            I'm open to technical leadership roles, advisory work, and select collaborations.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default Index;
