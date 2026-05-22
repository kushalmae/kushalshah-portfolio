export type { GitHubProject, GitHubProjectTag } from "./types";

import type { GitHubProject, GitHubProjectTag } from "./types";

export const GITHUB_PROJECT_TAGS: GitHubProjectTag[] = [
  "Aerospace",
  "Platform",
  "AI",
  "Automation",
  "Web",
];

export const githubProjects: GitHubProject[] = [
  {
    slug: "opscon-repo",
    name: "SatOps — Operations Console",
    repo: "opscon-repo",
    description:
      "Django-based satellite operations framework: procedure execution, anomaly tracking, shift logs, FDIR handbooks, and multi-mission tenancy with CI/CD to Fly.io.",
    url: "https://github.com/kushalmae/opscon-repo",
    language: "Python",
    tags: ["Aerospace", "Platform"],
    featured: true,
    caseStudyId: "satops-procedure-tool",
  },
  {
    slug: "posgres_grafana_project",
    name: "Spacecraft Telemetry Pipeline",
    repo: "posgres_grafana_project",
    description:
      "CSV-to-PostgreSQL ingestion with deduplication and Grafana dashboards for near-real-time spacecraft telemetry on Docker Compose.",
    url: "https://github.com/kushalmae/posgres_grafana_project",
    language: "Python",
    tags: ["Aerospace", "Platform"],
    featured: true,
    caseStudyId: "spacecraft-telemetry-pipeline",
  },
  {
    slug: "astra-v2",
    name: "ASTRA v2",
    repo: "ASTRA_V2",
    description:
      "Automated Satellite Threshold Reporting & Alerts: monitor telemetry limits and surface violations for ops teams.",
    url: "https://github.com/kushalmae/ASTRA_V2",
    language: "Python",
    tags: ["Aerospace", "Automation"],
  },
  {
    slug: "grafana_dashboards",
    name: "Grafana Dashboard Toolkit",
    repo: "grafana_dashboards",
    description:
      "Provisioned Grafana dashboard definitions and helpers for spacecraft and subsystem telemetry views.",
    url: "https://github.com/kushalmae/grafana_dashboards",
    language: "Python",
    tags: ["Aerospace", "Platform"],
  },
  {
    slug: "streamlit-cmd-search",
    name: "Command & Telemetry Search",
    repo: "streamlit_CMD_search",
    description:
      "Streamlit app for searching spacecraft command and telemetry catalogs during ops and test campaigns.",
    url: "https://github.com/kushalmae/streamlit_CMD_search",
    language: "Python",
    tags: ["Aerospace", "Automation"],
  },
  {
    slug: "rag-agent",
    name: "RAG Agent",
    repo: "RAG_AGENT",
    description:
      "Retrieval-augmented generation agent for querying technical documents with grounded LLM responses.",
    url: "https://github.com/kushalmae/RAG_AGENT",
    language: "Python",
    tags: ["AI", "Automation"],
    featured: true,
  },
  {
    slug: "proofreading-agent",
    name: "Proofreading Agent",
    repo: "Proofreading_agent2",
    description:
      "AI-assisted document proofreading workflow with a TypeScript frontend deployed on Vercel.",
    url: "https://github.com/kushalmae/Proofreading_agent2",
    homepage: "https://proofreading-agent2.vercel.app",
    language: "TypeScript",
    tags: ["AI", "Web"],
    featured: true,
  }
];

export const featuredGitHubProjects = githubProjects.filter((p) => p.featured);
