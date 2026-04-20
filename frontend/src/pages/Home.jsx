import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import PageShell from "@/components/PageShell";
import Reveal, { MaskReveal } from "@/components/Reveal";
import SandText from "@/components/SandText";
import EggHotspot from "@/components/EggHotspot";
import { heroChild, ease } from "@/lib/motion";
import { services } from "@/data/services";

/* ============ HERO — cinematic opening scene with sand text ============ */
function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, 220]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 30, damping: 18 });
  const sy = useSpring(my, { stiffness: 30, damping: 18 });
  useEffect(() => {
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 90);
      my.set((e.clientY / window.innerHeight - 0.5) * 60);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section ref={ref} style={{ position: "relative", paddingTop: 140, paddingBottom: 100, overflow: "hidden" }} data-testid="home-hero">
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.45, pointerEvents: "none" }} />
      <motion.div style={{ y: yOrb1, x: sx, position: "absolute", right: "-10%", top: "10%", width: 900, height: 900, borderRadius: "999px", background: "radial-gradient(circle, rgba(168,198,255,0.38) 0%, rgba(139,63,255,0.18) 45%, transparent 72%)", filter: "blur(60px)", pointerEvents: "none", mixBlendMode: "screen" }} />
      <motion.div style={{ y: yOrb2, x: sy, position: "absolute", left: "-8%", bottom: "-5%", width: 660, height: 660, borderRadius: "999px", background: "radial-gradient(circle, rgba(139,63,255,0.32), transparent 68%)", filter: "blur(80px)", pointerEvents: "none", mixBlendMode: "screen" }} />

      <motion.div className="container-x" style={{ position: "relative", zIndex: 2, y }}>
        <MaskReveal delay={0.1}>
          <div className="display display-heavy" style={{ fontSize: "clamp(44px, 7.5vw, 130px)", lineHeight: 0.92, letterSpacing: "-0.04em" }}>
            <SandText text="Story-driven websites" radius={180} strength={28} />
          </div>
        </MaskReveal>
        <MaskReveal delay={0.25}>
          <div className="display" style={{ fontSize: "clamp(44px, 7.5vw, 130px)", lineHeight: 0.92, letterSpacing: "-0.04em", marginTop: 2 }}>
            <SandText text="for startups that" radius={180} strength={28} />
          </div>
        </MaskReveal>
        <MaskReveal delay={0.4}>
          <div className="display display-italic" style={{ fontSize: "clamp(44px, 7.5vw, 130px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "var(--silver-blue)", marginTop: 2 }}>
            <SandText text="refuse to look generic." radius={200} strength={34} />
          </div>
        </MaskReveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginTop: 72 }} className="hero-cap">
          <div />
          <Reveal delay={0.85} blur>
            <p style={{ color: "var(--ink-2)", fontSize: 19, lineHeight: 1.55, maxWidth: 520 }}>
              sandr creates cinematic, full-stack startup websites that turn ideas into presence, trust, and momentum. Two weeks. Custom by default. Built to be remembered.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link to="/contact" className="btn btn-primary" data-testid="hero-cta-primary" data-cursor data-cursor-label="Start">
                Start your build
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
              </Link>
              <Link to="/work" className="btn btn-ghost" data-testid="hero-cta-secondary" data-cursor data-cursor-label="Enter">Enter the world</Link>
            </div>
          </Reveal>
        </div>
        <style>{`@media(max-width:900px){ .hero-cap { grid-template-columns: 1fr !important; gap: 24px !important; } }`}</style>

        <div style={{ marginTop: 100, display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16 }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="coord" style={{ color: "var(--silver-blue)" }}>— MOVE OVER THE TEXT</span>
            <motion.div animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} style={{ width: 1, height: 56, background: "linear-gradient(180deg, var(--silver-blue), transparent)" }} />
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.3 }} className="coord" style={{ color: "var(--ink-mute)" }}>
            sandr.studio · 2026 · <EggHotspot message="Built somewhere between oslo & bangkok."><span style={{ borderBottom: "1px dashed var(--line-2)" }}>OSL / BKK</span></EggHotspot>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============ THESIS ============ */
function Thesis() {
  return (
    <section style={{ padding: "200px 0", borderTop: "1px solid var(--line)", position: "relative" }} data-testid="home-thesis">
      <div className="container-x">
        <MaskReveal>
          <div className="display" style={{ fontSize: "clamp(52px, 9vw, 160px)", lineHeight: 0.94, letterSpacing: "-0.04em", color: "var(--ink-mute)" }}>
            Most startup websites <span style={{ textDecoration: "line-through", textDecorationThickness: 2 }}>explain everything</span>
          </div>
        </MaskReveal>
        <MaskReveal delay={0.15}>
          <div className="display" style={{ fontSize: "clamp(52px, 9vw, 160px)", lineHeight: 0.94, letterSpacing: "-0.04em", textAlign: "right" }}>
            and make you feel <span className="display-italic" style={{ color: "var(--violet)" }}>nothing</span>.
          </div>
        </MaskReveal>
        <MaskReveal delay={0.35}>
          <div className="display" style={{ fontSize: "clamp(52px, 9vw, 160px)", lineHeight: 0.94, letterSpacing: "-0.04em", marginTop: 50, paddingLeft: "8vw" }}>
            sandr builds the <span className="display-italic" style={{ color: "var(--silver-blue)" }}>opposite</span>.
          </div>
        </MaskReveal>
      </div>
    </section>
  );
}

/* ============ STORY VALUE — why story, commercially ============ */
function StoryValue() {
  const beats = [
    { k: "01", title: "Story builds trust", body: "Before anyone compares features, they need to believe. Story is what makes them believe." },
    { k: "02", title: "Story creates memory", body: "A feature list dies in a tab. A story follows people home and comes back the next day." },
    { k: "03", title: "Story earns attention", body: "The internet is loud. Story is how you make it quiet long enough to hear you." },
  ];
  return (
    <section style={{ padding: "140px 0", position: "relative" }} data-testid="home-narrative">
      <div className="container-x">
        <MaskReveal>
          <h2 className="display" style={{ fontSize: "clamp(48px, 7.5vw, 130px)", lineHeight: 0.9, letterSpacing: "-0.035em", maxWidth: "16ch" }}>
            Why story <span className="display-italic" style={{ color: "var(--silver-blue)" }}>wins</span>.
          </h2>
        </MaskReveal>
        <div style={{ marginTop: 110 }}>
          {beats.map((b, i) => (
            <div key={b.k} style={{ borderTop: "1px solid var(--line)", padding: "64px 0", display: "grid", gridTemplateColumns: "80px 1.3fr 1.5fr", gap: 40, alignItems: "baseline" }} className="sv-row">
              <Reveal delay={i * 0.04}>
                <div className="coord" style={{ color: "var(--silver-blue)" }}>{b.k}</div>
              </Reveal>
              <Reveal delay={i * 0.04 + 0.06}>
                <h3 className="display" style={{ fontSize: "clamp(40px, 5.5vw, 92px)", lineHeight: 0.96, letterSpacing: "-0.03em" }}>
                  {b.title}
                </h3>
              </Reveal>
              <Reveal delay={i * 0.04 + 0.12}>
                <p style={{ color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7, maxWidth: 520 }}>{b.body}</p>
              </Reveal>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
        <style>{`@media(max-width:900px){ .sv-row { grid-template-columns: 1fr !important; gap: 12px !important; padding: 36px 0 !important; } }`}</style>
      </div>
    </section>
  );
}

/* ============ OFFER — premium editorial list ============ */
function Offer() {
  return (
    <section style={{ padding: "140px 0", borderTop: "1px solid var(--line)" }} data-testid="home-services">
      <div className="container-x">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 20 }}>
          <MaskReveal>
            <h2 className="display" style={{ fontSize: "clamp(52px, 8vw, 140px)", lineHeight: 0.9, letterSpacing: "-0.04em", maxWidth: "16ch" }}>
              What <span className="display-italic" style={{ color: "var(--silver-blue)" }}>we build</span>.
            </h2>
          </MaskReveal>
          <Reveal delay={0.1}>
            <Link to="/services" className="btn-link" data-cursor data-cursor-label="Open">
              All services
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </Reveal>
        </div>

        <div style={{ marginTop: 80 }}>
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.05}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1.2fr 2fr 180px", gap: 28, padding: "48px 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }} className="offer-row">
                <div className="coord" style={{ color: "var(--silver-blue)" }}>{s.num}</div>
                <div className="display" style={{ fontSize: "clamp(32px, 4.5vw, 72px)", lineHeight: 1, letterSpacing: "-0.025em" }}>{s.name}</div>
                <p style={{ color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7 }}>{s.desc}</p>
                <div className="coord" style={{ textAlign: "right", color: "var(--ink)" }}>{s.priceFrom}</div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
        </div>
        <style>{`@media(max-width: 900px){ .offer-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 28px 0 !important; } .offer-row .coord:last-child { text-align: left !important; } }`}</style>
      </div>
    </section>
  );
}

/* ============ VELOCITY + PROCESS ============ */
function Velocity() {
  const tiers = [
    { t: "48 hrs", l: "Landing page" },
    { t: "1 week", l: "First full draft" },
    { t: "2 weeks", l: "Live startup site" },
  ];
  const moves = [
    { n: "I", t: "Find the story" },
    { n: "II", t: "Shape the feeling" },
    { n: "III", t: "Build the experience" },
    { n: "IV", t: "Launch with weight" },
  ];
  return (
    <section style={{ padding: "160px 0", borderTop: "1px solid var(--line)", position: "relative" }} data-testid="home-process">
      <div className="container-x">
        <MaskReveal>
          <h2 className="display" style={{ fontSize: "clamp(52px, 8vw, 140px)", lineHeight: 0.9, letterSpacing: "-0.04em", maxWidth: "18ch" }}>
            Fast enough to matter. <span className="display-italic" style={{ color: "var(--silver-blue)" }}>Sharp</span> enough to last.
          </h2>
        </MaskReveal>

        <div style={{ marginTop: 100, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 0, border: "1px solid var(--line)" }}>
          {tiers.map((tier, i, arr) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{ padding: 48, borderRight: i < arr.length - 1 ? "1px solid var(--line)" : "none", background: i === 1 ? "var(--bg-2)" : "transparent", height: "100%" }}>
                <div className="display display-heavy" style={{ fontSize: "clamp(64px, 8vw, 120px)", color: "var(--silver-blue)", lineHeight: 1, letterSpacing: "-0.03em" }}>{tier.t}</div>
                <div style={{ marginTop: 14, fontSize: 17, color: "var(--ink)" }}>{tier.l}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ marginTop: 120, display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }} className="vel-grid">
          <Reveal>
            <h3 className="display" style={{ fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
              Four <span className="display-italic" style={{ color: "var(--silver-blue)" }}>moves</span>.
            </h3>
            <Link to="/process" className="btn-link" style={{ marginTop: 24, display: "inline-flex" }} data-cursor data-cursor-label="Open">
              Inside the process
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </Reveal>
          <div>
            {moves.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.06}>
                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 28, padding: "32px 0", borderTop: "1px solid var(--line)", alignItems: "baseline" }}>
                  <div className="display display-italic" style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "var(--silver-blue)", lineHeight: 1 }}>{m.n}</div>
                  <div className="display" style={{ fontSize: "clamp(26px, 3.4vw, 46px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}>{m.t}</div>
                </div>
              </Reveal>
            ))}
            <div style={{ borderTop: "1px solid var(--line)" }} />
          </div>
        </div>
        <style>{`@media(max-width:900px){ .vel-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
      </div>
    </section>
  );
}

/* ============ ENVIRONMENT MOMENT — signature interactive manifesto ============ */
function EnvironmentMoment() {
  return (
    <section style={{ padding: "220px 0", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }} data-testid="home-environment">
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", left: "50%", top: "50%", width: 1100, height: 1100, transform: "translate(-50%, -50%)", background: "radial-gradient(circle, rgba(168,198,255,0.16), rgba(139,63,255,0.08) 40%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none", mixBlendMode: "screen" }}
      />
      <div className="container-x" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Reveal>
          <div className="coord" style={{ color: "var(--silver-blue)" }}>— A live room, not a landing page</div>
        </Reveal>
        <MaskReveal delay={0.1}>
          <div className="display" style={{ fontSize: "clamp(60px, 11vw, 200px)", lineHeight: 0.9, letterSpacing: "-0.045em", marginTop: 40, maxWidth: "18ch", margin: "40px auto 0" }}>
            <SandText text="Your startup should feel like" radius={200} strength={36} />
          </div>
        </MaskReveal>
        <MaskReveal delay={0.24}>
          <div className="display display-italic" style={{ fontSize: "clamp(70px, 13vw, 240px)", lineHeight: 0.88, letterSpacing: "-0.045em", color: "var(--silver-blue)", marginTop: 10 }}>
            <SandText text="something." radius={220} strength={40} />
          </div>
        </MaskReveal>
        <Reveal delay={0.4}>
          <p style={{ marginTop: 60, color: "var(--ink-dim)", fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: "60px auto 0" }}>
            Move your cursor across the words. sandr builds sites that react to you, reward attention, and reward exploration.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ CLOSING CTA ============ */
function ClosingCTA() {
  return (
    <section style={{ padding: "180px 0 60px", borderTop: "1px solid var(--line)", position: "relative" }} data-testid="home-final-cta">
      <div className="container-x">
        <MaskReveal>
          <div className="display" style={{ fontSize: "clamp(56px, 10vw, 180px)", lineHeight: 0.9, letterSpacing: "-0.04em", maxWidth: "16ch" }}>
            The internet doesn't need another <span className="display-italic" style={{ color: "var(--ink-mute)" }}>generic</span> site.
          </div>
        </MaskReveal>
        <MaskReveal delay={0.15}>
          <div className="display" style={{ fontSize: "clamp(56px, 10vw, 180px)", lineHeight: 0.9, letterSpacing: "-0.04em", textAlign: "right" }}>
            It needs one people <span className="display-italic" style={{ color: "var(--silver-blue)" }}>remember</span>.
          </div>
        </MaskReveal>
        <Reveal delay={0.3}>
          <div style={{ marginTop: 80, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <p style={{ color: "var(--ink-dim)", fontSize: 17, lineHeight: 1.7, maxWidth: 480 }}>
              sandr takes on a small handful of projects at a time. If this is the year your startup stops looking like a template, start your build.
            </p>
            <Link to="/contact" className="btn btn-primary" data-cursor data-cursor-label="Start">
              Start your build
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <PageShell testid="page-home">
      <Hero />
      <Thesis />
      <StoryValue />
      <Offer />
      <Velocity />
      <EnvironmentMoment />
      <ClosingCTA />
    </PageShell>
  );
}
