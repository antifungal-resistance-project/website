import Link from "next/link";
import { org } from "@/content/site";
import { Logo } from "@/components/Logo";

/**
 * Site footer. Groups the mission mark with the practical links a legitimate
 * nonprofit is expected to carry — how to reach us, the legal pages, and the
 * source. Links use next/link for the internal routes and plain anchors for
 * the mailto / GitHub destinations.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-sm">
            <Link href="/#top" className="flex items-center gap-2.5">
              <Logo className="h-7 w-7" />
              <span className="font-mono text-sm font-semibold tracking-tight">
                {org.short}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {org.mission}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-14 gap-y-8 sm:grid-cols-3">
            <FooterCol title="Project">
              <FooterLink href="/#mission">Mission</FooterLink>
              <FooterLink href="/#approach">What we do</FooterLink>
              <FooterLink href="/#work">Our work</FooterLink>
              <FooterLink href="/resistance">Resistance 101</FooterLink>
              <FooterLink href="/resources">Resources</FooterLink>
            </FooterCol>
            <FooterCol title="Connect">
              <FooterLink href="/#contact">Contact us</FooterLink>
              <ExternalLink href={`mailto:${org.email}`}>Email</ExternalLink>
              <ExternalLink href={org.github}>GitHub</ExternalLink>
            </FooterCol>
            <FooterCol title="Legal">
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Use</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-faint">
          © {year} {org.legal}. Open science, in the open.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm text-muted transition-colors hover:text-fg"
      >
        {children}
      </Link>
    </li>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        className="text-sm text-muted transition-colors hover:text-fg"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    </li>
  );
}
