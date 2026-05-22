import type { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { booksTagUrl } from "@/data/books";
import type { BookTheme } from "@/data/books";

interface ThemeTagProps {
  tag: BookTheme;
  active?: boolean;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

const ThemeTag = ({ tag, active, className, onClick }: ThemeTagProps) => (
  <Link
    to={booksTagUrl(tag)}
    onClick={onClick}
    className={cn(
      "font-mono text-[8px] tracking-wider uppercase border rounded-sm px-1.5 py-px transition-colors hover:no-underline",
      active
        ? "bg-foreground text-background border-foreground"
        : "text-muted-foreground/80 border-line/80 hover:text-foreground hover:border-muted-foreground/40",
      className
    )}
    aria-current={active ? "true" : undefined}
  >
    {tag}
  </Link>
);

export default ThemeTag;
