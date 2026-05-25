import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Projects = lazy(() => import("./pages/Projects"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const Thinking = lazy(() => import("./pages/Thinking"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const Books = lazy(() => import("./pages/Books"));
const BookPage = lazy(() => import("./pages/BookPage"));
const MentalModelPage = lazy(() => import("./pages/MentalModelPage"));
const Resume = lazy(() => import("./pages/Resume"));
const Contact = lazy(() => import("./pages/Contact"));
const Speaking = lazy(() => import("./pages/Speaking"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

/** Lightweight fallback for the lazy boundary. Keeps the visual height stable
 * so the layout doesn't jump while the next chunk loads. */
const RouteFallback = () => (
  <div className="min-h-[60vh]" aria-hidden />
);

/** Redirect that preserves the dynamic `:slug` from the old URL. */
const SlugRedirect = ({ to }: { to: (slug: string) => string }) => {
  const slug = window.location.pathname.split("/").filter(Boolean).pop() ?? "";
  return <Navigate to={to(slug)} replace />;
};

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ErrorBoundary>
            <BrowserRouter>
              <ScrollToTop />
              <PageTransition>
                <Suspense fallback={<RouteFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/work/:id" element={<CaseStudyPage />} />
                    <Route path="/code" element={<Projects />} />
                    {/* Legacy alias — /projects predates the Code rename. */}
                    <Route
                      path="/projects"
                      element={<Navigate to="/code" replace />}
                    />
                    <Route path="/thinking" element={<Thinking />} />
                    <Route path="/thinking/:slug" element={<ArticlePage />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/books/:slug" element={<BookPage />} />
                    <Route
                      path="/mental-models/:slug"
                      element={<MentalModelPage />}
                    />
                    {/* Legacy alias — mental models used to live under /books/models. */}
                    <Route
                      path="/books/models/:slug"
                      element={<SlugRedirect to={(s) => `/mental-models/${s}`} />}
                    />
                    <Route path="/speaking" element={<Speaking />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </PageTransition>
            </BrowserRouter>
          </ErrorBoundary>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
