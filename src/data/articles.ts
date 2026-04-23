export interface ArticleSection {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  intro: string[];
  sections: ArticleSection[];
  insight: string;
}

export const articles: Article[] = [
  {
    slug: "satellite-engineering-budgets",
    title: "The Hidden Architecture of Satellites",
    subtitle: "How Engineering Budgets Make or Break Space Missions",
    description:
      "Every gram, watt, and arc-second is allocated before a satellite ever leaves the ground. Missions don't fail from a single catastrophe — they fail from budget violations that cascade through interconnected systems.",
    date: "Apr 2025",
    readTime: "7 min read",
    tags: ["Aerospace", "Systems Engineering", "Architecture"],
    intro: [
      "Picture this: you're designing a satellite that needs to capture high-resolution Earth imagery, survive 15 years in the harsh radiation environment of geostationary orbit, maintain pointing accuracy within 0.01 degrees, and do all of this while weighing less than your car and consuming less power than a hair dryer. How do you ensure every subsystem gets exactly what it needs — no more, no less — while leaving enough margin for the unexpected?",
      "In satellite engineering, 'budgets' aren't about money. They're about the fundamental physical resources that constrain every aspect of spacecraft design — immutable boundaries that define what's possible and what's fantasy. Every satellite, from a 1-kilogram CubeSat to the 6,800-kilogram James Webb Space Telescope, must respect the same rules. After analyzing thousands of missions, one pattern is crystal clear: missions that fail don't usually fail because of a single catastrophic event. They fail because of budget violations that cascade through interconnected systems.",
    ],
    sections: [
      {
        id: "mass",
        label: "Budget 01",
        heading: "Mass: The Tyranny of the Rocket Equation",
        paragraphs: [
          "Mass is the ultimate constraint in spaceflight. Every additional kilogram requires more fuel to launch, which itself adds mass, creating a vicious cycle described by Tsiolkovsky's rocket equation. This tyranny means mass budgets are managed with near-religious discipline.",
          "A typical breakdown for a 1,000 kg satellite allocates 25% to payload, 20% to structure, 18% to the power subsystem, 15% to propulsion, and the rest distributed across thermal control, attitude control, computing, and harness. The final 3% is margin — held as a buffer against the unknown.",
          "What makes this an art: margins must shrink as design matures. In early concept phases, 30% margin is standard. By launch, that drops to 5%. Every kilogram saved downstream was earned through engineering discipline upstream. The MarCO CubeSats that accompanied InSight to Mars weighed just 13.5 kg each yet included deep-space propulsion and communication systems — achievements that would have required hundreds of kilograms a decade earlier.",
        ],
      },
      {
        id: "power",
        label: "Budget 02",
        heading: "Power: The Electrical Circulatory System",
        paragraphs: [
          "Power is the lifeblood of a satellite. Without it, even the most sophisticated spacecraft becomes an expensive piece of orbital debris. The fundamental requirement is simple — generation must always exceed consumption. The implementation is anything but.",
          "Solar arrays degrade relentlessly. Radiation, thermal cycling, and micrometeorite impacts eat away at efficiency over time. After 15 years in geostationary orbit, arrays typically produce only 70–75% of their initial output. This degradation must be budgeted from day one. A satellite requiring 1,000W at end-of-life needs a beginning-of-life array sized to produce 2,600W — roughly 13 square meters of panel area to sustain it.",
          "Every watt dissipated as heat inside the spacecraft must also be rejected to space. There's no air to carry it away. A 1,000W heat load requires approximately 3 square meters of radiator area in GEO — adding mass, volume, and complexity. The power budget doesn't just govern what you can operate. It governs how large your satellite has to become.",
        ],
      },
      {
        id: "link",
        label: "Budget 03",
        heading: "Link Budget: The Whisper Across the Void",
        paragraphs: [
          "Imagine having a conversation with someone on the Moon using a flashlight and a pair of binoculars. That's essentially what satellite communication entails — except the flashlight is a radio transmitter and the binoculars are a parabolic dish.",
          "A typical LEO Earth observation satellite transmits 10 watts at 8 GHz. By the time that signal travels 500 km and reaches a 3-meter ground antenna, the received power is roughly 0.000000012 watts — one hundred trillion times weaker than what was sent. Engineers must ensure at least 3–6 dB of margin in clear weather, plus additional buffer for rain fade, which can add 20 dB of loss at higher frequencies.",
          "Link budget engineers juggle frequency selection, antenna size, modulation schemes, and error correction codes to squeeze every fraction of a decibel from the system. The budget is never fully locked — every design decision that touches antenna placement, transmitter power, or ground station access time ripples back into the numbers.",
        ],
      },
      {
        id: "pointing",
        label: "Budget 04",
        heading: "Pointing: The Steady Hand in Space",
        paragraphs: [
          "Imagine trying to photograph a dime from 500 kilometers away while traveling at 7.5 km/s. That's the challenge facing Earth observation satellites, and the pointing budget determines whether they succeed or produce expensive blurry images.",
          "Pointing errors don't simply add together — they accumulate via Root Sum Square methodology, meaning each error source compounds in quadrature. Star tracker inaccuracies, reaction wheel precision limits, structural flexing from thermal gradients, and control system processing delays all stack into a total error envelope that must stay within mission requirements.",
          "The Hubble Space Telescope achieves 0.007 arcsecond pointing stability — equivalent to holding a laser pointer steady on a dime in New York while standing in Los Angeles. That precision requires six-degree-of-freedom vibration isolation, reaction wheels with magnetic bearings, fine guidance sensors updating 40 times per second, and a thermally stable graphite-epoxy structure. Every element feeds the same budget. Slip one, and the others cannot compensate.",
        ],
      },
      {
        id: "radiation",
        label: "Budget 05",
        heading: "Radiation: The Invisible Accumulator",
        paragraphs: [
          "Space radiation degrades electronics gradually, dims solar cells, and occasionally causes sudden failures through single-event upsets — bit flips in memory that can cascade into system resets or corrupted commands. The radiation budget ensures components survive the accumulated dose across the full mission life.",
          "A satellite in low Earth orbit accumulates 10–30 kilorads over 10 years. One in medium orbit — where GPS satellites operate — sees 50–100 kilorads. Passing through the Van Allen belts can expose a spacecraft to over a megaRad. Each orbit class has a different radiation budget, and every component must be qualified against it.",
          "The mitigation hierarchy runs from orbit selection to shielding, parts selection, redundant design, and operational safe modes during solar storm events. Radiation-hardened parts can cost 100 times their commercial equivalents. The budget forces a hard conversation: where do you spend on hardening, and where do you accept calculated risk?",
        ],
      },
      {
        id: "cascade",
        label: "The Pattern",
        heading: "When Budgets Break: The Cascade",
        paragraphs: [
          "The Mars Climate Orbiter loss in 1999 is remembered as a unit conversion error — one team used metric, another used imperial. But at a systems level, it was a budget failure: the verification and validation budget didn't allocate sufficient resources to catch interface mismatches between subsystems.",
          "That's the real danger. Individual budgets seem manageable in isolation. The mass budget is 3% over — engineering can handle that. The power budget is tight but workable. Pointing margins are nominal. But when the satellite launches heavier than planned, the orbit insertion burn consumes more propellant than allocated, which reduces delta-V reserves, which constrains station-keeping, which shortens mission life, which undermines the entire business case.",
          "Budget violations compound. Engineers who understand this don't manage budgets as isolated constraints — they manage them as an interconnected system, watching the margins erode together and making trades with full visibility into the downstream effects.",
        ],
      },
    ],
    insight:
      "The art of satellite engineering isn't in any single budget — it's in understanding how every resource allocation decision propagates through every other constraint. That's not unique to spacecraft. It's the nature of any system where the physics are real and the margins are finite.",
  },
];
