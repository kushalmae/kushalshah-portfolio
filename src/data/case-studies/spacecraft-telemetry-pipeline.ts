import type { CaseStudy } from "./types";
import image from "@/assets/case-study-5.jpg";

const caseStudy: CaseStudy = {
  id: "spacecraft-telemetry-pipeline",
  label: "Telemetry Pipeline",
  title: "Spacecraft Telemetry Pipeline — PostgreSQL + Grafana",
  image,
  summary:
    "Built a near-real-time spacecraft telemetry pipeline that ingests CSV sensor data from two satellites, stores it in a dual-table PostgreSQL schema with SHA-256 deduplication and partial-index alert queries, and surfaces live dashboards in Grafana — running entirely on a single laptop via Docker with 5–15 second end-to-end latency.",
  tags: ["Aerospace", "Platform", "Architecture"],
  technologies: [
    "Python",
    "PostgreSQL 16",
    "Grafana 11.4.3",
    "Docker Compose",
    "pandas",
    "psycopg2",
    "SQLAlchemy",
    "python-dotenv",
  ],
  tldr: {
    problem:
      "Spacecraft telemetry data — battery voltage, CPU temperature, link quality, attitude error — needed to be visible on live dashboards within seconds of measurement, without requiring cloud infrastructure, message brokers, or proprietary ground system software.",
    solution:
      "A CSV-to-PostgreSQL ingestion pipeline with byte-offset tracking, SHA-256 row deduplication, a two-table schema separating historical log from current snapshot, and three provisioned Grafana dashboards — all orchestrated by Docker Compose and startable with a single command.",
    impact:
      "5–15 second end-to-end latency from measurement to dashboard. ~15.5M row steady-state capacity on a laptop. Zero duplicates on restart. Full fleet visibility across two spacecraft, five subsystems, and twelve signals.",
  },
  metrics: [
    { value: "5–15s", label: "End-to-end latency" },
    { value: "~15.5M", label: "Rows at steady state" },
    { value: "3", label: "Live Grafana dashboards" },
  ],
  context: [
    "Ground software teams prototyping telemetry pipelines often reach for full TSDB stacks (InfluxDB, TimescaleDB) or streaming brokers (Kafka, MQTT) before validating whether simpler tooling can meet latency requirements",
    "CSV is the de facto interchange format for telemetry export — ground systems, simulators, and test harnesses all speak it — making it a practical lowest-common-denominator input format",
    "The target environment was a single developer laptop: no Kubernetes, no cloud, no persistent infrastructure beyond Docker named volumes",
  ],
  problem: [
    "Spacecraft sensor readings needed to appear on live dashboards within ~10 seconds of measurement with no real-time streaming infrastructure available",
    "Duplicate ingestion on process restart had to be absorbed without manual intervention or database corruption",
    "Alert queries (non-NOMINAL status) needed to remain fast as the time-series table grew toward tens of millions of rows",
    "The two distinct Grafana query patterns — trend lines over time and current snapshot values — required different table structures to serve efficiently",
  ],
  constraints: [
    "Runs entirely on a single laptop via Docker — no cloud services, message brokers, or external dependencies",
    "Input format is append-only CSV; the ingestion layer cannot modify or control the source files",
    "Must survive process restarts without re-inserting duplicate data or requiring manual state cleanup",
    "End-to-end latency budget: under 15 seconds from measurement to dashboard panel refresh",
  ],
  role: [
    "Sole designer and implementer of the full pipeline: schema, ingestor, simulator, dashboard provisioning, and operational tooling",
    "Defined the two-table schema, index strategy, and deduplication approach",
    "Authored all four Python scripts: ingestion engine, telemetry simulator, historical data generator, and Grafana dashboard exporter",
  ],
  approach: [
    "Chose file polling over LISTEN/NOTIFY or a message queue — 5-second poll intervals meet the latency budget without broker infrastructure, and polling is simpler to debug and restart",
    "Used byte-offset tracking (not line counting) so the ingestor reads only new bytes on each poll cycle — a 30-day CSV processes in microseconds after first ingest",
    "Separated the schema into two tables: telemetry_history (append-only log, queried for time-series) and telemetry_latest (fixed-size snapshot keyed on spacecraft+subsystem+signal, queried for current state) — the same dual-table pattern used by InfluxDB and TimescaleDB",
    "Added a partial index on telemetry_history covering only non-NOMINAL rows, exploiting the fact that >95% of readings are NOMINAL — alert queries hit a small fraction of the table regardless of total row count",
    "SHA-256 hashed each row at ingest time; UNIQUE constraint on the hash at the database level means duplicate-safe re-ingestion is a property of the schema, not application-level logic",
  ],
  solution: [
    "Ingestion engine: polls all CSV files in ./data/ every 5 seconds, reads only new bytes via saved byte offsets, normalizes column names, computes SHA-256 per row, and writes to both tables in a single transaction using executemany batch inserts",
    "Dual-table schema: telemetry_history stores the full append-only log with four indexes (time-series, spacecraft+signal, APID, partial alert index); telemetry_latest stores one row per signal, upserted on every new reading — never grows beyond ~30 rows for a two-satellite fleet",
    "Three provisioned Grafana dashboards: Mission Control (fleet overview, leave-on-screen health panel), Spacecraft Fleet Telemetry (twelve signal panels for cross-satellite comparison), and Spacecraft Detail (single-satellite deep dive with a $spacecraft variable for switching)",
    "Companion scripts: simulate_telemetry.py generates synthetic orbital telemetry using sinusoidal functions with Gaussian noise; generate_fake_data.py backfills historical data for dashboard testing; export_grafana_dashboards.py exports UI edits back to JSON for git commit",
    "Automated 30-day data retention: ingestor runs a purge DELETE every 720 poll cycles (~hourly), configured via TELEMETRY_RETENTION_DAYS env var",
  ],
  impact: [
    "5–15 second end-to-end latency from simulator write to Grafana panel refresh — validated against the polling budget without streaming infrastructure",
    "Zero duplicate rows on process restart: SHA-256 deduplication at the schema level absorbs re-ingestion automatically",
    "Steady-state capacity of ~15.5M rows (30 signals × 12 readings/min × 43,200 min/month) fits comfortably on a laptop with ~3 GB PostgreSQL volume",
    "Alert queries remain O(alert rows), not O(total rows), via partial index — performance does not degrade as the historical table grows",
  ],
  insight:
    "A polling pipeline with the right schema can meet real-time telemetry requirements that instinctively seem to demand streaming infrastructure. The two-table pattern — firehose log plus current snapshot — is the architectural decision that makes both Grafana query patterns fast. The deduplication hash is the decision that makes restarts safe. Neither requires a broker.",
  githubUrl:
    "https://github.com/kushalmae/posgres_grafana_project/tree/master/wiki",
};

export default caseStudy;
