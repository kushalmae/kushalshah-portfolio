import type { ArticleContent } from "./types";

const article: ArticleContent = {
  slug: "pwsa-tracking-layer",
  title: "PWSA Tracking Layer",
  subtitle: "Infrared sensing, missile detect-and-track, and the path from LEO stare to fire-control timelines",
  description:
    "The Tracking Layer is PWSA's dedicated missile-warning and tracking constellation in LEO — IR payloads cross-linked into Transport so threat data reaches the ground and the battlespace in seconds, not after a GEO processing chain.",
  date: "May 2026",
  readTime: "9 min read",
  tags: ["Aerospace", "Systems Engineering", "Mission Systems", "Sensors"],
  intro: [
    "If Transport is PWSA's heartbeat, Tracking is its eyes — a separate LEO constellation purpose-built for missile detection and tracking, not a repurposed Earth-observation platform or a GEO stare satellite lowered in altitude.",
    "Tracking Layer spacecraft carry infrared sensors tuned for boost-phase and midcourse signatures against earth limb and cloud backgrounds. Their data products are worthless without time: a track that reaches a fire-control node thirty seconds late is a different class of failure than a missed detection. That is why every Tracking satellite is designed to inject into the Transport mesh via optical inter-satellite links instead of relying on sparse, contended RF downlinks alone.",
    "This article covers Tracking Layer mission physics, constellation scaling across tranches, fusion with higher-orbit systems, and the engineering budgets that dominate IR space sensors. For the surrounding architecture, see the PWSA overview and the Transport Layer deep dive.",
  ],
  sections: [
    {
      id: "role",
      label: "Foundation",
      heading: "What Tracking Owns — and What It Does Not",
      paragraphs: [
        "Tracking owns remote sensing for missile threat detection and track formation. It does not own global data routing (Transport), wide-area strategic stare at GEO altitudes (MDA/SSC legacy chains), or general ISR custody of ground targets (Custody Layer partners). The layer's success metric is coherent tracks with timestamps and covariances that downstream battle-management and weapon systems can consume without reinterpretation.",
        "SDA sized Tranche 0 with fewer Tracking satellites than Transport — on the order of eight Tracking nodes versus roughly twenty Transport nodes in the first tranche drop. The ratio is intentional: demonstrate mesh integration and IR performance without forcing factory and ops scale to identical counts before the architecture is proven. Later tranches grow Tracking toward proportional scale as sensitivity requirements and global persistence drive more stare capacity.",
        "Tracking satellites are not interchangeable with Transport buses even when contractors share platforms. Payload mass, power, calibration timelines, and on-orbit checkout sequences differ. Treating them as the same program in systems engineering terms collapses requirements and guarantees ICD pain at integration.",
      ],
      relatedArticle: {
        slug: "pwsa-architecture",
        label: "Parent: The Proliferated Warfighter Space Architecture",
      },
    },
    {
      id: "sensors",
      label: "Section 01",
      heading: "Infrared Sensing for Missile Warning and Tracking",
      paragraphs: [
        "Missile tracking from space is an infrared problem first. Boost-phase plumes, midcourse bodies, and reentry heating present signatures against cold space, earth limb, and variable cloud cover. Sensor design trades focal-plane architecture, sensitivity versus false-alarm rate, frame rate, and dynamic range — the same fundamental tensions as OPIR programs, compressed into smaller apertures on proliferated buses.",
        "Stare versus scan is a mission-architecture choice, not a vendor preference. Wide-area surveillance favors staring configurations that watch fixed volumes; tracking custody of specific threats may require agile scan patterns or step-stare strategies. LEO motion adds revisit geometry commercial EO users rarely care about: the satellite moves, the background changes, and registration errors look like velocity noise if calibration is weak.",
        "On-orbit calibration and thermal stability are lifecycle costs, not launch-day checkboxes. IR payloads drift with temperature cycles across eclipse entry and exit; ground teams maintain bias models and star-catalog updates that keep tracks trustworthy. A tracking layer that launches on schedule but skimps calibration ops delivers bits that fuse poorly with GEO systems — and operators lose trust fast.",
      ],
      relatedArticle: {
        slug: "satellite-pointing-budget",
        label: "Related: Satellite Pointing Budget — stability trades for optical payloads",
      },
    },
    {
      id: "transport-handoff",
      label: "Section 02",
      heading: "Cross-Linking Tracks into Transport",
      paragraphs: [
        "A detection on a Tracking satellite is the beginning of a data path, not the end of the mission. OISLs carry track messages, sensor metadata, and priority flags into the Transport mesh where Battle Management nodes may correlate, filter, or augment before downlink. The interface between Tracking payload software and Transport routing logic is an ICD worth its own test campaign — not a late integration surprise.",
        "Latency budgets should be written end to end: dwell time on target, sensor processing, cross-link serialization, hop count through the mesh, on-orbit battle-management delay, ground gateway processing, and C2 display. Tracking optimizes the first terms; Transport and Battle Management own the middle; ground and tactical radios own the last mile. A slip in any segment burns the same fire-control window.",
        "When OISLs are unavailable — safe mode, terminal fault, constellation gap — RF downlink may still move critical tracks, but at lower rate and higher contention. Architecture resilience means dual paths are planned, not improvised during conflict.",
      ],
      relatedArticle: {
        slug: "pwsa-transport-layer",
        label: "Companion: PWSA Transport Layer — mesh routing and edge processing",
      },
    },
    {
      id: "tranches",
      label: "Section 03",
      heading: "Tranche Evolution for Tracking",
      paragraphs: [
        "Tranche 0 proved proliferated IR tracking could be built and flown on SDA's cost and schedule model — warfighter immersion with demonstrations that the data is useful, not just collectible. Tranche 1 stresses regional persistence and tighter coupling to tactical data links and advanced missile detection/tracking requirements in theater.",
        "Tranche 2 brings global persistence for the capabilities introduced in Tranche 1, informed by at least two years of operating earlier generations. Tranche 3 explicitly targets improved sensitivity for missile tracking, better beyond-line-of-sight targeting support, and lessons from threats observed while Tranche 0/1/2 operate concurrently.",
        "Sensitivity improvements are not a single knob. They may mean larger apertures, colder optics, better algorithms, more satellites for geometric diversity, or fusion with MEO/GEO assets. The tranche plan forces those trades into discrete launchable increments instead of a perpetual pre-IOC study.",
      ],
      table: {
        headers: ["Tranche", "Tracking theme", "Scale indicator (public briefings)"],
        rows: [
          ["T0", "Feasibility; mesh-fed tracks", "~8 spacecraft in first tranche drop"],
          ["T1", "Regional advanced detect/track", "Growth with theater persistence"],
          ["T2", "Global persistence", "Hundreds across architecture (Transport + Tracking)"],
          ["T3+", "Sensitivity + BLOS targeting upgrades", "Threat-driven payload refresh"],
        ],
      },
    },
    {
      id: "fusion",
      label: "Section 04",
      heading: "Fusing LEO Tracking with GEO and MEO Chains",
      paragraphs: [
        "PWSA does not exist in a vacuum. MDA's BMDS and SSC's MEO/GEO assets provide long heritage in missile warning and tracking. Tracking Layer LEO adds low-latency, proliferated geometry — more look angles, faster revisit on some threat profiles, and mesh-routed data that does not wait on a single exquisite downlink.",
        "Fusion is a systems problem: align coordinate frames, time bases, track IDs, and classification labels so operators see one picture, not three incompatible streams. GEO stare detects and holds strategic context; LEO tracking refines geometry for engagement timelines; ground algorithms and battle management decide which source wins for which cue at which phase of flight.",
        "Northrop Grumman and Lockheed Martin heritage in OPIR and missile-warning algorithms is relevant background for anyone implementing fusion — the portfolio's OPIR performance work is the same class of problem at different altitude and refresh rate. Architects should specify which MOEs/MOPs apply per layer (detection latency, track accuracy, false track rate, handoff time) rather than a single \"missile warning\" checkbox.",
      ],
    },
    {
      id: "data-products",
      label: "Section 05",
      heading: "From Detection to Fire-Control-Ready Tracks",
      paragraphs: [
        "Tracking Layer data products must be weapon-system literate: state vectors or measurement streams with documented covariance, sensor source metadata, and timestamps traceable to a mission clock the Transport mesh distributes. Ambiguous tracks — clutter, booster debris, aircraft glint — are filtered on orbit where Battle Management has context, or on ground where human operators still hold authority depending on rules of engagement.",
        "Beyond-line-of-sight targeting cues are an explicit Tranche 3 theme. That ties Tracking to Custody and Transport simultaneously: you need target geometry, a mesh path to the shooter, and latency low enough that the target has not moved beyond the seeker's capture volume. Tracking supplies the measurement; Transport and tactical gateways supply delivery.",
        "Test and validation differ from comms checkout. HIL/SIL with synthetic plume injection, recorded live-fire exercises, and cross-comparison against legacy OPIR chains are the evidence package — not a single on-orbit health ping. SDA's tranche model embeds those demos in operational timelines rather than deferring them to IOC years later.",
      ],
    },
  ],
  insight:
    "Tracking Layer value is measured in seconds and microradians, not in satellite count. Fly the IR payload you can calibrate, link it into Transport you can route, and fuse it with GEO heritage you can trust — otherwise proliferation just gives you more cameras on the same late timeline.",
};

export default article;
