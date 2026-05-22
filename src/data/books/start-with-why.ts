import type { Book } from "./types";

const book: Book = {
  slug: "start-with-why",
  title: "Start with Why",
  subtitle: "How great leaders inspire everyone to take action",
  author: "Simon Sinek",
  year: "2009",
  description:
    "Purpose precedes product: the Golden Circle explains why some organizations inspire loyalty while others compete on features — and how to lead from belief, not manipulation.",
  readTime: "11 min summary",
  tags: ["Strategy"],
  mentalModelSlugs: ["golden-circle", "celery-test", "inspire-vs-manipulate"],
  keyTakeaways: [
    "People buy why you do something, not what you do — clarity of purpose is the differentiator, not feature lists.",
    "The Golden Circle flows inside-out: Why (belief) → How (process) → What (result). Most organizations invert it.",
    "Trust and inspiration require consistency between talk and action; manipulation works once, loyalty compounds.",
  ],
  intro: [
    "Simon Sinek opens with a pattern: under pressure, most leaders describe what they do and how they do it. Few can articulate why — the belief, cause, or purpose that makes the work worth doing beyond quarterly targets. The gap matters because biology, not marketing theory, explains the gap. Decisions in the limbic brain drive loyalty and gut feeling; the neocortex handles facts and features but not the feeling of \"this is for me.\"",
    "Start with Why is not a branding exercise. It is an argument about coordination: when everyone understands the purpose, decentralized teams can make aligned decisions without a decision tree for every tradeoff. When purpose is vague, alignment requires control — process, approvals, slogans on walls — and control does not scale.",
    "For technical leaders, the book reframes architecture reviews and roadmap fights. The what (ship the feature) and how (microservices, GitOps, this stack) are table stakes. The why (what threat, what operator, what failure mode we refuse to accept) is what keeps a program coherent when requirements churn.",
  ],
  sections: [
    {
      id: "golden-circle",
      label: "Section 01",
      heading: "The Golden Circle — Why, How, What",
      paragraphs: [
        "Sinek's core model is three concentric layers. **What** is the easiest to state: products, services, job titles, outputs. **How** is differentiation: proprietary process, culture, values in action, the way you build. **Why** is purpose — why the organization exists beyond making money, why anyone should care.",
        "Inspired organizations and leaders communicate from the inside out. They lead with why, then how, then what. Others lead with what (\"we make great computers\"), sometimes add how (\"they're beautifully designed\"), and treat why as an afterthought. The latter can win transactions; the former builds movements.",
        "The circle is a design tool for messages and for org design. If your engineering why is \"reliable data for the warfighter,\" then how might be \"proliferated architectures with short feedback loops\" and what might be \"this transport layer software.\" Invert the order and you sound like every other vendor.",
      ],
      table: {
        headers: ["Layer", "Question", "Audience effect"],
        rows: [
          ["Why", "Why do we exist?", "Belonging, trust, willingness to sacrifice"],
          ["How", "How do we do it?", "Differentiation, credibility"],
          ["What", "What do we deliver?", "Rational comparison, proof points"],
        ],
      },
    },
    {
      id: "biology",
      label: "Section 02",
      heading: "Why Biology Beats Bullet Points",
      paragraphs: [
        "Sinek maps the Golden Circle to brain structure: the neocortex handles language, analysis, and complex thought — ideal for explaining what and partial how. The limbic system handles feeling, trust, loyalty, and decision-making without words — where why lands.",
        "That is why feature wars feel exhausting and purpose-led brands feel obvious in hindsight. You cannot argue someone into a why with a spreadsheet; you can only demonstrate it through consistent action until the limbic system tags you as safe or aligned.",
        "For hiring and retention, the implication is blunt: compensation and perks are what-level levers. Shared purpose is a why-level lever. Teams with weak why over-index on title and cash; teams with strong why tolerate hard seasons because the work still means something.",
      ],
    },
    {
      id: "celery-test",
      label: "Section 03",
      heading: "The Celery Test — Filtering Decisions Through Purpose",
      paragraphs: [
        "Sinek's celery test: if your why is health, you buy celery and rice milk at the supermarket; if your why is indulgence, you buy Oreos and ice cream. Mixed signals — buying everything — make you indistinguishable and confuse everyone watching how you decide.",
        "Organizations fail the celery test when they claim a why but fund the opposite: \"we value innovation\" with KPIs that punish failure; \"customer first\" with roadmap driven only by largest deal. Employees learn the real why from budget and calendar, not posters.",
        "Applied to technical strategy: a stated why of \"operator safety\" should reject shortcuts that shave verification time, even when a launch date screams. Without that filter, every decision reopens a political fight. With it, tradeoffs get faster because the purpose already picked sides.",
      ],
    },
    {
      id: "inspire-manipulate",
      label: "Section 04",
      heading: "Inspiration vs. Manipulation",
      paragraphs: [
        "When why is missing, leaders default to manipulations: price cuts, fear, aspirational hype, novelty, peer pressure. Manipulations work — they drive transactions — but they do not build loyalty. Each tactic erodes margin or trust over time. Customers and employees churn to the next offer.",
        "Inspiration requires a why people can adopt as their own. Apple fans in 2009 did not buy computers; they bought participation in challenging the status quo. The what (Mac, iPod) changed; the why stayed legible.",
        "Manipulation is not always unethical — promotions and deadlines exist — but relying on them as strategy is a systems failure: you are optimizing extraction, not relationship. Mission-critical domains punish that eventually; outages and attrition are the invoice.",
      ],
    },
    {
      id: "trust",
      label: "Section 05",
      heading: "Trust, Culture, and the Circle of Safety",
      paragraphs: [
        "Sinek links inspiration to trust: people follow leaders who believe what they believe when they trust the leader will act consistently. Trust is built when words and actions match over time — especially under stress.",
        "The book's later examples (including cultural patterns at high-trust organizations) foreshadow ideas he develops further in Leaders Eat Last: cortisol vs. oxytocin, circle of safety. Here the point is simpler: without trust, why stays rhetoric. With trust, why becomes delegation fuel.",
        "Engineering managers see this in blameless postmortems versus witch hunts. The stated why might be learning; the lived why is revealed in whether incident leads are punished.",
      ],
    },
    {
      id: "finding-why",
      label: "Section 06",
      heading: "Finding and Communicating Your Why",
      paragraphs: [
        "Why is not invented in a workshop — it is discovered from patterns in what already energized you, what you defended when it cost you, what stories you repeat. Sinek (and later work with the Golden Circle Institute) treats why as a single sentence: \"To ___ so that ___.\"",
        "Once articulated, why must appear in hiring, onboarding, roadmap narratives, and recognition. Not as wallpaper — as a decision filter. New initiatives should be explainable through the why in one breath.",
        "For individuals: your personal why is not your job description. It is the contribution you are trying to make through whatever role you hold. Careers that feel incoherent often lack that sentence; roles that feel narrow but meaningful often have a sharp why underneath.",
      ],
    },
    {
      id: "systems-link",
      label: "Section 07",
      heading: "Where This Meets Systems Work",
      paragraphs: [
        "Architecture is a what; integration philosophy is how; the mission outcome you refuse to compromise is why. Programs that skip why produce elegant systems that solve the wrong problem.",
        "Use Start with Why when aligning multi-team efforts, writing executive summaries, or deciding what not to build. Pair it with Radical Candor-style feedback: purpose sets direction; candor maintains truth on the path.",
        "The failure mode is slogan why — aspirational language no budget supports. The celery test is your audit: list last quarter's five largest investments; do they look like celery or Oreos?",
      ],
    },
  ],
  insight:
    "People do not buy what you do; they buy why you do it — and they need to see that why in every decision that spends their trust.",
};

export default book;
