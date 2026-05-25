import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/data/case-studies";
import { featuredGitHubProjects } from "@/data/github-projects";
import GitHubProjectCard from "@/components/GitHubProjectCard";
import SystemsHero from "@/components/SystemsHero";
import { site } from "@/config/site";
import { personSchema, websiteSchema } from "@/lib/seo/jsonld";
import { currentlyAtAGlance } from "@/data/now";
import { programs } from "@/data/programs";

/** Quantified proof tiles directly under the hero. Numbers tied to the resume
 * so a recruiter sees scale in <60 seconds. */
const proofTiles = [
  { value: "$5M", label: "annual IPT budget owned" },
  { value: "25", label: "engineers led across OPIR" },
  { value: "6", label: "U.S. Space Force programs" },
  { value: "$1M+", label: "automation savings shipped" },
  { value: "$10M+", label: "proposal BOEs authored" },
];

const pillars = [
  {
    title: "Technical Strategy",
    description:
      "Translating ambiguity into structured technical direction. Defining roadmaps, architectures, and priorities that align engineering with mission outcomes.",
  },
  {
    title: "Systems Architecture",
    description:
      "Designing end-to-end systems across hardware, software, and operational boundaries. Building structures that survive contact with reality.",
  },
  {
    title: "Software & Platform Leverage",
    description:
      "Applying software automation, APIs, and tooling to multiply the impact of technical teams. Turning manual processes into scalable platforms.",
  },
];

const featuredWork = caseStudies.slice(0, 3);

const Index = () => (
  <PageLayout>
    <Seo path="/" jsonLd={[personSchema(), websiteSchema()]} />

    {/* Hero */}
    <section className="relative py-24 md:py-40 overflow-hidden">
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
          Mission operations for LEO constellations, OPIR/SBIRS payload performance, mission algorithms, and the software platforms that let engineering teams scale.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <Button variant="hero" size="lg" asChild>
            <Link to="/work">View Selected Work</Link>
          </Button>
          <Button variant="subtle" size="lg" asChild>
            <a href={site.resumeUrl} download="Kushal_Shah_Resume.pdf" className="gap-2">
              <Download size={14} aria-hidden />
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>

    {/* Proof tiles */}
    <section className="border-t border-line">
      <div className="container">
        <ul
          aria-label="Quantified impact"
          className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-line"
        >
          {proofTiles.map((tile) => (
            <li key={tile.label} className="py-6 px-4 md:px-6 first:pl-0 last:pr-0">
              <p className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                {tile.value}
              </p>
              <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground mt-1.5 leading-snug">
                {tile.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Currently */}
    <section className="border-t border-line py-12">
      <div className="container max-w-5xl">
        <Reveal>
          <div className="grid md:grid-cols-[180px_1fr] gap-4 md:gap-10 items-start">
            <div>
              <SectionLabel>Currently</SectionLabel>
              <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mt-1">
                As of {currentlyAtAGlance.asOf}
              </p>
            </div>
            <dl className="space-y-3 text-sm text-foreground/85 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-x-6 gap-y-1">
                <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground pt-1">Role</dt>
                <dd>{currentlyAtAGlance.role}</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-x-6 gap-y-1">
                <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground pt-1">Focus</dt>
                <dd>{currentlyAtAGlance.focus}</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-x-6 gap-y-1">
                <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground pt-1">Shipping</dt>
                <dd>{currentlyAtAGlance.shipping}</dd>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-x-6 gap-y-1">
                <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary pt-1">Open to</dt>
                <dd className="text-foreground">{currentlyAtAGlance.openTo}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>

    {/* Program / org trust strip */}
    <section className="border-t border-b border-line py-10">
      <div className="container">
        <Reveal>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Programs and Organizations
          </p>
          <ul
            aria-label="Programs and organizations"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 md:gap-8 items-start"
          >
            {programs.map((p) => (
              <li key={p.name}>
                <p className="text-sm font-semibold text-foreground/90 tracking-tight leading-snug">
                  {p.name}
                </p>
                <p className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground mt-1 leading-snug">
                  {p.context}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>

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

    {/* GitHub Projects */}
    <section className="py-24 md:py-32">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionLabel>Open Source & Code</SectionLabel>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4 tracking-tight">
            GitHub projects you can inspect.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Satellite ops platforms, telemetry pipelines, and automation tooling — repositories
            alongside the case studies, with source and demos where available.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {featuredGitHubProjects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 60}>
              <GitHubProjectCard project={project} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={360}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="subtle" asChild>
              <Link to="/code">View All Code</Link>
            </Button>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors"
            >
              github.com/{site.githubUsername}
            </a>
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
            <p>I design for coherence, not just correctness.</p>
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
            Open to senior IC and technical leadership roles.
          </h2>
          <p className="text-muted-foreground mb-8">
            Mission operations, systems architecture, technical program leadership, and platform engineering. LinkedIn is the fastest way to reach me.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                Connect on LinkedIn
              </a>
            </Button>
            <Button variant="subtle" size="lg" asChild>
              <Link to="/contact">All Contact Channels</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default Index;
