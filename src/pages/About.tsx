import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";

const About = () => (
  <PageLayout title="About">
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-12">
            I build mission-critical systems where technical depth and leadership have to work together.
          </h1>
        </Reveal>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <Reveal delay={50}>
            <p>
              I am a Technical Program Manager and Section Manager at Northrop Grumman, where I lead teams working on OPIR payload performance for U.S. Space Force programs. My work spans mission algorithms, line-of-sight performance, radiometry, system testing, and anomaly response in high-consequence environments.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              Across roles, I have led cross-functional execution through launch, early on-orbit testing, and sustainment phases. That means connecting hardware, software, thermal, GNC, electrical, mission planning, and operations teams into one coordinated delivery system under real schedule and budget pressure.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p>
              I also design and ship internal software platforms that make technical organizations more effective. Using Python, Flask, Streamlit, React, and analytics tooling, I have built systems for anomaly monitoring, automated reporting, and build analysis that drove measurable savings and faster decision cycles.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              My background is rooted in mechanical and aerospace engineering with a controls-focused M.S. from UCLA, and strengthened by formal program leadership training including PMP certification.
            </p>
          </Reveal>

          <div className="h-px bg-line my-12" />

          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-4">What this adds up to</h2>
          </Reveal>
          <Reveal delay={50}>
            <p>
              I bring systems-level judgment: the ability to translate mission requirements into executable plans, align technical teams around clear architecture, and deliver outcomes that are technically sound and operationally reliable.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              I am most effective in complex environments where constraints are real: cost, schedule, risk, stakeholder alignment, and engineering uncertainty. I help teams move from ambiguity to decisions, and from decisions to execution.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p>
              Whether the problem is spacecraft performance, tooling, or organization design, my focus is the same: build structure that improves speed, quality, and long-term resilience.
            </p>
          </Reveal>

          <div className="h-px bg-line my-12" />

          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-4">Core Beliefs</h2>
          </Reveal>
          <ul className="space-y-3">
            {[
              "Architecture only matters when it survives real operational constraints.",
              "Cross-functional clarity is a technical advantage, not only a management skill.",
              "Teams execute faster when risk and assumptions are made explicit early.",
              "Software should reduce friction for mission-critical engineering decisions.",
              "Leadership is the system that makes technical excellence repeatable.",
            ].map((belief, i) => (
              <Reveal key={belief} delay={i * 60}>
                <li className="flex gap-3 items-start">
                  <span className="w-1 h-1 rounded-full bg-primary mt-2.5 shrink-0" />
                  <span>{belief}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default About;
