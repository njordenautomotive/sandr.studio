import { motion } from "framer-motion";

// Purely CSS/SVG generated cinematic visual — no external images.
export default function ProjectVisual({ project }) {
  const { gradient, palette = [], index = "", client = "" } = project;
  return (
    <div
      className="thumb"
      style={{
        background: gradient,
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        padding: 28,
      }}
    >
      {/* grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "linear-gradient(180deg, black, transparent)",
      }} />
      {/* orb */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          width: 340, height: 340,
          borderRadius: "999px",
          right: -80, top: -60,
          background: `radial-gradient(circle, ${palette[1] || "#7AA2FF"}55, transparent 65%)`,
          filter: "blur(6px)",
        }}
        animate={{ y: [0, 10, 0], x: [0, -6, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* wordmark */}
      <div style={{ position: "relative", zIndex: 2, color: palette[2] || "#F1ECE1" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7 }}>
            {index} — Concept
          </div>
          <div style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(44px, 5vw, 86px)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginTop: 6,
          }}>
            {client}
          </div>
      </div>
    </div>
  );
}
