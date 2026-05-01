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

// ── Kill Chain Timing ─────────────────────────────────────────────────────────

function KillChainTimingDiagram() {
  const groups = [
    { name: "Group 1", detectId: 38.9, engage: 58.3, color: "bg-primary/30" },
    { name: "Group 2", detectId: 38.9, engage: 23.3, color: "bg-primary/50" },
    { name: "Group 3", detectId: 51.8, engage: 32.4, color: "bg-primary/70" },
  ];
  const maxVal = 100;

  return (
    <Wrapper title="Kill Chain Timing Budget — Seconds Available per Phase per Group">
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
    case "killchain-timing": return <KillChainTimingDiagram />;
    default:                 return null;
  }
}
