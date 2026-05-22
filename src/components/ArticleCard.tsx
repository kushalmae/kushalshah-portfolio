import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Article } from "@/data/articles";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  compact?: boolean;
}

const ArticleCard = ({ article, compact = false }: ArticleCardProps) => (
  <Link
    to={`/thinking/${article.slug}`}
    className={cn(
      "group block border border-line rounded-lg hover:border-muted-foreground/30 transition-all duration-300 hover:no-underline",
      compact ? "p-4" : "p-5 md:p-6"
    )}
  >
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">
        {article.date}
      </span>
      <span className="text-muted-foreground/30" aria-hidden>
        ·
      </span>
      <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">
        {article.readTime}
      </span>
      {article.series && (
        <>
          <span className="text-muted-foreground/30" aria-hidden>
            ·
          </span>
          <span className="font-mono text-[9px] tracking-wider uppercase text-primary">
            {article.series.title} {article.series.part}/{article.series.total}
          </span>
        </>
      )}
    </div>

    <h3
      className={cn(
        "font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2",
        compact ? "text-sm" : "text-base"
      )}
    >
      {article.title}
    </h3>

    <p
      className={cn(
        "text-muted-foreground leading-relaxed mb-3",
        compact ? "text-xs line-clamp-2" : "text-sm line-clamp-3"
      )}
    >
      {article.description}
    </p>

    {!compact && article.keyTakeaways.length > 0 && (
      <ul className="space-y-1 mb-4" aria-label="Key takeaways">
        {article.keyTakeaways.slice(0, 2).map((point) => (
          <li key={point} className="flex items-start gap-2 text-xs text-foreground/70">
            <span className="mt-[5px] w-1 h-1 rounded-full bg-primary/50 shrink-0" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    )}

    <div className="flex flex-wrap gap-1 mb-3">
      {article.tags.slice(0, 4).map((tag) => (
        <span
          key={tag}
          className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground border border-line px-1.5 py-0.5 rounded"
        >
          {tag}
        </span>
      ))}
    </div>

    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
      Read essay
      <ArrowRight
        size={12}
        className="group-hover:translate-x-0.5 transition-transform"
        aria-hidden
      />
    </span>
  </Link>
);

export default ArticleCard;
