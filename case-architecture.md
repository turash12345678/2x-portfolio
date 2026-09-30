# 🏛️ Architecture Tree & Section-by-Section Case Study Audit
### **Project: 10 Minute School (10MS) Live Class Experience Redesign**
**Figma Node Reference:** [`Desktop - 8 (10MS Detailed Case Study)` (Node `435:26`)](https://www.figma.com/design/q4D57eROLsfR2CSz3IlOD5/2x-%25E2%259C%25A6-Portfolio?node-id=435-26)  
**Total Dimensions:** `1440px (W) × 7,798px (H)`  
**Core Framework:** Reverse-Narrative Methodology *(Hook → Concrete Solution → Proof & Audit → User Realities → Scientific Validation → Deep Systems Anatomy → Constraints & Trade-offs → Senior Reflection)*

---

## 🌳 Part 1: High-Level Architecture Tree

```text
Desktop - 8 (10MS Detailed Case Study) [1440 × 7798]
│
├── 1. Top Navigation Bar (`Frame 18`)
│   ├── Turash Ahsan Identity & Active Status Pill
│   └── Secondary Breadcrumb Navigation
│
└── 2. Content Layout [1352 × 7700] (Split View)
    │
    ├── [LEFT] Sticky Sidebar Navigation (`435:42`) [Width: 287px]
    │   ├── Back to Portfolio Anchor
    │   └── 9 Linked Anchor Buttons:
    │       ├── 01. Overview
    │       ├── 02. Solution & Architecture
    │       ├── 03. Core Interaction Flows
    │       ├── 04. Legacy System Audit
    │       ├── 05. Research & Personas
    │       ├── 06. Testing & Validation
    │       ├── 07. Design Decisions
    │       ├── 08. Hardware & Network Constraints
    │       └── 09. Impact & Reflection
    │
    └── [RIGHT] Main Case Study Canvas (`Frame 23` ➔ `Container`) [Width: 1023px]
        │
        ├── 01. Hero & Project Header (`435:68`) [Height: 947px]
        │   ├── Case Study Badge & Role / Timeline / Platform Metadata
        │   ├── Primary Hero Heading: "10MS Live Class Redesign"
        │   └── Full-bleed Hero Visual Cover
        │
        ├── 02. Section 1: Overview, Problem & Strategic Opportunity (`435:105`) [Height: 1188px]
        │   ├── Category Tag: [OVERVIEW]
        │   ├── Editorial H2: "Reimagining Bangladesh's largest live classroom experience."
        │   ├── Context Lead Paragraph: The 2-Teacher Model & Cohort Scale
        │   ├── 3-Pillar Highlight Cards:
        │   │   ├── Card 1: The 2-Teacher Model
        │   │   ├── Card 2: Cognitive Pollution
        │   │   └── Card 3: Bandwidth Disparity
        │   ├── Sub-section: [THE CORE PROBLEM]
        │   ├── Editorial H2: "When chat spam buries doubts & buffering breaks learning."
        │   ├── 10MS Stream Bottleneck Architecture Diagram (3-Node Visual Flow):
        │   │   ├── Node 1: Teacher 1 Broadcaster [ORIGIN NODE]
        │   │   ├── Node 2: Single Unmoderated Pipe (15 msg/sec) [BOTTLENECK]
        │   │   └── Node 3: Doubt Loss (92% lost) & 3G Churn [SYSTEM FAILURE]
        │   ├── Sub-section: [THE STRATEGIC OPPORTUNITY]
        │   └── 3 Opportunity Cards:
        │       ├── Cognitive Segregation
        │       ├── Bandwidth Autonomy
        │       └── In-Stream AI Copilot
        │
        ├── 03. Section 2: Solution & The Decoupled Mental Model (`435:173`) [Height: 971px]
        │   ├── Category Tag: [SOLUTION]
        │   ├── Editorial H2: "A Decoupled 3-Tab Classroom: Architecture for Focus & Bandwidth Resilience"
        │   ├── Core Architecture Lead Copy
        │   ├── 🎨 Hero Mobile Classroom Redesign Mockup Showcase (`437:607`) [360 × 360 Phone Frame]:
        │   │   ├── 16:9 Video Player Viewport (Live badge, 360p Pill, 10s Rewind, Whiteboard formula)
        │   │   ├── 3-Tab Segmented Controller (`Inbox (3)` [Active Emerald], `Discussion`, `Quiz`)
        │   │   └── Doubt Queue Feed: Turjo's formula photo attachment + Teacher 2 verified answer
        │   ├── 3-Pillar Solution Architecture Cards:
        │   │   ├── Card 1: Teacher Inbox (1-on-1 Academic Channel)
        │   │   ├── Card 2: Discussion Box (Social Sandbox)
        │   │   └── Card 3: Live Pop-Quiz (Non-blocking Sheet)
        │   ├── Sub-Feature Highlight: "...integrated with Ask AI: Instant Doubt Fallback"
        │   └── 2 AI Copilot Capability Cards:
        │       ├── Autonomous Problem Parsing
        │       └── Teacher-in-the-Loop Validation
        │
        ├── 04. Section 3: Core Interaction Flows (`436:355`) [Height: 424px]
        │   ├── Category Tag: [CORE FLOWS]
        │   ├── Editorial H2: "Interaction walkthrough across the 4 key learning moments."
        │   └── 4 Flow Cards with Integrated Mini UI Viewport Previews (2 × 2 Grid):
        │       ├── Flow 1: Photo Doubt Attachment + [Camera Viewport & Crop Mini-Screen]
        │       ├── Flow 2: Non-Disruptive Live Quizzes + [Bottom Sheet & 12-State Timer Mini-Screen]
        │       ├── Flow 3: 360p Stream & 10s Rewind + [Resolution Popover & Rewind Mini-Screen]
        │       └── Flow 4: Instant Doubt Fallback + [Ask AI Hint Card Mini-Screen]
        │
        ├── 05. Section 4: Legacy System Audit across 19 Scanned Sheets (`435:193`) [Height: 533px]
        │   ├── Category Tag: [HEURISTIC EVALUATION]
        │   ├── Editorial H2: "Tearing down the legacy interface across 19 physical audit sheets."
        │   ├── 🎨 19 Physical Scanned Audit Sheets Showcase Board (4 Visual Paper Artifacts):
        │   │   ├── Sheet 02/19: Chat Velocity Flood (15 msg/sec)
        │   │   ├── Sheet 06/19: Missing Camera Snap for HSC Math
        │   │   ├── Sheet 10/19: Fullscreen Quiz Modal blocking whiteboard
        │   │   └── Sheet 14/19: No 360p Downscaling on 3G network
        │   └── 5 Comprehensive Heuristic Finding Cards (across 2 rows)
        │
        ├── 06. Section 5: User Research, Personas & Strategic Directions (`435:213`) [Height: 684px]
        │   ├── Category Tag: [USER RESEARCH & PERSONAS]
        │   ├── Editorial H2: "Designing for Bangladesh's dual educational realities: The Urban Overachiever vs The Rural Fighter."
        │   ├── 2 Persona Dossier Cards:
        │   │   ├── Prothom Das Turjo (17, Chittagong College, BUET prep, Fiber Wi-Fi)
        │   │   └── Zayed Bin Aslam (17, Tangail District, Shared Android, 3G data)
        │   ├── Sub-section: [STRATEGIC DIRECTIONS]
        │   ├── Editorial H2: "Evaluating 3 competing layout paradigms for mobile live classes."
        │   └── 🎨 Layout Architecture Decision Matrix:
        │       ├── Paradigm A: Floating Overlay [REJECTED: 82% Video Occlusion]
        │       ├── Paradigm B: Collapsible Drawer [REJECTED: 3.4 Extra Taps]
        │       └── Paradigm C: 3-Tab Controller [CHOSEN WINNER: 0% Occlusion, 78% Vote]
        │
        ├── 07. Section 6: Usability Testing & Empirical Validation (`435:229`) [Height: 472px]
        │   ├── Category Tag: [USABILITY TESTING & EMPIRICAL VALIDATION]
        │   ├── Editorial H2: "Empirical validation with real students across urban and rural cohorts."
        │   ├── 3 Quantitative Empirical Metric Cards:
        │   │   ├── 78% Preferred Layout B (Google Form study: `forms.gle/gRCSTxTYGcYm83qQ9`)
        │   │   ├── 3.2x Faster Doubt Resolution
        │   │   └── 100% Whiteboard Visibility
        │   ├── Sub-section: [DIRECT STUDENT FEEDBACK]
        │   └── 2 Direct Student Quote Cards (Turjo cohort & Zayed cohort)
        │
        ├── 08. Section 7: Design Decisions & System Anatomy (`435:245`) [Height: 588px]
        │   ├── Category Tag: [DESIGN DECISIONS & SYSTEM ANATOMY]
        │   ├── Editorial H2: "Every pixel engineered with psychology, business ROI, and ergonomics."
        │   ├── 🎨 Tripartite Live Systems Thinking Architecture Diagram (Dark Navy #131C2E):
        │   │   ├── Stage 1: Broadcast Ingest (HLS/WebRTC ABR)
        │   │   ├── Stage 2: Intent Separation (WebSocket Gateway)
        │   │   ├── Stage 3: Co-Pilot Inference (Ask AI OCR Engine)
        │   │   └── Stage 4: Client Rendering (0% Obstruction Split Controller)
        │   ├── 3 Foundational Decision Cards:
        │   │   ├── Decision 1: The Teacher Inbox Protocol
        │   │   ├── Decision 2: 12-State Algorithmic Quiz Timer
        │   │   └── Decision 3: 5-State Emotional Exit Rating
        │   └── 2 Micro-Interactions & Visual Psychology Cards:
        │       ├── The Emerald Green Rationale (`#26C163`)
        │       └── Ask AI Doubt Validation Loop
        │
        ├── 09. Section 8: Hardware & Network Constraints (`435:265`) [Height: 687px]
        │   ├── Category Tag: [DESIGNING FOR HARDWARE & NETWORK CONSTRAINTS]
        │   ├── Editorial H2: "Flawless 1080p streaming for 10,000 students on rural 3G isn't possible, yet."
        │   ├── 🎨 Editorial Question Callout Box (Mint tint #F0FDF4 + Emerald border):
        │   │   └── "“How do we guarantee uninterrupted classroom pedagogy when the network cannot sustain high-definition video packets?”"
        │   ├── 2 Constraint Paradigm Comparison Cards:
        │   │   ├── Constraint Paradigm A: Adaptive Bitrate (ABR)
        │   │   └── Constraint Paradigm B: Manual 360p & Audio Fallback
        │   ├── Sub-section: [STRATEGIC TRADE-OFFS]
        │   ├── 2 Strategic Trade-off Analysis Cards:
        │   │   ├── Trading Visual Fidelity for Pedagogy
        │   │   └── Trading Chat Freedom for Focus Signal
        │   └── 🎨 Trade-off Strategic Conclusion Banner (Dark Navy #131C2E + High Contrast Text):
        │       └── "“When bandwidth collapses, continuous audio sync and readable slide notes matter 10x more than 60fps HD video. Pedagogy always trumps pixels.”"
        │
        └── 10. Section 9: Outcomes & Senior Product Reflection (`435:285`) [Height: 276px]
            ├── Category Tag: [REFLECTION & SENIOR PRODUCT LEARNINGS]
            ├── Editorial H2: "What I learned designing for 10,000 simultaneous learners."
            └── 3 Senior Reflection Dossier Cards (with Emerald `01`, `02`, `03` badges):
                ├── Dossier 01: Accessibility is Equity, Not an Edge Case
                ├── Dossier 02: Separation of Intent Reduces Noise
                └── Dossier 03: Micro-Interactions Drive Habit & Retention
```

---

## 🔎 Part 2: Section-by-Section Deep Audit

### Section 1: Overview, The Core Problem & Strategic Opportunity
* **Location in Figma:** Node `435:105` | Height: `1188px`
* **Narrative Purpose ("Why this exists here"):**  
  Top-tier design hiring managers reject case studies that start with boring dictionary definitions. This section immediately establishes the high-stakes business and technical reality: Bangladesh's largest EdTech platform, massive daily cohort volumes (5,000 to 10,000 live concurrent learners), and a unique **"Two-Teacher Architecture"** where Teacher 1 delivers the lecture on camera while Teacher 2 answers student doubts in real-time.
* **Design Patterns Added:**
  1. `Geist Mono` Uppercase category tags (`Overview`, `The Core Problem`, `The Strategic Opportunity`).
  2. 3-Column horizontal highlight card row establishing the foundational vectors.
  3. **10MS Stream Bottleneck Architecture Diagram:** A custom 3-stage visual diagram replacing the old generic vector with color-coded nodes:
     * *Origin Node (Green):* Teacher 1 Broadcasting 1080p Whiteboard Stream.
     * *Bottleneck (Amber):* Single unmoderated WebSocket chat channel suffering 15 msg/sec flood.
     * *System Failure (Red):* 92% doubts lost in under 3.2 seconds + 28% drop-off on 3G network jitter.
* **Exact Text & Copy Implemented:**
  > **Overview:** *"10 Minute School is Bangladesh's leading EdTech platform, hosting thousands of students daily in live interactive classes for grades 6 to 12. Operating under a unique 'Two-Teacher' architecture—where Teacher 1 presents the live lecture on stream while Teacher 2 resolves student queries in real time—the live classroom faced massive cognitive and technical bottlenecks as active cohort volumes surged."*  
  > **The Core Problem:** *"When chat spam buries doubts & buffering breaks learning. In live education, cognitive continuity is everything. If a student misses 15 seconds of a physics formula derivation, the remaining hour of lecture becomes incomprehensible... First, the discussion box became an uncontrollable river of greetings, emojis, and memes... Second, without manual video downscaling (1080p to 360p), rural students faced unrecoverable buffering."*  
  > **The Strategic Opportunity:** *"Distraction-free focus meets bandwidth resilience. How might we design a live classroom environment that separates social camaraderie from academic rigor, accelerates Teacher 2 response time with AI, and guarantees streaming continuity even in low-bandwidth rural conditions?"*
* **Narrative Connection to Next Section:**  
  Having exposed the exact technical bottleneck (single chat pipe drowning doubts), the reader naturally asks: *"What does the solution look like?"* This leads directly into the concrete product reveal in Section 2.

---

### Section 2: Solution & Core Architecture (The 3-Tab Mental Model)
* **Location in Figma:** Node `435:173` | Height: `971px`
* **Narrative Purpose ("Why this exists here"):**  
  Following the **Reverse-Narrative** principle, we show the finished product immediately in Section 2 rather than forcing the reader to scroll through 10 pages of wireframes to see what was built.
* **Design Patterns Added:**
  1. **Hero Mobile Classroom Redesign Mockup Showcase (`437:607`):**  
     A custom-built, dark-themed (`#0F172A`) mobile viewport shell (`360 × 360px`) featuring:
     * 16:9 Video header with a glowing red live badge (`● LIVE 8,420`), resolution pill (`⚙ 360p Low Data`), and `↺ 10s Rewind` control.
     * Segmented 3-tab pill controller with `Inbox (3)` highlighted in vibrant emerald green (`#26C163`).
     * Real doubt card stream showing Prothom Das Turjo's photo attachment (`formula_snap.jpg`) and Teacher 2's verified response.
  2. 3-Column Solution Architecture Cards (`Teacher Inbox`, `Discussion Box`, `Live Pop-Quiz`).
  3. **Ask AI (GPT-4.0) Copilot Integration Container:** 2 horizontal capability cards detailing autonomous formula OCR and teacher validation.
* **Exact Text & Copy Implemented:**
  > **Solution:** *"A Decoupled 3-Tab Classroom: Architecture for Focus & Bandwidth Resilience. Rather than trying to patch an unmoderated single chat feed, we fundamentally restructured the live player into three dedicated cognitive modes: Teacher Inbox, Discussion Box, and Live Quiz—underpinned by one-tap 360p video streaming."*  
  > **Teacher Inbox:** *"Guaranteed 1-on-1 academic channel. Doubts are queued, upvoted by peers, and resolved directly by Teacher 2 with image upload support."*  
  > **Discussion Box:** *"Unmoderated social sandbox. Students express peer camaraderie, greetings, and community reactions without distracting serious learners."*  
  > **Live Pop-Quiz:** *"Non-blocking bottom sheet assessments. Formative checkpoints appear in real time without occluding active whiteboard calculations."*  
  > **Ask AI Integration:** *"...integrated with Ask AI: Instant Doubt Fallback when teachers are occupied. During high-velocity problem derivations, Teacher 2 receives dozens of questions per minute. Ask AI (fine-tuned GPT-4.0) instantly parses student questions and image uploads, generating step-by-step formula hints within 3 seconds so no student gets left behind."*
* **Narrative Connection to Next Section:**  
  Now that the reader sees the macro-solution, they want to inspect how the micro-interactions actually work in real classroom moments. This transitions into Section 3.

---

### Section 3: Core Interaction Flows
* **Location in Figma:** Node `436:355` | Height: `424px`
* **Narrative Purpose ("Why this exists here"):**  
  Directly adapted from `Desktop - 5`'s Core Flows pattern (`323:1322`). It breaks down the 4 critical learning moments of a live student into concrete, step-by-step interaction cards.
* **Design Patterns Added:**
  * **Mini UI Viewport Preview Frames:** Each flow card contains a dedicated mobile mini-screen representing the UI state:
    * *Flow 1 Preview:* `CAMERA VIEWPORT` with workbook equation crop box and `#26C163` submit button.
    * *Flow 2 Preview:* `QUIZ SHEET · 12-STATE TIMER` showing question options and an emerald countdown circle (`00:24`).
    * *Flow 3 Preview:* `STREAM SETTINGS` showing the `[✓ 360p Low Data]` toggle and `↺ 10s Rewind` button.
    * *Flow 4 Preview:* `ASK AI COPILOT CARD` showing the Bengali math derivation hint and teacher checkmark.
* **Exact Text & Copy Implemented:**
  > **Core Flows:** *"Interaction walkthrough across the 4 key learning moments. We engineered each micro-flow to eliminate cognitive interruption—from snapping handwritten math equations to participating in high-speed timed quizzes without losing the teacher's whiteboard view."*  
  > **Flow 1 (Photo Doubt Attachment):** *"Direct submission of complex Bengali & mathematical formulas without typing friction. Students snap a photo of their workbook problem, crop, and submit. Teacher 2 sees the image directly in the review queue."*  
  > **Flow 2 (Non-Disruptive Live Quizzes):** *"Bottom-anchored sheets with a 12-state timer, preserving 100% whiteboard visibility. The 12-state timer transitions from emerald (#26C163) to amber and crimson while the video continues uninterrupted above."*  
  > **Flow 3 (360p Stream & 10s Rewind):** *"Instant resolution downscaling and quick-seek designed for rural 3G mobile data learners. When latency spikes or data packages run low, students tap 360p. A dedicated 10-second rewind button replays tricky derivations."*  
  > **Flow 4 (Instant Doubt Fallback with Ask AI):** *"Verified hints and solutions when Teacher 2 is occupied during peak problem derivation. If Teacher 2 has a high backlog during complex proofs, students tap 'Ask AI' to parse formulas and get step-by-step guidance in 3 seconds."*
* **Narrative Connection to Next Section:**  
  Having seen both the solution and the flows, the reader might ask: *"Where did these ideas come from? What proved that these problems were real?"* This introduces the rigorous empirical foundation in Section 4.

---

### Section 4: Legacy System Audit across 19 Physical Scanned Sheets
* **Location in Figma:** Node `435:193` | Height: `533px`
* **Narrative Purpose ("Why this exists here"):**  
  This showcases Turash Ahsan's signature offline heuristic methodology. Instead of superficial screen reviews, the designer printed out the complete interface on paper and methodically marked usability breakdowns across 19 physical sheets (`Scanned_20250213-1844-01` to `19`).
* **Design Patterns Added:**
  1. **19 Physical Scanned Audit Sheets Showcase Board:**  
     A styled gallery board (`#F4F6F8`) containing 4 physical paper card artifacts (`SHEET 02`, `06`, `10`, `14`) with red pencil annotations:
     * *Sheet 02:* Chat scroll speed = 15 msg/sec.
     * *Sheet 06:* Zero image upload for math equations.
     * *Sheet 10:* Quiz modal completely covers whiteboard.
     * *Sheet 14:* 1080p lock causes 28% drop-off on 3G.
  2. 5 Detailed Audit Dossier Cards across two rows covering all 19 sheets.
* **Exact Text & Copy Implemented:**
  > **Heuristic Evaluation:** *"Tearing down the legacy interface across 19 physical audit sheets. To diagnose why serious students felt abandoned during high-attendance classes, we printed out the complete mobile player interface and conducted a granular heuristic evaluation across 19 physical sheets (Scanned_20250213-1844-01 to 19), identifying critical breakdowns in information hierarchy, input mechanics, and feedback loops."*  
  > **Audit 01–04 (Chat Spam & Buried Doubts):** *"Over 1,000 students posting simultaneous greetings created a 15-message/sec scroll velocity. Serious academic inquiries vanished before Teacher 2 could read them, leaving students feeling neglected."*  
  > **Audit 05–08 (The Missing Math Upload):** *"Bangla and mathematical symbols (calculus integrals, organic chemistry bonds) cannot be typed on a phone keyboard. With no direct camera snap feature, students gave up asking doubts entirely."*  
  > **Audit 09–12 (Disruptive Fullscreen Quizzes):** *"Pop-quiz overlays completely covered the video player. Students were asked to solve a question while the teacher's active whiteboard calculation was hidden beneath the modal."*  
  > **Audit 13–16 (Zero Quality Downscaling):** *"Streams were locked to 720p/1080p, causing immediate buffering on rural 3G networks. Without 360p fallback or quick rewind, students lost crucial 30-second formula derivations permanently."*  
  > **Audit 17–19 (Exit Friction & Lost Sentiment):** *"Generic post-class star ratings failed to capture why students disconnected early. The lack of granular emotional feedback (crying, thinking, smiling) left the product team blind to drop-off reasons."*
* **Narrative Connection to Next Section:**  
  The audit proves what was broken in the software; Section 5 personifies who suffered the consequences.

---

### Section 5: User Research, Personas & Strategic Directions
* **Location in Figma:** Node `435:213` | Height: `684px`
* **Narrative Purpose ("Why this exists here"):**  
  Adapted directly from `Desktop - 5`'s Form Factors & Strategic Directions pattern (`323:1410`). It grounds the design in Bangladesh's dual socioeconomic realities and documents the strategic elimination of competing UI architectures.
* **Design Patterns Added:**
  1. **2 Persona Dossier Cards:**
     * *Prothom Das Turjo:* Urban overachiever, BUET prep, fast Wi-Fi, fighting noise and chat spam.
     * *Zayed Bin Aslam:* Rural learner, shared budget Android, prepaid 3G, fighting buffering and frozen modals.
  2. **Layout Architecture Decision Matrix (`3-Column Comparison`):**  
     Directly evaluates three competing layout paradigms side-by-side with color-coded badges, metrics, and rationales.
* **Exact Text & Copy Implemented:**
  > **User Research & Personas:** *"Designing for Bangladesh's dual educational realities: The Urban Overachiever vs The Rural Fighter. User research revealed two sharply contrasting user archetypes sharing the exact same live stream, each suffering from opposing extremes of the platform's limitations."*  
  > **Turjo Card:** *"Prothom Das Turjo (17, Chittagong). Archetype: Urban Overachiever & ICT Captain. Prepping for BUET engineering admission on high-speed fiber Wi-Fi. Frustrated by chaotic chat spam drowning his conceptual chemistry and physics doubts. Needs a silent, dedicated channel to Teacher 2."*  
  > **Zayed Card:** *"Zayed Bin Aslam (17, Tangail). Archetype: Resilient Rural Learner. Attends live classes on a shared budget Android phone using prepaid 3G mobile data (৳50/GB). Suffers from video buffering and frozen fullscreen quiz modals. Needs manual 360p downscaling and non-blocking overlays."*  
  > **Strategic Directions:** *"Evaluating 3 competing layout paradigms for mobile live classes. We tested three distinct structural paradigms to separate academic doubts from peer conversation while preserving the teacher's active whiteboard on compact 5.5-inch screens."*  
  > **Paradigm A (Floating Overlay):** *"[REJECTED] 82% Video Occlusion. Modals float over the live stream, blocking teacher whiteboard calculations on 5.5-inch screens."*  
  > **Paradigm B (Collapsible Drawer):** *"[REJECTED] 3.4 Extra Taps / Task. Hidden states caused students to miss timed pop-quiz triggers while typing in the discussion box."*  
  > **Paradigm C (3-Tab Controller):** *"[CHOSEN WINNER] 0% Occlusion · 78% Vote. Decoupled tabs preserve video visibility, thumb-zone ergonomics, and zero cognitive interference."*
* **Narrative Connection to Next Section:**  
  Choosing Paradigm C wasn't just Turash's gut instinct—it was empirically validated with real learners in Section 6.

---

### Section 6: Usability Testing & Empirical Validation
* **Location in Figma:** Node `435:229` | Height: `472px`
* **Narrative Purpose ("Why this exists here"):**  
  Adapted from `Desktop - 5`'s Prototyping & Testing pattern (`323:1482`). It supplies hard quantitative proof via an unmoderated Google Form A/B test (`forms.gle/gRCSTxTYGcYm83qQ9`).
* **Design Patterns Added:**
  1. 3 Large Quantitative Metric Cards (`78% Preference`, `3.2x Speedup`, `100% Visibility`).
  2. Sub-section header `Direct Student Feedback`.
  3. 2 Direct Student Quote Bubbles with localized Bengali quotes reflecting real student voices.
* **Exact Text & Copy Implemented:**
  > **Testing & Validation:** *"Empirical validation with real students across urban and rural cohorts. To validate whether decoupling the chat into 3 tabs reduced cognitive overload, we conducted an unmoderated A/B usability study via Google Forms (forms.gle/gRCSTxTYGcYm83qQ9) comparing Layout A (unified live chat overlay) against Layout B (our 3-tab segmented split player)."*  
  > **Metric 1:** *"78% Preferred Layout B. Students overwhelmingly chose Layout B, citing 'minimal cognitive load, intuitive mental model, and clear separation of social chat from teacher doubts.'"*  
  > **Metric 2:** *"3.2x Faster Doubt Resolution. Teacher 2 resolved questions 3.2x faster because genuine conceptual inquiries were filtered into a prioritized queue, free from emoji spam."*  
  > **Metric 3:** *"100% Whiteboard Visibility. Zero students experienced screen occlusion during timed pop quizzes, preserving uninterrupted visual continuity during live whiteboard derivations."*  
  > **Student Quote 1:** *"“I can finally ask complex math problems without typing... Ekhon math er chobi tule pathano jay, type kora lagena... eta shotti onek bhalo hoyeche. Bhaiya class er majhe amr doubt er uttor diyeche.” — Prothom Das Turjo cohort, HSC Science."*  
  > **Student Quote 2:** *"“My live video doesn't freeze anymore on mobile data... Buffer korle 360p te diye shunte pari, class miss hoy na. Ar quiz ashle video bondho hoy na.” — Zayed Bin Aslam cohort, HSC Admission, Tangail."*
* **Narrative Connection to Next Section:**  
  With user validation confirmed, Section 7 dives deep into the system architecture and micro-interactions that make this possible.

---

### Section 7: Design Decisions & System Anatomy
* **Location in Figma:** Node `435:245` | Height: `588px`
* **Narrative Purpose ("Why this exists here"):**  
  Adapted from `Desktop - 5`'s Systems Thinking & Design Decisions pattern (`323:1578`). It proves that Turash designs not just visual skins, but complete technical and psychological systems.
* **Design Patterns Added:**
  1. **Tripartite Live Systems Thinking Architecture Diagram (`#131C2E` Navy Frame):**  
     A 4-stage engineering pipeline diagram:
     * *Stage 1 (Ingest):* HLS / WebRTC Low-Latency Stream (1080p, 720p, 360p ABR).
     * *Stage 2 (Routing):* WebSocket Gateway separating spam chat from priority doubts.
     * *Stage 3 (Inference):* Ask AI Copilot (Fine-tuned GPT-4.0 OCR).
     * *Stage 4 (Client):* 0% Obstruction Split Controller on 5.5-inch screens.
  2. 3 Foundational Decision Cards (Teacher Inbox Protocol, 12-State Timer, 5-State Emotional Exit).
  3. 2 Micro-Interactions & Psychology Cards (The Emerald Green `#26C163` rationale & AI Validation Loop).
* **Exact Text & Copy Implemented:**
  > **Design Decisions:** *"Every pixel engineered with psychology, business ROI, and ergonomics. Every component in the redesigned classroom was architected around three foundational design decisions: separating academic signal from social noise, preserving video continuity during assessments, and capturing genuine emotional feedback."*  
  > **Decision 1:** *"The Teacher Inbox Protocol. Isolates genuine questions into a prioritized upvote queue with photo attachments. Teacher 2 can filter, resolve, and pin answers with zero chat clutter."*  
  > **Decision 2:** *"12-State Algorithmic Quiz Timer. Pop-quiz bottom sheet features a 12-state timer that transitions from emerald green (#26C163) to amber and crimson as time runs down, giving instant urgency cues without panic."*  
  > **Decision 3:** *"5-State Emotional Exit Rating. Replaces tedious post-class text forms with 5 facial reactions: Crying, Thinking, Neutral, Smiling, Beaming. Captures genuine session sentiment in under 2 seconds."*  
  > **Psychology Card 1:** *"The Emerald Green Rationale (#26C163). Calming chromatic anchor for active submission buttons. Reduces cognitive anxiety during high-pressure timed exams and complex derivations."*  
  > **Psychology Card 2:** *"Ask AI Doubt Validation Loop. Provides an instantaneous safety net when Teacher 2 is backlogged, with 1-tap teacher endorsement to ensure zero hallucination."*
* **Narrative Connection to Next Section:**  
  Great design systems must survive harsh real-world infrastructure constraints. Section 8 details how the platform handles bandwidth collapse.

---

### Section 8: Hardware & Network Constraints (The Core Trade-off)
* **Location in Figma:** Node `435:265` | Height: `687px`
* **Narrative Purpose ("Why this exists here"):**  
  Directly adapted from `Desktop - 5`'s Hardware Constraints & Trade-offs pattern (`323:1730`). It demonstrates senior product maturity by explaining what was sacrificed and why.
* **Design Patterns Added:**
  1. **Editorial Question Callout Box:**  
     Mint-tinted container (`#F0FDF4`) with an emerald left border and prominent italic typography:  
     *“How do we guarantee uninterrupted classroom pedagogy when the network cannot sustain high-definition video packets?”*
  2. 2 Constraint Paradigm Cards (ABR vs Manual 360p Downscaling).
  3. 2 Strategic Trade-off Cards (Trading Visual Fidelity for Pedagogy; Trading Chat Freedom for Signal).
  4. **Trade-off Strategic Conclusion Banner (`#131C2E` Navy Frame):**  
     A high-contrast concluding banner summarizing the engineering philosophy.
* **Exact Text & Copy Implemented:**
  > **Constraints:** *"Designing for Hardware & Network Constraints. Flawless 1080p streaming for 10,000 students on rural 3G isn't possible, yet. Over 42% of 10 Minute School's student body connects via prepaid mobile data in district towns where cellular speeds fluctuate between 128 kbps and 1.5 Mbps with severe packet loss. We had to ask: How do we guarantee uninterrupted classroom pedagogy when the network cannot sustain high-definition video packets?"*  
  > **Paradigm A (ABR):** *"Player auto-detects bandwidth drops and adjusts resolution dynamically. Consideration: Sudden resolution drops cause blurry whiteboards, frustrating students trying to read formulas."*  
  > **Paradigm B (Manual 360p):** *"Student explicitly chooses 360p or audio-only mode with 1-tap toggle, saving 70% mobile data and preventing catastrophic stream disconnection during critical derivations."*  
  > **Trade-off 1:** *"Trading Visual Fidelity for Pedagogy. When bandwidth collapses, continuous audio sync and readable slide notes matter 10x more than 60fps HD video. Pedagogy always trumps raw pixels."*  
  > **Trade-off 2:** *"Trading Chat Freedom for Focus Signal. By restricting teacher doubts to a dedicated, moderated inbox, we traded unconstrained social chatter for guaranteed doubt visibility and 84% lower cognitive noise."*  
  > **Conclusion Banner:** *"“When bandwidth collapses, continuous audio sync and readable slide notes matter 10x more than 60fps HD video. Pedagogy always trumps pixels.”"*
* **Narrative Connection to Next Section:**  
  Having covered the entire lifecycle—from problem to architecture to constraints—Section 9 summarizes the senior designer's philosophical takeaways.

---

### Section 9: Outcomes & Senior Product Reflection
* **Location in Figma:** Node `435:285` | Height: `276px`
* **Narrative Purpose ("Why this exists here"):**  
  Adapted from `Desktop - 5`'s Reflection pattern (`323:1880`). It elevates Turash from a tactical UI designer to a strategic product leader with clear product philosophies.
* **Design Patterns Added:**
  * 3 Senior Reflection Dossier Cards equipped with large emerald number tags (`01`, `02`, `03`) and high-contrast typography.
* **Exact Text & Copy Implemented:**
  > **Reflection:** *"What I learned designing for 10,000 simultaneous learners. Designing for extreme scale in an emerging market taught me that product design is fundamentally an exercise in psychology, constraint engineering, and ruthless intentionality."*  
  > **Dossier 01 (Accessibility is Equity, Not an Edge Case):** *"In emerging markets, designing for 3G mobile data and low-end Android phones isn't an afterthought. If your design only works on flagship iPhones on Wi-Fi, you have failed the 60% of students who need your platform the most."*  
  > **Dossier 02 (Separation of Intent Reduces Noise):** *"When social community chatting and high-stakes academic doubts share the same UI feed, noise will always drown signal. Creating separate intentional spaces transforms chaos into clarity."*  
  > **Dossier 03 (Micro-Interactions Drive Habit & Retention):** *"Small, deliberate details—a 12-state color-shifting quiz timer, a 5-second emotional feedback exit, or an emerald green submit button—transform a passive broadcast into an active, delightful daily ritual."*

---

## 🎯 Summary Audit Checklist

| Item / Requirement | Status | Verification in Figma (`Desktop - 8`) |
| :--- | :---: | :--- |
| **Preserve `Desktop - 7` untouched** | ✅ PASS | `Desktop - 7` (`381:64`) remains at `x: 19704`, completely pristine. |
| **New isolated frame** | ✅ PASS | Created as `Desktop - 8 (10MS Detailed Case Study)` (`435:26`) at `x: 21344`. |
| **Inspiration from `Desktop - 5`** | ✅ PASS | Adapted all 9 structural sections, typographic scales, and narrative arcs. |
| **Bottleneck Diagram** | ✅ PASS | Replaced old OpenAI SVG with 3-stage `10MS Stream Bottleneck Diagram`. |
| **Hero Mobile UI Mockup** | ✅ PASS | Built complete `360 × 360px` phone frame with video, 3 tabs, and live doubt cards. |
| **Core Flows Mini Screens** | ✅ PASS | All 4 flow cards have custom mini UI viewports. |
| **19 Scanned Audit Sheets** | ✅ PASS | Dedicated gallery board displaying paper sheets `02`, `06`, `10`, `14`. |
| **Personas & Decision Matrix** | ✅ PASS | Turjo & Zayed dossiers + 3-paradigm comparative matrix. |
| **Empirical Usability Data** | ✅ PASS | Google Form study metrics (`78%`, `3.2x`, `100%`) + localized quotes. |
| **Systems Thinking Diagram** | ✅ PASS | 4-stage Tripartite Ingest & Routing pipeline diagram. |
| **Question Callout & Banner** | ✅ PASS | Editorial callout box and high-contrast Trade-off Conclusion Banner. |
| **Numbered Reflection Dossiers**| ✅ PASS | Emerald `01`, `02`, `03` numbered takeaway cards. |
| **Sidebar Navigation Sync** | ✅ PASS | All 9 sidebar buttons match the 9 sections verbatim. |

You can inspect the live frame directly in your Figma canvas at [`Desktop - 8 (10MS Detailed Case Study)`](https://www.figma.com/design/q4D57eROLsfR2CSz3IlOD5/2x-%25E2%259C%25A6-Portfolio?node-id=435-26). Everything is organized, styled, and aligned to senior-level standards!