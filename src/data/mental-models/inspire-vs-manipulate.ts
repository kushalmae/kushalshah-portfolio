import type { MentalModel } from "../books/types";

const model: MentalModel = {
  slug: "inspire-vs-manipulate",
  name: "Inspire vs. Manipulate",
  oneLiner: "Loyalty compounds from shared belief; transactions spike from price, fear, and hype — then churn.",
  description:
    "Distinguishes sustainable motivation from levers that work once and erode trust.",
  tags: ["Strategy"],
  sourceBook: { slug: "start-with-why", title: "Start with Why" },
  definition: [
    "Inspiration aligns people around a why they can adopt as their own.",
    "Manipulation (price, fear, novelty, peer pressure) drives action without belonging.",
    "Over-reliance on manipulation is a strategy tax paid in margin and attrition.",
  ],
  whenToUse: [
    "Retention crises — diagnose whether you are fixing why or buying time with cash.",
    "Sales and recruiting narratives — are you hiring believers or bidding for mercenaries?",
    "Change management — fear launches programs; purpose sustains them.",
  ],
  pitfalls: [
    "Treating all incentives as manipulation — fair pay is table stakes, not betrayal of why.",
    "Moralizing urgency deadlines that are honestly required.",
    "Inspiration without competence — belief does not replace skill.",
  ],
  application:
    "Pick one initiative. List which motivators you use (mission, fear, money, status). If mission is absent, articulate why it matters before adding another financial lever.",
};

export default model;
