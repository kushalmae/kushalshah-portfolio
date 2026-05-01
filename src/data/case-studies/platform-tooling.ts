import type { CaseStudy } from "./types";
import image from "@/assets/case-study-2.jpg";

const caseStudy: CaseStudy = {
  id: "platform-tooling",
  label: "Platform Design",
  title: "Load & Alarm Visibility Platform",
  image,
  summary: "Designed and led development of internal tooling for real-time system monitoring, anomaly detection, and operational decision support.",
  featured: true,
  tags: ["Platform", "Internal Tools", "Architecture"],
  technologies: ["Python", "React", "TypeScript", "PostgreSQL", "Time-Series DB", "WebSockets", "Event Correlation"],
  tldr: {
    problem: "Operators relied on spreadsheets and noisy alarms with no unified view of system health.",
    solution: "Layered platform separating ingestion, alarm correlation, and task-aware visualization with progressive disclosure.",
    impact: "Became the single source of truth for system health and meaningfully reduced alarm noise.",
  },
  metrics: [
    { value: "1", label: "Source of truth" },
    { value: "↓ Noise", label: "Correlated alarms" },
    { value: "Real-time", label: "Decision support" },
  ],
  context: [
    "Operations teams relied on manual processes and spreadsheets",
    "Fragmented data sources for monitoring system loads and alarms",
    "Critical decisions made with incomplete information",
  ],
  problem: [
    "No unified view of system health",
    "Alarm fatigue from noisy, uncorrelated alerts",
    "Critical anomalies buried in operational noise",
    "Engineers spent more time finding data than analyzing it",
  ],
  constraints: [
    "Legacy data infrastructure that couldn't be replaced",
    "Limited engineering resources for tooling",
    "Must integrate with existing workflows without disruption",
    "Must support both real-time monitoring and historical analysis",
  ],
  role: [
    "System designer and technical lead",
    "Defined platform architecture and data model",
    "Drove adoption across operational teams",
  ],
  approach: [
    "Rejected the typical 'another dashboard' approach",
    "Designed a layered architecture: ingestion, processing, visualization",
    "Prioritized alarm correlation over raw alerting",
    "Built progressive disclosure into every view",
  ],
  solution: [
    "Data ingestion service normalizing inputs from disparate sources",
    "Processing engine correlating alarms with operational context",
    "Visualization layer adapting to operator's current task",
  ],
  impact: [
    "Unified operational visibility across siloed systems",
    "Reduced alarm noise via correlated event clusters",
    "Faster, higher-confidence anomaly resolution",
    "Became the single source of truth for system health",
  ],
  insight: "The hardest part of platform design isn't the technology — it's designing for the decision the operator needs to make. The tool should think the way the user thinks.",
};

export default caseStudy;
