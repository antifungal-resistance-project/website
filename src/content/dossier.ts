import raw from "./dossiers.json";

/**
 * Types for one fused per-candidate dossier, as emitted by the OpenAFR pipeline
 * (`openafr/dossier.py` -> `work/candidates/dossiers.json`). The JSON here is a
 * committed snapshot; to refresh it, re-run the dossier generator in the openafr
 * repo and copy the file back. The `provenance` block on each record stamps the
 * exact protocol hash and pipeline version the snapshot came from.
 *
 * Nothing here is a hit. A/B/C is an orthogonal priority annotation on top of the
 * validated N-Fe geometry ranking — it never re-orders candidates.
 */

export type Priority = "A" | "B" | "C";
export type CoordinatorVerdict = "in-mechanism" | "dual-mode" | "out-of-mechanism";

export interface Dossier {
  name: string;
  smiles: string;
  inchikey: string;
  priority: Priority;
  priority_reasons: string[];
  selection_hypothesis: string;
  geometry: {
    rank: number;
    best_fe: number;
    best_score: number;
    n_passing: number;
    n_poses: number;
  };
  coordinator: {
    aromatic_distance: number;
    reported_distance: number;
    reported_kind: string;
    in_mechanism: boolean;
    verdict: CoordinatorVerdict;
  };
  developability: {
    mw: number;
    clogp: number;
    tpsa: number;
    esol_logs: number;
    ro5_violations: number;
    veber_ok: boolean;
    herg_risk_factors: boolean;
    n_alerts: number;
    structural_alerts: [string, string][];
    pains: string[];
  };
  precedent: {
    verdict: string;
    n_off_target: number;
    nearest_tested: string | null;
    phenotypic: string | null;
  };
  selectivity: {
    azole_warhead: string | null;
    flags: string;
    n_high: number;
    n_moderate: number;
    flagged_isoforms: string[];
  };
  synthesis: {
    availability: string;
    sa_band: string;
    sa_score: number;
    pubchem_cid: number | null;
  };
  provenance: {
    generated_utc: string;
    openafr_version: string;
    protocol_sha256: string;
    protocol_unmodified: boolean;
    precedent_source: string;
    receptor: string;
  };
}

export const dossiers: Dossier[] = (raw as Dossier[])
  .slice()
  .sort((a, b) => a.geometry.rank - b.geometry.rank);

export const tally = dossiers.reduce(
  (acc, d) => {
    acc[d.priority] += 1;
    return acc;
  },
  { A: 0, B: 0, C: 0 } as Record<Priority, number>,
);

/** Snapshot metadata, read off the first record's provenance stamp. */
export const snapshot = {
  generated: dossiers[0]?.provenance.generated_utc ?? "",
  version: dossiers[0]?.provenance.openafr_version ?? "",
  protocolUnmodified: dossiers[0]?.provenance.protocol_unmodified ?? false,
  receptor: dossiers[0]?.provenance.receptor ?? "",
};
