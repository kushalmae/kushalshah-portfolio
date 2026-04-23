import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  label: string;
}

interface Props {
  items: TOCItem[];
}

const CaseStudyTOC = ({ items }: Props) => {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Case study sections"
      className="hidden lg:block fixed top-1/2 -translate-y-1/2 right-6 xl:right-10 z-30"
    >
      <ul className="space-y-2">
        {items.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                className="group flex items-center gap-3 justify-end"
              >
                <span
                  className={`font-mono text-[10px] tracking-[0.18em] uppercase transition-all ${
                    isActive
                      ? "text-foreground opacity-100 translate-x-0"
                      : "text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`block h-px transition-all ${
                    isActive
                      ? "w-8 bg-primary"
                      : "w-4 bg-line group-hover:w-6 group-hover:bg-foreground/50"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CaseStudyTOC;
