# 10 Minute School | Live Class UI Redesign
## Complete Case Study Knowledge Base & Frame-by-Frame System Audit

---

## 1. Project Snapshot (Cover Data)

| Attribute | Details |
| :--- | :--- |
| **Product** | 10 Minute School (10MS) — Mobile App (Android / iOS) & Web |
| **Feature / Scope** | Live Class Experience & Real-Time Classroom Interaction Ecosystem Redesign |
| **Target Audience** | Grades 6–12 Students across Bangladesh (Ages 12–18) |
| **Designer / Lead** | Turash Ahsan (Product Designer / UI/UX Designer) |
| **Timeline** | January – February 2025 (Audit, System Design, Testing & Final Spec) |
| **Key Domains** | EdTech, Real-time Interaction, Streaming UX, Bandwidth Optimization, AI Assistance |
| **Core Platforms** | Mobile-First (Android Compact 412×917 / iPhone 393×852) + Landscape / Web Admin |
| **Usability Test Form** | `https://forms.gle/gRCSTxTYGcYm83qQ9` |

---

## 2. The Previous System (Ager System) — Deep Audit & Flaws
*Grounded directly in the `🞴 Achive / ↳ Audit` page (`205:82` & `1109:6069`) and Turash's scanned design audits (`Scanned_20250213-1844-01` to `19`).*

### The Audit Artifacts
On February 13, 2025, a comprehensive physical and digital audit of the existing 10MS live class was conducted, mapping out every screen, control, and pain point:
- **Scanned Audit Sheets:** 19 scanned pages (`Scanned_20250213-1844-01` through `19`) analyzing the mobile and desktop classroom layouts.
- **Pain Point Mapping:** Identifying critical cognitive and technical bottlenecks that broke learning continuity.

### The 5 Core Flaws in the Previous 10MS Live System:
1. **The Single Unmoderated Chat Stream (Cognitive Pollution):**
   - *Figma Callout:* `"Students don’t share important messages, and their questions often go unnoticed by the teacher."`
   - All 1,000+ students shared a single universal chat stream. Serious students trying to ask mathematical or conceptual questions were instantly buried beneath a barrage of emojis, casual greetings ("Josss", "Hi vaia"), and spam.
2. **The "Teacher 2" Response Bottleneck:**
   - In 10MS live architecture, **Teacher 1** delivers the lecture on stream, while **Teacher 2** sits behind the screen resolving questions.
   - Because all messages were jumbled into one feed, Teacher 2 had to manually skim hundreds of irrelevant chats to find legitimate doubts. By the time Teacher 2 responded, Teacher 1 had already moved on to the next topic.
3. **No Manual Video Quality Control (Rural Connectivity Failure):**
   - *Figma Callout:* `"Add a video player with options to stop and skip 10s during the live session."`
   - Students in Tier 2/3 cities and rural Bangladesh (relying on unstable 3G/4G) had no manual resolution toggles (1080p / 720p / 360p / Auto). The stream would buffer, freeze, or drop frames.
   - Missing 10 seconds of a teacher's derivation meant losing the entire conceptual thread and waiting up to 24 hours for the recorded class archive to process.
4. **Intrusive, Disruptive Quizzes & Polls:**
   - *Figma Callout:* `"User need this poll option on the right panel"`
   - Quizzes popped up obtrusively over the video player, blocking the teacher's whiteboard notes, equations, and active lecture view.
5. **Zero Attachment / Rich Input Capabilities:**
   - *Figma Callout:* `"Upload file using drive or drag file."`
   - Students couldn't photograph a textbook equation or handwritten math problem to ask a specific question. They were forced to type complex formulas into a plain text input.

---

## 3. Personas & Behavioral Models

### Persona A: Prothom Das Turjo
- **Profile:** 17 years old · Male · Introvert · ICT Class Captain · Islamia Degree College, Chittagong
- **Device:** Android mobile (16 hours/day screen time)
- **Mindset:** *"Accept me as I am"* — Introverted, serious about writing and structured study, easily overwhelmed by chaos.
- **Frustration:** Gets stressed by chat trolls and spam; hesitant to ask questions publicly for fear of mockery.
- **Need:** A distraction-free, 1-on-1 private channel with Teacher 2 where his academic questions receive focused attention.

### Persona B: Zayed Bin Aslam
- **Profile:** 17 years old · Male · Extrovert · Small Entrepreneur & Aspiring Astronomer · Tangail
- **Device:** Android mobile (14 hours/day screen time, frequent commuter)
- **Mindset:** *"I like to do crazy things"* — Ambitious, energetic, studies astronomy and writes on Medium.
- **Frustration:** Lives in an area with fluctuating bandwidth; classes freeze and stutter. Missing 15 seconds ruins his understanding.
- **Need:** 
  1. Manual video downscaling (360p/Auto) to maintain uninterrupted streaming even on 3G.
  2. A 5–10 second live rewind buffer (DVR) to instantly replay missed explanations.

---

## 4. Current Redesign (Bortoman Design) — Frame-by-Frame Architecture
*Grounded in `🗹 Final / ↳ Android Compect` (`1057:4560`), `↳ Iphone` (`1057:5960`), and the `❖ Component /` design system.*

### 4.1 The 3-Tab Classroom Navigation
Instead of a single chaotic feed, the redesign introduces a strict cognitive separation via a tabbed layout:
```
[ Teacher Inbox ]    [ Discussion Box ]    [ Quiz ]
```
1. **`Teacher Inbox` (1-to-1 Private Doubt Clearing):**
   - **Direct 1-on-1 Line:** Messages sent here are private between the student and Teacher 2. Zero peer visibility, zero peer mockery.
   - **Rich Media Attachments (`Componenet/Uploed`):** Students can snap photos of handwritten work or upload diagrams directly:
     - `Take Photo`
     - `Upload image / Select from gallery`
     - `Use drive for upload`
   - **Integrated "Ask AI" Copilot (`Propoerties/Ask Ai`):**
     - Powered by GPT-4.0. If Teacher 2 is flooded with hundreds of questions, the student can tap `Ask AI` to get an instantaneous, step-by-step conceptual breakdown right in the thread without breaking focus.
2. **`Discussion Box` (Separated Community Stream):**
   - Dedicated exclusively to casual social camaraderie, peer encouragement, and live stream feedback:
     - *"How is the josss !!"*
     - *"Vaiya... Ektu side e jan... Screen Dekha jay na"*
     - *"5 no. line ta bujhi nai, Abar bujhai den...."*
   - Keeps peer enthusiasm alive without polluting academic doubt resolution.
3. **`Quiz / Poll` (Non-Intrusive In-Stream Gamification):**
   - **Docked & Pop-Up Variants:** Both Vertical and Horizontal non-intrusive layouts.
   - **12-State Precision Countdown Timer (`Properties/Timer`):** Smooth visual progress ring displaying time remaining.
   - **Tactile Option Selectors (`Button/A`, `Button/B`, `Button/C`, `Button/D`):** Instant feedback states (Default, Pressed, Selected).
   - **Real-Time Performance Cards:** "Quiz 1 — Wrong Answer / See Quiz" with detailed answer review and Leaderboard standings.

### 4.2 The Live Player Controls (`↳ Full Screen` & `↳ Quality`)
- **Video Quality Selector:**
  - Explicit options: `1080p`, `720p`, `360p`, `Auto` (Default & Hover states).
  - Optimizes data usage for rural bandwidth conditions across Bangladesh.
- **5-Second Quick Seek Buttons (`5 Sec`):**
  - Instant DVR skip back 5s or skip forward 5s to catch missed words or diagrams.
- **Adaptive Dark / Light Themes:**
  - High-contrast player HUD components for dark/full-screen environments.

### 4.3 Cognitive Friction & Retention Modals (`↳ Leave & class rating`)
- **Exit Retention Dialog (`Leave Class/Alart`):**
  - Prevents impulsive student drop-offs:
    - *Title:* "Want to get out of class?"
    - *Body:* "Taking the class is important for you to continue learning. Are you sure you want to get out of class?"
    - *Actions:* Primary: "Want to get out for a while" (Take a break mode) vs. Confirm Exit.
- **Class Rating & Sentiment Modal (`Leave Class/Rating/Pop-Up`):**
  - Collects post-class feedback with a 5-star interactive rating container and 4 dynamic emoji sentiment states:
    - `crying-face` (Frustrated / Stuttered stream)
    - `thinking-face` (Neutral / Difficult topic)
    - `slightly-smiling-face` (Good)
    - `beaming-face-with-smiling-eyes` (Outstanding experience)

### 4.4 Design Foundations & Style Rationale (`⌘ Style /`)
- **Color System (`251:853`):**
  - **Why Green for Primary Buttons?** (`#26c163`): Green conveys encouragement, progress, psychological reassurance, and brand identity in Bangladeshi educational culture, avoiding the stress associated with test red/warning yellow.
  - **Secondary Red (`#fc373e`):** Reserved exclusively for live urgency, "LIVE" indicator badges, and critical warnings.
  - **Surface Neutrals (`#ffffff` down to `#181818`):** Strict tokenized grayscale for light and dark classroom modes.
- **A/B Testing Insights (`214:117`):**
  - Evaluated layout A vs. B with student cohort via Google Forms (`Test 1 : https://forms.gle/gRCSTxTYGcYm83qQ9`).
  - *Winning Pattern:* Layout B selected for **minimal cognitive load**, habitual pattern familiarity, and direct intuitive interaction.

---

## 5. Reverse-Narrative Content Map (11 Steps)

```
[00] COVER & SNAPSHOT
     Role · Timeline · Audience · EdTech Constraints

[01] THE BACKSTORY (The Classroom Paradigm)
     10MS's scale in Bangladesh → Thousands of students in live classes → The two-teacher architecture.

[02] THE BUSINESS & PEDAGOGICAL PROBLEM
     The double cost of chat chaos and video buffering: Student churn, Teacher 2 burnout, support ticket spikes.

[03] THE STRATEGIC REFRAME
     How might we design a low-bandwidth resilient, distraction-free live classroom that balances peer energy with academic focus?

[04] THE SOLUTION PREVIEW (Visual Climax First)
     High-fidelity showcase of the redesigned mobile interface (Android Compact & iPhone).

[05] THE PREVIOUS SYSTEM AUDIT (Frame-by-Frame Breakdown)
     The 19 scanned audit sheets, the raw pain points, and why the existing live room was failing students.

[06] BEHAVIORAL RESEARCH & PERSONA DICHOTOMY
     Turjo (Introverted Chittagong captain needing quiet focus) vs. Zayed (Tangail entrepreneur fighting 3G buffering).

[07] ARCHITECTURAL DECISIONS & A/B TESTING
     Why the 3-tab model won (Forms testing) · Why 1-to-1 Teacher Inbox beats universal chat · Why 5s DVR rewind beats waiting for archives.

[08] THE COMPONENT ECOSYSTEM & MICRO-INTERACTIONS
     Deep dive: Quality switchers, Ask AI copilot integration, 12-state quiz timers, attachment flows, and exit-friction rating modals.

[09] DESIGN SYSTEM & PSYCHOLOGICAL FOUNDATIONS
     Why Green buttons? Color tokens, typography hierarchy, and cross-platform parity (Android vs. iPhone).

[10] MEASURABLE IMPACT & OUTCOMES
     Response time reduction for Teacher 2, drop-off reduction, low-bandwidth completion rates.

[11] REFLECTION & FUTURE HORIZONS
     What was learned, offline-first sync, edge AI in live EdTech.
```
