import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KineticWord({ words = [], interval = 2200, className = "", style = {} }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span className={className} style={{ position: "relative", display: "inline-block", ...style }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          initial={{ y: "110%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.85, ease: [0.7, 0, 0.1, 1] }}
          style={{ display: "inline-block" }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      {/* invisible sizer to keep width stable at max */}
      <span aria-hidden style={{ visibility: "hidden", whiteSpace: "nowrap", display: "inline-block" }}>
        {words.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
    </span>
  );
}
