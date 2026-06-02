# CLAUDE.md — Randy Dawn Tai Portfolio

Read this file at the start of every session. It covers the full project: stack, routes, components, design system, database, env vars, admin scope, and coding rules.

---

## Project Overview

Personal portfolio for **Randy Dawn Tai** (Sai Ywet Phone Aung), a product designer based in Bangkok. Built with Next.js App Router, deployed on Vercel. The site showcases four case studies and is being refreshed with a Postgres-backed admin panel, Vercel Blob image storage, and Framer Motion animations.

- **Live URL:** https://portfolio-three-ecru-fh5mj1kdyz.vercel.app
- **GitHub:** CoronaZoro/portfolio
- **Local dev:** `npm run dev` → localhost:3000

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript — **no TypeScript** |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` — NOT the old directives) |
| Database | Vercel Postgres (Neon) |
| Image storage | Vercel Blob |
| Animations | Framer Motion (installed, not yet wired up) |
| Analytics | @vercel/analytics (`<Analytics />` in layout.js) |
| Fonts | ClashGrotesk (local woff2, body), DM Serif Display (Google, display/headings), DM Sans (Google, UI), Courgette (Google, accent) |
| Deployment | Vercel (auto-deploy on push to main) |

---

## Branch Strategy

- **`main`** — live site. Every push here auto-deploys to Vercel.
- **`dev`** — active development branch. All new work goes here.
- **`huesta-wip`** — old Huesta feature branch (now merged).
- **`pinned-case-study`** — Pinned case study in progress. Not yet merged to main.

**Rule: never push unfinished work directly to main.**

---

## All Routes

### Public pages
| Route | File | Description |
|---|---|---|
| `/` | `app/page.js` | Homepage — Hero, Projects, About sections |
| `/projects/guardian` | `app/projects/guardian/page.js` | Guardian case study |
| `/projects/bouzer` | `app/projects/bouzer/page.js` | Bouzer case study |
| `/projects/attend` | `app/projects/attend/page.js` | Attend case study |
| `/projects/huesta` | `app/projects/huesta/page.js` | Huesta case study |
| `/projects/pinned` | `app/projects/pinned/page.js` | Pinned case study (branch: `pinned-case-study`, not yet merged to main) |

### Admin pages (planned — not yet built)
| Route | Description |
|---|---|
| `/admin` | Dashboard |
| `/admin/profile` | Edit profile info |
| `/admin/projects` | Edit project cards, reorder, show/hide |
| `/admin/images` | Upload images to Blob |

Admin routes are protected by `middleware.js` — password checked against `ADMIN_PASSWORD` env var. No Clerk. Cookie-based session, 8-hour expiry.

---

## Component Structure

```
app/
  components/
    Navbar.js         — Fixed top nav, hamburger on mobile, slide-in drawer
    Hero.js           — Homepage hero section with TypedText easter egg
    BorderGlow.js     — Cursor-proximity flowing gradient border on project cards
    BorderGlow.css    — Orphaned CSS file (not imported anywhere, safe to ignore)
    CustomCursor.js   — Custom cursor component (exists, not yet used globally)
    TypedText.js      — Keyboard-triggered typing easter egg in hero
  globals.css         — Tailwind v4 import, font-face declarations, animation keyframes, BorderGlow styles
  layout.js           — Root layout, fonts, <Analytics />
  page.js             — Homepage (imports Navbar, Hero, BorderGlow)
  projects/
    guardian/page.js
    bouzer/page.js
    attend/page.js
    huesta/page.js
    pinned/page.js    — Pinned case study (on pinned-case-study branch)
```

---

## Design System

**DO NOT change any of these.**

| Token | Value |
|---|---|
| Background | `#0e0c0a` |
| White text | `#ffffff` |
| Red accent | `#e63323` — used only on the word *fun.* in hero |
| Body font | ClashGrotesk (loaded via @font-face from `/public/fonts/`) |
| Display font | DM Serif Display — CSS var `--font-serif` |
| UI font | DM Sans — CSS var `--font-sans` |
| Accent font | Courgette — CSS var `--font-courgette` |
| Border subtle | `rgba(255,255,255,0.1)` |
| Border mid | `rgba(255,255,255,0.12)` |

**Huesta case study** uses its own dark palette (`#0A0A0A`, `#111111`, `#222222`) and accent `#c8a876` — this is intentional, only for that page.

**Pinned case study** uses its own dark palette (`#161616` bg, `#242424` cards) with `#2DCC70` green accent and `#FFB800` amber for unconfirmed pin state — intentional, only for that page.

**Animations (CSS, not Framer yet):**
- `.anim-fade-up` — fadeUp 0.7s, used on sections with `animationDelay`
- `.anim-fade-down` — fadeDown 0.6s, used on Navbar
- `.anim-fade-in` — fadeIn 0.8s

**BorderGlow effect:** tracks cursor angle via JS, animates a conic-gradient border. Controlled by `--cursor-angle` and `--glow-border-opacity` CSS variables. Only active on project cards (homepage).

---

## Database Schema

Connected via `@vercel/postgres`. Uses Neon (Vercel's managed Postgres).

### Table: `profile`
```sql
id               SERIAL PRIMARY KEY
name             VARCHAR(100)
tagline          TEXT
about_text       TEXT
email            VARCHAR(100)
linkedin_url     TEXT
github_url       TEXT
figma_url        TEXT
resume_url       TEXT
available_from   VARCHAR(100)
updated_at       TIMESTAMP DEFAULT NOW()
```
Seeded with Randy's real data. Always exactly 1 row.

### Table: `projects`
```sql
id                SERIAL PRIMARY KEY
title             VARCHAR(100)
short_description TEXT
tags              TEXT[]
thumbnail_url     TEXT          -- Vercel Blob URL (null until admin sets it)
case_study_path   VARCHAR(100)  -- e.g. /projects/guardian
hackathon_winner  BOOLEAN DEFAULT FALSE
display_order     INTEGER
visible           BOOLEAN DEFAULT TRUE
updated_at        TIMESTAMP DEFAULT NOW()
```
Seeded with 4 rows: Guardian, Huesta, Bouzer, Attend. (Pinned not yet in DB — add when merging to main.)

---

## Vercel Blob

All public images are uploaded to Blob under the `portfolio/` prefix.
Base URL: `https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/`

All 25 images migrated. Local `/public` files still exist and work — the site currently uses them. The blob URLs are ready for when the admin panel wires up dynamic `thumbnail_url` from the database.

---

## Environment Variables

All available in `.env.local` (pulled via `vercel env pull`).

```
# Vercel Postgres (Neon)
POSTGRES_URL
POSTGRES_PRISMA_URL
POSTGRES_URL_NON_POOLING
POSTGRES_URL_NO_SSL
POSTGRES_USER
POSTGRES_HOST
POSTGRES_PASSWORD
POSTGRES_DATABASE
DATABASE_URL
DATABASE_URL_UNPOOLED

# Vercel Blob
BLOB_READ_WRITE_TOKEN

# Admin password middleware
ADMIN_PASSWORD          ← must be set manually in Vercel dashboard

# Huesta AI tool (future)
ANTHROPIC_API_KEY
UNSPLASH_ACCESS_KEY
NEXT_PUBLIC_GOOGLE_FONTS_API_KEY
```

**ADMIN_PASSWORD** is not set yet — add it in Vercel Dashboard → Settings → Environment Variables before building the admin panel.

---

## Admin Panel Scope

Admin is for **content editing only** — not a full CMS.

**Can edit via admin:**
- Profile tagline, about text, contact links, availability status
- Project card title, description, visibility, display order
- Upload new thumbnail images to Blob

**Cannot do via admin:**
- Add new case studies (those are manually coded Next.js pages)
- Edit case study page content (all hardcoded)
- Change design: fonts, colors, layout, animations

---

## Scripts

```
scripts/migrate.js         — Creates Postgres tables + seeds initial data
                             Run: node scripts/migrate.js
scripts/migrate-images.js  — Uploads all /public images to Vercel Blob
                             Run: node scripts/migrate-images.js
```

Both scripts use `dotenv` to load `.env.local`. Run from the project root.

---

## Middleware

`middleware.js` in the project root protects all `/admin` routes.

- **GET `/admin/*`** — checks `admin_auth` cookie against `ADMIN_PASSWORD`
- **POST `/admin/*`** — validates submitted password, sets 8-hour cookie on success
- **Login UI** — minimal dark form rendered inline (no external dependencies)
- If `ADMIN_PASSWORD` env var is not set, returns `503`

---

## Completed Work (recent)

- **Admin panel** — `/admin`, `/admin/profile`, `/admin/projects`, `/admin/images` — built and live on main
- **Full-page contact section** — `app/components/ContactSection.js` — live on main; profile data (email, socials, resume, availability) fetched server-side from DB via `page.js`
- **Huesta mobile fix** — TryHuesta section shows input-only on mobile, full-width output after generation with ← Back button
- **Huesta download PNG** — html2canvas download button added to kit output
- **Profile fields wired** — tagline → Hero, available_from → AboutSection + ContactSection, all contact links → ContactSection; all fetched via `Promise.all` in `page.js`
- **Admin API auth** — `lib/db.js` centralises `sql` and `requireAdmin()` helper used by all `/api/admin/*` routes
- **Pinned case study** — `app/projects/pinned/page.js` on branch `pinned-case-study` (not yet merged). Sections: Hero, Overview/Problem, Solution, Wireframes, Design System, Screen Walkthrough (6 screens), Feature Spotlight, Confirm Still Here (Core Mechanic), Reflection. All images live on Vercel Blob.

## Upcoming Work (in order)

1. **Merge Pinned** — PR `pinned-case-study → main`, add Pinned row to `projects` DB table
2. **Framer Motion** — page transitions, scroll reveal, project card hover, hero stagger, nav scroll fade
3. **Custom X cursor** — replaces default cursor, follows mouse via `useMotionValue`

---

## Coding Rules

1. **JavaScript only** — no TypeScript, no `.ts`/`.tsx` files
2. **App Router only** — no `pages/` directory
3. **Tailwind v4** — use `@import "tailwindcss"` in globals.css, NOT `@tailwind base/components/utilities`
4. **`'use client'`** — required on any component that uses hooks, event handlers, or browser APIs
5. **No UI changes without instruction** — don't touch existing pages, components, or styles unless asked
6. **Dev branch for all work** — never commit directly to `main` mid-feature
7. **Don't add case study pages without instruction** — Randy controls when and what goes in
8. **No Clerk** — admin auth is simple password middleware, not Clerk
9. **Keep `.env.local` out of git** — already in `.gitignore`, never commit it
