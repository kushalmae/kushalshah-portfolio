import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "golden-circle",
  name: "Golden Circle",
  oneLiner: "Communicate and decide from Why → How → What, not the reverse.",
  description:
    "Simon's Sinek's three-layer model linking purpose, differentiation, and outputs — aligned with how people form trust and loyalty.",
  tags: ["Strategy"],
  sourceBook: { slug: "start-with-why", title: "Start with Why" },
  definition: [
    "Why is purpose or belief — the reason the work exists beyond revenue.",
    "How is the distinctive approach, values in action, or operating philosophy.",
    "What is the tangible result: product, service, role, deliverable.",
  ],
  whenToUse: [
    "Roadmaps and executive briefs — lead with mission outcome, not feature backlog.",
    "Hiring pitches: attract people who believe the why, not only the stack.",
    "Vendor or partner evaluation: test whether their why matches yours before comparing what.",
  ],
  pitfalls: [
    "Slogan why with no budget or decision alignment (fails the celery test).",
    "Skipping how — why without credible process sounds like hype.",
    "Assuming why is static; it must survive leadership changes and pivots.",
  ],
  application:
    "Rewrite your next proposal opening: one sentence why, one how, then what. Ask a peer if the why alone would still make the project worth doing.",
};

export default model;
