import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ArticleSection } from "@/data/articles";

interface ArticleTableOfContentsProps {
  sections: ArticleSection[];
  className?: string;
}

const ArticleTableOfContents = ({ sections, className }: ArticleTableOfContentsProps) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el != null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const linkList = (
    <ul className="space-y-1">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "block text-sm py-1.5 pl-3 border-l-2 transition-colors leading-snug",
              activeId === section.id
                ? "border-primary text-foreground font-medium"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
            )}
            aria-current={activeId === section.id ? "location" : undefined}
          >
            {section.heading}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className={cn("lg:hidden mb-10", className)}>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground border border-line rounded-sm px-4 py-3 hover:text-foreground transition-colors"
          aria-expanded={mobileOpen}
          aria-controls="article-toc-mobile"
        >
          On this page
          <span aria-hidden>{mobileOpen ? "−" : "+"}</span>
        </button>
        {mobileOpen && (
          <nav
            id="article-toc-mobile"
            aria-label="Table of contents"
            className="mt-3 border border-line rounded-sm p-4 bg-card/30"
          >
            {linkList}
          </nav>
        )}
      </div>

      <nav
        aria-label="Table of contents"
        className={cn("hidden lg:block", className)}
      >
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
          On this page
        </p>
        {linkList}
      </nav>
    </>
  );
};

export default ArticleTableOfContents;
