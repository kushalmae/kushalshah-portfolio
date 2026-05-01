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
            Breadth isn't a lack of focus — it's an architectural advantage.
          </h1>
        </Reveal>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <Reveal delay={50}>
            <p>
              My career started in aerospace and defense — working on payload systems, signal processing, radiometry, and missile classification. I didn't just operate these systems. I learned how they were designed, why they failed, and what made them resilient. That exposure trained me to think in systems, not features.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              Over time, I expanded into spacecraft-side engineering — power systems, bus architecture, GNC, flight dynamics, flight software, and ground software. I developed a rare ability to see across subsystem boundaries and understand how decisions in one domain ripple through others.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p>
              Then I moved into software — building mission-critical internal tools, designing APIs and microservices, creating automation pipelines, and developing load monitoring and alarm platforms. Not because I abandoned hardware, but because I saw that software was the highest-leverage layer for improving complex systems.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p>
              More recently, I've worked at the intersection of AI, workflow automation, and product strategy — designing AI agents, supporting startups from PRD through delivery, and shaping technical direction across engineering teams.
            </p>
          </Reveal>

          <div className="h-px bg-line my-12" />

          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-4">What this adds up to</h2>
          </Reveal>
          <Reveal delay={50}>
            <p>
              I'm not a specialist who goes deep in one stack. I'm an architect who understands how real-world constraints — physics, budget, schedule, organizational friction, and technical debt — shape what's actually possible. I design systems that account for those constraints from the start.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p>
              I can sit in a room with hardware engineers, software developers, program managers, and executives — and translate between all of them. Not because I simplify, but because I understand each perspective deeply enough to find the structural solution.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <p>
              My value isn't in doing one thing extremely well. It's in seeing the whole system, identifying where structure is missing, and designing the architecture — technical, organizational, or strategic — that makes everything else work better.
            </p>
          </Reveal>

          <div className="h-px bg-line my-12" />

          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-4">Core Beliefs</h2>
          </Reveal>
          <ul className="space-y-3">
            {[
              "Architecture is a leadership act, not just a technical one.",
              "The best systems are designed for the constraints they'll actually face.",
              "Clarity of structure creates speed. Ambiguity creates waste.",
              "Software is leverage — but only when applied with systems awareness.",
              "Cross-domain judgment is rarer and more valuable than deep specialization alone.",
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
