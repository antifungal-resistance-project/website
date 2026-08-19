"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useRef, useState } from "react";

/*
 * The /resistance scrollytelling explainer.
 *
 * Three scroll-pinned scenes, one per resistance mechanism. Each scene follows
 * the same contract as the homepage HemeApproach: a single scroll-progress
 * value p ∈ [0,1] drives an SVG, captions crossfade as p passes their marks,
 * and reduced-motion users get the resolved end state with no pin. The captions
 * live here, next to the geometry they describe.
 */

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp01(t);
}
// eased 0→1 as p crosses [a,b]
function ramp(p: number, a: number, b: number) {
  return clamp01((p - a) / (b - a));
}

function hexPath(cx: number, cy: number, r: number, rot = 0) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6 + rot;
    pts.push(
      `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`,
    );
  }
  return `M${pts.join("L")}Z`;
}

type Caption = { at: number; title: string; body: string };

function activeCaption(p: number, captions: Caption[]) {
  let idx = 0;
  for (let i = 0; i < captions.length; i++) if (p >= captions[i].at) idx = i;
  return idx;
}

/* ---------- generic scroll scene ---------- */

function Scene({
  eyebrow,
  captions,
  height = "300vh",
  render,
}: {
  eyebrow: string;
  captions: Caption[];
  height?: string;
  render: (p: number) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [p, setP] = useState(reduce ? 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!reduce) setP(v);
  });

  // Hold the visual at the ends so the reader can read the first/last caption.
  const inner = clamp01((p - 0.12) / (0.88 - 0.12));
  const activeIdx = activeCaption(p, captions);

  return (
    <section ref={ref} className="relative border-t border-border" style={{ height }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="glow-iron pointer-events-none absolute inset-0" />
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-iron">
              {eyebrow}
            </p>
            <div className="relative mt-4 min-h-[200px]">
              {captions.map((c, i) => (
                <div
                  key={c.title}
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    opacity: i === activeIdx ? 1 : 0,
                    transform: `translateY(${(i - activeIdx) * 12}px)`,
                    pointerEvents: i === activeIdx ? "auto" : "none",
                  }}
                  aria-hidden={i !== activeIdx}
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <svg
              viewBox="0 0 400 340"
              className="mx-auto w-full max-w-md"
              role="img"
              aria-label={eyebrow}
            >
              {render(inner)}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- scene 1: target-site mutation ---------- */

const FE = { x: 210, y: 180 };
// approach ray for the drug's coordinating nitrogen
const RAY = { x: 116, y: -104 };

function MutationVisual(p: number) {
  // p<0.45 bound → p>0.6 pushed out
  const eject = ramp(p, 0.55, 1);
  const t = lerp(0.34, 1.15, eject); // ray parameter: 0.34 bound, 1.15 far
  const nx = FE.x + RAY.x * t;
  const ny = FE.y + RAY.y * t;
  const bond = 1 - ramp(p, 0.5, 0.72);
  const mut = ramp(p, 0.32, 0.55); // mutation marker + pocket bulge
  const ringRot = eject * 0.9;

  // pocket wall arc that bulges inward as the mutation appears
  const bulge = 8 * mut;
  const wall = `M ${FE.x - 78} ${FE.y - 6} Q ${FE.x - 30} ${FE.y - 70 + bulge} ${FE.x + 40} ${FE.y - 74 + bulge}`;

  return (
    <>
      {/* iron glow */}
      <circle cx={FE.x} cy={FE.y} r={44} fill="var(--color-iron)" opacity={0.12} />
      {/* porphyrin */}
      <circle cx={FE.x} cy={FE.y} r={62} fill="none" stroke="var(--color-border)" strokeWidth={2} />
      {[0, 90, 180, 270].map((deg) => {
        const a = (deg * Math.PI) / 180;
        const px = FE.x + 24 * Math.cos(a);
        const py = FE.y + 24 * Math.sin(a);
        const ox = FE.x + 62 * Math.cos(a);
        const oy = FE.y + 62 * Math.sin(a);
        return (
          <g key={deg}>
            <line x1={FE.x} y1={FE.y} x2={ox} y2={oy} stroke="var(--color-faint)" strokeWidth={1.5} />
            <circle cx={px} cy={py} r={4.5} fill="var(--color-nitrogen)" opacity={0.5} />
          </g>
        );
      })}
      {/* pocket wall — shifts as the residue mutates */}
      <path d={wall} fill="none" stroke="var(--color-fail)" strokeWidth={2} opacity={0.35 + 0.5 * mut} />
      {mut > 0.15 && (
        <g opacity={mut}>
          <circle cx={FE.x - 30} cy={FE.y - 62 + bulge} r={6} fill="var(--color-fail)" />
          <text x={FE.x - 30} y={FE.y - 78 + bulge} textAnchor="middle" className="font-mono" fontSize={11} fill="var(--color-fail)" fontWeight={700}>
            Y132F
          </text>
        </g>
      )}
      {/* iron */}
      <circle cx={FE.x} cy={FE.y} r={11} fill="var(--color-iron)" />
      <text x={FE.x} y={FE.y + 4} textAnchor="middle" className="font-mono" fontSize={10} fill="var(--color-bg)" fontWeight={700}>
        Fe
      </text>
      {/* coordinating bond fades as the drug loses its grip */}
      <line x1={FE.x} y1={FE.y} x2={nx} y2={ny} stroke="var(--color-pass)" strokeWidth={2} strokeDasharray="4 4" opacity={bond} />
      {/* drug molecule */}
      <g>
        <path d={hexPath(nx + 30, ny - 26, 22, ringRot)} fill="none" stroke="var(--color-nitrogen)" strokeWidth={2.5} opacity={0.9} />
        <line x1={nx} y1={ny} x2={nx + 18} y2={ny - 15} stroke="var(--color-nitrogen)" strokeWidth={2} />
        <circle cx={nx} cy={ny} r={8} fill="var(--color-nitrogen)" />
        <text x={nx} y={ny + 3} textAnchor="middle" className="font-mono" fontSize={9} fill="var(--color-bg)" fontWeight={700}>
          N
        </text>
      </g>
    </>
  );
}

/* ---------- scene 2: efflux pumps ---------- */

function EffluxVisual(p: number) {
  const MEM_Y = 150;
  const pumpCount = Math.round(lerp(1, 4, ramp(p, 0.1, 0.7)));
  const pumps = Array.from({ length: pumpCount }, (_, i) => 60 + (i * 280) / Math.max(1, pumpCount - 0.001) + 40);

  // four drug molecules, each ejected on a staggered schedule
  const drugs = [0, 1, 2, 3].map((i) => {
    const start = 0.15 + i * 0.16;
    const out = ramp(p, start, start + 0.3);
    const px = 90 + i * 70;
    const insideY = 250 - (i % 2) * 30;
    const y = lerp(insideY, 60, out); // travels up and out
    const x = lerp(px, pumps[i % pumps.length], Math.min(1, out * 1.4));
    const opacity = out > 0.9 ? clamp01(1 - (out - 0.9) * 6) : 1;
    return { x, y, opacity, out };
  });

  return (
    <>
      {/* cytoplasm wash below the membrane */}
      <rect x={0} y={MEM_Y} width={400} height={340 - MEM_Y} fill="var(--color-iron)" opacity={0.05} />
      {/* lipid bilayer */}
      <line x1={0} y1={MEM_Y} x2={400} y2={MEM_Y} stroke="var(--color-border)" strokeWidth={2} />
      <line x1={0} y1={MEM_Y + 14} x2={400} y2={MEM_Y + 14} stroke="var(--color-border)" strokeWidth={2} />
      <text x={12} y={MEM_Y - 10} className="font-mono" fontSize={10} fill="var(--color-faint)">
        outside
      </text>
      <text x={12} y={MEM_Y + 34} className="font-mono" fontSize={10} fill="var(--color-faint)">
        inside the cell
      </text>
      {/* pumps embedded in the membrane */}
      {pumps.map((x, i) => (
        <g key={i}>
          <rect x={x - 13} y={MEM_Y - 6} width={26} height={26} rx={5} fill="var(--color-surface-2)" stroke="var(--color-pass)" strokeWidth={2} />
          <path d={`M ${x} ${MEM_Y + 16} L ${x} ${MEM_Y - 2} M ${x - 5} ${MEM_Y + 3} L ${x} ${MEM_Y - 2} L ${x + 5} ${MEM_Y + 3}`} fill="none" stroke="var(--color-pass)" strokeWidth={2} />
        </g>
      ))}
      {/* drug molecules being pumped out */}
      {drugs.map((d, i) => (
        <g key={i} opacity={d.opacity}>
          <path d={hexPath(d.x, d.y, 13)} fill="none" stroke="var(--color-nitrogen)" strokeWidth={2} />
          <circle cx={d.x} cy={d.y} r={4} fill="var(--color-nitrogen)" />
        </g>
      ))}
    </>
  );
}

/* ---------- scene 3: target overexpression ---------- */

function OverexpressionVisual(p: number) {
  const total = Math.round(lerp(3, 12, ramp(p, 0.15, 0.8)));
  const drugCount = 3; // the amount of drug stays fixed
  const cols = 4;
  const cells = Array.from({ length: total }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return {
      x: 80 + col * 82,
      y: 70 + row * 88,
      blocked: i < drugCount,
      appear: ramp(p, 0.15 + i * 0.05, 0.35 + i * 0.05),
    };
  });

  return (
    <>
      {cells.map((c, i) => (
        <g key={i} opacity={c.appear} transform={`translate(${c.x} ${c.y})`}>
          {/* enzyme = small heme */}
          <circle r={20} fill="none" stroke="var(--color-border)" strokeWidth={1.5} />
          <circle r={7} fill={c.blocked ? "var(--color-iron)" : "var(--color-pass)"} />
          {c.blocked ? (
            // drug plugged in
            <>
              <path d={hexPath(14, -14, 9)} fill="none" stroke="var(--color-nitrogen)" strokeWidth={1.8} />
              <line x1={0} y1={0} x2={9} y2={-9} stroke="var(--color-nitrogen)" strokeWidth={1.6} />
            </>
          ) : (
            // active: producing ergosterol
            <text x={0} y={34} textAnchor="middle" className="font-mono" fontSize={9} fill="var(--color-pass)" fontWeight={700}>
              active
            </text>
          )}
        </g>
      ))}
    </>
  );
}

/* ---------- captions ---------- */

const MUTATION: Caption[] = [
  {
    at: 0,
    title: "1. Change the target's shape",
    body: "Start with the drug working normally. Its nitrogen reaches the iron, the enzyme is frozen, and the fungus cannot make ergosterol.",
  },
  {
    at: 0.4,
    title: "A single amino acid changes",
    body: "A mutation in the ERG11 gene, such as the well-known Y132F, swaps one amino acid lining the pocket. The surface the drug relied on now has a different shape.",
  },
  {
    at: 0.72,
    title: "The drug no longer fits",
    body: "The drug can no longer place its nitrogen on the iron. The bond does not form, the enzyme keeps working, and the fungus survives a dose that once killed it.",
  },
];

const EFFLUX: Caption[] = [
  {
    at: 0,
    title: "2. Pump the drug out",
    body: "The drug has to build up inside the cell to work. Fungal membranes carry pumps: proteins that move unwanted molecules back outside.",
  },
  {
    at: 0.45,
    title: "Add more pumps",
    body: "Resistant strains produce far more of these efflux pumps, such as CDR1 and MDR1, adding copy after copy to the membrane.",
  },
  {
    at: 0.75,
    title: "Cleared before it can act",
    body: "The drug is removed faster than it accumulates. It never reaches an effective concentration, so the enzyme is barely affected.",
  },
];

const OVEREXPRESSION: Caption[] = [
  {
    at: 0,
    title: "3. Make more of the target",
    body: "A dose contains only so much drug. Here it blocks the few enzyme copies the fungus normally makes.",
  },
  {
    at: 0.4,
    title: "Flood the cell with enzyme",
    body: "By raising ERG11 expression, the fungus produces far more Cyp51 than before, more copies than the fixed amount of drug can cover.",
  },
  {
    at: 0.75,
    title: "Enough left to survive",
    body: "The uncovered enzymes keep making ergosterol. The membrane still forms, and the fungus keeps growing during treatment.",
  },
];

export function ResistanceExplainer() {
  return (
    <>
      <Scene eyebrow="Mechanism 1 · target-site mutation" captions={MUTATION} render={MutationVisual} />
      <Scene eyebrow="Mechanism 2 · efflux pumps" captions={EFFLUX} render={EffluxVisual} />
      <Scene eyebrow="Mechanism 3 · target overexpression" captions={OVEREXPRESSION} render={OverexpressionVisual} />
    </>
  );
}
