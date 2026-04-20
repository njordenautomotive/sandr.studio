import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const PageIntroCtx = createContext({ intro: null, play: () => {} });
export const usePageIntro = () => useContext(PageIntroCtx);

const ROUTE_INTROS = {
  "/work": { line: <>Selected work. Built to make people <em>feel</em>.</>, flavor: "The reel." },
  "/services": { line: <>What we build. Fast. Custom. <em>Story-first</em>.</>, flavor: "The offer." },
  "/process": { line: <>Not a big agency. A <em>sharper</em> way to build.</>, flavor: "The moves." },
  "/about": { line: <>Two people. One <em>obsession</em>.</>, flavor: "The studio." },
  "/contact": { line: <>Bring the idea. We'll shape the <em>presence</em>.</>, flavor: "Start the build." },
};

function matchIntro(pathname) {
  if (pathname.startsWith("/admin")) return null;
  if (pathname.startsWith("/work/") && pathname.length > "/work/".length) return null;
  return ROUTE_INTROS[pathname] || null;
}

export default function PageIntroProvider({ children }) {
  const [intro, setIntro] = useState(null);
  const location = useLocation();
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    // play intro on route change (skip initial mount)
    if (lastPath.current === location.pathname) return;
    lastPath.current = location.pathname;
    const next = matchIntro(location.pathname);
    if (next) {
      setIntro({ ...next, id: Date.now() });
      const t = setTimeout(() => setIntro(null), 3400);
      return () => clearTimeout(t);
    }
    setIntro(null);
  }, [location.pathname]);

  return (
    <PageIntroCtx.Provider value={{ intro, play: setIntro }}>
      {children}
      <AnimatePresence>
        {intro && (
          <motion.div
            key={intro.id}
            className="page-intro-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          >
            <motion.div
              className="page-intro-surface"
              initial={{ clipPath: "inset(0 0 0 0)" }}
              animate={{ clipPath: "inset(0 0 0 0)" }}
              exit={{ clipPath: "inset(100% 0 0 0)", transition: { duration: 0.8, ease: [0.7, 0, 0.1, 1] } }}
            />
            <motion.div
              className="page-intro-text"
              initial={{ y: 30, opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ y: -10, opacity: 0, filter: "blur(6px)", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--silver-blue)", marginBottom: 22, fontWeight: 400 }}>
                — {intro.flavor}
              </div>
              {intro.line}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageIntroCtx.Provider>
  );
}
