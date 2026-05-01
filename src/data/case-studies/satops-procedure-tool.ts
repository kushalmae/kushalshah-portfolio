import type { CaseStudy } from "./types";
import image from "@/assets/case-study-3.jpg";

const caseStudy: CaseStudy = {
  id: "satops-procedure-tool",
  label: "Ops Framework",
  title: "SatOps — Satellite Operations Management Framework",
  image,
  summary:
    "Designed and built a complete satellite operations management framework — eleven integrated modules covering procedure execution, anomaly tracking, shift logging, fault reference, command catalogs, and mission management — offline-capable, multi-user, multi-mission.",
  featured: true,
  tags: ["Platform", "Internal Tools", "Architecture"],
  technologies: [
    "Python",
    "Django",
    "YAML",
    "SQLite",
    "PostgreSQL",
    "Docker",
    "Fly.io",
    "GitHub Actions",
    "Gunicorn",
    "WhiteNoise",
    "Ruff",
  ],
  tldr: {
    problem:
      "Satellite ops teams ran critical procedures, tracked anomalies, logged shifts, and managed fault reference data across disconnected spreadsheets and documents with no audit trail or shared context.",
    solution:
      "A unified, mission-scoped Django framework with eleven integrated ops modules — from procedure execution and anomaly tracking to FDIR handbooks, command catalogs, and SME workflows — built offline-first and deployable anywhere.",
    impact:
      "All satellite operations functions consolidated into one platform: full operator audit trail, mission-scoped multi-tenancy, 56+ automated tests, and one-command deployment to production.",
  },
  metrics: [
    { value: "11", label: "Integrated ops modules" },
    { value: "56+", label: "Automated tests" },
    { value: "1 cmd", label: "Zero-to-running setup" },
  ],
  context: [
    "Satellite operations teams execute recurring procedures, track anomalies, hand off shifts, and reference fault trees — but each function lived in a separate, disconnected tool or document",
    "Paper checklists and spreadsheets provided no operator attribution, no step-level history, and no connection between a procedure run and the anomaly that triggered it",
    "Lab and forward ops environments require offline-first tooling that works without cloud connectivity or external API dependencies",
  ],
  problem: [
    "No step-level audit trail tied to a specific operator, satellite, and timestamp",
    "Anomalies, shift handoffs, FDIR entries, and reference documents existed in completely separate systems with no shared context",
    "Procedure definitions locked in static PDFs — no versioning, no cloning, no in-app editing",
    "New operators had no single place to find procedures, alert thresholds, fault trees, command definitions, and reference documentation",
  ],
  constraints: [
    "Must run offline — no external API dependencies; suitable for air-gapped lab and forward ops environments",
    "Must support multi-user environments with operator attribution on every action",
    "Procedure definitions must remain human-editable (YAML) independent of the UI",
    "Must be deployable with zero configuration locally and one command to production",
  ],
  role: [
    "Sole designer and developer across all eleven application modules",
    "Defined data model, mission-scoped URL architecture, and inter-module relationships",
    "Authored CI/CD pipeline, Docker containerization, and Fly.io production deployment configuration",
  ],
  approach: [
    "Chose Django for its ORM, built-in auth, and admin panel — avoiding a separate API and frontend framework for an internal ops tool",
    "Stored procedure definitions in YAML for human editability, with a loader service bridging file definitions and database run records at runtime",
    "Designed a mission-scoped URL structure (`/m/<slug>/...`) so multiple satellite programs share one instance without data leakage",
    "Used server-rendered templates throughout — no JS framework, keeping the tool fast and maintainable on low-bandwidth ops networks",
  ],
  solution: [
    "Procedure runner: YAML definitions, step-by-step execution with per-step pass/fail and operator notes, print-ready summaries, full history searchable by satellite, procedure, or operator",
    "Ten supporting modules: Mission Scribe (shift logs, timeline, handoff notes), Fleet Anomaly Tracker (report, track, status workflow), Alerts & Limits Handbook, FDIR Handbook (linked to procedures), Commands & Telemetry catalog (CSV import/export), Central Reference Page, SME Request Workflow, Audit Log, Reports, and multi-mission selector",
    "Zero-config setup: `python manage.py quickstart` runs migrations, seeds all sample data, and starts the server — one command from fresh clone to fully running environment",
  ],
  impact: [
    "All satellite operations functions consolidated: procedures, anomalies, shifts, faults, commands, references, and requests under one mission-scoped platform",
    "Full audit trail on every operation: operator, satellite, timestamp, per-step results, and run notes for handover",
    "CI/CD pipeline with 56+ tests against PostgreSQL in GitHub Actions, auto-deploying to Fly.io on merge to main",
  ],
  insight:
    "A satellite operations platform isn't a collection of features — it's a shared context. The value isn't in any single module; it's that the anomaly links to the procedure, the procedure links to the FDIR entry, and the shift log records who ran it and when. That interconnection is what makes the tool useful under operational pressure.",
  relatedArticle: {
    slug: "satops-procedure-tool",
    label: "Deep Dive: Designing SatOps",
  },
};

export default caseStudy;
