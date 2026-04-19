import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";

export default function Services() {
  return (
    <PageShell testid="page-services">
      <section className="section" style={{ paddingTop: 200 }}>
        <div className="container-x">
          <Reveal>
            <p className="eyebrow eyebrow-dot">Services</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display" style={{ fontSize: "clamp(60px, 9vw, 150px)", marginTop: 28, lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "18ch" }}>
              Sharp offers. <i style={{ color: "var(--accent)" }}>Zero</i> generic packages.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ marginTop: 30, maxWidth: 640, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7 }}>
              Pricing below is a <span style={{ color: "var(--ink)" }}>starting point</span>. Every project gets a custom quote based on urgency, scope, backend complexity, and the systems you actually need.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <div className="container-x">
          <div style={{ marginTop: 20 }}>
            {services.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.05}>
                <div className="srv-row">
                  <div className="num">{s.num}</div>
                  <div className="name">{s.name}</div>
                  <div className="desc">{s.desc}</div>
                  <div className="price">{s.priceFrom}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { k: "What's always included", v: ["Story & messaging direction", "Custom design (no templates)", "Motion system", "SEO & performance pass", "Launch handoff"] },
              { k: "What's never included", v: ["Page builders", "Stock-template layouts", "Subscription lock-in", "Cookie-cutter copy", "Generic case studies"] },
              { k: "What we optionally add", v: ["Stripe / payment flows", "AI integrations", "Custom dashboards", "CMS & editor tooling", "Post-launch retainer"] },
            ].map((b, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ border: "1px solid var(--line)", borderRadius: 18, padding: 28, background: "var(--bg-2)", height: "100%" }}>
                  <p className="eyebrow" style={{ color: "var(--ink)" }}>{b.k}</p>
                  <ul style={{ marginTop: 18, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                    {b.v.map((x, j) => (
                      <li key={j} style={{ color: "var(--ink-dim)", fontSize: 15, display: "flex", gap: 10 }}>
                        <span style={{ color: "var(--accent)" }}>—</span>{x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--line)", paddingTop: 48 }}>
              <div className="font-display" style={{ fontSize: "clamp(32px, 4vw, 56px)", maxWidth: "18ch", lineHeight: 1.05 }}>
                Not sure which fits? Tell us what needs to <i style={{ color: "var(--accent)" }}>change</i>.
              </div>
              <Link to="/contact" className="btn btn-primary">Start your build<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
