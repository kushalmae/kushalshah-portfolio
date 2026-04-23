import { useEffect } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import BackToTop from "./BackToTop";
import { site } from "@/config/site";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.title;
    return () => { document.title = site.title; };
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-16">{children}</main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
};

export default PageLayout;
