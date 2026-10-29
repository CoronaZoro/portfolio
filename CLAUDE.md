# CLAUDE.md — Randy Dawn Tai Portfolio

Personal portfolio for **Randy Dawn Tai** (Sai Ywet Phone Aung), product designer in Bangkok. Six hand-coded case studies, a homepage driven by Postgres, and a small password-protected admin for content and media.

- Live: https://portfolio-three-ecru-fh5mj1kdyz.vercel.app · GitHub: CoronaZoro/portfolio · `npm run dev` → localhost:3000

## Stack

Next.js 16 App Router · **JavaScript only** · Tailwind CSS v4 · Vercel Postgres (Neon) via `@vercel/postgres` · Vercel Blob · Framer Motion + Lenis · `@vercel/analytics` · deployed on Vercel.

## Branches

`main` is live — every push auto-deploys. All work goes on `dev`, ships to `main` through a PR. Never push unfinished work to `main`.

## Routes

**Public:** `/` (`app/page.js`) and `/projects/{guardian,bouzer,attend,huesta,pinned,devdna}` (`app/projects/<slug>/page.js`; Huesta also has `KitCard.js`).

**Admin** (`app/admin/`): `/admin` dashboard, `/admin/profile`, `/admin/projects` (edit, reorder, show/hide cards), `/admin/images` (labelled "Media": drag/drop/paste uploads straight to Blob, up to 500 MB, search/filter, copy URL or `<img>`/`<video>` tag).

**API:** `/api/profile` (public GET, contact links for `FooterIcons`), `/api/generate` (public POST, Huesta kit generator, rate-limited per IP), `/api/admin/*` (admin writes; each starts with `await requireAdmin(request)`; `images/upload` only issues client tokens — files go browser → Blob via `upload()` from `@vercel/blob/client`).

## Auth

`middleware.js` guards `/admin/*`. GET checks the `admin_auth` cookie (`<expiry>.<HMAC>` signed with `ADMIN_PASSWORD`, `lib/auth.js` — never the password itself). POST is the login form: constant-time check, 10 attempts / 15 min per IP, 8-hour cookie. Every POST to `/admin/*` is treated as a login, so **don't use Server Actions on admin pages** — use `/api/admin/*`. Changing `ADMIN_PASSWORD` logs everyone out. No Clerk.

## Code map

- `app/components/` — `Navbar` (mobile drawer is `inert` when closed), `Hero` + `TypedText`, `BentoGrid` (whole card links to the case study; per-slug accent + fallback in `CONFIG`), `AboutSection`, `ContactSection` + `DinoGame`, `FooterIcons`, `ScreenGallery` (zoomable lightbox, used by Bouzer + Attend), `PageTransition`, `SmoothScroll` (exposes `window.__lenis`)
- `lib/` — `db.js` (`sql` + `requireAdmin`; import as `@/lib/db`), `auth.js`, `rateLimit.js` (in-memory, per instance), `claude.js`, `images.js` (Unsplash), `colors.js`, `fonts.js`
- `scripts/migrate.js` — creates tables and inserts any project whose `case_study_path` is missing; add new case studies to its list and re-run

## Design system — `app/globals.css`

Tailwind v4 `@theme` tokens. Use them instead of raw values.

- **Colours:** `bg-ground` `#0e0c0a`, `bg-surface` `#171512`; text `text-ink` (headings), `text-soft` (paragraphs), `text-muted` (labels/captions). Solid colours, not translucent white. Red `#e63323` only on "fun." in the hero.
- **Type (4px grid):** `text-display` (40/56/64), `text-head` (28/32/40), `text-lead` (20/24), `text-body` (16), `text-statement` (28/48/64, pull-quotes only). Steps at 768px and 1024px. Nothing readable below 16px.
- **Fonts:** `font-heading` = ClashGrotesk for titles and section headings; DM Sans (`--font-sans`) for everything else. DM Serif Display (`--font-serif`) is Bouzer's and Huesta's heading face. Courgette (`--font-courgette`) only for "fun.". Monospace only for real code (DevDNA terminal).
- **No:** eyebrow labels above headings, tiny uppercase tracked labels, 01/02/03 numbering, 1px divider lines. Separate with spacing or a `surface` tone step.
- **Per-project palettes (intentional):** Bouzer cream `#e8e2d5` + gold; Attend navy `#000211` / blue-grey `#d4dfe9` + blue; Huesta `#0A0A0A`/`#111111` + serif wordmark and rainbow dot; Pinned `#161616`/`#242424` + green `#2DCC70` / amber `#FFB800`; DevDNA `#0d1117`/`#161b22` + purple `#7c6af7`. Accent text uses a lighter (on dark) or darker (on light) shade so it passes 4.5:1 — see the constants at the top of each page.

## Database

`profile` — one row: name, tagline, about_text, email, linkedin_url, github_url, figma_url, resume_url, available_from, updated_at.

`projects` — title, short_description, tags[], thumbnail_url, case_study_path, hackathon_winner, display_order, visible, updated_at. Rows: Guardian, Bouzer, Huesta, Attend (hidden), Pinned, DevDNA. The homepage shows visible rows by `display_order`; slug = last segment of `case_study_path`; rows alternate full-width / two-up.

## Blob

Uploads live under `portfolio/` at `https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/`. Pinned and DevDNA load from Blob; older case studies still use `/public`.

## Env (`.env.local`, via `vercel env pull`)

Postgres `POSTGRES_URL` (+ Neon variants), `BLOB_READ_WRITE_TOKEN`, `ADMIN_PASSWORD`, `ANTHROPIC_API_KEY`, `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` (read server-side only), `NEXT_PUBLIC_GOOGLE_FONTS_API_KEY`. Never commit `.env.local`.

## Dev notes

- If edits don't show up in `npm run dev`, stop it, `rm -rf .next`, and restart — the Turbopack cache goes stale.
- Lint has pre-existing `react/no-unescaped-entities` errors in Pinned's copy; the build still passes.

## Rules

1. JavaScript only, App Router only, Tailwind v4 (`@import "tailwindcss"`).
2. `'use client'` on anything with hooks, handlers or browser APIs.
3. No UI changes without instruction; no new case study pages without instruction.
4. Admin is content editing only — case study pages stay hand-coded.

## Upcoming

- DevDNA: swap the remaining placeholder and the BentoGrid text banner for real images.
- Custom X cursor following the mouse via `useMotionValue` (not built yet).
