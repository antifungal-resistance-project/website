"use client";

import { useState } from "react";
import { dossiers, type Dossier } from "@/content/dossier";
import {
  drugLikePlain,
  grabPlain,
  makePlain,
  priorityPlain,
  reachPlain,
  sideEffectPlain,
  summaryLine,
  testedPlain,
} from "@/content/plain";

/** A short plain-English point: a coloured dot + a sentence. */
function Point({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
      <span className="text-[15px] leading-relaxed text-muted">{children}</span>
    </li>
  );
}

/** One raw field inside the technical fold. */
function Raw({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1">
      <span className="text-[12px] text-faint">{label}</span>
      <span className="text-right font-mono text-[12px] text-muted">{value}</span>
    </div>
  );
}

function CandidateCard({ d }: { d: Dossier }) {
  const [open, setOpen] = useState(false);

  const priority = priorityPlain(d);
  const reach = reachPlain(d);
  const grab = grabPlain(d);
  const drug = drugLikePlain(d);

  return (
    <li className="overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-iron/40">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-5 py-4 text-left"
      >
        <span className="w-6 shrink-0 font-mono text-sm text-faint">{d.geometry.rank}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-semibold text-fg">{d.name}</span>
          <span className="mt-0.5 block text-[13px] text-muted">{summaryLine(d)}</span>
        </span>
        <span className={`hidden shrink-0 items-center gap-2 sm:flex ${priority.tone.text}`}>
          <span className={`h-2 w-2 rounded-full ${priority.tone.dot}`} />
          <span className="text-[13px] font-semibold">{priority.label}</span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-faint transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-border px-5 pb-6 pt-5">
          {/* Verdict line, spelled out */}
          <p className="mb-5 flex flex-wrap items-center gap-x-2 text-[15px] text-muted">
            <span className={`font-semibold ${priority.tone.text}`}>{priority.label}.</span>
            {priority.blurb}
          </p>

          <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold text-fg">How close it reaches the target</h4>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{reach.blurb}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-fg">Does it grab on the right way?</h4>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{grab.blurb}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3">
            <Point dot={drug.flags.length === 0 ? "bg-pass" : "bg-iron"}>
              <span className="font-medium text-fg">Would it behave like a real drug? </span>
              {drug.headline}
              {drug.flags.length > 0 && ` ${drug.flags.join("; ")}.`}
            </Point>
            <Point dot={d.selectivity.n_high > 0 ? "bg-iron" : "bg-pass"}>
              <span className="font-medium text-fg">Any risk to the wrong targets in people? </span>
              {sideEffectPlain(d)}
            </Point>
            <Point dot="bg-faint">
              <span className="font-medium text-fg">Tested before? </span>
              {testedPlain(d)}
            </Point>
            <Point dot="bg-faint">
              <span className="font-medium text-fg">Easy to make? </span>
              {makePlain(d)}
            </Point>
          </ul>

          {/* Everything technical, tucked away for those who want it. */}
          <details className="group mt-6 border-t border-border/60 pt-4">
            <summary className="cursor-pointer list-none text-[13px] font-medium text-faint transition-colors hover:text-muted">
              <span className="group-open:hidden">▸ Show the technical details</span>
              <span className="hidden group-open:inline">▾ Hide the technical details</span>
            </summary>
            <div className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-faint">
                  Geometry &amp; coordinator
                </p>
                <Raw label="N–Fe distance" value={`${d.coordinator.reported_distance.toFixed(3)} Å`} />
                <Raw label="Geometry rank" value={`#${d.geometry.rank}`} />
                <Raw label="Vina score" value={`${d.geometry.best_score.toFixed(2)} kcal/mol`} />
                <Raw label="Poses at iron" value={`${d.geometry.n_passing}/${d.geometry.n_poses}`} />
                <Raw label="Coordinator" value={`${d.coordinator.reported_kind} (${d.coordinator.verdict})`} />
                <Raw label="Aromatic-N dist." value={`${d.coordinator.aromatic_distance.toFixed(2)} Å`} />
              </div>
              <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-faint">
                  Developability, selectivity &amp; more
                </p>
                <Raw label="MW / cLogP / TPSA" value={`${d.developability.mw.toFixed(0)} / ${d.developability.clogp.toFixed(1)} / ${d.developability.tpsa.toFixed(0)}`} />
                <Raw label="Ro5 violations" value={d.developability.ro5_violations} />
                <Raw
                  label="Structural alerts"
                  value={d.developability.structural_alerts.map((a) => a[1]).join(", ") || "none"}
                />
                <Raw label="CYP off-target (high)" value={d.selectivity.flags || "none"} />
                <Raw label="Precedent" value={`${d.precedent.verdict} (${d.precedent.n_off_target})`} />
                <Raw label="Synth (SA)" value={`${d.synthesis.sa_band} / ${d.synthesis.sa_score.toFixed(2)}`} />
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-faint">
                Pipeline rationale
              </span>
              <br />
              {d.selection_hypothesis}
            </p>
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-faint">
              SMILES {d.smiles} · InChIKey {d.inchikey}
            </p>
          </details>
        </div>
      )}
    </li>
  );
}

export function CandidateExplorer() {
  return (
    <ol className="space-y-2.5">
      {dossiers.map((d) => (
        <CandidateCard key={d.inchikey} d={d} />
      ))}
    </ol>
  );
}
