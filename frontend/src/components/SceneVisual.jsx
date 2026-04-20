import { motion } from "framer-motion";

/**
 * Immersive project visual — a cinematic gradient scene with floating orbs,
 * grid wash, and dramatic wordmark. No small thumbnails — these are spreads.
 */
export default function SceneVisual({ project, size = "large", children }) {
  const { gradient, palette = [], index = "", client = "" } = project;
  const isLarge = size === "large";

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: gradient,
        aspectRatio: isLarge ? "16/10" : "4/5",
        display: "flex",
        alignItems: "flex-end",
        padding: isLarge ? 44 : 28,
        isolation: "isolate",
      }}
    >
      {/* grid wash */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "linear-gradient(180deg, black 0%, transparent 100%)",
      }} />
      {/* atmospheric orb */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          width: "50%", aspectRatio: "1/1",
          borderRadius: "999px",
          right: "-12%", top: "-18%",
          background: `radial-gradient(circle, ${palette[1] || "#4A5BFF"}aa, transparent 62%)`,
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
        animate={{ y: [0, 18, 0], x: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* second smaller orb */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          width: "30%", aspectRatio: "1/1",
          borderRadius: "999px",
          left: "-8%", bottom: "-10%",
          background: `radial-gradient(circle, ${palette[0] || "#000"}dd, transparent 70%)`,
          filter: "blur(30px)",
          mixBlendMode: "screen",
        }}
        animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* scan lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)",
        opacity: 0.35, mixBlendMode: "multiply",
      }} />
      {/* bottom vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.5))",
      }} />

      {/* wordmark content */}
      <div style={{ position: "relative", zIndex: 2, color: palette[2] || "#F5F1E8", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: isLarge ? 20 : 10, gap: 12, flexWrap: "wrap" }}>
          <span className="coord" style={{ color: "rgba(255,255,255,0.65)" }}>{index} · Concept</span>
          <span className="coord" style={{ color: "rgba(255,255,255,0.5)" }}>Scene file</span>
        </div>
        <div className="display" style={{
          fontSize: isLarge ? "clamp(56px, 7vw, 124px)" : "clamp(40px, 6vw, 80px)",
          lineHeight: 0.9,
          letterSpacing: "-0.035em",
          fontStyle: "italic",
          fontVariationSettings: "'opsz' 144, 'SOFT' 80",
        }}>
          {client}
        </div>
        {children}
      </div>
    </div>
  );
}
