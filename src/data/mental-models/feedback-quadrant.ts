import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "feedback-quadrant",
  name: "Feedback Quadrant",
  oneLiner: "Map feedback by care and challenge — Ruinous Empathy and Obnoxious Aggression are the usual traps.",
  description:
    "Kim Scott's 2×2 of management communication styles and their predictable outcomes.",
  tags: ["Leadership"],
  sourceBook: { slug: "radical-candor", title: "Radical Candor" },
  definition: [
    "Radical Candor: high care, high challenge.",
    "Ruinous Empathy: high care, low challenge — niceness that hides truth.",
    "Obnoxious Aggression: low care, high challenge — right facts, damaged relationship.",
    "Manipulative Insincerity: low care, low challenge — politics and disengagement.",
  ],
  whenToUse: [
    "Diagnosing why feedback did not land after a tense conversation.",
    "Coaching new managers who default to praise-only 1:1s.",
    "Self-audit after reviews that surprised the recipient.",
  ],
  pitfalls: [
    "Labeling others without changing your own quadrant.",
    "Using aggression and calling it \"just being direct.\"",
    "Assuming low care always means bad intent — sometimes panic, not malice.",
  ],
  application:
    "After your next hard conversation, plot yourself honestly on care vs. challenge. If challenge was high and care low, follow up with an explicit commitment to their success.",
};

export default model;
