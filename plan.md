# plan.md (updated)

## 1) Objectives
- ✅ Ship a premium, cinematic, story-first marketing site for **sandr.studio** that instantly communicates: **“Story-driven websites for startups that refuse to look generic.”**
- ✅ Deliver multi-page IA: **Home, Work, Work Detail, Services, Process, About, Contact + hidden Admin**.
- ✅ Core workflow: **Contact form → FastAPI → MongoDB**, plus **password-gated Admin** to review submissions.
- ✅ Establish a cohesive design/motion system: deep near-black base, warm off-white text, **single cold electric steel-blue accent**, editorial type pairing, purposeful motion.
- 🔜 (Optional next) Prepare the project for production + content swapping:
  - Replace concept work with real case studies without rewriting UI.
  - Add email notifications + basic anti-spam.
  - Add lightweight export/analytics.

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
- ✅ App shell: cinematic nav, footer, page transitions, mobile nav sheet.
- ✅ Pages + routing:
  - ✅ `/` Home (full story)
  - ✅ `/work` Work index (4 concept projects)
  - ✅ `/work/:slug` Work detail story page
  - ✅ `/services`, `/process`, `/about`, `/contact`
  - ✅ `/admin` login, `/admin/dashboard` submissions list + detail drawer
- ✅ Contact form:
  - ✅ Public submission to `POST /api/contact`
  - ✅ Polished success state + reset
- ✅ Admin:
  - ✅ Token persisted to localStorage
  - ✅ Dashboard supports search, status filter, drawer detail view, status updates, delete, logout

**Content + design system (MVP but premium):** ✅ Completed
- ✅ Typography pairing shipped:
  - Display: **Instrument Serif**
  - Body: **Inter**
  - Labels/eyebrows: **JetBrains Mono**
- ✅ Color system shipped:
  - Base: **#0A0A0B** near-black
  - Accent: **#7AA2FF** cold electric steel-blue (non-gold)
- ✅ Components: cinematic buttons, project cards, editorial sections, premium form inputs.
- ✅ Motion system: hero entrance choreography, staggered reveals, subtle parallax, restrained hover motion.

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

- ✅ Home page narrative arc implemented:
  - Hero → Problem → Solution → Services → Why sandr → Speed → Work → Process → About teaser → Final CTA (via footer)
- ✅ Work cards are cinematic (custom visuals, hover motion).
- ✅ Global motion primitives + reduced-motion support.
- ✅ Admin UX is clean and usable (search/filter + drawer).

**End Phase 2:** ✅ Completed
- ✅ E2E testing via **testing_agent_v3**
  - ✅ Backend: **100% (22/22)**
  - ✅ Frontend: flows pass; report flagged two speculative LOW-priority notes that were verified as non-issues.

---

### Phase 3 — Hardening + small upgrades (production-friendly MVP) 🔜 Optional / Next
**User stories (stability + maintainability):**
1. As a visitor, the site loads fast even with motion.
2. As a visitor, animations don’t block readability.
3. As sandr, I can keep the inbox clean and operational over time.
4. As sandr, I can export inquiries if needed.
5. As sandr, I can change admin secrets without code changes.

**Recommended next upgrades (pick as needed):**
- **Security/ops**
  - Add rate limiting to `POST /api/contact`.
  - Add a honeypot field + basic bot detection.
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

**End Phase 3:**
- Re-run **testing_agent_v3** for regression after changes.

---

## 3) Next Actions
1. ✅ No action required to use the site as-is (Phase 1–2 shipped).
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
- ✅ Brand: site feels **cinematic, editorial, premium**, clearly anti-generic; accent reads as cold steel-blue (not gold/tacky).
- ✅ UX: Home tells full story with strong pacing; CTAs clear; no template feel.
- ✅ Core: contact submissions reliably persist in MongoDB; success state displayed.
- ✅ Admin: password-gated access; submissions list + drawer detail view; status updates + delete + logout; no public exposure.
- ✅ Quality: responsive on mobile/desktop; motion is smooth and restrained; E2E tests pass (backend 100%; frontend flows pass).