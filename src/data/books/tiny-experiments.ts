import type { Book } from "./types";

const book: Book = {
  slug: "tiny-experiments",
  title: "Tiny Experiments",
  subtitle: "How to live freely in a goal-obsessed world",
  author: "Anne-Laure Le Cunff",
  year: "2024",
  description:
    "A framework for replacing rigid goals with small, reversible experiments — building identity and direction through curiosity loops instead of performance anxiety.",
  readTime: "12 min summary",
  tags: ["Learning"],
  mentalModelSlugs: [
    "growth-loop",
    "minimum-viable-experiment",
    "identity-by-experiment",
    "curiosity-over-certainty",
  ],
  keyTakeaways: [
    "Goals optimize for a fixed endpoint; experiments optimize for learning velocity and optionality.",
    "Identity follows behavior: you become what you repeatedly test, not what you declare on a vision board.",
    "The smallest useful experiment is one you can run this week, measure honestly, and abandon without sunk-cost drama.",
  ],
  intro: [
    "Most professional advice still assumes the world is predictable enough for five-year plans. Set a SMART goal, break it into milestones, execute, review quarterly. That model works when the problem is closed, the feedback loop is short, and the cost of being wrong is low. It fails — often quietly — when the domain is novel, the map is wrong, or success requires becoming a different kind of person than the one who wrote the goal.",
    "Anne-Laure Le Cunff's Tiny Experiments reframes personal and creative development as a laboratory discipline. You do not commit to outcomes you cannot yet see; you commit to a process of small, bounded trials that generate evidence about what fits. The book is not anti-ambition. It is anti-pretending you already know the answer.",
    "For systems thinkers, the parallel is obvious: goals are requirements documents written before discovery; experiments are iterative integration tests on your own life. The mental models below are the durable abstractions — portable beyond self-help into how you run teams, products, and technical careers.",
  ],
  sections: [
    {
      id: "goal-trap",
      label: "Section 01",
      heading: "Why Goals Break Under Uncertainty",
      paragraphs: [
        "Traditional goal-setting assumes you can specify the destination, estimate the path, and measure progress against a timeline. That is project management for known work. When the work is exploratory — career pivots, creative projects, founding, learning a new technical domain — the goal becomes a fiction that soothes anxiety more than it guides action.",
        "Le Cunff names the emotional mechanics: goals tied to identity create fragility. Miss the milestone and you are not behind schedule; you are the kind of person who fails. That coupling produces avoidance, binge productivity before deadlines, and shallow optimization (hitting the metric without learning).",
        "Experiments invert the contract. The success criterion is not \"did I reach the number?\" but \"did I learn something true about myself or the environment?\" Failure is data, not verdict — as long as the experiment was small enough that failure did not burn the runway you need for the next trial.",
      ],
    },
    {
      id: "growth-loop",
      label: "Section 02",
      heading: "The Growth Loop — Observe, Hypothesize, Experiment, Reflect",
      paragraphs: [
        "The operational core of the book is a four-phase loop borrowed from science and adapted for daily life. **Observe**: notice friction, energy, envy, boredom — signals that something wants attention. **Hypothesize**: state a testable claim (\"If I write for thirty minutes before email, I will ship more and feel less scattered\"). **Experiment**: run the smallest version that could falsify the claim. **Reflect**: capture what happened without narrative spin; decide continue, pivot, or stop.",
        "The loop is deliberately short. Long experiments smuggle goals back in through the side door. A tiny experiment might last a week, cost little money, and require no audience. The point is frequency of learning, not grandeur of outcome.",
        "Teams can run the same loop at standup scale: what did we observe in production or user behavior, what do we believe, what is the smallest change we can ship to test it, what did we learn. The isomorphism is why this book belongs in a systems portfolio — it is control theory for personal strategy.",
      ],
      table: {
        headers: ["Phase", "Question", "Anti-pattern"],
        rows: [
          ["Observe", "What is actually happening?", "Jumping to solutions before naming the signal"],
          ["Hypothesize", "What would we expect if X were true?", "Vague intentions (\"be healthier\")"],
          ["Experiment", "What is the smallest test this week?", "All-or-nothing resolutions"],
          ["Reflect", "What did we learn; what next?", "Moralizing failure as character flaw"],
        ],
      },
    },
    {
      id: "mve",
      label: "Section 03",
      heading: "Minimum Viable Experiments",
      paragraphs: [
        "Le Cunff extends the startup notion of MVP into personal behavior: a **minimum viable experiment** is the least costly trial that still produces discriminating evidence. Not \"launch a newsletter\" but \"publish one issue to twelve people you respect and note who replies.\" Not \"learn Rust\" but \"implement one utility in Rust that you already know in Python and compare friction.\"",
        "Sizing matters because oversized experiments inherit goal psychology. When the stake is high, you defend the hypothesis instead of testing it. Small stakes make honesty cheaper.",
        "Reversibility is a design constraint. Prefer experiments you can unwind without reputation damage: conversations before commitments, prototypes before contracts, shadowing before quitting. Optionality is not laziness; it is how you survive wrong maps in complex domains.",
      ],
    },
    {
      id: "identity",
      label: "Section 04",
      heading: "Identity Follows Experiments, Not Declarations",
      paragraphs: [
        "A recurring trap is identity-first planning: \"I am a founder,\" \"I am a writer,\" \"I am the person who ships X.\" Declared identity raises the cost of stopping when evidence says stop. Le Cunff argues for **identity by experiment**: you earn labels through repeated behavior in low-risk contexts until the label matches reality.",
        "This maps cleanly to technical careers. You do not become \"an architect\" by title; you become one by repeatedly making architectural decisions under review, documenting tradeoffs, and surviving contact with operations. Tiny experiments are how you sample roles before reorganizing your life around them.",
        "Anti-goals help here: list what you are willing to stop being. Experiments are not only additive; they prune paths that consume energy without compounding learning.",
      ],
    },
    {
      id: "curiosity",
      label: "Section 05",
      heading: "Curiosity Over Certainty",
      paragraphs: [
        "The book treats curiosity as infrastructure, not temperament. Pronoia — the assumption that the world is conspiring to teach you — is offered as a deliberate counterweight to paranoia and to performative certainty. In practice that means asking better questions before optimizing answers.",
        "For leaders, curiosity-over-certainty changes meeting dynamics: fewer commitments to solutions in the first ten minutes, more structured inquiry. For individuals, it changes journaling and reviews: less \"why am I behind,\" more \"what surprised me.\"",
        "Curiosity scales with safety. If your environment punishes failed experiments, you will still set goals — they will just be defensive. Building psychological safety (for yourself or your team) is a prerequisite for the loop to run at useful cadence.",
      ],
    },
    {
      id: "portfolio",
      label: "Section 06",
      heading: "An Experiment Portfolio, Not a Single Bet",
      paragraphs: [
        "Advanced practitioners run **portfolios** of parallel small experiments: one on health, one on craft, one on relationships, one on revenue — each bounded, none allowed to cannibalize the others until evidence promotes a winner. This is diversification applied to personal R&D.",
        "Promotion rules should be explicit: an experiment graduates when it repeats successfully across contexts, or when stopping would ignore consistent positive signal. Demotion is equally important: kill experiments that eat attention without learning yield.",
        "The portfolio view prevents the common failure mode of serial obsession — abandoning last month's goal because a new book sold a new goal. You are not chasing outcomes; you are managing a pipeline of inquiries.",
      ],
    },
    {
      id: "systems-link",
      label: "Section 07",
      heading: "Where This Meets Systems Work",
      paragraphs: [
        "Mission-critical engineering already lives by experiment culture: test plans, incremental verification, fault injection, after-action reviews. Tiny Experiments is the same epistemology applied when the system under test is your career or team culture.",
        "Use it when requirements are ambiguous, when the cost of a wrong multi-year bet exceeds the cost of many small probes, or when you need to develop people without locking them into premature specialization. Do not use it as an excuse to avoid commitment after evidence accumulates — the loop includes a reflect phase for a reason.",
        "Pair with explicit decision records: what was tried, what was observed, what was decided. Your future self (and your team) inherits an audit trail instead of a graveyard of abandoned resolutions.",
      ],
    },
  ],
  insight:
    "Direction is an emergent property of well-run small experiments — not a prerequisite you must possess before you are allowed to move.",
};

export default book;
