import type { Article } from "./types";

const article: Article = {
  slug: "pwsa-transport-layer",
  title: "PWSA Transport Layer",
  subtitle: "Optical mesh networking, hosted battle management, and the data plane every other layer rides",
  description:
    "Transport is the heartbeat of the Proliferated Warfighter Space Architecture — a proliferated LEO constellation cross-linked by optical inter-satellite links, sized for resilience and latency, and built in tranches on a fixed launch cadence.",
  date: "May 2026",
  readTime: "9 min read",
  tags: ["Aerospace", "Systems Engineering", "National Security", "Communications"],
  intro: [
    "In PWSA, every sensor product, every custody feed, and every tactical message eventually transits the Transport Layer. Tracking satellites do not replace it; Custody partners do not bypass it. Transport is the data plane — a router constellation in low Earth orbit connected by optical inter-satellite links (OISLs) rather than omnidirectional RF between spacecraft.",
    "SDA describes each Transport satellite as maintaining links to neighbors ahead, behind, port, and starboard. The resulting mesh is deliberately pedestrian in topology terms and powerful in mission terms: if one node is lost, traffic reroutes through surviving links before it ever has to fall back to a sparse ground network. That is the proliferated answer to exquisite GEO targets that are slow, predictable, and few.",
    "This article focuses on Transport alone — link physics, hosted payloads, tranche evolution, and what changes when you operate hundreds of nodes instead of a handful. For the full seven-layer stack and acquisition model, start with the PWSA overview.",
  ],
  sections: [
    {
      id: "role",
      label: "Foundation",
      heading: "What Transport Owns in the Stack",
      paragraphs: [
        "Transport's job is movement and timing, not sensing. It receives data from Tracking Layer spacecraft, from ground injection points, from partner Custody assets, and from Battle Management processors hosted on the same bus. It forwards, prioritizes, and downlinks — under security policies and latency budgets defined at the architecture level, not reinvented per satellite.",
        "Because Transport also hosts Battle Management compute and enables Navigation Layer broadcasts derived from mesh geometry, the bus is a integration hub. Flight software, optical terminal pointing, RF downlink schedules, and edge processors share power, thermal, and attitude budgets. Architecture reviews that treat Transport as \"just comms\" miss half the requirements surface.",
        "Tranche 0 proved the mesh could be built and operated at scale — on the order of twenty Transport satellites launched with SpaceX under the Support Layer, with pathfinder spacecraft earlier on rideshare missions. Later tranches grow node count toward regional then global persistence while upgrading link rates, processing, and protected comms variants.",
      ],
      relatedArticle: {
        slug: "pwsa-architecture",
        label: "Parent: The Proliferated Warfighter Space Architecture",
      },
    },
    {
      id: "oisl",
      label: "Section 01",
      heading: "Optical Inter-Satellite Links as the Mesh Backbone",
      paragraphs: [
        "OISLs transmit data via narrow laser beams between spacecraft. Compared to RF cross-links, the beam confinement trades pointing complexity for higher data rates and a smaller intercept footprint — relevant in contested spectrum environments where omnidirectional emissions are easier to detect and jam.",
        "Each Transport node must acquire and track its partners while the constellation moves. GNC and optical terminal control are not secondary subsystems here; they are the link margin. A lost link is not a degraded mode for tactical timelines — it is a routing hole the mesh must heal around, which means sufficient node density and redundant paths in the orbital shell design.",
        "The \"four friends\" mental model — forward, aft, port, starboard neighbors talking continuously, and those friends talking to their friends — is SDA's way of describing a distributed router. End-to-end latency is bounded by hop count, processing delay per node, and whether Battle Management keeps the transaction on-orbit or forces a ground round-trip. Turner’s design point is explicit: lowest latency means minimizing ground in the critical path.",
      ],
      table: {
        headers: ["Link type", "Strength in PWSA", "Primary engineering stress"],
        rows: [
          ["OISL (space–space)", "High bandwidth; narrow beam; mesh resilience", "Pointing, acquisition, terminal SWaP, link closure at range"],
          ["RF downlink (space–ground)", "Mature ops; global ground entry", "Contact scheduling at scale; spectrum; security overlays"],
          ["RF uplink / tactical radios", "Warfighter last-mile; legacy interfaces", "Gateway integration; latency vs. mesh exit point"],
        ],
      },
      relatedArticle: {
        slug: "spacecraft-rf-communications",
        label: "Related: Spacecraft RF Communications — ground link budgets and lock hierarchy",
      },
    },
    {
      id: "hosted",
      label: "Section 02",
      heading: "Hosted Battle Management and Derived Layers",
      paragraphs: [
        "Battle Management is not a separate constellation. It is compute hosted on Transport satellites — on-orbit processing that decides which tracks to promote, which tasks stay local, and which data products get forwarded toward the correct ground user or joint tactical network. Architecturally, this is edge computing with a weapons-system clock: the processor sits where the mesh already has the bits, avoiding downlink-uplink cycles that burn seconds.",
        "Navigation Layer capability emerges the same way. SDA is clear that Transport does not replace GPS. When GPS is unavailable or untrusted, mesh geometry and stable timing across nodes can still deliver position and time to the accuracy the warfighter needs for a given mission thread. That is a derived layer — requirements flow from Transport node count, ephemeris quality, and cross-link time transfer, not from a standalone PNT constellation design.",
        "Custody and Emerging Capabilities layers depend on Transport accepting external injections: commercial EO, NRO assets, experimental payloads. The interface contract is mesh ingress with agreed security and latency — otherwise partners build parallel downlink paths and the architecture re-monolithizes on the ground.",
      ],
    },
    {
      id: "tranches",
      label: "Section 03",
      heading: "Tranche Evolution for Transport",
      paragraphs: [
        "Transport capability grows by tranche, not by block upgrade of a single GEO bus. Tranche 0 demonstrated feasibility — mesh links, factory throughput, and ops concepts at minimum viable scale. Tranche 1 adds initial warfighting persistence in regions: tactical data links, enough nodes that regional routing survives attrition, and battle-management functions exercised with real operators.",
        "Tranche 2 expands to global persistence for the capabilities introduced in Tranche 1, incorporating lessons from operating earlier generations for at least two years — anomaly trends, cross-link availability statistics, ground-automation gaps, and version skew across concurrently flying builds. Tranche 3 and beyond fold improved missile-tracking handoffs from the Tracking Layer, better beyond-line-of-sight targeting support, added PNT features, and advances in optical and protected RF communications as threats evolve.",
        "The acquisition clock matters as much as the technology. Even-numbered-year September targets give integrators a demand signal. Hardware that misses Tranche N ships on N+2; software features with shorter cycle times can move faster if they do not gate launch mass. Transport is where that philosophy is most visible — node count per tranche is the scaling parameter the entire industrial base plans against.",
      ],
      table: {
        headers: ["Tranche", "Transport theme", "Operational milestone"],
        rows: [
          ["T0", "Mesh proof; warfighter immersion", "Cross-link demos; baseline downlink ops"],
          ["T1", "Regional persistence; tactical data links", "Initial warfighting capability in theater"],
          ["T2", "Global persistence", "Continuous routing at architecture scale"],
          ["T3+", "Improved links, PNT, protected comms", "Threat-driven upgrades without resetting the mesh"],
        ],
      },
    },
    {
      id: "operations",
      label: "Section 04",
      heading: "Operating the Mesh at Scale",
      paragraphs: [
        "Mission operations for Transport is not single-spacecraft commanding. It is constellation state management: which nodes have closed OISLs, which are in safe mode, which tranche build is on which software baseline, and which ground station contact will carry the next ephemeris upload or routing-table change. FIDO-class tools, containerized ground software on cloud/kubernetes stacks, and flight-software state machines must agree on the same vehicle state — a systems-integration problem that grows with every tranche added on orbit.",
        "Contact scheduling scales nonlinearly. Hundreds of LEO assets imply hundreds of pass opportunities, but also hundreds of ways for a missed pass to leave a node on stale routing tables or optical alignment parameters. Automation is not optional; it is how the ops team buys back margin for anomalies that still need human judgment.",
        "Commercial convergence is worth watching operationally, not only politically. Starshield and similar offerings market secure proliferated networking with Starlink heritage — overlapping Transport’s mesh story. Whether defense Transport and commercial megaconstellations share gateways, waveforms, or entirely separate paths is still being written in policy. Technically, the ops playbooks rhyme: proliferated LEO, optical or high-rate links, edge processing, ground automation at scale.",
      ],
    },
    {
      id: "trades",
      label: "Section 05",
      heading: "Engineering Trades That Decide Whether the Mesh Works",
      paragraphs: [
        "Optical terminals drive pointing budgets. A Transport satellite must keep its body stable enough for cross-links while potentially serving RF downlink and hosted payloads — every arcminute of jitter is link margin spent. Power budgeting splits between terminals, processors, and RF chains; eclipse-heavy LEO shells mean storage and generation sizing directly cap how many simultaneous links and compute jobs can run.",
        "Thermal design couples to all of the above. Laser terminals and edge processors reject heat into the same radiator network as bus avionics. Trades made for Tranche 0 mass targets do not automatically scale to Tranche 3 feature density without revisiting the entire EPS and thermal loop.",
        "The insight for architects: Transport is where PWSA's resilience claim is validated or falsified. Tracking can detect a threat, but if the mesh cannot route the track to the right shooter with a trusted timestamp, the architecture failed in the data plane — not the sensor.",
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
        "End-to-end ops across flight software, GNC, FIDO, and ground systems for transport-layer spacecraft.",
        "Ground stack delivery on AWS/Kubernetes with integration testing and mission rehearsal.",
        "Early T3TL operational concept development for follow-on transport missions.",
      ],
    },
  ],
  insight:
    "Transport is not the exciting layer in briefings — no infrared stare, no kill chain headline. It is the layer that makes the kill chain possible. Design the mesh, the pointing, and the ops automation as one system, or proliferation becomes a parking lot of disconnected nodes.",
};

export default article;
