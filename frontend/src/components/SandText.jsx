import { useEffect, useRef, useMemo } from "react";

/**
 * Sand-reactive text: splits text into per-letter spans and displaces them
 * based on cursor proximity, reforming when cursor leaves. Used on signature
 * moments only (hero, manifesto line, final CTA).
 *
 * Props:
 *  - text: string
 *  - radius: proximity in px within which letters react (default 140)
 *  - strength: maximum displacement in px (default 20)
 *  - className, style: passed to the outer wrapper
 */
export default function SandText({ text, radius = 160, strength = 24, className = "", style = {} }) {
  const wrapperRef = useRef(null);
  const lettersRef = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const parts = useMemo(() => {
    // split by spaces but keep spaces so layout is preserved
    return text.split(/(\s+)/);
  }, [text]);

  useEffect(() => {
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    const loop = () => {
      const { x, y } = mouseRef.current;
      const letters = lettersRef.current;
      for (let i = 0; i < letters.length; i++) {
        const el = letters[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < radius) {
          const p = 1 - dist / radius; // 0..1
          const angle = Math.atan2(dy, dx);
          // push letter AWAY from cursor
          const tx = -Math.cos(angle) * strength * p;
          const ty = -Math.sin(angle) * strength * p;
          const blur = Math.min(4, p * 3);
          el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px)`;
          el.style.filter = `blur(${blur.toFixed(2)}px)`;
          el.style.color = p > 0.6 ? "var(--silver-blue)" : "";
          el.style.textShadow = p > 0.4 ? `0 0 ${(p * 24).toFixed(0)}px var(--silver-glow)` : "";
        } else {
          el.style.transform = "";
          el.style.filter = "";
          el.style.color = "";
          el.style.textShadow = "";
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [radius, strength]);

  let idx = 0;

  return (
    <span ref={wrapperRef} className={`sand-text ${className}`} style={style} aria-label={text}>
      {parts.map((part, pi) => {
        if (/^\s+$/.test(part)) return <span key={`s-${pi}`}>{part}</span>;
        return (
          <span key={`w-${pi}`} style={{ display: "inline-block", whiteSpace: "nowrap" }} aria-hidden="true">
            {Array.from(part).map((ch, ci) => {
              const k = idx++;
              return (
                <span
                  key={`c-${pi}-${ci}`}
                  ref={(el) => (lettersRef.current[k] = el)}
                  className="sand-char"
                  aria-hidden
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
