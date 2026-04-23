import { useEffect, useRef } from "react";

const NODES = [
  { id: "n1", x: 18, y: 28, r: 4, label: "INGEST" },
  { id: "n2", x: 42, y: 18, r: 5, label: "ROUTE" },
  { id: "n3", x: 70, y: 30, r: 4, label: "MODEL" },
  { id: "n4", x: 86, y: 58, r: 5, label: "OPS" },
  { id: "n5", x: 58, y: 70, r: 6, label: "CORE" },
  { id: "n6", x: 28, y: 62, r: 4, label: "EDGE" },
  { id: "n7", x: 12, y: 80, r: 3, label: "OBS" },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [4, 5], [5, 0], [5, 1], [5, 6],
  [6, 0], [1, 4], [2, 4],
];

const SystemsHero = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) return;

    const svg = svgRef.current;
    if (!svg) return;

    const pulses = svg.querySelectorAll<SVGCircleElement>("[data-pulse]");
    const signals = svg.querySelectorAll<SVGCircleElement>("[data-signal]");
    const paths = svg.querySelectorAll<SVGPathElement>("[data-edge]");

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;

      pulses.forEach((p, i) => {
        const phase = (t * 0.6 + i * 0.4) % 1;
        const scale = 1 + phase * 2.5;
        const opacity = (1 - phase) * 0.5;
        p.setAttribute("transform", `scale(${scale})`);
        p.setAttribute("opacity", String(opacity));
      });

      signals.forEach((s, i) => {
        const path = paths[i % paths.length];
        if (!path) return;
        const len = path.getTotalLength();
        const phase = ((t * 0.18 + i * 0.13) % 1);
        const pt = path.getPointAtLength(len * phase);
        s.setAttribute("cx", String(pt.x));
        s.setAttribute("cy", String(pt.y));
        s.setAttribute("opacity", String(0.9 - Math.abs(phase - 0.5) * 0.6));
      });

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--primary) / 0.08)" />
          <stop offset="100%" stopColor="hsl(var(--background) / 0)" />
        </radialGradient>
        <pattern id="grid" width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke="hsl(var(--line))" strokeWidth="0.08" />
        </pattern>
      </defs>

      <rect width="100" height="100" fill="url(#grid)" opacity="0.4" />
      <rect width="100" height="100" fill="url(#bgGlow)" />

      {/* Edges */}
      {EDGES.map(([a, b], i) => {
        const A = NODES[a], B = NODES[b];
        const mx = (A.x + B.x) / 2 + (B.y - A.y) * 0.12;
        const my = (A.y + B.y) / 2 - (B.x - A.x) * 0.12;
        const d = `M ${A.x} ${A.y} Q ${mx} ${my} ${B.x} ${B.y}`;
        return (
          <path
            key={i}
            data-edge
            d={d}
            fill="none"
            stroke="hsl(var(--primary) / 0.25)"
            strokeWidth="0.18"
            strokeLinecap="round"
          />
        );
      })}

      {/* Signals traveling along edges */}
      {EDGES.map((_, i) => (
        <circle
          key={`sig-${i}`}
          data-signal
          r="0.6"
          fill="hsl(var(--primary))"
          opacity="0"
        />
      ))}

      {/* Nodes */}
      {NODES.map((n) => (
        <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
          <circle
            data-pulse
            r={n.r}
            fill="none"
            stroke="hsl(var(--primary) / 0.35)"
            strokeWidth="0.2"
          />
          <circle r={n.r * 0.45} fill="hsl(var(--primary) / 0.9)" />
          <circle r={n.r} fill="none" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.15" />
        </g>
      ))}
    </svg>
  );
};

export default SystemsHero;
