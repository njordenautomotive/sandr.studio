import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AmbientOrb from "@/components/AmbientOrb";
import { api, setToken, getToken } from "@/lib/api";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
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
      <AmbientOrb color="var(--silver-blue)" size={700} blur={140} opacity={0.35} style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 460, border: "1px solid var(--line)", padding: 44, background: "rgba(13, 12, 21, 0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="coord" style={{ color: "var(--silver-blue)" }}>— Studio admin · v3</div>
        <h1 className="display display-heavy" style={{ fontSize: "clamp(44px, 5.5vw, 72px)", marginTop: 20, lineHeight: 0.95 }}>
          Welcome <span className="display-italic" style={{ color: "var(--silver-blue)" }}>back</span>.
        </h1>
        <p style={{ marginTop: 16, color: "var(--ink-dim)", fontSize: 15 }}>Studio password required. The inbox is private.</p>
        <div className="field" style={{ marginTop: 36 }}>
          <label>Password</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" data-testid="admin-password" autoFocus required />
        </div>
        {error && <div style={{ marginTop: 16, color: "#ff9488", fontSize: 13 }} data-testid="admin-login-error">{error}</div>}
        <button type="submit" className="btn btn-primary" style={{ marginTop: 28, width: "100%" }} disabled={loading} data-testid="admin-login-submit">
          {loading ? "Opening..." : "Open inbox"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
        </button>
        <div className="coord" style={{ marginTop: 32, color: "var(--ink-mute)", textAlign: "center" }}>sandr · protected</div>
      </motion.form>
    </main>
  );
}
