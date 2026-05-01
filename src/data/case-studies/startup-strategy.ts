import type { CaseStudy } from "./types";
import image from "@/assets/case-study-6.jpg";

const caseStudy: CaseStudy = {
  id: "startup-strategy",
  label: "Startup Strategy",
  title: "Product & Technical Strategy — Startup",
  image,
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
};

export default caseStudy;
