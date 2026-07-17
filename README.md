# Omni Skills Olympiad (OSO)

> **Where Learning Meets Opportunity**
> 
> The Omni Skills Olympiad platform is a living, breathing ecosystem designed to connect ambition with real-world application.

---

## 1. Project Vision

### The "Living World" Concept
The Omni Skills Olympiad is not merely an educational platform; it is an interactive ecosystem. The landing page is engineered to immediately communicate that OSO is a connected masterplan rather than a static list of features. 

### Design Philosophy
- **The Ecosystem is the Hero:** The learner moves through the world, but the environment itself is the primary focus.
- **Architectural Aesthetic:** We utilize a meticulously handcrafted Isometric SVG engine, favoring the premium, tangible feel of physical architectural models over glossy, game-like 3D.
- **Restrained Motion:** Motion is treated as a premium commodity. It guides attention, communicates interaction, and reinforces the feeling of a living ecosystem. No animation exists purely for decoration.
- **Performance-First Rendering:** Complex 3D math is pre-calculated and layered cleanly into DOM nodes to ensure fluid 60FPS execution on standard laptops.

---

## 2. Features

### 🌆 Environment
- **Living Innovation District:** An expansive isometric canvas where nodes interact.
- **Architectural SVG System:** Procedurally generated buildings and platforms constructed from 2D SVG polygons.
- **Dynamic Pathways (Embedded Lighting):** As the learner walks, the neutral stone paths illuminate beneath their feet and gracefully fade.
- **Ambient Environment:** Deep, soft ambient shadows, scattered minimalist trees, plazas, and intermittent slow-flying birds.

### 🏃 Learner System
- **Autonomous Curated Journeys:** The learner autonomously follows predefined journeys through the ecosystem to simulate life.
- **Abstract Architectural Pawn:** A minimalist, elegant figurine (a 'meeple') that feels like a physical token rather than a digital avatar.
- **Smooth Locomotion:** Pure CSS `transition-all` linear interpolation driven by React state changes.

### 🏢 Reactive Architecture
Every building in the district possesses a distinct "personality" and reacts when visited by the learner.

#### **University**
- **Purpose:** Foundation of Knowledge.
- **Reaction:** The central courtyard softly brightens and warms in color when visited.

#### **Research Lab**
- **Purpose:** Advanced Discovery.
- **Reaction:** The geodesic dome begins to slowly rotate, while the red communications beacon pulses softly.

#### **Innovation Hub**
- **Purpose:** Future Technologies.
- **Reaction:** A suspended floating module rotates exactly once with a quiet architectural confidence.

#### **Industry Partners**
- **Purpose:** Real-world Experience.
- **Reaction:** The exterior conveyor/data line activates and moves at a faster rate.

#### **Competition Arena**
- **Purpose:** National Championships.
- **Reaction:** A sweeping spotlight activates, sweeping across the architecture, while the outer audience ring subtly glows.

#### **Mentors Pavilion**
- **Purpose:** Guided Excellence.
- **Reaction:** The open-air pavilion fills with a warm, inviting illumination.

#### **Public Initiatives**
- **Purpose:** Government Missions.
- **Reaction:** A civic beacon initiates a slow, diffuse pulse.

#### **Career Pathways**
- **Purpose:** Global Opportunities.
- **Reaction:** The abstract wireframe globe begins a slow, continuous rotation.

---

## 3. Architecture

The codebase is organized to separate UI layout from the complex isometric rendering engine.

```text
omni-skills-olympiad/
├── src/
│   ├── components/
│   │   ├── Ecosystem.jsx           # Core Living World isometric engine
│   │   ├── About.jsx               # 3D interactive editorial book component
│   │   ├── Hero.jsx                # Landing page hero with parallax imagery
│   │   ├── EcosystemList.jsx       # Standard list-view alternative
│   │   ├── SkillChampionships.jsx  # Card-based feature section
│   │   └── HowItWorks.jsx          # Workflow explanation component
│   ├── hooks/
│   │   └── useInView.js            # Custom intersection observer hook
│   ├── App.jsx                     # Root application assembler
│   ├── index.css                   # Tailwind configuration & global styles
│   └── main.jsx                    # React mounting point
├── public/                         # Static assets
└── package.json                    # Project dependencies
```

---

## 4. Component Breakdown

### `Ecosystem.jsx`
- **Responsibilities:** Renders the Isometric Living World, manages the Learner Journey state, calculates Z-depth sorting, and handles SVG generation.
- **Props:** None (Stateful top-level component).
- **State:** `journeyIdx` (current route), `stepIdx` (current node), `phase` (walking vs paused).
- **Hooks:** `useInView` (pauses animations when off-screen), `useEffect` (drives the autonomous state machine), `useMemo` (prevents unnecessary re-rendering of complex SVG nodes).

### `About.jsx`
- **Responsibilities:** Renders the interactive 3D Editorial Book that details the project features.
- **Dependencies:** `framer-motion` for complex 3D perspective transforms (`rotateY`, `box-shadow` transitions).

### `App.jsx`
- **Responsibilities:** Assembles the vertical flow of the landing page (Hero -> Ecosystem -> How It Works -> About -> Skill Championships).

---

## 5. State Management

The Ecosystem relies entirely on a localized React state machine to drive the autonomous learner.

1. **State Machine (`phase`)**: Toggles between `paused` (standing at a building) and `walking` (transit).
2. **Intervals/Timers**: Managed within a single `useEffect` block. When `phase` equals `paused`, a timer starts (3500ms). Once fired, `phase` switches to `walking`. After 3000ms of walking, the node index increments, and it switches back to `paused`.
3. **Memoization (`useMemo`)**: The SVG is extremely node-heavy. `sortedWorld` and `callouts` are heavily memoized using React's `useMemo` so that only the necessary nodes (the pawn and the active building) update when state changes.

---

## 6. Animation System

The motion philosophy dictates **slow acceleration, gentle deceleration, and restrained motion.**

- **Walking Animation:** The Learner Pawn uses native CSS `transition-all duration-[3000ms] ease-linear`. CSS transitions are highly performant and run entirely on the GPU, avoiding React render-cycle thrashing during movement.
- **Footpath Embedded Lighting:** The trail is drawn using SVG `stroke-dasharray` and `stroke-dashoffset`. A CSS keyframe (`path-glow-trail`) is applied to a clone of the path directly underneath the human, synced perfectly to the 3000ms walking duration.
- **Building Reactions:** Building states are driven by the boolean `isActive`. When true, classes like `anim-pulse-slow` or `anim-dome-rotate` are injected. All keyframes are defined within an inline `<style>` block to ensure immediate availability and prevent CSS scope leakage.
- **Timing Functions:** We strictly avoid elastic or bouncing eases. We rely heavily on `ease-in-out` and `cubic-bezier(0.25, 1, 0.5, 1)` (smooth, architectural decelerations).

---

## 7. Learner Journey

```mermaid
stateDiagram-v2
    [*] --> Start (University)
    
    state "Walking Phase" as Walking {
        Walking: duration 3000ms
        Walking: pawn moves linearly
        Walking: path illuminates
    }
    
    state "Appreciation Phase" as Paused {
        Paused: duration 3500ms
        Paused: building reaction triggers
        Paused: callout fades in
    }
    
    Start --> Walking
    Walking --> Paused : Reaches Building
    Paused --> Walking : Cooldown Ends
    
    Walking --> [*] : End of Journey Loop
```

---

## 8. Rendering Pipeline

Because isometric projection creates overlapping geometry, native SVG does not support true 3D depth buffers (Z-buffer).

**The Depth Sorting Pipeline:**
1. Every object (buildings, trees, plazas, pawn) is assigned an absolute coordinate `(x, y)`.
2. A `depth` value is calculated as `x + y` (the mathematical depth relative to the isometric camera).
3. The objects are pushed into a flat array.
4. `Array.prototype.sort((a, b) => a.depth - b.depth)` is executed.
5. The array is mapped into SVG `<g>` nodes.
6. The browser renders them back-to-front, creating perfect occlusion and depth without expensive WebGL calculations.

---

## 9. SVG System & Math

### The Isometric Projection Function
The entire world is built using a custom mathematical projection.

```javascript
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);
const SCALE = 45;

const iso = (x, y, z = 0) => ({
  x: (x - y) * COS30 * SCALE,
  y: ((x + y) * SIN30 - z) * SCALE
});
```
This function converts logical 3D coordinates `(x, y, z)` into 2D screen coordinates suitable for the SVG canvas, enabling us to easily construct complex primitives like `IsoBlock` and `IsoCylinder`.

---

## 10. Design Decisions

### SVG vs Canvas / WebGL
**Alternative:** Rendering the isometric world using Three.js / WebGL.
**Rejected because:** WebGL introduces massive bundle overhead, complex loading states, and reduced accessibility. It often feels "game-like."
**Chosen: Architectural SVG.**
**Reason:** SVG provides handcrafted, razor-sharp consistency at any resolution. It natively integrates with React state, offers excellent DOM-based performance for architectural models, and aligns perfectly with our premium, editorial visual identity.

### Isometric vs Real 3D
**Alternative:** A free-roaming 3D camera.
**Rejected because:** It removes curatorial control. Users often get lost or disoriented.
**Chosen: Fixed Isometric Projection.**
**Reason:** It creates a "god-view" masterplan that immediately communicates scale and connectivity. It feels like looking down at an expensive physical architectural model.

### Ambient Animation vs User Interaction
**Alternative:** Making the user click to move the pawn.
**Rejected because:** It demands too much cognitive load immediately upon loading the landing page.
**Chosen: Autonomous Ambient Movement.**
**Reason:** It immediately demonstrates the value and connectivity of the platform without requiring the user to do any work. It inspires curiosity.

---

## 11. Performance Optimization

This section is lightweight by design:
- **No Layout Thrashing:** We use `transform: translate()` instead of altering `x`/`y` DOM attributes directly for animations, preventing browser repaints.
- **Memoized Geometry:** Buildings that are not currently active do not re-render when the pawn moves.
- **Intersection Observers:** The entire autonomous `useEffect` loop halts when the component scrolls out of the viewport, saving CPU/GPU cycles.
- **Hardware Acceleration:** All CSS animations utilize GPU-accelerated properties (`opacity`, `transform`).

---

## 12. Future Improvements

### Minor
- Add subtle shadow transitions based on a faux "time of day" cycle.
- Add additional varied architectural assets (fountains, varied tree species).

### Medium
- Implement responsive touch-panning for mobile devices to explore the edges of the district.
- Allow the user to click a building to instantly reroute the autonomous learner to that destination.

### Major
- Build a visual JSON editor for non-technical team members to lay out new districts without touching the JSX coordinates.

---

## 13. File-by-File Documentation

### `src/components/Ecosystem.jsx`
- **Purpose:** The heart of the living world.
- **Important Variables:** 
  - `DISTRICT_NODES`: The JSON dictionary defining the spatial layout and metadata of the masterplan.
  - `CURATED_JOURNEYS`: Arrays of Node IDs defining the autonomous paths the learner takes.
- **Functions:**
  - `IsoBlock` / `IsoCylinder`: The core building blocks for rendering 3D shapes on the 2D canvas.
  - `RenderBuilding`: A massive `switch` statement that outputs specific geometric configurations based on building IDs.

### `src/components/About.jsx`
- **Purpose:** The 3D Book component.
- **Dependencies:** `framer-motion` for complex `rotateY` logic based on mouse movement.
- **Key Logic:** The book pages calculate an artificial 3D peel effect by mapping mouse proximity to a `rotateY` transform, casting dynamic gradient shadows to mimic curving paper.

---

## 14. Installation & Deployment

### Requirements
- Node.js >= 18.x
- npm or yarn

### Commands

**Development**
```bash
npm install
npm run dev
```

**Production Build**
```bash
npm run build
npm run preview
```

**Deployment Strategy**
This project is built using Vite and outputs static HTML/JS/CSS. It can be deployed effortlessly to Vercel, Netlify, or AWS S3/CloudFront.

---

## 15. License & Credits

Built for the Omni Skills Olympiad.
Isometric projection math and architectural visualization rendering pipeline developed by the OSO Engineering Team.
