import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { MentalModel } from "@/data/books";
import ThemeTag from "@/components/ThemeTag";

interface MentalModelCardProps {
  model: MentalModel;
  activeTag?: string;
}

const MentalModelCard = ({ model, activeTag }: MentalModelCardProps) => (
  <article className="group border border-line rounded-lg hover:border-muted-foreground/30 transition-all duration-300 p-5">
    <Link to={`/mental-models/${model.slug}`} className="block hover:no-underline">
      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 text-base">
        {model.name}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {model.oneLiner}
      </p>

      {model.sourceBook && (
        <p className="text-xs text-muted-foreground/80 mb-3">
          From{" "}
          <span className="text-foreground/70">{model.sourceBook.title}</span>
        </p>
      )}

      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
        Explore model
        <ArrowRight
          size={12}
          className="group-hover:translate-x-0.5 transition-transform"
          aria-hidden
        />
      </span>
    </Link>

    <div className="flex flex-wrap gap-0.5 mt-3">
      {model.tags.map((tag) => (
        <ThemeTag
          key={tag}
          tag={tag}
          active={activeTag === tag}
          onClick={(e) => e.stopPropagation()}
        />
      ))}
    </div>
  </article>
);

export default MentalModelCard;
