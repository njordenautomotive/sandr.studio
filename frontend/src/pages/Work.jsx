import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageShell from "@/components/PageShell";
import Reveal, { MaskReveal } from "@/components/Reveal";
import SceneVisual from "@/components/SceneVisual";
import AmbientOrb from "@/components/AmbientOrb";
import { projects } from "@/data/projects";
import { ease } from "@/lib/motion";

export default function Work() {
  return (
    <PageShell testid="page-work">
      <section style={{ paddingTop: 220, paddingBottom: 80, position: "relative" }}>
        <AmbientOrb color="var(--cobalt)" size={720} blur={140} opacity={0.3} style={{ right: "-10%", top: "10%" }} />
        <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
            <Reveal><span className="coord">Selected scenes — 2024 → 2025</span></Reveal>
            <Reveal delay={0.08}><span className="coord">04 chapters · Concept &amp; client</span></Reveal>
          </div>
          <MaskReveal delay={0.1}>
            <h1 className="display" style={{ fontSize: "clamp(72px, 13vw, 240px)", marginTop: 48, lineHeight: 0.86, letterSpacing: "-0.045em" }}>
              Not a <span className="display-italic" style={{ color: "var(--violet)" }}>portfolio</span>.
            </h1>
          </MaskReveal>
          <MaskReveal delay={0.2}>
            <h1 className="display" style={{ fontSize: "clamp(72px, 13vw, 240px)", lineHeight: 0.86, letterSpacing: "-0.045em", textAlign: "right" }}>
              A <span className="display-italic" style={{ color: "var(--cobalt)" }}>reel</span>.
            </h1>
          </MaskReveal>
          <Reveal delay={0.3}>
            <p style={{ marginTop: 40, maxWidth: 520, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7, marginLeft: "auto" }}>
              Concept projects we'd be proud to ship tomorrow. Real founder problems, real story-first answers, real design and motion direction.
            </p>
          </Reveal>
        </div>
      </section>

      {projects.map((p, i) => {
        const flipped = i % 2 === 1;
        return (
          <section key={p.slug} style={{ paddingTop: 100, paddingBottom: 100, borderTop: "1px solid var(--line)" }} data-testid={`work-card-${p.slug}`}>
            <div className="container-x">
              <Link to={`/work/${p.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ display: "grid", gridTemplateColumns: flipped ? "1fr 1.5fr" : "1.5fr 1fr", gap: 70, alignItems: "center" }} className="work-chapter">
                  <div style={{ order: flipped ? 2 : 1 }}>
                    <Reveal delay={0.04}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
                        <span className="display display-italic" style={{ fontSize: "clamp(48px, 6vw, 96px)", color: "var(--cobalt)", lineHeight: 1 }}>{p.index}</span>
                        <span className="coord">{p.sector}</span>
                      </div>
                    </Reveal>
                    <MaskReveal delay={0.1}>
                      <h2 className="display" style={{ fontSize: "clamp(48px, 7vw, 112px)", lineHeight: 0.92, letterSpacing: "-0.035em", marginTop: 20 }}>
                        {p.client}
                      </h2>
                    </MaskReveal>
                    <Reveal delay={0.2}>
                      <p style={{ marginTop: 28, fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)", fontStyle: "italic", maxWidth: 480 }}>“{p.tagline}”</p>
                    </Reveal>
                    <Reveal delay={0.26}>
                      <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.75, color: "var(--ink-dim)", maxWidth: 480 }}>
                        {p.summary}
                      </p>
                    </Reveal>
                    <Reveal delay={0.32}>
                      <div className="btn-link" style={{ marginTop: 36 }}>
                        Enter the scene
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
                      </div>
                    </Reveal>
                  </div>
                  <motion.div
                    style={{ order: flipped ? 1 : 2 }}
                    whileHover={{ scale: 1.015 }}
                    transition={{ duration: 0.9, ease }}
                  >
                    <MaskReveal delay={0.1}><SceneVisual project={p} /></MaskReveal>
                  </motion.div>
                </div>
              </Link>
              <style>{`@media(max-width: 900px){ .work-chapter { grid-template-columns: 1fr !important; gap: 36px !important; } .work-chapter > div:first-child { order: 1 !important; } .work-chapter > div:last-child { order: 2 !important; } }`}</style>
            </div>
          </section>
        );
      })}
    </PageShell>
  );
}
