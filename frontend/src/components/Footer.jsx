import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal, { MaskReveal } from "@/components/Reveal";
import KineticWord from "@/components/KineticWord";
import AmbientOrb from "@/components/AmbientOrb";

export default function Footer() {
  return (
    <footer className="site-footer">
      <AmbientOrb color="var(--cobalt)" size={720} blur={120} opacity={0.35} style={{ left: "-10%", top: "-10%" }} />
      <AmbientOrb color="var(--violet)" size={620} blur={120} opacity={0.3} style={{ right: "-5%", bottom: "-10%" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }} />

      <div className="container-x" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12 }}>
          <Reveal><span className="coord">— Closing scene · sandr.studio</span></Reveal>
          <Reveal delay={0.08}><span className="coord">{new Date().getFullYear()} · Made to be remembered</span></Reveal>
        </div>

        <MaskReveal delay={0.1}>
          <div className="display" style={{ fontSize: "clamp(60px, 12vw, 220px)", marginTop: 48, lineHeight: 0.86, letterSpacing: "-0.04em" }}>
            Make them <span className="display-italic" style={{ color: "var(--cobalt)" }}>stop</span>.
          </div>
        </MaskReveal>
        <MaskReveal delay={0.2}>
          <div className="display" style={{ fontSize: "clamp(60px, 12vw, 220px)", marginTop: 8, lineHeight: 0.86, letterSpacing: "-0.04em" }}>
            Make them <span className="display-italic" style={{ color: "var(--violet)" }}>feel</span>.
          </div>
        </MaskReveal>
        <MaskReveal delay={0.3}>
          <div className="display" style={{ fontSize: "clamp(60px, 12vw, 220px)", marginTop: 8, lineHeight: 0.86, letterSpacing: "-0.04em" }}>
            Make them <span className="display-italic" style={{ color: "var(--amber)" }}>remember</span>.
          </div>
        </MaskReveal>

        <Reveal delay={0.4}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 70 }}>
            <Link to="/contact" className="btn btn-primary" data-testid="footer-cta-primary">
              Start your build
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
            <Link to="/work" className="btn btn-ghost" data-testid="footer-cta-secondary">Enter the work</Link>
          </div>
        </Reveal>

        <div className="footer-cols">
          <div className="col">
            <h5>sandr.studio</h5>
            <p style={{ color: "var(--ink-dim)", maxWidth: 460, fontSize: 15, lineHeight: 1.7 }}>
              A story-first web studio for startups. Founder-led by Sander Lindseth &amp; Sirin Thamakaison. Made in quiet rooms, shipped with noise.
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
          <span className="coord">© {new Date().getFullYear()} — sandr studio</span>
          <span className="coord">Built by <KineticWord words={["builders with taste", "a studio, not a factory", "two people", "humans on purpose"]} /></span>
          <span className="coord">v2 — anti-template</span>
        </div>
      </div>
    </footer>
  );
}
