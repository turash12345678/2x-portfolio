# 🤖 2X Portfolio & Agent Workspace — Master AI Context (read-agent.md)

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS (Antigravity, Cursor, Claude Code, Copilot, ChatGPT, etc.):**  
> Whenever you start working in this repository on ANY computer or session, **READ THIS FILE FIRST**.  
> Because local AI chat conversation histories do not synchronize across devices, this file serves as the **Permanent Collective Brain, Architecture Guide, and Living State Tracker** for Turash Ahsan's 2X Portfolio project.  
> **RULE:** At the end of every task or milestone, or when prompted via `/schedule`, you **MUST** update the [Recent Progress & Living State](#-8-recent-progress--living-state) section with what you modified and what the current next steps are.

---

## 👤 1. Project Owner & Profile

* **Full Name:** Turash Ahsan (First: Turash | Last: Ahsan)
* **Role / Profession:** UI/UX Designer & Product Designer
* **Current Company:** Ahsania (Leading web/mobile design systems, UX architecture in Figma)
* **Experience:** 2+ Years (Enterprise products + 15+ client & freelance projects)
* **Phone / WhatsApp:** `+880 172 325 3615` (Local: `01723253615`)
* **Primary Email:** `turashahsan8@gmail.com`
* **Live Portfolio Website:** [turashahsan.vercel.app](https://turashahsan.vercel.app)
* **GitHub Repository:** [github.com/turash12345678/2x-portfolio](https://github.com/turash12345678/2x-portfolio)
* **LinkedIn:** [linkedin.com/in/turashahsan1234](https://www.linkedin.com/in/turashahsan1234/)
* **Location:** Dhaka, Bangladesh
* **Expected Salary:** 35,000 BDT (Local / Negotiable) | Market Rate (Remote / Global)

---

## 🏗️ 2. Tech Stack & Architecture

* **Framework:** React 19 + TypeScript 5.7
* **Build Tool:** Vite 8 (`@vitejs/plugin-react`)
* **Styling:** Tailwind CSS v4 (`@tailwindcss/vite` plugin, configured via `@import 'tailwindcss';` in `src/index.css`)
* **Animation:** Framer Motion (`framer-motion`)
* **Icons:** HugeIcons (`@hugeicons/react`), Lucide React (`lucide-react`)
* **Database & Persistence:** Supabase Client (`@supabase/supabase-js`), synchronizing site configuration and content with local storage fallback (`src/services/db.ts`).
* **Deployment:** Vercel (Auto-deploy on git push to `main` branch).
* **Development Environment:** Figma Make App runtime environment. Vite dev server runs on `$PORT` (default `8443`).

---

## 📁 3. Repository Map & Key Modules

```text
e:\2x ✦ Portfolio\
├── read-agent.md              <-- YOU ARE HERE: Master living brain for all AI sessions
├── AGENTS.md                  <-- System rules automatically loaded by Antigravity
├── Job Application Agent.md   <-- Instructions, templates & ATS rules for job automation
├── job_tracker.json & .csv    <-- 400+ job applications database with statuses & timestamps
├── jobs_1000_master_list.md   <-- Master company and hiring pipeline targets
├── proof_*.png                <-- Screenshot evidence of submitted job applications
├── Context Management/        <-- Agentic AI context frameworks & research archives
├── public/                    <-- Static assets, favicons, OG banners, PDFs
│   ├── Turash Ahsan Portfolio.pdf
│   └── Turash Ahsan Resume (ATS Under 2MB).pdf
└── src/
    ├── main.tsx               <-- Application entrypoint
    ├── App.tsx                <-- Primary shell, tab switcher, page routing (home/dashboard/casestudy)
    ├── index.css              <-- Global Tailwind v4 styles and custom fonts
    ├── pages/
    │   ├── CaseStudy.tsx      <-- 10MS Live Class Redesign Case Study (interactive player & deep-dive)
    │   └── Dashboard.tsx      <-- Protected Admin CMS for editing portfolio content
    ├── components/
    │   ├── Navbar/NavbarV2.tsx<-- Primary desktop navigation with Case Story link
    │   ├── Hero/              <-- Portfolio hero section
    │   ├── Bento/             <-- Interactive work showcase bento grids
    │   ├── VideoLightbox/     <-- Modal video player
    │   └── ...
    ├── imports/
    │   ├── Component1/        <-- Desktop floating navigation pill
    │   └── Component1-1/      <-- Mobile responsive navigation pill
    ├── services/
    │   └── db.ts              <-- Supabase data fetching, syncing & local storage cache
    └── config/
        └── site.ts            <-- Site metadata, PIN authentication & navbar version flags
```

---

## 🧭 4. Core Application Flows

### 1. Portfolio Home (`src/App.tsx`)
- Renders the primary portfolio landing page showcasing Turash's case studies, skills, experience, and interactive elements.
- Features top navigation (`NavbarV2`) and floating bottom pill navigation (`Component1` / `Component1-1`).
- Has a secret admin dashboard trigger via PIN modal.

### 2. Case Study Hub (`src/pages/CaseStudy.tsx`)
- Detailed design case study for the **10 Minute School (10MS) Live Class Experience Redesign**.
- Contains an **interactive live class mock player** with interactive tabs (`Inbox`, `Discussion`, `Quiz`), stream quality toggles, AI answer preview, interactive quiz submission, emotion reactions, and exit modal with feedback rating.
- Includes problem statements, legacy audit, user personas, design psychology, design system tokens, and business metrics.
- Navigation: Accessed via the **"Case Story"** button (tagged with a green `New` badge) on all navbars.

### 3. Admin CMS Dashboard (`src/pages/Dashboard.tsx`)
- Protected by PIN (`siteConfig.adminPin`).
- Allows editing copy, video links, social handles, and highlights without touching code.
- Synced directly to Supabase via `src/services/db.ts`.

### 4. Autonomous Job Application System
- Documented in `Job Application Agent.md`.
- Tracks submissions in `job_tracker.json` and `job_tracker.csv`.
- Captures screenshot proofs in `proof_*.png`.
- Strictly enforces ATS resume guidelines (<= 2MB for portals like Lever/Freshteam; master full PDF for direct emails).

---

## ⚡ 5. Strict Coding Guidelines & Rules

1. **Apostrophes in Strings:** Always use double quotes for strings containing apostrophes (`"We're here to help"`), or escape single quotes (`'We\'re'`). Unescaped single quotes break Vite builds.
2. **Tailwind CSS v4:** Directly use Tailwind utility classes in JSX. Do NOT attempt to create `tailwind.config.js` or `postcss.config.js`. Global font wiring belongs in `src/index.css`.
3. **Component Exports:** Export components as default exports (`export default function ComponentName()`).
4. **Build Verification:** Always verify code changes with:
   ```bash
   npm run build
   ```
   Must pass cleanly with zero TypeScript / Vite compilation errors.
5. **Preserve Comments & Architecture:** Keep existing comments and docstrings intact.

---

## 🤖 6. AI Agent Collaboration Protocol

When working across multiple machines or fresh AI instances:
1. **On Session Start:**
   - Read this file (`read-agent.md`).
   - Check `git status` and `git log -n 5` to see what was done last.
2. **During Development:**
   - Follow the design conventions and tech stack established here.
   - Maintain the dual-navigation setup in `src/App.tsx` (mobile `Component1_1`, desktop `NavbarV2` and floating `Component1`).
3. **On Session Finish or Milestone:**
   - Update Section 8 of `read-agent.md` with:
     - Date & Timestamp
     - Summary of changes made
     - Updated current status
     - Next items to work on
   - Commit and push to GitHub so your changes and context are available everywhere.

---

## ⏱️ 7. Context Synchronization & Living Memory Skill (`/..` or `/sync`)

We have created an automated skill located at [`.agents/skills/sync-agent-context/SKILL.md`](file:///e:/2x%20%E2%9C%A6%20Portfolio/.agents/skills/sync-agent-context/SKILL.md).

### 🚀 Instant Trigger Shortcuts:
Whenever you finish working, want to sync progress, or want the AI to update this file and push to GitHub, simply type:
* `/sync`
* `/..`
* `/sync-context`
* or `"sync context"` / `"read-agent update kore push dao"`

### ⚡ What It Does Automatically:
1. Audits `git status` and recent diffs to capture all work done in the current session.
2. Updates **Section 8 (Recent Progress & Living State)** in `read-agent.md` with timestamps and new milestones.
3. Runs `npm run build` to verify that production build compiles with zero errors.
4. Executes `git add -A`, commits with a descriptive message, and runs `git push origin main`.
5. Ensures that whenever you log in on another PC or start a new AI session, the AI has 100% up-to-date memory!

---

## 📜 8. Recent Progress & Living State (Last Updated: 2026-09-30 20:30)

### ✅ Completed Milestones:
1. **Figma Canvas — Complete 10MS Detailed Case Study Frame (`Desktop - 8`):**
   - **Dedicated Frame Created:** Generated `Desktop - 8 (10MS Detailed Case Study)` (`node-id=435-26`) at `x: 21344` on canvas (`1440 × 7798px`), strictly preserving the original `Desktop - 7` (`381:64`) 100% untouched.
   - **Visual Design Patterns Adapted from `Desktop - 5` (`326:4175`):** Modeled high-craft layouts, sidebar jump navigation, monospace badges, pill tags, structured grids, and architectural diagrams.
   - **9 Comprehensive In-Depth Sections Implemented:**
     1. *Overview & Problem:* 3-pillar highlights + `10MS Stream Bottleneck Architecture Diagram` (Origin Ingest -> Bottleneck Cluster -> System Failure).
     2. *Solution Showcase:* High-fidelity dark-mode mobile classroom mockup (`437:607`) with real-time stream viewport, 3-tab controller, formula doubt queue, and Ask AI Copilot cards.
     3. *Core Flows:* 4 interaction cards with integrated Mini UI Viewport Previews (`Teacher Camera Viewport`, `Interactive Quiz & 12-State Timer`, `360p Low-Bandwidth & Instant Rewind`, `Ask AI Copilot`).
     4. *Legacy System Audit:* `19 Physical Scanned Audit Sheets Showcase Board` (sheets `02`, `06`, `10`, `14` with red pencil annotations) + 5 heuristic cards.
     5. *Research & Personas:* Primary student dossiers (Turjo - HSC Aspirant, Zayed - Low-Bandwidth Rural Learner) + `Layout Architecture Decision Matrix` (Floating Overlay vs Drawer vs 3-Tab Controller).
     6. *Testing & Validation:* Google Form study metrics (78% Layout B preference, 3.2x question triage speedup, 100% whiteboard visibility) + direct student verbatim quotes.
     7. *Design Decisions:* `Tripartite Live Systems Thinking Architecture Diagram` (WebRTC Ingest, Gateway API, Ask AI Copilot, Student Client) + 3 foundational architectural decisions + psychology principles.
     8. *Hardware & Network Constraints:* `Editorial Question Callout Box` + ABR vs Fixed 360p fallback comparison cards + `Trade-off Strategic Conclusion Banner`.
     9. *Reflection:* 3 Senior Takeaway Dossiers with emerald `01`, `02`, `03` badges.
   - **Sidebar Navigation (`435:48`):** Synchronized all 9 buttons with matching anchor titles.
2. **Architecture Tree & Case Study Audit:**
   - Provided complete structural tree, design rationale, and section-by-section audit connecting the visual Figma artifacts with the underlying problem statement.
3. **Job Application Pipeline Milestone — 600 Total Applications Achieved:**
   - Scaled job pipeline to **600 verified applications** (`SL #501` to `SL #600`) across direct ATS portals (Ashby HQ, Greenhouse, Lever, Workable, etc.).
   - Both `job_tracker.json` (600 records) and `job_tracker.csv` (601 rows) updated in lockstep with 100 new proof files (`proof_batch_501_*.png` to `proof_batch_600_*.png`).
4. **Autonomous Direct Gmail Cold Outreach (50/50 Completed):**
   - 50 premier global design studios and tech firms contacted directly via Chrome CDP into Turash's active Gmail session (`turashahsan8@gmail.com`) with `Turash Ahsan Resume.pdf` attached.
   - Captured 50 full compose/attachment proof screenshots (`proof_cold_*.png`) and ledger saved in `cold_email_sent_status.json`.

### 📌 Current Status:
- Figma Case Study frame `Desktop - 8` (`node-id=435-26`) complete and published in file `2x ✦ Portfolio`.
- Original frame `Desktop - 7` (`381:64`) safely preserved without modifications.
- Job tracker currently at **600 verified applied applications**.
- Direct Gmail Cold Email Outreach at **50/50 verified sent emails** with resume attached.
- **Grand Total Outreach:** **650 job applications / studio contacts** dispatched.
- Codebase builds cleanly with `npm run build` (0 errors).

### 🎯 Immediate Next Steps / Multi-PC Transition:
1. **On Next PC:** Run `git pull origin main` to pull all project memory, documentation, trackers, and codebase updates.
2. **Figma Access:** Open Figma file `2x ✦ Portfolio` (node `435:26` - `Desktop - 8 (10MS Detailed Case Study)`) to review or refine the complete case study visually.
3. **If developing live code:** When ready to code this into the portfolio website, use `Desktop - 8` as the single source of truth for all components, typography, and section structures.
4. **Outreach Monitoring:** Check Turash's Gmail inbox (`turashahsan8@gmail.com`) for interview replies and recruiter responses.




