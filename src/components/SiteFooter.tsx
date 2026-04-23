import { Link } from "react-router-dom";
import { site } from "@/config/site";

const SiteFooter = () => (
  <footer className="border-t border-line py-12">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground tracking-wide">
        © {new Date().getFullYear()} {site.name} — All rights reserved.
      </p>
      <div className="flex gap-6">
        <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground tracking-wide uppercase transition-colors">
          Contact
        </Link>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground tracking-wide uppercase transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
