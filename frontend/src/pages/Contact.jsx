import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "@/components/PageShell";
import Reveal from "@/components/Reveal";
import { api } from "@/lib/api";

const timelineOptions = ["", "ASAP (within 2 weeks)", "This month", "Next month", "Exploring — no rush"];
const budgetOptions = ["", "$3k – $6k", "$6k – $10k", "$10k – $20k", "$20k+", "Not sure yet"];

const initial = {
  name: "",
  email: "",
  company: "",
  website: "",
  startup_description: "",
  problem: "",
  need: "",
  timeline: "",
  budget: "",
  desired_feel: "",
};

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    try {
      if (!form.name || !form.email || !form.startup_description) {
        throw new Error("Please fill in your name, email, and what your startup does.");
      }
      await api.post("/contact", form);
      setState("success");
    } catch (err) {
      const msg = err?.response?.data?.detail || err.message || "Something went wrong. Try again.";
      setErrorMsg(typeof msg === "string" ? msg : "Something went wrong. Try again.");
      setState("error");
    }
  };

  const reset = () => { setForm(initial); setState("idle"); };

  return (
    <PageShell testid="page-contact">
      <section className="section" style={{ paddingTop: 200 }}>
        <div className="container-x">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80 }} className="contact-grid">
            <div>
              <Reveal>
                <p className="eyebrow eyebrow-dot">Start your build</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="font-display" style={{ fontSize: "clamp(56px, 8vw, 140px)", marginTop: 24, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
                  Tell us what needs to <i style={{ color: "var(--accent)" }}>change</i>.
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p style={{ marginTop: 30, color: "var(--ink-dim)", fontSize: 18, lineHeight: 1.7, maxWidth: 460 }}>
                  We read every submission personally. If we're the right fit, you'll hear back within 48 hours with next steps and a custom quote.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div style={{ marginTop: 48, borderTop: "1px solid var(--line)", paddingTop: 32, display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>Email</div>
                    <a href="mailto:hello@sandr.studio" className="kinetic-underline" style={{ color: "var(--ink)", textDecoration: "none", fontSize: 20, marginTop: 6, display: "inline-block" }}>hello@sandr.studio</a>
                  </div>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>Response time</div>
                    <p style={{ color: "var(--ink)", fontSize: 16, marginTop: 6 }}>Within 48 hours, always.</p>
                  </div>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--ink-dim)" }}>Working with</div>
                    <p style={{ color: "var(--ink)", fontSize: 16, marginTop: 6 }}>Pre-seed to Series A startups.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            <div style={{ position: "relative" }}>
              <AnimatePresence mode="wait">
                {state !== "success" ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={submit}
                    style={{ border: "1px solid var(--line)", borderRadius: 22, padding: 36, background: "var(--bg-2)", display: "flex", flexDirection: "column", gap: 22 }}
                    data-testid="contact-form"
                  >
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="two-col">
                      <div className="field"><label>Name — required</label><input className="input" value={form.name} onChange={update("name")} placeholder="Your full name" data-testid="contact-name" required /></div>
                      <div className="field"><label>Email — required</label><input className="input" type="email" value={form.email} onChange={update("email")} placeholder="you@startup.com" data-testid="contact-email" required /></div>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="two-col">
                      <div className="field"><label>Startup</label><input className="input" value={form.company} onChange={update("company")} placeholder="Company name" data-testid="contact-company" /></div>
                      <div className="field"><label>Current website</label><input className="input" value={form.website} onChange={update("website")} placeholder="https://" data-testid="contact-website" /></div>
                    </div>
                    <div className="field"><label>What does your startup do? — required</label><textarea className="textarea" value={form.startup_description} onChange={update("startup_description")} placeholder="One paragraph is perfect." data-testid="contact-desc" required /></div>
                    <div className="field"><label>What feels wrong with the current site?</label><textarea className="textarea" value={form.problem} onChange={update("problem")} placeholder="Brutal honesty welcome." data-testid="contact-problem" /></div>
                    <div className="field"><label>What do you need built or rebuilt?</label><textarea className="textarea" value={form.need} onChange={update("need")} placeholder="Landing page, rebuild, full site, systems..." data-testid="contact-need" /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="two-col">
                      <div className="field">
                        <label>Timeline</label>
                        <select className="select" value={form.timeline} onChange={update("timeline")} data-testid="contact-timeline">
                          {timelineOptions.map((o) => <option key={o} value={o} style={{ background: "#0A0A0B" }}>{o || "Select timeline"}</option>)}
                        </select>
                      </div>
                      <div className="field">
                        <label>Budget range</label>
                        <select className="select" value={form.budget} onChange={update("budget")} data-testid="contact-budget">
                          {budgetOptions.map((o) => <option key={o} value={o} style={{ background: "#0A0A0B" }}>{o || "Select budget"}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="field"><label>What should people feel when they land on your new site?</label><textarea className="textarea" value={form.desired_feel} onChange={update("desired_feel")} placeholder="Calm. Hype. Trust. Three adjectives work great." data-testid="contact-feel" /></div>

                    {state === "error" && errorMsg && (
                      <div style={{ color: "#ff9488", fontSize: 14, border: "1px solid #3b1b1e", borderRadius: 12, padding: 14, background: "rgba(255,70,70,0.06)" }} data-testid="contact-error">
                        {errorMsg}
                      </div>
                    )}

                    <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", marginTop: 8, flexWrap: "wrap" }}>
                      <span className="eyebrow" style={{ color: "var(--ink-mute)" }}>We read everything.</span>
                      <button type="submit" className="btn btn-primary" disabled={state === "submitting"} data-testid="contact-submit">
                        {state === "submitting" ? "Sending..." : "Send it"}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M10 7h7v7" /></svg>
                      </button>
                    </div>
                    <style>{`@media(max-width: 720px){ .two-col { grid-template-columns: 1fr !important; } }`}</style>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ border: "1px solid var(--accent)", borderRadius: 22, padding: 48, background: "linear-gradient(180deg, rgba(122,162,255,0.05), transparent)", textAlign: "center" }}
                    data-testid="contact-success"
                  >
                    <div style={{ width: 68, height: 68, borderRadius: 999, background: "var(--accent)", color: "#0A0A0B", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5 9-11" /></svg>
                    </div>
                    <h3 className="font-display" style={{ fontSize: "clamp(40px, 5vw, 64px)", marginTop: 28, lineHeight: 1.02 }}>Got it. <i style={{ color: "var(--accent)" }}>We're in.</i></h3>
                    <p style={{ color: "var(--ink-dim)", fontSize: 16, marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
                      We'll read it today and get back to you within 48 hours with next steps or a few sharper questions. Thanks for trusting sandr with this.
                    </p>
                    <button onClick={reset} className="btn btn-ghost" style={{ marginTop: 30 }} data-testid="contact-reset">Send another</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <style>{`@media(max-width: 980px){ .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } }`}</style>
        </div>
      </section>
    </PageShell>
  );
}
