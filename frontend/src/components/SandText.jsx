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
    // Only reset when the cursor truly leaves the window (not when crossing elements).
    const onWindowLeave = (e) => {
      // documentElement mouseleave fires only at window edge
      if (e.relatedTarget === null || e.toElement === null) {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onWindowLeave);

    // per-letter eased state for smooth return (no CSS transitions to conflict with RAF)
    const state = []; // { tx, ty, blur, glow }
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      const { x, y } = mouseRef.current;
      const letters = lettersRef.current;
      for (let i = 0; i < letters.length; i++) {
        const el = letters[i];
        if (!el) continue;
        if (!state[i]) state[i] = { tx: 0, ty: 0, blur: 0, glow: 0 };
        const s = state[i];
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let targetTx = 0, targetTy = 0, targetBlur = 0, targetGlow = 0;
        if (dist < radius) {
          const p = 1 - dist / radius; // 0..1
          // ease the response curve so letters barely react at the edges
          const e = p * p; // quadratic ease-in
          const angle = Math.atan2(dy, dx);
          targetTx = -Math.cos(angle) * strength * e;
          targetTy = -Math.sin(angle) * strength * e;
          targetBlur = e * 1.4; // gentle blur (was up to 4px — felt like it "cut" letters)
          targetGlow = p;
        }
        // smooth approach (frame-rate independent-ish at 60fps)
        s.tx = lerp(s.tx, targetTx, 0.16);
        s.ty = lerp(s.ty, targetTy, 0.16);
        s.blur = lerp(s.blur, targetBlur, 0.16);
        s.glow = lerp(s.glow, targetGlow, 0.16);

        el.style.transform = `translate3d(${s.tx.toFixed(2)}px, ${s.ty.toFixed(2)}px, 0)`;
        el.style.filter = s.blur > 0.05 ? `blur(${s.blur.toFixed(2)}px)` : "";
        el.style.color = s.glow > 0.65 ? "var(--silver-blue)" : "";
        el.style.textShadow = s.glow > 0.5 ? `0 0 ${(s.glow * 18).toFixed(0)}px var(--silver-glow)` : "";
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onWindowLeave);
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
