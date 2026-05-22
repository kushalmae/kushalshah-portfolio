import { useMemo, useState, useId } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SectionLabel from "@/components/SectionLabel";
import Reveal from "@/components/Reveal";
import ArticleCard from "@/components/ArticleCard";
import {
  articles,
  ALL_ARTICLE_TAGS,
  ARTICLE_TOPICS,
  START_HERE_SLUGS,
  groupByTopic,
  getSeriesArticles,
} from "@/data/articles";
import type { ArticleTopic } from "@/data/articles";
import { cn } from "@/lib/utils";

const topicDescriptions: Record<ArticleTopic, string> = {
  "Space Architecture":
    "Proliferated LEO architecture, tranches, and layered mission space systems.",
  "Spacecraft Systems": "Budgets, orbits, propulsion, and the engineering trade space on orbit.",
  Communications: "RF links, protocols, COP-1, and link security for spacecraft.",
  "Threat Engagement":
    "Kill chains, timing budgets, and architecture under operational constraints.",
  Platform: "GitOps, cloud automation, and internal tooling as systems design.",
};

const matchesSearch = (query: string, title: string, description: string, tags: string[]) => {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [title, description, ...tags].join(" ").toLowerCase();
  return haystack.includes(q);
};

const Thinking = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get("tag");
  const activeTopic = searchParams.get("topic") as ArticleTopic | null;
  const activeSeries = searchParams.get("series");
  const [searchQuery, setSearchQuery] = useState("");
  const searchId = useId();
  const listId = useId();

  const startHereArticles = useMemo(
    () =>
      START_HERE_SLUGS.flatMap((slug) => {
        const article = articles.find((a) => a.slug === slug);
        return article ? [article] : [];
      }),
    []
  );

  const filtered = useMemo(() => {
    let list = [...articles];
    if (activeTag) list = list.filter((a) => a.tags.includes(activeTag));
    if (activeTopic && ARTICLE_TOPICS.includes(activeTopic)) {
      list = list.filter((a) => a.topic === activeTopic);
    }
    if (activeSeries) list = list.filter((a) => a.series?.id === activeSeries);
    if (searchQuery.trim()) {
      list = list.filter((a) =>
        matchesSearch(searchQuery, a.title, a.description, a.tags)
      );
    }
    return list;
  }, [activeTag, activeTopic, activeSeries, searchQuery]);

  const showTopicSections =
    !activeTag && !activeTopic && !activeSeries && !searchQuery.trim();
  const byTopic = useMemo(() => groupByTopic(filtered), [filtered]);

  const setTag = (tag: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (tag) next.set("tag", tag);
    else next.delete("tag");
    next.delete("series");
    next.delete("topic");
    setSearchParams(next, { replace: true });
  };

  const setSeries = (seriesId: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (seriesId) next.set("series", seriesId);
    else next.delete("series");
    next.delete("tag");
    next.delete("topic");
    setSearchParams(next, { replace: true });
  };

  const clearFilters = () => {
    setSearchParams({}, { replace: true });
    setSearchQuery("");
  };

  const seriesGroups = useMemo(() => {
    const ids = [...new Set(articles.map((a) => a.series?.id).filter(Boolean))] as string[];
    return ids.map((id) => ({
      id,
      title: getSeriesArticles(articles, id)[0]?.series?.title ?? id,
      count: getSeriesArticles(articles, id).length,
    }));
  }, []);

  return (
    <PageLayout title="Thinking">
      <a
        href="#article-list"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-3 focus:py-2 focus:bg-background focus:border focus:border-line focus:rounded-sm focus:text-sm"
      >
        Skip to articles
      </a>

      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <Reveal>
            <SectionLabel>Thinking</SectionLabel>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
              Writing on systems, strategy, and structure.
            </h1>
            <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              Essays on technical architecture, systems design, and the intersection of
              engineering leadership and software leverage.
            </p>
          </Reveal>

          {/* Start here */}
          <Reveal delay={40}>
            <section aria-labelledby="start-here-heading" className="mb-14">
              <h2
                id="start-here-heading"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary mb-4"
              >
                Start here
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                New to this collection? Three entry points — one breadth piece on spacecraft
                budgets, one proliferated space architecture overview, one platform operating model.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {startHereArticles.map((article) =>
                  article ? (
                    <ArticleCard key={article.slug} article={article} compact />
                  ) : null
                )}
              </div>
            </section>
          </Reveal>

          {/* Series quick links */}
          <Reveal delay={60}>
            <div className="mb-8">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                Multi-part series
              </p>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by series">
                {seriesGroups.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() =>
                      setSeries(activeSeries === s.id ? null : s.id)
                    }
                    aria-pressed={activeSeries === s.id}
                    className={cn(
                      "font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors",
                      activeSeries === s.id
                        ? "bg-foreground text-background border-foreground"
                        : "border-line text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                    )}
                  >
                    {s.title} ({s.count})
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Search */}
          <Reveal delay={80}>
            <div className="mb-6 max-w-md">
              <label htmlFor={searchId} className="sr-only">
                Search articles
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
                  placeholder="Search title, description, or tags…"
                  aria-controls={listId}
                  className="w-full pl-9 pr-4 py-2.5 text-sm bg-card border border-line rounded-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-muted-foreground/50 transition-colors"
                />
              </div>
            </div>
          </Reveal>

          {/* Tag filters */}
          <Reveal delay={100}>
            <nav aria-label="Filter articles by tag" className="flex flex-wrap items-center gap-1.5 mb-10">
              <button
                type="button"
                onClick={() => setTag(null)}
                aria-pressed={activeTag === null}
                className={cn(
                  "font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors",
                  activeTag === null && !activeSeries
                    ? "bg-foreground text-background border-foreground"
                    : "border-line text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                )}
              >
                All
              </button>
              {ALL_ARTICLE_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setTag(activeTag === tag ? null : tag)}
                  aria-pressed={activeTag === tag}
                  className={cn(
                    "font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors",
                    activeTag === tag
                      ? "bg-foreground text-background border-foreground"
                      : "border-line text-muted-foreground hover:text-foreground hover:border-muted-foreground/40"
                  )}
                >
                  {tag}
                </button>
              ))}
            </nav>
          </Reveal>

          {(activeTag || activeTopic || activeSeries || searchQuery.trim()) && (
            <div className="flex flex-wrap items-center gap-3 mb-8 text-sm">
              <span className="text-muted-foreground">
                {filtered.length} {filtered.length === 1 ? "essay" : "essays"}
                {activeTopic && (
                  <>
                    {" "}
                    in <span className="text-foreground font-medium">{activeTopic}</span>
                  </>
                )}
                {activeTag && (
                  <>
                    {" "}
                    tagged <span className="text-foreground font-medium">{activeTag}</span>
                  </>
                )}
                {activeSeries && (
                  <>
                    {" "}
                    in{" "}
                    <span className="text-foreground font-medium">
                      {seriesGroups.find((s) => s.id === activeSeries)?.title}
                    </span>
                  </>
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

          <div id="article-list">
            {filtered.length === 0 ? (
              <p className="text-muted-foreground text-center py-16 text-sm">
                No essays match your filters.{" "}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-primary hover:underline"
                >
                  Clear filters
                </button>
              </p>
            ) : showTopicSections ? (
              <div className="space-y-16">
                {ARTICLE_TOPICS.map((topic) => {
                  const topicArticles = byTopic.get(topic) ?? [];
                  if (topicArticles.length === 0) return null;
                  const sectionId = topic.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <section key={topic} id={sectionId} aria-labelledby={`${sectionId}-heading`}>
                      <Reveal>
                        <h2
                          id={`${sectionId}-heading`}
                          className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2"
                        >
                          {topic}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
                          {topicDescriptions[topic]}
                        </p>
                      </Reveal>
                      <div
                        id={listId}
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
                      >
                        {topicArticles.map((article, i) => (
                          <Reveal key={article.slug} delay={i * 30}>
                            <ArticleCard article={article} />
                          </Reveal>
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              <div
                id={listId}
                className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 animate-fade-in"
              >
                {filtered.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 30}>
                    <ArticleCard article={article} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>

          {/* Topic jump nav when browsing all */}
          {showTopicSections && (
            <Reveal delay={120}>
              <nav
                aria-label="Jump to topic"
                className="mt-20 pt-10 border-t border-line"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
                  Jump to topic
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {ARTICLE_TOPICS.map((topic) => (
                    <li key={topic}>
                      <a
                        href={`#${topic.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </Reveal>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Thinking;
