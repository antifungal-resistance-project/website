import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { org } from "@/content/site";

/**
 * Layout for standalone document pages (privacy, terms). A slim header links
 * home and carries the theme toggle so these pages match the palette of the
 * main site; the body is a readable prose column; the shared Footer closes it.
 */
export function DocPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
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

      <main className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/"
          className="text-sm text-muted transition-colors hover:text-fg"
        >
          ← Back to home
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-faint">Last updated {updated}</p>
        <div className="doc mt-12">{children}</div>
      </main>

      <Footer />
    </>
  );
}
