# 🚀 Portfolio V2 — Design Overhaul + Feature Implementation Plan

## Vision

Transform your portfolio from a clean V1 into an **Awwwards-worthy, recruiter-stunning experience** with interactive 3D graphics, live API data, intelligent chat, and premium visual design.

## Design Mockups

Here's the direction I'm proposing:

### Hero Section — Interactive 3D Particles + Floating Geometry
![Hero redesign concept](C:\Users\anike\.gemini\antigravity-ide\brain\0048a230-f37f-4063-ab23-be0d26511b3b\hero_redesign_concept_1788702894604.jpg)

**Key changes:**
- Animated 3D particle field using `@react-three/fiber` behind the hero text
- Floating geometric shapes (icosahedron, torus) that react to mouse movement
- Smooth parallax depth effect as user scrolls
- Everything is lightweight — GPU-driven, won't hurt mobile performance

### Projects + Skills Sections — Bento Grid + Icon Grid  
![Projects and Skills redesign](C:\Users\anike\.gemini\antigravity-ide\brain\0048a230-f37f-4063-ab23-be0d26511b3b\projects_skills_redesign_1788702923279.jpg)

**Key changes:**
- **Projects**: Bento-grid cards with screenshot thumbnails, gradient hover borders, category filter tabs
- **Skills**: Replace progress bars with modern icon grid cards (grouped by category) — no more percentages

---

## Implementation Phases

### Phase 1: Design Overhaul (Core — Do First)

---

#### 1.1 Interactive 3D Hero Background (Three.js)

##### [NEW] `client/src/components/three/ParticleField.jsx`
- Floating particle cloud using `@react-three/fiber` + `@react-three/drei`
- ~200 particles in a sphere formation, slowly rotating
- Purple & cyan colored points with bloom/glow
- Responds to mouse position (subtle parallax)
- Auto-degrades on mobile (fewer particles, no mouse tracking)

##### [NEW] `client/src/components/three/FloatingShapes.jsx`
- 2-3 wireframe geometric shapes (icosahedron, torus, octahedron)
- Slow rotation + floating animation
- React to cursor proximity (magnetic repulsion effect)
- Purple/cyan emissive wireframe material

##### [MODIFY] `Hero.jsx`
- Replace static CSS orbs with Three.js `<Canvas>` component
- Add a `<Suspense>` fallback (the current orbs) for loading
- Add typewriter/rotating text effect for roles: "Full-Stack Engineer", "ML Researcher", "Systems Builder" cycling
- Add **Resume Download** button as a third CTA
- Add LinkedIn social link

##### New dependencies:
```
@react-three/fiber @react-three/drei three
```

---

#### 1.2 Skills Section Redesign — Icon Grid

##### [MODIFY] `Skills.jsx`
- **Remove** progress bar percentage system entirely  
- Replace with modern **icon grid** layout:
  - Each skill = glass card with tech logo icon + name
  - Grouped by category with colored headers
  - Hover effect: card lifts, border glows with category color
- Add a new **"Tools & DevOps"** category: Git, Docker, Linux, VS Code, Postman
- Use [devicon](https://devicon.dev/) CDN for tech logos (no npm install needed)

---

#### 1.3 Projects Section Redesign — Bento Cards with Thumbnails

##### [MODIFY] `Projects.jsx`
- Add **category filter tabs** at the top: All | Full-Stack | ML
- Each project card gets a **screenshot/thumbnail** area (generated image)
- Bento-grid layout (varying card sizes for featured vs. normal)
- Animated gradient border on hover
- Add project **status badges** (Live, In Progress, Open Source)

##### [NEW] `client/src/assets/projects/` — Project screenshots
- Generate 2-3 project preview images

---

#### 1.4 New Education Section

##### [NEW] `client/src/components/Education.jsx`
- Timeline-style layout (similar to Experience)
- Your college, degree, year
- Relevant coursework tags
- Place it after Experience section

---

#### 1.5 Dark/Light Theme Toggle

##### [NEW] `client/src/context/ThemeContext.jsx`
- React Context + `localStorage` for persistence
- CSS variables for all colors (replaces hardcoded Tailwind colors)
- Toggle button in Navbar (sun/moon icon with smooth animation)

##### [MODIFY] `tailwind.config.js`
- Add `darkMode: 'class'`
- Define both light and dark color palettes via CSS variables

##### [MODIFY] `index.css`
- Convert all hardcoded colors to CSS custom properties:
  ```css
  :root { --bg: #050810; --text: #f1f5f9; ... }
  :root.light { --bg: #fafafa; --text: #1a1a2e; ... }
  ```

##### [MODIFY] `Navbar.jsx`
- Add theme toggle button (Moon ↔ Sun icon)

---

#### 1.6 Enhanced Navbar + Footer

##### [MODIFY] `Navbar.jsx`
- Add **Resume Download** link (pill button)
- Add **Theme Toggle** button
- Active section indicator (glowing dot or underline)

##### [MODIFY] `Footer.jsx`
- Add LinkedIn, Twitter/X, LeetCode links
- "Back to top" smooth scroll button
- Small site map links

---

### Phase 2: V2 Features

---

#### 2.1 Live GitHub API Integration

##### [NEW] `client/src/components/GitHubActivity.jsx`
- Fetch latest repos from GitHub REST API (no auth needed for public)
- Show: repo name, stars, language, last updated
- GitHub contribution heatmap (using `react-github-calendar`)
- Auto-refresh every 5 minutes
- Place in a new "Open Source" or "Activity" section

##### [NEW] `client/src/utils/github.js`
- API helper: `fetchRepos()`, `fetchProfile()`
- Caching layer with `sessionStorage` to avoid rate limits

##### New dependency:
```
react-github-calendar
```

---

#### 2.2 AI Chatbot (Smart Scripted → LLM Upgrade Path)

##### [NEW] `client/src/components/Chatbot/ChatWidget.jsx`
- Floating chat bubble (bottom-right corner)
- Click to open → glass panel with chat UI
- **Phase A (now):** Rule-based responses with fuzzy matching
  - Pre-loaded with your resume data, project details, skills
  - Handles: "What are your skills?", "Tell me about E-Shop", "Contact info"
- **Phase B (later):** Swap in OpenAI/Gemini API for natural language responses

##### [NEW] `client/src/components/Chatbot/ChatBubble.jsx`
- Animated floating button with pulse ring
- Unread message indicator
- Smooth open/close panel animation

##### [NEW] `client/src/data/chatbotKnowledge.js`
- Structured JSON of your resume, projects, skills, FAQs
- Pattern-response mapping for rule-based mode

---

#### 2.3 Blog Section (Markdown-Based)

##### [NEW] `client/src/components/Blog.jsx`
- Render markdown blog posts from a `data/posts/` directory
- Card grid with title, date, category, read time, excerpt
- Full post view with syntax highlighting (`react-syntax-highlighter`)
- Categories: Technical, Creative Writing, Tutorials

##### [NEW] `client/src/data/posts/`
- Markdown files for blog posts
- Frontmatter for metadata (title, date, tags)

##### New dependencies:
```
react-markdown remark-gfm react-syntax-highlighter
```

---

#### 2.4 Live ML Demo (TensorFlow.js)

> [!WARNING]
> This is the most complex feature. Recommend implementing last after everything else is stable.

##### [NEW] `client/src/components/MLDemo/MLPlayground.jsx`
- Interactive demo embedded in the Projects section
- Upload vibration data CSV → browser runs inference → shows prediction
- Uses a pre-converted TensorFlow.js model (converted from your Scikit-Learn model via ONNX → TF.js)
- Visualization: real-time chart showing health stages, RUL estimate

##### New dependencies:
```
@tensorflow/tfjs chart.js react-chartjs-2
```

---

### Phase 3: Polish & Deploy

---

#### 3.1 Performance Optimization
- Lazy load sections below the fold (`React.lazy` + `Suspense`)
- Image optimization (WebP format, responsive `srcset`)
- Three.js canvas cleanup on unmount

#### 3.2 SEO Enhancement
- Add structured data (JSON-LD) for Person schema
- OG image generation
- Canonical URLs

#### 3.3 Accessibility
- Skip navigation link
- ARIA labels on all interactive elements
- Keyboard navigation for chatbot
- Reduced motion media query for animations

---

## New Dependencies Summary

| Package | Purpose | Phase |
|---|---|---|
| `three` | 3D rendering engine | Phase 1 |
| `@react-three/fiber` | React renderer for Three.js | Phase 1 |
| `@react-three/drei` | Helpers (OrbitControls, Float, etc.) | Phase 1 |
| `react-github-calendar` | GitHub contribution heatmap | Phase 2 |
| `react-markdown` | Blog post rendering | Phase 2 |
| `remark-gfm` | GitHub flavored markdown | Phase 2 |
| `react-syntax-highlighter` | Code block highlighting in blog | Phase 2 |
| `@tensorflow/tfjs` | Browser ML inference | Phase 2 |
| `chart.js` + `react-chartjs-2` | ML demo visualizations | Phase 2 |

---

## Open Questions

> [!IMPORTANT]
> Please answer these so I can customize the implementation:

1. **Education details** — College name, degree, year, CGPA/percentage, any notable courses?
2. **Resume PDF** — Do you have a resume PDF ready to link? Or should I add a placeholder?
3. **LinkedIn URL** — What's your LinkedIn profile link?
4. **LeetCode/Codeforces** — Do you have competitive programming profiles to link?
5. **Blog content** — Do you have any blog posts ready, or should I create placeholder/sample posts?
6. **Phase priority** — Should I start with Phase 1 (design overhaul) first, or do you want a specific V2 feature immediately?

---

## Verification Plan

### Automated
- `npm run build` — ensure production build succeeds
- Lighthouse audit — target 90+ on Performance, Accessibility, SEO

### Manual
- Visual review of each section on desktop + mobile
- Three.js performance check on low-end device
- Theme toggle persistence across page refresh
- Chatbot conversation flow testing
- GitHub API data freshness verification
