import type { Dossier } from "@/content/dossier";

/**
 * Plain-English translations of the pipeline's structured fields.
 *
 * The dossier JSON speaks in the vocabulary of computational chemistry
 * (N–Fe distance, coordinator identity, ADMET, CYP off-target...). These helpers
 * turn each field into a sentence a non-specialist can read, derived
 * deterministically from the data — no hand-written per-molecule copy, so the
 * plain version can never drift from the numbers it summarizes.
 *
 * Nothing here is a claim that a molecule works. Every translation stays as
 * careful as the source: "untested" is never "proven," and a molecule that
 * reaches the target in an unvalidated way is called unproven, not wrong.
 */

export interface Tone {
  text: string;
  dot: string;
}

const PASS: Tone = { text: "text-pass", dot: "bg-pass" };
const IRON: Tone = { text: "text-iron", dot: "bg-iron" };
const MUTED: Tone = { text: "text-faint", dot: "bg-faint" };

/** "Worth testing" etc. — the priority verdict in everyday words. */
export function priorityPlain(d: Dossier): { label: string; blurb: string; tone: Tone } {
  switch (d.priority) {
    case "A":
      return {
        label: "Strong candidate",
        blurb: "Clears every check we run — a lab should look at this first.",
        tone: PASS,
      };
    case "C":
      return {
        label: "Long shot",
        blurb: "Reaches the target, but enough caveats stack up that it's a lower priority.",
        tone: MUTED,
      };
    default:
      return {
        label: "Worth testing",
        blurb: "A reasonable thing to try, with a caveat or two to keep in mind.",
        tone: IRON,
      };
  }
}

/** How close the molecule reaches the target — the actual ranking. */
export function reachPlain(d: Dossier): { headline: string; blurb: string } {
  const a = d.coordinator.reported_distance;
  const near =
    a < 2.5 ? "reaches right up against it" : a < 2.7 ? "reaches very close" : "reaches close";
  return {
    headline: `#${d.geometry.rank} closest of 16`,
    blurb: `It ${near} — its nearest atom sits ${a.toFixed(2)} ångström from the target (about a quarter of a nanometre, essentially touching). Closer is better, and that distance is the whole ranking.`,
  };
}

/** Does it grab on the way we've proven works? */
export function grabPlain(d: Dossier): { label: string; blurb: string; tone: Tone } {
  switch (d.coordinator.verdict) {
    case "in-mechanism":
      return {
        label: "Grabs on the proven way",
        blurb: "It reaches the target using the same chemistry we've checked and validated.",
        tone: PASS,
      };
    case "dual-mode":
      return {
        label: "Partly the proven way",
        blurb:
          "Its closest reach comes from a part of the molecule we haven't validated, but the validated part still gets in close. So we don't count it as a top pick automatically.",
        tone: IRON,
      };
    default:
      return {
        label: "An unproven way",
        blurb:
          "It reaches the target using chemistry we haven't validated. That isn't wrong — a known working drug does the same thing — it's just unproven, so we don't over-promise on it.",
        tone: MUTED,
      };
  }
}

/** Would it behave like a real drug? */
export function drugLikePlain(d: Dossier): { headline: string; flags: string[] } {
  const dev = d.developability;
  const flags: string[] = [];
  if (dev.ro5_violations === 1) flags.push("one property is slightly outside the usual drug range");
  else if (dev.ro5_violations > 1)
    flags.push(`${dev.ro5_violations} properties are outside the usual drug range`);
  if (dev.n_alerts > 0) flags.push("it carries a chemical group worth double-checking");
  if (dev.pains.length > 0)
    flags.push("its shape can trip false positives in lab assays, so results need care");
  if (dev.herg_risk_factors) flags.push("it has a possible heart-rhythm risk factor");
  return {
    headline: flags.length === 0 ? "Looks drug-like, no red flags." : "Mostly drug-like, with a note:",
    flags,
  };
}

/** Any risk of hitting the wrong target in people? */
export function sideEffectPlain(d: Dossier): string {
  const n = d.selectivity.n_high;
  if (n > 0) {
    return `It could also act on ${n} human enzyme${n === 1 ? "" : "s"} that clear medicines from the body — a possible side-effect or drug-interaction risk a lab would check.`;
  }
  return "Nothing obvious flagging it as a risk to human enzymes.";
}

/** Has anyone tested it before? */
export function testedPlain(d: Dossier): string {
  switch (d.precedent.verdict) {
    case "tested-active":
      return "It has shown activity against this kind of target in earlier lab tests.";
    case "record-inconclusive":
      return "There are some earlier test records, but they're inconclusive.";
    default:
      return "No record that anyone has tested it against this fungal target — genuinely new ground. (New isn't the same as proven, of course.)";
  }
}

/** How hard is it to get or make? */
export function makePlain(d: Dossier): string {
  if (d.synthesis.availability === "catalogued-drug")
    return "It's already an approved or catalogued drug, so it's easy to get hold of.";
  const band = d.synthesis.sa_band;
  if (band === "easy") return "Chemists should find it easy to make or source.";
  if (band === "moderate") return "It would take a moderate amount of effort to make.";
  return "It looks difficult to make.";
}

/** One-line summary for the collapsed card: reach + how it grabs on. */
export function summaryLine(d: Dossier): string {
  return `${reachPlain(d).headline} · ${grabPlain(d).label.toLowerCase()}`;
}
