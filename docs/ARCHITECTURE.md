# 2x Portfolio Architecture & Workflow Guide

## Overview
This project is a high-performance, mobile-first portfolio application built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Framer Motion**.

- **Live URL**: [https://turashahsan.vercel.app](https://turashahsan.vercel.app)
- **Deployment Platform**: Vercel (`turashahsan.vercel.app`)

---

## Directory Structure

```
d:/2x ✦ Portfolio/
├── .figma/                  # Figma Make sync metadata & configuration
├── docs/                    # Project documentation & backend roadmap
│   └── ARCHITECTURE.md
├── public/                  # Static assets served directly
├── src/
│   ├── components/          # Standalone UI components (DotGrid, VideoCard, etc.)
│   ├── config/              # App configuration & site metadata
│   ├── imports/             # Figma Make auto-generated UI components & assets
│   ├── pages/               # Page views (Home, Dashboard)
│   ├── services/            # (Future) API clients, Turso database connection
│   ├── utils/               # Helper utilities & storage handlers
│   ├── App.tsx              # Root React application shell
│   ├── index.css            # Tailwind CSS v4 entrypoint
│   └── main.tsx             # React DOM entrypoint
├── package.json             # Project dependencies & scripts
├── vercel.json              # Vercel deployment configuration
└── vite.config.ts           # Vite build & plugin settings
```

---

## Future Backend & Dashboard Roadmap

When ready to connect backend functionality:
1. **Database Client (`src/services/db.ts`)**: Integrate **Turso** (SQLite at the Edge) or lightweight API routes.
2. **Dashboard Controls**: Expand `src/pages/Dashboard.tsx` for real-time video management, tweet backlink editing, and site settings.
3. **Storage Strategy**: Local media pickers with browser storage sync, fallback to cloud storage buckets (Cloudflare R2 / Supabase Storage).
