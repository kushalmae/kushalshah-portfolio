import type { CaseStudy } from "./types";
import image from "@/assets/case-study-1.jpg";

const caseStudy: CaseStudy = {
  id: "mission-critical-systems",
  label: "Aerospace & Defense",
  title: "Mission-Critical System Leadership",
  image,
  summary: "Led cross-functional technical execution across payload systems, signal processing, and spacecraft operations for high-stakes defense programs.",
  featured: true,
  tags: ["Aerospace", "Architecture"],
  technologies: ["Signal Processing", "Systems Engineering", "Python", "MATLAB", "Interface Control Documents", "Performance Modeling"],
  tldr: {
    problem: "Fragmented technical ownership across payload subsystems caused integration gaps and slow anomaly resolution.",
    solution: "Established cross-subsystem integration architecture with clear interface contracts and a unified performance analysis framework.",
    impact: "Cut integration anomalies significantly and created reusable architectural patterns adopted across program phases.",
  },
  metrics: [
    { value: "Multi-org", label: "Contractor coordination" },
    { value: "Weeks earlier", label: "Issue detection" },
    { value: "Reusable", label: "Architectural patterns" },
  ],
  context: [
    "Large-scale defense program with multiple payload subsystems",
    "Spans signal processing, radiometry, and classification algorithms",
    "Multiple contractor organizations with competing priorities",
    "Multi-year timeline with evolving requirements and tight compliance",
  ],
  problem: [
    "Fragmented technical ownership across subsystems",
    "Integration gaps between hardware, software, and mission assurance",
    "Slow anomaly resolution and inconsistent performance analysis",
    "No single technical perspective spanned the full signal chain",
  ],
  constraints: [
    "Classified environment with strict information boundaries",
    "Hardware-software interdependencies across organizations",
    "Rigid schedule milestones with non-negotiable delivery dates",
    "Legacy systems that couldn't be easily modified",
  ],
  role: [
    "Technical lead for cross-subsystem integration",
    "Owner of performance analysis and architectural decisions",
    "Connective tissue between hardware, software, and mission assurance",
  ],
  approach: [
    "Mapped every subsystem interface and cross-boundary failure modes",
    "Established shared performance metrics across teams",
    "Created structured technical reviews to surface issues early",
    "Built repeatable analysis workflows from ad-hoc troubleshooting",
  ],
  solution: [
    "Integration architecture with clear interface contracts",
    "Performance analysis framework correlating data across signal chain",
    "Technical review cadence catching issues weeks earlier",
  ],
  impact: [
    "Reduced integration-related anomalies significantly",
    "Improved cross-team technical communication and trust",
    "Architectural patterns reused across subsequent program phases",
    "Built institutional knowledge that survived personnel transitions",
  ],
  insight: "Complex systems fail at their boundaries. The architect's job is to make those boundaries visible, manageable, and owned — before they become the source of the next critical anomaly.",
};

export default caseStudy;
