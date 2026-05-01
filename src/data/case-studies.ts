export type { CaseStudyMetric, CaseStudy } from "./case-studies/types";

import missionCriticalSystems from "./case-studies/mission-critical-systems";
import platformTooling from "./case-studies/platform-tooling";
import automationPipelines from "./case-studies/automation-pipelines";
import apiMicroservices from "./case-studies/api-microservices";
import decisionSupportTools from "./case-studies/decision-support-tools";
import startupStrategy from "./case-studies/startup-strategy";
import drozoneLayerCuas from "./case-studies/drozone-layer-cuas";
import satopsProcedureTool from "./case-studies/satops-procedure-tool";
import spacecraftTelemetryPipeline from "./case-studies/spacecraft-telemetry-pipeline";

export const ALL_TAGS = [
  "Aerospace",
  "Platform",
  "Automation",
  "Architecture",
  "Internal Tools",
  "Strategy",
] as const;

export const caseStudies = [
  missionCriticalSystems,
  drozoneLayerCuas,
  satopsProcedureTool,
  spacecraftTelemetryPipeline,
  platformTooling,
  automationPipelines,
  apiMicroservices,
  decisionSupportTools,
  startupStrategy,
];
