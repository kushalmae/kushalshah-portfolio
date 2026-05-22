import type { Article } from "./types";

const article: Article = {
  slug: "pwsa-architecture",
  title: "The Proliferated Warfighter Space Architecture",
  subtitle: "How SDA rebuilt national-security space acquisition around tranches, layers, and a LEO mesh",
  description:
    "PWSA (formerly NDSA) is the Pentagon's answer to slow GEO-centric procurement: a proliferated LEO stack built in two-year tranches, organized into functional layers, and designed to put tactical data on the ground before the threat moves.",
  date: "May 2026",
  readTime: "11 min read",
  tags: ["Aerospace", "Systems Engineering", "National Security"],
  intro: [
    "For decades, U.S. national-security space meant a small number of large satellites in geostationary and mid-Earth orbit — exquisite assets with long development cycles, monolithic ground segments, and procurement timelines measured in years. That model still has a role. It no longer matches the pace adversaries set in low Earth orbit.",
    "The Space Development Agency was stood up in 2019 with an explicit mandate: reform acquisition, proliferate capability in LEO, and deliver integrated missile warning, tracking, and tactical data to the warfighter on a schedule industry can plan against. The result is the Proliferated Warfighter Space Architecture (PWSA) — still often called the National Defense Space Architecture (NDSA) in older briefings and press.",
    "PWSA is not a single program or a single constellation. It is a layered architecture — transport mesh, tracking sensors, battle management at the edge, custody via partners, and ground support tied together by optical inter-satellite links and a tranche-based launch rhythm. Understanding it means understanding how the Pentagon divided orbital regimes across agencies, how acquisition was sliced into generational drops, and why each layer exists as a separable engineering problem.",
  ],
  sections: [
    {
      id: "origin",
      label: "Section 01",
      heading: "Why the Architecture Exists",
      paragraphs: [
        "The problem statement is familiar to anyone who has sat through a defense acquisition review: legacy methods optimize for a few highly capable platforms, not for resilience, latency, or industrial scale. Frank Calvelli's space acquisition philosophy memo put it plainly — developing a small number of large satellites plus large monolithic ground systems over many years cannot remain the default if the U.S. intends to compete in space.",
        "SDA's charter was to break that bind. Patrick Shanahan's 2019 memorandum establishing the agency framed the goal as persistent, resilient, global, low-latency surveillance — a prerequisite to deterrence, not a science project. PWSA grew out of that mandate as a tactical LEO network: missile warning and tracking, beyond-line-of-sight targeting cues, position/navigation/timing when GPS is degraded, and the infrastructure to move that data to whoever needs it on the ground with minimal delay.",
        "The architectural shift is as much about operations as orbit. Proliferation trades individual satellite fragility for network survivability. Smallsats cost orders of magnitude less than traditional GEO platforms, which changes how many nodes you can afford, how fast you can refresh technology, and how painful the loss of any single asset is to the mission.",
      ],
      relatedArticle: {
        slug: "satellite-orbit-types",
        label: "Related: Orbits as Mission Architecture — LEO vs GEO trade space",
      },
    },
    {
      id: "division-of-labor",
      label: "Section 02",
      heading: "GEO, MEO, and LEO — Who Owns What",
      paragraphs: [
        "Space is not new to the Department of Defense. Missile Defense Agency and Space Systems Command have operated GEO and MEO missile-tracking and defense assets for decades. SDA's addition is deliberate: PWSA is the LEO piece of an integrated national-defense space picture, not a replacement for everything that already flies higher.",
        "MDA descends from the Strategic Defense Initiative consolidation of the 1980s and today operates the Ballistic Missile Defense System, including a GEO constellation component for missile detection and tracking. SSC delivers lethal and resilient space capabilities with operational heritage in MEO and GEO. SDA coordinates with both so constellation planning, data products, and operator workflows do not fork into incompatible silos.",
        "The division of labor is orbital and functional, not bureaucratic turf for its own sake. GEO and MEO provide persistent wide-area stare and established missile-warning chains. LEO provides lower latency paths, denser revisit, and a mesh that can reroute around attrition. Frank Turner's framing — everybody brings core competencies to an integrated architecture — is the systems-integration requirement written in org chart terms.",
      ],
      table: {
        headers: ["Agency", "Primary regimes", "Core contribution to integrated defense space"],
        rows: [
          [
            "SDA",
            "LEO (PWSA)",
            "Proliferated transport + tracking tranches; tactical data links; rapid tranche cadence",
          ],
          [
            "MDA",
            "GEO (BMDS component)",
            "Ballistic missile defense system; established detection/tracking chain",
          ],
          [
            "SSC",
            "MEO / GEO",
            "Legacy and next-gen resilient space capabilities; program-of-record integration",
          ],
        ],
      },
    },
    {
      id: "tranches",
      label: "Section 03",
      heading: "Tranches as the Acquisition Architecture",
      paragraphs: [
        "Building hundreds of satellites while moving fast required decomposing PWSA into tranches — generational capability drops on a fixed calendar. SDA targets September of even-numbered years for tranche launches. That rhythm is the demand signal industry asked for: a schedule and a scope that contractors can staff against without guessing which fiscal year a down-select might slip into oblivion.",
        "The tranche model is iterative product development applied to orbital infrastructure. If a sensor or processor is not ready for Tranche N, it ships on N+2 rather than holding the entire architecture hostage. Tranche 0 was warfighter immersion — prove proliferated LEO is achievable on cost, schedule, and scale. Tranche 1 adds initial regional warfighting capability. Tranche 2 expands to global persistence. Later tranches fold in improved missile-tracking sensitivity, additional PNT, protected comms, and responses to threats identified while earlier generations operate.",
        "Schedule discipline has real engineering consequences. Tranche 0 slipped from its original September window into late calendar year launches when supply chains — notably chip availability — constrained integrators. The agency still planned for on-orbit demonstrations on the original operational timeline where possible. \"Trains leave on time\" is not fanfare; it is how ground software, factory throughput, and operator training stay aligned across a multi-decade architecture.",
      ],
      table: {
        headers: ["Tranche", "Target era", "Capability theme"],
        rows: [
          [
            "Tranche 0",
            "FY22",
            "Minimum viable proliferated LEO — cost, schedule, scalability; warfighter immersion",
          ],
          [
            "Tranche 1",
            "FY24",
            "Initial warfighting — regional persistence, tactical data links, advanced missile detect/track",
          ],
          [
            "Tranche 2",
            "FY26",
            "Global persistence for Tranche 1 capabilities; lessons from operating Gen 0",
          ],
          [
            "Tranche 3",
            "FY28",
            "Improved tracking sensitivity, BLOS targeting, added PNT, lasercom / protected RF advances",
          ],
          [
            "Tranche 4",
            "FY30",
            "Continued layer evolution against current and emerging threats",
          ],
        ],
      },
    },
    {
      id: "layers-overview",
      label: "Section 04",
      heading: "Seven Layers, One Integrated Stack",
      paragraphs: [
        "PWSA is organized by function, not by satellite bus. Some layers are full constellations; some are hosted payloads; some are concepts fulfilled by partner assets feeding the mesh. That decomposition lets requirements, interfaces, and test plans stay layer-scoped while integration tests prove the stack end to end.",
        "At the center are two LEO constellations: Transport — a global optical mesh moving data at the speed of light with narrow beams that are harder to intercept than omnidirectional RF — and Tracking — infrared-equipped sensors that detect and follow missile threats, cross-linked into Transport for routing and downlink. Everything else either enables those two (Support), derives capability from them (Navigation, Battle Management), or extends the architecture without duplicating sensors (Custody, Emerging Capabilities).",
      ],
      table: {
        headers: ["Layer", "Physical form", "Primary function"],
        rows: [
          ["Support", "Ground + launch infrastructure", "Ops centers, integration, launch, global downlink path"],
          ["Transport", "LEO constellation (~20+ per tranche growth)", "Optical mesh; all tactical data transits here"],
          ["Tracking", "LEO constellation (IR payloads)", "Missile detect/track; feeds Transport via OISL"],
          ["Navigation", "Derived from Transport mesh", "PNT backup when GPS unavailable — not a GPS replacement"],
          ["Battle Management", "Hosted compute on Transport sats", "On-orbit processing; cuts ground round-trips for latency"],
          ["Custody", "Partner / commercial / NRO assets", "ISR target detect/track via mesh — no dedicated SDA ISR constellation"],
          ["Emerging Capabilities", "Experiments → tranche inserts", "SDA, tagging, alt-PNT, comms, space domain awareness"],
        ],
      },
    },
    {
      id: "transport-layer",
      label: "Section 05",
      heading: "Transport Layer — The Mesh Data Plane",
      paragraphs: [
        "Transport is the heartbeat of PWSA: a proliferated LEO constellation cross-linked by optical inter-satellite links, hosting Battle Management compute and enabling Navigation broadcasts derived from mesh geometry. Every other layer's products route through it — Tracking tracks, Custody ISR, ground injections, tactical gateways.",
        "The canonical mesh picture is four optical neighbors per satellite — forward, aft, port, starboard — forming a distributed router where node loss triggers reroute rather than mission blackout. Tranche 0 launched on the order of twenty Transport spacecraft; later tranches scale toward regional and global persistence on the fixed even-year cadence.",
      ],
      relatedArticle: {
        slug: "pwsa-transport-layer",
        label: "Deep dive: PWSA Transport Layer — OISL mesh, tranches, and ops at scale",
      },
    },
    {
      id: "tracking-layer",
      label: "Section 06",
      heading: "Tracking Layer — Infrared Detect and Track",
      paragraphs: [
        "Tracking is a separate LEO constellation with IR payloads built for missile warning and tracking, not repurposed commercial EO. Tranche 0 flew roughly eight Tracking satellites against ~twenty Transport nodes — proving IR performance and mesh handoff before scaling counts with global persistence requirements.",
        "Tracks only matter if they reach fire-control systems in time. OISLs into Transport are the primary path; RF downlink remains contingency. Fusion with GEO/MEO heritage chains is an explicit architecture goal so operators see one timeline, not competing stovepipes.",
      ],
      relatedArticle: {
        slug: "pwsa-tracking-layer",
        label: "Deep dive: PWSA Tracking Layer — IR sensing, fusion, and fire-control timelines",
      },
    },
    {
      id: "edge-and-partners",
      label: "Section 07",
      heading: "Battle Management, Custody, and the Ground Boundary",
      paragraphs: [
        "Battle Management is edge computing in orbit — processors on Transport satellites that arbitrate which data moves where, which tracks get promoted, and which tasks stay on the spacecraft instead of transiting to a ground cluster and back. Turner’s latency argument is architectural: if point A to point B is the engagement geometry, every unnecessary ground hop is wasted seconds.",
        "Navigation Layer capability is emergent from the mesh geometry itself: with enough nodes and stable timing, Transport can broadcast position and time to warfighters who have lost or cannot trust GPS. SDA is explicit that this supplements GPS on bad days; it does not replace a core national PNT service.",
        "Custody Layer is the federation play. ISR detect-and-track does not require SDA to field yet another sensing constellation if commercial and intelligence-community satellites can inject data into the same optical transport network. The architecture buys integration instead of duplication — provided interfaces, security, and latency budgets are negotiated up front, not bolted on after launch.",
        "Emerging Capabilities Layer is the controlled buffer for technologies that are not ready for the next tranche but might be ready for the one after: space domain awareness, alternative navigation, RF identification, tactical comms augmentation. SDA’s commitment to experiment with warfighter input before scaling is how the stack stays current without rewriting the entire architecture every time a startup ships a new payload card.",
      ],
    },
    {
      id: "operations-view",
      label: "Section 08",
      heading: "What It Looks Like from Operations",
      paragraphs: [
        "From a mission-operations standpoint, PWSA is a multi-constellation, multi-tranche system of systems. Launch integrates satellites under the Support Layer contract structure — Tranche 0 famously rode SpaceX, including early pathfinder launches on rideshare missions before dedicated tranche stacks. On orbit, each spacecraft must join the mesh, establish cross-links, pass health and function checks, and begin producing or relaying data products operators can trust under contact schedules that were designed for hundreds of assets, not a dozen.",
        "Ground software, FIDO-class tools, flight-software state machines, and GNC behaviors do not scale linearly with satellite count, but they do scale in complexity: more contacts, more anomalies, more version skew across tranches flying concurrently. Tranche 2 and beyond assume Tranche 0/1 lessons absorbed into procedures, automation, and interface control — the same way any long-lived commercial constellation treats early shells as operational prototypes rather than throwaway demos.",
        "Commercial convergence is unavoidable. SpaceX Starshield markets secure, government-oriented networking built on Starlink heritage — overlapping problem space with Transport’s mesh and ground security story. Whether programs compete, cooperate, or partition missions is an acquisition and policy question; technically, the industry is converging on proliferated LEO plus optical links plus edge processing as the default architecture for resilient connectivity.",
      ],
    },
  ],
  featuredWork: [
    {
      title: "SDA Tranche 2 Transport Layer (T2TL)",
      org: "Rocket Lab — Global Operations",
      year: "2025–Present",
      type: "Mission Operations",
      role: "Mission Ops Lead within PWSA",
      highlights: [
        "Operations across flight software, GNC, FIDO, and ground systems for transport-layer spacecraft.",
        "Containerized ground software on AWS/Kubernetes — integration testing and mission rehearsal across stacks.",
        "Early operational concept work for Tranche 3 Transport Layer follow-on missions.",
      ],
    },
  ],
  insight:
    "PWSA is a lesson in architectural decomposition under schedule pressure: separate the mesh from the sensors, separate the orbit from the ground, separate this tranche from the next — then integrate ruthlessly at the interfaces. Proliferation only wins if the network, the ops concept, and the acquisition clock move together. Miss any one of those and you have cheap satellites that still cannot get the warfighter data in time.",
};

export default article;
