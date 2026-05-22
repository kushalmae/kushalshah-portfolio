import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github, Star } from "lucide-react";
import type { GitHubProject } from "@/data/github-projects";
import { cn } from "@/lib/utils";

interface GitHubProjectCardProps {
  project: GitHubProject;
  className?: string;
}

const GitHubProjectCard = ({ project, className }: GitHubProjectCardProps) => (
  <article
    className={cn(
      "group flex flex-col bg-card border border-line rounded-lg overflow-hidden hover:border-muted-foreground/30 transition-all duration-300 h-full",
      className
    )}
  >
    <div className="p-4 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Github size={14} className="shrink-0 text-muted-foreground" />
          <span className="font-mono text-[10px] tracking-wider uppercase text-muted-foreground truncate">
            {project.repo}
          </span>
        </div>
        {project.featured && (
          <span className="shrink-0 inline-flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase text-primary bg-primary/10 border border-primary/30 px-1.5 py-0.5 rounded">
            <Star size={9} />
            Featured
          </span>
        )}
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
        {project.name}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground bg-muted/40 border border-line px-1.5 py-0.5 rounded">
          {project.language}
        </span>
        {project.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground/80 border border-line px-1.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-3 border-t border-line text-xs">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          Source
          <ExternalLink size={11} />
        </a>
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            Live demo
            <ExternalLink size={11} />
          </a>
        )}
        {project.caseStudyId && (
          <Link
            to={`/work/${project.caseStudyId}`}
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors ml-auto"
          >
            Case study
            <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  </article>
);

export default GitHubProjectCard;
