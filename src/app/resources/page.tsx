import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { ThemeToggle } from "@/components/ThemeToggle";
import { org, resources } from "@/content/site";

export const metadata: Metadata = {
  title: `Resources — ${org.name}`,
  description:
    "Curated, verified links to the best organizations, public-health guidance, and reports on fungal disease and antifungal resistance.",
};

export default function Resources() {
  return (
    <>
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
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

      <main className="mx-auto max-w-5xl px-6 py-20">
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-fg"
        >
          ← Back to home
        </Link>

        <Reveal>
          <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-iron">
            {resources.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {resources.title}
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {resources.intro}
          </p>
        </Reveal>

        <div className="mt-20 space-y-20">
          {resources.groups.map((group) => (
            <section key={group.title}>
              <Reveal>
                <div className="max-w-2xl border-l-2 border-iron pl-5">
                  <h2 className="text-2xl font-semibold tracking-tight text-fg">
                    {group.title}
                  </h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">
                    {group.blurb}
                  </p>
                </div>
              </Reveal>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {group.links.map((link) => (
                  <Reveal key={link.href + link.name} as="div">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-7 transition-colors hover:border-iron"
                    >
                      <h3 className="flex items-start gap-2 text-lg font-semibold text-fg">
                        <span className="text-balance">{link.name}</span>
                        <span
                          aria-hidden
                          className="mt-1 shrink-0 text-iron transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        >
                          ↗
                        </span>
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted">
                        {link.desc}
                      </p>
                    </a>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Reveal>
          <p className="mt-20 max-w-2xl text-[15px] leading-relaxed text-faint">
            Know a resource that belongs here? {" "}
            <a
              href={`mailto:${org.email}`}
              className="text-iron transition-colors hover:text-fg"
            >
              Tell us
            </a>
            .
          </p>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
