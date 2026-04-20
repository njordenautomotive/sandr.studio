import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Custom in-view hook that is robust for above/below-the-fold content.
 *  - Uses IntersectionObserver with generous rootMargin.
 *  - Falls back to firing after `fallbackMs` in case the observer never triggers
 *    (e.g., transform:translate parents, iOS Safari quirks, etc.).
 *  - If `mount` is true, triggers immediately on mount.
 */
function useInViewSafe({ mount = false, fallbackMs = 1200 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (mount) {
      setInView(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setInView(true);
    };
    let observer;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              finish();
              observer.disconnect();
              break;
            }
          }
        },
        { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
      );
      observer.observe(node);
    } catch (e) {
      // no IO support — just show
      finish();
    }
    const fallback = setTimeout(finish, fallbackMs);
    return () => {
      clearTimeout(fallback);
      if (observer) observer.disconnect();
    };
  }, [mount, fallbackMs]);

  return { ref, inView };
}

export default function Reveal({
  children,
  delay = 0,
  y = 36,
  duration = 1.0,
  className,
  style,
  blur = false,
  mount = false,
}) {
  const { ref, inView } = useInViewSafe({ mount });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({
  children,
  delay = 0,
  duration = 1.15,
  className,
  style,
  mount = false,
}) {
  const { ref, inView } = useInViewSafe({ mount });
  const [done, setDone] = useState(false);

  // Safety: after the mask should have finished, flip overflow to visible even
  // if onAnimationComplete didn't fire (covers edge cases in Framer Motion).
  useEffect(() => {
    if (!inView || done) return;
    const t = setTimeout(() => setDone(true), (delay + duration) * 1000 + 80);
    return () => clearTimeout(t);
  }, [inView, done, delay, duration]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ overflow: done ? "visible" : "hidden", ...style }}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={inView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
      transition={{ duration, delay, ease: [0.7, 0, 0.1, 1] }}
      onAnimationComplete={() => setDone(true)}
    >
      {children}
    </motion.div>
  );
}
