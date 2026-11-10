# Portfolio Codebase Audit — Full Report

---

## A. Current Architecture

**Type:** Monorepo with two independent apps.

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 7 + Tailwind CSS 3 |
| Animations | Framer Motion 11 |
| 3D | Three.js 0.185 + @react-three/fiber@8 + @react-three/drei@9 |
| HTTP Client | Axios (with a shared `api.js` utility) |
| Backend | Node.js + Express 4 |
| Database | MongoDB Atlas via Mongoose 8 |
| Email | Nodemailer (conditionally active) |
| Auth | Minimal API-key guard for admin routes only |
| Security | Helmet, express-rate-limit, express-validator |
| Deployment | Render (backend) + Vercel (frontend) |
| Fonts | Syne (display), DM Sans (body), JetBrains Mono |

---

## B. Current Features

- ✅ Hero section with typewriter role animation and Three.js 3D particle/shape background (lazy-loaded)
- ✅ About section with stat counters
- ✅ Skills section with devicon icon grid (Languages, Web, ML, Tools)
- ✅ Projects section with filter tabs (All/Full-Stack/ML), bento grid layout, gradient thumbnails
- ✅ Experience section with vertical timeline (IIT Guwahati internship)
- ✅ Education section (placeholder data currently)
- ✅ Achievements section
- ✅ Contact section with form, client-side + server-side validation
- ✅ Footer with nav, social links, back-to-top
- ✅ Custom Glassmorphism UI system (`.glass` utility, `SectionTitle`, `GlassCard`)
- ✅ Resume download button (Google Drive link)
- ✅ LinkedIn, GitHub, Email social links (correct URLs)
- ✅ Scroll-based reveal animations via `useScrollAnimation` hook
- ✅ Custom scrollbar, noise texture overlay

---

## C. What Is Already Good

- **Clean component architecture** — every section is its own isolated component
- **`api.js` utility** — single-source-of-truth for all API calls, with error normalisation
- **Rate limiting** — 100 req/15min globally; 10 contact submissions/hour (great protection)
- **Input validation is doubled** — client-side (`validate()`) AND server-side (`express-validator`)
- **Helmet** — sets security headers (XSS protection, content-type sniffing, etc.)
- **Graceful DB failure** — server doesn't crash if MongoDB is unreachable
- **Lazy-loaded Three.js** — 3D background doesn't block first paint
- **Scroll-based animations** — `useScrollAnimation` reused across all sections
- **Semantic HTML** — `<section>`, `<article>`, `<ul>`, `<form>` used correctly
- **Toast notifications** — user gets feedback on form submit/fail
- **Morgan** — request logging in dev but off in production

---

## D. Critical Problems

> [!CAUTION]
> ### P0 — Contact emails are NOT being delivered to your inbox

**Root cause (detailed in Section I below):** The `SMTP_*` and `OWNER_EMAIL` environment variables are commented out in `.env.example` and almost certainly not configured in the Render dashboard. This means `process.env.SMTP_USER` is `undefined`, the entire email block is silently skipped, and the form **only saves to MongoDB — it never sends you an email.**

You receive no notification when someone contacts you. Messages are piling up silently in Atlas.

> [!CAUTION]
> ### P0 — Resume link is inconsistent / has two different values in the code

`Hero.jsx` has the **folder** link: `https://drive.google.com/drive/u/0/folders/1yghJTbs11AH3NEi8wv9HZCkAfKc5MiWD`  
`Navbar.jsx` uses the **file** link: `https://drive.google.com/file/d/1-lhUbFMlgic3UXMZFDqSfXojE0P5Ybw-/view`

The Navbar link is correct (direct file). The Hero link goes to a folder. They should both point to the same file-view URL.

> [!IMPORTANT]
> ### P1 — Education section has placeholder data

`Education.jsx` says "Your University Name" and "Your City, India". This is live on the deployed site right now.

> [!IMPORTANT]
> ### P1 — CORS is broken for the deployed frontend

`server.js` line 31: `origin: 'http://localhost:5173'` in development mode. In production on Render, `CLIENT_URL` must be set exactly to `https://aniket-portfolio-sable-rho.vercel.app`. If this env var is missing in Render's dashboard, the API could fall through to `true` (allow all), which is a security risk rather than a fix.

> [!IMPORTANT]
> ### P1 — `status` field missing from Project model but used in Projects.jsx

`Projects.jsx` renders `project.status` (e.g. "Completed", "In Progress") with colour-coded badges, but the `Project.js` Mongoose model has **no `status` field**. The fallback data hardcodes `status: 'Completed'`, but any project seeded into MongoDB will have no status and the badge won't show.

---

## E. UI/UX Problems

- **Navbar is too wide** — with 7 nav links + Resume + GitHub, it overflows on medium screens (1024–1280px range) before the mobile menu kicks in.
- **Mobile menu** — the Navbar has a hamburger icon but needs verification that all 7+2 links fit properly in the mobile drawer.
- **Education section is empty** — placeholder content damages credibility with recruiters.
- **Projects section shows only 2 projects** — the page looks sparse. Even if these are your only two major projects, you could add smaller/academic ones.
- **No `og:image`** — social media link previews (LinkedIn share, WhatsApp) will show a blank box. A proper OG image would make shares look professional.
- **No 404 page** — navigating to `/anything-else` shows a blank white screen.
- **Navbar scroll-spy** — active link highlighting on scroll is not implemented, so users can't easily tell which section they're in.
- **Availability badge** — "Available for opportunities" is hardcoded. When you're no longer available, you'd need a code change to update it.

---

## F. Technical Problems

- **`VITE_API_URL` env var is unused on Vercel** — `api.js` falls back to `/api` (relative path), which only works if the frontend is on the same origin as the backend. On Vercel, the frontend is at `vercel.app` but the backend is on `render.com`. **All API calls (fetch projects, submit contact) are silently failing on the live site.** The projects section shows fallback hardcoded data, not the database data.
- **Three.js bundle is very large** — `three`, `@react-three/fiber`, `@react-three/drei` together add ~800KB+ to the bundle. This should be code-split further.
- **`tailwind.config.js` has no `darkMode` strategy** — theming support is hardcoded values, not CSS variables. Implementing a theme toggle later will require significant refactoring.
- **No `robots.txt` or `sitemap.xml`** — search engines will crawl blindly.
- **`src/index.css` hardcodes colors** — `background-color: #050810` and `color: #f1f5f9` are hardcoded in CSS and also in Tailwind config. If you change the palette, you must update both.
- **Unused `skillRoutes.js`** — there's a full skill route + `Skill.js` model, but the Skills component uses static hardcoded data and never calls `/api/skills`.

---

## G. Security Problems

- **`ADMIN_API_KEY` probably not set** — if `process.env.ADMIN_API_KEY` is falsy (env var not configured), the `adminAuth` guard on `GET /api/contact` becomes broken: it will reject any request including valid ones, because the condition `!process.env.ADMIN_API_KEY` is `true`.
- **No XSS sanitisation on stored contact messages** — messages are stored raw. If you ever render them in an admin UI using `innerHTML` or similar, there's an XSS risk. (Low risk for now since there's no admin UI.)
- **`helmet()` is used but CSP is not configured** — Content Security Policy is the strongest XSS protection. Helmet's default CSP is permissive.
- **Server port binding**: You reverted from `0.0.0.0` to `localhost` — this will prevent Render from binding the port correctly in production. This needs to go back to `0.0.0.0`.

---

## H. Performance Problems

- **No image optimization** — `logo.jpg` in `/assets` is loaded directly with no compression or WebP conversion.
- **No `<link rel="preload">` for critical fonts** — Google Fonts is fetched late.
- **Three.js is lazy-loaded** ✅ but there's no loading skeleton — there's a CSS orb fallback, but no visual progress indicator for slower connections.
- **No Vite bundle analysis** — we don't know the final chunk sizes. Three.js is likely the dominant chunk.
- **`api.js` timeout is 60 seconds** — too long. On the live Render free-tier, cold starts take ~30s, which means contacts can hang for 60s before erroring. Better: implement a fast failure with a friendly message.
- **No caching** — `/api/projects` is fetched on every page load with no cache headers or client-side caching.

---

## I. Contact / Email Problem — Root Cause

**The full flow:**

```
Visitor fills form
  → Client-side validate() in Contact.jsx
  → POST /api/contact (via Axios)
  → Express validator on server
  → Contact.create() → saved to MongoDB Atlas ✅
  → if (process.env.SMTP_USER) { sendMail() } ← THIS IS NEVER TRUE
  → 201 response sent back to client
  → Client shows toast success ✅
```

**The exact failure point:** The `if (process.env.SMTP_USER)` check on line 17 of `contactController.js`.

Since the SMTP variables are commented out in `.env.example` and almost certainly not configured on Render, `process.env.SMTP_USER` is `undefined`. The entire `nodemailer.sendMail()` block is never executed. The message is saved to MongoDB but **you are never notified**.

**The fix is simple and safe:**
1. Create a Gmail App Password for `aniketkumar821108@gmail.com`
2. Add `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `OWNER_EMAIL` to Render's environment variables
3. No code change required — the controller already handles it correctly

**Secondary issue:** Even if SMTP were configured, the Vercel frontend's API calls go to `/api` (a relative path), which resolves to `https://aniket-portfolio-sable-rho.vercel.app/api` — **not** your Render backend. So contact form submissions may be failing entirely on the live site before even reaching the backend.

---

## J. Recommended Improvements

| Priority | Item |
|---|---|
| **P0** | Fix `VITE_API_URL` on Vercel to point to Render backend |
| **P0** | Fix server to listen on `0.0.0.0` for Render |
| **P0** | Configure SMTP env vars on Render to enable email notifications |
| **P0** | Fix Hero resume link to match Navbar (use the file-view URL) |
| **P1** | Fill in Education section with real data |
| **P1** | Add `ADMIN_API_KEY` to Render env vars |
| **P1** | Add `og:image` meta tag (1200×630 image for social sharing) |
| **P1** | Add `robots.txt` and `sitemap.xml` |
| **P1** | Add `status` field to Project Mongoose model |
| **P1** | Add a 404 page |
| **P2** | Add Navbar scroll-spy active link highlighting |
| **P2** | Implement Dark/Light theme toggle with CSS variables |
| **P2** | Add GitHub API integration (show live star counts, last commit) |
| **P2** | Add Gemini API chatbot (context-aware portfolio assistant) |
| **P2** | Reduce Three.js bundle size (tree-shake or replace with CSS animation) |
| **P3** | Add a technical blog section |
| **P3** | Add competitive programming stats (LeetCode/Codeforces API) |
| **P3** | Implement admin dashboard to read contact messages |

---

## K. Features That Should NOT Be Added (Yet)

| Feature | Reason |
|---|---|
| **Live ML browser demos (TensorFlow.js/ONNX.js)** | ONNX models are 50–200MB+. Will destroy page load time. Better to link to a separate hosted demo URL. |
| **MDX/CMS blog** | Requires significant new infrastructure (Contentlayer, Sanity, etc.). Should be a separate phase only if you plan to write regularly. |
| **Next.js migration** | Your current Vite + Express setup works fine. Migrating to Next.js is high-effort with no immediate payoff given the current issues. |
| **WebSocket real-time features** | No use-case for it in a portfolio yet. |
| **Auth system / secure admin** | Overcomplicated for a portfolio. Reading messages via MongoDB Atlas GUI is sufficient for now. |

---

## L. Proposed Implementation Roadmap

### Phase 0 — Critical Fixes (Do This First, ~2 hours)
1. Fix `VITE_API_URL` on Vercel env vars
2. Fix server `listen` to use `0.0.0.0` 
3. Configure SMTP on Render env vars
4. Fix Hero resume link
5. Fill in Education details

### Phase 1 — Design & Polish (Current focus, ~1 day)
6. Navbar scroll-spy
7. Dark/Light theme toggle
8. `og:image` + `robots.txt` + `sitemap.xml`
9. 404 page
10. Fix Project model `status` field

### Phase 2 — V2 Features (~1 week)
11. GitHub API integration
12. Gemini API chatbot widget
13. Add more projects / open source work
14. Blog section (Markdown-based, simple)

### Phase 3 — Performance (~2 days)
15. Bundle analysis + Three.js optimization
16. Image optimization
17. Caching headers on `/api/projects`

---

## Questions for You

**Batch 1 — Critical Info Needed:**

1. **Render environment variables:** Have you set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `OWNER_EMAIL`, and `CLIENT_URL` in your Render dashboard? (These are the root cause of the contact failure)

2. **Vercel environment variables:** Have you set `VITE_API_URL=https://your-render-backend-url.com` in your Vercel project settings? This is needed for the live site to talk to the backend at all.

3. **Education details:** What is your college/university name, degree, years, location, and CGPA?

4. **Server URL:** What is the exact URL of your Render backend deployment? (e.g. `https://aniket-portfolio-xyz.onrender.com`) This is needed to fix the Vercel `VITE_API_URL`.
