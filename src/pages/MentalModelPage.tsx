import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ThemeTag from "@/components/ThemeTag";
import { getMentalModelBySlug } from "@/data/books";
import Seo from "@/components/Seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { breadcrumbListSchema } from "@/lib/seo/jsonld";

const MentalModelPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const model = slug ? getMentalModelBySlug(slug) : undefined;

  if (!model) {
    return (
      <PageLayout title="Not Found">
        <div className="container py-40 text-center">
          <h1 className="text-2xl text-foreground mb-4">Mental model not found.</h1>
          <Link to="/books#mental-models" className="text-primary hover:underline">
            Back to Mental Models
          </Link>
        </div>
      </PageLayout>
    );
  }

  const path = `/mental-models/${model.slug}`;
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Books", to: "/books" },
    { label: "Mental Models", to: "/books#mental-models" },
    { label: model.name },
  ];

  return (
    <PageLayout title={model.name}>
      <Seo
        title={model.name}
        description={model.oneLiner}
        path={path}
        jsonLd={[breadcrumbListSchema(breadcrumbItems)]}
      />
      <section className="py-24 md:py-32">
        <div className="container max-w-3xl">
          <Breadcrumbs items={breadcrumbItems} sticky />
          <Reveal>
            <Link
              to="/books#mental-models"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase mb-8 transition-colors"
            >
              <ArrowLeft size={14} aria-hidden /> Back to Mental Models
            </Link>

            <SectionLabel>Mental Model</SectionLabel>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
              {model.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {model.oneLiner}
            </p>

            {model.sourceBook && (
              <p className="text-sm text-muted-foreground mb-8">
                Extracted from{" "}
                <Link
                  to={`/books/${model.sourceBook.slug}`}
                  className="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                >
                  {model.sourceBook.title}
                  <ArrowRight size={12} aria-hidden />
                </Link>
              </p>
            )}

            <div className="flex flex-wrap gap-0.5 mb-10" aria-label="Themes">
              {model.tags.map((tag) => (
                <ThemeTag key={tag} tag={tag} />
              ))}
            </div>
          </Reveal>

          <div className="h-px bg-line mb-12" />

          <div className="space-y-14">
            <Reveal>
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Definition</h2>
                <ul className="space-y-3">
                  {model.definition.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-foreground/80 leading-relaxed">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-primary/50 shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={40}>
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">When to use</h2>
                <ul className="space-y-3">
                  {model.whenToUse.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-foreground/80 leading-relaxed">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-primary/50 shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={80}>
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">Pitfalls</h2>
                <ul className="space-y-3">
                  {model.pitfalls.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-foreground/80 leading-relaxed">
                      <span className="mt-[9px] w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={120}>
              <section className="border border-line rounded-sm p-5 md:p-6 bg-card/30">
                <SectionLabel>Application</SectionLabel>
                <p className="text-base text-foreground/80 leading-relaxed mt-3">
                  {model.application}
                </p>
              </section>
            </Reveal>
          </div>

          <div className="mt-14">
            <Link
              to="/books#mental-models"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} aria-hidden /> All mental models
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default MentalModelPage;
