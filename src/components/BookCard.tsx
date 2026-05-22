import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Book } from "@/data/books";
import ThemeTag from "@/components/ThemeTag";

interface BookCardProps {
  book: Book;
  activeTag?: string;
}

const BookCard = ({ book, activeTag }: BookCardProps) => (
  <article className="group border border-line rounded-lg hover:border-muted-foreground/30 transition-all duration-300 p-5 md:p-6">
    <Link to={`/books/${book.slug}`} className="block hover:no-underline">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">
          {book.year}
        </span>
        <span className="text-muted-foreground/30" aria-hidden>
          ·
        </span>
        <span className="font-mono text-[9px] tracking-wider uppercase text-muted-foreground">
          {book.readTime}
        </span>
      </div>

      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-1 text-base">
        {book.title}
      </h3>
      <p className="text-xs text-muted-foreground mb-3">{book.author}</p>

      <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
        {book.description}
      </p>

      {book.keyTakeaways.length > 0 && (
        <ul className="space-y-1 mb-4" aria-label="Key takeaways">
          {book.keyTakeaways.slice(0, 2).map((point) => (
            <li key={point} className="flex items-start gap-2 text-xs text-foreground/70">
              <span className="mt-[5px] w-1 h-1 rounded-full bg-primary/50 shrink-0" aria-hidden />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-muted-foreground group-hover:text-foreground transition-colors">
        Read summary
        <ArrowRight
          size={12}
          className="group-hover:translate-x-0.5 transition-transform"
          aria-hidden
        />
      </span>
    </Link>

    <div className="flex flex-wrap gap-0.5 mt-3">
      {book.tags.map((tag) => (
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

export default BookCard;
