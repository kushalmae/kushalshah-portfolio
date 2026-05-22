import type { Article, ArticleContent, ArticleNavigation, ArticleSeries, ArticleTopic } from "./types";

export const articleNavigation: Record<string, ArticleNavigation> = {
  "pwsa-architecture": {
    topic: "Space Architecture",
    series: { id: "pwsa", title: "PWSA", part: 1, total: 3 },
    startHere: true,
    keyTakeaways: [
      "PWSA is a layered LEO architecture — transport, tracking, custody, and ground — delivered in two-year tranches.",
      "SDA's model trades monolithic GEO procurement for proliferation, mesh resilience, and industrial scale.",
    ],
  },
  "pwsa-transport-layer": {
    topic: "Space Architecture",
    series: { id: "pwsa", title: "PWSA", part: 2, total: 3 },
    keyTakeaways: [
      "The Transport Layer is the optical mesh that moves tactical data between satellites and down to the ground.",
      "Link budgets and OISL routing determine latency and survivability under attrition.",
    ],
  },
  "pwsa-tracking-layer": {
    topic: "Space Architecture",
    series: { id: "pwsa", title: "PWSA", part: 3, total: 3 },
    keyTakeaways: [
      "The Tracking Layer closes the fire-control loop from warning to custody on dim targets.",
      "Sensor mix and revisit drive what the mesh can hand off before a threat moves.",
    ],
  },
  "satellite-orbit-types": {
    topic: "Spacecraft Systems",
    keyTakeaways: [
      "Orbit choice is mission architecture — altitude sets revisit, latency, coverage, and link geometry.",
      "LEO, MEO, and GEO trade persistence, cost, and resilience differently for the same mission.",
    ],
  },
  "electric-propulsion-systems": {
    topic: "Spacecraft Systems",
    keyTakeaways: [
      "Electric propulsion trades thrust for Isp — ideal for orbit raise and station-keeping, not fast maneuvers.",
      "Power, thermal, and FDIR constraints dominate EP system design on smallsats.",
    ],
  },
  "spacecraft-power-budgeting": {
    topic: "Spacecraft Systems",
    keyTakeaways: [
      "Power budgets tie solar array, battery, and load profiles across every operating mode.",
      "Eclipse, degradation, and FDIR margins determine whether the bus survives off-nominal cases.",
    ],
  },
  "spacecraft-rf-communications": {
    topic: "Communications",
    series: { id: "spacecraft-comms", title: "Spacecraft Communications", part: 1, total: 4 },
    keyTakeaways: [
      "RF links are budget problems — EIRP, G/T, path loss, and modulation set your margin.",
      "Ground station geometry and Doppler drive what orbit and band you can actually use.",
    ],
  },
  "spacecraft-communication-protocols": {
    topic: "Communications",
    series: { id: "spacecraft-comms", title: "Spacecraft Communications", part: 2, total: 4 },
    keyTakeaways: [
      "Space link protocols stack physical layer, framing, and space-specific reliability mechanisms.",
      "CCSDS conventions are the interoperability layer between agencies and vendors.",
    ],
  },
  "cop-1-protocol": {
    topic: "Communications",
    series: { id: "spacecraft-comms", title: "Spacecraft Communications", part: 3, total: 4 },
    keyTakeaways: [
      "COP-1 FARM adds ACK/NAK and retransmit on top of TM/TC transfer frames.",
      "Sequence control and buffer sizing are where implementations succeed or stall.",
    ],
  },
  "spacecraft-link-security": {
    topic: "Communications",
    series: { id: "spacecraft-comms", title: "Spacecraft Communications", part: 4, total: 4 },
    keyTakeaways: [
      "SDLS and CCSDS SDLP define how space links get authentication and encryption.",
      "Key management and segment boundaries matter as much as the crypto algorithms.",
    ],
  },
  "satellite-engineering-budgets": {
    topic: "Spacecraft Systems",
    startHere: true,
    keyTakeaways: [
      "Mass, power, pointing, and thermal budgets are coupled — change one, revisit all.",
      "Budget methodology is how you prove the spacecraft can close the mission before metal is cut.",
    ],
  },
  "satellite-pointing-budget": {
    topic: "Spacecraft Systems",
    keyTakeaways: [
      "Pointing splits into knowledge, control, and stability — each with distinct error sources.",
      "RSS stacking and on-orbit calibration close the gap between analysis and performance.",
    ],
  },
  "counter-uas-kill-chain-architecture": {
    topic: "Threat Engagement",
    keyTakeaways: [
      "CUAS is a closed-loop timing problem — detect, track, classify, and engage inside the drone's window.",
      "Architecture trades sensor mix, compute placement, and effector latency under fixed SWaP.",
    ],
  },
  "satops-procedure-tool": {
    topic: "Platform",
    keyTakeaways: [
      "Procedure tooling turns tribal satops knowledge into executable, auditable workflows.",
      "The leverage is consistency under contact — not replacing operators, but removing variance.",
    ],
  },
  "gitops": {
    topic: "Platform",
    startHere: true,
    keyTakeaways: [
      "GitOps makes Git the control plane — desired state is reviewed, merged, then reconciled.",
      "Pull-based deploys and drift correction are architectural properties, not CI add-ons.",
    ],
  },
  "gcp-automated-tasking": {
    topic: "Platform",
    keyTakeaways: [
      "Cloud tasking pipelines chain triggers, validation, and execution with explicit failure domains.",
      "Automation architecture should match operational cadence — not every job needs a microservice.",
    ],
  },
};

export const START_HERE_SLUGS = [
  "satellite-engineering-budgets",
  "pwsa-architecture",
  "gitops",
] as const;

export const ALL_ARTICLE_TAGS = [
  "Aerospace",
  "Architecture",
  "Attitude Control",
  "CCSDS",
  "Cloud",
  "Communications",
  "DevOps",
  "FDIR",
  "Internal Tools",
  "Mission Design",
  "Mission Systems",
  "Platform",
  "Power",
  "Propulsion",
  "RF",
  "Security",
  "Sensors",
  "Systems Engineering",
] as const;

export function attachNavigation(content: ArticleContent): Article {
  const nav = articleNavigation[content.slug];
  if (!nav) {
    throw new Error(`Missing navigation metadata for article: ${content.slug}`);
  }
  return {
    ...content,
    topic: content.topic ?? nav.topic,
    series: content.series ?? nav.series,
    startHere: content.startHere ?? nav.startHere,
    keyTakeaways: content.keyTakeaways ?? nav.keyTakeaways,
  };
}

export function getSeriesArticles(articles: Article[], seriesId: string): Article[] {
  return articles
    .filter((a) => a.series?.id === seriesId)
    .sort((a, b) => (a.series?.part ?? 0) - (b.series?.part ?? 0));
}

export function getAdjacentInSeries(
  articles: Article[],
  current: Article
): { prev: Article | null; next: Article | null } {
  if (!current.series) return { prev: null, next: null };
  const series = getSeriesArticles(articles, current.series.id);
  const idx = series.findIndex((a) => a.slug === current.slug);
  if (idx < 0) return { prev: null, next: null };
  return {
    prev: idx > 0 ? series[idx - 1] : null,
    next: idx < series.length - 1 ? series[idx + 1] : null,
  };
}

export function groupByTopic(articles: Article[]): Map<ArticleTopic, Article[]> {
  const map = new Map<ArticleTopic, Article[]>();
  for (const topic of ["Space Architecture", "Spacecraft Systems", "Communications", "Threat Engagement", "Platform"] as ArticleTopic[]) {
    map.set(
      topic,
      articles.filter((a) => a.topic === topic)
    );
  }
  return map;
}

export function getSeriesById(seriesId: string): ArticleSeries | undefined {
  const entry = Object.values(articleNavigation).find((n) => n.series?.id === seriesId);
  return entry?.series;
}
