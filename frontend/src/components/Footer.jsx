import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import Reveal, { MaskReveal } from "@/components/Reveal";
import SandText from "@/components/SandText";
import EggHotspot from "@/components/EggHotspot";

export default function Footer() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  useEffect(() => {
    const onMove = (e) => {
      const rect = document.querySelector(".site-footer")?.getBoundingClientRect();
      if (!rect) return;
      mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 60);
      my.set(((e.clientY - rect.top) / rect.height - 0.5) * 60);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <footer className="site-footer">
      <motion.div style={{ position: "absolute", left: "-8%", top: "-10%", width: 720, height: 720, borderRadius: "999px", background: "radial-gradient(circle, rgba(168,198,255,0.25), transparent 65%)", filter: "blur(120px)", pointerEvents: "none", mixBlendMode: "screen", x: sx, y: sy }} />
      <motion.div style={{ position: "absolute", right: "-4%", bottom: "-10%", width: 620, height: 620, borderRadius: "999px", background: "radial-gradient(circle, rgba(139,63,255,0.22), transparent 65%)", filter: "blur(120px)", pointerEvents: "none", mixBlendMode: "screen", x: sx, y: sy }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }} />

      <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
        <MaskReveal>
          <div className="display" style={{ fontSize: "clamp(56px, 11vw, 200px)", lineHeight: 0.86, letterSpacing: "-0.04em" }}>
            <SandText text="Make them stop." strength={22} radius={140} />
          </div>
        </MaskReveal>
        <MaskReveal delay={0.12}>
          <div className="display display-italic" style={{ fontSize: "clamp(56px, 11vw, 200px)", lineHeight: 0.86, letterSpacing: "-0.04em", color: "var(--silver-blue)", marginTop: 6 }}>
            <SandText text="Make them feel." strength={22} radius={140} />
          </div>
        </MaskReveal>
        <MaskReveal delay={0.24}>
          <div className="display" style={{ fontSize: "clamp(56px, 11vw, 200px)", lineHeight: 0.86, letterSpacing: "-0.04em", color: "var(--amber)", marginTop: 6 }}>
            <SandText text="Make them remember." strength={22} radius={140} />
          </div>
        </MaskReveal>

        <Reveal delay={0.4}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 80 }}>
            <Link to="/contact" className="btn btn-primary" data-testid="footer-cta-primary" data-cursor data-cursor-label="Start">
              Start your build
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
            <Link to="/work" className="btn btn-ghost" data-testid="footer-cta-secondary" data-cursor data-cursor-label="Enter">Enter the work</Link>
          </div>
        </Reveal>

        <div className="footer-cols">
          <div className="col">
            <h5>sandr.studio</h5>
            <p style={{ color: "var(--ink-dim)", maxWidth: 460, fontSize: 15, lineHeight: 1.7 }}>
              A story-first web studio for startups. Founder-led by <EggHotspot message="Sander probably wanted this sharper."><span style={{ color: "var(--ink)", borderBottom: "1px dashed var(--line-3)" }}>Sander Lindseth</span></EggHotspot> &amp; <EggHotspot message="Sirin made sure it still loads fast."><span style={{ color: "var(--ink)", borderBottom: "1px dashed var(--line-3)" }}>Sirin Thamakaison</span></EggHotspot>.
            </p>
          </div>
          <div className="col">
            <h5>Studio</h5>
            <Link to="/work">Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/process">Process</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="col">
            <h5>Contact</h5>
            <Link to="/contact">Start a project</Link>
            <a href="mailto:hello@sandr.studio">hello@sandr.studio</a>
          </div>
          <div className="col">
            <h5>Elsewhere</h5>
            <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
            <a href="#" onClick={(e) => e.preventDefault()}>X / Twitter</a>
          </div>
        </div>

        <div className="hairline" style={{ marginTop: 80, marginBottom: 28 }} />
        <div style={{ display: "flex", justifyContent: "space-between", color: "var(--ink-mute)", flexWrap: "wrap", gap: 12 }}>
          <span className="coord">© {new Date().getFullYear()} sandr studio</span>
          <EggHotspot message="Generic was rejected here."><span className="coord" style={{ borderBottom: "1px dashed var(--line-2)" }}>v3 — alive</span></EggHotspot>
          <span className="coord">Built by two humans on purpose</span>
        </div>
      </div>
    </footer>
  );
}
