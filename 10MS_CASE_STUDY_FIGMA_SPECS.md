# 🎨 10MS Live Class Redesign — 4-Pillar Figma Copy & Layout Specs

> **Target Figma File:** `2x ✦ Portfolio` (`q4D57eROLsfR2CSz3IlOD5`)  
> **Target Frame:** [`Desktop - 8 (10MS Detailed Case Study)` · Node `435:26`](https://www.figma.com/design/q4D57eROLsfR2CSz3IlOD5/2x-%25E2%259C%25A6-Portfolio?node-id=435-26)  
> **Frame Width:** `1440px` (`287px` Sticky Sidebar + `1023px` Main Content Canvas)  
> **Framework:** **4-Pillar Design Operating System (4-POS)** — *Business Crucible → Psychological Audit → Aesthetic Solution → Engineering Bridge*  
> **Companion Audit:** [`case-architecture.md`](./case-architecture.md)

---

## 🧭 Figma Frame-to-Pillar Mapping

| Order | Section Title | 4-POS Pillar | Existing `Desktop - 8` Node Reference |
| :--- | :--- | :--- | :--- |
| **00** | **Hero & Project Snapshot** *(+ 4-Pillar Lens Switcher)* | Entry & Orientation | `435:68` (Hero & Project Header) |
| **01** | **The Business Crucible** | Bedrock (`Product Understanding`) + `Business Impact` | `435:105` (Overview, Problem & Opportunity) |
| **02** | **The Psychological Audit** | `Psychology (UX)` & Legacy Audit | `435:193` (Legacy Audit) + Research & Testing |
| **03** | **The Aesthetic Solution** | `Aesthetic (UI)` & Component Ecosystem | `435:173` (Solution Showcase `437:607`) + `436:355` (Core Flows) |
| **04** | **The Engineering Bridge & Reflection** | `Development (Execution & AI)` | Design Decisions + Hardware/Network Constraints + Reflection |

---

## 00 · Hero & Project Snapshot
**Figma Target:** `435:68` *(Hero & Project Header)*

### Copy Blocks
* **Eyebrow Badge:**
  `CASE STUDY · 01`
* **H1 Headline:**
  `10MS Live Class Redesign`
* **Subheadline:**
  `Eliminating Cognitive Spam & Rural 3G Buffering in Bangladesh’s Largest Live Classroom`
* **Metadata Strip (4-Column Grid):**
  * **Role:** `Product Designer (End-to-End Audit, Architecture, UI System & Prototype)`
  * **Timeline:** `Jan – Feb 2025`
  * **Platforms:** `Android Compact (412×917) & iPhone (393×852)`
  * **Domain:** `EdTech · Real-Time Streaming · Low-Bandwidth UX · AI Copilot`
* **Interactive 4-Pillar Lens Switcher (Pill Row):**
  `[ 🎨 Visual Designer ]` · `[ 🧠 UX Researcher ]` · `[ 📈 PM / Founder ]` · `[ ⚡ Lead Engineer ]`

### Layout & Visual Spec
* **Grid:** `8px` base unit · `1023px` main container width.
* **Status Dot:** `#26c163` (`6px` circle) next to `CASE STUDY · 01`.
* **Lens Pills:** `height: 36px`, `padding: 0 14px`, `radius: 9999px`, `1px` border. Active state uses `#26c163` fill with `#ffffff` text.

---

## 01 · The Business Crucible
**Figma Target:** `435:105` *(Overview, Problem & Strategic Opportunity)*  
**Tag:** `[ 01 · PRODUCT UNDERSTANDING & BUSINESS IMPACT ]`

### Section Header
* **H2 Headline:**
  `When 1,000+ students share one chat pipe, learning—and retention—break.`
* **Lead Paragraph:**
  `10 Minute School operates on a Two-Teacher Live Architecture: Teacher 1 lectures on camera while Teacher 2 resolves student doubts in real time. At cohort scale across Bangladesh (1,000+ students per live room, Grades 6–12), this model hit a double bottleneck that threatened student retention, Teacher 2 efficiency, and course completion.`

### 3-Column Card Grid — *The Double Bottleneck*
1. **Card 1 — Two-Teacher Paralysis**
   * **Metric Tag (Red `#fc373e`):** `15 msg/sec · 92% doubts buried`
   * **Title:** `Two-Teacher Paralysis`
   * **Body:** `Universal chat floods with memes, greetings, and spam. By the time Teacher 2 spots a real math question, Teacher 1 has already moved on.`
2. **Card 2 — Rural Bandwidth Penalty**
   * **Metric Tag (Red `#fc373e`):** `3G / 4G · 12–24h archive wait`
   * **Title:** `Rural Bandwidth Penalty`
   * **Body:** `Without manual resolution control or live rewind, a 15-second buffer freeze breaks an entire derivation—forcing rural students to drop out and wait a full day for the recording.`
3. **Card 3 — Commercial Cost**
   * **Metric Tag (Orange `#ff5100`):** `Churn & Burnout`
   * **Title:** `Commercial Cost`
   * **Body:** `Lost live comprehension drives support tickets up, overwhelms Teacher 2 staff, and erodes trust with paying HSC/SSC families.`

### Callout Box — *Strategic Reframe (80/20 Focus)*
* **Label:** `STRATEGIC REFRAME (80/20 FOCUS)`
* **Quote:**
  `“How might we separate social energy from academic doubts, accelerate Teacher 2 triage with AI, and keep rural students streaming smoothly—without adding interface bloat?”`
* **Target Outcomes Strip (3 KPIs):**
  * **`3.2×`** `faster Teacher 2 doubt triage`
  * **`0%`** `peer spam in academic doubt threads`
  * **`100%`** `whiteboard visibility during live quizzes`

---

## 02 · The Psychological Audit
**Figma Target:** `435:193` *(Legacy System Audit + Behavioral Research & A/B Validation)*  
**Tag:** `[ 02 · PSYCHOLOGY & LEGACY SYSTEM AUDIT ]`

### Section Header
* **H2 Headline:**
  `Tearing down 19 physical audit sheets to expose why students went silent—or dropped out.`
* **Lead Paragraph:**
  `Before touching a pixel, I audited the legacy mobile and desktop classroom across 19 physical scanned sheets (Feb 13, 2025). The core failure wasn’t visual clutter—it was a system fighting human cognition, social anxiety, and rural network reality.`

### 5 Heuristic Failures (Audit Callout Cards)
1. **Chat Velocity Flood (`15 msg/sec`) — *Cognitive Pollution:*** `Serious questions vanish in seconds under emoji spam.`
2. **Text-Only Doubt Input — *Friction Penalty:*** `Zero photo or Drive upload forced students to type complex calculus equations as plain text.`
3. **Whiteboard-Blocking Polls — *Spatial Disruption:*** `Quizzes popped directly over the video player, covering Teacher 1’s formulas mid-derivation.`
4. **No Quality Toggle or 10s Rewind — *Doherty Threshold Failure:*** `No manual 360p lock or DVR skip meant a brief 3G stutter broke comprehension permanently.`
5. **No Instant AI Fallback — *Queue Bottleneck:*** `During peak doubt spikes, students waited helplessly with zero conceptual hints.`

### 2-Column Persona Cards — *Behavioral Mental Models*
1. **Prothom Das Turjo** *(17 · Chittagong · Introverted Achiever & ICT Captain)*
   * **Mental Model:** `“Accept me as I am.”`
   * **Cognitive Law:** `Social Anxiety & Self-Preservation`
   * **Insight:** `Refuses to ask questions in a 1,000-person public chat for fear of peer trolling. Needs a private, 1-on-1 doubt channel directly with Teacher 2.`
2. **Zayed Bin Aslam** *(17 · Tangail · Rural Ambition & Commuter)*
   * **Mental Model:** `“I like to do crazy things.”`
   * **Cognitive Law:** `Doherty Threshold (<400ms)`
   * **Insight:** `Unstable 3G buffering shatters his flow state; missing 15 seconds ruins the whole lecture. Needs manual 360p stream lock + instant 5s/10s live DVR rewind.`

### Validation Banner — *Cognitive Laws & A/B Study*
* **Laws Applied:** `Hick-Hyman Law & Jakob’s Law` — Splitting one overloaded feed into 3 familiar tabs (`Inbox` · `Discussion` · `Quiz`) cuts decision latency and isolates academic focus.
* **Usability Study (`Layout A` vs `Layout B` · Google Form Cohort Test):**
  * **Stat Highlight:** **`78%`** `chose Layout B (Explicit 3-Tab Controller) over Layout A (Single feed with toggle filters).`
  * **Student Verbatim:** `“Minimal cognitive load, familiar pattern, and intuitive interaction.”`

---

## 03 · The Aesthetic Solution
**Figma Target:** `435:173` *(Solution Showcase `437:607`)* & `436:355` *(Core Flows)*  
**Tag:** `[ 03 · AESTHETIC CRAFT & COMPONENT ECOSYSTEM ]`

### Section Header
* **H2 Headline:**
  `A decoupled 3-tab classroom engineered for calm focus, instant clarity, and zero whiteboard obstruction.`
* **Lead Paragraph:**
  `Visual craft here isn’t decoration—it’s sensory trust within 50 milliseconds. Every component across Android Compact (412×917) and iPhone (393×852) is built on an 8px modular grid to separate academic rigor from social energy.`

### The 3-Tab Classroom Architecture (3 Pillar Cards)
1. **`Teacher Inbox` — Private 1-on-1 Academic Channel**
   `Direct line between student and Teacher 2. Zero peer visibility, zero mockery—built for Turjo.`
2. **`Discussion Box` — Sandboxed Social Feed**
   `Keeps peer camaraderie (“How is the josss!!”, “Screen dekha jay na”) alive without polluting doubt resolution.`
3. **`Quiz` — Non-Blocking Gamification**
   `Docked cards with a 12-state precision countdown timer and tactile A/B/C/D states—preserving 100% whiteboard visibility.`

### The 4 Core Interaction Flows (`2×2` Grid)
1. **Photo & Drive Doubt Attachment:** `Snap a handwritten equation (Take Photo), pick from Gallery, or Use Drive—eliminating text-typing friction.`
2. **`Ask AI` Instant Doubt Fallback:** `When Teacher 2’s queue spikes, students tap Ask AI for a step-by-step conceptual breakdown, backed by Teacher-in-the-Loop validation.`
3. **Bandwidth Autonomy (`360p` + `5s/10s` DVR Rewind):** `Manual resolution switcher (Auto · 1080p · 720p · 360p) and instant rewind inside the player HUD so rural 3G learners never lose a derivation.`
4. **Exit-Friction & Sentiment Modal:** `Prevents impulsive drop-offs with “Want to get out for a while” break mode, followed by a 5-star + 4-emoji sentiment check.`

### Design System & Color Psychology Tokens
| Token | Hex | Psychological & Functional Role |
| :--- | :--- | :--- |
| **Primary CTA Green** | `#26c163` | Signals calm progress, reassurance, and growth in high-stress HSC/SSC exam prep. |
| **Urgency Red** | `#fc373e` | Reserved strictly for the `LIVE` stream badge, active urgency, and destructive exit actions. |
| **Surface Neutrals** | `#ffffff` → `#181818` | Tokenized light/dark contrast pairs for glare-free late-night study sessions. |

---

## 04 · The Engineering Bridge & Reflection
**Figma Target:** Design Decisions + Hardware & Network Constraints + Reflection  
**Tag:** `[ 04 · DEVELOPMENT REALITY & SENIOR REFLECTION ]`

### Section Header
* **H2 Headline:**
  `Designing for real-world WebRTC pipelines, 3G trade-offs, and low-end Android CPUs.`
* **Lead Paragraph:**
  `Great UX fails if engineering can’t ship it within budget. Every component was architected around explicit state machines, token modularity, and rural bandwidth constraints.`

### 4-Node Tripartite Live Systems Architecture
1. **Node 01 · WebRTC Origin Ingest:** `Teacher 1’s stream encoded in multi-bitrate segments (1080p / 720p / 360p) + a rolling 10s edge DVR buffer.`
2. **Node 02 · Gateway & Channel Router:** `Splits WebSocket events into Private Doubt Queue (Teacher 2) vs. Public Discussion Stream (15 msg/sec isolated).`
3. **Node 03 · Ask AI Copilot Service:** `Intercepts unanswered doubts during queue spikes, returning structured hints flagged for Teacher-in-the-Loop verification.`
4. **Node 04 · Student Client (`Android / iOS`):** `Deterministic UI state machine (isLoading, isBuffering, hasError, isOptimistic) so doubts and quiz answers never silently drop on flaky 3G.`

### Hardware & Network Trade-Off Callout — *ABR vs. Fixed `360p` Lock*
* **Engineering Question:** `Why expose a manual 360p toggle instead of relying purely on Adaptive Bitrate (ABR)?`
* **Constraint:** `On fluctuating rural 3G, standard ABR oscillates aggressively—causing repeated micro-stutters while hunting for bandwidth.`
* **Decision:** `Keep Auto (ABR) as default, but expose an explicit Fixed 360p Lock + 5s/10s DVR rewind.`
* **Conclusion:** `Predictable 360p clarity beats unstable 720p buffering every single time.`

### Measurable Impact & 3 Senior Reflections
* **Validated Impact:** **`3.2×`** `faster Teacher 2 doubt triage` · **`78%`** `student preference for 3-tab layout` · **`100%`** `whiteboard visibility during quizzes.`
* **`01` · AI Assists, Teachers Validate:** `Never let an AI hallucinate unchecked inside an exam prep room—keep Teacher 2 as the final authority.`
* **`02` · Respect Low-End Hardware:** `Avoid heavy simultaneous blurs and animations over live WebRTC video on budget Android devices.`
* **`03` · Future Horizon:** `Offline-first doubt queuing—let students snap and queue a photo question during a 30-second signal drop, auto-syncing on reconnect.`

---

## ✅ Tomorrow on Your PC — Quick Figma Execution Checklist
1. Pull latest repo updates: `git pull origin main`
2. Open Figma file `q4D57eROLsfR2CSz3IlOD5` → Frame **`Desktop - 8 (10MS Detailed Case Study)` (`435:26`)**.
3. Use this spec sheet to update the 4 Pillar sections, or ask your PC AI agent: *"Sync `10MS_CASE_STUDY_FIGMA_SPECS.md` into Figma frame `435:26` via Figma MCP."*
