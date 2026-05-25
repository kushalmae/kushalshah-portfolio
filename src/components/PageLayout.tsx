import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import BackToTop from "./BackToTop";

interface PageLayoutProps {
  children: React.ReactNode;
  /** @deprecated Title is now set per-page via the `Seo` component. Kept on the
   * interface to avoid touching every existing caller; safe to drop later. */
  title?: string;
}

const PageLayout = (props: PageLayoutProps) => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1 pt-16">{props.children}</main>
    <SiteFooter />
    <BackToTop />
  </div>
);

export default PageLayout;
