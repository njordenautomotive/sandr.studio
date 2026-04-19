import { motion } from "framer-motion";
import { pageVariants } from "@/lib/motion";

export default function PageShell({ children, testid }) {
  return (
    <motion.main
      data-testid={testid}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ position: "relative", zIndex: 2 }}
    >
      {children}
    </motion.main>
  );
}
