import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { Download } from "lucide-react";

const experience = [
  {
    period: "Jan 2023 - Present",
    title: "Technical Program Manager (System Performance IPT Lead) - Northrop Grumman",
    description:
      "Lead a $5M annual budget and 25-engineer team across six U.S. Space Force OPIR programs. Own LOS and radiometry mission performance, EVMS execution, anomaly resolution, and stakeholder alignment across PMO, chief engineering, Lockheed Martin, and Space Force partners.",
  },
  {
    period: "Jan 2022 - Present",
    title: "Section Manager, Mission Algorithms - Northrop Grumman",
    description:
      "Supervise 14 algorithm engineers delivering image processing, tracking, and telemetry analytics for space-based sensors. Direct staffing and resource strategy supporting a 200+ engineer SEIT organization, and oversee algorithm validation across HIL/SIL test environments.",
  },
  {
    period: "Apr 2020 - Dec 2022",
    title: "System Performance Lead, LOS Team (SBIRS Payloads) - Northrop Grumman",
    description:
      "Led and mentored 25+ engineers through LOS/radiometry test design, execution, and analysis across TVAC, launch vehicle integration, EOT, and sustainment. Served as payload technical lead coordinating thermal, GNC, electrical, software, mission planning, and operations teams through GEO-5 and GEO-6 calibration and on-orbit campaigns.",
  },
  {
    period: "May 2018 - Mar 2020",
    title: "Responsible Engineer, LOS System Performance (GEO-5) - Northrop Grumman",
    description:
      "Performed system-level LOS knowledge and pointing analysis using IR sensor, gimbal, motor, and gyro data. Built MATLAB tooling for Kalman filter and jitter analysis to improve targeting accuracy and payload calibration outcomes.",
  },
  {
    period: "Jun 2015 - May 2018",
    title: "SEIT Pathway Rotation Program - Northrop Grumman",
    description:
      "Drove on-orbit anomaly investigations, led 24/7 early on-orbit test campaigns for multiple payloads, and delivered radiometric performance analysis. Also developed a MATLAB GUI for rapid missile trajectory generation and threat visualization.",
  },
  {
    period: "Apr 2013 - Sep 2014",
    title: "Mechanical Engineering Intern, R&D Innovation Lab - Thales Avionics",
    description:
      "Contributed to a 7-engineer prototyping team developing immersive seat system concepts and validating aperture-related design hypotheses through hands-on testing.",
  },
];

const highlights = [
  "Architected and delivered Python, Flask, Streamlit, and React internal applications for anomaly monitoring, automated performance reporting, and build analysis, generating $1M+ in savings.",
  "Authored technical BOEs for $10M+ proposals, translating mission requirements into architecture options, effort models, and risk profiles.",
  "Contributed to counter-UAS architecture trade studies integrating radar, EO/IR sensors, and AI-driven data fusion workflows.",
];

const education = [
  "M.S., Mechanical Engineering (Control Systems), UCLA (GPA: 3.93)",
  "B.S., Mechanical Engineering and Aerospace Engineering (Double Major), UCI (GPA: 3.90)",
];

const certifications = [
  "Project Management Professional (PMP), 2024",
  "SASE Top Gun 2 Leadership Training, 2023",
  "Caltech Systems Engineering Certificate, 2020",
];

const domains = [
  "OPIR / SBIRS Payload Systems",
  "Line of Sight and Radiometry",
  "Mission Algorithms",
  "System Performance Testing",
  "Anomaly Investigation",
  "Systems Architecture and Trade Studies",
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
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Resume</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Aerospace systems leadership and technical execution.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Program and systems leader with deep OPIR payload experience across mission algorithms, LOS/radiometry performance, test campaigns, and anomaly response in high-stakes defense environments.
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
                    <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
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
          <ul className="space-y-4 border-y border-line py-8">
            {certifications.map((item, i) => (
              <Reveal key={item} delay={i * 80}>
                <li className="text-sm text-muted-foreground leading-relaxed">{item}</li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8">Domains and Expertise</h2>
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

        <Reveal>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mt-16 mb-8">Technical Stack</h2>
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
    </section>
  </PageLayout>
);

export default Resume;
