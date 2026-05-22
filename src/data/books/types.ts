export interface BookSection {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface Book {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  year: string;
  description: string;
  readTime: string;
  tags: string[];
  intro: string[];
  sections: BookSection[];
  insight: string;
  keyTakeaways: string[];
  mentalModelSlugs: string[];
}

export interface MentalModel {
  slug: string;
  name: string;
  oneLiner: string;
  description: string;
  tags: string[];
  definition: string[];
  whenToUse: string[];
  pitfalls: string[];
  application: string;
  sourceBook?: { slug: string; title: string };
}
