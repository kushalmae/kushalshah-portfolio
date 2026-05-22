import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "minimum-viable-experiment",
  name: "Minimum Viable Experiment",
  oneLiner: "The smallest trial that still produces discriminating evidence — not the smallest task that feels productive.",
  description:
    "Sizes personal and professional bets so failure is cheap and honesty is affordable.",
  tags: ["Learning"],
  sourceBook: { slug: "tiny-experiments", title: "Tiny Experiments" },
  definition: [
    "An experiment is viable when its outcome can confirm or falsify a specific hypothesis.",
    "Cost is measured in time, reputation, money, and reversibility — not effort alone.",
    "If stopping early would feel like moral failure, the experiment was not small enough.",
  ],
  whenToUse: [
    "Before large commitments: new job, major refactor, public launch, expensive course.",
    "When stakeholders want certainty — offer experiments as risk reduction, not delay.",
    "Personal habits: test one lever (timing, environment, accountability) at a time.",
  ],
  pitfalls: [
    "Confusing busywork with evidence — activity without a falsifiable claim.",
    "Running so small that results are noise (sample size, duration too thin).",
    "Never promoting winners — perpetual dabbling without integration.",
  ],
  application:
    "Before starting, write: hypothesis, smallest action, success/fail signals, stop date. If you cannot name what would prove you wrong, shrink or sharpen the test.",
};

export default model;
