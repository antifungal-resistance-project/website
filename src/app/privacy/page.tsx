import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { org } from "@/content/site";

export const metadata: Metadata = {
  title: `Privacy Policy — ${org.name}`,
  description: `How ${org.name} handles the limited data collected by this website.`,
};

export default function Privacy() {
  return (
    <DocPage title="Privacy Policy" updated="August 13, 2026">
      <p>
        {org.name}{" "}
        (&ldquo;we,&rdquo; &ldquo;us&rdquo;) runs this website to
        share our mission and our open research. We collect as little as
        possible, and we do not sell or rent personal information to anyone.
        This page explains what that means in practice.
      </p>

      <h2>What we collect</h2>
      <p>
        This is a static informational site. It has no accounts, no logins, and
        no tracking or advertising cookies. We collect information in only two
        ways:
      </p>
      <ul>
        <li>
          <strong>Basic server logs.</strong> Our hosting provider records
          standard technical data — such as IP address, browser type, and the
          pages requested — to serve the site and keep it secure. This is
          typical of any website and is retained only for a short period.
        </li>
        <li>
          <strong>Messages you send us.</strong> If you email us, we receive
          whatever you choose to share (your address and the content of your
          message) so we can reply.
        </li>
      </ul>

      <h2>Theme preference</h2>
      <p>
        If you switch between light and dark mode, we store that single
        preference in your browser&rsquo;s local storage so the site remembers
        it on your next visit. It never leaves your device and we cannot see it.
      </p>

      <h2>How we use information</h2>
      <p>
        We use the limited information above only to operate and secure the
        site and to respond to messages you send us. We do not use it to build
        advertising profiles or to track you across other sites.
      </p>

      <h2>Service providers</h2>
      <p>
        The site is hosted on Vercel, which processes the server logs described
        above on our behalf as part of delivering the site. We do not add
        third-party analytics or advertising trackers.
      </p>

      <h2>Your choices</h2>
      <p>
        You can clear your browser&rsquo;s local storage at any time to remove
        the theme preference. To ask what correspondence we hold about you, or
        to have it deleted, email us at the address below.
      </p>

      <h2>Children</h2>
      <p>
        This site is intended for a general and professional audience and is
        not directed at children under 13. We do not knowingly collect
        information from children.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as the site evolves. When we do, we will
        revise the &ldquo;last updated&rdquo; date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy? Email us at{" "}
        <a href={`mailto:${org.email}`}>{org.email}</a>.
      </p>
    </DocPage>
  );
}
