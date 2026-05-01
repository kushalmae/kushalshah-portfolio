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
  insight: string;
}
