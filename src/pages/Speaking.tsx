import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import Seo from "@/components/Seo";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Talk {
  date: string;
  venue: string;
  title: string;
  audience: string;
  /** Site-relative path to a related case study or article, if any. */
  relatedHref?: string;
  relatedLabel?: string;
}

/** Listed talks. Add new entries here when delivered. The page deliberately
 * hides the empty-state messaging once any entry exists. */
const talks: Talk[] = [];

const topics = [
  "PWSA / proliferated LEO mission operations",
  "OPIR / SBIRS payload performance and on-orbit campaigns",
  "Counter-UAS engagement architecture and timing budgets",
  "Engineering automation that pays itself back ($1M+ tooling)",
  "Technical BOEs and the architecture of $10M+ proposals",
];

const Speaking = () => (
  <PageLayout title="Speaking">
    <Seo
      title="Speaking"
      description="Talks and topics. Available for engineering org tech talks, hiring conferences, and aerospace systems forums."
      path="/speaking"
    />
    <section className="py-24 md:py-32">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Speaking</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Available to talk about systems that survive contact with reality.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            I take a small number of engagements per year — engineering org
            tech talks, aerospace and defense systems forums, and panels on
            technical leadership for cross-domain teams.
          </p>
        </Reveal>

        <Reveal delay={40}>
          <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
            Topics I cover well
          </h2>
          <ul className="space-y-3 mb-16">
            {topics.map((topic) => (
              <li
                key={topic}
                className="flex gap-3 items-start text-sm text-foreground/80 leading-relaxed"
              >
                <span
                  className="mt-2 w-1 h-1 rounded-full bg-primary shrink-0"
                  aria-hidden
                />
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {talks.length > 0 ? (
          <Reveal delay={60}>
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Past talks
            </h2>
            <ul className="space-y-6 border-t border-line pt-8">
              {talks.map((talk) => (
                <li key={`${talk.date}-${talk.title}`} className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-10">
                  <span className="font-mono text-xs text-muted-foreground tracking-wider mt-1">
                    {talk.date}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {talk.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {talk.venue} · {talk.audience}
                    </p>
                    {talk.relatedHref && talk.relatedLabel && (
                      <Link
                        to={talk.relatedHref}
                        className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-primary hover:text-primary/70 transition-colors"
                      >
                        {talk.relatedLabel}
                        <ArrowRight size={12} aria-hidden />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <Reveal delay={60}>
            <div className="border border-line rounded-sm p-6 bg-card/30">
              <p className="text-sm text-foreground/80 mb-3">
                No public talks listed yet. Most engineering and aerospace work
                I've spoken about has been at-org. If you're putting together a
                tech talk, panel, or systems forum and these topics fit, get in
                touch.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-primary hover:text-primary/70 transition-colors"
              >
                Invite to speak
                <ArrowRight size={12} aria-hidden />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  </PageLayout>
);

export default Speaking;
