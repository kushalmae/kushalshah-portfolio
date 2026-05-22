export type GitHubProjectTag =
  | "Aerospace"
  | "Platform"
  | "AI"
  | "Automation"
  | "Web";

export interface GitHubProject {
  slug: string;
  name: string;
  repo: string;
  description: string;
  url: string;
  homepage?: string;
  language: string;
  tags: GitHubProjectTag[];
  featured?: boolean;
  caseStudyId?: string;
}
