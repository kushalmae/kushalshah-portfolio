import type { Article } from "./types";

const article: Article = {
  slug: "spacecraft-power-budgeting",
  title: "Spacecraft Power Budgeting, SOC Estimation, and Undervoltage FDIR",
  subtitle: "From eclipse energy to load shedding — proving the EPS survives corner cases",
  description:
    "The EPS is not a spreadsheet of Watts. It is a proof that the vehicle survives the longest eclipse at end-of-life, keeps the battery within depth-of-discharge limits, regulates the bus for every downstream converter, and autonomously sheds loads before terminal depletion.",
  date: "May 2026",
  readTime: "20 min read",
  tags: ["Aerospace", "Systems Engineering", "Power", "FDIR"],
  intro: [
    "In spacecraft design, the Electrical Power System (EPS) mission is more rigorous than summing nameplate power. A senior engineer's job is to prove through analysis that the vehicle survives worst-case orbit geometry, maintains battery health, holds bus voltage within strict limits, and executes fault detection, isolation, and recovery (FDIR) before the pack is damaged beyond recovery.",
    "Satellites rarely fail during average operations. They fail in corner modes — the longest eclipse, the coldest thermal soak, the most aggressive simultaneous downlink and payload draw. This article walks the full EPS analysis stack: power versus energy, load list construction, orbit energy accounting, state-of-charge estimation pitfalls, staged undervoltage response, and load-shedding autonomy with hysteresis.",
  ],
  sections: [
    {
      id: "eps-mission",
      label: "Foundation",
      heading: "Introduction to Spacecraft Power Systems",
      paragraphs: [
        "The EPS must satisfy four contracts simultaneously. Survival: demonstrate power-positivity under worst-case geometry and end-of-life (EOL) degradation. Battery health: prevent depth of discharge (DOD) from exceeding limits that cause permanent cell damage. Bus regulation: keep voltages within the input range of every downstream converter and avionics box. FDIR: provide autonomous logic — software, hardware, or both — to shed loads and protect the battery from terminal depletion.",
        "Power analysis is not a single calculation. It spans five interdependent layers that must close together at review. Mission and orbit define eclipse duration and sun angle. The power source — solar cell efficiency, panel area, packing factors, and degradation — defines how much energy enters the system. The battery — chemistry, voltage range, capacity, temperature limits, cycle life — defines storage and sag behavior. Power electronics — regulated versus unregulated bus, converter efficiency, harness loss — define what actually reaches the loads. Loads themselves — avionics, communications, payload, heaters — define the demand profile that every other layer must serve.",
      ],
      diagramId: "eps-system-layers",
      relatedArticle: {
        slug: "satellite-engineering-budgets",
        label: "Related: Six Engineering Budgets Overview",
      },
    },
    {
      id: "power-energy",
      label: "Section 01",
      heading: "Core Concepts: Power vs. Energy and Orbit Dynamics",
      paragraphs: [
        "Power (P = V × I, in Watts) is instantaneous demand. It determines whether converters saturate, harnesses overheat, or a high-current event trips an undervoltage threshold right now. Energy (E = P × t, in Watt-hours) is capacity to perform work over time. It determines whether the spacecraft survives the eclipse.",
        "Treating power and energy interchangeably is a fatal beginner error. You can have a low average draw and still brown out the bus if a peak spike exceeds the battery's current delivery capability or if undervoltage logic fires on a transient sag. Orbital geometry drives sizing. In a typical 95-minute LEO orbit, roughly 60 minutes of sunlight is the only window to support loads and recharge the battery; roughly 35 minutes of eclipse is the survival interval where the battery is the sole energy source.",
      ],
      diagramId: "eps-orbit-timeline",
    },
    {
      id: "architecture",
      label: "Section 02",
      heading: "Architecture and Load List Construction",
      paragraphs: [
        "Before building a budget, define the bus architecture. Is the bus regulated (fixed, e.g., 28 V) or unregulated (tied to battery voltage, e.g., 8–16.8 V)? Is solar regulation direct energy transfer (DET) or maximum power point tracking (MPPT)? What secondary rails exist (12 V, 5 V, 3.3 V), and at what efficiency does each converter operate?",
        "Every component belongs in a load matrix with rail assignment, nominal power, peak or inrush power, and mode-based duty cycle. Do not omit EPS overhead — the power the EPS board consumes simply to stay alive, typically 2–3 W, running in every mode. Real-world demand always exceeds nameplate because of harness and conversion losses.",
        "Harness loss follows V_drop = I × R and P_loss = I²R. A 0.15 Ω harness segment at 2 A causes 0.3 V drop — significant on low-voltage rails. Converter efficiency η means the bus supplies P_in = P_out / η. A 20 W payload at 90% efficiency draws 22.2 W from the main bus; the 2.2 W difference is heat that must appear in the thermal budget.",
      ],
      table: {
        headers: ["Component", "Rail", "Nominal (W)", "Peak (W)", "Duty Cycle / Mode"],
        rows: [
          ["OBC", "5 V", "4", "5", "100% — all modes"],
          ["EPS Overhead", "Batt Bus", "2", "3", "100% — all modes"],
          ["ADCS Full", "12 V", "8", "12", "Nominal science"],
          ["TX Radio", "12 V", "20", "25", "Downlink only"],
          ["Payload", "12 V", "35", "40", "Science only"],
          ["Heaters", "Batt Bus", "10", "20", "Cold case / eclipse"],
        ],
      },
    },
    {
      id: "modes-sizing",
      label: "Section 03",
      heading: "Operating Modes and Energy Sizing",
      paragraphs: [
        "Power is budgeted by spacecraft state: Launch, Safe, Nominal Science, Downlink, and Eclipse Survival. Each mode has a distinct load profile; averaging across modes without separating eclipse survival is how programs discover brownouts in flight.",
        "For a 95-minute LEO orbit, total orbit energy consumption sums mode contributions by duration. Eclipse survival at 21 W for 35 minutes yields 12.25 Wh. Nominal sunlit at 48 W for 45 minutes yields 36 Wh. Downlink sunlit at 32 W for 15 minutes yields 8 Wh. Total E_orbit = 56.25 Wh — the energy the solar array must replace during the sunlit window.",
        "First-pass solar sizing sets P_sa,sunlight = E_orbit / t_sunlight — roughly 56 W generation for 56.25 Wh in 60 minutes. Professional sizing works from required power through path efficiency, battery charge efficiency, pointing, and thermal derating to beginning-of-life (BOL), then applies radiation and contamination degradation to end-of-life (EOL). With total effective derating of 0.75, a 56 W requirement becomes roughly 75 W EOL array capability.",
        "Battery capacity must support the longest eclipse energy while respecting DOD limits: C_required = E_eclipse / (V_nom × DOD × η_discharge). For 12.25 Wh at 14.8 V nominal, 25% DOD, and 95% discharge efficiency, that is approximately 3.49 Ah — typically rounded to 5–8 Ah after aging and transient margin. Normal mission cycling keeps DOD at 10–30% for thousands of orbits; deeper discharge is reserved for emergencies.",
      ],
      diagramId: "eps-orbit-energy",
    },
    {
      id: "soc-estimation",
      label: "Section 04",
      heading: "Battery State of Charge vs. Voltage",
      paragraphs: [
        "Voltage is a deceptive SOC indicator. Software must never assume low voltage equals empty battery without accounting for four effects. High-current sag: transmitters and actuators pull bus voltage down temporarily under load. Temperature: cold batteries exhibit higher internal resistance and greater sag. Aging: rising internal resistance over life lowers under-load voltage at the same true SOC. Cell imbalance: one weak cell can depress pack voltage while siblings retain charge.",
        "Estimation methods trade accuracy for implementation cost. Voltage-based lookup is a coarse reference only — useful for sanity checks, dangerous as sole fuel gauge. Coulomb counting integrates current over time (I·dt) and tracks well when calibrated, but drifts without periodic correction. Open-circuit voltage (OCV) relaxation after load removal provides a more accurate snapshot, but requires rest time or a battery model because pack voltage recovers after heavy discharge — reading voltage immediately after TX shutoff overestimates remaining capacity.",
        "The architect's rule: SOC for FDIR decisions should combine coulomb counting with OCV correction at known rest intervals, never raw bus voltage during or immediately after high-power events.",
      ],
    },
    {
      id: "undervoltage-fdir",
      label: "Section 05",
      heading: "Undervoltage Concepts and FDIR Implementation",
      paragraphs: [
        "Undervoltage events stem from battery depletion, sudden load spikes (transmitters, actuators), or the cold-battery loop where heater demand and sag interact. A staged threshold strategy on a 14.8 V nominal Li-ion system provides graduated response rather than a single catastrophic cutoff.",
        "Low power warning near 13.2 V is caution — inhibit new high-power payload operations. Load shed near 12.8 V is action — deactivate non-critical payloads and high-rate transmitters. Critical safe mode near 12.2 V is survival — transition to essential systems only: OBC, comm standby, minimum thermal. Battery protection near 11.8 V is hardware last resort — hard disconnect to prevent permanent cell damage.",
        "Transient rejection requires threshold plus persistence. Example: trigger load shed only if bus voltage remains below 12.8 V for more than five seconds. Without persistence, a single inrush spike can shed science payload during an otherwise healthy pass.",
      ],
      diagramId: "eps-uv-stages",
    },
    {
      id: "load-shedding",
      label: "Section 06",
      heading: "Load Shedding Autonomy and Hysteresis",
      paragraphs: [
        "Load shedding follows priority tiers. Tier 1 — survival: EPS, OBC, watchdog, essential heaters, low-rate comm. Tier 2 — mission support: full ADCS, GPS, high-rate comm. Tier 3 — payload and discretionary: science instruments and experimental loads. Shedding must proceed down the tier list, never randomly by subsystem convenience.",
        "Hysteresis prevents chatter. Without it, removing Tier 3 load causes voltage to recover, software re-enables payload, voltage sags again, and the spacecraft oscillates between modes. Robust logic example: disable loads if voltage below 11.6 V for five seconds; re-enable only when voltage exceeds 12.2 V for ten minutes and SOC exceeds 40%.",
        "The cold-battery loop is the nasty case. In eclipse at low temperature, the battery needs heaters. Heaters draw power, deepening discharge and increasing sag. Poorly sequenced logic can disable heaters at the moment they are most needed. Cold-case eclipse analysis must prove the pack has enough energy to heat itself without crossing terminal undervoltage — or the survival architecture is self-defeating.",
      ],
      diagramId: "eps-shed-tiers",
    },
    {
      id: "review-checklist",
      label: "Section 07",
      heading: "Engineering Analysis and Review Checklist",
      paragraphs: [
        "Worst-case analyses must cover four corners. Worst hot sunlit: maximum solar input plus thermal stress on electronics. Worst cold eclipse: longest eclipse, maximum heater load, worst voltage sag. End-of-life: degraded panels, aged battery, increased internal resistance. Peak operations: simultaneous high-draw events — TX plus payload plus reaction wheels.",
        "A credible EPS review answers nine questions before sign-off. Are max bus power and peak rail currents defined for every mode? Is sunlit recharge margin sufficient at EOL? What is worst-case battery DOD? Can the vehicle survive indefinitely in safe mode? Are undervoltage thresholds and actions documented in the FDIR table? Is recovery protected by hysteresis and SOC checks? Are startup and inrush currents budgeted? Are heater loads in the cold-case eclipse? Are harness and converter losses at η < 1 included with operational margin of 10–20%?",
      ],
      table: {
        headers: ["#", "Beginner Mistake", "Why It Burns"],
        rows: [
          ["1", "Using average power only", "Ignores eclipse energy — brownout in first long shadow"],
          ["2", "Forgetting converter efficiency η", "Bus is undersized by 10–15% on every rail"],
          ["3", "Omitting heater loads", "Cold eclipse fails while spreadsheet shows margin"],
          ["4", "Ignoring inrush peaks", "Nuisance UV trips or hardware latch-up"],
          ["5", "Ignoring EOL solar degradation", "Array sized for BOL; margin vanishes in year 3"],
          ["6", "Zero-margin battery sizing", "Aging and transients consume entire DOD headroom"],
          ["7", "Voltage as perfect SOC", "False sheds during TX sag; false confidence after load-off"],
          ["8", "No load-shed hysteresis", "Payload chatter; unstable safe mode transitions"],
          ["9", "No separate safe mode power case", "Safe mode draws more than nominal — survival fails"],
          ["10", "Ignoring cold battery performance", "Heater loop drives terminal undervoltage"],
          ["11", "Forgetting harness I²R losses", "Low-voltage rails brown out before budget predicts"],
          ["12", "Simultaneous load turn-on in software", "Peak stack exceeds any single-mode budget line"],
        ],
      },
    },
  ],
  insight:
    "The EPS closes on energy through the eclipse, on power at the peak, and on voltage at the transient — three different resources that share one battery. Budget all three, stage FDIR with persistence and hysteresis, and the vehicle survives corner cases. Budget only average Watts, and it fails on the first bad pass.",
};

export default article;
