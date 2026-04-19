export default function Marquee({ items = [], speed = 42 }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "22px 0" }}>
      <div className="marquee" style={{ animationDuration: `${speed}s` }}>
        {doubled.map((it, i) => (
          <span key={i} style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "clamp(36px, 5vw, 68px)",
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            display: "inline-flex", alignItems: "center", gap: 60
          }}>
            {it}
            <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--accent)", boxShadow: "0 0 10px var(--accent-glow)" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
