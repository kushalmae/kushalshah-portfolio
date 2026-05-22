import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "growth-loop",
  name: "Growth Loop",
  oneLiner: "Observe → hypothesize → experiment → reflect — a control loop for learning under uncertainty.",
  description:
    "A four-phase cycle for turning lived experience into updated beliefs without collapsing every miss into identity failure.",
  tags: ["Learning"],
  sourceBook: { slug: "tiny-experiments", title: "Tiny Experiments" },
  definition: [
    "Observe signals in the environment and in your own behavior without immediately prescribing fixes.",
    "Hypothesize a falsifiable claim about what would change if you intervened.",
    "Run the smallest experiment that could disprove the hypothesis within a bounded time window.",
    "Reflect on outcomes, update beliefs, and choose continue, pivot, or stop.",
  ],
  whenToUse: [
    "Domains where the map is incomplete: career moves, new technical stacks, product discovery.",
    "After-action reviews on projects that missed expectations — replace blame with loop discipline.",
    "Coaching engineers: frame growth as experiments with explicit success criteria for learning.",
  ],
  pitfalls: [
    "Skipping observe and jumping to solutions — the loop becomes performative hustle.",
    "Oversized experiments that reintroduce goal anxiety and sunk-cost defense.",
    "Reflection without documentation — insights evaporate; the loop does not compound.",
  ],
  application:
    "Run one loop per week on a single friction point. Write the hypothesis in one sentence, cap the experiment at five hours or five days, and end with three bullets: observed, learned, next.",
};

export default model;
