import { useEffect, useRef, useState } from "react";

const HOVER_SELECTORS = 'a, button, [data-cursor], [role="button"], input[type="submit"], label[for], summary';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const auraRef = useRef(null);
  const labelRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const ringStateRef = useRef({ x: 0, y: 0 });
  const auraStateRef = useRef({ x: 0, y: 0 });
  const [state, setState] = useState("default"); // default | link | press | text | drag
  const [label, setLabel] = useState("");
  const [isCoarse, setIsCoarse] = useState(false);

  useEffect(() => {
    const coarse = !window.matchMedia || window.matchMedia("(pointer: fine)").matches === false;
    setIsCoarse(coarse);
    if (coarse) return;

    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      // dot instantly follows
      if (dotRef.current) dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    };
    const onDown = () => setState("press");
    const onUp = () => setState((s) => (s === "press" ? "default" : s));

    // Delegated hover detection
    const onOver = (e) => {
      const el = e.target && e.target.closest ? e.target.closest(HOVER_SELECTORS) : null;
      if (!el) return;
      const tag = (el.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") {
        setState("text");
        return;
      }
      const explicitLabel = el.getAttribute && el.getAttribute("data-cursor-label");
      if (explicitLabel) {
        setLabel(explicitLabel);
        setState("link");
        return;
      }
      if (tag === "a") { setLabel("Open"); setState("link"); return; }
      if (tag === "button" || el.getAttribute("role") === "button") { setLabel("Go"); setState("link"); return; }
      setLabel("");
      setState("link");
    };
    const onOut = (e) => {
      const nextEl = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest(HOVER_SELECTORS) : null;
      if (!nextEl) {
        setState("default");
        setLabel("");
      }
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    let raf;
    const loop = () => {
      // spring ring toward target
      const r = ringStateRef.current;
      const t = targetRef.current;
      r.x += (t.x - r.x) * 0.2;
      r.y += (t.y - r.y) * 0.2;
      if (ringRef.current) ringRef.current.style.transform = `translate(${r.x}px, ${r.y}px) translate(-50%, -50%)`;
      // aura trails slower
      const a = auraStateRef.current;
      a.x += (t.x - a.x) * 0.06;
      a.y += (t.y - a.y) * 0.06;
      if (auraRef.current) auraRef.current.style.transform = `translate(${a.x}px, ${a.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // initial position off-screen so it doesn't flash at 0,0
    targetRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isCoarse) return null;

  return (
    <div className={`cursor-root cursor-state-${state}`} aria-hidden>
      <div ref={auraRef} className="cursor-aura" />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label">{label || (state === "link" ? "Go" : "")}</span>
      </div>
    </div>
  );
}
