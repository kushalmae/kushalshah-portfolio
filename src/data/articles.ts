export interface ArticleTable {
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  id: string;
  label: string;
  heading: string;
  paragraphs: string[];
  table?: ArticleTable;
  relatedArticle?: { slug: string; label: string };
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
    readTime: "8 min read",
    tags: ["Aerospace", "Systems Engineering", "Architecture"],
    intro: [
      "Picture this: you're designing a satellite that needs to capture high-resolution Earth imagery, survive 15 years in the harsh radiation environment of geostationary orbit, maintain pointing accuracy within 0.01 degrees, and do all of this while weighing less than your car and consuming less power than a hair dryer. How do you ensure every subsystem gets exactly what it needs — no more, no less — while leaving enough margin for the unexpected?",
      "In satellite engineering, 'budgets' aren't about money. They're about the fundamental physical resources that constrain every aspect of spacecraft design — immutable boundaries that define what's possible and what's fantasy. Every satellite, from a 1-kilogram CubeSat to the 6,800-kilogram James Webb Space Telescope, must respect the same rules. After analyzing thousands of missions, one pattern is crystal clear: missions that fail don't usually fail because of a single catastrophic event. They fail because of budget violations that cascade through interconnected systems.",
    ],
    sections: [
      {
        id: "budgets-overview",
        label: "The Full Picture",
        heading: "Thirteen Budgets, One Spacecraft",
        paragraphs: [
          "Every satellite design discipline generates its own budget. Each one tracks a different physical resource — mass, energy, signal strength, orientation, temperature, propellant — and each constrains what's achievable in every other. The thirteen core budgets below define the engineering space inside which any mission must be designed.",
        ],
        table: {
          headers: ["Budget", "What It Controls", "Key Metric", "Why It's Hard"],
          rows: [
            ["Mass", "Weight allocated across every subsystem", "kg per subsystem", "Launch vehicle capacity is fixed; every gram trades against capability"],
            ["Power", "Electrical generation versus consumption balance", "Watts at end-of-life", "Solar arrays degrade 25–30% over 15 years; every operating mode must close"],
            ["Link", "RF signal margin from spacecraft to ground", "dB margin", "Power drops as the square of distance; atmosphere adds variable loss"],
            ["Pointing", "Attitude accuracy, knowledge, and stability", "Arcseconds or degrees", "Errors compound from sensors, actuators, structure, and software simultaneously"],
            ["Thermal", "Temperature limits across all orbital phases", "°C operating range", "Eclipse-to-sunlight transitions happen 12–15 times daily in LEO"],
            ["Delta-V", "Propulsive maneuver capacity over mission life", "m/s total", "Fuel mass is itself mass; the rocket equation creates a vicious feedback loop"],
            ["Radiation", "Accumulated ionizing dose and single-event effects", "kRad total ionizing dose", "Van Allen belts and solar particle events are unpredictable in timing and intensity"],
            ["Data", "Onboard storage versus data generation and downlink capacity", "Gbits per day", "Ground station contact windows are limited, short, and shared across missions"],
            ["Reliability", "System-level probability of mission success over lifetime", "MTBF, % availability", "Redundancy adds mass and cost; every trade-off requires explicit justification"],
            ["Contamination", "Molecular and particulate deposition on optical and thermal surfaces", "ng/cm²", "Outgassing from adhesives, lubricants, and coatings accumulates invisibly over years"],
            ["EMI/EMC", "Electromagnetic interference between subsystems", "dBm margin", "Dense electronics in a compact conductive enclosure creates unintended coupling paths"],
            ["Field of View", "Sensor coverage, obscuration, and geometric access to sky or Earth", "Degrees of clear arc", "Solar arrays and spacecraft structure inevitably block critical viewing angles"],
            ["Timeline", "Operational contact windows and eclipse fractions per orbit", "Minutes of access per orbit", "Ground station latitude and orbital mechanics set hard limits that no design can override"],
          ],
        },
      },
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
        relatedArticle: {
          slug: "satellite-pointing-budget",
          label: "Deep Dive: The Pointing Budget",
        },
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
  {
    slug: "satellite-pointing-budget",
    title: "The Pointing Budget",
    subtitle: "A Complete Treatment of Attitude Accuracy, Error Sources, and On-Orbit Verification",
    description:
      "Of all the satellite engineering budgets, pointing is the most architecturally pervasive. A deep dive into PKE, PCE, and PSE — from error sources and RSS methodology to hardware selection, cascade control, and on-orbit calibration.",
    date: "Apr 2025",
    readTime: "10 min read",
    tags: ["Aerospace", "Systems Engineering", "Attitude Control"],
    intro: [
      "Of all the budgets that govern satellite design, pointing is the one that follows the mission everywhere. A mass error shows up once — at the launch vehicle interface. A power error manifests in worst-case operating modes. A pointing error shows up in every image, every science measurement, every communication link the spacecraft ever attempts. It is the budget that separates a capable spacecraft from an expensive piece of orbital metal.",
      "This piece builds the pointing budget from first principles. It covers what pointing accuracy actually means — the three distinct quantities of knowledge, control, and stability — where errors originate across the sensor, actuator, structure, and software domains, how they compound mathematically through RSS methodology, which hardware physically embodies those error allocations, how the cascade control architecture converts them into torque commands, and how on-orbit calibration closes the loop between predicted and measured performance.",
    ],
    sections: [
      {
        id: "pointing-anatomy",
        label: "Pointing 01",
        heading: "The Anatomy of a Pointing Budget",
        paragraphs: [
          "The pointing budget isn't a single number — it's a structured decomposition of every source of angular error that can prevent a satellite from knowing where it's pointing, controlling where it points, and holding that position steady. Engineers break it into three distinct quantities: pointing knowledge error (PKE), pointing control error (PCE), and pointing stability error (PSE). Each serves a different mission function, and each draws from different hardware sources.",
          "Pointing knowledge error is the uncertainty in knowing the spacecraft's orientation at any given moment. It doesn't matter how well the attitude control system performs if the spacecraft doesn't know where it's actually pointing. Knowledge comes primarily from star trackers — sensors that image the star field and compare it against an onboard catalog to determine attitude. PKE is bounded by the star tracker's accuracy, the alignment calibration between the tracker and payload boresight, and the latency between sensor measurement and command execution.",
          "Pointing control error is the gap between where the spacecraft intends to point and where it actually points, integrated over the exposure or measurement interval. Control error is driven by the reaction wheel assembly — the spinning flywheels that generate angular momentum to rotate and hold the spacecraft. Friction asymmetries, bearing noise, and the minimum torque the control system can command all set a floor on PCE.",
          "Pointing stability error captures how much the boresight wanders during a fixed observation window — typically an image exposure or science measurement. Stability is driven by vibration sources: reaction wheel imbalance, cryocooler vibrations in infrared instruments, fluid slosh in propellant tanks, and flexible dynamics of deployed appendages. For imaging satellites, stability often matters more than absolute control accuracy. A consistently offset pointing can be corrected in post-processing; a jittering boresight blurs the image in ways no software can recover.",
        ],
      },
      {
        id: "pointing-errors",
        label: "Pointing 02",
        heading: "Error Sources: The Anatomy of Inaccuracy",
        paragraphs: [
          "Building a pointing budget means hunting down every mechanism that can rotate the spacecraft — or deceive it into thinking it's pointed correctly when it isn't. Error sources fall into four categories: sensor errors, actuator errors, structural errors, and algorithm errors.",
          "Sensor errors originate with the star tracker. A modern cold star tracker achieves 1–3 arcseconds of accuracy in its sensitive axes and roughly 20–50 arcseconds in roll — rotation around the boresight. Using two or three star trackers mounted at different angles averages down these errors. But residual misalignment between the tracker frame and the payload boresight, called the boresight alignment error, adds a systematic bias that can only be calibrated on orbit. Gyroscopes used to propagate attitude between star tracker updates introduce drift — typically 0.003–0.01 degrees per hour for MEMS units, less for fiber-optic gyros.",
          "Actuator errors trace back to the reaction wheel assembly. The minimum torque increment a wheel can produce — its torque resolution — is typically 0.1–1.0 mNm. Wheel imbalance splits into static imbalance (a mass offset creating a once-per-revolution forcing function) and dynamic imbalance (a product of inertia generating gyroscopic torque at wheel speed). Both transmit vibration into the structure and manifest as high-frequency pointing jitter. Wheel speed zero-crossing — the moment a wheel passes through zero RPM — introduces bearing friction hysteresis that causes momentary attitude excursions the control loop can't fully reject.",
          "Structural errors arise because the spacecraft isn't perfectly rigid. Thermal gradients across solar arrays and structural members cause differential expansion as the satellite cycles between sunlight and eclipse — 12–15 times per day in LEO. A temperature gradient of 50°C across a 2-meter aluminum panel can induce several arcseconds of boresight shift. Deployed booms and antennas amplify this. Their lowest structural resonance frequencies, often 0.1–1.0 Hz, sit squarely in the bandwidth where control systems are active. This control-structure coupling can destabilize the attitude loop if not modeled correctly and budgeted explicitly.",
          "Algorithm errors are the most underappreciated category. The attitude estimator — typically a Kalman filter fusing star tracker and gyro data — introduces lag. The control law processes that estimate, computes a torque command, and sends it to the reaction wheels over a finite computational loop. In a 10 Hz control cycle, 100 milliseconds of latency creates systematic pointing error during any slew or external disturbance. The pointing budget must allocate for this computational latency as a distinct error term, not an afterthought.",
        ],
      },
      {
        id: "pointing-rss",
        label: "Pointing 03",
        heading: "Root Sum Square: How Errors Compound",
        paragraphs: [
          "Individual pointing error sources don't add linearly. If they did, a 5-arcsecond total accuracy requirement would be impossible to meet with five sources each contributing 3 arcseconds. Instead, engineers use Root Sum Square (RSS) methodology, which combines uncorrelated errors in quadrature: total error = √(σ₁² + σ₂² + σ₃² + ... + σₙ²).",
          "If four independent error sources each contribute 2 arcseconds, the RSS total is √(4 + 4 + 4 + 4) = 4 arcseconds — not 8. This works because uncorrelated errors partially cancel: when one source pushes the boresight left, another is equally likely to push it right. Statistical independence is the key assumption, and validating it is the critical discipline.",
          "Some errors are not independent and cannot be RSS'd. Star tracker noise and gyroscope drift are independent — they originate from different physical phenomena. But star tracker noise and boresight alignment error share a thermal dependence if the same environment affects both. Correlated errors must be added linearly before being combined in quadrature with the independent terms. Mixing these incorrectly creates an optimistic budget that will fail on orbit.",
          "A worked example: a commercial Earth observation satellite has a 5-arcsecond pointing control requirement at 3-sigma. The budget breaks down as: star tracker knowledge 2 arcsec (1σ), gyro drift accumulated over 30 seconds 0.8 arcsec, boresight alignment calibration residual 1.5 arcsec, reaction wheel torque resolution 1.2 arcsec, thermal structural flex 1.0 arcsec. RSS total: √(4 + 0.64 + 2.25 + 1.44 + 1.0) = √9.33 = 3.05 arcseconds at 1σ, or 9.15 arcseconds at 3σ. The budget meets the requirement with roughly 8% margin — enough to absorb a modest unmodeled error source but thin enough to demand configuration control on every assumption.",
        ],
      },
      {
        id: "pointing-hardware",
        label: "Pointing 04",
        heading: "Hardware: Sensors, Actuators, and the Control Chain",
        paragraphs: [
          "The pointing budget is physically embodied in hardware. Understanding it requires understanding the sensor-actuator chain: what the spacecraft senses, how it estimates its state, how it commands a correction, and what executes that correction.",
          "Star trackers are the precision backbone of modern attitude determination. They image a portion of the star field using a CCD or CMOS detector, identify a pattern of stars against an onboard catalog, and compute the spacecraft's inertial orientation to sub-arcsecond precision. Their vulnerability is availability: they lose lock during rapid maneuvers, blind out when the Sun or Moon enters their field, and require several seconds to reacquire after disturbances. Coarse Sun sensors, horizon sensors, and magnetometers provide backup knowledge at much lower accuracy — 0.1 to 1 degree — ensuring safe-mode capability when the star tracker is unavailable.",
          "Gyroscopes propagate attitude between star tracker updates at high bandwidth. Ring laser gyros and fiber-optic gyros achieve drift rates below 0.001 deg/hr and dominate precision missions. MEMS gyros offer lower cost and smaller form factor at the expense of higher drift. The practical architecture fuses star tracker measurements — accurate but slow — with gyroscope propagation — fast but drifting — using a Kalman filter to produce a continuous, high-bandwidth attitude estimate.",
          "Reaction wheels are the primary fine-pointing actuators for satellites requiring better than 0.1-degree control. A flywheel driven by a brushless DC motor stores angular momentum; changing its speed causes the spacecraft to react in the opposite direction. Four wheels are standard — three provide full three-axis control, the fourth provides redundancy if one fails. Momentum saturation occurs when a wheel reaches its maximum speed and can no longer generate torque in that direction; desaturation requires thrusters or magnetic torquers, consuming propellant and creating attitude disturbances that must be modeled in the budget. Control Moment Gyros extend this concept by tilting a spinning rotor on a gimbal rather than changing its speed, producing far larger torques from the same stored momentum. Their complexity — singularity conditions where no torque can be produced in a desired direction — requires sophisticated steering laws that themselves introduce algorithmic error.",
        ],
      },
      {
        id: "pointing-control",
        label: "Pointing 05",
        heading: "The Control Architecture: From Error Signal to Torque Command",
        paragraphs: [
          "A satellite's attitude control system is a feedback control problem with real physical constraints: actuator saturation, structural flexibility, computation delays, and disturbance torques that vary continuously with orbital position. The architecture that bridges sensor measurements to actuator commands directly determines what the pointing budget can achieve.",
          "The standard architecture uses a cascade control structure. An outer attitude loop compares commanded attitude to estimated attitude and generates an angular rate command. An inner rate loop takes that command and the current rate from the gyroscopes and generates a torque command to the reaction wheels. The inner loop typically runs at 100–200 Hz; the outer attitude loop at 10–25 Hz. Separation of timescales is essential — the inner loop must be at least 5–10 times faster than the outer to maintain stability. Any violation of this separation creates coupled dynamics that the budget cannot easily accommodate.",
          "The Kalman filter estimator runs in parallel with both loops. It takes gyroscope measurements at full bandwidth, propagates the attitude forward in time using the gyro model, and periodically corrects using the star tracker measurement when a valid solution arrives. Filter tuning determines how quickly it trusts new star tracker measurements versus how much it relies on gyro propagation. Aggressive tuning corrects faster but amplifies sensor noise. Conservative tuning suppresses noise but accumulates gyro drift between star tracker updates. The optimal tuning point — and its sensitivity to incorrect noise assumptions — must be characterized and allocated in the budget.",
          "Control bandwidth is the key design lever, and its limit is set by structural dynamics. A satellite with flexible solar arrays whose first resonance is at 0.3 Hz cannot have an attitude control bandwidth above roughly 0.1 Hz without exciting the structure into sustained oscillation. The pointing budget must account for disturbances at frequencies where the control loop provides no attenuation — typically everything above the control bandwidth — and structural analysis must certify that no resonance modes lie within the control passband. This interface between the pointing budget and the structural dynamics model is where the most dangerous assumptions hide.",
        ],
      },
      {
        id: "pointing-verification",
        label: "Pointing 06",
        heading: "On-Orbit Calibration and Closing the Budget",
        paragraphs: [
          "A pointing budget built on ground measurements will be wrong. Not catastrophically — but enough to matter. Thermal conditions on orbit differ from laboratory conditions. Alignment between the star tracker and the payload boresight shifts as the spacecraft thermally equilibrates in the space environment. Reaction wheel imbalance signatures rarely match pre-launch characterization exactly. The budget must include a calibration strategy for correcting residual errors on orbit, and verification closes the loop between prediction and reality.",
          "Boresight calibration is typically the first pointing activity after on-orbit checkout. The satellite images a known point — a ground target with precisely surveyed coordinates — and compares the commanded and actual line of sight. The difference, decomposed into roll, pitch, and yaw components, defines the on-orbit alignment correction. This calibration repeats at different orbital positions and times of day to characterize thermal dependence. Modern high-resolution imaging satellites achieve boresight calibration accuracy below 1 arcsecond using dedicated calibration targets.",
          "Gyroscope scale factor and bias calibration is performed by commanding precise slew maneuvers and comparing the integrated gyro output to the star tracker attitude change. Temperature-dependent gyro bias — which varies systematically with the thermal environment — is the primary source of calibration error. An uncompensated temperature-dependent bias of 0.01 deg/hr in a 30-second star tracker update interval adds only 0.005 arcseconds of attitude error, negligible for most missions but significant for precision astrometry.",
          "The ultimate verification is on-orbit image analysis. For Earth observation satellites, geometric accuracy — the correspondence between surveyed ground control points and the satellite's predicted line of sight — verifies pointing knowledge at the system level. Point spread function measurement using star images provides direct evidence of pointing stability at the sub-pixel level. When these measurements close to within the predicted budget allocations, the system is verified. When they don't, the gap drives anomaly investigations that typically surface either an unmodeled error source or an assumption made in Phase A that no one questioned for three years. That gap, and the discipline required to close it, is what separates a pointing budget from a pointing guess.",
        ],
      },
    ],
    insight:
      "A pointing budget isn't a specification you write once and hand to the hardware team. It's a living model that propagates every design assumption into an angular error term — and the gap between that model and on-orbit reality is the truest measure of how well the team understood the physics.",
  },
];
