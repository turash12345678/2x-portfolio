# 📐 Figma Motion Specifications & Choreography Master Sheet

> Comprehensive inventory of all audited frames, animated presentation slides, actor node IDs, micro-interactions, and timeline choreography across Turash Ahsan's Figma files.

---

## 🎯 1. Master Brand Animation Canvas (`2:4942`)

* **File:** `Untitled` (`EjXNcJiItBuECQqGvvqreI`) | **Page:** `Page 1`
* **Frame:** `2X ✦ Brand Motion Experience (Animatable Master)` (`node-id=2:4942`)
* **Dimensions:** $1920 \times 1080\text{px}$ @ $x: 17200, y: 0$
* **Target Timeline:** $8.00\text{s}$ infinite loop (480 frames @ 60fps)

### Layer Architecture & Animation Hooks:
1. **Kinetic Typography Engine:**
   - `Word_1_Crafting` — Enters $t=0.40\text{s}$ from $X: +45\text{px}$, opacity $0 \rightarrow 1$.
   - `Word_2_Unforgettable` — Enters $t=0.60\text{s}$ from $X: +45\text{px}$.
   - `Word_3_Kinetic` — Enters $t=0.80\text{s}$ from $X: +45\text{px}$.
   - `Word_4_Digital_Interfaces` — Enters $t=1.00\text{s}$ from $X: +45\text{px}$.
   - `Blinking_Cursor` (`"|"`) — 12-cycle blink ($0.17\text{s}$ on/off) jumping through 6 horizontal steps as words reveal.
   - `Metric_Odometer_680` — Rolling counter spinning up to 680+ with linear blur phase.
   - `Metric_Odometer_60FPS` — Rolling counter locking at 60 FPS.
   - `Metric_Odometer_132X` — Rolling counter locking at 1.32x Spring.
2. **Gamified Basketball File Upload Bento:**
   - `Animatable_File_Token` — Parabolic arc trajectory ($X: -50\text{px} \rightarrow +290\text{px}$, Apex $Y: -590\text{px}$, rotation $-720^\circ$, depth scale $1.08\times \rightarrow 0.80\times$).
   - `Aim_Dot_1` through `Aim_Dot_5` — Sequential opacity wave reveal ($0.00\text{s} - 0.40\text{s}$).
   - `Rim_Bar` — Recoil dip $Y: +4\text{px}$ upon file entry at $t=0.95\text{s}$.
   - `Net_Squash_Stretch_Mesh` — Disney physics: downward stretch $Y: +16.5\text{px}$, Scale $X: 0.88\times$, Scale $Y: 1.22\times$ followed by rebound bulge ($1.04\times / 0.94\times$).
   - `Score_Badge` (`SCORE: 01 (+100 XP)`) — Spring pop $1.05\times$ with 32% overshoot curve.
3. **Cursor Particle Trail Sandbox:**
   - `Trail_Tile_1` to `Trail_Tile_4` — Cascading entry pop ($0.55\times \rightarrow 1.0\times$ in $0.22\text{s}$), $0.55\text{s}$ dwell, decay shrink ($1.0\times \rightarrow 0.82\times$, opacity $1 \rightarrow 0$ in $0.45\text{s}$).
4. **Bottom Motion Dock:**
   - Glass pill controller with timeline progress bar and playback indicator.

---

## 🎬 2. All 13 Animated Keynote Presentation Slides

* **File:** `Turash Ahsan ✧ Design File` (`UIakmdXF7sal4uNvHR9whI`) | **Page:** `Ahsania` (`0:1`)
* **Master Cursor Node:** `Cursor` (`518:9952`) cloned into each slide.
* **Master Timeline:** $5.00\text{s}$ loop per slide, with all properties returning smoothly to baseline ($t=5.00\text{s}$) for zero hitching.

### Slide 1: `Slide 16:9 - 16` (`96:2716`) — Master Bento System
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions & Node IDs:**
  * Cursor travels diagonally to `"Copy link"` pill (`96:3420`) at $t=1.00\text{s}$, depresses down (`0.88x`), button responds with tactile compression (`0.94x`) and spring rebound pop (`1.06x -> 1.0x`).
  * Cursor glides to `"Board"` tab (`96:3029`) at $t=2.00\text{s}$, clicks down (`0.88x`), tab springs up (`0.95x -> 1.06x -> 1.0x`).
  * Cursor hovers over Radar HUD (`96:2897`), continuous $360^\circ$ linear rotation (`0° -> 180° -> 360°`), Lead Row 1 (`96:2910`) lifts $Y: -4\text{px}$.
  * Cursor targets orange `"Join the beta"` CTA (`96:3511`) at $t=3.80\text{s}$, clicks down (`0.86x`), button compresses (`0.92x`) and triggers 32% spring celebration (`1.08x -> 1.0x`).
  * $t=4.30\text{s} - 5.00\text{s}$: Smooth return to origin $(0, 0)$.

### Slide 2: `Slide 16:9 - 10` (`88:2379`) — Sharo Figma Plugin Windows
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Get Started button compression ($0.94\times$).
  * Copy button click ($0.92\times$) + URL field active pulse ($1.03\times$).
  * View History link click ($0.96\times$).
  * Staggered comment cards reveal ($Y: +16\text{px} \rightarrow 0\text{px}$) with gentle hover lift.

### Slide 3: `Slide 16:9 - 17` (`96:4512`) — Events, Weather & Kanban System
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Events filter switch to Past ($0.92\times \rightarrow 1.08\times$) + Pending badge pop ($1.15\times$).
  * Weather Precipitation metric toggle ($0.92\times$) + 7-day forecast pill ripple ($Y: -8\text{px}$).
  * Kanban High-priority tag click ($0.90\times \rightarrow 1.15\times$) + Task Card 1 pickup & drop ($Y: -10\text{px}$, $1.025\times$).

### Slide 4: `Slide 16:9 - 18` (`112:6413`) — 3-Phone Mobile Showcase
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Center phone: Insights "See All" click ($0.92\times$) + 319% metric pulse ($1.15\times$).
  * Right phone: Music Player Play/Pause click ($0.86\times \rightarrow 1.15\times$) + Album Art rhythmic pulse ($1.04\times$) + title nudge ($+4\text{px}$).
  * Left phone: Crypto Wallet Receive action button compression ($0.88\times \rightarrow 1.14\times$) + Balance Card lift ($Y: -8\text{px}$) + balance text pop ($1.08\times$).

### Slide 5: `Slide 16:9 - 19` (`125:2159`) — Multi-Screen Checkout & Address Book
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Left phone: Edit address button press ($0.92\times \rightarrow 1.08\times$) + Card 1 lift ($Y: -8\text{px}$).
  * Center phone: Save Changes CTA click ($0.88\times \rightarrow 1.12\times$) + form affirmation pulse ($1.02\times$).
  * Right phone: Digital Wallets tab toggle ($0.92\times \rightarrow 1.08\times$) + Continue CTA anticipation bounce ($Y: -4\text{px}$, $1.04\times$).

### Slide 6: `Slide 16:9 - 20` (`128:3048`) — IBM Cloud Pak Governance Dashboard
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Analyze button click ($0.90\times \rightarrow 1.10\times$).
  * Data rules tab switch ($0.92\times \rightarrow 1.08\times$) + 75% score card pop ($1.12\times$).
  * Column analysis table Row Age hover elevation ($Y: -6\text{px}$) + score badge 97% pop ($1.15\times$).

### Slide 7: `Slide 16:9 - 21` (`130:6814`) — Logistics & Shipping Dashboard
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Tracking tab press ($0.92\times \rightarrow 1.08\times$).
  * Notify Customer button click ($0.89\times \rightarrow 1.12\times$).
  * In Progress status badge pop ($1.15\times$) + tracking card responsive elevation ($Y: -6\text{px}$).

### Slide 8: `Slide 16:9 - 22` (`130:7721`) — Project Management Dashboard
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * This Week filter tab switch ($0.92\times \rightarrow 1.08\times$).
  * BrightBridge task card elevation ($Y: -8\text{px}$, $1.025\times$) + title kinetic nudge ($+4\text{px}$).
  * Right pane project details affirmation pulse ($1.02\times$).

### Slide 9: `Slide 16:9 - 23` (`131:9287`) — AI Developer Cloud Platform
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Book a demo primary CTA click ($0.90\times \rightarrow 1.10\times$) + BETA badge pop ($1.15\times$).
  * Storage nav item press ($0.92\times \rightarrow 1.08\times$).
  * Meta Llama-2 integration card lift ($Y: -8\text{px}$, $1.03\times$) + NEW badge pop ($1.15\times$).

### Slide 10: `Slide 16:9 - 24` (`131:11061`) — AI Recruiting SaaS Platform
* **Duration:** $5.00\text{s}$ | **Canvas:** $1920 \times 1080\text{px}$
* **Key Interactions:**
  * Search bar ⌘K badge pop ($0.90\times \rightarrow 1.15\times$).
  * Connect Position to ATS CTA button click ($0.89\times \rightarrow 1.12\times$) + Job Title kinetic nudge ($+5\text{px}$).
  * Resume Screening sidebar nav press ($0.92\times \rightarrow 1.08\times$).

### Slide 11: `Slide 16:9 - 26` (`134:13762`) — Hyper Effekt Long-Scroll Case Study
* **Duration:** $5.00\text{s}$ | **Dimensions:** $1920 \times 6235\text{px}$
* **Key Interactions:**
  * TopNav link press ($0.92\times \rightarrow 1.08\times$).
  * TopNav CTA button compression ($0.90\times \rightarrow 1.10\times$).
  * Hero section camera scroll pan reveal ($Y: -120\text{px}$) + marquee kinetic glide ($X: -60\text{px}$).

### Slide 12: `Slide 16:9 - 27` (`138:1565`) — RichPath SaaS Layout
* **Duration:** $5.00\text{s}$ | **Dimensions:** $1920 \times 2456\text{px}$
* **Key Interactions:**
  * Pricing tab press ($0.92\times \rightarrow 1.08\times$).
  * Sign Up CTA button click ($0.89\times \rightarrow 1.11\times$).
  * User dashboard greeting kinetic nudge ($+6\text{px}$) + Balance card elevation ($Y: -8\text{px}$, $1.05\times$).

### Slide 13: `Slide 16:9 - 28` (`138:3914`) — Willow Voice Website
* **Duration:** $5.00\text{s}$ | **Dimensions:** $1920 \times 3233\text{px}$
* **Key Interactions:**
  * TopNav Wall of Love link press ($0.92\times \rightarrow 1.08\times$).
  * TopNav Download for free CTA click ($0.89\times \rightarrow 1.11\times$).
  * Hero primary button compression ($0.88\times \rightarrow 1.14\times$, $Y: -6\text{px}$) + Hero Heading kinetic nudge ($+6\text{px}$).

---

## 🐶 3. FigShot Hero Animation (`476:1546`)

* **File:** `Turash Ahsan ✧ Design File` (`UIakmdXF7sal4uNvHR9whI`) | **Page:** `Page 4`
* **Frame:** `FigShot — squeak-pet-toys.framer.website` (`476:1546`, $1852 \times 2098\text{px}$)
* **Timeline Duration:** $4.00\text{s}$
* **Animated Nodes:**
  * Nav (`476:1548`): Slide $Y: -24\text{px} \rightarrow 0\text{px}$ ($0.0\text{s} - 0.6\text{s}$).
  * Heading 1 (`476:1606`): Rise $Y: +36\text{px} \rightarrow 0\text{px}$ ($0.15\text{s} - 0.85\text{s}$).
  * 7 Floating Sticker Badges (`476:1608`, `1613`, `1618`, `1621`, `1624`, `1627`, `1630`): Staggered entrance pop ($0.28\text{s} - 1.25\text{s}$), 32% Spring overshoot (`0.34, 1.32, 0.64, 1.0`), and continuous sinusoidal floating breath ($Y: \pm 6\text{px}$).
  * Hero CTA "Shop Now" (`476:1635`): Pop $Y: +28\text{px}$, pulse $1.0\times \rightarrow 1.05\times \rightarrow 1.0\times$ at $t=2.6\text{s}$.
  * 3 Product Toy Cards (`476:1598`, `476:1591`, `476:1583`): Center hero card rises $Y: +80\text{px}$, Left and Right cards tilt $13.82^\circ$ and $-19.22^\circ$ with counter-phase floating crests.
