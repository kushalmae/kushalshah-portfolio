import type { CaseStudy } from "./types";
import image from "@/assets/case-study-3.jpg";

const caseStudy: CaseStudy = {
  id: "automation-pipelines",
  label: "Automation",
  title: "Automation Pipelines & Workflow Tooling",
  image,
  summary: "Architected modular Python-based automation that reclaimed hundreds of engineering hours and improved data quality across teams.",
  tags: ["Automation", "Platform"],
  technologies: ["Python", "Pandas", "NumPy", "YAML Config", "Pytest", "CI/CD", "Pluggable Pipelines"],
  tldr: {
    problem: "Engineers lost hours to repetitive analysis and brittle one-off scripts with no shared standards.",
    solution: "Modular, configuration-driven Python pipeline framework with reusable stages and a standard project template.",
    impact: "Reclaimed 60–80% of routine analysis time and improved data quality org-wide.",
  },
  metrics: [
    { value: "60–80%", label: "Time reclaimed" },
    { value: "Hours → mins", label: "New workflow setup" },
    { value: "Org-wide", label: "Pattern adoption" },
  ],
  context: [
    "Engineering teams spent significant time on repetitive analysis",
    "Each team had their own ad-hoc scripts",
    "No shared patterns, standards, or visibility",
  ],
  problem: [
    "Manual workflows were slow and error-prone",
    "Knowledge locked in scripts that broke when authors left",
    "No visibility into pipeline health or data quality",
    "Senior engineers stuck doing data wrangling, not analysis",
  ],
  constraints: [
    "Python-centric environment with strong tool preferences",
    "Must work with existing data formats and legacy systems",
    "Must be maintainable by domain engineers, not just SWEs",
    "No heavy infrastructure dependencies",
  ],
  role: [
    "Architect and lead developer",
    "Established coding patterns and project templates",
    "Mentored teams on sustainable scripting practices",
  ],
  approach: [
    "Modular Python pipelines with clear stage separation",
    "Configuration-driven workflows for new analyses",
    "Documentation and testing standards domain engineers could follow",
  ],
  solution: [
    "Lightweight pipeline framework with pluggable stages",
    "Configuration-driven execution",
    "Built-in logging, error handling, and validation",
    "Standard project template — new workflows in hours, not weeks",
  ],
  impact: [
    "60–80% reduction in routine analysis time",
    "Improved data quality through standardized validation",
    "Reusable patterns adopted organization-wide",
    "Freed senior engineers to focus on interpretation",
  ],
  insight: "Automation isn't about replacing people — it's about giving them back the time to think. The best automation frameworks are invisible to their users.",
};

export default caseStudy;
