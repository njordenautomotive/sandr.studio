import { Link, useParams, Navigate } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";
import { getProject, projects } from "@/data/projects";

export default function WorkDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <Navigate to="/work" replace />;
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <PageShell testid={`page-work-${project.slug}`}>
      <section style={{ paddingTop: 160, paddingBottom: 60 }}>
        <div className="container-x">
          <Reveal>
            <div style={{ display: "flex", gap: 22, color: "var(--ink-dim)", flexWrap: "wrap" }}>
              <span className="eyebrow">{project.index} · Concept</span>
              <span className="eyebrow">{project.sector}</span>
              <span className="eyebrow">{project.year}</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display" style={{ fontSize: "clamp(56px, 9vw, 150px)", marginTop: 24, lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "18ch" }}>
              {project.tagline}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ marginTop: 28, maxWidth: 680, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7 }}>
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 100 }}>
        <div className="container-x">
          <Reveal>
            <div style={{ borderRadius: 22, overflow: "hidden", border: "1px solid var(--line)" }}>
              <ProjectVisual project={project} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 60 }} className="case-body">
            <Reveal>
              <div className="eyebrow">Challenge</div>
            </Reveal>
            <Reveal delay={0.05}>
              <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(24px, 3vw, 40px)", lineHeight: 1.25, letterSpacing: "-0.015em", color: "var(--ink)" }}>{project.challenge}</p>
            </Reveal>
          </div>
          <div className="hairline" style={{ margin: "60px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 60 }} className="case-body">
            <Reveal>
              <div className="eyebrow">Story</div>
            </Reveal>
            <Reveal delay={0.05}>
              <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.75 }}>{project.story}</p>
            </Reveal>
          </div>
          <div className="hairline" style={{ margin: "60px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 60 }} className="case-body">
            <Reveal>
              <div className="eyebrow">Direction</div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.75 }}>{project.direction}</p>
                <div style={{ display: "flex", gap: 12, marginTop: 26, flexWrap: "wrap" }}>
                  {project.palette.map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: "1px solid var(--line-2)", borderRadius: 99 }}>
                      <span style={{ width: 16, height: 16, borderRadius: 99, background: c, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }} />
                      <span className="font-mono" style={{ fontSize: 11, letterSpacing: 0, color: "var(--ink-dim)" }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="hairline" style={{ margin: "60px 0" }} />
          <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 60 }} className="case-body">
            <Reveal>
              <div className="eyebrow">Outcome</div>
            </Reveal>
            <Reveal delay={0.05}>
              <div>
                <p style={{ color: "var(--ink)", fontSize: 22, lineHeight: 1.6 }}>{project.outcome}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 0, marginTop: 40, border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden" }}>
                  {project.stats.map((s, i) => (
                    <div key={i} style={{ padding: 28, borderRight: i < project.stats.length - 1 ? "1px solid var(--line)" : "none", background: "var(--bg-2)" }}>
                      <div className="font-display" style={{ fontSize: "clamp(40px, 5vw, 72px)", color: "var(--accent)", lineHeight: 1 }}>{s.k}</div>
                      <div style={{ marginTop: 10, color: "var(--ink-dim)", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.14em", fontFamily: "'JetBrains Mono', monospace" }}>{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`@media (max-width: 860px){ .case-body { grid-template-columns: 1fr !important; gap: 14px !important; } }`}</style>
      </section>

      <section style={{ paddingTop: 40, paddingBottom: 120 }}>
        <div className="container-x">
          <div style={{ border: "1px solid var(--line)", borderRadius: 22, padding: "48px 40px", background: "var(--bg-2)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>Next concept</div>
              <div className="font-display" style={{ fontSize: "clamp(36px, 5vw, 72px)", marginTop: 10 }}>{next.client}</div>
            </div>
            <Link to={`/work/${next.slug}`} className="btn btn-primary" data-testid="work-next">
              Read next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
