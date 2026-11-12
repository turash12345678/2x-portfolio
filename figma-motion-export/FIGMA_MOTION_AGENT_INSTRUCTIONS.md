# 🤖 Figma Motion Master Guide for Incoming AI Agents

> **CRITICAL DIRECTIVE FOR THE INCOMING AI AGENT:**  
> This package contains everything you need to understand, inspect, script, and extend native keyframe motion animations for **Turash Ahsan / 2X ✦ Studio** inside Figma.  
> Read this document first before inspecting or modifying any Figma frames or scripts.

---

## 📌 1. Target Figma Files & Canvas Structure

### 🎨 File A: `Turash Ahsan ✧ Design File`
* **Figma File Key:** `UIakmdXF7sal4uNvHR9whI`
* **Owner:** Turash Ahsan (`turashahsan8@gmail.com`)
* **Primary Keynote / Presentation Page:** `Ahsania` (`node-id=0:1`)
  * **Master Interactive Cursor Template:** Node `Cursor` (`518:9952`)
  * **All 13 Presentation Slides Animated with Keyframes & Micro-Interactions (5.00s Looping):**
    1. `Slide 16:9 - 16` (`96:2716`) — Interactive Bento System (Copy link, Board tab, Radar HUD spin, Join Beta CTA spring).
    2. `Slide 16:9 - 10` (`88:2379`) — Sharo Figma plugin windows (Get Started $0.94\times$, Copy button $0.92\times$, View History $0.96\times$, comment reveals).
    3. `Slide 16:9 - 17` (`96:4512`) — Events filter to Past ($0.92\times \rightarrow 1.08\times$), Pending badge pop, Weather precipitation toggle, Kanban task card pickup & drop.
    4. `Slide 16:9 - 18` (`112:6413`) — 3-Phone mobile showcase (Insights See All $0.92\times$, Music Player Play/Pause $0.86\times \rightarrow 1.15\times$, Crypto Receive button $0.88\times$).
    5. `Slide 16:9 - 19` (`125:2159`) — Multi-screen checkout & address book (Edit address $0.92\times$, Save Changes CTA $0.88\times$, Digital Wallets tab).
    6. `Slide 16:9 - 20` (`128:3048`) — IBM Cloud Pak Data Quality Governance Dashboard (Analyze button $0.90\times$, Data rules tab $0.92\times$, Column analysis row elevation).
    7. `Slide 16:9 - 21` (`130:6814`) — Logistics & Shipping Tracking Dashboard (Tracking tab $0.92\times$, Notify Customer button $0.89\times$, In Progress badge pop).
    8. `Slide 16:9 - 22` (`130:7721`) — Project Management Dashboard (This Week filter $0.92\times$, BrightBridge task card elevation, Project details pulse).
    9. `Slide 16:9 - 23` (`131:9287`) — AI Developer Cloud Platform (Book a demo CTA $0.90\times$, BETA badge pop, Storage nav press, Meta Llama-2 card lift).
    10. `Slide 16:9 - 24` (`131:11061`) — AI Recruiting SaaS Platform (Search bar ⌘K badge pop, Connect Position to ATS CTA $0.89\times$, Resume Screening nav).
    11. `Slide 16:9 - 26` (`134:13762`, $h=6235\text{px}$) — Hyper Effekt long-scroll case study (TopNav link, CTA compression, Hero elevation, marquee glide).
    12. `Slide 16:9 - 27` (`138:1565`, $h=2456\text{px}$) — RichPath SaaS layout (Pricing tab, Sign Up CTA, User greeting kinetic nudge, Balance card elevation).
    13. `Slide 16:9 - 28` (`138:3914`, $h=3233\text{px}$) — Willow Voice website (TopNav Wall of Love link, Download CTA, Hero primary button compression & heading nudge).
* **Page 4:**
  * **Hero Frame:** `FigShot — squeak-pet-toys.framer.website` (`476:1546`, $1852 \times 2098\text{px}$, 4.00s loop). 14 nodes animated: TopNav, Heading 1, 7 floating sticker badges with 32% spring elastic overshoot and sinusoidal float, CTA Shop Now pulse, 3 product toy cards.

---

### 🎨 File B: `Untitled` (Reference & Master Motion System)
* **Figma File Key:** `EjXNcJiItBuECQqGvvqreI`
* **Page:** `Page 1`
  * **Reverse-Engineered Reference Frames:**
    - `Riff · Nothing but net` (`1:675`, $1080 \times 1350\text{px}$) + Spec Board `Motion Audit & Spec · Riff Nothing but net` (`1:864`, $1640 \times 1776\text{px}$ @ $x: 1200$).
    - `09 · Assets / Counter — Dark & Light` (`2:2740`) + Spec Board `Motion Audit & Spec · Counter` (`2:4572` @ $x: 6850$).
    - `cursor-image-trail` (`2:3919`) + Spec Board `Motion Audit & Spec · Cursor Image Trail` (`2:4686` @ $x: 10450$).
    - `Day-12-Dark` (`2:4211`) + Spec Board `Motion Audit & Spec · Day-12-Dark` (`2:4814` @ $x: 15150$).
  * **Master Brand Production Frame:**
    - `2X ✦ Brand Motion Experience (Animatable Master)` (`node-id=2:4942`, $1920 \times 1080\text{px}$ @ $x: 17200, y: 0$).
    - Contains:
      1. TopNav with live 60 FPS status badge.
      2. Kinetic Typography Hero (`Word_1_Crafting`, `Word_2_Unforgettable`, `Word_3_Kinetic`, `Word_4_Digital_Interfaces`) with blinking cursor `"|"` and rolling odometer metric cards (`680+`, `60 FPS`, `1.32x`).
      3. Gamified Physics Target Bento (`Animatable_File_Token`, `Aim_Dot_1`–`5`, `Rim_Bar`, `Net_Squash_Stretch_Mesh`, `SCORE: 01`).
      4. Cursor Image Trail Sandbox (`Trail_Tile_1`–`4`).
      5. Floating Motion Controller Dock (`[ ▶ Play ]`, Timeline `0.00s / 8.00s`, Easing `Spring (1.32)`).

---

## 🛠️ 2. Native Figma Keyframe Animation API Architecture

When working inside a Figma Plugin or execution sandbox, the native animation engine uses:

### A. Timeline Duration Setup
```javascript
// Set duration on the parent frame (e.g. 5.0 seconds)
await root.setTimelineDuration(frameNodeId, 5.0);
```

### B. Applying Manual Keyframe Tracks
Nodes are animated by calling `applyManualKeyframeTrack(propertyDescriptor, trackData)`:
```javascript
const node = await figma.getNodeByIdAsync(targetNodeId);

// Target Property can be:
// { type: 'PROPERTY', name: 'SCALE_XY' }
// { type: 'PROPERTY', name: 'POSITION' }
// { type: 'PROPERTY', name: 'ROTATION' }
// { type: 'PROPERTY', name: 'OPACITY' }

const trackData = {
  baseValue: { type: 'VECTOR', value: { x: 1, y: 1 } },
  keyframes: [
    {
      timelinePosition: 0.0,
      value: { type: 'VECTOR', value: { x: 1, y: 1 } },
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.22, y1: 1.0, x2: 0.36, y2: 1.0 } }
    },
    {
      timelinePosition: 1.2,
      value: { type: 'VECTOR', value: { x: 0.92, y: 0.92 } }, // Button click compression
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.34, y1: 1.32, x2: 0.64, y2: 1.0 } }
    },
    {
      timelinePosition: 1.45,
      value: { type: 'VECTOR', value: { x: 1.08, y: 1.08 } }, // Spring overshoot rebound
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.22, y1: 1.0, x2: 0.36, y2: 1.0 } }
    },
    {
      timelinePosition: 1.70,
      value: { type: 'VECTOR', value: { x: 1.0, y: 1.0 } }, // Settle
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 } }
    }
  ]
};

node.applyManualKeyframeTrack({ type: 'PROPERTY', name: 'SCALE_XY' }, trackData);
```

### C. Standard Bezier Easings
* **Snappy Decel:** `{ x1: 0.22, y1: 1.0, x2: 0.36, y2: 1.0 }` — UI entrances, slides, settles.
* **Spring Overshoot (32% Bounce):** `{ x1: 0.34, y1: 1.32, x2: 0.64, y2: 1.0 }` — Badges, button releases, popups.
* **Progress Ramping:** `{ x1: 0.65, y1: 0.0, x2: 0.25, y2: 1.0 }` — Sliders, progress bars.
* **Linear:** `{ x1: 0.0, y1: 0.0, x2: 1.0, y2: 1.0 }` — Continuous rotation (e.g. radar spark `0° -> 360°`).
* **HOLD (Zero-Time):** Instantaneous state transition / teleportation.

---

## 📂 3. Folder Contents & Next Steps

* [`MOTION_BRAND_PLAYBOOK.md`](./MOTION_BRAND_PLAYBOOK.md): Complete motion principles, math formulas, Disney squash & stretch, Framer Motion and CSS recipes.
* [`FIGMA_MOTION_SPECS_AND_CHOREOGRAPHY.md`](./FIGMA_MOTION_SPECS_AND_CHOREOGRAPHY.md): Section-by-section breakdown of every animated frame and node ID.
* [`scripts/figma_keyframe_helpers.js`](./scripts/figma_keyframe_helpers.js): Helper functions for building keyframe tracks, cursor paths, and batch applying animations.
* [`scripts/react_framer_motion_recipes.tsx`](./scripts/react_framer_motion_recipes.tsx): Production React 19 motion variants matching Figma curves.
* [`tokens/motion_tokens.json`](./tokens/motion_tokens.json): Machine-readable easing curves, durations, and color tokens.
