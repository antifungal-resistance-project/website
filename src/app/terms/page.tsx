import type { Metadata } from "next";
import { DocPage } from "@/components/DocPage";
import { org, project } from "@/content/site";

export const metadata: Metadata = {
  title: `Terms of Use — ${org.name}`,
  description: `The terms that govern use of the ${org.name} website and content.`,
};

export default function Terms() {
  return (
    <DocPage title="Terms of Use" updated="August 13, 2026">
      <p>
        These terms govern your use of the {org.name} website. By using the
        site, you agree to them. If you do not agree, please do not use the
        site.
      </p>

      <h2>About this site</h2>
      <p>
        {org.name} is a nonprofit research effort. This website is
        informational — it describes our mission and our open work. Our
        software and research write-ups, including {project.name}, are published
        separately in our{" "}
        <a href={org.github} target="_blank" rel="noopener noreferrer">
          public code repositories
        </a>{" "}
        under their own open-source licenses, which govern any use of that code.
      </p>

      <h2>Not medical or professional advice</h2>
      <p>
        Nothing on this site is medical, clinical, or professional advice. Our
        computational work produces <strong>hypotheses, not treatments</strong>.
        A high computational rank is a hypothesis for a wet lab to test, never a
        validated drug or a claim of efficacy or safety. Do not rely on this
        site to diagnose, treat, or make decisions about any condition.
      </p>

      <h2>Research is preliminary</h2>
      <p>
        Results described here are early and may be incomplete, superseded, or
        wrong. We publish our failures alongside our successes precisely because
        science is provisional. Information is provided &ldquo;as is,&rdquo;
        without warranties of any kind.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not use the site for any unlawful purpose.</li>
        <li>
          Do not attempt to disrupt, overload, or gain unauthorized access to
          the site or its infrastructure.
        </li>
        <li>
          Do not misrepresent our work or imply endorsement, partnership, or
          clinical validation we have not given.
        </li>
      </ul>

      <h2>Intellectual property</h2>
      <p>
        Text and imagery on this website are the property of {org.name} unless
        otherwise noted. Our published code and data carry their own licenses in
        the repositories, and those licenses control there.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {org.name} is not liable for any
        damages arising from your use of, or reliance on, this site or its
        content.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms as the project evolves. Continued use of the
        site after changes means you accept the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email us at{" "}
        <a href={`mailto:${org.email}`}>{org.email}</a>.
      </p>
    </DocPage>
  );
}
