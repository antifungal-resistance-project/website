import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CandidateExplorer } from "@/components/CandidateExplorer";
import { org } from "@/content/site";
import { snapshot, tally } from "@/content/dossier";

// Gated: this route is deployed but deliberately kept out of search indexes and
// unlinked from the main nav. It is an internal / hand-out artifact while the
// project is still in build-first mode, not a public launch. Flip to public by
// removing this robots block and linking it from the nav.
export const metadata: Metadata = {
  title: `Candidates worth testing — ${org.name}`,
  robots: { index: false, follow: false },
};

function fmtDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function CandidatesPage() {
  return (
    <>
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/#top" className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-mono text-sm font-semibold tracking-tight">{org.short}</span>
            <span className="hidden text-sm text-muted sm:inline">{org.name}</span>
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <Link href="/" className="text-sm text-muted transition-colors hover:text-fg">
          ← Back to home
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-iron">
          What our software found
        </p>
        <h1 className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          16 molecules worth testing next
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          Drug-resistant fungal infections are getting harder to treat. Our software read through a
          library of existing medicines and picked out these sixteen as the most promising to try
          against the fungus. None have been tested in a lab yet —{" "}
          <span className="font-medium text-fg">
            think of this as a ranked to-do list for scientists, not a list of cures.
          </span>
        </p>

        {/* How the ranking works — the one idea, in plain words. */}
        <div className="mt-10 rounded-xl border border-border bg-surface p-6 sm:p-7">
          <h2 className="text-lg font-semibold text-fg">How the ranking works</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Today&rsquo;s antifungal drugs work a bit like a key in a lock. They push one specific
            atom &mdash; a nitrogen &mdash; right up against an iron atom buried at the centre of an
            enzyme the fungus needs to survive. Block that spot and the fungus can&rsquo;t build its
            cell wall.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            Most software guesses at a molecule&rsquo;s strength with a black-box score. Ours does
            something simpler and more honest:{" "}
            <span className="font-medium text-fg">
              it measures how close each molecule gets its nitrogen to that iron.
            </span>{" "}
            Closer is better &mdash; and that distance is the whole ranking. It&rsquo;s good at
            spotting promising new shapes, not at telling a great drug from a merely okay one.
          </p>
        </div>

        {/* The honest caveat, in plain words, as prominent as the list. */}
        <div className="mt-6 rounded-xl border border-iron/30 bg-iron/5 p-6 sm:p-7">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-iron">Read this first</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            <span className="font-semibold text-fg">
              Nothing here has been tested against a living fungus by us.
            </span>{" "}
            Every card below is a hypothesis &mdash; a suggestion for a lab to try &mdash; not a
            result. Read the order as &ldquo;worth a look,&rdquo; not &ldquo;this one&rsquo;s the
            winner.&rdquo;
          </p>
        </div>

        {/* Plain tally. */}
        <p className="mt-8 text-[15px] text-muted">
          Of the sixteen:{" "}
          <span className="font-semibold text-pass">{tally.A} strong picks</span>,{" "}
          <span className="font-semibold text-iron">{tally.B} worth testing</span>, and{" "}
          <span className="font-semibold text-faint">{tally.C} long shots</span>. Tap any molecule
          to see why.
        </p>

        <div className="mt-8">
          <CandidateExplorer />
        </div>

        <p className="mt-12 text-sm leading-relaxed text-faint">
          Put together automatically on {fmtDate(snapshot.generated)} from a locked, unmodified
          recipe (nothing was hand-tuned to flatter the results). Every number behind these
          summaries, plus the full lab write-ups, lives in the{" "}
          <a
            href={org.github}
            className="text-iron underline underline-offset-2 transition-colors hover:text-fg"
          >
            open code repository
          </a>
          .
        </p>
      </main>

      <Footer />
    </>
  );
}
