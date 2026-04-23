import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { Download } from "lucide-react";

const experience = [
  {
    period: "2022 — Present",
    title: "Technical Strategy & Architecture — Independent",
    description: "Advising startups and technical organizations on systems architecture, product strategy, AI integration, and engineering process design.",
  },
  {
    period: "2018 — 2022",
    title: "Systems Engineering & Technical Leadership — Aerospace/Defense",
    description: "Led cross-functional technical execution across payload systems, signal processing, radiometry, and spacecraft operations. Designed internal tools, automation pipelines, and performance analysis platforms.",
  },
  {
    period: "2015 — 2018",
    title: "Payload & Mission Systems Engineering — Aerospace",
    description: "Signal processing, radiometric calibration, mission-critical analysis tooling, and satellite system performance assessment.",
  },
];

const domains = [
  "Systems Architecture",
  "Technical Strategy",
  "Aerospace & Defense Systems",
  "Signal Processing & Radiometry",
  "Machine Learning / AI",
  "API & Microservice Design",
  "Python Automation & Tooling",
  "Product & Platform Strategy",
  "Program Leadership",
  "Cross-Functional Execution",
];

const Resume = () => (
  <PageLayout title="Resume">
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Resume</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Experience & expertise.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            An architect-oriented view of my career, focused on what I've designed and led — not just where I've been.
          </p>
          <Button variant="subtle" size="default" className="mb-16 gap-2" asChild>
            <a href={site.resumeUrl} download="Kushal_Shah_Resume.pdf">
              <Download size={14} />
              Download Resume (PDF)
            </a>
          </Button>
        </Reveal>

        {/* Experience */}
        <div className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Experience</h2>
          </Reveal>
          <div className="space-y-0">
            {experience.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="border-t border-line py-8 flex flex-col md:flex-row gap-2 md:gap-8">
                  <span className="font-mono text-xs text-muted-foreground tracking-wider w-36 shrink-0 mt-1">
                    {item.period}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>

        {/* Domains */}
        <Reveal>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Domains & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {domains.map((domain) => (
              <span
                key={domain}
                className="px-3 py-1.5 text-xs border border-line text-muted-foreground rounded-sm tracking-wide"
              >
                {domain}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default Resume;
