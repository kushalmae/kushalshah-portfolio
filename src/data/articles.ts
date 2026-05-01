export type { ArticleTable, ArticleSection, Article } from "./articles/types";

import spacecraftCommunicationProtocols from "./articles/spacecraft-communication-protocols";
import satelliteEngineeringBudgets from "./articles/satellite-engineering-budgets";
import satellitePointingBudget from "./articles/satellite-pointing-budget";
import counterUasKillChainArchitecture from "./articles/counter-uas-kill-chain-architecture";
import satopsProcedureTool from "./articles/satops-procedure-tool";

export const articles = [
  spacecraftCommunicationProtocols,
  satelliteEngineeringBudgets,
  satellitePointingBudget,
  counterUasKillChainArchitecture,
  satopsProcedureTool,
];
