import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow eyebrow-dot" style={{ marginBottom: 22 }}>Start your build</p>
          <div className="big">
            The internet does not<br />
            need another <i style={{ color: "var(--accent)" }}>generic</i> site.
          </div>
          <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-primary" data-testid="footer-cta-primary">
              Start your build
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
            <Link to="/work" className="btn btn-ghost" data-testid="footer-cta-secondary">See selected work</Link>
          </div>
        </motion.div>

        <div className="cols">
          <div className="col">
            <h5>sandr.studio</h5>
            <p style={{ color: "var(--ink-dim)", maxWidth: 420, fontSize: 14, lineHeight: 1.7 }}>
              A story-first web studio for startups. Founder-led by Sander Lindseth &amp; Sirin Thamakaison.
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

        <div style={{ marginTop: 60, display: "flex", justifyContent: "space-between", color: "var(--ink-mute)", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", flexWrap: "wrap", gap: 12 }}>
            <span>© {new Date().getFullYear()} sandr studio</span>
            <span>Built by builders with taste</span>
            <span style={{ color: "var(--ink-mute)" }}>v1.0</span>
        </div>
      </div>
    </footer>
  );
}
