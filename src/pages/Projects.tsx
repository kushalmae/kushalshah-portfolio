import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import GitHubProjectCard from "@/components/GitHubProjectCard";
import {
  GITHUB_PROJECT_TAGS,
  githubProjects,
  type GitHubProjectTag,
} from "@/data/github-projects";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import Seo from "@/components/Seo";

const Projects = () => {
  const [activeTag, setActiveTag] = useState<GitHubProjectTag | null>(null);

  const filtered = useMemo(
    () =>
      activeTag
        ? githubProjects.filter((p) => p.tags.includes(activeTag))
        : githubProjects,
    [activeTag]
  );

  return (
    <PageLayout title="Code">
      <Seo
        title="Code"
        description="Satellite operations platforms, telemetry pipelines, automation tooling, and AI workflows — GitHub projects you can inspect."
        path="/code"
      />
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl">
          <Reveal>
            <SectionLabel>Open Source & Code</SectionLabel>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mb-4">
              GitHub projects.
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
              Repositories spanning satellite operations platforms, telemetry pipelines,
              automation tooling, and AI workflows — the same systems thinking as the case
              studies, in code you can inspect.
            </p>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <Github size={16} />
              @{site.githubUsername}
              <ExternalLink size={12} />
            </a>
          </Reveal>

          <Reveal delay={80}>
            <div className="flex flex-wrap items-center gap-1.5 mb-10">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                className={cn(
                  "font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors",
                  activeTag === null
                    ? "bg-foreground text-background border-foreground"
                    : "border-line text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                )}
              >
                All
              </button>
              {GITHUB_PROJECT_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors",
                    activeTag === tag
                      ? "bg-foreground text-background border-foreground"
                      : "border-line text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Reveal>

          {filtered.length > 0 ? (
            <div
              key={activeTag ?? "all"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 animate-fade-in"
            >
              {filtered.map((project, i) => (
                <Reveal key={project.slug} delay={i * 40}>
                  <GitHubProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12 text-sm">
              No projects match this filter.
            </p>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
