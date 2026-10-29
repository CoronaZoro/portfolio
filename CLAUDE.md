# CLAUDE.md — Randy Dawn Tai Portfolio

Read this file at the start of every session. It covers the full project: stack, routes, components, design system, database, env vars, admin scope, and coding rules.

---

## Project Overview

Personal portfolio for **Randy Dawn Tai** (Sai Ywet Phone Aung), a product designer based in Bangkok. Built with Next.js App Router, deployed on Vercel. The site showcases six case studies, with a Postgres-backed admin panel, Vercel Blob image storage, and Framer Motion animations.

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
| Animations | Framer Motion (page transition, hero stagger, card reveal/hover, nav scroll fade) + Lenis smooth scroll |
| Analytics | @vercel/analytics (`<Analytics />` in layout.js) |
| Fonts | ClashGrotesk (local woff2, body), DM Serif Display (Google, display/headings), DM Sans (Google, UI), Courgette (Google, accent) |
| Deployment | Vercel (auto-deploy on push to main) |

---

## Branch Strategy

- **`main`** — live site. Every push here auto-deploys to Vercel.
- **`dev`** — active development branch. All new work goes here.

Feature branches (`huesta-wip`, `pinned-case-study`, `devdna-case-study`) are merged into main and deleted locally.

**Rule: never push unfinished work directly to main.**

---

## All Routes

### Public pages
| Route | File | Description |
|---|---|---|
| `/` | `app/page.js` | Homepage — Hero, Selected Works (BentoGrid), About, Contact |
| `/projects/guardian` | `app/projects/guardian/page.js` | Guardian case study |
| `/projects/bouzer` | `app/projects/bouzer/page.js` | Bouzer case study |
| `/projects/attend` | `app/projects/attend/page.js` | Attend case study |
| `/projects/huesta` | `app/projects/huesta/page.js` | Huesta case study |
| `/projects/pinned` | `app/projects/pinned/page.js` | Pinned case study |
| `/projects/devdna` | `app/projects/devdna/page.js` | DevDNA case study |

### Admin pages
| Route | Description |
|---|---|
| `/admin` | Dashboard |
| `/admin/profile` | Edit profile info |
| `/admin/projects` | Edit project cards, reorder, show/hide |
| `/admin/images` | Upload images to Blob |

Admin routes are protected by `middleware.js` — password checked against `ADMIN_PASSWORD` env var. No Clerk. Signed cookie session, 8-hour expiry (see Middleware below).

### API routes
| Route | Description |
|---|---|
| `/api/profile` | Public GET — contact links for `FooterIcons` on case study pages |
| `/api/generate` | Public POST — Huesta kit generator (Claude + Unsplash). Rate-limited per IP |
| `/api/admin/*` | Admin-only writes (profile, projects save/visibility/reorder, images upload/delete). Each calls `await requireAdmin(request)` |

---

## Component Structure

```
app/
  components/
    Navbar.js         — Fixed top nav, scroll-fade background, hamburger + slide-in drawer on mobile
    Hero.js           — Homepage hero, Framer stagger, TypedText easter egg
    TypedText.js      — Typing effect on the word "fun." in hero
    BentoGrid.js      — Selected Works grid, laid out by display_order; per-project CONFIG (accent, fallback image)
    AboutSection.js   — About section, shows available_from
    ContactSection.js — Full-page contact section (profile data from DB) + DinoGame
    DinoGame.js       — Easter-egg mini game in contact section
    FooterIcons.js    — Contact icon row on case study pages (fetches /api/profile client-side)
    PageTransition.js — Framer fade-in wrapper, used in layout.js
    SmoothScroll.js   — Lenis smooth scroll, exposes window.__lenis
    CustomCursor.js   — X cursor (not used yet — see Upcoming Work)
  admin/              — Admin pages + client components (NavLinks, DashboardCards, ProfileForm, ProjectsList, ImageUpload)
  api/                — Route handlers (see API routes above)
  globals.css         — Tailwind v4 import, ClashGrotesk @font-face, keyframes, .anim-fade-up, typing cursor
  layout.js           — Root layout, fonts, SmoothScroll, PageTransition, <Analytics />
  page.js             — Homepage; fetches projects + profile from DB server-side
  projects/
    guardian/ bouzer/ attend/ huesta/ pinned/ devdna/  — page.js each (huesta also has KitCard.js)
lib/
  db.js               — sql client + requireAdmin()
  auth.js             — Signed session token + constant-time password check
  rateLimit.js        — In-memory per-IP rate limiter (login + /api/generate)
  claude.js           — Huesta prompt + Anthropic call
  images.js           — Unsplash search
  colors.js, fonts.js — Huesta palette + Google Fonts helpers
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

**DevDNA case study** uses `#0d1117` bg, `#161b22` card, `#21262d` border, `#7c6af7` purple accent, JetBrains Mono for terminals — intentional, only for that page.

**Animations:**
- Framer Motion — homepage, Navbar, BentoGrid cards (reveal + hover scale/accent glow), page transition
- `.anim-fade-up` (CSS) — fadeUp 0.7s with `animationDelay`, used on guardian/pinned/devdna case studies
- `fadeIn` keyframe — used inline by the attend/bouzer lightbox

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
6 rows: Guardian, Bouzer, Huesta, Attend (hidden), Pinned, DevDNA. `scripts/migrate.js` inserts any project whose `case_study_path` is missing — add new case studies to its list and re-run it.

**Homepage data flow:** `app/page.js` loads visible projects ordered by `display_order`, derives `slug` from the last segment of `case_study_path`, and BentoGrid lays them out in that order — rows alternate full width / two-up, and a lone card in a two-up row goes full width. Admin reorder + visibility control the homepage directly. Per-project accent colour and fallback image live in BentoGrid's `CONFIG`, keyed by slug.

---

## Vercel Blob

All public images are uploaded to Blob under the `portfolio/` prefix.
Base URL: `https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/`

Pinned and DevDNA pages load images from Blob. Older case studies still use local `/public` files. `thumbnail_url` from the DB overrides the BentoGrid fallback image when set.

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

# Huesta AI tool (/api/generate)
ANTHROPIC_API_KEY
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY   ← read server-side only; UNSPLASH_ACCESS_KEY takes priority if set
NEXT_PUBLIC_GOOGLE_FONTS_API_KEY
```

Changing **ADMIN_PASSWORD** logs out all admin sessions (it signs the session cookie).

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

- **GET `/admin/*`** — verifies the `admin_auth` cookie: `<expiry>.<HMAC>` signed with `ADMIN_PASSWORD` (`lib/auth.js`). The cookie never holds the password
- **POST `/admin/*`** — constant-time password check, rate-limited to 10 attempts / 15 min per IP, sets 8-hour cookie and 303-redirects on success
- Because every POST to `/admin/*` is treated as a login, don't use Server Actions on admin pages — use the `/api/admin/*` routes
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
- **Security hardening** — signed admin sessions, login + `/api/generate` rate limits, upload type/size validation, delete restricted to `portfolio/` Blob URLs
- **Dead code cleanup** — removed BorderGlow, ScrollReveal, unused server actions, Next.js boilerplate SVGs, unused images and CSS
- **Pinned case study** — `app/projects/pinned/page.js`, merged to main. Sections: Hero, Overview/Problem, Solution, Wireframes, Design System, Screen Walkthrough (6 screens), Feature Spotlight, Confirm Still Here (Core Mechanic), Reflection. All images live on Vercel Blob.
- **DevDNA case study** — `app/projects/devdna/page.js`, merged to main. Sections: Hero, Overview, Solution, Technical, Features (4 rows), Reflection. One `ImgPlaceholder` slot left; BentoGrid card uses a text fallback banner.

## Upcoming Work (in order)

1. **DevDNA assets** — swap the remaining placeholder and BentoGrid banner for real images
2. **Custom X cursor** — wire up `CustomCursor.js` via `useMotionValue`

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
