export type { ArticleTable, ArticleSection, Article } from "./articles/types";

import spacecraftPowerBudgeting from "./articles/spacecraft-power-budgeting";
import spacecraftRfCommunications from "./articles/spacecraft-rf-communications";
import spacecraftCommunicationProtocols from "./articles/spacecraft-communication-protocols";
import spacecraftLinkSecurity from "./articles/spacecraft-link-security";
import cop1Protocol from "./articles/cop-1-protocol";
import satelliteEngineeringBudgets from "./articles/satellite-engineering-budgets";
import satellitePointingBudget from "./articles/satellite-pointing-budget";
import counterUasKillChainArchitecture from "./articles/counter-uas-kill-chain-architecture";
import satopsProcedureTool from "./articles/satops-procedure-tool";
import electricPropulsionSystems from "./articles/electric-propulsion-systems";
import satelliteOrbitTypes from "./articles/satellite-orbit-types";
import pwsaArchitecture from "./articles/pwsa-architecture";
import pwsaTransportLayer from "./articles/pwsa-transport-layer";
import pwsaTrackingLayer from "./articles/pwsa-tracking-layer";
import gitops from "./articles/gitops";
import gcpAutomatedTasking from "./articles/gcp-automated-tasking";

export const articles = [
  pwsaArchitecture,
  pwsaTransportLayer,
  pwsaTrackingLayer,
  satelliteOrbitTypes,
  electricPropulsionSystems,
  spacecraftPowerBudgeting,
  spacecraftRfCommunications,
  spacecraftCommunicationProtocols,
  spacecraftLinkSecurity,
  cop1Protocol,
  satelliteEngineeringBudgets,
  satellitePointingBudget,
  counterUasKillChainArchitecture,
  satopsProcedureTool,
  gitops,
  gcpAutomatedTasking,
];
