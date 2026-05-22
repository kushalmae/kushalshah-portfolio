import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "curiosity-over-certainty",
  name: "Curiosity Over Certainty",
  oneLiner: "Hold hypotheses lightly; optimize for better questions before optimizing for faster answers.",
  description:
    "Treat surprise as signal. Certainty is useful for execution; curiosity is required for discovery.",
  tags: ["Culture"],
  sourceBook: { slug: "tiny-experiments", title: "Tiny Experiments" },
  definition: [
    "Certainty feels efficient but hides unknown unknowns until they are expensive.",
    "Curiosity structures inquiry: what would we see if we were wrong?",
    "Psychological safety is the enabling constraint — punished curiosity reverts to defensive goals.",
  ],
  whenToUse: [
    "Incident reviews and retrospectives — lead with questions, not verdicts.",
    "Early architecture discussions before interfaces freeze.",
    "1:1s when someone is performing certainty to mask risk.",
  ],
  pitfalls: [
    "Curiosity as infinite delay — inquiry without time-boxed experiments.",
    "Performative questioning that avoids decisions.",
    "Using \"we're still learning\" to escape accountability after evidence is clear.",
  ],
  application:
    "In the next ambiguous meeting, spend the first third only on observations and questions. Time-box a decision or experiment at the end. Document what would change your mind.",
};

export default model;
