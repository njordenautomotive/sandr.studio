import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Large atmospheric orb that responds to scroll + mouse.
 */
export default function AmbientOrb({ color = "var(--cobalt)", size = 520, blur = 80, opacity = 0.55, style = {}, mouseAware = true }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 18 });
  const sy = useSpring(y, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (!mouseAware) return;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      x.set((e.clientX / w - 0.5) * 40);
      y.set((e.clientY / h - 0.5) * 40);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseAware, x, y]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "999px",
        background: `radial-gradient(circle at center, ${color}, transparent 65%)`,
        filter: `blur(${blur}px)`,
        opacity,
        pointerEvents: "none",
        x: sx,
        y: sy,
        ...style,
      }}
    />
  );
}
