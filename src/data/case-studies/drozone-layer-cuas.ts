import type { CaseStudy } from "./types";
import image from "@/assets/case-study-1.jpg";

const caseStudy: CaseStudy = {
  id: "drozone-layer-cuas",
  label: "Counter-UAS Defense",
  title: "Drozone Layer — Counter-Drone Defense System",
  image,
  summary: "Architected a fixed-site multi-layer Counter-UAS defense system integrating MESA radar, EOIR imaging, and a 30mm chain gun under strict SWaP and engagement timing constraints.",
  featured: true,
  tags: ["Aerospace", "Architecture"],
  technologies: [
    "MESA Radar (Ku-band)",
    "EOIR Imaging",
    "FAAD C2",
    "ADS-B / IFF",
    "Timing Budget Analysis",
    "Kill Chain Design",
    "SWaP-C Optimization",
    "Sensor Fusion",
    "AI/ML Target Classification",
  ],
  tldr: {
    problem: "No single-sensor solution could meet the 97%+ effectiveness threshold against swarms of Group 1–3 drones at forward deployment ranges in all-weather conditions.",
    solution: "Multi-layer kill chain fusing Ku-band MESA radar and EOIR imaging to cue a 30mm chain gun, with timing budgets allocated across detect, identify, track, and engage phases per drone class.",
    impact: "Met objective-level performance on 4 of 6 requirements — 98% system effectiveness, 20-second single-threat engagement, $420K fielded unit cost.",
  },
  metrics: [
    { value: "98%", label: "System effectiveness" },
    { value: "20 sec", label: "Single-threat engagement" },
    { value: "$420K", label: "Fielded unit cost (lot of 50)" },
  ],
  context: [
    "Forward-deployed forces required protection against Group 1, 2, and 3 drone swarms in contested forward areas",
    "Threshold: ≥97% probability of defeating 10 sequential swarms of 8 drones each over one hour",
    "Field-deployable system: ≤3-hour assembly time, ≤1,000 ft³, ≤2,000 lbs, ≤20 kW power draw",
  ],
  problem: [
    "No single sensor met the 98% effectiveness threshold against all drone group classes at 3–5 km range",
    "EOIR provides superior track accuracy but degrades in fog, rain, and dust — common in forward areas",
    "Hard timing constraints: 20 seconds per single threat, 10 seconds per threat in multi-threat scenarios",
  ],
  constraints: [
    "SWaP-C envelope fixed — deployable without specialized tooling or permanent infrastructure",
    "Operating temperature: −40°C to +70°C required targeted hardware modification from vendor baselines",
    "All components at TRL 9 — integration-only prototype, no new subsystem development",
  ],
  role: [
    "System architect and primary technical author",
    "Designed sensor fusion architecture and kill chain concept of operations",
    "Developed timing budget analysis across all drone group classes and authored the full technical white paper",
  ],
  approach: [
    "Analyzed swarm angular spread to show that sequential engagement allows field-of-interest narrowing after first target acquisition",
    "Assigned radar as primary 360° search sensor and EOIR as high-accuracy cue sensor — each compensating where the other degrades",
    "Allocated timing budgets per drone class to verify the kill chain closed within all engagement windows before selecting components",
  ],
  solution: [
    "Echodyne Echoshield MESA radar (Ku-band, 11.4 km, 0.5° accuracy) + CM202U EOIR (13 km, 100 μrad) + MK-44 30mm chain gun (200 rds/min, 5 km max kill distance)",
    "FAAD C2 on ruggedized tablet — integrates all sensor feeds with AI-assisted threat classification and ADS-B IFF awareness",
    "360° × 90° field of regard; <1 false alarm/hr; 3-hour field assembly",
  ],
  impact: [
    "4 of 6 requirements met at objective level — 360° coverage, 20-target capacity, 3 km engagement range, 20-second single-threat timing",
    "Multiple-threat engagement at 1 second per threat, well beyond the 10-second objective",
    "Fielded unit cost of $420K in production lots of 50; prototype budget $5.26M NRE",
  ],
  insight: "A multi-sensor kill chain isn't just about redundancy — it's about designing each sensor to compensate precisely where the other degrades. The architecture is only as good as your understanding of each component's failure modes under real operational conditions.",
  relatedArticle: {
    slug: "counter-uas-kill-chain-architecture",
    label: "Deep Dive: Kill Chain Architecture",
  },
};

export default caseStudy;
