import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import ProjectVisual from "@/components/ProjectVisual";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { heroChild } from "@/lib/motion";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={ref} data-testid="home-hero">
      <div className="hero-grid grid-bg" />
      <div className="hero-glow" />
      <motion.div className="container-x" style={{ position: "relative", zIndex: 2, y, opacity }}>
        <motion.div
          initial="hidden"
          animate="show"
          custom={0}
          variants={heroChild}
          className="eyebrow eyebrow-dot"
          style={{ marginBottom: 32 }}
        >
          Story-first web studio · Est. 2024
        </motion.div>

        <motion.h1 className="font-display" initial="hidden" animate="show">
          <motion.span custom={1} variants={heroChild} style={{ display: "block" }}>Story-driven websites</motion.span>
          <motion.span custom={2} variants={heroChild} style={{ display: "block" }}>
            for startups that <span className="italic">refuse</span>
          </motion.span>
          <motion.span custom={3} variants={heroChild} style={{ display: "block" }}>to look generic.</motion.span>
        </motion.h1>

        <motion.p
          custom={4}
          initial="hidden"
          animate="show"
          variants={heroChild}
          style={{ marginTop: 48, maxWidth: 620, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.65 }}
        >
          sandr designs and builds cinematic, full-stack websites that turn startup ideas into
          belief, traction, and trust. Two weeks. Custom by default. Built to be remembered.
        </motion.p>

        <motion.div custom={5} initial="hidden" animate="show" variants={heroChild} style={{ marginTop: 48, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link to="/contact" className="btn btn-primary" data-testid="hero-cta-primary">
            Start your build
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
          </Link>
          <Link to="/process" className="btn btn-ghost" data-testid="hero-cta-secondary">See how we work</Link>
        </motion.div>

        <motion.div custom={6} initial="hidden" animate="show" variants={heroChild} style={{ marginTop: 110, display: "flex", gap: 56, flexWrap: "wrap", color: "var(--ink-dim)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          <div><span style={{ color: "var(--accent)" }}>—</span> Founder-led studio</div>
          <div>Full-stack · Custom by default</div>
          <div>48h landing · 2-week sites</div>
        </motion.div>
      </motion.div>

      <div style={{ position: "absolute", left: 28, bottom: 28, zIndex: 2 }}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, color: "var(--ink-mute)", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          <span>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, var(--line-2), transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="section" data-testid="home-problem">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-dot">01 — The enemy</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="big-type" style={{ marginTop: 36, maxWidth: "18ch" }}>
            Most startup websites <span className="strike">explain everything</span> and say <i style={{ color: "var(--accent)" }}>nothing</i>.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
            {[
              "Clean is not enough. Clean is the floor, not the ceiling.",
              "Template thinking produces forgettable startups. Forgettable startups don't raise.",
              "Clarity without conviction is just information. Founders need belief.",
            ].map((t, i) => (
              <Reveal key={i} delay={0.2 + i * 0.08}>
                <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.65, borderTop: "1px solid var(--line-2)", paddingTop: 22 }}>{t}</p>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Solution() {
  return (
    <section className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }} data-testid="home-solution">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-dot">02 — The opposite</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, marginTop: 36, alignItems: "start" }} className="solution-grid">
          <Reveal delay={0.1}>
            <h2 className="font-display" style={{ fontSize: "clamp(44px, 6vw, 96px)", lineHeight: 1.02, letterSpacing: "-0.025em" }}>
              We build <i style={{ color: "var(--accent)" }}>the opposite</i>. Websites with story, presence, and people who remember them.
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7 }}>
                sandr starts with the hardest question: what should people feel when they land here? Everything after — the design, the motion, the copy, the code — serves that answer.
              </p>
              <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7 }}>
                Not &ldquo;what you do.&rdquo; Why it matters. Not information — belief.
              </p>
              <Link to="/about" className="link-arrow" style={{ alignSelf: "start", marginTop: 8 }}>
                Read the studio ethos
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
              </Link>
            </div>
          </Reveal>
        </div>
        <style>{`
          @media (max-width: 860px) { .solution-grid { grid-template-columns: 1fr !important; gap: 32px !important; } }
        `}</style>
      </div>
    </section>
  );
}

function ServicesSnapshot() {
  return (
    <section className="section" data-testid="home-services">
      <div className="container-x">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 20 }}>
          <Reveal>
            <div>
              <p className="eyebrow eyebrow-dot">03 — What we build</p>
              <h2 className="font-display" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", marginTop: 24, maxWidth: "14ch" }}>
                Four sharp offers. <i style={{ color: "var(--accent)" }}>Zero</i> generic packages.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/services" className="link-arrow">
              All services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </Reveal>
        </div>

        <div style={{ marginTop: 64 }}>
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
      </div>
    </section>
  );
}

function WhySandr() {
  const items = [
    { k: "Story first", v: "We start with what you want people to feel — and work backwards into design, copy, and code." },
    { k: "Founder-led", v: "You talk to the people building your site. No account managers. No handoffs." },
    { k: "Custom by default", v: "No templates. No page builders. Every site is a one-of-one, from the narrative to the CSS." },
    { k: "Startup-native", v: "We've shipped products. We understand raises, pivots, and timelines that don't move." },
    { k: "Fast but sharp", v: "48-hour landing pages. Two-week full sites. Velocity without losing taste." },
  ];
  return (
    <section className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }} data-testid="home-why">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-dot">04 — Why sandr</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", marginTop: 24, maxWidth: "20ch" }}>
            Five convictions, not a feature list.
          </h2>
        </Reveal>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{ border: "1px solid var(--line)", borderRadius: 18, padding: 28, background: "var(--bg-3)", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)" }} />
                  <span className="eyebrow" style={{ color: "var(--ink)" }}>{it.k}</span>
                </div>
                <p style={{ marginTop: 20, color: "var(--ink-dim)", fontSize: 16, lineHeight: 1.65 }}>{it.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Speed() {
  const tiers = [
    { t: "48 hrs", l: "Landing page", d: "A single-page narrative for your launch, raise, or moment of attention." },
    { t: "1 week", l: "First full draft", d: "A complete site draft — structure, story, design direction — ready to react to." },
    { t: "2 weeks", l: "Live startup site", d: "Fully built, deployed, and handed off. Story, CMS, integrations, motion — shipped." },
  ];
  return (
    <section className="section" data-testid="home-speed">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-dot">05 — Velocity</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: "clamp(48px, 7vw, 120px)", marginTop: 24, maxWidth: "14ch" }}>
            Fast enough to matter. <i style={{ color: "var(--accent)" }}>Sharp</i> enough to last.
          </h2>
        </Reveal>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0, border: "1px solid var(--line)", borderRadius: 22, overflow: "hidden" }}>
          {tiers.map((tier, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ padding: 40, borderRight: i < tiers.length - 1 ? "1px solid var(--line)" : "none", background: "var(--bg-2)", height: "100%" }}>
                <div className="font-display" style={{ fontSize: "clamp(64px, 8vw, 120px)", color: "var(--accent)", lineHeight: 1 }}>{tier.t}</div>
                <div style={{ marginTop: 14, fontSize: 18, color: "var(--ink)" }}>{tier.l}</div>
                <p style={{ marginTop: 16, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7 }}>{tier.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkSection() {
  return (
    <section className="section" data-testid="home-work">
      <div className="container-x">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 20 }}>
          <Reveal>
            <div>
              <p className="eyebrow eyebrow-dot">06 — Selected concepts</p>
              <h2 className="font-display" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", marginTop: 24, maxWidth: "18ch" }}>
                Four startups. Four stories worth <i style={{ color: "var(--accent)" }}>remembering</i>.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/work" className="link-arrow">All work<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
          </Reveal>
        </div>

        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 28 }}>
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link to={`/work/${p.slug}`} className="proj-card" data-testid={`home-work-${p.slug}`}>
                <ProjectVisual project={p} />
                <div className="meta">
                  <div>
                    <div className="tag">{p.sector}</div>
                    <div className="title" style={{ marginTop: 10 }}>{p.tagline}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--ink-dim)" }}>
                    <span className="eyebrow">Case</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7"/></svg>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessTeaser() {
  const steps = [
    { n: "01", t: "Find the story", d: "We find what's true, what's different, what should make people care." },
    { n: "02", t: "Shape the experience", d: "We turn that story into structure, pacing, and visual direction." },
    { n: "03", t: "Build the site", d: "Custom design and code. Motion system. Integrations. No templates." },
    { n: "04", t: "Launch with confidence", d: "You leave with a memorable site, ready to grow with you." },
  ];
  return (
    <section className="section" style={{ background: "var(--bg-2)", borderTop: "1px solid var(--line)" }} data-testid="home-process">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-dot">07 — Process</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display" style={{ fontSize: "clamp(40px, 5.5vw, 84px)", marginTop: 24, maxWidth: "22ch" }}>
            Four steps. Founder-led. Built for momentum.
          </h2>
        </Reveal>
        <div style={{ marginTop: 56 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="step">
                <div>
                  <div className="num">{s.n}</div>
                  <div className="eyebrow" style={{ marginTop: 10, color: "var(--ink-dim)" }}>Step</div>
                </div>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <Link to="/process" className="link-arrow">Inside the process<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></Link>
        </div>
      </div>
    </section>
  );
}

function AboutTeaser() {
  return (
    <section className="section" data-testid="home-about">
      <div className="container-x">
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60, alignItems: "start" }} className="about-grid">
          <Reveal>
            <div>
              <p className="eyebrow eyebrow-dot">08 — Studio</p>
              <h2 className="font-display" style={{ fontSize: "clamp(44px, 6vw, 96px)", marginTop: 24, letterSpacing: "-0.025em", lineHeight: 1.02 }}>
                A founder-led studio built around <i style={{ color: "var(--accent)" }}>story</i>, conviction, and execution.
              </h2>
              <Link to="/about" className="link-arrow" style={{ marginTop: 28, display: "inline-flex" }}>
                Meet sandr
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22, color: "var(--ink-dim)", fontSize: 17, lineHeight: 1.7 }}>
              <p>sandr is built by <span style={{ color: "var(--ink)" }}>Sander Lindseth</span> and <span style={{ color: "var(--ink)" }}>Sirin Thamakaison</span> — a designer and a builder who only wanted to make startup websites worth talking about.</p>
              <p>We work with a small handful of founders at a time. We don't scale headcount. We scale taste.</p>
              <p>Most studios add one more generic site to the internet. We build the opposite.</p>
            </div>
          </Reveal>
        </div>
        <style>{`@media (max-width: 860px){ .about-grid { grid-template-columns: 1fr !important; gap: 24px !important; } }`}</style>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell testid="page-home">
      <Hero />
      <Marquee items={["Story-first", "Custom by default", "Founder-led", "Cinematic motion", "Built to be remembered", "Startup-native"]} />
      <Problem />
      <Solution />
      <ServicesSnapshot />
      <WhySandr />
      <Speed />
      <WorkSection />
      <ProcessTeaser />
      <AboutTeaser />
    </PageShell>
  );
}
