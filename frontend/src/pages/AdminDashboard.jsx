import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { api, getToken, clearToken, authHeaders } from "@/lib/api";

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return iso;
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all"); // all | new | read | replied | archived
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) {
      navigate("/admin", { replace: true });
      return;
    }
    load();
    // eslint-disable-next-line
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/submissions", { headers: authHeaders() });
      setItems(res.data);
    } catch (err) {
      if (err?.response?.status === 401) {
        clearToken();
        navigate("/admin", { replace: true });
      } else {
        setError("Could not load submissions.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => { clearToken(); navigate("/admin", { replace: true }); };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.patch(`/admin/submissions/${id}`, { status }, { headers: authHeaders() });
      setItems((xs) => xs.map((x) => (x.id === id ? res.data : x)));
      if (selected && selected.id === id) setSelected(res.data);
    } catch (err) { /* swallow */ }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this submission permanently?")) return;
    try {
      await api.delete(`/admin/submissions/${id}`, { headers: authHeaders() });
      setItems((xs) => xs.filter((x) => x.id !== id));
      if (selected && selected.id === id) setSelected(null);
    } catch (err) { /* swallow */ }
  };

  const filtered = useMemo(() => {
    let xs = items;
    if (filter !== "all") xs = xs.filter((x) => x.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      xs = xs.filter((x) => [x.name, x.email, x.company, x.startup_description].filter(Boolean).join(" ").toLowerCase().includes(q));
    }
    return xs;
  }, [items, filter, search]);

  const counts = useMemo(() => ({
    all: items.length,
    new: items.filter((x) => x.status === "new").length,
    read: items.filter((x) => x.status === "read").length,
    replied: items.filter((x) => x.status === "replied").length,
    archived: items.filter((x) => x.status === "archived").length,
  }), [items]);

  const openDetail = async (item) => {
    setSelected(item);
    if (item.status === "new") updateStatus(item.id, "read");
  };

  return (
    <main data-testid="page-admin-dashboard" className="admin-shell">
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40, padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(10,10,11,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: 99, background: "var(--accent)" }} />
          <span className="font-display" style={{ fontSize: 22 }}>sandr — inbox</span>
          <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>Studio admin</span>
        </div>
        <button onClick={logout} className="btn btn-ghost" style={{ padding: "10px 16px", fontSize: 13 }} data-testid="admin-logout">Log out</button>
      </header>

      <section className="container-x" style={{ paddingTop: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 20 }}>
          <div>
            <p className="eyebrow" style={{ color: "var(--ink-dim)" }}>Inquiries</p>
            <h1 className="font-display" style={{ fontSize: "clamp(40px, 5vw, 68px)", marginTop: 10 }}>{counts.all} total <span style={{ color: "var(--ink-mute)" }}>·</span> <span style={{ color: "var(--accent)" }}>{counts.new} new</span></h1>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input className="input" placeholder="Search name, email, company..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ minWidth: 260 }} data-testid="admin-search" />
            <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ minWidth: 180 }} data-testid="admin-filter">
              <option value="all" style={{ background: "#0A0A0B" }}>All ({counts.all})</option>
              <option value="new" style={{ background: "#0A0A0B" }}>New ({counts.new})</option>
              <option value="read" style={{ background: "#0A0A0B" }}>Read ({counts.read})</option>
              <option value="replied" style={{ background: "#0A0A0B" }}>Replied ({counts.replied})</option>
              <option value="archived" style={{ background: "#0A0A0B" }}>Archived ({counts.archived})</option>
            </select>
            <button className="btn btn-ghost" onClick={load} style={{ padding: "10px 16px", fontSize: 13 }} data-testid="admin-refresh">Refresh</button>
          </div>
        </div>

        {error && <div style={{ marginTop: 24, padding: 16, border: "1px solid #3b1b1e", borderRadius: 12, color: "#ff9488" }}>{error}</div>}

        <div style={{ marginTop: 40, border: "1px solid var(--line)", borderRadius: 18, overflow: "hidden" }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 200 }}>Received</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th style={{ width: 160 }}>Timeline</th>
                <th style={{ width: 160 }}>Budget</th>
                <th style={{ width: 140 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: 60, textAlign: "center", color: "var(--ink-dim)" }}>Loading…</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: 80, textAlign: "center", color: "var(--ink-dim)" }} data-testid="admin-empty">No inquiries match these filters.</td></tr>
              ) : (
                filtered.map((it) => (
                  <tr key={it.id} onClick={() => openDetail(it)} data-testid={`admin-row-${it.id}`}>
                    <td style={{ color: "var(--ink-dim)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{formatDate(it.created_at)}</td>
                    <td>{it.name}</td>
                    <td style={{ color: "var(--ink-dim)" }}>{it.email}</td>
                    <td style={{ color: "var(--ink-dim)" }}>{it.company || "—"}</td>
                    <td style={{ color: "var(--ink-dim)" }}>{it.timeline || "—"}</td>
                    <td style={{ color: "var(--ink-dim)" }}>{it.budget || "—"}</td>
                    <td><span className={`status-badge ${it.status}`}>{it.status}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelected(null)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              data-testid="admin-drawer"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className={`status-badge ${selected.status}`}>{selected.status}</span>
                <button onClick={() => setSelected(null)} className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 12 }}>Close</button>
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(36px, 5vw, 54px)", marginTop: 22, lineHeight: 1.05 }}>{selected.name}</h2>
              <a href={`mailto:${selected.email}`} className="link-arrow" style={{ marginTop: 10, display: "inline-flex" }}>{selected.email}<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg></a>
              <div style={{ marginTop: 8, color: "var(--ink-mute)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>{formatDate(selected.created_at)}</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 30 }}>
                {[
                  ["Company", selected.company],
                  ["Website", selected.website],
                  ["Timeline", selected.timeline],
                  ["Budget", selected.budget],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>{k}</div>
                    <div style={{ marginTop: 6, color: "var(--ink)", fontSize: 14, wordBreak: "break-word" }}>{v || "—"}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 30 }}>
                <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>What they do</div>
                <p style={{ marginTop: 8, color: "var(--ink)", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{selected.startup_description || "—"}</p>
              </div>
              {selected.problem && (
                <div style={{ marginTop: 24 }}>
                  <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>What feels wrong</div>
                  <p style={{ marginTop: 8, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{selected.problem}</p>
                </div>
              )}
              {selected.need && (
                <div style={{ marginTop: 24 }}>
                  <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>What they need</div>
                  <p style={{ marginTop: 8, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{selected.need}</p>
                </div>
              )}
              {selected.desired_feel && (
                <div style={{ marginTop: 24 }}>
                  <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>Desired feel</div>
                  <p style={{ marginTop: 8, color: "var(--ink-dim)", fontSize: 15, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{selected.desired_feel}</p>
                </div>
              )}

              <div style={{ marginTop: 36, borderTop: "1px solid var(--line)", paddingTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["new", "read", "replied", "archived"].filter((s) => s !== selected.status).map((s) => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 12 }} data-testid={`admin-status-${s}`}>
                    Mark as {s}
                  </button>
                ))}
                <button onClick={() => remove(selected.id)} className="btn btn-ghost" style={{ padding: "10px 14px", fontSize: 12, color: "#ff9488", borderColor: "#3b1b1e" }} data-testid="admin-delete">
                  Delete
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
