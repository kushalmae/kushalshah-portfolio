import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "celery-test",
  name: "Celery Test",
  oneLiner: "Your real why is visible in what you fund, schedule, and reward — not what you post on the wall.",
  description:
    "A consistency audit: decisions should cluster like a shopper with one clear purpose, not a cart full of contradictions.",
  tags: ["Culture"],
  sourceBook: { slug: "start-with-why", title: "Start with Why" },
  definition: [
    "Stated purpose should predict observable investments and tradeoffs.",
    "Mixed signals teach the org to ignore rhetoric and follow incentives.",
    "The test is behavioral: calendar, budget, promotions, and kill decisions.",
  ],
  whenToUse: [
    "Annual planning — do top five investments match the mission sentence?",
    "Values rollouts — before posters, change one policy that contradicted the value.",
    "Personal integrity checks when your calendar does not match your stated priorities.",
  ],
  pitfalls: [
    "Using it as purity test — zero tradeoffs is fantasy; patterns matter.",
    "Weaponizing against leaders without offering actionable realignment.",
    "Confusing short-term survival cuts with permanent purpose drift.",
  ],
  application:
    "List last quarter's five largest time or money commitments. Label each as aligned or misaligned with your why. If three misalign, fix incentives before rewriting the mission statement.",
};

export default model;
