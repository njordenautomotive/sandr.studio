import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Reveal — fade/slide in content.
 * Props:
 *  - mount: if true, animates immediately on mount (use for above-the-fold)
 *           else uses whileInView via IntersectionObserver.
 */
export default function Reveal({ children, delay = 0, y = 36, duration = 1.0, once = true, className, style, blur = false, mount = false }) {
  const initial = { opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" };
  const target = { opacity: 1, y: 0, filter: "blur(0px)" };
  const common = {
    className,
    style,
    initial,
    transition: { duration, delay, ease },
  };
  if (mount) {
    return <motion.div {...common} animate={target}>{children}</motion.div>;
  }
  return (
    <motion.div
      {...common}
      whileInView={target}
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({ children, delay = 0, duration = 1.15, once = true, className, style, mount = false }) {
  const initial = { clipPath: "inset(0 0 100% 0)" };
  const target = { clipPath: "inset(0 0 0% 0)" };
  const common = {
    className,
    style: { overflow: "hidden", ...style },
    initial,
    transition: { duration, delay, ease: [0.7, 0, 0.1, 1] },
  };
  if (mount) {
    return <motion.div {...common} animate={target}>{children}</motion.div>;
  }
  return (
    <motion.div
      {...common}
      whileInView={target}
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
