export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  label: string;
  title: string;
  image: string;
  summary: string;
  featured?: boolean;
  tags: string[];
  technologies: string[];
  tldr: {
    problem: string;
    solution: string;
    impact: string;
  };
  metrics: CaseStudyMetric[];
  context: string[];
  problem: string[];
  constraints: string[];
  role: string[];
  approach: string[];
  solution: string[];
  impact: string[];
  insight: string;
  relatedArticle?: { slug: string; label: string };
  githubUrl?: string;
}
