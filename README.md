# 🌲 California Trail Log — 2026 Hiking Tracker

A beautiful, modern personal hiking tracker with a "California Coastal & Redwoods" aesthetic. Built with React, Tailwind CSS, and Leaflet.js.

## Features

- **Dashboard**: View your 2026 season stats including total miles, elevation gain, time on trail, and difficulty breakdown
- **Interactive Map**: Beautiful outdoor-themed map with color-coded pins for all your logged hikes
- **Trail Journal**: Scrollable journal entries with full hike details and personal notes
- **Add Hike Modal**: Easy form to log new adventures with location coordinates

## Design Aesthetic

This app uses a "Nature Distilled" design language with:
- **Deep Forest Green** (`#2D3A30`) — Headers and primary buttons
- **Pacific Slate** (`#4A5D66`) — Secondary elements
- **Foggy White** (`#F2F4F3`) — Backgrounds
- **Redwood Bark** (`#7A443A`) — Accents for strenuous hikes

Glassmorphism effects create a misty, ethereal feel that matches the vibe of California's redwood forests.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **Tailwind CSS** — Utility-first styling
- **Leaflet.js / React-Leaflet** — Interactive mapping
- **Lucide React** — Beautiful icons

## Usage Tips

1. **Viewing Hikes**: Click on map pins or journal cards to highlight corresponding entries
2. **Adding Hikes**: Click "Add Hike" to log a new trail
3. **Coordinates**: Get trailhead coordinates by right-clicking on Google Maps
4. **Persistence**: Your hikes are saved to localStorage automatically

## Sample Data

The app comes pre-loaded with 8 sample California hikes including:
- Dipsea Trail to Stinson Beach
- Point Lobos Coastal Loop
- Ewoldsen Trail (Big Sur)
- Skyline to the Sea Trail
- Bodega Head Loop
- Redwood Creek Trail to Tall Trees Grove
- Fern Canyon Loop
- Matt Davis Trail to Pantoll

---

*Happy Trails — Your 2026 Adventure Awaits* 🌲
