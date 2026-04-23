import caseStudy1 from "@/assets/case-study-1.jpg";
import caseStudy2 from "@/assets/case-study-2.jpg";
import caseStudy3 from "@/assets/case-study-3.jpg";
import caseStudy4 from "@/assets/case-study-4.jpg";
import caseStudy5 from "@/assets/case-study-5.jpg";
import caseStudy6 from "@/assets/case-study-6.jpg";

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
}

export const ALL_TAGS = [
  "Aerospace",
  "Platform",
  "Automation",
  "Architecture",
  "Internal Tools",
  "Strategy",
] as const;

export const caseStudies: CaseStudy[] = [
  {
    id: "mission-critical-systems",
    label: "Aerospace & Defense",
    title: "Mission-Critical System Leadership",
    image: caseStudy1,
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
  },
  {
    id: "platform-tooling",
    label: "Platform Design",
    title: "Load & Alarm Visibility Platform",
    image: caseStudy2,
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
  },
  {
    id: "automation-pipelines",
    label: "Automation",
    title: "Automation Pipelines & Workflow Tooling",
    image: caseStudy3,
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
  },
  {
    id: "api-microservices",
    label: "Software Architecture",
    title: "API & Microservice Design",
    image: caseStudy4,
    summary: "Led the transition from monolithic internal tools to a standardized, service-oriented architecture with API-first design principles.",
    tags: ["Architecture", "Platform"],
    technologies: ["OpenAPI / Swagger", "REST", "Python", "Node.js", "API Gateway", "Domain-Driven Design", "Docker"],
    tldr: {
      problem: "Tightly coupled systems and ad-hoc integrations made every change risky and slow.",
      solution: "API-first architecture with domain-driven service boundaries and shared OpenAPI contracts.",
      impact: "Cut integration time from weeks to days and enabled independent team deployment.",
    },
    metrics: [
      { value: "Weeks → days", label: "Integration time" },
      { value: "Independent", label: "Team deployments" },
      { value: "Org-wide", label: "API standards" },
    ],
    context: [
      "Organization transitioning from monolith to service-oriented",
      "Multiple teams building overlapping capabilities",
      "No shared contracts or standards across teams",
    ],
    problem: [
      "Tightly coupled systems made changes risky and slow",
      "No standardized API contracts — every integration custom",
      "Integration between teams ad-hoc and fragile",
      "New features required coordinated multi-system deploys",
    ],
    constraints: [
      "Existing systems couldn't be replaced overnight",
      "Teams with varying software maturity and API experience",
      "Backward compatibility required during transition",
      "Limited budget for new infrastructure",
    ],
    role: [
      "Technical architect for the transition",
      "Defined API standards and service boundaries",
      "Led OpenAPI adoption and mentored teams on API-first thinking",
    ],
    approach: [
      "API-first: define contract before writing implementation",
      "Service boundaries based on business domains, not org chart",
      "Shared OpenAPI specs as both documentation and validation",
    ],
    solution: [
      "Service architecture with clear domain boundaries",
      "Standardized OpenAPI contracts and shared API gateway",
      "Incremental migration paths — no big-bang rewrites",
    ],
    impact: [
      "Independent team deployment enabled for the first time",
      "Integration defects reduced dramatically",
      "API standards adopted organization-wide",
      "New integration time cut from weeks to days",
    ],
    insight: "Good API design is organizational design in disguise. Service boundaries reflect how teams should collaborate — and when you get those boundaries wrong, you're encoding dysfunction into your architecture.",
  },
  {
    id: "decision-support-tools",
    label: "Internal Tools",
    title: "Decision-Support & Performance Tools",
    image: caseStudy5,
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
  },
  {
    id: "startup-strategy",
    label: "Startup Strategy",
    title: "Product & Technical Strategy — Startup",
    image: caseStudy6,
    summary: "Defined PRDs, broke down scope, shaped roadmap, guided hiring, and drove execution from concept through delivery for an early-stage startup.",
    tags: ["Strategy", "Architecture"],
    technologies: ["PRDs & Roadmapping", "Technical Hiring", "System Architecture", "Sprint Planning", "Product Discovery"],
    tldr: {
      problem: "Early-stage team shipping fast but building in circles with no product process or architectural vision.",
      solution: "Lightweight PRD → initiative → ticket process paired with architectural guardrails for reversible vs. irreversible decisions.",
      impact: "Shipped on timeline and built foundations that survived scaling from 3 to 15 engineers.",
    },
    metrics: [
      { value: "3 → 15", label: "Engineers scaled" },
      { value: "On-target", label: "Delivery timeline" },
      { value: "Durable", label: "Process & architecture" },
    ],
    context: [
      "Early-stage startup with compelling vision but no structure",
      "No engineering culture or product process in place",
      "Urgent need to ship with limited runway",
    ],
    problem: [
      "No structured product process",
      "Scope undefined and constantly shifting",
      "Reactive technical decisions without architectural vision",
      "Team executing fast but building in circles",
    ],
    constraints: [
      "Small team with limited experience",
      "Limited runway requiring aggressive timelines",
      "Must ship fast while building scalable foundation",
      "Tension between investor demos and technical integrity",
    ],
    role: [
      "Technical advisor and strategic partner",
      "Defined PRDs and broke scope into initiatives and tickets",
      "Reviewed implementation, helped with hiring",
      "Provided full-stack technical guidance and shaped roadmap",
    ],
    approach: [
      "Lightweight rigorous process: PRDs → initiatives → tickets → sprints",
      "Architectural guardrails preventing the most expensive mistakes",
      "Identified reversible vs. irreversible decisions explicitly",
    ],
    solution: [
      "Product framework tailored for early-stage velocity",
      "Technical architecture principles for scaling",
      "Roadmap prioritization framework",
      "Hiring process for first engineering hires",
    ],
    impact: [
      "Shipped core product on the target timeline",
      "Built sustainable engineering culture from scratch",
      "Foundations survived scaling from 3 to 15 engineers",
      "Processes continued in use after engagement ended",
    ],
    insight: "Startup speed doesn't come from cutting corners. It comes from knowing which decisions matter now and which can be deferred — and having the judgment to tell the difference under pressure.",
  },
];
