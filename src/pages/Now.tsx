import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { currentlyAtAGlance } from "@/data/now";

const Now = () => (
  <PageLayout title="Now">
    <Seo
      title="Now"
      description="Current focus, role, shipping work, and what Kushal Shah is open to next."
      path="/now"
    />
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Now</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Now
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Current focus and operating context.
          </p>
          <p className="font-mono text-xs tracking-wider uppercase text-muted-foreground mb-12">
            Updated {currentlyAtAGlance.asOf}
          </p>
        </Reveal>

        <Reveal delay={60}>
          <dl className="border-y border-line divide-y divide-line">
            {[
              ["Role", currentlyAtAGlance.role],
              ["Focus", currentlyAtAGlance.focus],
              ["Shipping", currentlyAtAGlance.shipping],
              ["Open to", currentlyAtAGlance.openTo],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid md:grid-cols-[140px_1fr] gap-2 md:gap-8 py-6"
              >
                <dt className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  {label}
                </dt>
                <dd className="text-sm text-foreground/85 leading-relaxed">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 border border-line rounded-sm p-5 bg-card/30">
            <h2 className="text-base font-semibold text-foreground mb-3">
              What this means for collaborators
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              The through-line is operationally grounded systems work: building
              the software, procedures, and architecture that let technical teams
              execute under real mission constraints.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="subtle" asChild>
                <Link to="/work">
                  Selected Work
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </Button>
              <Button variant="subtle" asChild>
                <Link to="/resume">
                  Resume
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/contact">
                  Contact
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default Now;
