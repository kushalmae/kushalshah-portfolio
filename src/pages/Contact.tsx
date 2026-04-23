import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/config/site";

const Contact = () => (
  <PageLayout title="Contact">
    <section className="py-24 md:py-40">
      <div className="container max-w-3xl">
        <Reveal>
          <SectionLabel>Contact</SectionLabel>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-6">
            Let's connect.
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-16 max-w-xl">
            I'm open to technical leadership roles, advisory engagements, and select collaborations where systems thinking and architectural clarity create real leverage.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ContactForm />
        </Reveal>

        <div className="h-px bg-line my-16" />

        <div className="space-y-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
              Or reach out directly
            </p>
          </Reveal>
          <Reveal delay={60}>
            <div>
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">Email</h3>
              <a href={`mailto:${site.email}`} className="text-foreground hover:text-primary transition-colors text-sm">
                {site.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-2">LinkedIn</h3>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary transition-colors text-sm"
              >
                linkedin.com/in/kushalmae
              </a>
            </div>
          </Reveal>
        </div>

        <div className="h-px bg-line my-12" />

        <Reveal>
          <p className="text-sm text-muted-foreground">
            Based in the United States. Open to remote and hybrid engagements.
          </p>
        </Reveal>
      </div>
    </section>
  </PageLayout>
);

export default Contact;
