import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <PageShell testid="page-about">
      <section className="section" style={{ paddingTop: 200 }}>
        <div className="container-x">
          <Reveal>
            <p className="eyebrow eyebrow-dot">About the studio</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display" style={{ fontSize: "clamp(56px, 8.5vw, 150px)", marginTop: 28, lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "20ch" }}>
              A small studio with a <i style={{ color: "var(--accent)" }}>singular</i> obsession: making startup websites worth remembering.
            </h1>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 40 }}>
        <div className="container-x">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="about-two">
            <Reveal>
              <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.75 }}>
                sandr is a founder-led studio. We take on a small handful of startups at a time, so every project gets the people who started the studio — not the people hired to grow it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.75 }}>
                We don't scale headcount. We scale taste. Fewer projects, sharper work, and a studio that stays alive past its founding year. That's the trade we choose on purpose.
              </p>
            </Reveal>
          </div>
          <style>{`@media(max-width: 860px){ .about-two { grid-template-columns: 1fr !important; gap: 22px !important; } }`}</style>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="founders-grid">
            {[
              {
                name: "Sander Lindseth",
                role: "Story & creative direction",
                bio: "Sander leads positioning, narrative, and art direction. He's spent the last decade watching founders undersell themselves on their own homepages — and refusing to do that to anyone sandr works with.",
                initials: "SL",
                gradient: "linear-gradient(135deg, #0E1726 0%, #3E5FD9 55%, #7AA2FF 100%)",
              },
              {
                name: "Sirin Thamakaison",
                role: "Design, engineering & motion",
                bio: "Sirin owns the craft — custom design, front-end and motion engineering, integrations, performance. She's the reason our sites feel cinematic and still load fast on a phone in the airport.",
                initials: "ST",
                gradient: "linear-gradient(135deg, #121014 0%, #241F2B 50%, #C2A6FF 100%)",
              },
            ].map((f, i) => (
              <Reveal key={f.name} delay={i * 0.08}>
                <article style={{ border: "1px solid var(--line)", borderRadius: 22, overflow: "hidden", background: "var(--bg-2)", height: "100%" }}>
                  <div style={{ aspectRatio: "5/4", background: f.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(circle at center, black, transparent 75%)" }} />
                    <div className="font-display" style={{ position: "relative", fontSize: "clamp(120px, 16vw, 220px)", color: "rgba(255,255,255,0.95)", letterSpacing: "-0.05em", lineHeight: 1 }}>
                      {f.initials}
                    </div>
                  </div>
                  <div style={{ padding: 30 }}>
                    <div className="eyebrow">{f.role}</div>
                    <div className="font-display" style={{ fontSize: "clamp(32px, 3.5vw, 52px)", marginTop: 10, lineHeight: 1.05 }}>{f.name}</div>
                    <p style={{ marginTop: 18, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.75 }}>{f.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width: 860px){ .founders-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <Reveal>
            <p className="eyebrow eyebrow-dot">What we believe</p>
          </Reveal>
          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {[
              "People do not remember information. They remember stories.",
              "Clean is the floor, not the ceiling.",
              "A startup's website is its first promise. Make it a good one.",
              "Speed without taste is just noise. Taste without speed is a demo.",
            ].map((b, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ borderTop: "1px solid var(--line-2)", paddingTop: 22 }}>
                  <p className="font-display" style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>{b}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap", borderTop: "1px solid var(--line)", paddingTop: 48 }}>
              <div className="font-display" style={{ fontSize: "clamp(32px, 4vw, 56px)", maxWidth: "18ch", lineHeight: 1.05 }}>
                Bring us your startup. We'll bring the <i style={{ color: "var(--accent)" }}>story</i>.
              </div>
              <Link to="/contact" className="btn btn-primary">Start your build<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
