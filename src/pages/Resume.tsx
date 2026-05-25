import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import drozoneLayerCuas from "@/data/case-studies/drozone-layer-cuas";
import { Download, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import { personSchema } from "@/lib/seo/jsonld";

const experience = [
  {
    period: "Jul 2025 - Present",
    title: "Mission Operations — Rocket Lab",
    bullets: [
      "Member of Global Operations, leading mission operations across commercial and government programs from launch through on-orbit sustainment.",
      "Mission Operations Lead for the Globalstar LEO constellation across launch and on-orbit operations.",
      "Mission Ops Lead for SDA T2TL within PWSA, spanning flight software, GNC, FIDO, and ground systems.",
      "Build, test, and deploy containerized ground software on AWS (EC2) and Kubernetes — Docker images, kubectl pod management, integration testing, and mission rehearsal validation across ground and flight stacks.",
      "Design FSW state machines and application logic aligned with ground operations; deliver ground automation and internal tools that reduce manual console work.",
      "Supporting early T3TL operational concept development for next-generation transport-layer missions.",
    ],
  },
  {
    period: "Jan 2023 - Jul 2025",
    title: "Technical Program Manager (System Performance IPT Lead) - Northrop Grumman",
    bullets: [
      "Lead a $5M annual budget and 25-engineer team across six U.S. Space Force OPIR programs.",
      "Own LOS and radiometry mission performance, EVMS execution, and anomaly resolution.",
      "Align stakeholders across PMO, chief engineering, Lockheed Martin, and Space Force partners.",
    ],
  },
  {
    period: "Jan 2022 - Jul 2025",
    title: "Section Manager, Mission Algorithms - Northrop Grumman",
    bullets: [
      "Supervise 14 algorithm engineers delivering image processing, tracking, and telemetry analytics for space-based sensors.",
      "Direct staffing and resource strategy supporting a 200+ engineer SEIT organization.",
      "Oversee algorithm validation across HIL/SIL test environments.",
    ],
  },
  {
    period: "Apr 2020 - Dec 2022",
    title: "System Performance Lead, LOS Team (SBIRS Payloads) - Northrop Grumman",
    bullets: [
      "Led and mentored 25+ engineers through LOS/radiometry test design, execution, and analysis across TVAC, launch integration, EOT, and sustainment.",
      "Served as payload technical lead coordinating thermal, GNC, electrical, software, mission planning, and operations through GEO-5 and GEO-6 calibration and on-orbit campaigns.",
    ],
  },
  {
    period: "May 2018 - Mar 2020",
    title: "Responsible Engineer, LOS System Performance (GEO-5) - Northrop Grumman",
    bullets: [
      "Performed system-level LOS knowledge and pointing analysis using IR sensor, gimbal, motor, and gyro data.",
      "Built MATLAB tooling for Kalman filter and jitter analysis to improve targeting accuracy and payload calibration outcomes.",
    ],
  },
  {
    period: "Jun 2015 - May 2018",
    title: "SEIT Pathway Rotation Program - Northrop Grumman",
    bullets: [
      "Drove on-orbit anomaly investigations and led 24/7 early on-orbit test campaigns for multiple payloads.",
      "Delivered radiometric performance analysis across rotation assignments.",
      "Developed a MATLAB GUI for rapid missile trajectory generation and threat visualization.",
    ],
  },
  {
    period: "Apr 2013 - Sep 2014",
    title: "Mechanical Engineering Intern, R&D Innovation Lab - Thales Avionics",
    bullets: [
      "Contributed to a 7-engineer prototyping team developing immersive seat system concepts.",
      "Validated aperture-related design hypotheses through hands-on testing.",
    ],
  },
];

const highlights = [
  "Architected and delivered Python, Flask, Streamlit, and React internal applications for anomaly monitoring, automated performance reporting, and build analysis, generating $1M+ in savings.",
  "Authored technical BOEs for $10M+ proposals, translating mission requirements into architecture options, effort models, and risk profiles.",
];

const careerTimeline = [
  {
    period: "2025 - Present",
    organization: "Rocket Lab",
    phase: "Mission operations for proliferated LEO",
    focus:
      "Global Operations across commercial and government constellations, including Globalstar and SDA T2TL within PWSA.",
    evidence: "FSW, GNC, FIDO, ground software, Kubernetes, AWS, and mission rehearsal integration.",
  },
  {
    period: "2020 - 2025",
    organization: "Northrop Grumman",
    phase: "OPIR payload and program leadership",
    focus:
      "System Performance IPT leadership across LOS/radiometry, anomaly response, EVMS, stakeholder alignment, and mission performance.",
    evidence: "$5M annual budget, 25-engineer team, and six U.S. Space Force OPIR programs.",
  },
  {
    period: "2015 - 2020",
    organization: "Northrop Grumman",
    phase: "Payload systems and mission algorithms",
    focus:
      "On-orbit test campaigns, missile trajectory tooling, payload calibration, jitter analysis, and image-processing algorithm validation.",
    evidence: "Rotations across SEIT, LOS system performance, and early mission-critical tooling.",
  },
  {
    period: "2013 - 2014",
    organization: "Thales Avionics",
    phase: "R&D prototyping foundation",
    focus:
      "Hands-on mechanical engineering work in an innovation lab, validating design hypotheses through test hardware.",
    evidence: "Early exposure to cross-functional product and systems constraints.",
  },
];

const education = [
  "M.S., Mechanical Engineering (Control Systems), UCLA (GPA: 3.93)",
  "B.S., Mechanical Engineering and Aerospace Engineering (Double Major), UCI (GPA: 3.90)",
];

type Certification =
  | string
  | { title: string; bullets: string[]; caseStudyId?: string; caseStudyTitle?: string };

const certifications: Certification[] = [
  {
    title: "Project Management Professional (PMP), 2024",
    bullets: [
      "PMI credential in program and project leadership — people, process, and business environment across predictive, agile, and hybrid delivery.",
      "Applied to OPIR IPT execution: scope, schedule, cost, risk, and stakeholder management across six U.S. Space Force programs with EVMS and a $5M annual budget.",
      "Extends to technical proposal BOEs — mission requirements, architecture options, effort models, and risk-informed estimates for $10M+ pursuits.",
    ],
  },
  {
    title: "SASE Top Gun 2 Leadership Training, 2023",
    bullets: [
      "Selective 8-week cohort (We R Human) — workshops, reflection assignments, and weekly peer coaching pods for high-potential leaders.",
      "Phase I–II: success mindset, emotional intelligence, authentic remote communication, leadership brand, and intrapreneurship.",
      "Phase III: stakeholder-driven team purpose and high-performance team dynamics (purpose, culture, execution).",
    ],
  },
  {
    title: "Architect Apprenticeship Program (AAP), 2022",
    bullets: [
      "Participated in the Architect Apprenticeship Program (AAP), dissecting customer mission requirements and conducting trade studies to architect the Counter-Unmanned Aircraft System (C-UAS) solution, integrating radar, EO/IR systems, and AI-driven data fusion.",
      "Capstone: Drozone Layer — multi-layer engagement architecture (MESA radar, EOIR, FAAD C2, 30mm effector) for forward-area counter-UAS; led AOA and timing budgets as primary architecture author.",
    ],
    caseStudyId: drozoneLayerCuas.id,
    caseStudyTitle: drozoneLayerCuas.title,
  },
  {
    title: "Caltech Certificate in Systems Engineering, 2020",
    bullets: [
      "Capstone: Sky X autonomous package-delivery UAV — fulfillment-to-customer delivery under FAA, Amazon ConOps, and mission constraints (20-mile range, 10-lb payloads).",
      "Led system block diagrams, DSMs, ICDs, and requirements allocation across six subsystems with MOE/MOP/TPM traceability.",
      "Delivered subsystem trade studies plus bottom-up cost estimation, WBS, schedule, and risk register through detailed design.",
    ],
  },
];

const domains = [
  "Mission Operations",
  "Flight Software & GNC",
  "Ground Software, AWS & Kubernetes",
  "LEO Constellation Operations",
  "OPIR / SBIRS Payload Systems",
  "Line of Sight and Radiometry",
  "Mission Algorithms",
  "Systems Architecture and Trade Studies",
  "Counter-UAS / Sensor Fusion",
  "Integration, Test & Mission Rehearsal",
  "Anomaly Investigation",
  "Technical Program Leadership",
  "EVMS Cost-Schedule-Technical Execution",
];

const technicalStack = [
  "MATLAB/Simulink",
  "Python",
  "Flask",
  "Streamlit",
  "React",
  "Node.js",
  "SQL",
  "Power BI",
  "Tableau",
  "Linux",
  "Docker",
  "Kubernetes",
  "kubectl",
  "GitOps",
  "Grafana",
  "AWS",
  "Atlassian Suite",
  "Google Cloud",
  "Azure DevOps",
  "STK",
  "SolidWorks",
  "NASTRAN/PATRAN",
  "LabVIEW",
  "FORTRAN",
];

const Resume = () => (
  <PageLayout title="Resume">
    <Seo
      title="Resume"
      description="Aerospace systems leadership and technical execution — Rocket Lab, Northrop Grumman, OPIR/SBIRS, PWSA. Experience, education, certifications, and skills."
      path="/resume"
      jsonLd={[personSchema()]}
    />
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Resume</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Aerospace systems leadership and technical execution.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Program and systems leader with deep OPIR payload experience across mission algorithms, LOS/radiometry performance, test campaigns, and anomaly response in high-stakes mission environments.
          </p>
          <Button variant="subtle" size="default" className="mb-16 gap-2" asChild>
            <a href={site.resumeUrl} download="Kushal_Shah_Resume.pdf">
              <Download size={14} />
              Download Resume (PDF)
            </a>
          </Button>
        </Reveal>

        <div className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Domains and Expertise</h2>
            <div className="flex flex-wrap gap-2 mb-10">
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

          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Technical Stack</h2>
            <div className="flex flex-wrap gap-2">
              {technicalStack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-xs border border-line text-muted-foreground rounded-sm tracking-wide"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <section
          aria-labelledby="career-timeline-heading"
          className="mb-16"
        >
          <Reveal>
            <h2
              id="career-timeline-heading"
              className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3"
            >
              Career Timeline
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              The path from R&D prototyping into OPIR payload systems, program
              leadership, and current mission operations for proliferated LEO.
            </p>
          </Reveal>
          <ol className="relative border-l border-line ml-3 space-y-8">
            {careerTimeline.map((item, i) => (
              <li key={`${item.period}-${item.organization}`} className="relative pl-8">
                <Reveal delay={i * 80}>
                  <span
                    className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background"
                    aria-hidden
                  />
                  <div className="border border-line rounded-sm p-5 bg-card/30">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-primary mb-1">
                          {item.period}
                        </p>
                        <h3 className="text-base font-semibold text-foreground">
                          {item.phase}
                        </h3>
                      </div>
                      <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground md:text-right">
                        {item.organization}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.focus}
                    </p>
                    <p className="mt-3 text-xs text-foreground/80 leading-relaxed">
                      {item.evidence}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        <div className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Experience</h2>
          </Reveal>
          <div className="space-y-0">
            {experience.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="border-t border-line py-8 flex flex-col md:flex-row gap-2 md:gap-8">
                  <span className="font-mono text-xs text-muted-foreground tracking-wider w-44 shrink-0 mt-1">
                    {item.period}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-3">{item.title}</h3>
                    <ul className="space-y-3">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 items-start text-sm text-muted-foreground leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>
        </div>

        <div className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Selected Impact</h2>
          </Reveal>
          <ul className="space-y-4 border-y border-line py-8">
            {highlights.map((item, i) => (
              <Reveal key={item} delay={i * 80}>
                <li className="flex gap-3 items-start text-sm text-muted-foreground leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Education</h2>
          </Reveal>
          <ul className="space-y-4 border-y border-line py-8">
            {education.map((item, i) => (
              <Reveal key={item} delay={i * 80}>
                <li className="text-sm text-muted-foreground leading-relaxed">{item}</li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Certifications and Training</h2>
          </Reveal>
          <ul className="space-y-6 border-y border-line py-8">
            {certifications.map((item, i) => (
              <Reveal key={typeof item === "string" ? item : item.title} delay={i * 80}>
                <li>
                  {typeof item === "string" ? (
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  ) : (
                    <div
                      className={
                        item.caseStudyId
                          ? "border border-primary/25 rounded-sm p-5 bg-primary/5"
                          : undefined
                      }
                    >
                      <p className="text-sm font-medium text-foreground mb-3">{item.title}</p>
                      <ul className="space-y-2">
                        {item.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 items-start text-sm text-muted-foreground leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      {item.caseStudyId && (
                        <Link
                          to={`/work/${item.caseStudyId}`}
                          className="inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase text-primary hover:text-foreground transition-colors mt-4"
                        >
                          {item.caseStudyTitle}
                          <ArrowRight size={12} />
                        </Link>
                      )}
                    </div>
                  )}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Resume;
