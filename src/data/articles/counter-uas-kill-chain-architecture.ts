import type { Article } from "./types";

const article: Article = {
  slug: "counter-uas-kill-chain-architecture",
  title: "Designing the Kill Chain",
  subtitle: "Sensor fusion, timing budgets, and SWaP constraints in forward-deployed drone defense",
  description:
    "A drone swarm costs a few thousand dollars to field. Defeating it reliably, in any weather, in under 20 seconds, from a system you can assemble in three hours — that's a systems engineering problem.",
  date: "Nov 2022",
  readTime: "7 min read",
  tags: ["Aerospace", "Systems Engineering", "Architecture"],
  intro: [
    "A drone swarm isn't just a volume problem — it's a geometry, timing, and weather problem simultaneously. Small Group 1 quadrotors fly slow and low; larger Group 3 drones fly fast and high. Defeating all three classes at ranges from 3 to 13 kilometers, in all-weather conditions, while keeping the system light enough to airdrop into a forward operating base: that's the design space.",
    "The architecture that emerged from those constraints is a case study in resource-budget thinking — the same discipline that governs spacecraft design. Mass, power, volume, and time are all fixed. Every component decision is a trade. And the kill chain either closes within its timing budget, or the drone wins.",
  ],
  sections: [
    {
      id: "threat",
      label: "The Problem",
      heading: "What Makes Drone Swarms Hard to Defeat",
      paragraphs: [
        "The drone threat isn't monolithic. Group 1 drones are small commercial quadrotors — slow, low-altitude, visually small. Group 2 are medium UAS with greater range and speed. Group 3 are large, fast, and fly at altitudes that challenge both optical and radar systems differently. A defense architecture that closes against Group 1 at 3 km may fail against Group 3 at 5 km.",
        "Swarm geometry adds another dimension. A nominal 8-drone swarm with 0.1 km spacing between rows creates a maximum angular spread of roughly 5 degrees at threshold engagement ranges. That narrow spread is actually an advantage for the defender: once you acquire the first target in a swarm, you can narrow your field of interest dramatically for subsequent searches — reducing false alarms and accelerating tracking on the remaining threats.",
        "The hardest constraint isn't detection. It's time. A 20-second window to detect, identify, track, and engage a single threat leaves very little margin for sensor handoffs, C2 latency, or decision hesitation. Every second allocated to one phase is a second stolen from another.",
      ],
    },
    {
      id: "sensors",
      label: "The Core Tradeoff",
      heading: "Why No Single Sensor Closes the Gap",
      paragraphs: [
        "EOIR cameras offer superior track accuracy — on the order of 100 microradians, compared to 0.5 degrees for a radar system. That precision matters enormously when you're trying to cue a gun at a fast-moving target at 3 kilometers. But EOIR has a hard failure mode: fog, heavy rain, and dust render it effectively blind. In contested forward areas, those are not edge cases.",
        "Radar handles all-weather operation well and can search a full 360-degree azimuth by 90-degree elevation field of view continuously. But radar track accuracy alone is insufficient to directly cue a kinetic effector — the pointing error translates into a miss at range. You can detect the drone at 11 kilometers, but you cannot reliably shoot it at 5.",
        "The architecture solution is pairing: use radar as the primary full-hemisphere search sensor, and EOIR as the precision handoff for engagement. Radar cues the EOIR to a narrow angular window; EOIR provides the fine track needed to fire. When EOIR degrades due to weather, radar holds the search; when radar is supporting other swarm elements, EOIR stares at its assigned sector. Each sensor compensates precisely where the other fails.",
      ],
      diagramId: "sensor-fusion",
    },
    {
      id: "killchain",
      label: "The Architecture",
      heading: "The Kill Chain and Its Timing Budget",
      paragraphs: [
        "A kill chain has four phases: detect, identify, track, and engage. Each consumes time from a fixed budget. The requirement — 20 seconds per single threat at threshold — sets the total. The architecture allocates that time across phases, and the allocation determines which sensors can be used, how long the C2 system has to classify, and how many shots the gun can fire before the threat exits the engagement envelope.",
        "The timing analysis across all three drone groups revealed an important asymmetry. Group 2 drones, flying faster and at moderate altitude, had the tightest engage window — only 23.3 seconds to close the shot — while Group 1's lower speed provided a more forgiving 58.3 seconds. Group 3's size made it the easiest to detect early, but its altitude and speed created the most complex engagement geometry.",
        "C2 system latency directly eats the timing budget. Every second spent on threat classification, display rendering, or operator decision time is a second not available for track refinement or engagement. This is why AI-assisted classification matters architecturally — not as a feature, but as a timing budget recapture mechanism. If the system can present a classified, prioritized threat to the operator in two seconds instead of eight, that six seconds flows directly into fire control.",
      ],
      diagramId: "killchain-timing",
    },
    {
      id: "swap",
      label: "The Constraint",
      heading: "SWaP as a Design Driver",
      paragraphs: [
        "The SWaP-C envelope — Size, Weight, and Power, plus Cost — is not a packaging constraint. It's an architectural one. A system limited to 20 kilowatts rules out certain radar configurations entirely. A 2,000-pound limit means helicopter-liftable, which means modular subassemblies with no field-permanent connections. A 1,000 cubic foot volume limit means C-130 compatible. The 3-hour assembly requirement means no soldering, no custom cable runs, no specialized tooling on site.",
        "These constraints are what drove the selection of a metamaterials electrically scanned array radar over a traditional active electronically scanned array. MESA architecture achieves comparable detection performance at roughly half the size, weight, and power of equivalent AESA systems — because beam steering happens through engineered material properties, not through thousands of phase shifters. In a SWaP-constrained design, that difference is decisive.",
        "Cost interacts with SWaP in non-obvious ways. A radar that costs less to produce but draws more power forces a larger generator, which adds weight, which may require a larger vehicle, which may eliminate certain deployment scenarios entirely. The true unit cost of a component is its direct cost plus the SWaP-cost it imposes on everything else in the system.",
      ],
    },
    {
      id: "results",
      label: "What Closed",
      heading: "Where the Architecture Succeeded — and Where It Didn't",
      paragraphs: [
        "The architecture met objective-level performance on four of six requirements: 360-degree field of regard, simultaneous engagement of 20 targets, 3-kilometer engagement range for Group 1 and 2 drones, and a 20-second single-threat engagement time. On multiple simultaneous threats, the system achieved 1 second per threat — ten times better than the objective.",
        "Two requirements landed at threshold rather than objective. Group 3 effectiveness at 5 kilometers came in at 90% against a 98% threshold — a gap addressed in the prototype plan through higher fire rate and innovative HEP ammunition selection, where explosive proximity rounds expand the effective kill radius beyond what a solid projectile achieves. Operating temperature came in at −32°C against a −40°C requirement — a vendor modification, not an architectural change.",
        "The lesson from the gaps is as instructive as the successes. Both shortfalls were at the system's extremes — maximum range, minimum temperature — where margin is thinnest and component baselines are furthest from spec. A systems architecture that identifies those stress points early, and builds a targeted prototype test plan around them, recovers faster than one that discovers them late.",
      ],
    },
  ],
  insight:
    "Every kill chain is a budget. You have a fixed amount of time, a fixed amount of sensor accuracy, and a fixed amount of power to work with. The architecture's job is to allocate those resources so the chain closes — not just on paper, but in the worst weather, against the hardest target, on the day when nothing goes as planned.",
};

export default article;
