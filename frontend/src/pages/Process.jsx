import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

const steps = [
  {
    n: "01",
    t: "Find the story",
    s: "What matters, and why",
    d: "We start with a founder session. What are you actually building, who is it for, what happens if it works, and what's the truth nobody else in your category is telling? By the end of this step we've named the enemy, the promise, and the feeling we're designing for.",
  },
  {
    n: "02",
    t: "Shape the experience",
    s: "From story to structure",
    d: "We turn the story into a narrative arc on the page: what people see first, what tension pulls them down, what they feel by the time they reach the CTA. You see sitemap, section intent, early copy, and art direction — together, not in silos.",
  },
  {
    n: "03",
    t: "Build the site",
    s: "Custom, cinematic, fast",
    d: "We design and code in parallel — no Figma-to-dev handoff limbo. Custom layouts, a bespoke motion system, performance budgets enforced from day one. You review in real time, not at the end.",
  },
  {
    n: "04",
    t: "Launch with confidence",
    s: "Shipped, handed off, ready to grow",
    d: "We deploy, wire analytics, teach your team the CMS, and stay close for the two weeks after launch. You leave with a site you're proud to share, not one you apologize for.",
  },
];

export default function Process() {
  return (
    <PageShell testid="page-process">
      <section className="section" style={{ paddingTop: 200 }}>
        <div className="container-x">
          <Reveal>
            <p className="eyebrow eyebrow-dot">Process</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display" style={{ fontSize: "clamp(60px, 9vw, 150px)", marginTop: 28, lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "14ch" }}>
              Four steps. <i style={{ color: "var(--accent)" }}>Founder-led</i>. Built for momentum.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ marginTop: 30, maxWidth: 640, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7 }}>
              Our process is tight on purpose. The goal is not to fill ten weeks of meetings — it's to ship a site your startup can point at tomorrow.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <div className="container-x">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.06}>
              <div className="step">
                <div>
                  <div className="num">{step.n}</div>
                  <div className="eyebrow" style={{ marginTop: 10, color: "var(--ink-dim)" }}>{step.s}</div>
                </div>
                <div>
                  <h3>{step.t}</h3>
                  <p>{step.d}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.1}>
            <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 0, border: "1px solid var(--line)", borderRadius: 22, overflow: "hidden" }}>
              {[
                { k: "1", v: "Founder, not an account manager" },
                { k: "0", v: "Templates. Ever." },
                { k: "2 wks", v: "From kickoff to live site" },
                { k: "∞", v: "Revisions on story¹" },
              ].map((x, i, arr) => (
                <div key={i} style={{ padding: 36, borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none", background: "var(--bg-2)" }}>
                  <div className="font-display" style={{ fontSize: "clamp(56px, 7vw, 100px)", color: "var(--accent)", lineHeight: 1 }}>{x.k}</div>
                  <div style={{ marginTop: 12, color: "var(--ink-dim)", fontSize: 14 }}>{x.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, color: "var(--ink-mute)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase" }}>¹ Within the story phase. After that, we move.</div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--line)", paddingTop: 48 }}>
              <div className="font-display" style={{ fontSize: "clamp(32px, 4vw, 56px)", maxWidth: "20ch", lineHeight: 1.05 }}>
                Ready to see it on your startup?
              </div>
              <Link to="/contact" className="btn btn-primary">Start your build<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
