import React from "react";

function Wrapper({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 p-5 border border-line rounded-sm bg-muted/10">
      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-5">{title}</p>
      {children}
    </div>
  );
}

function Box({
  title,
  value,
  sub,
  accent,
}: {
  title: string;
  value?: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`border rounded-[2px] px-3 py-2.5 text-center min-w-[100px] ${
        accent ? "border-primary/30 bg-primary/5" : "border-line bg-card/60"
      }`}
    >
      <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground">
        {title}
      </div>
      {value && (
        <div className={`font-medium text-sm mt-0.5 ${accent ? "text-primary" : "text-foreground"}`}>
          {value}
        </div>
      )}
      {sub && (
        <div className="font-mono text-[9px] text-muted-foreground/55 mt-0.5">{sub}</div>
      )}
    </div>
  );
}

// ── Mass ─────────────────────────────────────────────────────────────────────

function MassDiagram() {
  const items = [
    { name: "Payload",    kg: 250, pct: 25 },
    { name: "Structure",  kg: 200, pct: 20 },
    { name: "Power Sub.", kg: 180, pct: 18 },
    { name: "Propulsion", kg: 150, pct: 15 },
    { name: "ACS",        kg: 80,  pct: 8  },
    { name: "Thermal",    kg: 50,  pct: 5  },
    { name: "C&DH",       kg: 50,  pct: 5  },
    { name: "Margin",     kg: 40,  pct: 4  },
  ];
  return (
    <Wrapper title="Mass Allocation — 1,000 kg Reference Spacecraft">
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-3">
            <span className="w-[90px] font-mono text-[10px] text-muted-foreground/70 text-right shrink-0">
              {item.name}
            </span>
            <div className="flex-1 h-3.5 bg-muted/30 rounded-[1px] overflow-hidden">
              <div
                className="h-full bg-primary/45 rounded-[1px]"
                style={{ width: `${(item.pct / 25) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 w-[90px] shrink-0">
              {item.kg} kg · {item.pct}%
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[9px] text-muted-foreground/35 pl-[102px] pr-[102px]">
        <span>0%</span>
        <span>25%</span>
      </div>
    </Wrapper>
  );
}

// ── Power ────────────────────────────────────────────────────────────────────

function PowerDiagram() {
  return (
    <Wrapper title="Power Budget — Generation, Storage, and Consumption">
      <div className="flex items-center gap-2 justify-center flex-wrap sm:flex-nowrap">
        <Box title="Solar Arrays" value="2,600W" sub="BOL · 13 m²" />
        <span className="text-muted-foreground/40 font-mono text-sm shrink-0">→</span>
        <Box title="EPS" value="Regulator" sub="−15% loss" accent />
        <span className="text-muted-foreground/40 font-mono text-sm shrink-0">→</span>
        <Box title="Subsystems" value="1,000W" sub="EOL minimum" />
      </div>
      <div className="flex flex-col items-center mt-1">
        <div className="h-5 w-px border-l border-dashed border-line/50" />
        <Box title="Battery Pack" sub="eclipse buffer · ~90 min LEO" />
      </div>
      <p className="mt-4 font-mono text-[9px] text-muted-foreground/50 text-center">
        EOL solar output must exceed peak load + battery charge rate simultaneously
      </p>
    </Wrapper>
  );
}

// ── Link ─────────────────────────────────────────────────────────────────────

function LinkDiagram() {
  return (
    <Wrapper title="Link Budget — Signal Path at 8 GHz, 500 km Altitude">
      <div className="flex items-center gap-4 justify-center">
        <Box title="Satellite TX" value="+30 dBm" sub="10 W · 8 GHz" />
        <div className="flex-1 flex flex-col items-center min-w-0 gap-1">
          <div className="w-full border-t border-dashed border-line/50" />
          <div className="text-center">
            <div className="font-mono text-[9px] text-muted-foreground/70">Free Space Loss</div>
            <div className="font-semibold text-sm text-foreground">−168 dB</div>
            <div className="font-mono text-[9px] text-muted-foreground/50">500 km altitude</div>
          </div>
          <div className="w-full flex items-center">
            <div className="flex-1 border-t border-dashed border-line/50" />
            <span className="font-mono text-[10px] text-muted-foreground/40 pl-1">→</span>
          </div>
        </div>
        <Box title="Ground RX" value="+45 dBi" sub="3 m dish · SNR 12 dB ✓" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="border border-line/30 rounded-[2px] px-2 py-1.5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Atmospheric Loss</div>
          <div className="font-mono text-xs text-foreground">−2 dB</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">clear sky</div>
        </div>
        <div className="border border-line/30 rounded-[2px] px-2 py-1.5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Rain Fade (X-band)</div>
          <div className="font-mono text-xs text-foreground">−20 dB</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">heavy rain event</div>
        </div>
        <div className="border border-primary/20 rounded-[2px] px-2 py-1.5 bg-primary/5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Required Margin</div>
          <div className="font-mono text-xs text-primary">3–6 dB</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">design target</div>
        </div>
      </div>
    </Wrapper>
  );
}

// ── Pointing ─────────────────────────────────────────────────────────────────

function PointingDiagram() {
  const sources = [
    { name: "Star Tracker",   value: 0.003, desc: "knowledge error" },
    { name: "Reaction Wheel", value: 0.005, desc: "speed precision" },
    { name: "Struct. Flex",   value: 0.004, desc: "thermal gradient" },
    { name: "Control Loop",   value: 0.006, desc: "update latency" },
  ];
  const rss = Math.sqrt(sources.reduce((s, src) => s + src.value * src.value, 0));
  const req = 0.01;
  const scale = req * 1.15;

  return (
    <Wrapper title="Pointing Budget — Error Source Accumulation (RSS Method)">
      <div className="space-y-2">
        {sources.map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="w-[116px] font-mono text-[10px] text-muted-foreground/70 text-right shrink-0">
              {s.name}
            </span>
            <div className="flex-1 h-3 bg-muted/30 rounded-[1px] overflow-hidden">
              <div
                className="h-full bg-primary/40 rounded-[1px]"
                style={{ width: `${(s.value / scale) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 w-[72px] shrink-0">
              ±{s.value.toFixed(3)}°
            </span>
          </div>
        ))}

        <div className="border-t border-line/40 pt-2 flex items-center gap-3">
          <span className="w-[116px] font-mono text-[10px] text-foreground/80 text-right shrink-0 font-medium">
            RSS Total
          </span>
          <div className="flex-1 h-3 bg-muted/30 rounded-[1px] overflow-hidden relative">
            <div
              className="h-full bg-primary/70 rounded-[1px]"
              style={{ width: `${(rss / scale) * 100}%` }}
            />
            <div
              className="absolute top-0 bottom-0 w-px bg-foreground/25"
              style={{ left: `${(req / scale) * 100}%` }}
              title="Requirement"
            />
          </div>
          <span className="font-mono text-[10px] text-primary w-[72px] shrink-0 font-medium">
            ±{rss.toFixed(3)}°
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-[116px] font-mono text-[10px] text-muted-foreground/40 text-right shrink-0">
            Requirement
          </span>
          <div className="flex-1 relative h-3 flex items-center">
            <div
              className="absolute h-full w-px bg-foreground/25"
              style={{ left: `${(req / scale) * 100}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/50 w-[72px] shrink-0">
            ±{req.toFixed(3)}°
          </span>
        </div>
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        RSS = √(0.003² + 0.005² + 0.004² + 0.006²) = {rss.toFixed(4)}° — within requirement ✓
      </p>
    </Wrapper>
  );
}

// ── Thermal ──────────────────────────────────────────────────────────────────

function ThermalDiagram() {
  const components = [
    { name: "Battery Pack",    min: 0,    max: 40,   label: "0°C to +40°C"   },
    { name: "Payload Optics",  min: -20,  max: 60,   label: "−20°C to +60°C" },
    { name: "Electronics",     min: -40,  max: 85,   label: "−40°C to +85°C" },
    { name: "Structure",       min: -100, max: 100,  label: "−100°C to +100°C"},
  ];
  const envMin = -150;
  const envMax = 120;
  const range = envMax - envMin;

  const pct = (v: number) => ((v - envMin) / range) * 100;

  return (
    <Wrapper title="Thermal Budget — Component Operating Ranges vs. Orbital Environment">
      <div className="mb-4 flex justify-between font-mono text-[9px] text-muted-foreground/40">
        <span>−150°C (eclipse)</span>
        <span>+120°C (sunlit)</span>
      </div>
      <div className="space-y-2.5">
        {components.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="w-[108px] font-mono text-[10px] text-muted-foreground/70 text-right shrink-0">
              {c.name}
            </span>
            <div className="flex-1 h-3.5 bg-muted/20 rounded-[1px] relative overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-primary/45 rounded-[1px]"
                style={{
                  left: `${pct(c.min)}%`,
                  width: `${pct(c.max) - pct(c.min)}%`,
                }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 w-[112px] shrink-0">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="border border-line/30 rounded-[2px] px-2 py-1.5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Solar Flux</div>
          <div className="font-mono text-xs text-foreground">1,361 W/m²</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">at 1 AU</div>
        </div>
        <div className="border border-line/30 rounded-[2px] px-2 py-1.5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Earth Albedo</div>
          <div className="font-mono text-xs text-foreground">~30%</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">reflected solar</div>
        </div>
        <div className="border border-primary/20 rounded-[2px] px-2 py-1.5 bg-primary/5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Radiator Output</div>
          <div className="font-mono text-xs text-primary">~3 m²</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">per 1,000W load</div>
        </div>
      </div>
    </Wrapper>
  );
}

// ── Delta-V ───────────────────────────────────────────────────────────────────

function DeltaVDiagram() {
  const phases = [
    { name: "Orbit Insertion",    dv: 1500, note: "GTO → GEO apogee kick" },
    { name: "N/S Station-keeping", dv: 750,  note: "50 m/s/yr × 15 yr"    },
    { name: "E/W Station-keeping", dv: 30,   note: "2 m/s/yr × 15 yr"     },
    { name: "Orbit Corrections",   dv: 50,   note: "disposal prep + trim"  },
    { name: "Disposal",            dv: 11,   note: "GEO graveyard raise"   },
    { name: "Margin",              dv: 109,  note: "contingency reserve"   },
  ];
  const total = phases.reduce((s, p) => s + p.dv, 0);
  const maxDv = 1500;

  return (
    <Wrapper title={`Delta-V Budget — ${total.toLocaleString()} m/s Total, 15-Year GEO Mission`}>
      <div className="space-y-2">
        {phases.map((p) => (
          <div key={p.name} className="flex items-center gap-3">
            <span className="w-[132px] font-mono text-[10px] text-muted-foreground/70 text-right shrink-0">
              {p.name}
            </span>
            <div className="flex-1 h-3.5 bg-muted/30 rounded-[1px] overflow-hidden">
              <div
                className="h-full bg-primary/45 rounded-[1px]"
                style={{ width: `${(p.dv / maxDv) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 w-[64px] shrink-0 text-right">
              {p.dv} m/s
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        Total: {total.toLocaleString()} m/s · Propellant fraction: ~40% of launch mass
      </div>
    </Wrapper>
  );
}

// ── Cascade ──────────────────────────────────────────────────────────────────

function CascadeDiagram() {
  const steps = [
    { trigger: "Mass 5% over allocation",   effect: "Orbit insertion burn uses excess propellant", level: 1 },
    { trigger: "Propellant reserve depleted", effect: "Delta-V budget cannot close",               level: 2 },
    { trigger: "Delta-V shortfall",          effect: "Station-keeping duration constrained",       level: 2 },
    { trigger: "Station-keeping reduced",    effect: "Orbital lifetime shortened by 3+ years",     level: 3 },
    { trigger: "Mission life shortened",     effect: "Revenue and contract commitments at risk",   level: 3 },
  ];
  return (
    <Wrapper title="Budget Cascade — How One Violation Propagates">
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                  step.level === 1
                    ? "bg-muted-foreground/40"
                    : step.level === 2
                    ? "bg-primary/55"
                    : "bg-primary"
                }`}
              />
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-line/40 my-1" style={{ minHeight: "20px" }} />
              )}
            </div>
            <div className="pb-3">
              <span className="font-mono text-[10px] text-foreground/80">{step.trigger}</span>
              <span className="font-mono text-[10px] text-muted-foreground/45 mx-2">→</span>
              <span className="font-mono text-[10px] text-muted-foreground/70">{step.effect}</span>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

// ── Sensor Fusion ─────────────────────────────────────────────────────────────

function SensorFusionDiagram() {
  const sensors = [
    {
      name: "MESA Radar",
      strengths: ["360° continuous search", "All-weather operation", "11.4 km detection range"],
      weakness: "0.5° track accuracy — insufficient to cue gun directly",
    },
    {
      name: "EOIR Camera",
      strengths: ["100 μrad track accuracy", "Target recognition & ID", "Kill confirmation imaging"],
      weakness: "Blind in fog, heavy rain, and dust",
    },
  ];

  return (
    <Wrapper title="Sensor Fusion — Complementary Coverage Strategy">
      <div className="grid sm:grid-cols-2 gap-4">
        {sensors.map((s) => (
          <div key={s.name} className="border border-line rounded-[2px] p-4 bg-card/60">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-primary mb-3">
              {s.name}
            </div>
            <div className="space-y-1 mb-3">
              {s.strengths.map((str) => (
                <div key={str} className="flex items-start gap-2">
                  <span className="mt-[6px] w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                  <span className="font-mono text-[10px] text-foreground/75">{str}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-line/40 pt-2.5">
              <span className="font-mono text-[9px] tracking-[0.1em] uppercase text-muted-foreground/60">
                Failure mode
              </span>
              <p className="font-mono text-[10px] text-muted-foreground/70 mt-1">{s.weakness}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 border border-primary/20 rounded-[2px] p-3 bg-primary/5">
        <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-primary mb-1.5">
          Fusion Strategy
        </div>
        <p className="font-mono text-[10px] text-foreground/75">
          Radar searches 360° continuously → cues EOIR to narrow angular window → EOIR provides precision track for gun cueing → radar resumes full-sphere search for next swarm wave
        </p>
      </div>
    </Wrapper>
  );
}

// ── Engagement Timing ─────────────────────────────────────────────────────────

function EngagementTimingDiagram() {
  const groups = [
    { name: "Group 1", detectId: 38.9, engage: 58.3, color: "bg-primary/30" },
    { name: "Group 2", detectId: 38.9, engage: 23.3, color: "bg-primary/50" },
    { name: "Group 3", detectId: 51.8, engage: 32.4, color: "bg-primary/70" },
  ];
  const maxVal = 100;

  return (
    <Wrapper title="Engagement Timing Budget — Seconds Available per Phase per Group">
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g.name}>
            <div className="font-mono text-[10px] text-muted-foreground/70 mb-1.5">{g.name}</div>
            <div className="flex gap-1 h-7">
              <div
                className={`${g.color} rounded-[1px] flex items-center justify-center`}
                style={{ width: `${(g.detectId / maxVal) * 100}%` }}
              >
                <span className="font-mono text-[9px] text-foreground/70 px-1 truncate">
                  Detect + ID · {g.detectId}s
                </span>
              </div>
              <div
                className={`bg-muted/40 rounded-[1px] flex items-center justify-center border border-line/30`}
                style={{ width: `${(g.engage / maxVal) * 100}%` }}
              >
                <span className="font-mono text-[9px] text-muted-foreground/70 px-1 truncate">
                  Engage · {g.engage}s
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center">
        <div className="border border-line/30 rounded-[2px] px-2 py-1.5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Single Threat</div>
          <div className="font-mono text-xs text-foreground">20 sec</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">requirement</div>
        </div>
        <div className="border border-line/30 rounded-[2px] px-2 py-1.5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Multiple Threats</div>
          <div className="font-mono text-xs text-foreground">10 sec each</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">objective</div>
        </div>
        <div className="border border-primary/20 rounded-[2px] px-2 py-1.5 bg-primary/5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Achieved</div>
          <div className="font-mono text-xs text-primary">1 sec each</div>
          <div className="font-mono text-[8px] text-muted-foreground/40">10× objective</div>
        </div>
      </div>
    </Wrapper>
  );
}

// ── COP-1 FOP / FARM ──────────────────────────────────────────────────────────

function CopFopFarmDiagram() {
  return (
    <Wrapper title="COP-1 Closed Loop — FOP-1 ↔ CLCW ↔ FARM-1">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Box title="Ground" value="FOP-1" sub="V(S), NN(R)" accent />
        <div className="flex flex-col items-center gap-1 shrink-0">
          <span className="font-mono text-[9px] text-muted-foreground/50">AD frames N(S)</span>
          <div className="w-12 sm:w-16 h-px bg-primary/40" />
          <span className="font-mono text-[9px] text-primary/70">TC / USLP</span>
        </div>
        <Box title="Spacecraft" value="FARM-1" sub="V(R)" accent />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
        <div className="hidden sm:block flex-1" />
        <div className="border border-dashed border-line/50 rounded-[2px] px-4 py-2 text-center w-full sm:w-auto">
          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-muted-foreground/60">
            CLCW in Telemetry
          </div>
          <div className="font-mono text-[10px] text-foreground/75 mt-1">
            N(R) · Lockout · Wait · Retransmit
          </div>
        </div>
        <div className="hidden sm:block flex-1" />
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        Frames must pass Frame Validation Check before entering COP-1 state machines
      </p>
    </Wrapper>
  );
}

function CopFopStatesDiagram() {
  const states = [
    { id: "S1", name: "Active", note: "Normal AD transmit" },
    { id: "S2", name: "Retransmit", note: "Wait=0, go-back-n" },
    { id: "S3", name: "Retransmit", note: "Wait=1, hold" },
    { id: "S4", name: "Init (no BC)", note: "Await clean CLCW" },
    { id: "S5", name: "Init (BC)", note: "Unlock / Set V(R)" },
    { id: "S6", name: "Initial", note: "Queues purged" },
  ];
  return (
    <Wrapper title="FOP-1 State Summary — S1 through S6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {states.map((s) => (
          <div
            key={s.id}
            className={`border rounded-[2px] px-2.5 py-2 ${
              s.id === "S1" ? "border-primary/30 bg-primary/5" : "border-line bg-card/60"
            }`}
          >
            <div className="font-mono text-[10px] text-primary">{s.id}</div>
            <div className="font-mono text-[10px] text-foreground/80 mt-0.5">{s.name}</div>
            <div className="font-mono text-[9px] text-muted-foreground/55 mt-0.5">{s.note}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

function CopSlidingWindowDiagram() {
  const k = 4;
  const vr = 10;
  const frames = Array.from({ length: 8 }, (_, i) => {
    const ns = vr + i;
    const inWindow = i < k;
    const acked = i === 0;
    return { ns, inWindow, acked };
  });
  return (
    <Wrapper title="Sliding Window — FOP K=4 unacknowledged frames, FARM V(R)=10">
      <div className="mb-3 font-mono text-[9px] text-muted-foreground/55 text-center">
        Sender may have up to K frames ahead of N(R); receiver accepts N(S) in [V(R), V(R)+PW)
      </div>
      <div className="flex flex-wrap justify-center gap-1.5">
        {frames.map((f) => (
          <div
            key={f.ns}
            className={`w-10 h-10 flex flex-col items-center justify-center border rounded-[2px] font-mono text-[9px] ${
              f.acked
                ? "border-line/30 bg-muted/20 text-muted-foreground/40"
                : f.inWindow
                ? "border-primary/35 bg-primary/10 text-primary"
                : "border-line/30 bg-card/40 text-muted-foreground/50"
            }`}
          >
            <span>N(S)</span>
            <span className="text-[11px] font-medium">{f.ns}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-4 font-mono text-[9px] text-muted-foreground/55">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-[1px] bg-primary/45" /> In flight (≤ K)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-[1px] bg-muted/30" /> Acknowledged
        </span>
      </div>
    </Wrapper>
  );
}

function CopRetransmitDiagram() {
  const steps = [
    { trigger: "CLCW Retransmit=1 or T1 expiry", effect: "Abort lower-layer transfers on VC" },
    { trigger: "Transmission_Count++", effect: "Reset timer to T1_Initial" },
    { trigger: "Mark Sent_Queue", effect: "To_Be_Retransmitted_Flag on all unacked frames" },
    { trigger: "Sequential replay", effect: "Pass copies to Lower Procedures; clear flag on Accept" },
    { trigger: "Transmission_Limit exceeded", effect: "Alert [limit] or Suspend per TT" },
  ];
  return (
    <Wrapper title="Go-Back-n Retransmission Sequence">
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                  i === steps.length - 1 ? "bg-muted-foreground/40" : "bg-primary/55"
                }`}
              />
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-line/40 my-1" style={{ minHeight: "16px" }} />
              )}
            </div>
            <div className="pb-2.5">
              <span className="font-mono text-[10px] text-foreground/80">{step.trigger}</span>
              <span className="font-mono text-[10px] text-muted-foreground/45 mx-2">→</span>
              <span className="font-mono text-[10px] text-muted-foreground/70">{step.effect}</span>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

// ── RF Communications ───────────────────────────────────────────────────────────

function RfSignalStackDiagram() {
  const layers = [
    { name: "RF Carrier", role: "Physical highway", detail: "S / X / Ka-band sine wave" },
    { name: "Subcarrier", role: "Lane on the highway", detail: "Intermediate tone" },
    { name: "Data Symbols", role: "Markers in the lane", detail: "BPSK / QPSK states" },
    { name: "Bits", role: "Vehicles", detail: "Binary stream" },
    { name: "Frames / Packets", role: "Cargo", detail: "CCSDS structures" },
  ];
  return (
    <Wrapper title="Signal Hierarchy — Carrier to CCSDS Frames">
      <div className="space-y-0">
        {layers.map((l, i) => (
          <div key={l.name} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center shrink-0 w-4">
              <div
                className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                  i === 0 ? "bg-primary" : "bg-primary/45"
                }`}
              />
              {i < layers.length - 1 && (
                <div className="w-px flex-1 bg-line/40 my-1" style={{ minHeight: "14px" }} />
              )}
            </div>
            <div className="pb-2.5 flex-1">
              <div className="font-mono text-[10px] text-primary">{l.name}</div>
              <div className="font-mono text-[10px] text-foreground/80">{l.role}</div>
              <div className="font-mono text-[9px] text-muted-foreground/55">{l.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

function RfDemodPipelineDiagram() {
  const steps = [
    "Capture RF via antenna",
    "Amplify & downconvert",
    "PLL carrier lock",
    "Track Doppler / phase",
    "Remove carrier",
    "Recover subcarrier & symbols",
    "Bit synchronizer",
    "Frame sync",
    "Telemetry packets",
  ];
  return (
    <Wrapper title="Ground Demodulation Chain — Sequential Recovery">
      <div className="flex flex-wrap justify-center gap-1.5">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div
              className={`border rounded-[2px] px-2 py-1.5 font-mono text-[9px] text-center max-w-[108px] ${
                i === steps.length - 1
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-line bg-card/60 text-foreground/75"
              }`}
            >
              {s}
            </div>
            {i < steps.length - 1 && (
              <span className="font-mono text-[10px] text-muted-foreground/35 self-center">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        Residual carrier enables PLL lock before data decode
      </p>
    </Wrapper>
  );
}

function RfLockHierarchyDiagram() {
  const states = [
    { name: "No Signal", note: "No RF energy detected" },
    { name: "Carrier Lock", note: "PLL tracking RF wave" },
    { name: "Subcarrier / Symbol Lock", note: "Data markers identified" },
    { name: "Frame Sync", note: "CCSDS structures recognized" },
    { name: "Valid Telemetry", note: "Decoded, usable for ops" },
  ];
  return (
    <Wrapper title="Lock State Hierarchy — Operations Status Board">
      <div className="space-y-2">
        {states.map((s, i) => (
          <div
            key={s.name}
            className={`flex items-center gap-3 border rounded-[2px] px-3 py-2 ${
              i === states.length - 1
                ? "border-primary/30 bg-primary/5"
                : "border-line bg-card/50"
            }`}
          >
            <span className="font-mono text-[9px] text-muted-foreground/45 w-4 shrink-0">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] text-foreground/85">{s.name}</div>
              <div className="font-mono text-[9px] text-muted-foreground/55">{s.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

function RfDopplerLeoDiagram() {
  const points = [
    { label: "AOS", freq: "High", note: "Approaching — tune high" },
    { label: "TCA", freq: "Center", note: "Doppler rate flattens" },
    { label: "LOS", freq: "Low", note: "Receding — tune low" },
  ];
  return (
    <Wrapper title="LEO Pass Doppler Profile — Frequency vs. Time">
      <div className="flex justify-between items-end h-16 px-2 mb-2">
        <div className="flex flex-col items-center">
          <div className="w-2 h-10 bg-primary/50 rounded-[1px]" />
          <span className="font-mono text-[9px] text-muted-foreground/55 mt-1">AOS</span>
        </div>
        <div className="flex flex-col items-center flex-1 mx-2">
          <div className="w-full h-px bg-line/50 relative top-5" />
          <div className="w-2 h-2 rounded-full bg-primary/70 relative top-3" />
          <span className="font-mono text-[9px] text-muted-foreground/55 mt-4">TCA</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-2 h-4 bg-primary/30 rounded-[1px]" />
          <span className="font-mono text-[9px] text-muted-foreground/55 mt-1">LOS</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {points.map((p) => (
          <div key={p.label} className="border border-line/30 rounded-[2px] px-2 py-1.5 text-center">
            <div className="font-mono text-[9px] text-primary">{p.label}</div>
            <div className="font-mono text-[10px] text-foreground/80">{p.freq}</div>
            <div className="font-mono text-[8px] text-muted-foreground/50">{p.note}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        Δf/f = v/c — higher bands → larger shift at same velocity
      </p>
    </Wrapper>
  );
}

function RfLinkMarginDiagram() {
  const margins = [
    { db: "< 0", meaning: "Link failure — does not close", tone: "critical" as const },
    { db: "0 – 2", meaning: "Critical risk — small errors break link", tone: "warn" as const },
    { db: "3 – 5", meaning: "Workable — requires monitoring", tone: "ok" as const },
    { db: "6+", meaning: "Comfortable design cushion", tone: "good" as const },
  ];
  return (
    <Wrapper title="Link Margin Interpretation — Eb/N0 Safety Cushion">
      <div className="space-y-1.5">
        {margins.map((m) => (
          <div
            key={m.db}
            className={`flex items-center gap-3 border rounded-[2px] px-3 py-2 ${
              m.tone === "good"
                ? "border-primary/30 bg-primary/5"
                : m.tone === "critical"
                ? "border-destructive/25 bg-destructive/5"
                : "border-line bg-card/50"
            }`}
          >
            <span className="font-mono text-xs font-medium w-12 shrink-0 text-foreground">
              {m.db} dB
            </span>
            <span className="font-mono text-[10px] text-muted-foreground/70">{m.meaning}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        ↑ Data rate → ↓ Eb/N0 → ↓ margin · Doubling distance → −6 dB FSPL
      </p>
    </Wrapper>
  );
}

// ── EPS Power Budgeting ───────────────────────────────────────────────────────

function EpsSystemLayersDiagram() {
  const layers = [
    { name: "Mission / Orbit", detail: "Eclipse duration, beta angle, season" },
    { name: "Power Source", detail: "Cells, area, packing, EOL degradation" },
    { name: "Battery", detail: "Li-ion, Wh/Ah, temp limits, cycle life" },
    { name: "Power Electronics", detail: "Bus regulation, MPPT/DET, converters" },
    { name: "Loads", detail: "Avionics, comm, payload, heaters" },
  ];
  return (
    <Wrapper title="EPS Analysis Layers — Five Interdependent Domains">
      <div className="space-y-2">
        {layers.map((l, i) => (
          <div
            key={l.name}
            className={`border rounded-[2px] px-3 py-2 ${
              i === 0 ? "border-primary/25 bg-primary/5" : "border-line bg-card/50"
            }`}
          >
            <div className="font-mono text-[10px] text-primary">{l.name}</div>
            <div className="font-mono text-[9px] text-muted-foreground/60">{l.detail}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

function EpsOrbitTimelineDiagram() {
  return (
    <Wrapper title="95-Min LEO Orbit — Sunlight vs. Eclipse (Typical)">
      <div className="flex h-8 rounded-[2px] overflow-hidden border border-line/40">
        <div
          className="bg-primary/45 flex items-center justify-center font-mono text-[9px] text-foreground/80"
          style={{ width: "63%" }}
        >
          Sunlight ~60 min
        </div>
        <div
          className="bg-muted/50 flex items-center justify-center font-mono text-[9px] text-muted-foreground/70"
          style={{ width: "37%" }}
        >
          Eclipse ~35 min
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-center">
        <div className="border border-primary/20 rounded-[2px] px-2 py-1.5 bg-primary/5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Sunlight</div>
          <div className="font-mono text-[10px] text-foreground">Generate + recharge</div>
        </div>
        <div className="border border-line/30 rounded-[2px] px-2 py-1.5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Eclipse</div>
          <div className="font-mono text-[10px] text-foreground/80">Battery-only survival</div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        P = instantaneous · E = P × t determines eclipse survival
      </p>
    </Wrapper>
  );
}

function EpsOrbitEnergyDiagram() {
  const segments = [
    { mode: "Eclipse Survival", power: 21, min: 35, wh: 12.25 },
    { mode: "Nominal Sunlit", power: 48, min: 45, wh: 36 },
    { mode: "Downlink Sunlit", power: 32, min: 15, wh: 8 },
  ];
  const total = segments.reduce((s, x) => s + x.wh, 0);
  const maxWh = 36;
  return (
    <Wrapper title={`Orbit Energy Budget — E_orbit = ${total} Wh (Worked Example)`}>
      <div className="space-y-2">
        {segments.map((s) => (
          <div key={s.mode} className="flex items-center gap-3">
            <span className="w-[120px] font-mono text-[10px] text-muted-foreground/70 text-right shrink-0">
              {s.mode}
            </span>
            <div className="flex-1 h-3.5 bg-muted/30 rounded-[1px] overflow-hidden">
              <div
                className="h-full bg-primary/45 rounded-[1px]"
                style={{ width: `${(s.wh / maxWh) * 100}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 w-[88px] shrink-0">
              {s.power}W × {s.min}m = {s.wh}Wh
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        P_sa ≈ {total}W in 60 min sun · EOL derate 0.75 → ~75W array target
      </div>
    </Wrapper>
  );
}

function EpsUvStagesDiagram() {
  const stages = [
    { v: "13.2 V", label: "Low Power Warning", action: "Inhibit new high-power ops", level: 0 },
    { v: "12.8 V", label: "Load Shed", action: "Drop non-critical + high-rate TX", level: 1 },
    { v: "12.2 V", label: "Critical Safe Mode", action: "OBC, comm standby, min thermal", level: 2 },
    { v: "11.8 V", label: "Battery Protection", action: "Hardware disconnect", level: 3 },
  ];
  return (
    <Wrapper title="Staged Undervoltage — 14.8 V Nominal Li-Ion System">
      <div className="space-y-1.5">
        {stages.map((s) => (
          <div
            key={s.v}
            className={`flex items-center gap-3 border rounded-[2px] px-3 py-2 ${
              s.level >= 2
                ? "border-destructive/20 bg-destructive/5"
                : s.level === 1
                ? "border-primary/25 bg-primary/5"
                : "border-line bg-card/50"
            }`}
          >
            <span className="font-mono text-[10px] font-medium w-14 shrink-0">{s.v}</span>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] text-foreground/85">{s.label}</div>
              <div className="font-mono text-[9px] text-muted-foreground/55">{s.action}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        Persist thresholds (e.g. &lt; 12.8 V for &gt; 5 s) to reject TX inrush transients
      </p>
    </Wrapper>
  );
}

function EpsShedTiersDiagram() {
  const tiers = [
    {
      tier: "Tier 1 — Survival",
      loads: "EPS · OBC · Watchdog · Essential heaters · Low-rate comm",
      shed: "Never shed",
    },
    {
      tier: "Tier 2 — Mission Support",
      loads: "Full ADCS · GPS · High-rate comm",
      shed: "Shed after Tier 3 exhausted",
    },
    {
      tier: "Tier 3 — Payload",
      loads: "Science instruments · Experimental loads",
      shed: "First to disable on UV",
    },
  ];
  return (
    <Wrapper title="Load Shed Priority — Re-enable with Hysteresis + SOC">
      <div className="space-y-2">
        {tiers.map((t) => (
          <div key={t.tier} className="border border-line rounded-[2px] p-3 bg-card/50">
            <div className="font-mono text-[10px] text-primary mb-1">{t.tier}</div>
            <div className="font-mono text-[9px] text-foreground/75">{t.loads}</div>
            <div className="font-mono text-[9px] text-muted-foreground/50 mt-1">{t.shed}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        OFF: V &lt; 11.6 V for 5 s · ON: V &gt; 12.2 V for 10 min AND SOC &gt; 40%
      </p>
    </Wrapper>
  );
}

// ── Orbit regimes ─────────────────────────────────────────────────────────────

function OrbitAltitudeRegimesDiagram() {
  const regimes = [
    { name: "ISS / crewed LEO", alt: "400 km", pct: 2 },
    { name: "EO / comm LEO", alt: "500–800 km", pct: 4 },
    { name: "Starlink shell", alt: "550 km", pct: 3 },
    { name: "O3b MEO", alt: "8,062 km", pct: 18 },
    { name: "GPS / GNSS", alt: "20,200 km", pct: 45 },
    { name: "GEO", alt: "35,786 km", pct: 80 },
    { name: "L1 / L2", alt: "~1.5M km", pct: 100 },
  ];
  return (
    <Wrapper title="Altitude Scale — Earth-Centered Regimes (Log-Relative)">
      <div className="space-y-2">
        {regimes.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="w-[110px] font-mono text-[10px] text-muted-foreground/70 text-right shrink-0">
              {r.name}
            </span>
            <div className="flex-1 h-3.5 bg-muted/30 rounded-[1px] overflow-hidden">
              <div
                className="h-full bg-primary/45 rounded-[1px]"
                style={{ width: `${r.pct}%` }}
              />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground/60 w-[72px] shrink-0">
              {r.alt}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        Bar length is illustrative — GEO is ~90× ISS altitude; L2 is ~40× GEO
      </p>
    </Wrapper>
  );
}

function OrbitLeoEnvironmentDiagram() {
  return (
    <Wrapper title="LEO Orbital Environment — ~500 km Reference">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="border border-line/30 rounded-[2px] px-2 py-2">
          <div className="font-mono text-[9px] text-muted-foreground/60">Period</div>
          <div className="font-mono text-xs text-foreground">~95 min</div>
        </div>
        <div className="border border-line/30 rounded-[2px] px-2 py-2">
          <div className="font-mono text-[9px] text-muted-foreground/60">Eclipse</div>
          <div className="font-mono text-xs text-foreground">~35 min</div>
        </div>
        <div className="border border-line/30 rounded-[2px] px-2 py-2">
          <div className="font-mono text-[9px] text-muted-foreground/60">Velocity</div>
          <div className="font-mono text-xs text-foreground">~7.6 km/s</div>
        </div>
        <div className="border border-primary/20 rounded-[2px] px-2 py-2 bg-primary/5">
          <div className="font-mono text-[9px] text-muted-foreground/60">Drag</div>
          <div className="font-mono text-xs text-primary">Non-negligible</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 justify-center flex-wrap">
        <Box title="Van Allen" value="Inner belt" sub="below ~1,000 km" />
        <span className="text-muted-foreground/40 font-mono text-sm">+</span>
        <Box title="Atmosphere" value="Residual" sub="drag · decay" accent />
        <span className="text-muted-foreground/40 font-mono text-sm">+</span>
        <Box title="Link" value="Favorable" sub="short range" />
      </div>
    </Wrapper>
  );
}

function OrbitRegimeTradeoffsDiagram() {
  const axes = [
    { regime: "LEO", latency: "Low", coverage: "Segment", cost: "Many sats", env: "Harsh" },
    { regime: "MEO", latency: "Medium", coverage: "Regional+", cost: "Moderate", env: "Radiation" },
    { regime: "GEO", latency: "High", coverage: "Hemisphere", cost: "Few sats", env: "Stable view" },
    { regime: "L2", latency: "Very high", coverage: "Deep sky", cost: "Single", env: "Cold ops" },
  ];
  return (
    <Wrapper title="Regime Trade Space — Latency vs. Coverage vs. Spacecraft Count">
      <div className="space-y-2">
        {axes.map((a) => (
          <div key={a.regime} className="border border-line rounded-[2px] p-3 bg-card/50">
            <div className="font-mono text-[10px] text-primary mb-1.5">{a.regime}</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[9px] text-muted-foreground/70">
              <span>Latency: <span className="text-foreground/85">{a.latency}</span></span>
              <span>Coverage: <span className="text-foreground/85">{a.coverage}</span></span>
              <span>Fleet size: <span className="text-foreground/85">{a.cost}</span></span>
              <span>Environment: <span className="text-foreground/85">{a.env}</span></span>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

// ── GitOps ────────────────────────────────────────────────────────────────────

function GitopsReconcileLoopDiagram() {
  const steps = [
    { label: "Author", value: "PR + review", sub: "Desired state diff" },
    { label: "Git", value: "Merge", sub: "Versioned truth" },
    { label: "Controller", value: "Sync", sub: "Render + apply" },
    { label: "Cluster", value: "Reconcile", sub: "Observed → desired" },
  ];
  return (
    <Wrapper title="GitOps Control Loop — Event vs. Continuous Reconciliation">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <Box title={s.label} value={s.value} sub={s.sub} accent={i === 1 || i === 2} />
            {i < steps.length - 1 && (
              <div className="flex sm:flex-col items-center justify-center shrink-0 py-1 sm:py-0">
                <span className="font-mono text-[9px] text-muted-foreground/50 hidden sm:inline">
                  {i === 0 ? "merge" : i === 1 ? "pull" : "apply"}
                </span>
                <div className="w-8 sm:w-12 h-px sm:h-px bg-primary/40 rotate-90 sm:rotate-0" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-4 font-mono text-[9px] text-muted-foreground/50 text-center">
        CI validates artifacts and opens tag bumps · Controller enforces config until OutOfSync = 0
      </p>
    </Wrapper>
  );
}

function GitopsPushVsPullDiagram() {
  return (
    <Wrapper title="Deploy Trust Boundary — Push Pipeline vs. Pull Agent">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="border border-line rounded-[2px] p-4 bg-card/50">
          <div className="font-mono text-[10px] text-muted-foreground mb-3 uppercase tracking-[0.12em]">
            Push (classic CI/CD)
          </div>
          <div className="flex flex-col items-center gap-2">
            <Box title="CI runner" value="kubeconfig" sub="Cluster-admin creds" />
            <div className="w-px h-4 bg-primary/30" />
            <Box title="API server" value="kubectl apply" sub="One-shot deploy" accent />
          </div>
        </div>
        <div className="border border-primary/25 rounded-[2px] p-4 bg-primary/5">
          <div className="font-mono text-[10px] text-primary mb-3 uppercase tracking-[0.12em]">
            Pull (GitOps)
          </div>
          <div className="flex flex-col items-center gap-2">
            <Box title="Git" value="main @ sha" sub="No prod creds in CI" accent />
            <div className="w-px h-4 bg-primary/30" />
            <Box title="In-cluster agent" value="Reconcile loop" sub="Scoped RBAC" accent />
          </div>
        </div>
      </div>
      <p className="mt-3 font-mono text-[9px] text-muted-foreground/50 text-center">
        Handoff: CI merges image tag PR · Agent owns everything after Git
      </p>
    </Wrapper>
  );
}

// ── GCP automation ────────────────────────────────────────────────────────────

function GcpAutomationPipelineDiagram() {
  const steps = [
    { label: "Scheduler", value: "Cron tick", sub: "HTTP or Pub/Sub" },
    { label: "Buffer", value: "Tasks / Pub/Sub", sub: "Optional queue" },
    { label: "Worker", value: "Functions / Run", sub: "HTTP handler" },
  ];
  return (
    <Wrapper title="GCP Automation Pipeline — Time → Buffer → Execution">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
        {steps.map((s, i) => (
          <React.Fragment key={s.label}>
            <Box title={s.label} value={s.value} sub={s.sub} accent={i === 0 || i === 2} />
            {i < steps.length - 1 && (
              <div className="flex sm:flex-col items-center justify-center shrink-0 py-1 sm:py-0">
                <span className="font-mono text-[9px] text-muted-foreground/50 hidden sm:inline">
                  {i === 0 ? "enqueue" : "deliver"}
                </span>
                <div className="w-8 sm:w-12 h-px bg-primary/40 rotate-90 sm:rotate-0" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-4 font-mono text-[9px] text-muted-foreground/50 text-center">
        Pattern C: dispatcher enqueues one task per shard · Tasks controls rate and retries
      </p>
    </Wrapper>
  );
}

// ── Public export ─────────────────────────────────────────────────────────────

export function ArticleDiagram({ id }: { id: string }) {
  switch (id) {
    case "mass":     return <MassDiagram />;
    case "power":    return <PowerDiagram />;
    case "link":     return <LinkDiagram />;
    case "pointing": return <PointingDiagram />;
    case "thermal":  return <ThermalDiagram />;
    case "deltav":   return <DeltaVDiagram />;
    case "cascade":          return <CascadeDiagram />;
    case "sensor-fusion":    return <SensorFusionDiagram />;
    case "engagement-timing": return <EngagementTimingDiagram />;
    case "cop-fop-farm":      return <CopFopFarmDiagram />;
    case "cop-fop-states":    return <CopFopStatesDiagram />;
    case "cop-sliding-window": return <CopSlidingWindowDiagram />;
    case "cop-retransmit":       return <CopRetransmitDiagram />;
    case "rf-signal-stack":      return <RfSignalStackDiagram />;
    case "rf-demod-pipeline":    return <RfDemodPipelineDiagram />;
    case "rf-lock-hierarchy":    return <RfLockHierarchyDiagram />;
    case "rf-doppler-leo":       return <RfDopplerLeoDiagram />;
    case "rf-link-margin":       return <RfLinkMarginDiagram />;
    case "eps-system-layers":    return <EpsSystemLayersDiagram />;
    case "eps-orbit-timeline":   return <EpsOrbitTimelineDiagram />;
    case "eps-orbit-energy":     return <EpsOrbitEnergyDiagram />;
    case "eps-uv-stages":        return <EpsUvStagesDiagram />;
    case "eps-shed-tiers":       return <EpsShedTiersDiagram />;
    case "orbit-altitude-regimes": return <OrbitAltitudeRegimesDiagram />;
    case "orbit-leo-environment": return <OrbitLeoEnvironmentDiagram />;
    case "orbit-regime-tradeoffs": return <OrbitRegimeTradeoffsDiagram />;
    case "gitops-reconcile-loop":  return <GitopsReconcileLoopDiagram />;
    case "gitops-push-vs-pull":    return <GitopsPushVsPullDiagram />;
    case "gcp-automation-pipeline": return <GcpAutomationPipelineDiagram />;
    default:                     return null;
  }
}
