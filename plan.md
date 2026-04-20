# plan.md (updated — v2 anti-template redesign)

## 1) Objectives
- ✅ Ship a premium, cinematic, **anti-template** marketing site for **sandr.studio** that communicates in under 10 seconds:
  - **“Story-driven websites for startups that refuse to look generic.”**
- ✅ Deliver multi-page IA: **Home, Work, Work Detail, Services, Process, About, Contact + hidden Admin**.
- ✅ Core workflow: **Contact form → FastAPI → MongoDB**, plus **password-gated Admin** to review submissions.
- ✅ Establish a cohesive v2 design/motion system with **radical visual departure from v1**:
  - Typography: **Fraunces** (display) + **DM Sans** (body) + **JetBrains Mono** (labels)
  - Color: deeper midnight base + **electric cobalt** + **ultraviolet** + cold luminous glow + rare burnt amber
  - Motion: kinetic word cycling, mask reveals, mouse parallax, scroll-driven atmosphere, film grain
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

### Phase 3 — V2 Anti-template redesign (radical overhaul) ✅ Completed
**Goal:** A complete authored redesign with **zero template feel** and **zero carry-over** of v1’s Instrument Serif + steel-blue system.

**What shipped (v2):**
- ✅ **Typography system (new):**
  - Display: **Fraunces** variable (opsz-driven), italic highlights for kinetic moments
  - Body: **DM Sans**
  - Labels/coords: **JetBrains Mono**
- ✅ **Color system (new):**
  - Base: **#08070C** midnight
  - Primary accent: **electric cobalt #4A5BFF**
  - Secondary accent: **ultraviolet #8B3FFF**
  - Atmosphere: cold luminous white glow + grain
  - Rare accent: **burnt amber #E5A554** used sparingly (closing line)
- ✅ **Motion system (new):**
  - `KineticWord` cycling words (blur + slide)
  - Masked `clip-path` reveals (`MaskReveal`)
  - Mouse parallax (hero orbs)
  - Scroll-driven orb layers
  - Animated film-grain texture (stepped frames)
  - Page-level blur transitions

**Information architecture + page redesign (v2):**
- ✅ **Home (fully restructured, scene-based, asymmetric):**
  - Asymmetric cinematic hero (broken across viewport, kinetic italic word)
  - Thesis scene (strike-through + replacement)
  - Narrative-value 3-beat scene (no cards; alternating rows)
  - Offer scene (alternating editorial list; odd/even flipped)
  - Work chapters (immersive alternating spreads; no grid)
  - Process teaser with v2 copy on a vertical timeline with cobalt nodes:
    - **Find the story → Shape the feeling → Build the experience → Launch with weight**
  - About teaser
  - Emotional closing footer: **“Make them stop / feel / remember.”**
- ✅ **Work index:** alternating chapter spreads (not a card grid)
- ✅ **Work detail:** giant client hero + italic tagline + mask-revealed scene visual + numbered sections + cobalt stats + next-chapter CTA
- ✅ **Services:** asymmetric scene per service (big italic number / display name / body + price) + always/never/optional matrix
- ✅ **Process:** 4 moves (new v2 copy), each as a scene with roman numerals
- ✅ **About:** founder scene cards (initials as typography) + numbered belief rows
- ✅ **Contact:** same qualifying fields; new scene header; cobalt success state
- ✅ **Admin:** functionality unchanged; refreshed visuals with v2 tokens

**End Phase 3 testing:** ✅ Completed
- ✅ Regression testing:
  - ✅ Backend: **100% (22/22)**
  - ✅ Frontend: **98%**
  - ⚠️ Only flagged item was a Playwright click-interception note on `admin-logout` (LOW priority). Manually verified: **logout works end-to-end** (dashboard → login).

---

### Phase 4 — Hardening + small upgrades (production-friendly MVP) 🔜 Optional / Next
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

**End Phase 4:**
- Re-run **testing_agent_v3** for regression after changes.

---

## 3) Next Actions
1. ✅ No action required to use the site as-is (Phases 1–3 shipped; v2 is current).
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
- ✅ Brand: site feels **authored, cinematic, editorial, anti-template**; no visual carry-over from v1.
- ✅ Visual system: Fraunces + DM Sans + JetBrains Mono; cobalt/ultraviolet accents; atmospheric grain; deliberate asymmetry.
- ✅ UX: Home reads as a paced narrative (scenes) with a heavy emotional closing.
- ✅ Core: contact submissions reliably persist in MongoDB; success state displayed.
- ✅ Admin: password-gated access; submissions list + drawer detail view; status updates + delete + logout.
- ✅ Quality: responsive on mobile/desktop; motion is smooth and non-blocking; testing passes (backend 100%; frontend flows pass; only LOW-priority automation note).
