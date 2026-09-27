# 10 Minute School | Case Study Structure Aligned with Figma Insights
*Reverse-Narrative Architecture Mapped Directly to Turash's Audit, Research, and Component Ecosystem*

---

## Executive Mapping Summary
This document bridges Turash's design philosophy (**Psychology + Business + Visual Rigor**) with the **Reverse-Narrative 11-Step Structure**, fully grounded in the inspected Figma frames (`kBvZLppUwO1tbdklBQXikp`).

```
┌────────────────────────────────────────────────────────────────────────┐
│                      11-STEP ALIGNED NARRATIVE                         │
├────┬─────────────────────────────┬─────────────────────────────────────┤
│ 01 │ Cover / Snapshot            │ Quick project metadata & visual hook│
│ 02 │ The Backstory (Context)     │ 10MS Scale & The 2-Teacher Model    │
│ 03 │ The Business & Pedagogy     │ The Double Bottleneck (Spam + 3G)   │
│ 04 │ The Strategic Reframe       │ "How Might We" Design Challenge     │
│ 05 │ The Solution Preview        │ Visual climax first (Android/iOS)   │
│ 06 │ The Previous System Audit   │ 19 Scanned Sheets & Legacy Flaws    │
│ 07 │ Behavioral Research         │ Turjo (Introvert) vs Zayed (Rural)  │
│ 08 │ Testing & Trade-offs        │ Google Form Test & A/B Layout B Win │
│ 09 │ Component Ecosystem         │ 3 Tabs, Ask AI, Timer, Quality HUD  │
│ 10 │ Design System & Psychology  │ Green Button Rationale & Tokens     │
│ 11 │ Impact & Senior Reflection  │ Retention, Teacher 2 Latency, Future│
└────┴─────────────────────────────┴─────────────────────────────────────┘
```

---

### Step 01: Cover / Project Snapshot
- **Goal:** Let the reader immediately grasp what this project is and who was responsible, without scrolling through endless fluff.
- **Figma Alignment:**
  - `Cover` frame (`794:669`) & `Plugin / file cover - 1`
  - Platforms: **Android Compact (412×917)** & **iPhone (393×852)**
  - Metadata:
    - **Role:** Product Designer / UI-UX Designer (End-to-end UX audit, system architecture, prototyping, UI design system)
    - **Timeline:** Jan – Feb 2025
    - **Domain:** EdTech, Real-Time Streaming, Low-Bandwidth UX, Conversational AI
    - **Impact Metric / Concept Tag:** *"Distraction-Free Live Class & Low-Bandwidth Streaming for 10 Minute School"*

---

### Step 02: Overview & The Backstory (The Setup)
- **Goal:** Establish the company situation and personal role/responsibility naturally as a real story, not a generic "About Company" paragraph.
- **Figma Alignment & Story Points:**
  - `Quick Overview` frame (`1107:1987`):
    > *"The project of 10 Minute School | Live Class UI Redesign focuses on creating a distraction-free, interactive environment for students in grades 6–12. By redesigning the discussion system, teachers gain full control, ensuring safe and focused communication during classes."*
  - **The Unique 10MS Dynamic:** 10 Minute School operates with a **Two-Teacher Live Architecture**:
    - **Teacher 1:** On camera, lecturing and writing on the digital board.
    - **Teacher 2:** In the chat/backend, answering student doubts live.
  - **My Goal & Responsibility:**
    - Design an intuitive interface that eliminates chat distractions.
    - Deliver custom video quality controls for students with poor connectivity.
    - Balance teacher control with student engagement.

---

### Step 03: The Core Problem Landscape (The Double Bottleneck)
- **Goal:** Prove business and user tension (what the platform was losing).
- **Figma Alignment (`1107:1940` Problem Statement & Audit `205:82`):**
  1. **The Discussion Chaos & Teacher 2 Paralysis:**
     - 1,000+ students in one live room. Universal chat turns into a flood of memes, spam, and greetings.
     - Serious questions get drowned (*"Late replies from Teacher 2 delay student learning. Spam messages distract"*).
     - By the time Teacher 2 finds a legitimate doubt, Teacher 1 is already teaching the next chapter.
  2. **The Bandwidth Bottleneck & 24-Hour Archive Penalty:**
     - In Bangladesh, thousands of students attend from rural areas with unstable 3G/4G connections.
     - With no resolution toggle, streams stutter and drop. Missing 15 seconds of a derivation means the student loses the whole concept and must wait 12–24 hours for the post-class recording.

---

### Step 04: The Strategic Reframe (The Design Challenge)
- **Goal:** Reframe the problem into an actionable, high-leverage product hypothesis.
- **Figma Alignment (`1107:1964` Goal Statement):**
  - **The HMW Question:**
    > *"How might we create a focused, low-bandwidth-resilient live classroom that separates social camaraderie from academic doubts, accelerates Teacher 2 response time with AI, and keeps rural students streaming smoothly?"*
  - **The 3 Strategic Pillars:**
    1. **Cognitive Segregation:** Split discussion into Private Academic Inquiries vs. Community Feed.
    2. **Bandwidth Autonomy:** Give students manual video quality downscaling (360p) + 5-second DVR rewind.
    3. **AI Assistance:** Equip Teacher 2 and students with an instant copilot (`Ask AI`) to eliminate response latency.

---

### Step 05: The Solution Preview (Show Vision First)
- **Goal:** Reverse narrative principle — show the high-fidelity answer immediately so the reader feels the visual payoff.
- **Figma Alignment (`1057:4560` Android & `1057:5960` iPhone):**
  - Side-by-side showcase of the live classroom:
    - **Video HUD:** Resolution pill (Auto / 1080p / 720p / 360p) + 5s DVR Skip.
    - **3-Tab Dock:** `[ Teacher Inbox ]  [ Discussion Box ]  [ Quiz ]`
    - **Active Doubt Card:** Private 1-on-1 question with `Ask AI` suggestion.

---

### Step 06: The Previous System Audit (Frame-by-Frame Breakdown)
- **Goal:** Show rigorous, evidence-based UX audit skills rather than theoretical assumptions.
- **Figma Alignment (`🞴 Achive / ↳ Audit` - `205:82` & `1109:6069`):**
  - **The 19 Physical Scanned Audit Sheets (`Scanned_20250213-1844-01` to `19`):**
    - Analyzing legacy mobile and desktop classroom UI.
  - **5 Raw Audit Callouts Discovered:**
    1. *"Students don’t share important messages, and their questions often go unnoticed by the teacher."*
    2. *"Include an AI search option for quick access to relevant information."*
    3. *"Add a video player with options to stop and skip 10s during the live session."*
    4. *"User need this poll option on the right panel."*
    5. *"Upload file using drive or drag file."* (Students couldn't send math problem photos).

---

### Step 07: Behavioral Research & Personas
- **Goal:** Ground product decisions in real Bangladeshi student mental models.
- **Figma & Research Alignment:**
  - **Persona 1: Prothom Das Turjo (The Introverted Achiever)**
    - 17 yrs, Chittagong, ICT Captain.
    - *Mental Model:* "Accept me as I am." Serious, structured, hates chaotic chats. Hesitant to ask questions publicly fearing peer trolling.
    - *Needs:* Private 1-on-1 doubt channel with Teacher 2.
  - **Persona 2: Zayed Bin Aslam (The Rural Ambition)**
    - 17 yrs, Tangail, aspiring astronomer.
    - *Mental Model:* "I like to do crazy things." High motivation, constantly fighting mobile 3G drops.
    - *Needs:* 360p downscale option + 5-second DVR skip to replay missed explanations.

---

### Step 08: Exploration, Prototyping & A/B Validation
- **Goal:** Prove design decisions through real user testing and cognitive ergonomics.
- **Figma Alignment (`214:117` ↳ Comparison):**
  - **The Usability Testing Form:** Tested with active student cohort via Google Forms: `https://forms.gle/gRCSTxTYGcYm83qQ9`.
  - **Option A vs. Option B Evaluation:**
    - Option A: Single stream with toggle filters.
    - Option B: Explicit 3-tab cognitive separation.
    - *Winning Decision:* **Layout B won** because of:
      > *"Minimal cognitive load, similar pattern, intuitive interaction."*

---

### Step 09: Final Component Ecosystem & Micro-Interactions
- **Goal:** Deep-dive into the architectural mechanics that make the UI work seamlessly.
- **Figma Alignment (`❖ Component /` pages):**
  1. **`Teacher Inbox` & Attachment Flow (`718:436`):**
     - 1-on-1 private messaging channel.
     - Media Attachment Sheet: `Take Photo` | `Upload image / Gallery` | `Use drive for upload`.
     - **`Ask AI` Copilot (`359:926`):** Instant GPT-4.0 fallback for conceptual questions when Teacher 2 queue is high.
  2. **`Discussion Box` (`718:437`):**
     - Sandboxed peer camaraderie feed (*"How is the josss !!"*, *"Vaiya screen dekha jay na"*), eliminating academic interference.
  3. **`Quiz / Poll` (`718:438`):**
     - 12-state precision countdown timer ring (`Properties/Timer`).
     - A/B/C/D tactile buttons with distinct default, pressed, and selected states.
     - Non-intrusive docked vertical and horizontal overlay cards that preserve whiteboard visibility.
  4. **`Live Player HUD & Quality` (`718:433` & `718:413`):**
     - Manual resolution switcher: 1080p, 720p, 360p, Auto.
     - 5s Quick Seek forward/backward.
  5. **`Leave & Class Rating` (`718:1154`):**
     - Exit-friction retention dialog: *"Want to get out of class? Taking the class is important for you to continue learning."*
     - Option: *"Want to get out for a while"* (break mode).
     - 5-Star Rating with 4 dynamic emoji sentiment states (crying, thinking, smiling, beaming).

---

### Step 10: Design System Foundations & Psychology
- **Goal:** Explain visual rationale — why choices were made, not just how they look.
- **Figma Alignment (`⌘ Style /` - `251:853` & `260:13159`):**
  - **"Why is Button Color Green?" (`311:104`):**
    - `#26c163` primary green builds psychological reassurance, growth, and calm focus in high-stress learning environments, unlike intimidating reds or blues.
  - **Secondary Red (`#fc373e`):**
    - Strictly reserved for live urgency, "LIVE" stream indicator badges, and destructive actions.
  - **Cross-Platform Parity:**
    - Pixel-perfect adaptations across **Android Compact (412×917)** and **iPhone (393×852)**.

---

### Step 11: Impact, Outcomes & Senior Reflection
- **Goal:** Conclude with business value, honest self-critique, and future product thinking.
- **Story Points:**
  - **Outcomes:** Slashed Teacher 2 response latency, eliminated 100% of peer spam in academic doubt channels, enabled smooth streaming on rural 3G.
  - **Honest Reflection:** When to rely on AI vs. Human teachers; low-end device CPU limitations during heavy live streams.
