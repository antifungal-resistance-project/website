import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ResistanceExplainer } from "@/components/ResistanceExplainer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { explainer, org } from "@/content/site";

export const metadata: Metadata = {
  title: `Antifungal resistance, explained — ${org.name}`,
  description:
    "An interactive, scroll-driven explainer of how fungi become resistant to antifungal drugs: target-site mutation, efflux pumps, and target overexpression.",
};

export default function ResistancePage() {
  return (
    <>
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/#top" className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="font-mono text-sm font-semibold tracking-tight">
              {org.short}
            </span>
            <span className="hidden text-sm text-muted sm:inline">
              {org.name}
            </span>
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <main>
        {/* Intro */}
        <section className="mx-auto max-w-4xl px-6 pt-20 pb-8">
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-fg"
          >
            ← Back to home
          </Link>
          <Reveal>
            <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-iron">
              {explainer.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              {explainer.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {explainer.intro}
            </p>
          </Reveal>
        </section>

        {/* The baseline mechanism, in prose */}
        <section className="border-t border-border py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <h2 className="max-w-2xl border-l-2 border-iron pl-6 text-2xl font-semibold leading-snug tracking-tight text-fg sm:text-3xl">
                {explainer.lead.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
                {explainer.lead.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* Mechanisms intro */}
        <section className="border-t border-border py-24">
          <div className="mx-auto max-w-4xl px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-iron">
                {explainer.mechanismsIntro.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {explainer.mechanismsIntro.title}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                {explainer.mechanismsIntro.body}
              </p>
            </Reveal>
          </div>
        </section>

        {/* The three scroll-driven scenes */}
        <ResistanceExplainer />

        {/* Why it spreads */}
        <section className="border-t border-border py-28">
          <div className="mx-auto max-w-6xl px-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-wider text-iron">
                {explainer.spread.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {explainer.spread.title}
              </h2>
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {explainer.spread.points.map((pt) => (
                <Reveal key={pt.k} as="div">
                  <div className="h-full rounded-xl border border-border bg-surface p-7">
                    <h3 className="text-lg font-semibold text-fg">{pt.k}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted">
                      {pt.v}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Close — tie back to the mission */}
        <section className="border-t border-border bg-surface-2 py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {explainer.close.title}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {explainer.close.body}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link
                  href="/#work"
                  className="rounded-full bg-iron px-6 py-3 text-sm font-semibold text-bg transition-transform hover:-translate-y-0.5"
                >
                  See how we test for it
                </Link>
                <Link
                  href="/resources"
                  className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-fg transition-colors hover:border-iron hover:text-iron"
                >
                  Explore the resources
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
