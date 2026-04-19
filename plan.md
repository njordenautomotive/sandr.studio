# plan.md

## 1) Objectives
- Ship a premium, cinematic, story-first marketing site for **sandr.studio** that instantly communicates: **“Story-driven websites for startups that refuse to look generic.”**
- Deliver multi-page IA: **Home, Work, Work Detail, Services, Process, About, Contact + hidden Admin**.
- Core workflow: **Contact form → FastAPI → MongoDB**, plus **password-gated Admin** to review submissions.
- Establish a cohesive design/motion system: deep near-black base, warm off-white text, **single cold electric steel-blue accent**, editorial type pairing, purposeful motion.

---

## 2) Implementation Steps

### Phase 1 — Build directly (core is CRUD + simple auth gate)
**User stories (core flow):**
1. As a founder, I can submit a project inquiry with timeline/budget so sandr can qualify me.
2. As sandr, I can see all inquiries in one place so nothing gets lost.
3. As sandr, I can open an inquiry and read the full context quickly.
4. As sandr, I can log into an admin area so inquiries aren’t public.
5. As a visitor, I get a clean success state after submitting so I know it worked.

**Backend (FastAPI + MongoDB):**
- Create `ContactSubmission` model (name/email/company/website/need/problem/timeline/budget/desired_feel, createdAt, status).
- Endpoints:
  - `POST /api/contact` create submission
  - `GET /api/admin/submissions` list submissions (protected)
  - `GET /api/admin/submissions/{id}` single submission (protected)
  - `PATCH /api/admin/submissions/{id}` update status (optional MVP)
- Implement simple admin auth:
  - `POST /api/admin/login` → returns short-lived token (JWT or signed token)
  - Middleware/dependency to protect `/api/admin/*`
  - Env var: `ADMIN_PASSWORD` (and `JWT_SECRET` if using JWT)

**Frontend foundation (React + Router + Tailwind + framer-motion):**
- Install/configure **framer-motion**.
- App shell: cinematic nav, footer, page transitions.
- Build pages + routing:
  - `/` Home (full story)
  - `/work` Work index (4 concept projects)
  - `/work/:slug` Work detail story page
  - `/services`, `/process`, `/about`, `/contact`
  - `/admin` login, `/admin/dashboard` submissions list/detail
- Contact form:
  - React Hook Form + zod validation, inline errors
  - Submit to `POST /api/contact`
  - Success panel + disable repeat submit until reset
- Admin:
  - Login form stores token in memory/localStorage
  - Dashboard table + detail drawer/page

**Content + design system (MVP but premium):**
- Typography: editorial display (serif) + modern sans body.
- Color tokens: near-black bg, warm off-white text, **steel-blue accent** for focus states/links.
- Components: cinematic buttons, section headers, project cards, form fields.
- Motion rules: hero entrance, staggered reveals, subtle parallax bands, restrained hovers.

**Concept work content (4 fictional but believable projects):**
- Create slugs + narratives (challenge → story idea → direction → outcome) with placeholders for visuals.
- Ensure each reads like a real founder problem and a story-first solution.

**End Phase 1 checkpoint:**
- One full E2E pass: Contact submit works, stored in MongoDB, admin login works, submissions viewable.

---

### Phase 2 — V1 App polish (design fidelity + motion + copy)
**User stories (experience + brand):**
1. As a visitor, I understand what sandr does in under 10 seconds.
2. As a visitor, I feel the site is premium and cinematic, not templated.
3. As a visitor, scrolling feels like a narrative with pacing and payoff.
4. As a founder, I can scan services/pricing posture quickly without walls of text.
5. As sandr, I can replace concept work later without rewriting the UI.

- Rewrite/lock copy to match voice: sharp, short, slightly confrontational; no agency fluff.
- Home page section build-out (hero → problem → solution → services → why → speed → work → process → about teaser → final CTA).
- Upgrade Work cards to cinematic previews; add hover motion + case-study rhythm.
- Add global motion system:
  - Page transitions, scroll reveal primitives, reduced-motion support.
- Improve Admin UX:
  - Search/filter (by status/date) and a clean detail view.

**End Phase 2:**
- Run **testing_agent_v3** E2E: navigation, contact submit, admin auth, submissions rendering, mobile responsiveness.

---

### Phase 3 — Hardening + small upgrades (production-friendly MVP)
**User stories (stability + maintainability):**
1. As a visitor, the site loads fast even with motion.
2. As a visitor, animations don’t block readability.
3. As sandr, I can mark inquiries as reviewed so the inbox stays clean.
4. As sandr, I can export inquiries (CSV) if needed.
5. As sandr, I can change admin password via env without code changes.

- Backend hardening: input sanitization, rate limit (lightweight), consistent error responses.
- Add `status` + `notes` fields for submissions; allow `PATCH` from admin.
- Optional CSV export endpoint (protected).
- Frontend performance pass: image/asset optimization, motion throttling, skeleton/loading states.

**End Phase 3:**
- Run **testing_agent_v3** again for regression + key flows.

---

## 3) Next Actions
1. Add env vars: `ADMIN_PASSWORD`, (optional) `JWT_SECRET`.
2. Implement backend contact + admin endpoints and MongoDB collections.
3. Implement React routing + layout + base design tokens.
4. Build Contact + Admin first (prove core data flow), then complete marketing pages.
5. Execute Phase 2 E2E test run and fix all issues before polish upgrades.

---

## 4) Success Criteria
- Brand: site feels **cinematic, editorial, premium**, clearly anti-generic; accent reads as cold steel-blue (not gold/tacky).
- UX: Home tells full story with strong pacing; CTAs clear; no template feel.
- Core: contact submissions reliably persist in MongoDB; success state displayed.
- Admin: password-gated access; submissions list + detail visible; no public exposure.
- Quality: responsive on mobile/desktop; motion is smooth and restrained; E2E tests pass.