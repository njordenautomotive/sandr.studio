export const projects = [
  {
    slug: "ember-health",
    index: "01",
    client: "Ember Health",
    sector: "Healthcare · Series A",
    year: "2025",
    tagline: "A cardiology platform that feels like a second heartbeat.",
    summary:
      "Ember is rebuilding post-operative cardiac care. We turned a clinical SaaS into an emotional product — one clinicians trust and patients can feel.",
    challenge:
      "Ember had the science, the pilot data, and an enterprise deck. What they didn't have was a web presence that matched the weight of saving lives. Their old site read like a dashboard changelog.",
    story:
      "We reframed Ember as a continuous companion, not a product. The narrative moves from fear (what happens after surgery?) to clarity (a team watching over you) to conviction (outcomes nobody else delivers).",
    direction:
      "Deep clinical navy, warm bone body, a slow EKG line that scrolls with the reader. Editorial typography that treats patient stories as feature pieces, not testimonials.",
    outcome:
      "Inbound from three health systems within two weeks of launch. Series A closed 60 days later.",
    palette: ["#0A1224", "#4A5BFF", "#F1ECE1"],
    gradient: "linear-gradient(135deg, #070C1A 0%, #182554 45%, #4A5BFF 100%)",
    stats: [
      { k: "2 wks", v: "Build time" },
      { k: "3", v: "Health systems reached" },
      { k: "×4", v: "Avg. session duration" }
    ]
  },
  {
    slug: "northshore-ai",
    index: "02",
    client: "Northshore",
    sector: "AI Infra · Pre-seed",
    year: "2025",
    tagline: "Hard infrastructure, written like literature.",
    summary:
      "Northshore builds high-performance inference clusters. Their old site explained the chipset. We made senior engineers want to work there.",
    challenge:
      "Every infra startup's homepage looks like a whitepaper with three pricing tiers. Northshore needed a site that earned senior engineers and serious partners — not search traffic.",
    story:
      "We opened with the founder's thesis in a single sentence, then let the product disappear for two scrolls. By the time the specs arrive, the reader already believes.",
    direction:
      "Graphite base, a single hairline accent, monospaced numerics that count in real time. Motion surgical. Weight carried by type, not decoration.",
    outcome:
      "Two marquee design partners signed in the first month. 3x qualified engineering applications.",
    palette: ["#0A0A0E", "#8AE3FF", "#E8E2D2"],
    gradient: "linear-gradient(135deg, #05060A 0%, #0E1420 50%, #2B4C66 100%)",
    stats: [
      { k: "1 wk", v: "First draft" },
      { k: "2", v: "Design partners signed" },
      { k: "×3", v: "Engineering applications" }
    ]
  },
  {
    slug: "curio-learn",
    index: "03",
    client: "Curio",
    sector: "Education · Seed",
    year: "2024",
    tagline: "A school on the internet that doesn't feel like one.",
    summary:
      "Curio is a cohort-based learning platform for ambitious teens. We made the site feel like the place those teens already wanted to belong.",
    challenge:
      "Parents needed trust. Students needed desire. The old site was doing neither — too much copy, not enough character, zero emotional pull.",
    story:
      "Two narrative lanes on the home: one for parents (outcomes, safety, rigor), one for students (belonging, aesthetic, autonomy). Same site, two truths.",
    direction:
      "Warm editorial palette, handwritten accents, student portraits treated like magazine covers. Motion used to move the reader through a day at Curio.",
    outcome:
      "Applications doubled in the first cohort window. The first parent-student aligned landing page in the category.",
    palette: ["#161015", "#E5A554", "#F4EFE7"],
    gradient: "linear-gradient(135deg, #1A1419 0%, #3E2E28 45%, #E5A554 100%)",
    stats: [
      { k: "48 h", v: "Landing page" },
      { k: "×2", v: "Cohort applications" },
      { k: "−0", v: "Support tickets on launch" }
    ]
  },
  {
    slug: "halcyon-studio",
    index: "04",
    client: "Halcyon",
    sector: "Consumer product · Seed",
    year: "2024",
    tagline: "A calm app that finally earned its calm website.",
    summary:
      "Halcyon is a sleep companion that actually works. The old site was loud, busy, and forgettable — the opposite of the product.",
    challenge:
      "Halcyon had a beautiful product and a chaotic marketing surface. The first thing a user saw made them not trust what came after.",
    story:
      "One headline. One breath. One button. A site that stages the product with the same discipline the product stages your night.",
    direction:
      "Near-black with a slow ultraviolet drift. Type set wide. The nav disappears until needed. Everything earns its place.",
    outcome:
      "Bounce cut by 38%. Paid conversion up 62%. First featured in three design publications.",
    palette: ["#0A0912", "#8B3FFF", "#EFEAE0"],
    gradient: "linear-gradient(135deg, #050410 0%, #15112E 55%, #6939CC 100%)",
    stats: [
      { k: "−38%", v: "Bounce rate" },
      { k: "+62%", v: "Paid conversion" },
      { k: "3", v: "Editorial features" }
    ]
  }
];

export function getProject(slug) {
  return projects.find((p) => p.slug === slug);
}
