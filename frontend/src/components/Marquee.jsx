export default function Marquee({ items = [], speed = 48, accent = false }) {
  const doubled = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "28px 0", position: "relative", zIndex: 2 }}>
      <div
        style={{
          display: "inline-flex",
          gap: 72,
          whiteSpace: "nowrap",
          animation: `marquee ${speed}s linear infinite`,
          paddingLeft: 72,
        }}
      >
        {doubled.map((it, i) => (
          <span key={i} style={{
            fontFamily: "'Fraunces', serif",
            fontVariationSettings: "'opsz' 144, 'SOFT' 60",
            fontSize: "clamp(44px, 6vw, 92px)",
            fontWeight: 300,
            letterSpacing: "-0.025em",
            color: accent ? "var(--cobalt)" : "var(--ink)",
            fontStyle: i % 2 ? "italic" : "normal",
            display: "inline-flex", alignItems: "center", gap: 72,
            lineHeight: 1,
          }}>
            {it}
            <span style={{ width: 6, height: 6, borderRadius: 99, background: accent ? "var(--violet)" : "var(--cobalt)", boxShadow: "0 0 14px var(--cobalt-glow)" }} />
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}
