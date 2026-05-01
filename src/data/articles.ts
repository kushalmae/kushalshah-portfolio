export type { ArticleTable, ArticleSection, Article } from "./articles/types";

import spacecraftCommunicationProtocols from "./articles/spacecraft-communication-protocols";
import satelliteEngineeringBudgets from "./articles/satellite-engineering-budgets";
import satellitePointingBudget from "./articles/satellite-pointing-budget";

export const articles = [
  spacecraftCommunicationProtocols,
  satelliteEngineeringBudgets,
  satellitePointingBudget,
];
