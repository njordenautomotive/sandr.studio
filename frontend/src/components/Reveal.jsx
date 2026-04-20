import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

export default function Reveal({ children, delay = 0, y = 36, duration = 1.0, once = true, className, style, blur = false }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({ children, delay = 0, duration = 1.15, once = true, className, style }) {
  return (
    <motion.div
      className={className}
      style={{ overflow: "hidden", ...style }}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.7, 0, 0.1, 1] }}
    >
      {children}
    </motion.div>
  );
}
