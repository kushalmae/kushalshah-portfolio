import type { CaseStudy } from "./types";
import image from "@/assets/case-study-4.jpg";

const caseStudy: CaseStudy = {
  id: "api-microservices",
  label: "Software Architecture",
  title: "API & Microservice Design",
  image,
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
};

export default caseStudy;
