import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/process", label: "Process" },
  { to: "/about", label: "About" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: [0.7, 0, 0.1, 1], delay: 0.3 }}
      >
        <div className="nav-inner">
          <Link to="/" className="nav-logo" data-testid="nav-logo">
            <span className="dot" />
            <span>sandr</span>
            <span className="ext">/studio</span>
          </Link>
          <nav className="nav-links">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => (isActive ? "active" : "")}
                data-testid={`nav-link-${l.label.toLowerCase()}`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn-primary nav-cta" data-testid="nav-cta" style={{ padding: "11px 20px", fontSize: 13 }}>
              Start your build
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </nav>
          <button className="mobile-toggle" onClick={() => setOpen(true)} data-testid="nav-mobile-toggle">
            <span style={{ width: 16, height: 1, background: "currentColor", display: "inline-block" }} />
            Menu
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-sheet"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.1, 1] }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
                <span className="dot" /> <span>sandr</span> <span className="ext">/studio</span>
              </Link>
              <button className="mobile-toggle" onClick={() => setOpen(false)}>Close</button>
            </div>
            <nav>
              <Link to="/">Home</Link>
              {links.map((l) => (<Link key={l.to} to={l.to}>{l.label}</Link>))}
              <Link to="/contact">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
