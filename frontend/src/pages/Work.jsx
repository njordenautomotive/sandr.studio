import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/data/projects";

export default function Work() {
  return (
    <PageShell testid="page-work">
      <section className="section" style={{ paddingTop: 200 }} data-testid="work-hero">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow eyebrow-dot">Selected work</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="font-display" style={{ fontSize: "clamp(60px, 9vw, 160px)", marginTop: 28, lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "16ch" }}>
              Four startups. Four <i style={{ color: "var(--accent)" }}>stories</i> worth remembering.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ marginTop: 34, maxWidth: 620, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.65 }}>
              Concept projects we'd be proud to ship tomorrow. Real founder problems, real story-first answers, real design and motion direction.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: 120 }}>
        <div className="container-x">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 28 }}>
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link to={`/work/${p.slug}`} className="proj-card" data-testid={`work-card-${p.slug}`}>
                  <ProjectVisual project={p} />
                  <div className="meta">
                    <div>
                      <div className="tag">{p.sector}</div>
                      <div className="title" style={{ marginTop: 10 }}>{p.tagline}</div>
                    </div>
                    <span className="eyebrow">Case ↗</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
