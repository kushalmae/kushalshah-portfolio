import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  path: string;
  /** Other paths that should mark this item as active. */
  match?: string[];
}

const primaryNav: NavItem[] = [
  { label: "Work", path: "/work" },
  { label: "Thinking", path: "/thinking" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const moreNav: NavItem[] = [
  { label: "Code", path: "/code", match: ["/projects"] },
  { label: "Books", path: "/books" },
  { label: "Mental Models", path: "/mental-models", match: ["/books#mental-models"] },
  { label: "Speaking", path: "/speaking" },
  { label: "Resume", path: "/resume" },
];

const isActive = (pathname: string, item: NavItem) => {
  if (pathname === item.path) return true;
  if (pathname.startsWith(item.path + "/")) return true;
  return (item.match ?? []).some(
    (m) => pathname === m || pathname.startsWith(m + "/")
  );
};

const moreIsActive = (pathname: string) =>
  moreNav.some((item) => isActive(pathname, item));

const SiteHeader = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass = (active: boolean) =>
    cn(
      "text-xs tracking-widest uppercase transition-colors",
      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b transition-all duration-300",
        scrolled
          ? "border-line shadow-[0_1px_20px_0_hsl(0_0%_0%/0.15)]"
          : "border-transparent"
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Kushal Shah
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {primaryNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={navLinkClass(isActive(location.pathname, item))}
            >
              {item.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "flex items-center gap-1 text-xs tracking-widest uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm",
                moreIsActive(location.pathname)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              More
              <ChevronDown size={12} aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              {moreNav.map((item) => (
                <DropdownMenuItem asChild key={item.path}>
                  <Link
                    to={item.path}
                    className="cursor-pointer text-xs tracking-widest uppercase"
                  >
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
            suppressHydrationWarning
          >
            {mounted ? (
              resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />
            ) : (
              <Sun size={16} className="opacity-0" aria-hidden />
            )}
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-line bg-background">
          <div className="container py-6 flex flex-col gap-4">
            {primaryNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm tracking-widest uppercase transition-colors",
                  isActive(location.pathname, item)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-line my-2" />
            {moreNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "text-sm tracking-widest uppercase transition-colors",
                  isActive(location.pathname, item)
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default SiteHeader;
