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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <>
      <header className={`site-nav ${scrolled ? "scrolled" : ""}`}>
        <div className="site-nav-inner">
          <Link to="/" className="logo" data-testid="nav-logo">
            <span className="dot" />
            <span>sandr<span style={{ color: "var(--ink-mute)" }}>.studio</span></span>
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
            <Link to="/contact" className="btn btn-ghost" data-testid="nav-cta" style={{ padding: "10px 18px", fontSize: 13 }}>
              Start your build
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
            </Link>
          </nav>
          <button className="mobile-toggle" onClick={() => setOpen(true)} data-testid="nav-mobile-toggle">Menu</button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link to="/" className="logo" onClick={() => setOpen(false)}>
                <span className="dot" /> sandr<span style={{ color: "var(--ink-mute)" }}>.studio</span>
              </Link>
              <button className="mobile-toggle" onClick={() => setOpen(false)}>Close</button>
            </div>
            <nav>
              <Link to="/">Home</Link>
              {links.map((l) => (
                <Link key={l.to} to={l.to}>{l.label}</Link>
              ))}
              <Link to="/contact">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
