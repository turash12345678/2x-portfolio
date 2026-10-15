# ⚡ 2X ✦ Studio — Master Motion Brand Playbook & Design System
> **Official Motion Guidelines, Physics Primitives, and Keyframe Automation Recipes**  
> *Author:* Turash Ahsan · Product & Motion Designer  
> *Brand Identity:* **2X ✦ Studio**  
> *Version:* `2.0.0` (Production Master)  
> *Last Updated:* 2026-10-15  

---

## 🏛️ 1. Brand Motion Philosophy & Core Thesis

At **2X ✦ Studio**, motion is never superficial eye-candy or cosmetic fluff. Motion is the **primary sensory bridge** between human intent and software feedback. 

### The 4 Foundational Pillars:
1. **Physical Weight & Inertia:** Digital objects must obey real-world laws—momentum, gravity, and Disney's foundational principle of **Squash & Stretch**—so interactions feel tactile and organic rather than robotic.
2. **Kinetic Anticipation (The Wind-Up):** Before any major action fires (throwing a file, launching a flow, submitting a form), elements pull back slightly (negative translation, counter-rotation) to build kinetic tension.
3. **Multi-Sensory Micro-Rewards:** Successful actions must be celebrated instantaneously through synchronized micro-interactions—dynamic dropzone color blooming, scoreboard scaling, rolling counters, and badge popups.
4. **Sub-Frame Zero-Jitter Resets:** In continuous looping animations or infinite states, off-screen nodes are teleported instantaneously using **`HOLD` keyframes** during periods of zero opacity, guaranteeing 60fps zero-flicker loops.

---

## 🔬 2. The 4 Reverse-Engineered Motion Primitives

This playbook codifies the exact mathematical formulas, timings, and easing curves extracted from our reverse-engineered audits of production Figma keyframe timelines.

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           2X MOTION PRIMITIVES SUITE                            │
├───────────────────────┬────────────────────────┬────────────────────────────────┤
│ Primitive Name        │ Core Physics           │ Target Interaction Use-Cases   │
├───────────────────────┼────────────────────────┼────────────────────────────────┤
│ 1. Gamified Upload    │ Parabolic Arc, Squash  │ File uploads, drag-and-drop,   │
│    (Nothing but net)  │ & Stretch Net Inertia  │ task completions, delete trash │
├───────────────────────┼────────────────────────┼────────────────────────────────┤
│ 2. Velocity Odometer  │ 93-Sample Acceleration │ Live metrics, stats counters,  │
│    (Counter System)   │ & Deceleration Curve   │ dashboard KPIs, pricing tiers  │
├───────────────────────┼────────────────────────┼────────────────────────────────┤
│ 3. Particle Trail     │ Staggered Scale Bloom  │ Cursor dynamics, hero canvas,  │
│    (Image Cascade)    │ & Dwell Decay Cycle    │ portfolio showcase, gallery    │
├───────────────────────┼────────────────────────┼────────────────────────────────┤
│ 4. Kinetic Typography │ Macro Zoom-Out Pan &   │ Headlines, AI prompts, hero    │
│    (Day-12-Dark)      │ Step-Tracked Cursor    │ reveals, typing indicators     │
└───────────────────────┴────────────────────────┴────────────────────────────────┘
```

---

### 🏀 Primitive 1: Gamified Physics & Squash-and-Stretch (`Nothing but net`)
*Source Frame:* `1:675` | *Timeline:* `8.00s` (480 Frames @ 60fps)

#### A. Parabolic Projectile Flight (The Basketball File)
* **X-Axis Translation:** `-50px` (Launch) $\rightarrow$ `+250px` ($0.90\text{s}$) $\rightarrow$ `+290px` ($1.40\text{s}$) $\rightarrow$ `0px` (Hold Reset).
* **Y-Axis Parabola:** `+60px` $\rightarrow$ Apex peak `-590px` ($0.668\text{s}$) $\rightarrow$ `-370px` ($1.40\text{s}$) $\rightarrow$ Target basket entry `-160px` ($1.95\text{s}$).
* **Double CCW Rotation:** `-6.0°` $\rightarrow$ `-470°` $\rightarrow$ `-720°` (full two-turn spin mimicking backspin on a basketball shot).
* **Z-Axis Depth Scale:** `1.08x` $\rightarrow$ `0.80x` (shrinking perspective simulating travel away from camera into the 3D background).
* **Opacity Dissolve:** Remains `1.0` until $1.80\text{s}$, then dissolves cleanly into the net by $1.97\text{s}$.

#### B. Rim Recoil & Disney Net Physics
* **Rim Dip:** When the file touches the hoop, `Rim mount`, `Rim back`, and `Rim front` dip down `Y: +4px` ($0.95\text{s}$) using curve `(0.22, 1.0, 0.36, 1.0)`, then spring back with overshoot at $1.15\text{s}$.
* **Net Squash & Stretch:**
  * **Downward Pull:** `Y: 0px` $\rightarrow$ `+16.5px` ($1.57\text{s}$) $\rightarrow$ `-4.5px` (rebound) $\rightarrow$ `0px` ($1.97\text{s}$).
  * **Horizontal Constriction (Squash):** `Scale X: 1.0x` $\rightarrow$ `0.88x` (constricts as ball passes through) $\rightarrow$ `1.04x` (bulge rebound) $\rightarrow$ `1.0x`.
  * **Vertical Elongation (Stretch):** `Scale Y: 1.0x` $\rightarrow$ `1.22x` (maximum dynamic stretch) $\rightarrow$ `0.94x` (spring recoil) $\rightarrow$ `1.0x`.

#### C. Micro-Reward Feedback
* **Dropzone Color Bloom:** Background transitions from `#FFFFFF` to warm orange tint `#FFF5EE`, while border stroke transitions from `#C9CED6` to vibrant `#FF6B2C`.
* **Scoreboard Pop:** Container scales `1.0x` $\rightarrow$ `1.05x` ($1.65\text{s}$) with spring overshoot `(0.34, 1.32, 0.64, 1.0)`.
* **Digit Rolling ($0 \rightarrow 1$):** `Digit 0` slides `Y: 0 → -32px`, while incoming `Digit 1` slides `Y: 0 → -32px`.
* **Floating Badge:** `+1` / `+100 XP` pops from `Scale: 0.60x → 1.10x`, floats `Y: 0 → -70px`, and fades out.

#### D. Anticipation Pull-Back
* Before launching, the closed hand cursor grabs the file with a tactile micro-dip (`Scale: 0.90x` at $6.37\text{s}$) and pulls back into negative space: `X: -70px, Y: +72px, Rotation: -9°`.

---

### 🎰 Primitive 2: High-Velocity Rolling Odometers (`Counter System`)
*Source Frame:* `2:2740` | *Timeline:* `4.69s` | *Resolution:* 93 Keyframe Steps

#### A. Motion Dynamics
* Digit columns contain stacked numbers `0` through `9`.
* Instead of arbitrary jumps, the counter executes a **physically mapped trajectory**:
  * **Acceleration Phase ($0.0\text{s} - 0.8\text{s}$):** Velocity ramps exponentially (`Y: 0 → 3,596px`).
  * **Sustained Blur Spin ($0.8\text{s} - 2.5\text{s}$):** Linear velocity exceeding $12,000\text{px/s}$, blurring digits into a continuous cascade.
  * **Deceleration & Lock ($2.5\text{s} - 4.69\text{s}$):** Displacement peaks at $54,118\text{px}$ before dampening with sub-pixel precision into the resting baseline.

#### B. Dual-Theme Design Tokens
```css
/* Dark Mode Side (Left Column) */
--counter-bg-dark: #000000;
--counter-digit-dark: #FFFFFF;
--counter-border-dark: #262626;

/* Light Mode Side (Right Column) */
--counter-bg-light: #EEEEEE;
--counter-digit-light: #141414;
--counter-border-light: #E0E0E0;
```

---

### 🌊 Primitive 3: Interactive Cursor Particle Trails (`cursor-image-trail`)
*Source Frame:* `2:3919` | *Timeline:* `7.60s` | *Density:* 48 Instanced Nodes

#### A. The 4-Phase Particle Lifecycle
1. **Spawn (Instant Cut):** Particle stays at `Opacity: 0` until cursor passes its coordinates. An instant `HOLD` keyframe sets `Opacity: 1.0` in exactly $\Delta t = 0.001\text{s}$. Initial `Scale: 0.55x`.
2. **Bloom Expansion:** Scale rapidly expands `0.55x → 1.0x` over $0.22\text{s}$ using smooth deceleration curve `(0.22, 1.0, 0.36, 1.0)`.
3. **Dwell Window:** Card holds fixed at `Scale: 1.0x` and `Opacity: 1.0` for **$0.55\text{s}$**, allowing the eye to register the content.
4. **Soft Dissolve Decay:** Card gently shrinks `1.0x → 0.82x` while opacity fades `1.0 → 0` over $0.45\text{s}$ via `easeInOut`.

#### B. Particle Timing Rule
* **Stagger Formula:** $\text{SpawnTime}(N) = N \times 0.08\text{s}$ (where $N$ is the tile index $0 \le N \le 47$).
* **Z-Index Layering:** Each newly spawned particle receives an incremented z-index so the freshest card always floats on top.

---

### ✍️ Primitive 4: Kinetic Typography & Camera Reveals (`Day-12-Dark`)
*Source Frame:* `2:4211` | *Timeline:* `4.00s`

#### A. Cinematic Camera Zoom-Out
* **Macro Lens Entrance:** Camera viewport starts at extreme macro magnification `Scale: 2.90x` with horizontal pan `X: 1,707.8px`.
* **Wide-Angle Settle:** Over $2.20\text{s}$, the camera pulls out smoothly to full wide view `Scale: 1.0x` and centers at `X: 0px`.

#### B. Word-by-Word Momentum Stagger
* Headlines are split into discrete word elements:
  * Word 1 (`"Create"`): $t = 0.42\text{s}$
  * Word 2 (`"glowing"`): $t = 0.62\text{s}$
  * Word 3 (`"text"`): $t = 0.82\text{s}$
  * Word 4 (`"line"`): $t = 1.02\text{s}$
  * Word 5 (`"effects"`): $t = 1.22\text{s}$
* **Slide Offset:** Each word slides in from `X: +44.6px` while fading in from `0 → 1` in $0.10\text{s}$.

#### C. Discrete Blinking Cursor Tracking (`"|"`)
* **Blink Rate:** Text cursor `"|"` blinks across 12 cycles ($0.37\text{s} - 3.66\text{s}$) with `0.17s` on/off duration.
* **Step-Tracked Jump:** As each word is typed, the cursor jumps to the end of the word using `HOLD` keyframes at 6 fixed positions:
  $$-721\text{px} \;\longrightarrow\; -544\text{px} \;\longrightarrow\; -352\text{px} \;\longrightarrow\; -239\text{px} \;\longrightarrow\; -273\text{px} \;\longrightarrow\; -171\text{px}$$

#### D. Luminous Laser Highlight Sweep
* A glowing neon rectangle bar (`Rectangle 24`) sweeps horizontally across the line from `X: 0 → 721px`, expanding `Scale X: 0 → 1 → 0` between $1.83\text{s} - 2.04\text{s}$ to confirm completion.

---

## 📐 3. Mathematical Easing Curve Taxonomy

Use these exact cubic-bezier coordinates across Figma, CSS, Framer Motion, and WebGL.

| Easing Family | Cubic-Bezier Formula | Visual Character | Production Application |
| :--- | :--- | :--- | :--- |
| **Snappy Decel** | `cubic-bezier(0.22, 1.00, 0.36, 1.00)` | Fast launch with soft, authoritative landing | Dropzones, digit rolling, net recovery, word entrances |
| **Spring Overshoot** | `cubic-bezier(0.34, 1.32, 0.64, 1.00)` | Kinetic pop with **32% elastic bounce** | Scoreboard pops, rim rebounds, `+1` badges, aim dot reveals |
| **Progress Ramping** | `cubic-bezier(0.65, 0.00, 0.25, 1.00)` | Smooth S-curve acceleration & gradual settle | Upload progress bars, loading spinners, state fills |
| **Linear Velocity** | `cubic-bezier(0.00, 0.00, 1.00, 1.00)` | Constant continuous velocity | High-speed odometer spin, camera panning vectors |
| **Discrete State** | `HOLD (Duration = 0s)` | Instantaneous zero-time teleportation | Cursor mode switches, hidden layer resets, cursor jumps |

---

## 💻 4. Code & Implementation Recipes

### A. Framer Motion (React 19 / TypeScript)

```typescript
import { motion, Variants } from 'framer-motion';

// 1. Signature Spring Overshoot (32% Bounce)
export const springPopVariant: Variants = {
  hidden: { scale: 0.6, opacity: 0, y: 0 },
  visible: {
    scale: [0.6, 1.32, 1.0],
    opacity: 1,
    y: -70,
    transition: {
      duration: 0.73,
      ease: [0.34, 1.32, 0.64, 1.0]
    }
  }
};

// 2. Net Squash & Stretch Inertia
export const netImpactVariant: Variants = {
  rest: { scaleX: 1, scaleY: 1, y: 0 },
  impact: {
    scaleX: [1, 0.88, 1.04, 1],
    scaleY: [1, 1.22, 0.94, 1],
    y: [0, 16.5, -4.5, 0],
    transition: {
      duration: 0.62,
      ease: [0.22, 1.0, 0.36, 1.0]
    }
  }
};

// 3. Staggered Word Typing Reveal
export const wordSlideVariant: Variants = {
  hidden: { x: 44.6, opacity: 0 },
  visible: (i: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: i * 0.10,
      duration: 0.30,
      ease: [0.22, 1.0, 0.36, 1.0]
    }
  })
};

// 4. Cursor Particle Trail Lifecycle
export const particleTrailVariant: Variants = {
  initial: { opacity: 0, scale: 0.55 },
  enter: {
    opacity: 1,
    scale: 1.0,
    transition: { duration: 0.22, ease: [0.22, 1.0, 0.36, 1.0] }
  },
  exit: {
    opacity: 0,
    scale: 0.82,
    transition: { delay: 0.55, duration: 0.45, ease: 'easeInOut' }
  }
};
```

### B. Tailwind CSS v4 & Standard CSS

```css
/* Snappy Decel */
.ease-2x-decel {
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

/* 32% Spring Bounce */
.ease-2x-spring {
  transition-timing-function: cubic-bezier(0.34, 1.32, 0.64, 1);
}

/* S-Curve Progress */
.ease-2x-progress {
  transition-timing-function: cubic-bezier(0.65, 0, 0.25, 1);
}

/* Blinking Cursor Animation */
@keyframes cursorBlink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.animate-cursor-blink {
  animation: cursorBlink 0.34s infinite;
}
```

---

## 🤖 5. Figma Plugin Native Keyframe Automation API

When scripting keyframes into Figma via `applyManualKeyframeTrack`:

```javascript
// Example: Scripting a Spring Pop on a selected node
const node = await figma.getNodeByIdAsync('TARGET_NODE_ID');

const springOvershootTrack = {
  baseValue: { type: 'VECTOR', value: { x: 1, y: 1 } },
  keyframes: [
    {
      timelinePosition: 0.0,
      value: { type: 'VECTOR', value: { x: 1, y: 1 } },
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 } }
    },
    {
      timelinePosition: 1.55,
      value: { type: 'VECTOR', value: { x: 1, y: 1 } },
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 } }
    },
    {
      timelinePosition: 1.65,
      value: { type: 'VECTOR', value: { x: 1.05, y: 1.05 } },
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.22, y1: 1.0, x2: 0.36, y2: 1.0 } }
    },
    {
      timelinePosition: 1.90,
      value: { type: 'VECTOR', value: { x: 1.0, y: 1.0 } },
      easing: { type: 'CUSTOM_CUBIC_BEZIER', easingFunctionCubicBezier: { x1: 0.34, y1: 1.32, x2: 0.64, y2: 1.0 } }
    }
  ]
};

node.applyManualKeyframeTrack({ type: 'PROPERTY', name: 'SCALE_XY' }, springOvershootTrack);
```

---

## 🎨 6. 2X Studio Master Color Tokens

```json
{
  "canvas": {
    "obsidian": "#07090E",
    "surfaceDark": "#0E121B",
    "surfaceElevated": "#151A26",
    "borderSubtle": "#232C3E"
  },
  "accents": {
    "fieryOrange": "#FF6B2C",
    "orangeTint": "#FFF5EE",
    "emeraldNeon": "#00E5A3",
    "tealGlow": "#14B8A6",
    "electricViolet": "#8B5CF6",
    "deepIndigo": "#6366F1",
    "precisionBlue": "#3C82F6"
  },
  "text": {
    "primary": "#F5F8FF",
    "secondary": "#9EADCC",
    "muted": "#667699"
  }
}
```

---

## 🎯 7. How to Execute Motion Animation in Figma With This Playbook

Whenever the user or agent needs to animate a component:
1. **Identify the Interaction Type:** Match against Section 2 (Gamified, Odometer, Particle Trail, or Kinetic Typography).
2. **Apply the Specified Easing Curves:** Use Section 3 coordinates (`0.34, 1.32` for bounce; `0.22, 1.0` for decel).
3. **Execute via Native API or Timeline UI:** Use Section 5 scripts or manual Figma timeline keyframing.
4. **Enforce Zero-Hitch Looping:** Ensure all hidden elements execute a sub-frame `HOLD` reset before $t = \text{duration}$.

---
*End of Motion Brand Playbook · 2X ✦ Studio · Turash Ahsan*
