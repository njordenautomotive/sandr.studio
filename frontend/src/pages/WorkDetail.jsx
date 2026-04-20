import { Link, useParams, Navigate } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal, { MaskReveal } from "@/components/Reveal";
import SceneVisual from "@/components/SceneVisual";
import AmbientOrb from "@/components/AmbientOrb";
import { getProject, projects } from "@/data/projects";

export default function WorkDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/work" replace />;
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <PageShell testid={`page-work-${project.slug}`}>
      <section style={{ paddingTop: 180, paddingBottom: 60, position: "relative" }}>
        <AmbientOrb color={project.palette[1]} size={600} blur={130} opacity={0.28} style={{ right: "-8%", top: "10%" }} />
        <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", gap: 24, color: "var(--ink-dim)", flexWrap: "wrap" }}>
              <span className="coord" style={{ color: "var(--cobalt)" }}>{project.index} · Concept</span>
              <span className="coord">{project.sector}</span>
              <span className="coord">{project.year}</span>
            </div>
          </Reveal>
          <MaskReveal delay={0.08}>
            <h1 className="display" style={{ fontSize: "clamp(64px, 10vw, 180px)", marginTop: 30, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
              {project.client}
            </h1>
          </MaskReveal>
          <Reveal delay={0.15}>
            <p style={{ marginTop: 26, maxWidth: 680, color: "var(--ink-2)", fontSize: 22, lineHeight: 1.5, fontStyle: "italic" }}>
              “{project.tagline}”
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <p style={{ marginTop: 22, maxWidth: 680, color: "var(--ink-dim)", fontSize: 17, lineHeight: 1.7 }}>
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 120 }}>
        <div className="container-x">
          <MaskReveal>
            <SceneVisual project={project} size="large" />
          </MaskReveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container-x">
          {[
            ["Challenge", project.challenge, "display"],
            ["Story", project.story, "body"],
            ["Direction", project.direction, "body", true],
            ["Outcome", project.outcome, "display"],
          ].map(([label, text, kind, withPalette], i) => (
            <div key={label}>
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 60, padding: "60px 0", borderTop: "1px solid var(--line)" }} className="case-body">
                <Reveal>
                  <div className="coord" style={{ color: "var(--cobalt)" }}>{String(i + 1).padStart(2, "0")} — {label}</div>
                </Reveal>
                <Reveal delay={0.06}>
                  {kind === "display" ? (
                    <p className="display" style={{ fontSize: "clamp(26px, 3.6vw, 52px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)" }}>{text}</p>
                  ) : (
                    <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.75 }}>{text}</p>
                  )}
                  {withPalette && (
                    <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                      {project.palette.map((c, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "1px solid var(--line-2)", borderRadius: 99 }}>
                          <span style={{ width: 18, height: 18, borderRadius: 99, background: c, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
                          <span className="coord" style={{ color: "var(--ink-dim)" }}>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>
              </div>
            </div>
          ))}

          <div style={{ padding: "60px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <Reveal>
              <div className="coord" style={{ color: "var(--cobalt)" }}>05 — Numbers</div>
            </Reveal>
            <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0 }}>
              {project.stats.map((s, i, arr) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div style={{ padding: "32px 24px", borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none" }}>
                    <div className="display" style={{ fontSize: "clamp(56px, 8vw, 120px)", color: "var(--cobalt)", lineHeight: 1, letterSpacing: "-0.03em" }}>{s.k}</div>
                    <div style={{ marginTop: 12, color: "var(--ink-dim)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.18em", fontFamily: "'JetBrains Mono', monospace" }}>{s.v}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <style>{`@media(max-width: 900px){ .case-body { grid-template-columns: 1fr !important; gap: 14px !important; padding: 36px 0 !important; } }`}</style>
        </div>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div className="container-x">
          <Link to={`/work/${next.slug}`} data-testid="work-next" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{ padding: "56px 48px", background: next.gradient, borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(180deg, transparent, rgba(0,0,0,0.35))" }} />
              <div style={{ position: "relative", color: "#F5F1E8" }}>
                <div className="coord" style={{ color: "rgba(255,255,255,0.7)" }}>Next chapter</div>
                <div className="display" style={{ fontSize: "clamp(44px, 6vw, 90px)", marginTop: 10, lineHeight: 1, fontStyle: "italic" }}>{next.client}</div>
              </div>
              <div className="btn-link" style={{ position: "relative", color: "#F5F1E8", borderColor: "rgba(245,241,232,0.35)" }}>
                Continue
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
