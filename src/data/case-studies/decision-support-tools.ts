import type { CaseStudy } from "./types";
import image from "@/assets/case-study-5.jpg";

const caseStudy: CaseStudy = {
  id: "decision-support-tools",
  label: "Internal Tools",
  title: "Decision-Support & Performance Tools",
  image,
  summary: "Designed internal tools that encoded institutional knowledge into operational workflows, replacing tribal knowledge with systematic analysis.",
  tags: ["Internal Tools", "Aerospace"],
  technologies: ["Python", "React", "D3.js", "Time-Series Analysis", "PostgreSQL", "Workflow Design", "UX Research"],
  tldr: {
    problem: "Anomaly investigation depended on tribal knowledge and manual data correlation across siloed systems.",
    solution: "Workflow-aware tool suite with progressive disclosure and unified cross-subsystem analysis views.",
    impact: "Cut anomaly investigation from hours to minutes and standardized assessments across analysts.",
  },
  metrics: [
    { value: "Hours → mins", label: "Investigation time" },
    { value: "Standardized", label: "Analyst assessments" },
    { value: "Encoded", label: "Institutional knowledge" },
  ],
  context: [
    "Technical teams needed better tools for anomaly investigation",
    "Existing approaches relied on individual expertise",
    "Manual data correlation across siloed systems",
  ],
  problem: [
    "Analysts relied on spreadsheets and tribal knowledge",
    "No systematic way to correlate performance across subsystems",
    "Analytical methods left when key personnel left",
  ],
  constraints: [
    "Diverse data sources with inconsistent formats and cadences",
    "Mixed user expertise — domain experts to software engineers",
    "Must support both quick-look and deep-dive workflows",
  ],
  role: [
    "Product owner and technical lead",
    "Defined requirements through analyst workflow observation",
    "Designed UX, led development, iterated on operational feedback",
  ],
  approach: [
    "Designed tools around analyst workflows, not data structures",
    "Progressive disclosure — summaries by default, detail on demand",
    "Unified cross-subsystem views matching investigation patterns",
  ],
  solution: [
    "Quick-look dashboard for routine monitoring",
    "Correlation engine for cross-subsystem investigation",
    "Trending platform for long-term performance assessment",
    "Shared common data layer across all tools",
  ],
  impact: [
    "Anomaly investigation: hours → minutes",
    "Improved consistency of assessments across analysts",
    "Reduced dependence on individual expertise",
    "Became the standard analytical environment",
  ],
  insight: "Internal tools should encode institutional knowledge, not just display data. The best tools make the right analysis the easy analysis.",
};

export default caseStudy;
