import type { Book } from "./types";

const book: Book = {
  slug: "radical-candor",
  title: "Radical Candor",
  subtitle: "Be a kick-ass boss without losing your humanity",
  author: "Kim Scott",
  year: "2017",
  description:
    "A management framework built on caring personally and challenging directly — with a map of ruinous empathy, obnoxious aggression, and how to give guidance that helps people grow.",
  readTime: "12 min summary",
  tags: ["Leadership"],
  mentalModelSlugs: [
    "radical-candor",
    "feedback-quadrant",
    "rock-stars-superstars",
  ],
  keyTakeaways: [
    "Radical Candor is not brutality — it is caring personally while challenging directly so people know you want them to win.",
    "Ruinous empathy (nice but vague) destroys performance as surely as obnoxious aggression; both avoid the hard truth that helps.",
    "Growth management requires different paths for rock stars (stable excellence) and superstars (steep trajectory) — one-size-fits-all promotion tracks waste both.",
  ],
  intro: [
    "Kim Scott wrote Radical Candor from bruises: Google, Apple, her own startup. The book's promise is practical — how to give feedback that changes behavior without dehumanizing people. The mechanism is two dimensions: care personally and challenge directly. Nail both and you get Radical Candor. Miss one and you land in a named failure mode everyone recognizes but rarely admits.",
    "For technical leaders, the book matters because engineering culture often confuses two virtues: respect and avoidance. Teams praise kindness while letting design flaws, review laziness, and toxic heroes persist. Scott's framework does not license cruelty; it forbids silent complicity.",
    "The mental models below translate her quadrants and career taxonomy into tools you can use in 1:1s, performance conversations, and org design — especially when you are leading experts who experience feedback as judgment on their identity.",
  ],
  sections: [
    {
      id: "two-dimensions",
      label: "Section 01",
      heading: "Care Personally and Challenge Directly",
      paragraphs: [
        "**Care personally** means you see reports as whole humans, not interchangeable labor. Not fake intimacy — genuine investment in their growth, life context, and success. **Challenge directly** means you tell hard truths clearly and soon, without passive-aggressive hints or public humiliation.",
        "Radical Candor is the intersection: \"I care about you, and this behavior is not good enough — here is why, here is what I need instead.\" People can hear it because the relationship proved you are not attacking them for sport.",
        "Scott insists these are learnable behaviors, not personality. Introverts can care; conflict-averse managers can learn scripts and timing. What is not negotiable is skipping challenge because you want to be liked.",
      ],
    },
    {
      id: "quadrant",
      label: "Section 02",
      heading: "The Four Quadrants — Candor, Empathy, Aggression, Insincerity",
      paragraphs: [
        "Plot care on one axis and challenge on the other. **Radical Candor**: high care, high challenge. **Ruinous Empathy**: high care, low challenge — you soften feedback until it is useless; the person thinks they are fine until they are fired or burned out. **Obnoxious Aggression**: low care, high challenge — truth without relationship; often correct facts, zero uptake. **Manipulative Insincerity**: low care, low challenge — politics, flattery, or abandonment.",
        "Most engineering managers default to Ruinous Empathy during growth: praising effort without naming the gap, avoiding the review comment that would help, letting \"brilliant jerk\" behavior slide because the code ships.",
        "Obnoxious Aggression sometimes masquerades as \"high standards.\" Scott's test: does the person leave the conversation knowing you are on their side? If not, you were aggressive, not candid.",
      ],
      table: {
        headers: ["Quadrant", "Care", "Challenge", "Typical symptom"],
        rows: [
          ["Radical Candor", "High", "High", "Clear feedback + relationship intact"],
          ["Ruinous Empathy", "High", "Low", "Surprise poor review; unresolved mediocrity"],
          ["Obnoxious Aggression", "Low", "High", "Defensiveness; fear-driven compliance"],
          ["Manipulative Insincerity", "Low", "Low", "Politics; disengagement"],
        ],
      },
    },
    {
      id: "guidance",
      label: "Section 03",
      heading: "Guidance — Praise and Criticism in the Same Currency",
      paragraphs: [
        "Scott treats praise and criticism as the same activity: guidance that helps people improve. Both must be specific, timely, and about behavior — not character assassination. **Situation, behavior, impact** beats vague \"great job\" or \"tone it down.\"",
        "Praise should explain what to repeat; criticism should explain what to change and why it matters to the mission. Delayed feedback is rewritten history; people cannot connect action to consequence.",
        "For code review culture: Radical Candor looks like rigorous comments plus respect for the author — challenge the work, confirm you want them to succeed. Ruinous Empathy looks like LGTM on a flawed design. Obnoxious Aggression looks like public ridicule.",
      ],
    },
    {
      id: "rock-super",
      label: "Section 04",
      heading: "Rock Stars and Superstars",
      paragraphs: [
        "Not everyone wants the same career curve. **Rock stars** are excellent, stable, and often deepening craft — force-promoting them into management wastes a killer IC and creates a mediocre boss. **Superstars** are on steep growth trajectories; they need new scope fast or they leave.",
        "Confusing the two produces predictable damage: superstar bored in a role tuned for rock star stability; rock star crushed by expectations to \"level up\" into people management they never wanted.",
        "Org design implication: dual ladders, role clarity, compensation that rewards mastery not only headcount. Performance systems that assume everyone wants the next title are Ruinous Empathy at scale — kind on paper, cruel in outcome.",
      ],
    },
    {
      id: "listen-challenge",
      label: "Section 05",
      heading: "Listen, Clarify, Debate, Decide, Persuade, Execute, Learn",
      paragraphs: [
        "Scott borrows and extends decision processes from her operating experience: solicit ideas before advocating, debate before deciding, commit after the decision, then execute and learn. The meta-skill is switching modes — do not debate when you should decide; do not decide when you should listen.",
        "Technical leaders fail this when they solutionize in the first minute of a design review, or when they reopen decisions endlessly without new data. Candor requires telling the room which mode you are in.",
        "Learning closes the loop: after shipping or failing, revisit the guidance you gave. Did feedback land? Was the standard clear? Without learning, challenge becomes noise.",
      ],
    },
    {
      id: "up-down-across",
      label: "Section 06",
      heading: "Candor Up, Down, and Across",
      paragraphs: [
        "Radical Candor is not only manager-to-report. Upward feedback — challenging your boss with care — prevents emperor-has-no-clothes programs. Peer candor prevents silos. Skip-level and cross-functional honesty are culture products, not personality accidents.",
        "Bosses earn upward candor by reacting well: thank, fix, or explain why not — never punish the messenger. One punitive response trains the org into Manipulative Insincerity for a year.",
        "For matrixed aerospace/software programs: candor across contractors and government partners is harder but more valuable. Ruinous Empathy shows up as \"coordination issues\" euphemisms while schedule risk compounds.",
      ],
    },
    {
      id: "systems-link",
      label: "Section 07",
      heading: "Where This Meets Systems Work",
      paragraphs: [
        "Complex systems fail when local optimizations hide global truth. Radical Candor is an information routing protocol: get accurate state to decision-makers fast, without destroying the humans who report it.",
        "Pair with Start with Why: purpose tells you what matters; candor tells you whether reality matches the plan. Architecture reviews without candor produce elegant diagrams of systems that will not survive operations.",
        "Start with one behavior change: within 24 hours, give one piece of specific praise and one piece of specific challenge to the same person. Measure whether they can repeat both back to you. That is your cultural integration test.",
      ],
    },
  ],
  insight:
    "Caring without challenging is not kindness — it is borrowing comfort today at the cost of someone's growth and the team's truth tomorrow.",
};

export default book;
