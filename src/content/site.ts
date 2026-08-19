/*
 * Single source of truth for site copy.
 * Edit here to change headings, stats, and CTAs — no component edits needed.
 *
 * The site leads with the FOUNDATION's mission (fungal research; a world without
 * antifungal resistance). OpenAFR — the screening pipeline — is presented as our
 * first project, not the headline.
 */

export const org = {
  name: "The Antifungal Resistance Project",
  short: "ARP", // compact mark for the nav
  legal: "The Antifungal Resistance Project",
  domain: "antifungalresistance.org", // registration in progress
  mission: "For a world without antifungal resistance.",
  tagline: "A nonprofit for fungal research and open antifungal science.",
  email: "hello@antifungalresistance.org",
  github: "https://github.com/antifungal-resistance-project", // the org
};

// The tool, referenced as a project throughout.
export const project = {
  name: "OpenAFR",
  blurb: "our open, self-validating antifungal screening pipeline",
  repo: "https://github.com/antifungal-resistance-project/OpenAFR",
};

export const hero = {
  eyebrow: org.tagline,
  title: "For a world without antifungal resistance.",
  sub: "Fungal disease is linked to an estimated 3.8 million deaths a year, the drugs that fight it are failing, and almost no one is working on it. We research the biology of fungal disease and build open, rigorously validated science to keep antifungal medicines working.",
};

export const problem = {
  eyebrow: "Why fungi, why now",
  title: "Fungal disease is rising, resistant, and overlooked.",
  points: [
    {
      k: "A hidden global killer",
      v: "Invasive fungal infections cause millions of deaths a year — often in people already fighting cancer, HIV, or ICU illness — yet they get a fraction of the attention bacteria do.",
    },
    {
      k: "Resistance is spreading",
      v: "Pathogens like the WHO critical-priority Candida auris now resist multiple antifungal classes at once and move through hospitals faster than we can respond.",
    },
    {
      k: "The pipeline is nearly empty",
      v: "Antifungal R&D is dramatically underfunded relative to antibacterial R&D. Few new drug classes are coming, and the ones we have are eroding.",
    },
  ],
};

export const approach = {
  eyebrow: "What we do",
  title: "Understand fungi. Build in the open. Hold every claim to proof.",
  pillars: [
    {
      k: "Research the biology",
      v: "Study how fungi cause disease and evade our drugs — starting with the enzymes and binding sites that antifungal resistance turns on.",
    },
    {
      k: "Build open tools",
      v: "Release reproducible, freely available software and data so any lab can build on the work, not just us.",
    },
    {
      k: "Bring people together",
      v: "Connect computational work with the wet labs, clinicians, and funders who can turn a hypothesis into a real treatment.",
    },
  ],
};

// Framing for the scroll-driven molecular animation (captions live in HemeApproach.tsx).
export const science = {
  eyebrow: "The science of resistance",
  title: "Resistance is a story about geometry.",
  sub: "Scroll to see how an antifungal drug actually works — and what really separates a molecule that kills fungus from one that only looks like it should.",
};

export const values = {
  eyebrow: "How we work",
  title: "We hold our own work to proof before we ask anyone to trust it.",
  body: "Computational biology produces hypotheses, not cures — and it is easy to publish a confident-looking result that means nothing. So we build the evidence in first: our tools must re-discover the drugs we already know work, on molecules they have never seen, before they are allowed to rank anything new. Every result, including the runs that fail, is written up in the open.",
};

// OpenAFR presented as the foundation's first project.
export const projectSection = {
  eyebrow: "Our first project",
  title: "OpenAFR — proving the method on Candida auris.",
  intro:
    "Our first open pipeline puts the approach to the test. On a held-out challenge frozen with a SHA-256 hash before any data was generated, it was asked to find 7 azole antifungals it had never seen, hidden among 348 look-alike decoys.",
  stats: [
    { label: "AUC — iron-approach distance", value: 0.794, kind: "decimal" as const, tone: "pass" as const },
    { label: "Enrichment in the top 5% shortlist", value: 5.6, suffix: "×", kind: "decimal" as const, tone: "pass" as const },
    { label: "Permutation-test p", value: 0.0028, kind: "p" as const, tone: "pass" as const },
    { label: "AUC — docking affinity score", value: 0.471, kind: "decimal" as const, tone: "fail" as const },
  ],
  takeaway:
    "How closely a molecule brings a nitrogen to the heme iron discriminated real drugs from look-alikes far better than the docking program's own score — on the exact same poses. It's early, single-project evidence that the method works.",
  limitsTitle: "What it does not yet prove",
  limits: [
    "n = 7 held-out actives; the 95% confidence interval's lower bound still sits below the pass bar.",
    "Decoys are presumed inactive, not experimentally verified.",
    "One rigid receptor (C. albicans, not C. auris); no induced fit.",
    "This validates a ranking method, not a drug. A high rank is a hypothesis for a wet lab — never a hit.",
  ],
};

export const roadmap = {
  eyebrow: "Where we're headed",
  title: "From a proven method to a shared platform for antifungal discovery.",
  stages: [
    {
      state: "done" as const,
      title: "Prove the method",
      body: "Ship a self-validating pipeline whose ranking criterion passes a pre-registered, held-out test — with the failing runs published too.",
    },
    {
      state: "next" as const,
      title: "Broaden the science",
      body: "Extend beyond one enzyme and one pathogen, and turn ranked candidates into clear, reproducible reports a collaborator can act on.",
    },
    {
      state: "blocked" as const,
      title: "Partner with wet labs",
      body: "Put top candidates on real fungus. This is the critical dependency — nothing here is validated until someone does.",
    },
    {
      state: "next" as const,
      title: "Open the platform",
      body: "Grow into shared, open infrastructure and data that any antifungal researcher can use — so progress compounds across the whole field.",
    },
  ],
};

export const cta = {
  title: "Help us build a world without antifungal resistance.",
  body: "Whether you run a wet lab, study fungal biology, fund neglected disease work, or want to contribute to open science — there's a place for you here. Let's talk.",
};

/*
 * Framing copy for the in-depth resistance explainer at /resistance.
 * The scroll-scene captions themselves live in ResistanceExplainer.tsx (as with
 * the homepage HemeApproach), so the animation and its words stay together.
 */
export const explainer = {
  eyebrow: "Antifungal resistance, explained",
  title: "How fungi survive the drugs meant to kill them.",
  intro:
    "The most common antifungal drugs, the azoles, all work the same way: they disable one enzyme the fungus needs to live. Resistance comes down to three ways a fungus gets around that. Scroll through each one.",
  lead: {
    title: "One enzyme, one drug, one weak point.",
    body: "Fungi need a molecule called ergosterol to build their cell membranes, and they rely on an enzyme called Cyp51 (encoded by the ERG11 gene) to make it. Azole drugs fit into Cyp51 and place a nitrogen atom against the iron at its core, which shuts the enzyme down. With no working enzyme there is no ergosterol, and with no ergosterol there is no membrane. Each mechanism below breaks a different link in that chain.",
  },
  mechanismsIntro: {
    eyebrow: "Three escape routes",
    title: "Resistance is not one trick but several.",
    body: "A resistant fungus rarely invents anything new. It reuses machinery it already has, in three main ways: change the shape of the target, pump the drug back out, or make more of the target than the drug can cover.",
  },
  spread: {
    eyebrow: "Why it's spreading",
    title: "Resistance is moving out of the clinic and onto the farm.",
    points: [
      {
        k: "Candida auris",
        v: "A yeast first identified in 2009. It spreads between patients in hospitals, survives on surfaces for weeks, and is often resistant to several antifungal classes at once. The WHO ranks it a critical-priority pathogen.",
      },
      {
        k: "Azoles in agriculture",
        v: "The same azole chemistry is sprayed on crops at large scale. Molds like Aspergillus fumigatus encounter these fungicides in the soil and can evolve resistance there, before a patient ever takes a related drug.",
      },
      {
        k: "An empty pipeline",
        v: "We have only a handful of antifungal drug classes, and few new ones are close. Every mechanism a fungus acquires narrows an already thin set of options.",
      },
    ],
  },
  close: {
    title: "This is the gap we work on.",
    body: "Telling a molecule that genuinely binds the enzyme from one that only appears to is a problem of geometry, the same geometry resistance exploits. Measuring it carefully is what our first project set out to prove.",
  },
};

/*
 * Curated external resources. Every link here was verified live. Keep it that
 * way: a dead link on a nonprofit's resources page reads as neglect. When you
 * add or edit an entry, open the URL and confirm the org and page still exist.
 */
export const resources = {
  eyebrow: "Resources",
  title: "The best places to learn about fungal disease and resistance.",
  intro:
    "We are one small part of a larger field. Below are the organizations, public-health bodies, and reference materials we trust and return to. Start here if you want to go further than this site can take you.",
  groups: [
    {
      title: "Organizations & advocacy",
      blurb: "Groups driving awareness, diagnosis, and policy on fungal disease.",
      links: [
        {
          name: "Global Action For Fungal Infections (GAFFI)",
          href: "https://gaffi.org",
          desc: "An international foundation working to make fungal diagnostics and essential antifungal medicines available worldwide, and to put fungal disease on the global health agenda.",
        },
        {
          name: "Fungal Infection Trust",
          href: "https://fungalinfectiontrust.org",
          desc: "A UK charity that funds fungal-disease research and public education, and runs the LIFE / Fungal Education program.",
        },
        {
          name: "Mycoses Study Group Education & Research Consortium (MSGERC)",
          href: "https://msgerc.org",
          desc: "A clinical and research network advancing the diagnosis, treatment, and study of invasive fungal infections.",
        },
      ],
    },
    {
      title: "Public health bodies",
      blurb: "Authoritative surveillance and guidance from global and national agencies.",
      links: [
        {
          name: "WHO Fungal Priority Pathogens List",
          href: "https://www.who.int/publications/i/item/9789240060241",
          desc: "The World Health Organization's first ranking of the fungal pathogens that most need research and public-health attention. It is a large part of why Candida auris is now widely known in the field.",
        },
        {
          name: "CDC: Candida auris",
          href: "https://www.cdc.gov/candida-auris/index.html",
          desc: "The US Centers for Disease Control's hub on C. auris: how it spreads in hospitals, its multidrug resistance, and current containment guidance.",
        },
      ],
    },
    {
      title: "Learn the science",
      blurb: "Open, structured education from beginner explainers to clinical detail.",
      links: [
        {
          name: "LIFE / Fungal Education",
          href: "https://en.fungaleducation.org",
          desc: "Free, open-access education on fungal diseases and the fungi that cause them, layered from plain-language summaries to clinical and lab-level detail, in English and Spanish.",
        },
        {
          name: "Doctor Fungus",
          href: "https://drfungus.org",
          desc: "A long-running reference on fungi, antifungal drugs, and clinical mycology cases.",
        },
      ],
    },
    {
      title: "Key reports & data",
      blurb: "The primary sources behind the numbers we cite.",
      links: [
        {
          name: "Denning, Global incidence and mortality of severe fungal disease (Lancet Infect. Dis., 2024)",
          href: "https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(23)00692-8/abstract",
          desc: "The burden estimate behind the ~3.8 million deaths a year figure: ~6.5 million invasive fungal infections annually, with a detailed breakdown by disease.",
        },
        {
          name: "WHO Fungal Priority Pathogens List report (PDF)",
          href: "https://www.who.int/publications/i/item/9789240060241",
          desc: "The full 48-page WHO report, covering the methodology, the three priority tiers, and the research and policy actions it recommends.",
        },
      ],
    },
  ],
};
