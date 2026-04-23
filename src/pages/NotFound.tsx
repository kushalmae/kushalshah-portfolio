import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "404 — Page Not Found";
    console.error("404: User attempted to access non-existent route:", location.pathname);
    return () => { document.title = "Kushal Shah — Systems Architect & Technical Strategist"; };
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">404</p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-3">Page not found.</h1>
        <p className="text-muted-foreground mb-8 text-sm">That route doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground tracking-widest uppercase transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
