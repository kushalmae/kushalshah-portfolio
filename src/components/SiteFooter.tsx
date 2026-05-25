import { Link } from "react-router-dom";
import { site } from "@/config/site";

const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "Work", to: "/work" },
      { label: "Thinking", to: "/thinking" },
      { label: "Code", to: "/code" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Books", to: "/books" },
      { label: "Mental Models", to: "/books#mental-models" },
      { label: "Resume", to: "/resume" },
      { label: "Now", to: "/now" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "GitHub", href: site.github },
      { label: "LinkedIn", href: site.linkedin },
    ],
  },
];

const SiteFooter = () => (
  <footer className="border-t border-line py-12 md:py-16">
    <div className="container grid gap-10 md:grid-cols-[1.4fr_2fr]">
      <div className="max-w-md">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          {site.name}
        </Link>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Systems architecture, mission operations, and technical strategy for
          aerospace and mission-critical software.
        </p>
        <p className="mt-6 text-xs text-muted-foreground tracking-wide">
          © {new Date().getFullYear()} {site.name} — All rights reserved.
        </p>
      </div>

      <nav
        aria-label="Footer navigation"
        className="grid grid-cols-2 sm:grid-cols-3 gap-8"
      >
        {footerSections.map((section) => (
          <div key={section.title}>
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
              {section.title}
            </h2>
            <ul className="space-y-3">
              {section.links.map((link) => (
                <li key={link.label}>
                  {"href" in link ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground tracking-wide uppercase transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-xs text-muted-foreground hover:text-foreground tracking-wide uppercase transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  </footer>
);

export default SiteFooter;
