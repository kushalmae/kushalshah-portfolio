export interface ArticleTable {
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
  table?: ArticleTable;
  relatedArticle?: { slug: string; label: string };
  diagramId?: string;
}

export interface ArticleFeaturedWork {
  title: string;
  org: string;
  year: string;
  type: string;
  role: string;
  highlights: string[];
}

export interface ArticleAttachment {
  url: string;
  label: string;
  downloadFilename?: string;
}

export interface ArticleSeries {
  id: string;
  title: string;
  part: number;
  total: number;
}

export type ArticleTopic =
  | "Space Architecture"
  | "Spacecraft Systems"
  | "Communications"
  | "Threat Engagement"
  | "Platform";

export interface ArticleNavigation {
  topic: ArticleTopic;
  series?: ArticleSeries;
  startHere?: boolean;
  keyTakeaways: string[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  intro: string[];
  sections: ArticleSection[];
  featuredWork?: ArticleFeaturedWork[];
  attachment?: ArticleAttachment;
  insight: string;
  topic: ArticleTopic;
  series?: ArticleSeries;
  startHere?: boolean;
  keyTakeaways: string[];
}

/** Article body without index/navigation fields (filled by attachNavigation). */
export type ArticleContent = Omit<Article, "topic" | "startHere" | "keyTakeaways"> & {
  topic?: ArticleTopic;
  series?: ArticleSeries;
  startHere?: boolean;
  keyTakeaways?: string[];
};

export const ARTICLE_TOPICS: ArticleTopic[] = [
  "Space Architecture",
  "Spacecraft Systems",
  "Communications",
  "Threat Engagement",
  "Platform",
];
