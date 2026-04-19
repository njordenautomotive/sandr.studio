import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api, setToken, getToken } from "@/lib/api";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, bounce to dashboard
    const token = getToken();
    if (token) {
      api.get("/admin/me", { headers: { Authorization: `Bearer ${token}` } })
         .then(() => navigate("/admin/dashboard", { replace: true }))
         .catch(() => {});
    }
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/admin/login", { password });
      setToken(res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.detail || "Could not log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main data-testid="page-admin-login" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" }}>
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", width: 900, height: 900, transform: "translate(-50%, -50%)", background: "radial-gradient(circle, var(--accent-glow), transparent 65%)", pointerEvents: "none" }} />
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 440, border: "1px solid var(--line)", borderRadius: 22, padding: 40, background: "var(--bg-2)" }}
      >
        <div className="eyebrow eyebrow-dot">Studio admin</div>
        <h1 className="font-display" style={{ fontSize: "clamp(40px, 5vw, 60px)", marginTop: 18, lineHeight: 1.02 }}>
          Welcome <i style={{ color: "var(--accent)" }}>back</i>.
        </h1>
        <p style={{ marginTop: 14, color: "var(--ink-dim)", fontSize: 15 }}>Enter the studio password to open the inbox.</p>
        <div className="field" style={{ marginTop: 30 }}>
          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            data-testid="admin-password"
            autoFocus
            required
          />
        </div>
        {error && <div style={{ marginTop: 14, color: "#ff9488", fontSize: 13 }} data-testid="admin-login-error">{error}</div>}
        <button type="submit" className="btn btn-primary" style={{ marginTop: 24, width: "100%" }} disabled={loading} data-testid="admin-login-submit">
          {loading ? "Opening..." : "Open inbox"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
        </button>
        <div style={{ marginTop: 28, color: "var(--ink-mute)", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center" }}>
          sandr · protected
        </div>
      </motion.form>
    </main>
  );
}
