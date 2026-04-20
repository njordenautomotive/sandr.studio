import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal, { MaskReveal } from "@/components/Reveal";
import AmbientOrb from "@/components/AmbientOrb";

const steps = [
  { n: "I", t: "Find the story", s: "What matters, and why", d: "We start with a founder session. What are you actually building, who is it for, what happens if it works, and what's the truth nobody else in your category is telling? By the end of this step we've named the enemy, the promise, and the feeling we're designing for." },
  { n: "II", t: "Shape the feeling", s: "From story to structure", d: "We turn the story into a narrative arc on the page: what people see first, what tension pulls them down, what they feel by the time they reach the CTA. You see sitemap, section intent, early copy, and art direction — together, not in silos." },
  { n: "III", t: "Build the experience", s: "Custom, cinematic, fast", d: "We design and code in parallel — no Figma-to-dev limbo. Custom layouts, a bespoke motion system, performance budgets enforced from day one. You review in real time, not at the end." },
  { n: "IV", t: "Launch with weight", s: "Shipped, handed off, alive", d: "We deploy, wire analytics, teach your team the CMS, and stay close for the two weeks after launch. You leave with a site you're proud to share, not one you apologize for." },
];

export default function Process() {
  return (
    <PageShell testid="page-process">
      <section style={{ paddingTop: 200, paddingBottom: 80, position: "relative" }}>
        <AmbientOrb color="var(--silver-blue)" size={700} blur={140} opacity={0.32} style={{ right: "-10%", top: "10%" }} />
        <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
          <MaskReveal mount delay={0.08}>
            <h1 className="display display-heavy" style={{ fontSize: "clamp(72px, 12vw, 220px)", lineHeight: 0.86, letterSpacing: "-0.045em", maxWidth: "14ch" }}>
              Four moves.
            </h1>
          </MaskReveal>
          <MaskReveal mount delay={0.2}>
            <h1 className="display display-italic" style={{ fontSize: "clamp(72px, 12vw, 220px)", lineHeight: 0.86, letterSpacing: "-0.045em", textAlign: "right", color: "var(--silver-blue)" }}>
              Zero waste.
            </h1>
          </MaskReveal>
          <Reveal mount delay={0.3}>
            <p style={{ marginTop: 44, maxWidth: 640, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7 }}>
              The process is tight on purpose. The goal isn't to fill ten weeks of meetings — it's to ship a site your startup can point at tomorrow.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container-x">
          {steps.map((step, i) => (
            <div key={step.n} style={{ padding: "100px 0", borderTop: i > 0 ? "1px solid var(--line)" : "none" }}>
              <div style={{ display: "grid", gridTemplateColumns: "140px 1fr 1.2fr", gap: 40, alignItems: "start" }} className="proc-scene">
                <Reveal>
                  <div>
                    <div className="display display-italic" style={{ fontSize: "clamp(64px, 9vw, 140px)", color: "var(--silver-blue)", lineHeight: 0.9 }}>{step.n}</div>
                    <div className="coord" style={{ marginTop: 8, color: "var(--ink-mute)" }}>Move</div>
                  </div>
                </Reveal>
                <MaskReveal delay={0.1}>
                  <div>
                    <div className="coord" style={{ color: "var(--ink-dim)" }}>{step.s}</div>
                    <h2 className="display display-heavy" style={{ fontSize: "clamp(44px, 6vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.035em", marginTop: 14 }}>{step.t}</h2>
                  </div>
                </MaskReveal>
                <Reveal delay={0.18}>
                  <p style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.7 }}>{step.d}</p>
                </Reveal>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
          <style>{`@media(max-width: 900px){ .proc-scene { grid-template-columns: 1fr !important; gap: 22px !important; } }`}</style>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0, border: "1px solid var(--line)" }}>
              {[
                { k: "1", v: "Founder, not account manager" },
                { k: "0", v: "Templates. Ever." },
                { k: "2 wks", v: "Kickoff → live site" },
                { k: "∞", v: "Revisions on story¹" },
              ].map((x, i, arr) => (
                <div key={i} style={{ padding: 40, borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none", background: i === 1 ? "var(--bg-2)" : "transparent" }}>
                  <div className="display display-italic" style={{ fontSize: "clamp(56px, 7vw, 100px)", color: "var(--silver-blue)", lineHeight: 1, letterSpacing: "-0.03em" }}>{x.k}</div>
                  <div style={{ marginTop: 14, color: "var(--ink-dim)", fontSize: 14 }}>{x.v}</div>
                </div>
              ))}
            </div>
            <div className="coord" style={{ marginTop: 16, color: "var(--ink-mute)" }}>¹ Within the story phase. After that, we move.</div>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 100, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div className="display" style={{ fontSize: "clamp(34px, 5vw, 72px)", maxWidth: "20ch", lineHeight: 1, letterSpacing: "-0.03em" }}>
                Ready to see it on your <span className="display-italic" style={{ color: "var(--silver-blue)" }}>startup</span>?
              </div>
              <Link to="/contact" className="btn btn-primary" data-cursor data-cursor-label="Start">Start your build<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
