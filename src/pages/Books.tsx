import { useMemo, useState, useId } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import BookCard from "@/components/BookCard";
import MentalModelCard from "@/components/MentalModelCard";
import ThemeTag from "@/components/ThemeTag";
import { books, mentalModels, ALL_THEME_TAGS, itemHasThemeTag } from "@/data/books";
import { cn } from "@/lib/utils";

const matchesSearch = (query: string, ...fields: string[]) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.join(" ").toLowerCase().includes(q);
};

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");
  const [searchQuery, setSearchQuery] = useState("");
  const searchId = useId();

  const setTag = (tag: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (tag) next.set("tag", tag);
    else next.delete("tag");
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
    setSearchQuery("");
  };

  const filteredBooks = useMemo(() => {
    let list = [...books];
    if (activeTag) list = list.filter((b) => itemHasThemeTag(b.tags, activeTag));
    if (searchQuery.trim()) {
      list = list.filter((b) =>
        matchesSearch(searchQuery, b.title, b.author, b.description, ...b.tags)
      );
    }
    return list;
  }, [activeTag, searchQuery]);

  const filteredModels = useMemo(() => {
    let list = [...mentalModels];
    if (activeTag) list = list.filter((m) => itemHasThemeTag(m.tags, activeTag));
    if (searchQuery.trim()) {
      list = list.filter((m) =>
        matchesSearch(
          searchQuery,
          m.name,
          m.oneLiner,
          m.description,
          ...m.tags,
          m.sourceBook?.title ?? ""
        )
      );
    }
    return list;
  }, [activeTag, searchQuery]);

  const totalMatches = filteredBooks.length + filteredModels.length;
  const hasFilters = Boolean(activeTag || searchQuery.trim());

  return (
    <PageLayout title="Books & Mental Models">
      <a
        href="#book-list"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-background focus:border focus:border-line focus:rounded-sm focus:text-sm"
      >
        Skip to content
      </a>

      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <Reveal>
            <SectionLabel>Books & Mental Models</SectionLabel>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
              Summaries, frameworks, and tools for thinking.
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              Book notes distilled into actionable mental models — the same epistemology as
              systems engineering, applied to learning, leadership, and career design.
            </p>
          </Reveal>

          <Reveal delay={40}>
            <nav
              aria-label="Filter by theme"
              className="flex flex-wrap items-center gap-1 mb-6"
            >
              <button
                type="button"
                onClick={() => setTag(null)}
                aria-pressed={activeTag === null}
                className={cn(
                  "font-mono text-[8px] tracking-wider uppercase px-1.5 py-px rounded-sm border transition-colors",
                  activeTag === null
                    ? "bg-foreground text-background border-foreground"
                    : "border-line/80 text-muted-foreground/80 hover:text-foreground hover:border-muted-foreground/40"
                )}
              >
                All
              </button>
              {ALL_THEME_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTag(activeTag === tag ? null : tag)}
                  aria-pressed={activeTag === tag}
                  className={cn(
                    "font-mono text-[8px] tracking-wider uppercase px-1.5 py-px rounded-sm border transition-colors",
                    activeTag === tag
                      ? "bg-foreground text-background border-foreground"
                      : "border-line/80 text-muted-foreground/80 hover:text-foreground hover:border-muted-foreground/40"
                  )}
                >
                  {tag}
                </button>
              ))}
            </nav>
          </Reveal>

          <Reveal delay={60}>
            <div className="mb-10 max-w-md">
              <label htmlFor={searchId} className="sr-only">
                Search books and models
              </label>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  aria-hidden
                />
                <input
                  id={searchId}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search titles, authors, models…"
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-line rounded-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-muted-foreground/50 transition-colors"
                />
              </div>
            </div>
          </Reveal>

          {hasFilters && (
            <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
              <span className="text-muted-foreground">
                {totalMatches} {totalMatches === 1 ? "item" : "items"}
                {activeTag && (
                  <>
                    {" "}
                    tagged{" "}
                    <span className="text-foreground font-medium">{activeTag}</span>
                  </>
                )}
                {searchQuery.trim() && activeTag && " · "}
                {searchQuery.trim() && (
                  <span className="text-foreground font-medium">
                    matching &ldquo;{searchQuery.trim()}&rdquo;
                  </span>
                )}
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="font-mono text-[10px] tracking-wider uppercase text-primary hover:text-primary/80 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}

          <div id="book-list" className="space-y-20">
            <section aria-labelledby="books-heading">
              <Reveal>
                <h2
                  id="books-heading"
                  className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2"
                >
                  Book summaries
                  {activeTag && (
                    <span className="text-muted-foreground font-normal text-lg ml-2">
                      · {activeTag}
                    </span>
                  )}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                  {activeTag
                    ? `Books tagged with ${activeTag} — click a theme to explore related summaries and models.`
                    : "Long-form notes on books worth revisiting — structured like technical essays, optimized for recall and application."}
                </p>
              </Reveal>

              {filteredBooks.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8">
                  No books match your filters.{" "}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {filteredBooks.map((book, i) => (
                    <Reveal key={book.slug} delay={i * 30}>
                      <BookCard book={book} activeTag={activeTag ?? undefined} />
                    </Reveal>
                  ))}
                </div>
              )}
            </section>

            <section aria-labelledby="models-heading" id="mental-models">
              <Reveal>
                <h2
                  id="models-heading"
                  className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2"
                >
                  Mental models
                  {activeTag && (
                    <span className="text-muted-foreground font-normal text-lg ml-2">
                      · {activeTag}
                    </span>
                  )}
                </h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                  {activeTag
                    ? `Models tagged with ${activeTag} — frameworks you can apply independently of the book summaries.`
                    : "Portable abstractions extracted from reading and practice — each with definition, when to use it, pitfalls, and a concrete application prompt."}
                </p>
              </Reveal>

              {filteredModels.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8">
                  No models match your filters.{" "}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </p>
              ) : (
                <div
                  className={cn(
                    "grid gap-3 md:gap-4",
                    filteredModels.length === 1
                      ? "grid-cols-1 max-w-xl"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                  )}
                >
                  {filteredModels.map((model, i) => (
                    <Reveal key={model.slug} delay={i * 30}>
                      <MentalModelCard model={model} activeTag={activeTag ?? undefined} />
                    </Reveal>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Books;
