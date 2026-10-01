# Harsh Shah — AI & Agentic Systems Engineer Portfolio

A React.js portfolio application engineered from the Stitch design system ([Stitch Project: 760987653855522301](https://stitch.withgoogle.com/projects/760987653855522301)). Built with **Vanilla CSS**, **Three.js**, and an extensible architecture prepared for backend connectivity and seamless cloud deployment.

---

## 🎨 Design System & Tokens (Agentic Editorial)

The visual ethos blends **Warm Editorial Minimalism** with **Instrumental Brutalism**:

### 1. Color Palette
- **Paper Canvas Substrates:**
  - `surface-paper` / `surface`: `#faf9f6` / `#f8f7f4` (low-glare warm tactile substrate)
  - `surface-card`: `#ffffff` (crisp module surface)
  - `surface-subtle`: `#f1efea` (recessed metrics and input boxes)
- **Core Inks:**
  - `text-ink`: `#121316` (deep carbon charcoal)
  - `text-muted`: `#6c707a`
  - `border-hairline`: `#e2dfd7` (1px rules establishing boundary lines)
- **Runtime Telemetry & Mint Accent:**
  - `accent-mint`: `#1d9e75` (active execution state, telemetry highlights)
  - `terminal-accent` / `accent-mint-bright`: `#10b981` / `#22c55e`
  - `accent-mint-soft`: `#e6f5f0`
  - `accent-mint-glow`: `rgba(29, 158, 117, 0.18)`
- **Dark Focal Containment (HS-01 Console & Architecture):**
  - `surface-dark`: `#0e1013`
  - `surface-dark-elevated`: `#16191e`
  - `border-hairline-dark`: `#23272f`
  - `terminal-bg`: `#08090a`

### 2. Typography
- **Headlines & Statements:** `Space Grotesk` (700, 600, 500) with tight `-0.025em` tracking.
- **Narrative & Prose:** `Inter` (300, 400, 500, 600) for readable case studies and essays.
- **System Labels, Telemetry & Code:** `JetBrains Mono` for tabular readouts, chips, and CLI logs.

---

## 🚀 Key Features & Components

1. **Header with Segmented Mode Switcher (`[WEB | TERMINAL]`):**
   - Seamlessly toggle between the editorial web layout and the interactive CLI workstation shell.
   - Monogram SVG brandmark and smooth scroll navigation anchors.
2. **Hero Section with 3D Agentic DAG Experience (`ThreeCanvas`):**
   - High-performance Three.js multi-agent Directed Acyclic Graph (DAG) with an inner breathing reasoning core (Octahedron), outer MCP cage (Dodecahedron), orbital vector rings, 9 agent nodes (Planner, MCP Tool Dispatcher, Reflection Critic, Memory Vector Router), 28 live tool-call data packets traversing edges, and 280 vector space latent particles with mouse parallax damping.
   - Live telemetry status ribbon (`LangGraph Core`, `MCP Standard`, `A2A Msg Bus`, `Latency ~8.2s`).
3. **HS-01 Cognitive Runtime Console (`CopilotDock`):**
   - Interactive prompt bar with verified retrieval synthesis across production repositories.
   - Quick prompt chips: `"Explain RMD workflow"`, `"Deterministic LLM benchmarks"`, `"Multi-agent swarm architecture"`, `"Contact Harsh"`.
4. **Systems & Production Case Studies (`Systems`):**
   - **Flagship 01: Agentic Retirement Workflows (RMD / SDA)** with comparative telemetry strip (`5 → 2-3 calls`, `18s → 8.2s latency`, `100% deterministic`, `Model Context Protocol`) and visual stateful DAG step diagram.
   - **System 02: Multi-Agent Research Synthesizer** (4-agent A2A swarm topology, 4.8x compression).
   - **System 03: Deterministic Evaluation & Guardrail Harness** (1,200 test cases, 99.4% pass).
   - Interactive modal (`SystemDetailModal`) for architectural inspection.
5. **The 6-Stage Engineering Pipeline (`Pipeline`):**
   - `01 // CONCEPT` → `02 // GRAPH DESIGN` → `03 // ORCHESTRATE` → `04 // MCP CONNECT` → `05 // EVALUATE` → `06 // SHIP`.
   - Clickable inspector revealing execution invariants and testing criteria for each stage.
6. **Experience & Track Record (`Experience`):**
   - Chronological engineering milestone timeline (TIAA, Distributed Systems).
7. **Philosophy & Tech Stack Matrix (`Philosophy`):**
   - Technical essay on determinism over stochastic hype.
   - Interactive categorized tech matrix (Orchestration, Protocols, Languages, Vector & Storage, Evals).
8. **Contact Section (`Contact`):**
   - Functional transmission inquiry form with encryption animation and status alert feedback.
9. **Full Interactive Terminal Workstation (`TerminalView`):**
   - Real-time streaming log daemon emitting simulated MCP JSON-RPC, LangGraph checkpoints, and eval events.
   - CLI command interpreter supporting `help`, `projects`, `telemetry`, `mcp`, `experience`, `skills`, `benchmarks`, `contact`, `cat about.md`, `cat contact.json`, `ask <query>`, and `clear`.
   - Command history navigation (`Up` / `Down` arrows), Tab auto-completion, font sizing, and quick execution chips.

---

## 🛠️ Project Structure

```
Portfolio/
├── public/
│   ├── favicon.svg             # HS monogram favicon
│   └── hs-monogram.svg         # SVG brandmark
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Top navigation with mode toggle
│   │   ├── Hero.jsx            # Hero display & HUD metrics
│   │   ├── ThreeCanvas.jsx     # 3D Three.js Multi-Agent Swarm DAG
│   │   ├── CopilotDock.jsx     # HS-01 Cognitive Copilot interface
│   │   ├── Systems.jsx         # Case studies & Flagship TIAA system
│   │   ├── SystemDetailModal.jsx # Deep architectural inspection modal
│   │   ├── Pipeline.jsx        # 6-Stage engineering pipeline
│   │   ├── Experience.jsx      # Chronological experience timeline
│   │   ├── Philosophy.jsx      # Editorial essay & skills matrix
│   │   ├── Contact.jsx         # Contact card & inquiry form
│   │   ├── TerminalView.jsx    # Full CLI terminal mode interface
│   │   └── Footer.jsx          # Geolocation coordinates & telemetry
│   ├── services/
│   │   ├── api.js              # Backend client with local simulation fallback
│   │   └── knowledgeBase.js    # Grounded portfolio data & terminal commands
│   ├── App.jsx                 # Mode orchestrator & global keyboard bindings
│   ├── index.css               # Complete Vanilla CSS design system
│   └── main.jsx                # Application root
├── index.html                  # Fonts & SEO meta tags
├── vercel.json                 # Vercel SPA deployment configuration
├── netlify.toml                # Netlify SPA deployment configuration
├── .env.example                # Environment variables template
└── package.json
```

---

## 🔌 Connecting a Backend (FastAPI / Express / Next.js)

The application includes an API client in [src/services/api.js](file:///Users/harshshah/Projects/Portfolio/src/services/api.js) that operates client-side out-of-the-box and automatically proxies to your backend when `VITE_API_URL` is set.

### 1. Set environment variable
Create `.env` from `.env.example`:
```bash
VITE_API_URL=http://localhost:8000
```

### 2. Supported Backend Endpoints
- `POST /api/copilot`:
  - Request: `{"query": "Explain RMD workflow"}`
  - Response: `{"response": "In the TIAA retirement workflow..."}`
- `POST /api/contact`:
  - Request: `{"name": "...", "email": "...", "subject": "...", "message": "..."}`
  - Response: `{"success": true, "message": "..."}`
- `POST /api/terminal`:
  - Request: `{"command": "projects"}`
  - Response: `{"type": "text", "output": "..."}`

---

## 🚢 Deployment Guide

### Option 1: Vercel (Recommended)
1. Push this repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. The included `vercel.json` ensures client-side routing works without 404s.
4. Set `VITE_API_URL` in Vercel Environment Variables when connecting your backend.

### Option 2: Netlify
1. Connect repository to [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `netlify.toml` handles routing automatically.

### Option 3: Docker
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
