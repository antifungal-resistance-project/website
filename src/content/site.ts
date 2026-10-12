/*
 * Single source of truth for site copy.
 * Edit here to change headings, stats, and CTAs — no component edits needed.
 *
 * The site leads with the FOUNDATION's mission (fungal research; a world without
 * antifungal resistance). Its flagship project is Resistance Weather — live, open
 * surveillance of echinocandin resistance in Candida auris, built on a certified
 * re-caller. The antifungal-discovery screening pipeline is our research arm, shown
 * after the flagship, not as the headline.
 *
 * Numbers rule: the certified-caller accuracy figures (product.stats) are STABLE —
 * frozen by a pre-registered, hash-pinned benchmark — so they live here. The live
 * isolate / resistance counts are VOLATILE and owned by the weather page; we link to
 * it (product.liveHref) rather than freezing a count into marketing copy.
 */

export const org = {
  name: "The Antifungal Resistance Project",
  short: "ARP", // compact mark for the nav
  legal: "The Antifungal Resistance Project",
  domain: "antifungalresistance.org", // registration in progress
  mission: "For a world without antifungal resistance.",
  tagline: "A nonprofit working to keep the medicines that fight fungal infections working.",
  email: "hello@antifungalresistance.org",
  github: "https://github.com/antifungal-resistance-project", // the org
};

// The tool, referenced as a project throughout.
export const project = {
  name: "OpenAFR",
  blurb: "our open, self-validating antifungal screening pipeline",
  repo: "https://github.com/antifungal-resistance-project/OpenAFR",
};

/*
 * The main thing we're building: a free, live tracker for a drug-resistant
 * hospital fungus. The numbers below come from checking our tool against known
 * lab results (a fixed, locked-in test), so they're stable and live here. The
 * current case counts are on the live page (liveHref), not frozen into copy.
 */
export const product = {
  eyebrow: "What we're building",
  title: "A free, live tracker for a drug-resistant hospital fungus.",
  intro:
    "Candida auris is a fungus that spreads in hospitals, and it is increasingly surviving the drugs meant to kill it. Labs around the world share its DNA in public databases. We built a free tool that reads that DNA, spots the exact genetic changes that let the fungus resist one important group of drugs, and shows the current picture on a public page anyone can check.",
  stats: [
    { label: "lab-confirmed cases we checked our tool against", value: 98, suffix: " / 98", kind: "int" as const, tone: "pass" as const },
    { label: "of those cases our tool got right", value: 98, suffix: " / 98", kind: "int" as const, tone: "pass" as const },
    { label: "resistant cases it missed, and zero false alarms", value: 0, kind: "int" as const, tone: "pass" as const },
  ],
  takeaway:
    "A tracker is only as trustworthy as the tool behind it. Before we trusted ours, we tested it on 98 cases that labs had already worked out by hand. It got all 98 right: it never missed a resistant case and never raised a false alarm. An automatic check re-runs that same test every time we change the code, so it stays honest.",
  liveLabel: "See the live tracker",
  liveHref: "https://antifungal-resistance-project.github.io/OpenAFR/",
  liveNote:
    "The live page shows how many cases we're seeing right now and how many are resistant. Those numbers change as new DNA is shared, so we don't freeze a count here.",
  repoLabel: "See how the tool works",
  repo: project.repo,
};

export const hero = {
  eyebrow: org.tagline,
  title: "For a world without antifungal resistance.",
  sub: "Fungal infections kill an estimated 3.8 million people a year. The handful of medicines we have to fight them are slowly stopping working, because the fungi are learning to survive them. Almost no one is working on this. We build free, carefully checked tools to help keep those medicines useful, and to track the dangerous infections that are starting to resist them.",
};

export const problem = {
  eyebrow: "Why this matters",
  title: "These infections are rising, harder to treat, and mostly ignored.",
  points: [
    {
      k: "A hidden killer",
      v: "Serious fungal infections kill millions of people a year, usually people already weakened by cancer, HIV, or a stay in intensive care. They get a tiny fraction of the attention that bacterial infections get.",
    },
    {
      k: "The drugs are starting to fail",
      v: "A fungus called Candida auris is spreading through hospitals and shrugging off several of our antifungal drugs at once. The World Health Organization lists it as one of the most urgent fungal threats.",
    },
    {
      k: "Almost nothing new is coming",
      v: "Very little money goes into new antifungal drugs. Few new ones are on the way, and the ones we already have are slowly losing their punch.",
    },
  ],
};

export const approach = {
  eyebrow: "What we do",
  title: "Learn how fungi work. Build in the open. Prove it before we claim it.",
  pillars: [
    {
      k: "Study the biology",
      v: "We dig into how fungi cause disease and how they survive the drugs meant to kill them.",
    },
    {
      k: "Build free, open tools",
      v: "Everything we make is free and open, so any lab or hospital can use it and check it, not just us.",
    },
    {
      k: "Connect the people who can act",
      v: "We link up the computer work with the labs, doctors, and funders who can turn an idea into a real treatment.",
    },
  ],
};

// Framing for the scroll-driven molecular animation (captions live in HemeApproach.tsx).
export const science = {
  eyebrow: "How the drugs work",
  title: "It really comes down to shape.",
  sub: "Scroll to see how an antifungal drug actually kills a fungus, and what makes the difference between a molecule that works and one that only looks like it should.",
};

export const values = {
  eyebrow: "How we work",
  title: "We prove our own tools before we ask anyone to trust them.",
  body: "A computer prediction is just a guess until someone checks it, and it's easy to show off a confident-looking result that means nothing. So we test ours against answers we already know are right before we let them loose on anything new. We publish everything, including the tries that fail.",
};

// Our second, more exploratory project: searching for new antifungal drugs.
// Secondary to the tracker above. The numbers and honest limits are unchanged.
export const projectSection = {
  eyebrow: "Also in the works",
  title: "Can a computer spot a promising new drug before anyone tests it in a lab?",
  intro:
    "Alongside the tracker, we're testing a bolder idea: using the physical shape of a molecule to judge whether it could become a new antifungal drug, instead of relying on the usual scoring programs. As a fair test, we hid 7 real antifungal drugs among 348 look-alike molecules and asked our method to pick them out, with the rules locked in beforehand so we couldn't nudge the result.",
  stats: [
    { label: "our method's score (0.5 is a coin flip, 1.0 is perfect)", value: 0.794, kind: "decimal" as const, tone: "pass" as const },
    { label: "the usual scoring program, on the very same data", value: 0.471, kind: "decimal" as const, tone: "fail" as const },
    { label: "more real drugs in our top picks than chance would give", value: 5.6, suffix: "×", kind: "decimal" as const, tone: "pass" as const },
  ],
  takeaway:
    "It worked. Real drugs rose to the top far more often with our method than with the standard program, on the exact same data, and the odds this was just luck were about 3 in 1,000. It's early, and it's only one test, but it's real evidence the idea has legs.",
  limitsTitle: "What this does not prove yet",
  limits: [
    "We only had 7 real drugs to find, so we can't be fully sure yet.",
    "The look-alike molecules are assumed to be duds, not confirmed in a lab.",
    "We used a simplified, fixed model of the target, not a fully lifelike one.",
    "This points to ideas worth testing. It doesn't find a drug. A high score is a lead for a lab, never a cure.",
  ],
};

export const roadmap = {
  eyebrow: "Where we're headed",
  title: "From a tool we've proven to open tracking anyone can use.",
  stages: [
    {
      state: "done" as const,
      title: "Prove the tool works",
      body: "We checked our resistance detector against known lab results and set up an automatic test that re-checks it every time we change the code.",
    },
    {
      state: "done" as const,
      title: "Put it online for everyone",
      body: "We turned it into a free, always-updating public page that shows where this drug-resistant fungus is turning up.",
    },
    {
      state: "next" as const,
      title: "Cover more, update more often",
      body: "Watch a wider slice of the data, refresh it more often, and use the same careful approach for more infections and more drugs.",
    },
    {
      state: "next" as const,
      title: "Open it up as a shared service",
      body: "Grow into free data and tools any lab or health team can build on, so a warning reaches the people who can act on it.",
    },
    {
      state: "blocked" as const,
      title: "Test new drug ideas in the lab",
      body: "Put our most promising molecules in front of real fungus. We can't do this part alone: it needs lab partners, and nothing is proven until they run it.",
    },
  ],
};

export const cta = {
  title: "Help us keep these medicines working.",
  body: "Whether you run a lab, study fungi, fund work on neglected diseases, or just want to help with open science, there's a place for you here. Say hello.",
};

/*
 * Framing copy for the in-depth resistance explainer at /resistance.
 * The scroll-scene captions themselves live in ResistanceExplainer.tsx (as with
 * the homepage HemeApproach), so the animation and its words stay together.
 */
export const explainer = {
  eyebrow: "The basics",
  title: "How fungi survive the drugs meant to kill them.",
  intro:
    "Most antifungal drugs work the same basic way: they jam one tiny machine the fungus needs to stay alive. A fungus becomes resistant when it finds a way around that. There are three main tricks, and you can scroll through each one below.",
  lead: {
    title: "One machine, one drug, one weak spot.",
    body: "To build the wall around each of its cells, a fungus needs a particular building-block molecule (its name is ergosterol). It makes that block using a tiny protein machine (called Cyp51). The drug slots into that machine and jams it shut. With the machine stuck, the building block never gets made, the cell wall never forms, and the fungus dies. Each trick below breaks that chain in a different place.",
  },
  mechanismsIntro: {
    eyebrow: "Three ways around the drug",
    title: "There's more than one way to resist.",
    body: "A resistant fungus rarely invents something new. It reuses parts it already has, in three main ways: change the shape of the machine so the drug no longer fits, pump the drug back out before it can work, or make so many copies of the machine that the drug can't jam them all.",
  },
  spread: {
    eyebrow: "Why it's spreading",
    title: "Resistance is moving out of the clinic and onto the farm.",
    points: [
      {
        k: "Candida auris",
        v: "A yeast first spotted in 2009. It spreads between patients in hospitals, survives on surfaces for weeks, and often resists several antifungal drugs at once. The World Health Organization ranks it among the most urgent fungal threats.",
      },
      {
        k: "The same drugs on crops",
        v: "Close cousins of these drugs are sprayed on crops to protect them. Molds in the soil, like Aspergillus fumigatus, meet the sprays out in the field and can become resistant there, before a patient ever takes a related drug.",
      },
      {
        k: "Almost nothing new is coming",
        v: "We have only a few kinds of antifungal drug, and few new ones are close. Every trick a fungus picks up shrinks an already short list of options.",
      },
    ],
  },
  close: {
    title: "This is the gap we work on.",
    body: "Telling a molecule that truly jams the machine from one that only looks like it should comes down to shape, the same shape that resistance twists to its own advantage. Measuring that shape carefully is what our drug-search work set out to prove.",
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
    "We're one small part of a much larger field. Below are the groups, public-health agencies, and references we trust and keep coming back to. Start here if you want to go further than this site can take you.",
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
      blurb: "Trusted tracking and guidance from global and national health agencies.",
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
