import type { Article } from "./types";

const article: Article = {
  slug: "satellite-orbit-types",
  title: "Orbits as Mission Architecture",
  subtitle: "Altitude, inclination, and period — and the missions each regime was built for",
  description:
    "Orbit selection is the first systems decision in a satellite program. This article maps the major orbital regimes — LEO through Lagrange points — to their physics, operational trade-offs, flagship missions, and the engineering budgets each regime stresses.",
  date: "May 2026",
  readTime: "12 min read",
  tags: ["Aerospace", "Systems Engineering", "Mission Design"],
  intro: [
    "Before anyone sizes a solar array or writes a pointing requirement, the mission has already chosen an orbit. Altitude sets orbital period and eclipse geometry. Inclination sets ground coverage and launch latitude constraints. Eccentricity sets dwell time over a region or transfer cost from the launch vehicle.",
    "Orbits are not destinations in the abstract — they are engineering envelopes. A 500 km sun-synchronous Earth observation spacecraft lives in a different power, thermal, link, and radiation environment than a GEO communications platform or a GPS spacecraft at 20,200 km. The programs below are case studies in what each envelope enables, and what it costs.",
  ],
  sections: [
    {
      id: "orbit-fundamentals",
      label: "Foundation",
      heading: "What Defines an Orbit",
      paragraphs: [
        "Every closed orbit around Earth is fully described by six classical orbital elements: semi-major axis (size), eccentricity (shape), inclination (tilt relative to the equator), right ascension of the ascending node, argument of periapsis, and true anomaly at epoch. In practice, mission designers speak in altitude, inclination, and period because those map directly to coverage, environment, and launch vehicle performance.",
        "Circular orbits are the default mental model — altitude is constant, orbital speed follows from Kepler's third law: period increases with altitude. At 400 km, a spacecraft completes roughly 93 minutes per revolution; at geostationary altitude (~35,786 km), the period is exactly one sidereal day, so the satellite appears fixed over the equator.",
        "Non-circular orbits trade altitude for dwell time. A highly elliptical orbit with low perigee and high apogee spends most of its period near apogee, enabling extended visibility over high latitudes — the architecture behind Molniya and Tundra orbits used for communications and early-warning missions over Russia and the Arctic.",
      ],
      diagramId: "orbit-altitude-regimes",
      relatedArticle: {
        slug: "satellite-engineering-budgets",
        label: "Related: The Six Engineering Budgets Every Orbit Stresses Differently",
      },
    },
    {
      id: "regime-overview",
      label: "Section 01",
      heading: "Orbital Regimes at a Glance",
      paragraphs: [
        "The table below is the map every architecture review should start from — not exhaustive of every specialty orbit, but the set that appears in civil, commercial, and national security mission portfolios.",
      ],
      table: {
        headers: ["Regime", "Typical Altitude", "Period", "Primary Stress on Spacecraft"],
        rows: [
          [
            "LEO",
            "~160 km – 2,000 km",
            "~90 min",
            "Frequent eclipse; atmospheric drag; high revisit with constellation",
          ],
          [
            "MEO",
            "~2,000 – 35,786 km",
            "~2–12 hr",
            "Van Allen belt radiation; weaker gravity gradient than LEO",
          ],
          [
            "GEO",
            "~35,786 km (circular, i ≈ 0°)",
            "24 hr (sidereal)",
            "Long eclipse seasons; precise station-keeping; high link path loss",
          ],
          [
            "GTO",
            "Perigee ~200 km · Apogee ~35,786 km",
            "~10–12 hr",
            "Transfer phase only — severe thermal and radiation transient",
          ],
          [
            "Sun-synchronous LEO",
            "~400–800 km, dawn-dusk or morning",
            "~95–100 min",
            "Consistent lighting angle; plane precession maintained by inclination",
          ],
          [
            "HEO (Molniya / Tundra)",
            "Perigee ~600 km · Apogee ~40,000 km",
            "~12 hr (Molniya) / ~24 hr (Tundra)",
            "Apogee dwell; high radiation at perigee; complex thermal cycling",
          ],
          [
            "Lagrange (L1 / L2)",
            "Halo or Lissajous ~1.5M km from Earth",
            "N/A (3-body)",
            "Continuous sun for L2; deep-space comm; station-keeping in unstable equilibrium",
          ],
        ],
      },
    },
    {
      id: "leo",
      label: "Section 02",
      heading: "Low Earth Orbit — High Revisit, Harsh Environment",
      paragraphs: [
        "LEO is where the majority of active satellites live — from the International Space Station at ~400 km to broadband constellations at 550 km and Earth observation platforms between 500 and 800 km. Proximity to Earth buys link budget margin and sensor resolution; proximity also buys atmospheric drag, frequent eclipses, and a radiation environment that escalates quickly below roughly 1,000 km.",
        "Earth observation and remote sensing dominate civil and commercial LEO. Landsat-9 (705 km, near-polar) continues the multi-decade land imaging record. ESA's Sentinel-2 pair (786 km, sun-synchronous) provides global multispectral imagery on five-day revisit. NASA's ICESat-2 (496 km) uses laser altimetry for ice-sheet topography. Commercial operators — Planet's Dove constellation, Maxar's WorldView — push revisit to daily or sub-daily through plane phasing and sheer spacecraft count.",
        "Human spaceflight and laboratory science anchor LEO differently. The ISS operates at ~400 km with crew rotation, logistics resupply, and a full avionics stack sized for crew safety — a reliability and operations model far heavier than a 3U CubeSat at the same altitude. China's Tiangong space station occupies a similar regime with distinct rendezvous and traffic rules.",
        "Broadband megaconstellations redefined LEO economics. SpaceX Starlink (primarily 550 km shells), Amazon Kuiper (planned 590–630 km), and OneWeb (1,200 km, higher inclination) trade collision risk, coordination complexity, and drag makeup propellant against latency and capacity that GEO cannot match for consumer internet. Orbit raising from deployment to operational altitude — often electric propulsion over weeks — is part of the architecture, not a launch detail.",
        "Technology demonstration and university programs routinely use LEO because launch access is cheapest and regulatory licensing paths are most mature. NASA's TechEdSat series, numerous CubeSat rideshares, and DARPA's Blackjack experimental constellation all treat LEO as the default proving ground before committing to higher or more expensive regimes.",
      ],
      table: {
        headers: ["Mission", "Altitude / Inclination", "Application"],
        rows: [
          ["International Space Station", "~400 km · 51.6°", "Crewed laboratory · microgravity research"],
          ["Hubble Space Telescope", "~540 km · 28.5°", "Astrophysics · serviced in orbit"],
          ["Starlink", "~550 km · 53° / 70° / 97.6°", "Global broadband · low latency"],
          ["Sentinel-2", "786 km · sun-synchronous", "Copernicus land monitoring"],
          ["Landsat-9", "705 km · near-polar", "Long-term land surface change"],
          ["NOAA-21 (JPSS)", "824 km · sun-synchronous", "Operational weather · climate records"],
        ],
      },
      diagramId: "orbit-leo-environment",
      relatedArticle: {
        slug: "spacecraft-power-budgeting",
        label: "Deep Dive: LEO Eclipse and State-of-Charge Planning",
      },
    },
    {
      id: "specialized-leo",
      label: "Section 03",
      heading: "Sun-Synchronous, Polar, and Repeat-Ground-Track Orbits",
      paragraphs: [
        "Not all LEO missions optimize for lowest altitude. Sun-synchronous orbits (SSO) combine altitude and inclination so Earth's oblateness precesses the orbital plane at ~1° per day — matching Earth's orbit around the Sun. The result is consistent local solar time on each pass: dawn-dusk orbits minimize surface shadow for optical imaging; morning orbits balance glint and thermal contrast.",
        "Polar and near-polar inclinations (~90°) maximize latitude coverage per pass and are standard for reconnaissance, environmental monitoring, and missile warning architectures that must see high latitudes on every revolution. Russia's Meteor-M series, US Defense Meteorological Satellite Program successors, and many SAR missions use high-inclination LEO for this reason.",
        "Repeat-ground-track (RGT) orbits tighten revisit further by choosing altitude and inclination so the ground track closes on itself every N days — Sentinel-1's 12-day cycle and TOPEX/Poseidon's precise ocean altimetry tracks are textbook examples. RGT is a design choice, not a natural consequence of 'being in LEO': it constrains launch timing and maneuver budget for maintenance.",
        "Very low Earth orbit (VLEO) — below roughly 450 km — is an active research area for aerodynamic drag compensation and high-resolution imaging with shorter slant ranges. The regime trades propellant or novel drag-sail control against atmospheric decay risk; missions here plan active deorbit as a reliability requirement, not an afterthought.",
      ],
      table: {
        headers: ["Mission", "Orbit Type", "Why This Geometry"],
        rows: [
          ["Sentinel-1 (SAR)", "SSO · 693 km · 12-day RGT", "Consistent repeat pass for interferometry"],
          ["Terra / Aqua (MODIS era)", "SSO · ~705 km", "Morning vs. afternoon equator crossing for science"],
          ["GRACE-FO", "Near-polar · ~490 km", "Gravity field recovery via range change"],
          ["NRO / commercial SAR", "High inclination LEO", "Arctic and Antarctic access every orbit"],
        ],
      },
    },
    {
      id: "meo",
      label: "Section 04",
      heading: "Medium Earth Orbit — Navigation and Connectivity",
      paragraphs: [
        "MEO occupies the gap between LEO radiation sweeps and GEO link distance. The defining application is satellite navigation: GPS (US), Galileo (Europe), GLONASS (Russia), and BeiDou (China) place constellations near 20,200 km altitude with ~12-hour periods so multiple spacecraft are always visible from any ground point.",
        "At MEO altitude, each spacecraft sees a smaller solid angle of Earth than LEO but suffers far more radiation than GEO — Van Allen belt traversal is the dominant lifetime and avionics hardness driver. Atomic clocks, uplinked ephemeris, and ground monitoring networks are the system; the orbit geometry is what makes trilateration work without requiring dozens of satellites in LEO.",
        "Commercial MEO communications break the GEO monopoly on maritime and aviation backhaul where latency matters. SES's O3b constellation (now O3b mPOWER) at ~8,062 km offers fiber-like latency compared with GEO while still covering wide ocean regions with fewer spacecraft than LEO constellations require. The trade is radiation environment and launch cost per satellite versus beam size and ground infrastructure.",
        "Disposal and debris mitigation in MEO are harder than they appear: graveyard orbits are less standardized than GEO's supersynchronous belt, and crossing LEO during deorbit must be sequenced to avoid collision risk. Navigation constellations publish almanacs and health bits; failed MEO spacecraft become long-lived hazards because atmospheric drag is negligible.",
      ],
      table: {
        headers: ["System", "Altitude", "Mission Role"],
        rows: [
          ["GPS (Block III)", "~20,200 km · 55° incl.", "Global PNT · military and civil timing"],
          ["Galileo", "~23,222 km · 56° incl.", "European GNSS · Search-and-rescue payload"],
          ["GLONASS", "~19,100 km · 64.8° incl.", "Russian GNSS · high-latitude performance"],
          ["BeiDou (MEO segment)", "~21,500 km", "Chinese GNSS · regional to global evolution"],
          ["O3b mPOWER", "~8,062 km · equatorial", "Low-latency broadband to maritime / enterprise"],
        ],
      },
    },
    {
      id: "geo-gto",
      label: "Section 05",
      heading: "Geostationary Orbit and the Transfer Path",
      paragraphs: [
        "GEO is the orbit of persistent presence: a spacecraft at ~35,786 km with near-zero inclination and eccentricity appears fixed relative to Earth's surface. One antenna pointing angle serves broadcast television, weather monitoring, and strategic communications for an entire hemisphere. The cost is distance — link budgets demand large antennas and transmit power — and the rocket equation for getting there.",
        "Few satellites launch directly into GEO. Most ride to geostationary transfer orbit (GTO): a highly elliptical orbit with perigee near LEO altitude and apogee at GEO radius. Onboard propulsion — chemical apogee motor for fast insertion, electric propulsion for efficient spiral — circularizes and plane-changes over days or months. The transfer phase is its own mission segment: thermal extremes, battery cycling, and radiation belt crossings before the spacecraft ever begins revenue service.",
        "Operational GEO missions span weather, communications, and missile warning. GOES-R (GOES-16/17) provides hemispheric weather imagery and lightning mapping for the Americas. Meteosat Third Generation and Himawari-9 cover other longitudes under the World Meteorological Organization's global constellation agreement. Intelsat, SES, Eutelsat, and national operators (e.g., India's GSAT, China's BeiDou GEO augmentation) stack communications payloads at orbital slots allocated by the ITU.",
        "Space situational awareness and nuclear detonation detection also use GEO. SBIRS GEO sensors stare at Earth's limb for missile launch signatures; DSP preceded SBIRS in the same architectural niche. These missions prioritize continuous stare over resolution — a different payload and pointing budget than a commercial comm sat, but the same orbital slot coordination problem.",
        "End-of-life disposal for GEO is codified: graveyard orbits ~300 km above GEO reduce collision risk with active spacecraft. Failure to dispose — or accidental breakup — has disproportionate consequence because GEO slots are finite and debris persists for millennia.",
      ],
      table: {
        headers: ["Mission", "Slot / Longitude", "Application"],
        rows: [
          ["GOES-16 / GOES-17", "75.2° W · 137.2° W", "Operational weather · lightning mapper"],
          ["Meteosat Third Generation", "0° · 9.5° E (planned)", "European operational weather"],
          ["Himawari-9", "140.7° E", "Japanese operational weather · GEO slot"],
          ["Intelsat / SES fleet", "ITU-allocated slots", "Broadcast · broadband · government leases"],
          ["SBIRS GEO", "Multiple classified slots", "Missile warning · persistent IR stare"],
          ["TDRS (NASA)", "GEO relay network", "Tracking and data relay for LEO science assets"],
        ],
      },
      relatedArticle: {
        slug: "electric-propulsion-systems",
        label: "Related: Electric Propulsion for GEO Station-Keeping and GTO Spiral",
      },
    },
    {
      id: "heo-specialty",
      label: "Section 06",
      heading: "Highly Elliptical and Specialty Orbits",
      paragraphs: [
        "When GEO's equatorial constraint is unacceptable and LEO's dwell time is too short, elliptical orbits fill the gap. The Molniya orbit — inclination ~63.4° (critical inclination where argument of perigee is stable), eccentricity ~0.74, period ~12 hours — places apogee over the northern hemisphere for roughly eight hours per revolution. Russia's Molniya-1 communications history and early Oko missile-warning spacecraft exploited this geometry before GEO capacity expanded.",
        "Tundra orbits use similar eccentricity with 24-hour period and apogee over a chosen longitude — Sirius XM's satellite radio constellation used inclined geosynchronous ellipses over North America for elevation angles urban receivers could see, avoiding the GEO antenna-pointing problem for moving vehicles.",
        "Supersynchronous and sub-GSO drift orbits appear in debris mitigation and slot acquisition strategies; they are operational tools as much as mission designs. Engineers distinguish intentional elliptical service orbits from disposal trajectories — the same equations, different requirements documents.",
        "Cislunar and near-rectilinear halo orbits (NRHO) are the emerging regime for Artemis and Gateway: neither Earth-centered LEO nor GEO, but three-body dynamics where stability and visibility for lunar landing campaigns drive the choice. CAPSTONE demonstrated NRHO navigation precursors; Gateway will use this architecture for crew staging. These orbits stress deep-space comm, navigation weak models, and multi-body station-keeping — a different software and operations stack than GEO station-keeping loops.",
      ],
      table: {
        headers: ["Orbit / Mission", "Geometry", "Application"],
        rows: [
          ["Molniya", "HEO · i ≈ 63.4°", "High-latitude comm and early warning (heritage)"],
          ["Sirius FM", "Tundra / inclined GEO", "Satellite radio · high elevation over cities"],
          ["CAPSTONE", "NRHO (cislunar)", "Pathfinder for Artemis navigation"],
          ["Gateway (planned)", "NRHO", "Crew staging · lunar logistics hub"],
          ["TESS (science)", "Highly elliptical · 2:1 resonance", "All-sky exoplanet survey · stable thermal"],
        ],
      },
    },
    {
      id: "lagrange-deep",
      label: "Section 07",
      heading: "Lagrange Points and Deep-Space Transfers",
      paragraphs: [
        "Sun-Earth Lagrange points L1 and L2 sit roughly 1.5 million km from Earth — outside the GEO belt by an order of magnitude. L1 is the natural home for solar observatories that must sit between Earth and Sun: DSCOVR monitors solar wind for space weather forecasting; SOHO and the Advanced Composition Explorer (ACE) established the operational precedent for upstream solar warnings.",
        "Sun-Earth L2 is the premier architecture for astrophysics missions that require cold, stable pointing away from Sun, Earth, and Moon. ESA's Gaia mapped a billion stars from L2; NASA's James Webb Space Telescope operates in a halo orbit around L2 with a sunshield that defines the entire vehicle architecture. Euclid and Roman Space Telescope continue the pipeline — each is an orbit choice before it is an instrument.",
        "L2 is not stable in the sense of GEO: spacecraft require periodic station-keeping burns (~1–4 m/s per year for halo orbits) to counter solar radiation pressure and gravitational perturbations. Propellant margin and FDIR for missed burns are part of mission life, not consumables accounting.",
        "Interplanetary missions are orbits in transit: Mars reconnaissance orbiters (MRO at ~250 km circular for imaging), Juno at Jupiter, and Cassini at Saturn each entered capture orbits tuned to science phase — low altitude for resolution, higher for coverage. The orbit design is the science timeline.",
      ],
      table: {
        headers: ["Mission", "Location", "Application"],
        rows: [
          ["DSCOVR", "Sun-Earth L1", "Solar wind · Earth disc space weather"],
          ["James Webb Space Telescope", "Sun-Earth L2 halo", "Infrared astrophysics · high-redshift universe"],
          ["Gaia", "Sun-Earth L2", "Stellar astrometry · Milky Way structure"],
          ["Mars Reconnaissance Orbiter", "Mars orbit ~250 km", "High-resolution surface science · relay"],
          ["Juno", "Jupiter polar orbit", "Magnetosphere and gravity science"],
        ],
      },
      diagramId: "orbit-regime-tradeoffs",
    },
    {
      id: "selection-framework",
      label: "Section 08",
      heading: "How to Choose an Orbit in Architecture Review",
      paragraphs: [
        "Orbit selection should follow requirements, not heritage convenience. Start from coverage (what must be seen, how often, at what resolution), latency (operations and communications), environment (radiation, eclipse, thermal), and lifetime (drag decay, station-keeping propellant). Only then map to altitude and inclination.",
        "The checklist below is the minimum set a systems review should close before preliminary design review — each 'no' is a mission risk accepted explicitly.",
      ],
      table: {
        headers: ["#", "Question", "Drives"],
        rows: [
          [
            "1",
            "What ground area must be covered per pass, and with what revisit?",
            "Altitude, inclination, constellation count",
          ],
          [
            "2",
            "Is consistent solar illumination required (optical EO)?",
            "Sun-synchronous vs. arbitrary LEO",
          ],
          [
            "3",
            "What is acceptable one-way comm latency?",
            "LEO vs. MEO vs. GEO architecture",
          ],
          [
            "4",
            "What radiation TID and SEE environment closes parts selection?",
            "LEO altitude, MEO belt, GEO transfer",
          ],
          [
            "5",
            "How much delta-V is available for insertion, station-keeping, and disposal?",
            "Launch vehicle, EP vs. chemical, mission duration",
          ],
          [
            "6",
            "What is the debris and licensing plan at end of life?",
            "25-year rule LEO · GEO graveyard · MEO disposal",
          ],
          [
            "7",
            "Does the payload need continuous stare or pole access?",
            "GEO vs. HEO vs. constellation phasing",
          ],
        ],
      },
      relatedArticle: {
        slug: "satellite-pointing-budget",
        label: "Related: Pointing Budget vs. Orbit Geometry",
      },
    },
    {
      id: "budget-coupling",
      label: "Section 09",
      heading: "Orbit Drives the Budgets — Not the Other Way Around",
      paragraphs: [
        "LEO stresses power and thermal cycling: eclipse every ~90 minutes forces battery sizing and heater duty cycles that GEO platforms at equinox avoid for months. Link budgets in LEO are favorable but Doppler shifts complicate coherent comm — a regime the RF article series treats as a first-class design input.",
        "MEO stresses radiation hardness and clock stability for navigation; it also stresses ground network cost because each spacecraft is one point among many, not one dish pointed at a fixed slot.",
        "GEO stresses link margin, station-keeping propellant, and pointing stability for narrow beams — plus the long transfer orbit where the spacecraft is not yet operational but fully exposed to belt radiation.",
        "Lagrange and deep-space orbits shift the dominant problem to thermal rejection at cryogenic science temperatures, station-keeping in unstable manifolds, and multi-hour light-time operations. The orbit is the architecture; subsystems are implementations of that choice.",
      ],
    },
  ],
  insight:
    "Orbit is the mission requirement written in Keplerian language. Pick altitude and inclination after coverage, latency, environment, and lifetime are defined — then let mass, power, link, pointing, thermal, and delta-V budgets follow from physics instead of fighting them in preliminary design.",
};

export default article;
