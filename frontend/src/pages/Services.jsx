import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal, { MaskReveal } from "@/components/Reveal";
import AmbientOrb from "@/components/AmbientOrb";
import { services } from "@/data/services";

export default function Services() {
  return (
    <PageShell testid="page-services">
      <section style={{ paddingTop: 200, paddingBottom: 80, position: "relative" }}>
        <AmbientOrb color="var(--violet)" size={680} blur={140} opacity={0.3} style={{ left: "-8%", top: "10%" }} />
        <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
          <MaskReveal mount delay={0.08}>
            <h1 className="display display-heavy" style={{ fontSize: "clamp(72px, 12vw, 220px)", lineHeight: 0.86, letterSpacing: "-0.045em" }}>
              What we build.
            </h1>
          </MaskReveal>
          <MaskReveal mount delay={0.2}>
            <h1 className="display display-italic" style={{ fontSize: "clamp(72px, 12vw, 220px)", lineHeight: 0.86, letterSpacing: "-0.045em", textAlign: "right", color: "var(--ink-mute)" }}>
              Not what you ordered.
            </h1>
          </MaskReveal>
          <Reveal mount delay={0.3}>
            <p style={{ marginTop: 44, maxWidth: 640, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7 }}>
              Prices are a <span style={{ color: "var(--ink)" }}>starting point</span>. Every project earns a custom quote — based on urgency, scope, backend, systems, and what the brand actually needs to feel like.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container-x">
          {services.map((s, i) => (
            <div key={s.num} style={{ padding: "90px 0", borderTop: i > 0 ? "1px solid var(--line)" : "none" }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1.4fr 1fr", gap: 40, alignItems: "start" }} className="srv-scene">
                <Reveal>
                  <div>
                    <div className="display display-italic" style={{ fontSize: "clamp(56px, 8vw, 120px)", color: "var(--silver-blue)", lineHeight: 0.9 }}>{s.num}</div>
                    <div className="coord" style={{ marginTop: 10, color: "var(--ink-mute)" }}>{s.lens}</div>
                  </div>
                </Reveal>
                <MaskReveal delay={0.1}>
                  <h2 className="display display-heavy" style={{ fontSize: "clamp(44px, 6vw, 104px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}>{s.name}</h2>
                </MaskReveal>
                <Reveal delay={0.15}>
                  <div>
                    <p style={{ color: "var(--ink-2)", fontSize: 17, lineHeight: 1.7 }}>{s.desc}</p>
                    <div className="hairline" style={{ margin: "28px 0 18px" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
                      <span className="coord" style={{ color: "var(--ink-dim)" }}>Starting at</span>
                      <span className="display" style={{ fontSize: "clamp(26px, 2.6vw, 40px)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{s.priceFrom}</span>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
          <style>{`@media(max-width: 900px){ .srv-scene { grid-template-columns: 1fr !important; gap: 22px !important; } }`}</style>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0, border: "1px solid var(--line)" }}>
            {[
              { k: "Always in", v: ["Story & messaging direction", "Custom design (no templates)", "Motion system", "SEO & performance pass", "Launch handoff"] },
              { k: "Never in", v: ["Page builders", "Stock-template layouts", "Subscription lock-in", "Cookie-cutter copy", "Generic case studies"] },
              { k: "Optional", v: ["Stripe / payment flows", "AI integrations", "Custom dashboards", "CMS & editor tooling", "Post-launch retainer"] },
            ].map((b, i, arr) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ padding: 36, borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none", background: i === 1 ? "var(--bg-2)" : "transparent", height: "100%" }}>
                  <p className="coord" style={{ color: "var(--silver-blue)" }}>{b.k}</p>
                  <ul style={{ marginTop: 20, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                    {b.v.map((x, j) => (
                      <li key={j} style={{ color: "var(--ink-dim)", fontSize: 15, display: "flex", gap: 14, paddingTop: 10, borderTop: j > 0 ? "1px solid var(--line)" : "none" }}>
                        <span className="coord" style={{ color: "var(--ink-mute)" }}>{String(j + 1).padStart(2, "0")}</span>
                        <span style={{ flex: 1 }}>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 100, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div className="display" style={{ fontSize: "clamp(34px, 5vw, 72px)", maxWidth: "18ch", lineHeight: 1, letterSpacing: "-0.03em" }}>
                Not sure which fits? Tell us what needs to <span className="display-italic" style={{ color: "var(--silver-blue)" }}>change</span>.
              </div>
              <Link to="/contact" className="btn btn-primary" data-cursor data-cursor-label="Start">Start your build<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
