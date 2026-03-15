# Ellalan Martial Arts Academy Website

This project is intended to run with Bun (see `bun.lockb`).

A marketing site for Ellalan Martial Arts Academy (EMA Warriors). Built as a Vite + React SPA with animated sections, event listings, gallery blocks, and an enquiry form.

## Overview

The app is a single-page React site with client-side routing. Key sections and features:

- Home page with hero, instructors, classes, and CTA sections.
- Events page that pulls event data from a Google Apps Script endpoint.
- Gallery page that pulls grouped galleries from a Google Apps Script endpoint and supports Google Drive previews, with local fallbacks.
- Enquiry page with a validated form and contact details.
- Human-readable sitemap page.

## Routes

- `/` Home
- `/events` Events & tournaments
- `/gallery` Gallery
- `/enquiry` Enquiry form
- `/sitemap` HTML sitemap

Admin pages exist in `src/pages/AdminLogin.tsx` and `src/pages/AdminDashboard.tsx` but are not currently routed (see `src/App.tsx`).

## Data Sources

- Events: Google Apps Script endpoint configured in `src/pages/Events.tsx`.
- Galleries: Google Apps Script endpoint configured in `src/pages/Gallery.tsx`.

Both endpoints are called client-side and should return JSON in the expected shape. If the gallery endpoint fails or returns no active data, the page falls back to local default images.

## Tech Stack

- Vite + React + TypeScript
- React Router
- Tailwind CSS + shadcn/ui
- Framer Motion
- React Hook Form + Zod
- TanStack Query
- Vitest

## Getting Started

This repo includes `bun.lockb`, so the primary workflow is Bun. You can still use npm if you prefer, but Bun is the expected default.

```sh
bun install
bun run dev
```

Alternative with npm:

```sh
npm install
npm run dev
```

Vite 5 requires Node.js 18+.

## Scripts

- `bun run dev` Start the Vite dev server
- `bun run build` Production build to `dist/`
- `bun run build:dev` Development-mode build
- `bun run preview` Preview the production build
- `bun run lint` Run ESLint
- `bun run test` Run Vitest in CI mode
- `bun run test:watch` Run Vitest in watch mode

## Deployment

This is a static SPA. Build output is emitted to `dist/`. The repository includes `vercel.json` to rewrite all routes to `index.html` for client-side routing.

If you deploy under a custom domain, update `public/sitemap.xml` (and `public/robots.txt`) to match the canonical URL.

## SEO

- `public/robots.txt` allows all crawlers and points to the sitemap.
- `public/sitemap.xml` includes the main routes for indexing.
