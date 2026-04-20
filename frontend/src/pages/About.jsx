import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal, { MaskReveal } from "@/components/Reveal";
import AmbientOrb from "@/components/AmbientOrb";

const founders = [
  {
    name: "Sander Lindseth",
    role: "Story & creative direction",
    bio: "Sander leads positioning, narrative, and art direction. He's spent the last decade watching founders undersell themselves on their own homepages — and refusing to do that to anyone sandr works with.",
    initials: "SL",
    gradient: "linear-gradient(135deg, #05060A 0%, #1A2248 40%, #4A5BFF 100%)",
  },
  {
    name: "Sirin Thamakaison",
    role: "Design, engineering & motion",
    bio: "Sirin owns the craft — custom design, front-end and motion engineering, integrations, performance. She's the reason our sites feel cinematic and still load fast on a phone in an airport.",
    initials: "ST",
    gradient: "linear-gradient(135deg, #070512 0%, #211839 45%, #8B3FFF 100%)",
  },
];

export default function About() {
  return (
    <PageShell testid="page-about">
      <section style={{ paddingTop: 220, paddingBottom: 100, position: "relative" }}>
        <AmbientOrb color="var(--cobalt)" size={680} blur={140} opacity={0.28} style={{ right: "-10%", top: "10%" }} />
        <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
          <Reveal><span className="coord">About — A studio, not a factory</span></Reveal>
          <MaskReveal delay={0.1}>
            <h1 className="display" style={{ fontSize: "clamp(60px, 10vw, 190px)", marginTop: 40, lineHeight: 0.88, letterSpacing: "-0.04em", maxWidth: "14ch" }}>
              Two people. One <span className="display-italic" style={{ color: "var(--cobalt)" }}>obsession</span>.
            </h1>
          </MaskReveal>
          <Reveal delay={0.25}>
            <p style={{ marginTop: 40, maxWidth: 640, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.75 }}>
              sandr is a founder-led studio. We take on a small handful of startups at a time, so every project gets the people who started the studio — not the people hired to grow it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container-x">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="founders-grid">
            {founders.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.1}>
                <article style={{ overflow: "hidden", background: "var(--bg-2)", border: "1px solid var(--line)" }}>
                  <div style={{ aspectRatio: "5/4", background: f.gradient, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(circle at center, black, transparent 75%)" }} />
                    <div className="display display-italic" style={{ position: "relative", fontSize: "clamp(140px, 18vw, 260px)", color: "rgba(255,255,255,0.96)", letterSpacing: "-0.05em", lineHeight: 1, fontVariationSettings: "'opsz' 144, 'SOFT' 100" }}>{f.initials}</div>
                  </div>
                  <div style={{ padding: 36 }}>
                    <div className="coord" style={{ color: "var(--cobalt)" }}>{f.role}</div>
                    <div className="display" style={{ fontSize: "clamp(34px, 3.8vw, 56px)", marginTop: 14, lineHeight: 1, letterSpacing: "-0.02em" }}>{f.name}</div>
                    <p style={{ marginTop: 22, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.75 }}>{f.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <style>{`@media(max-width: 900px){ .founders-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container-x">
          <Reveal><span className="coord">What we believe, out loud</span></Reveal>
          <div style={{ marginTop: 50 }}>
            {[
              "People do not remember information. They remember stories.",
              "Clean is the floor, not the ceiling.",
              "A startup's site is its first promise. Make it a good one.",
              "Speed without taste is noise. Taste without speed is a demo.",
            ].map((b, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{ padding: "48px 0", borderTop: "1px solid var(--line)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 30, alignItems: "baseline" }} className="belief-row">
                    <div className="coord" style={{ color: "var(--cobalt)" }}>{String(i + 1).padStart(2, "0")}</div>
                    <p className="display" style={{ fontSize: "clamp(28px, 4vw, 56px)", lineHeight: 1.1, letterSpacing: "-0.025em", color: i % 2 ? "var(--ink)" : "var(--ink)" }}>
                      {b}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
            <style>{`@media(max-width: 720px){ .belief-row { grid-template-columns: 1fr !important; gap: 8px !important; } }`}</style>
          </div>

          <Reveal delay={0.1}>
            <div style={{ marginTop: 100, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <div className="display" style={{ fontSize: "clamp(34px, 5vw, 72px)", maxWidth: "18ch", lineHeight: 1, letterSpacing: "-0.03em" }}>
                Bring us your startup. We'll bring the <span className="display-italic" style={{ color: "var(--cobalt)" }}>story</span>.
              </div>
              <Link to="/contact" className="btn btn-primary">Start your build<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
