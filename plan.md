# plan.md (updated — v3 motion-rich anti-template)

## 1) Objectives
- ✅ Ship a premium, cinematic, **anti-template** marketing site for **sandr.studio** that communicates in under 10 seconds:
  - **“Story-driven websites for startups that refuse to look generic.”**
- ✅ Deliver multi-page IA: **Home, Work, Work Detail, Services, Process, About, Contact + hidden Admin**.
- ✅ Core workflow: **Contact form → FastAPI → MongoDB**, plus **password-gated Admin** to review submissions.
- ✅ Establish a cohesive **v3 motion-rich design/interaction system** with zero carry-over from v2:
  - Typography: **Syne** (display) + **Inter Tight** (body) + **JetBrains Mono** (labels)
  - Accent strategy: **silver-blue (#A8C6FF)** dominant (cursor + signature moments), cobalt emphasis, violet atmosphere, rare amber warmth
  - Interactions: **custom cursor**, **sand-reactive text**, **page intro overlays**, **satisfying click/ripple buttons**, **easter eggs**
- ✅ Ensure **above-the-fold headings are always visible on first open** (no IO/viewport flake).
- 🔜 (Optional next) Prepare for production + future content swapping:
  - Swap concept work → real case studies without rewriting UI.
  - Add anti-spam + notifications + export.
  - Rotate secrets for production.

---

## 2) Implementation Steps

### Phase 1 — Build directly (core is CRUD + simple auth gate) ✅ Completed
**User stories (core flow):**
1. ✅ As a founder, I can submit a project inquiry with timeline/budget so sandr can qualify me.
2. ✅ As sandr, I can see all inquiries in one place so nothing gets lost.
3. ✅ As sandr, I can open an inquiry and read the full context quickly.
4. ✅ As sandr, I can log into an admin area so inquiries aren’t public.
5. ✅ As a visitor, I get a clean success state after submitting so I know it worked.

**Backend (FastAPI + MongoDB):** ✅ Completed
- ✅ Implemented `ContactSubmission` model with qualification fields + `status`.
- ✅ Implemented endpoints:
  - ✅ `POST /api/contact` create submission
  - ✅ `POST /api/admin/login` returns JWT
  - ✅ `GET /api/admin/me` protected auth check
  - ✅ `GET /api/admin/submissions` list submissions (protected)
  - ✅ `GET /api/admin/submissions/{id}` single submission (protected)
  - ✅ `PATCH /api/admin/submissions/{id}` update status (protected)
  - ✅ `DELETE /api/admin/submissions/{id}` delete submission (protected)
- ✅ Admin auth:
  - ✅ Password-gated login via `ADMIN_PASSWORD`
  - ✅ JWT protection via `JWT_SECRET`

**Frontend foundation (React + Router + framer-motion):** ✅ Completed
- ✅ Installed/configured **framer-motion**.
- ✅ App shell: nav, footer, page transitions, mobile nav sheet.
- ✅ Pages + routing:
  - ✅ `/` Home
  - ✅ `/work` Work index
  - ✅ `/work/:slug` Work detail story page
  - ✅ `/services`, `/process`, `/about`, `/contact`
  - ✅ `/admin` login, `/admin/dashboard` submissions list + detail drawer
- ✅ Contact form:
  - ✅ Public submission to `POST /api/contact`
  - ✅ Success state + reset
- ✅ Admin:
  - ✅ Token persisted to localStorage
  - ✅ Dashboard supports search, status filter, drawer detail view, status updates, delete, logout

**Concept work content (4 fictional but believable projects):** ✅ Completed
- ✅ 4 projects with full story pages (challenge/story/direction/outcome + stats):
  - Ember Health
  - Northshore
  - Curio
  - Halcyon
- ✅ Stored in: `/app/frontend/src/data/projects.js` for easy swapping later.

**End Phase 1 checkpoint:** ✅ Completed
- ✅ Contact submit works → persists in MongoDB
- ✅ Admin login works → submissions viewable

---

### Phase 2 — V1 App polish (design fidelity + motion + copy) ✅ Completed
**User stories (experience + brand):**
1. ✅ As a visitor, I understand what sandr does in under 10 seconds.
2. ✅ As a visitor, I feel the site is premium and cinematic, not templated.
3. ✅ As a visitor, scrolling feels like a narrative with pacing and payoff.
4. ✅ As a founder, I can scan services/pricing posture quickly without walls of text.
5. ✅ As sandr, I can replace concept work later without rewriting the UI.

- ✅ Home page narrative arc implemented (v1 structure).
- ✅ Work cards were cinematic (v1).
- ✅ Global motion primitives + reduced-motion support.
- ✅ Admin UX clean and usable.

**End Phase 2:** ✅ Completed
- ✅ E2E testing via **testing_agent_v3**
  - ✅ Backend: **100% (22/22)**
  - ✅ Frontend: flows pass.

---

### Phase 3 — V2 Anti-template redesign (radical authored overhaul) ✅ Completed
**Goal:** A complete authored redesign with **zero template feel** and **zero carry-over** of v1’s initial system.

**What shipped (v2):**
- ✅ **Typography:** Fraunces (display) + DM Sans (body) + JetBrains Mono (labels)
- ✅ **Color:** midnight base + electric cobalt + ultraviolet + cold glow + rare amber
- ✅ **Motion:** kinetic word cycling, mask reveals, parallax, scroll-driven atmosphere, film grain
- ✅ **IA:** scene-based asymmetric home + immersive work chapters + new process copy

**End Phase 3 testing:** ✅ Completed
- ✅ Regression testing:
  - ✅ Backend: **100% (22/22)**
  - ✅ Frontend: **98%**
  - ⚠️ Only flagged item was a Playwright click-interception note on `admin-logout` (LOW). Manually verified: logout worked.

---

### Phase 4 — V3 Motion-rich anti-template overhaul (interaction-first) ✅ Completed
**Goal:** Push the site into a **motion-rich, interaction-forward** experience (Gen‑Z energy, authored feel), while keeping backend/admin stable.

**Major changes from v2 (v3 requirements):**
- ✅ **Typography system flipped again (non-negotiable):**
  - Display: **Syne** (expressive bold grotesque)
  - Body: **Inter Tight**
  - Labels: **JetBrains Mono**
  - Result: **zero visual carry-over** from v2.
- ✅ **Homepage restructured (critical):**
  - ✅ **Removed the Work showcase from the homepage** entirely.
  - ✅ New home flow:
    - `home-hero` → `home-thesis` → `home-narrative` → `home-services` → `home-process` (velocity + moves) → `home-environment` → `home-final-cta`
  - ✅ Editorial eyebrows reduced; motion and pacing carry orientation.
- ✅ **Custom cursor system (desktop):**
  - Dot + ring + aura trail with spring lag
  - States: default / link (expanded with verb label) / press (amber flash + compress) / text (hides on inputs) / drag
  - Hides native cursor on fine pointers; preserves caret usability on inputs.
- ✅ **Sand-reactive text:**
  - Per-letter cursor-proximity displacement (push-away), blur, silver-blue color shift, glow shadow, reform on leave
  - Applied to hero headline, environment manifesto, contact hero, and footer closing.
- ✅ **Page intro overlays:**
  - On navigation to **Work / Services / Process / About / Contact** a full-bleed intro overlay appears with unique copy.
  - ✅ Timing extended (+2 seconds) in the provider (now ~3.4s).
- ✅ **Satisfying button clicks:**
  - `.btn` press compression + global click-position ripple effect (App-level handler).
- ✅ **Easter eggs:**
  - Hidden hover tooltips on nav dot, OSL/BKK coord, founder names in footer, v3 tags, and founder cards.
- ✅ **Accent shift:**
  - **silver-blue (#A8C6FF)** promoted to dominant accent for cursor + signature moments
  - cobalt retained for emphasis; violet for atmospheric gradients; amber as rare warmth.
- ✅ **Admin surface:**
  - Visual tokens refreshed to match v3
  - Functionality unchanged.

**End Phase 4 testing:** ✅ Completed
- ✅ testing_agent_v3 regression (iteration_3):
  - ✅ Backend: **100% (22/22)**
  - ✅ Frontend: **99%**
  - ⚠️ Only note: a non-critical console warning about HTML structure (does not affect functionality).

---

### Phase 4.1 — Critical fix: hero headings invisible on initial open ✅ Completed
**Issue (user-reported):**
- On first open/full-screen, **none of the hero headers were visible**, leaving only nav and some body copy.

**Root cause:**
- Above-the-fold headings relied on Framer Motion `whileInView` (IntersectionObserver). On initial paint in some viewports, the observer didn’t reliably trigger, leaving `clipPath: inset(0 0 100% 0)` (masked out) until scroll/other events.

**Fix shipped:**
1. ✅ Added a `mount` prop to `Reveal` + `MaskReveal` (`/app/frontend/src/components/Reveal.jsx`).
   - When `mount` is `true`, the component uses `animate` immediately (no IntersectionObserver).
2. ✅ Applied `mount` to **all above-the-fold hero blocks**:
   - Home, Work, Services, Process, Contact, About, WorkDetail.
3. ✅ Sand text performance hardening:
   - Removed conflicting CSS transitions on `.sand-char` (`/app/frontend/src/index.css`) that fought `requestAnimationFrame` transforms.
   - Added **lerp-based smoothing** in `/app/frontend/src/components/SandText.jsx` so letters settle smoothly without snapping/lag.

**Verification:** ✅ Completed
- ✅ Screenshots at **1920×1080** show hero text visible within ~1.8s on load.
- ✅ Sand-text interaction confirmed working (per-letter transforms active) and visually smooth.

---

### Phase 5 — Hardening + small upgrades (production-friendly MVP) 🔜 Optional / Next
**User stories (stability + maintainability):**
1. As a visitor, the site loads fast even with heavier motion/atmosphere.
2. As a visitor, animations never block readability or navigation.
3. As sandr, I can keep the inbox clean and operational over time.
4. As sandr, I can export inquiries if needed.
5. As sandr, I can rotate secrets without code changes.

**Recommended next upgrades (pick as needed):**
- **Security/ops**
  - Add rate limiting to `POST /api/contact`.
  - Add honeypot field + basic bot detection.
  - Rotate `ADMIN_PASSWORD` and `JWT_SECRET` for production.
- **Admin productivity**
  - Add CSV export endpoint + UI button.
  - Add “notes” field and/or “assigned to” in admin.
- **Notifications**
  - Email notifications on new submissions (Resend/SendGrid).
- **Content management**
  - Optional CMS layer so pages/projects can be edited without code.
- **Analytics**
  - Add lightweight analytics events for CTA clicks + form submissions.

**End Phase 5:**
- Re-run **testing_agent_v3** for regression after changes.

---

## 3) Next Actions
1. 🔎 **User verification** (priority):
   - Confirm headers are now visible on first open for you (Home + other pages).
   - Confirm sand-text feels smooth and responsive on your machine.
2. (Optional) Swap concept projects → real work:
   - Update `/app/frontend/src/data/projects.js` (content only).
3. (Optional) Production hygiene:
   - Set unique `ADMIN_PASSWORD` and `JWT_SECRET` in environment.
4. (Optional) Add enhancements:
   - Rate limit + honeypot
   - Email notifications
   - CSV export
   - CMS
   - Analytics

---

## 4) Success Criteria
- ✅ Brand: site feels **authored, cinematic, anti-template** and **motion-rich + interactive** (Gen‑Z energy) without sacrificing taste.
- ✅ Visual system (v3): **Syne + Inter Tight + JetBrains Mono**, silver-blue dominant accent, cursor-led interaction layer.
- ✅ UX: Home reads fast, then rewards exploration via sand-text, cursor verbs, intros, easter eggs.
- ✅ IA: Multi-page site intact; **home no longer includes work showcase** (v3 requirement met).
- ✅ Core: contact submissions reliably persist in MongoDB; success state displayed.
- ✅ Admin: password-gated access; submissions list + drawer detail view; status updates + delete + logout.
- ✅ Quality: responsive on mobile/desktop; interactions do not block usability.
- ✅ Reliability: **above-the-fold headers render on initial open** (no IntersectionObserver flake for hero scenes).
- ✅ Performance: sand-text runs smoothly (RAF transforms do not fight CSS transitions).
- ✅ Testing baseline remains:
  - ✅ Backend **100% (22/22)**
  - ✅ Frontend **99%** (only non-critical console warning)
