import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import PageShell from "@/components/PageShell";
import Reveal, { MaskReveal } from "@/components/Reveal";
import KineticWord from "@/components/KineticWord";
import AmbientOrb from "@/components/AmbientOrb";
import SceneVisual from "@/components/SceneVisual";
import Marquee from "@/components/Marquee";
import { heroChild, easeDrama, ease } from "@/lib/motion";
import { projects } from "@/data/projects";
import { services } from "@/data/services";

/* ============ HERO — asymmetric opening scene ============ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Mouse parallax on big orb
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 16 });
  const sy = useSpring(my, { stiffness: 40, damping: 16 });
  useEffect(() => {
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      mx.set((e.clientX / w - 0.5) * 80);
      my.set((e.clientY / h - 0.5) * 80);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", paddingTop: 140, paddingBottom: 100, overflow: "hidden" }} data-testid="home-hero">
      {/* layered atmosphere */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.45, pointerEvents: "none" }} />
      <motion.div style={{ y: yOrb1, x: sx, position: "absolute", right: "-8%", top: "18%", width: 880, height: 880, borderRadius: "999px", background: "radial-gradient(circle, rgba(74,91,255,0.45) 0%, rgba(139,63,255,0.2) 40%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none", mixBlendMode: "screen" }} />
      <motion.div style={{ y: yOrb2, x: sy, position: "absolute", left: "-10%", bottom: "-10%", width: 620, height: 620, borderRadius: "999px", background: "radial-gradient(circle, rgba(139,63,255,0.35), transparent 65%)", filter: "blur(70px)", pointerEvents: "none", mixBlendMode: "screen" }} />

      {/* top coord strip */}
      <div className="container-x" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", position: "relative", zIndex: 3 }}>
        <Reveal delay={0.5}><span className="coord">001 — Opening scene</span></Reveal>
        <Reveal delay={0.55}><span className="coord">sandr.studio · est. 2024 · Oslo / Bangkok</span></Reveal>
      </div>

      <motion.div className="container-x" style={{ position: "relative", zIndex: 2, y: yText, opacity, marginTop: 80 }}>
        {/* Asymmetric headline — broken across viewport, not centered */}
        <div style={{ position: "relative" }}>
          <div className="display" style={{ fontSize: "clamp(74px, 14vw, 260px)", lineHeight: 0.82, letterSpacing: "-0.045em" }}>
            <MaskReveal delay={0.2}>
              <div>Not just</div>
            </MaskReveal>
            <MaskReveal delay={0.35}>
              <div style={{ paddingLeft: "18vw" }}>
                <span className="display-italic" style={{ color: "var(--cobalt)", fontVariationSettings: "'opsz' 144, 'SOFT' 100, 'WONK' 1" }}>
                  <KineticWord
                    words={["pages.", "presence.", "story.", "belief.", "memory."]}
                    interval={2000}
                  />
                </span>
              </div>
            </MaskReveal>
          </div>

          {/* side-note right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 1.2 }}
            style={{ position: "absolute", right: 0, top: "38%", maxWidth: 280, textAlign: "right", display: "none" }}
            className="hero-note"
          >
            <p className="coord" style={{ color: "var(--cobalt)" }}>▫ Scene auto-cycling</p>
          </motion.div>
        </div>

        {/* caption block — intentionally off-center, left-aligned */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 80 }} className="hero-caption">
          <div />
          <Reveal delay={1.2} blur>
            <p style={{ color: "var(--ink-2)", fontSize: 19, lineHeight: 1.55, maxWidth: 520 }}>
              sandr creates cinematic, full-stack startup websites that turn ideas into <span style={{ color: "var(--ink)", fontStyle: "italic" }}>presence</span>, trust, and momentum.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn btn-primary" data-testid="hero-cta-primary">
                Start your build
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
              </Link>
              <Link to="/work" className="btn btn-ghost" data-testid="hero-cta-secondary">Enter the work</Link>
            </div>
          </Reveal>
        </div>
        <style>{`@media(max-width: 860px){ .hero-caption { grid-template-columns: 1fr !important; gap: 24px !important; } }`}</style>
      </motion.div>

      {/* bottom strip — scroll hint + metadata */}
      <div className="container-x" style={{ position: "absolute", left: 0, right: 0, bottom: 36, display: "flex", justifyContent: "space-between", alignItems: "end", zIndex: 3, flexWrap: "wrap", gap: 12 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <span className="coord" style={{ color: "var(--cobalt)" }}>— SCROLL TO CONTINUE</span>
          <motion.div
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 60, background: "linear-gradient(180deg, var(--cobalt), transparent)" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{ display: "flex", gap: 40, flexWrap: "wrap" }}
        >
          <div><div className="coord" style={{ color: "var(--ink-mute)" }}>Studio</div><div className="coord" style={{ color: "var(--ink)", marginTop: 4 }}>Founder-led</div></div>
          <div><div className="coord" style={{ color: "var(--ink-mute)" }}>Velocity</div><div className="coord" style={{ color: "var(--ink)", marginTop: 4 }}>48h / 2wk</div></div>
          <div><div className="coord" style={{ color: "var(--ink-mute)" }}>Serving</div><div className="coord" style={{ color: "var(--ink)", marginTop: 4 }}>Pre-seed → A</div></div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============ THESIS — typographic scene ============ */
function Thesis() {
  return (
    <section className="section" data-testid="home-thesis" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="container-x">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <Reveal><span className="coord">002 — Thesis</span></Reveal>
          <Reveal delay={0.1}><span className="coord">What we believe, out loud</span></Reveal>
        </div>

        <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          <MaskReveal>
            <div className="display" style={{ fontSize: "clamp(56px, 10vw, 180px)", lineHeight: 0.9, letterSpacing: "-0.04em", color: "var(--ink-mute)" }}>
              Most startup sites <span style={{ textDecoration: "line-through", textDecorationThickness: 2 }}>say everything</span>
            </div>
          </MaskReveal>
          <MaskReveal delay={0.15}>
            <div className="display" style={{ fontSize: "clamp(56px, 10vw, 180px)", lineHeight: 0.9, letterSpacing: "-0.04em", textAlign: "right", color: "var(--ink)" }}>
              and mean <span className="display-italic" style={{ color: "var(--violet)" }}>nothing</span>.
            </div>
          </MaskReveal>
          <MaskReveal delay={0.35}>
            <div className="display" style={{ fontSize: "clamp(56px, 10vw, 180px)", lineHeight: 0.9, letterSpacing: "-0.04em", marginTop: 40, paddingLeft: "6vw" }}>
              sandr builds <span className="display-italic" style={{ color: "var(--cobalt)" }}>the opposite</span>.
            </div>
          </MaskReveal>
        </div>
      </div>
    </section>
  );
}

/* ============ NARRATIVE VALUE — three moments, NOT cards ============ */
function NarrativeValue() {
  const beats = [
    { k: "001", t: "Story builds trust.", s: "Before anyone compares, they want to believe. Story is the belief.", align: "left" },
    { k: "002", t: "Story creates memory.", s: "A feature list dies in a tab. A story follows people home.", align: "right" },
    { k: "003", t: "Story earns attention.", s: "The internet is loud. Story is how you make it quiet long enough to hear you.", align: "left" },
  ];
  return (
    <section className="section" data-testid="home-narrative" style={{ position: "relative" }}>
      <AmbientOrb color="var(--cobalt)" size={520} blur={100} opacity={0.22} style={{ right: "-8%", top: "10%" }} />
      <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
        <Reveal><span className="coord">003 — Why story, commercially</span></Reveal>
        <div style={{ marginTop: 36 }}>
          {beats.map((b, i) => (
            <div key={b.k} style={{ borderTop: "1px solid var(--line)", paddingTop: 56, paddingBottom: 56, display: "grid", gridTemplateColumns: "100px 1fr 1fr", gap: 40, alignItems: "baseline" }} className="beat-row">
              <Reveal delay={i * 0.06}>
                <div className="coord" style={{ color: "var(--cobalt)" }}>{b.k}</div>
              </Reveal>
              <Reveal delay={i * 0.06 + 0.06}>
                <div className="display" style={{ fontSize: "clamp(44px, 6vw, 100px)", lineHeight: 0.95, letterSpacing: "-0.03em", textAlign: b.align }}>
                  {b.t.split(" ").slice(0, -1).join(" ")} <span className="display-italic" style={{ color: i === 1 ? "var(--violet)" : i === 2 ? "var(--amber)" : "var(--cobalt)" }}>{b.t.split(" ").slice(-1)[0]}</span>
                </div>
              </Reveal>
              <Reveal delay={i * 0.06 + 0.12}>
                <p style={{ color: "var(--ink-dim)", fontSize: 17, lineHeight: 1.7, maxWidth: 420, marginLeft: b.align === "left" ? "auto" : 0 }}>{b.s}</p>
              </Reveal>
            </div>
          ))}
        </div>
        <style>{`@media(max-width:860px){ .beat-row { grid-template-columns: 1fr !important; gap: 14px !important; } .beat-row p { margin: 0 !important; } .beat-row .display { text-align: left !important; } }`}</style>
      </div>
    </section>
  );
}

/* ============ OFFER — asymmetric editorial list, not cards ============ */
function Offer() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--line)" }} data-testid="home-services">
      <div className="container-x">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <Reveal><span className="coord">004 — The offer, without packaging</span></Reveal>
          <Reveal delay={0.08}>
            <Link to="/services" className="btn-link">
              All services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </Reveal>
        </div>

        <div style={{ marginTop: 60 }}>
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: i % 2 ? "1fr 120px 2fr 180px" : "120px 2fr 1fr 180px",
                  gap: 28,
                  padding: "40px 0",
                  borderTop: "1px solid var(--line)",
                  alignItems: "baseline",
                  position: "relative",
                }}
                className="offer-row"
              >
                {i % 2 === 0 ? (
                  <>
                    <div className="coord" style={{ color: "var(--cobalt)" }}>{s.num}</div>
                    <div className="display" style={{ fontSize: "clamp(36px, 5vw, 76px)", lineHeight: 1, letterSpacing: "-0.025em", fontStyle: i === 2 ? "italic" : "normal" }}>{s.name}</div>
                    <p style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
                    <div className="coord" style={{ textAlign: "right", color: "var(--ink)" }}>{s.priceFrom}</div>
                  </>
                ) : (
                  <>
                    <p style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7, textAlign: "right" }}>{s.desc}</p>
                    <div className="coord" style={{ color: "var(--violet)" }}>{s.num}</div>
                    <div className="display" style={{ fontSize: "clamp(36px, 5vw, 76px)", lineHeight: 1, letterSpacing: "-0.025em", fontStyle: "italic" }}>{s.name}</div>
                    <div className="coord" style={{ textAlign: "right", color: "var(--ink)" }}>{s.priceFrom}</div>
                  </>
                )}
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
        <style>{`@media(max-width: 900px){ .offer-row { grid-template-columns: 1fr !important; gap: 10px !important; padding: 28px 0 !important; } .offer-row p { text-align: left !important; } .offer-row .coord { text-align: left !important; } }`}</style>
      </div>
    </section>
  );
}

/* ============ WORK — immersive alternating chapter spreads ============ */
function WorkChapters() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--line)", paddingTop: 180 }} data-testid="home-work">
      <div className="container-x" style={{ marginBottom: 120 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <Reveal><span className="coord">005 — Selected scenes</span></Reveal>
          <Reveal delay={0.08}>
            <Link to="/work" className="btn-link">
              All work
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </Reveal>
        </div>
        <MaskReveal delay={0.1}>
          <h2 className="display" style={{ fontSize: "clamp(60px, 9vw, 160px)", marginTop: 36, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
            Four startups. Four <span className="display-italic" style={{ color: "var(--cobalt)" }}>chapters</span>.
          </h2>
        </MaskReveal>
      </div>

      {projects.map((p, i) => {
        const flipped = i % 2 === 1;
        return (
          <div key={p.slug} className="container-x" style={{ marginBottom: 140 }}>
            <Link to={`/work/${p.slug}`} data-testid={`home-work-${p.slug}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ display: "grid", gridTemplateColumns: flipped ? "1fr 1.4fr" : "1.4fr 1fr", gap: 60, alignItems: "center" }} className="chapter-row">
                <div style={{ order: flipped ? 2 : 1 }}>
                  <Reveal delay={0.05}>
                    <div style={{ display: "flex", gap: 16, alignItems: "baseline", color: "var(--ink-dim)" }}>
                      <span className="coord" style={{ color: "var(--cobalt)" }}>{p.index}</span>
                      <span className="coord">{p.sector}</span>
                    </div>
                  </Reveal>
                  <MaskReveal delay={0.1}>
                    <h3 className="display" style={{ fontSize: "clamp(44px, 6vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: 20 }}>
                      {p.client}
                    </h3>
                  </MaskReveal>
                  <Reveal delay={0.2}>
                    <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 440, fontStyle: "italic" }}>
                      “{p.tagline}”
                    </p>
                  </Reveal>
                  <Reveal delay={0.26}>
                    <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.7, color: "var(--ink-dim)", maxWidth: 440 }}>
                      {p.summary}
                    </p>
                  </Reveal>
                  <Reveal delay={0.32}>
                    <div className="btn-link" style={{ marginTop: 36 }}>
                      Read the chapter
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
                    </div>
                  </Reveal>
                </div>

                <motion.div
                  style={{ order: flipped ? 1 : 2, position: "relative" }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.8, ease }}
                >
                  <MaskReveal delay={0.1}>
                    <SceneVisual project={p} />
                  </MaskReveal>
                </motion.div>
              </div>
            </Link>
            <style>{`@media(max-width: 900px){ .chapter-row { grid-template-columns: 1fr !important; gap: 30px !important; } .chapter-row > div:first-child { order: 1 !important; } .chapter-row > div:last-child { order: 2 !important; } }`}</style>
          </div>
        );
      })}
    </section>
  );
}

/* ============ PROCESS — new v2 copy, asymmetric timeline ============ */
function ProcessTeaser() {
  const steps = [
    { n: "I", t: "Find the story", d: "What's true, what's different, what should make people care." },
    { n: "II", t: "Shape the feeling", d: "Turn that story into structure, pacing, visual direction." },
    { n: "III", t: "Build the experience", d: "Custom design and code. Motion, integrations, performance." },
    { n: "IV", t: "Launch with weight", d: "A credible, memorable site — ready to grow with you." },
  ];
  return (
    <section className="section" style={{ borderTop: "1px solid var(--line)", position: "relative" }} data-testid="home-process">
      <AmbientOrb color="var(--violet)" size={600} blur={100} opacity={0.22} style={{ left: "-10%", bottom: "-10%" }} />
      <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <Reveal><span className="coord">006 — The way of working</span></Reveal>
          <Reveal delay={0.08}>
            <Link to="/process" className="btn-link">
              Inside the process
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </Reveal>
        </div>
        <MaskReveal delay={0.1}>
          <h2 className="display" style={{ fontSize: "clamp(60px, 9vw, 160px)", marginTop: 36, lineHeight: 0.9, letterSpacing: "-0.04em", maxWidth: "16ch" }}>
            Four moves. <span className="display-italic" style={{ color: "var(--cobalt)" }}>Founder-led.</span>
          </h2>
        </MaskReveal>

        <div style={{ marginTop: 100, position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg, transparent, var(--line-2) 8%, var(--line-2) 92%, transparent)", transform: "translateX(-50%)" }} className="ts-line" />
          {steps.map((s, i) => {
            const right = i % 2 === 1;
            return (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "1fr 80px 1fr", gap: 20, padding: "60px 0", alignItems: "start" }} className="ts-row">
                <div style={{ textAlign: "right", opacity: right ? 0 : 1 }}>
                  {!right && (
                    <>
                      <Reveal delay={i * 0.06}>
                        <div className="coord" style={{ color: "var(--cobalt)" }}>Step {s.n}</div>
                      </Reveal>
                      <Reveal delay={i * 0.06 + 0.08}>
                        <h3 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 64px)", lineHeight: 1, letterSpacing: "-0.025em", marginTop: 10 }}>{s.t}</h3>
                      </Reveal>
                      <Reveal delay={i * 0.06 + 0.14}>
                        <p style={{ marginTop: 16, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7, marginLeft: "auto", maxWidth: 360 }}>{s.d}</p>
                      </Reveal>
                    </>
                  )}
                </div>
                <Reveal delay={i * 0.06 + 0.1} style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 99, background: "var(--bg-2)", border: "1px solid var(--cobalt)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cobalt)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.14em", boxShadow: "0 0 20px var(--cobalt-glow)" }}>
                    {s.n}
                  </div>
                </Reveal>
                <div style={{ opacity: right ? 1 : 0 }}>
                  {right && (
                    <>
                      <Reveal delay={i * 0.06}>
                        <div className="coord" style={{ color: "var(--cobalt)" }}>Step {s.n}</div>
                      </Reveal>
                      <Reveal delay={i * 0.06 + 0.08}>
                        <h3 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 64px)", lineHeight: 1, letterSpacing: "-0.025em", marginTop: 10 }}>{s.t}</h3>
                      </Reveal>
                      <Reveal delay={i * 0.06 + 0.14}>
                        <p style={{ marginTop: 16, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7, maxWidth: 360 }}>{s.d}</p>
                      </Reveal>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <style>{`@media(max-width: 900px){ .ts-row { grid-template-columns: 40px 1fr !important; gap: 20px !important; padding: 28px 0 !important; } .ts-row > div:first-child { display: none !important; } .ts-row > div:last-child { opacity: 1 !important; } .ts-row > div:nth-child(2) { order: 1; } .ts-line { left: 20px !important; } }`}</style>
      </div>
    </section>
  );
}

/* ============ ABOUT TEASER ============ */
function AboutTeaser() {
  return (
    <section className="section" style={{ borderTop: "1px solid var(--line)" }} data-testid="home-about">
      <div className="container-x">
        <Reveal><span className="coord">007 — The studio</span></Reveal>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 60 }} className="about-grid">
          <MaskReveal>
            <h2 className="display" style={{ fontSize: "clamp(48px, 7vw, 120px)", lineHeight: 0.92, letterSpacing: "-0.035em" }}>
              Two people. One <span className="display-italic" style={{ color: "var(--cobalt)" }}>obsession</span>: making startup sites <span className="display-italic" style={{ color: "var(--violet)" }}>worth remembering</span>.
            </h2>
          </MaskReveal>
          <Reveal delay={0.2}>
            <div style={{ color: "var(--ink-dim)", fontSize: 17, lineHeight: 1.75, display: "flex", flexDirection: "column", gap: 22, maxWidth: 480 }}>
              <p>Founder-led by <span style={{ color: "var(--ink)" }}>Sander Lindseth</span> and <span style={{ color: "var(--ink)" }}>Sirin Thamakaison</span>. A designer and a builder who refused to make one more forgettable startup site.</p>
              <p>We don't scale headcount. We scale taste. Fewer projects, sharper work.</p>
              <Link to="/about" className="btn-link" style={{ alignSelf: "start", marginTop: 10 }}>
                Meet the studio
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
              </Link>
            </div>
          </Reveal>
        </div>
        <style>{`@media(max-width: 900px){ .about-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }`}</style>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell testid="page-home">
      <Hero />
      <Marquee items={["Story-first", "Anti-template", "Cinematic motion", "Founder-led", "Built to be remembered", "Startup-native"]} accent={false} />
      <Thesis />
      <NarrativeValue />
      <Offer />
      <WorkChapters />
      <ProcessTeaser />
      <AboutTeaser />
    </PageShell>
  );
}
