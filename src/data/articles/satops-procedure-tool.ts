import type { Article } from "./types";

const article: Article = {
  slug: "satops-procedure-tool",
  title: "Designing SatOps",
  subtitle: "Building a complete satellite operations management framework — eleven modules, one platform",
  description:
    "Most satellite ops teams run on spreadsheets, PDFs, and group chats. SatOps is what a purpose-built framework looks like: eleven integrated modules covering every function from procedure execution to fault recovery — designed offline-first, mission-scoped, and deployable anywhere.",
  date: "Apr 2025",
  readTime: "8 min read",
  tags: ["Platform", "Internal Tools", "Architecture"],
  intro: [
    "Satellite operations teams run the same procedures dozens of times — bus checkout, payload initialization, orbit maneuvers, safehold recovery. Between those procedures they track anomalies, log shift handoffs, reference fault trees, look up command definitions, and queue requests to subject matter experts. The typical tool stack for all of this is whatever the team cobbled together: a shared spreadsheet, a PDF checklist, a group chat. No operator attribution. No step-level history. No link between the anomaly and the procedure that found it.",
    "SatOps started from a specific question: what would a purpose-built ops platform look like if you designed it around how satellite operations actually works — missions, shifts, anomalies, and procedures as interconnected things with shared context — rather than as a generic forms-and-tables web app? The answer is eleven modules, one platform, and a set of architectural decisions that hold up under operational pressure.",
  ],
  sections: [
    {
      id: "modules",
      label: "The Framework",
      heading: "Eleven Modules, One Platform",
      paragraphs: [
        "SatOps is organized as eleven Django apps, each owning a distinct operations function. They share a common mission context, fleet model, and user system — so data created in one module is immediately available in another. An anomaly reported in the Fleet Anomaly Tracker references the same satellite as a procedure run. An FDIR entry links directly to the operator procedures that resolve it. The shift log in Mission Scribe shows which procedures ran during the shift.",
        "The modules cover the full operational surface of a satellite program:",
      ],
      table: {
        headers: ["Module", "Purpose"],
        rows: [
          ["Procedure Runner", "Execute YAML-defined checklists step-by-step with per-step pass/fail, operator notes, and print-ready run summaries"],
          ["Procedure Management", "Create, edit, clone, review, and version-control procedure definitions in the UI or directly in YAML"],
          ["Mission Scribe", "Role-based shift timeline, event logging, handoff notes — single source of truth for what happened during each shift"],
          ["Fleet Anomaly Tracker", "Report and track anomalies by satellite, subsystem, type, and severity; status workflow from New through Resolved with full note history"],
          ["Alerts & Limits Handbook", "Alert definitions with warning and critical thresholds, recommended responses, and links to recovery procedures"],
          ["FDIR Handbook", "Fault detection, isolation, and recovery definitions; each entry links directly to the operator procedures that resolve it"],
          ["Commands & Telemetry", "Central catalog of command and telemetry definitions with subsystem filters and CSV import/export for ICD alignment"],
          ["Central Reference Page", "Quick-access document links (ICDs, manuals, guides) organized by subsystem — eliminates 'where's that spec?' during a procedure"],
          ["SME Request Workflow", "Request queue with satellite, type, priority, and status; approval, assignment, and note history so nothing falls through"],
          ["Audit Log", "Immutable record of all user actions across modules for compliance and post-incident review"],
          ["Reports", "Aggregated views across procedure runs, anomaly trends, and operational metrics by mission"],
        ],
      },
    },
    {
      id: "audit-trail",
      label: "The Core Design",
      heading: "Every Run Is a Record",
      paragraphs: [
        "In most web apps, the database rows are internal state. In an operations tool, they're the primary output. The procedure run isn't just how you execute the checklist — it's the auditable record that tells the next shift what happened, who ran it, what passed, what failed, and what notes the operator left. That distinction drives almost every data model decision.",
        "The core data model has four layers: Satellite (which asset), Procedure (which checklist and version), ProcedureRun (which execution — operator, satellite, timestamps, status), and StepExecution (per-step result, input value, notes, timestamp). That's the full audit trail. You can answer 'who ran the payload init procedure on Sat-3 last Tuesday, and what happened at step 7' directly from the database without any reconstruction.",
        "Run notes are a separate concern from step execution. A step either passes or fails — that's binary. Run notes are freeform: handover context, anomaly descriptions, anything the operator needs to pass to the next shift. They're editable throughout the run, not just at the end. This matches how operators actually work: notes accumulate during a run, not as a post-run report.",
      ],
    },
    {
      id: "yaml-procedures",
      label: "The Procedure Format",
      heading: "Why Procedures Live in YAML, Not the Database",
      paragraphs: [
        "Procedure definitions are stored as YAML files, not database rows. Database rows are easy to query and display — the ORM handles all of that. But they're opaque to non-engineers: you can't version-control a procedure edit with a meaningful commit message, you can't diff two versions side-by-side in a code review, and you can't duplicate a procedure by copying a file.",
        "YAML files solve those problems. A procedure definition is a text file with a name, version, and an ordered list of steps — each with an ID, description, and optional input field. Operators who know the tool can edit procedures directly in YAML without touching the UI. Engineers can review procedure changes in a pull request. The full procedure library is under version control alongside the application code.",
        "The bridge between the two worlds is a loader service: `procedure_loader.load_procedure(name)` reads the YAML from disk at runtime; `save_procedure()` writes it back when the UI creates or edits a procedure. The database holds a Procedure record pointing to the YAML file path, plus all run and step data. Definition lives in files; execution history lives in the database. You get the queryability of a relational store and the auditability of text files.",
      ],
    },
    {
      id: "mission-scope",
      label: "The Architecture",
      heading: "Mission Scope as a Safety Property",
      paragraphs: [
        "Every URL in the framework is scoped to a mission: `/m/<mission_slug>/procedures/`, `/m/<mission_slug>/anomalies/`. This isn't just organization — it's a safety property. In a multi-program ops environment, procedures, satellites, and anomalies for one satellite program should never be visible or accidentally queryable from another program's context. Global data causes accidents.",
        "The implementation uses middleware: `MissionContextMiddleware` parses the mission slug from every request URL and injects the Mission object into the request. Every view scopes its database queries to that mission. Templates automatically show the current mission name and color coding. The result is that adding a new satellite program is a configuration operation — create a mission, assign members, load procedures — not a code change.",
        "The two default missions — Simulation and Sandbox — are created by a data migration, not a seed command. This means even a bare `python manage.py migrate` produces a working multi-mission environment. The distinction matters for CI: the test suite doesn't need a separate fixture-loading step to have a valid database state. Every migrate is a complete, usable system.",
      ],
    },
    {
      id: "no-js-framework",
      label: "The Tech Choice",
      heading: "Why Server-Rendered HTML Was the Right Call",
      paragraphs: [
        "The front end is server-rendered HTML with CSS. No React, no Vue, no TypeScript compilation step. This is a deliberate choice, not a capability gap.",
        "Ops environments often have restricted network access: intermittent connectivity, bandwidth limits, no CDN access. A server-rendered app serves complete HTML pages — no second round trip for API data, no hydration step, no client-side routing that depends on JavaScript loading successfully. The framework works fully in degraded network conditions because there's nothing to load after the initial page response.",
        "Django's template system handles the rendering cleanly: base templates, block overrides, template tags for logic. The result is a codebase that any Python engineer can read and modify without context-switching into a separate JavaScript ecosystem. For an ops framework used by a small team in a constrained environment, that maintainability tradeoff outweighs the interactivity benefits of a SPA. The complexity you don't add is the complexity you don't have to debug at 2am during a safehold recovery.",
      ],
    },
    {
      id: "cicd",
      label: "The Pipeline",
      heading: "Test Against What You Ship",
      paragraphs: [
        "The CI pipeline runs 56+ tests against a PostgreSQL service container, not SQLite. Django's ORM abstracts most database differences, but not all — constraint enforcement, field type coercion, and ordering guarantees can behave differently. A CI suite that passes on SQLite and fails on PostgreSQL is testing a database that doesn't exist in production.",
        "The deploy pipeline is gated on CI: Ruff linting, then tests against PostgreSQL, then `manage.py check`, then `flyctl deploy`. A `concurrency` setting on the GitHub Actions workflow ensures a new push cancels any in-progress deploy. Combined with the container entrypoint running `migrate` on every startup, schema changes apply automatically on deploy — no manual migration step, no risk of schema drift.",
        "The Makefile is the documented interface for all of this: `make ci` runs lint, check, and test locally in one command. `make fly-deploy` deploys to production. The Makefile isn't just convenience — it's the canonical record of how each operation runs, which matters when the person maintaining the system changes.",
      ],
    },
  ],
  insight:
    "The best ops frameworks feel invisible. When the audit trail is automatic, the anomaly links to the procedure that found it, and the next shift knows exactly where things stand — the framework has done its job. That interconnection between modules is the design goal, not a side effect.",
};

export default article;
