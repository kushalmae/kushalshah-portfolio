import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "identity-by-experiment",
  name: "Identity by Experiment",
  oneLiner: "You become what you repeatedly test — not what you declare before evidence exists.",
  description:
    "Defers identity labels until behavior in low-stakes contexts validates them; pairs with explicit anti-goals.",
  tags: ["Learning"],
  sourceBook: { slug: "tiny-experiments", title: "Tiny Experiments" },
  definition: [
    "Declared identity raises the cost of stopping when reality disagrees.",
    "Earned identity accumulates from repeated experiments whose outcomes you accept honestly.",
    "Anti-goals clarify what you will stop pretending to be.",
  ],
  whenToUse: [
    "Career exploration: sample the work (writing, managing, selling) before reorganizing life around a title.",
    "Hiring and leveling: infer capability from demonstrated decisions, not self-reported labels.",
    "Founders testing founder–operator fit before burning relational capital.",
  ],
  pitfalls: [
    "Using experiments to avoid commitment after consistent positive signal.",
    "Identity tourism — many micro-trials without depth in any.",
    "Letting others' labels set your hypothesis space.",
  ],
  application:
    "List one role you want to test. Design three experiments that produce observable artifacts (doc, prototype, facilitated meeting). Only adopt the identity when outsiders could infer it from outputs.",
};

export default model;
