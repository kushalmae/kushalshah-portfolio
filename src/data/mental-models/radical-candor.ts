import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "radical-candor",
  name: "Radical Candor",
  oneLiner: "Care personally and challenge directly — the intersection where feedback actually helps.",
  description:
    "Kim Scott's target quadrant: high relationship trust plus clear, timely truth about performance.",
  tags: ["Leadership"],
  sourceBook: { slug: "radical-candor", title: "Radical Candor" },
  definition: [
    "Care personally: genuine investment in the person's growth and humanity.",
    "Challenge directly: specific, timely feedback on behavior and impact — not character attacks.",
    "Both are required; either alone lands in a named failure mode.",
  ],
  whenToUse: [
    "1:1s with high performers who need harder standards, not more praise.",
    "Correcting brilliant jerks before the team absorbs their norms.",
    "Upward feedback to a boss who is approachable but unclear.",
  ],
  pitfalls: [
    "Confusing candor with volume or sarcasm (Obnoxious Aggression).",
    "Waiting for review season — feedback decays like telemetry without timestamps.",
    "Care without standards — Ruinous Empathy feels kind, costs careers.",
  ],
  application:
    "Within 24 hours, tell one person something specific they did well and something specific to change. Confirm they heard care in the first and clarity in the second.",
};

export default model;
