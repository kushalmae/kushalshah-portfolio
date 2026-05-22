import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "rock-stars-superstars",
  name: "Rock Stars vs. Superstars",
  oneLiner: "Stable masters and steep climbers need different roles, rewards, and growth paths — not one promotion ladder.",
  description:
    "Kim Scott's career taxonomy for matching org design to individual trajectory.",
  tags: ["Leadership"],
  sourceBook: { slug: "radical-candor", title: "Radical Candor" },
  definition: [
    "Rock stars: excellent, often deepening expertise; may not want management.",
    "Superstars: rapid growth; need expanding scope or they leave.",
    "Force-fitting either into the wrong curve wastes talent and morale.",
  ],
  whenToUse: [
    "Promotion committee — ask trajectory, not only current performance.",
    "Retention risk on high performers — boredom vs. overwhelm signal different fixes.",
    "Building IC and management ladders with equal dignity.",
  ],
  pitfalls: [
    "Static labels — people move between curves over a career.",
    "Using taxonomy to avoid paying rock stars fairly.",
    "Superstar path that only means people management.",
  ],
  application:
    "In your next growth conversation, ask: \"Do you want more depth in this craft, or a bigger scope problem?\" Align the next assignment to the answer, not to default promotion.",
};

export default model;
