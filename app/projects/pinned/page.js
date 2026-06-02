import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG       = '#161616'
const CARD     = '#242424'
const GREEN    = '#2DCC70'
const AMBER    = '#FFB800'
const GREY_DOT = '#555555'

export default function PinnedPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: BG, color: '#ffffff', fontFamily: 'var(--font-sans)' }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 pt-20 pb-16 max-w-7xl mx-auto">

          {/* Category label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-10"
            style={{ color: GREEN, animationDelay: '0.15s' }}
          >
            UI/UX Design / Mobile App
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — title + one-liner */}
            <div className="anim-fade-up" style={{ animationDelay: '0.25s' }}>
              <h1
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                Pinned.
              </h1>
              <p
                className="text-base leading-[1.7]"
                style={{ color: 'rgba(255,255,255,0.62)', maxWidth: 380 }}
              >
                A community-driven street food discovery map for Bangkok. Built for the people who eat, not the people who own.
              </p>
            </div>

            {/* Right — metadata grid */}
            <div
              className="anim-fade-up grid grid-cols-2 gap-0"
              style={{
                animationDelay: '0.35s',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {[
                { label: 'MY ROLE', value: 'Product Designer / UX' },
                { label: 'TYPE',    value: 'Mobile App (Concept)'   },
                { label: 'STACK',   value: 'Figma · Mapbox · DM Sans' },
                { label: 'STATUS',  value: 'Case Study'              },
              ].map(({ label, value }, i) => (
                <div
                  key={i}
                  className="p-5"
                  style={{
                    borderRight:  i % 2 === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    borderBottom: i < 2       ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    background: CARD,
                  }}
                >
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-2"
                    style={{ color: 'rgba(255,255,255,0.45)' }}
                  >
                    {label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: GREEN }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── HERO BANNER IMAGE PLACEHOLDER ─────────────────────────────────────
            Replace this div with a full-width <img> tag when the banner is ready.
            Suggested: <img src="/pinned-banner.png" alt="Pinned app screens" className="w-full" style={{ display: 'block', maxHeight: 520, objectFit: 'cover' }} />
        ─────────────────────────────────────────────────────────────────────── */}
        <div
          className="w-full"
          style={{
            height: 420,
            background: CARD,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            className="text-xs tracking-[0.25em] uppercase"
            style={{ color: 'rgba(255,255,255,0.18)' }}
          >
            {/* Banner image — add here */}
            Banner image placeholder
          </p>
        </div>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── OVERVIEW / PROBLEM ────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Overview
          </p>

          {/* Headline + subtext */}
          <div className="mb-14 max-w-2xl">
            <h2
              className="anim-fade-up mb-5"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Bangkok's best food isn't on the map.
            </h2>
            <p
              className="anim-fade-up text-base leading-[1.7]"
              style={{ animationDelay: '0.26s', color: 'rgba(255,255,255,0.62)' }}
            >
              Bangkok has more street food stalls than almost any city on earth. Most of them have never appeared on Google Maps — and probably never will.
            </p>
          </div>

          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {[
              {
                num:   'I — REALITY',
                body:  'Google Maps works great for restaurants, bars, and cafes. Street food stalls are almost completely absent.',
              },
              {
                num:   'II — BREAKDOWN',
                body:  'Stall owners are focused on cooking and making a living. Setting up a digital profile isn\'t something they have time for — or need.',
              },
              {
                num:   'III — INSIGHT',
                body:  'Many stalls move, close early, or only open certain nights. Even when a stall is listed, there\'s no way to know if it\'s still there today.',
              },
            ].map(({ num, body }) => (
              <div
                key={num}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  {num}
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Blockquote */}
          <div
            className="anim-fade-up mb-0 p-6 md:p-8"
            style={{
              background: CARD,
              borderRadius: 12,
              borderLeft: `3px solid ${GREEN}`,
              maxWidth: 640,
            }}
          >
            <p
              className="text-base md:text-lg leading-[1.7] mb-4"
              style={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}
            >
              "I walked 20 minutes to a stall I'd been to before. It wasn't there. No way to know until you show up."
            </p>
            <p
              className="text-xs tracking-[0.14em] uppercase"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              — Randy, Bangkok resident
            </p>
          </div>

        </section>

        {/* ── ANCHOR STATEMENT 1 ────────────────────────────────────────────── */}
        <div
          className="w-full px-6 md:px-10"
          style={{ paddingTop: 120, paddingBottom: 120 }}
        >
          <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ color: '#ffffff', display: 'block' }}>
                The problem isn't finding food.
              </span>
              <span style={{ color: GREEN, display: 'block' }}>
                It's trusting that it's still there.
              </span>
            </p>
          </div>
        </div>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Solution
          </p>

          {/* Headline + subtext */}
          <div className="mb-14 max-w-2xl">
            <h2
              className="anim-fade-up mb-5"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              So we pinned it there. Together.
            </h2>
            <p
              className="anim-fade-up text-base leading-[1.7]"
              style={{ animationDelay: '0.26s', color: 'rgba(255,255,255,0.62)' }}
            >
              Pinned is a community-driven street food discovery map for Bangkok. No sign-ups required from stall owners. No corporate listings. Just people who eat street food, sharing what they find.
            </p>
          </div>

          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num:  'I — MAP FIRST',
                body: 'Every stall starts as a pin on a map. Not a feed, not a list. Because street food is about location — what\'s near you, right now.',
              },
              {
                num:  'II — ANYONE CAN PIN',
                body: 'Spot a great stall? Drop a pin in under a minute. Add a photo, a food type, a quick note. The map grows every time someone eats.',
              },
              {
                num:  'III — THE COMMUNITY UPDATES IT',
                body: 'Pins don\'t just get added — they get maintained. Every user can confirm a stall is still there, keeping the map accurate without any central team managing it.',
              },
            ].map(({ num, body }) => (
              <div
                key={num}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  {num}
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── WIREFRAMES ────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Process
          </p>

          {/* Headline + subtext */}
          <div className="mb-14 max-w-2xl">
            <h2
              className="anim-fade-up mb-5"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Structure before style.
            </h2>
            <p
              className="anim-fade-up text-base leading-[1.7]"
              style={{ animationDelay: '0.26s', color: 'rgba(255,255,255,0.62)' }}
            >
              Before any colour or component, every screen was mapped as a wireframe. Six screens, one clear flow.
            </p>
          </div>

          {/* WIREFRAMES IMAGE - full width, all 6 screens side by side */}
          <div
            className="anim-fade-up w-full"
            style={{
              animationDelay: '0.32s',
              borderRadius: 12,
              overflow: 'hidden',
              background: CARD,
              minHeight: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* WIREFRAMES IMAGE - full width, all 6 screens side by side */}
            {/* Replace this div with: <img src="/your-image.png" alt="Pinned wireframes" style={{ width: '100%', display: 'block' }} /> */}
            <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Wireframes image</span>
          </div>

        </section>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── DESIGN SYSTEM ─────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Design System
          </p>

          {/* Headline + subtext */}
          <div className="mb-14 max-w-2xl">
            <h2
              className="anim-fade-up mb-5"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Built to be consistent.
            </h2>
            <p
              className="anim-fade-up text-base leading-[1.7]"
              style={{ animationDelay: '0.26s', color: 'rgba(255,255,255,0.62)' }}
            >
              Every colour, type size, and component was defined before the first high fidelity screen was touched. This made every decision faster and every screen more cohesive.
            </p>
          </div>

          {/* Three blurbs — each with image at top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">

            {/* Card 1 — Colours & Typography */}
            <div
              className="anim-fade-up"
              style={{ background: CARD, borderRadius: 12, overflow: 'hidden' }}
            >
              {/* DESIGN SYSTEM - colours and typography screenshot */}
              {/* Replace the inner div+span with: <img src="YOUR_BLOB_URL" alt="Pinned colours and typography" style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'top', display: 'block' }} /> */}
              <div style={{ background: '#1a1a1a', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Colours & typography image</span>
              </div>
              <div className="p-6">
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  Colours &amp; Typography
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  Dark gray bases (#161616, #242424, #2E2E2E) keep the map as the hero. Green (#2DCC70) is reserved for trust and action. Amber (#FFB800) signals time and urgency. DM Sans throughout — clean, readable, unpretentious.
                </p>
              </div>
            </div>

            {/* Card 2 — Pin States */}
            <div
              className="anim-fade-up"
              style={{ background: CARD, borderRadius: 12, overflow: 'hidden' }}
            >
              {/* DESIGN SYSTEM - pin states screenshot */}
              {/* Replace the inner div+span with: <img src="YOUR_BLOB_URL" alt="Pinned pin states" style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'top', display: 'block' }} /> */}
              <div style={{ background: '#1a1a1a', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Pin states image</span>
              </div>
              <div className="p-6">
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  Pin States
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  The four pin states aren't just visual — they communicate real information. Green means fresh. Amber means check. Grey means stale. Selected means this is the one. Every state has a job.
                </p>
              </div>
            </div>

            {/* Card 3 — Stall Card */}
            <div
              className="anim-fade-up"
              style={{ background: CARD, borderRadius: 12, overflow: 'hidden' }}
            >
              {/* DESIGN SYSTEM - stall card screenshot */}
              {/* Replace the inner div+span with: <img src="YOUR_BLOB_URL" alt="Pinned stall card component" style={{ width: '100%', height: 200, objectFit: 'cover', objectPosition: 'top', display: 'block' }} /> */}
              <div style={{ background: '#1a1a1a', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Stall card image</span>
              </div>
              <div className="p-6">
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  Stall Card
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  The stall card is the core UI moment. Photo, name, food type, rating, timestamp, and two actions — Confirm Still Here and Add Review. Everything a user needs, nothing they don't.
                </p>
              </div>
            </div>

          </div>

          {/* DESIGN SYSTEM IMAGE - full components screenshot */}
          <div
            className="anim-fade-up w-full"
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              background: CARD,
              minHeight: 320,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* DESIGN SYSTEM IMAGE - full components screenshot */}
            {/* Replace this div with: <img src="/your-image.png" alt="Pinned design system components" style={{ width: '100%', display: 'block' }} /> */}
            <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Design system image</span>
          </div>

        </section>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── SCREEN WALKTHROUGH ────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Screens
          </p>

          {/* Headline + subtext */}
          <div className="mb-20 max-w-2xl">
            <h2
              className="anim-fade-up mb-5"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Five screens. One flow.
            </h2>
            <p
              className="anim-fade-up text-base leading-[1.7]"
              style={{ animationDelay: '0.26s', color: 'rgba(255,255,255,0.62)' }}
            >
              Every screen was designed to get the user to the food as fast as possible.
            </p>
          </div>

          {/* Screen rows — alternating image left/right */}
          <div className="flex flex-col gap-24">

            {/* Screen 1 — MAP VIEW — image left */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* SCREEN 1 - Map view */}
                <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Frame1.png" alt="Pinned map view screen" style={{ width: 320, display: 'block' }} />
              </div>
              <div>
                <p className="text-xs tracking-[0.18em] uppercase mb-5" style={{ color: GREEN }}>Map View</p>
                <h3 className="mb-4 font-bold" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  The map is the app.
                </h3>
                <p className="text-base leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  Opening Pinned drops you straight into the map. No feed, no onboarding, no friction. Filter chips let you narrow by food type. The FAB lets you add a pin in one tap.
                </p>
              </div>
            </div>

            {/* Screen 2 — PIN DETAIL — image right */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2" style={{ display: 'flex', justifyContent: 'center' }}>
                {/* SCREEN 2 - Pin detail sheet — replace div+span with: <img src="YOUR_BLOB_URL" alt="Pinned pin detail screen" style={{ width: 320, display: 'block' }} /> */}
                <div style={{ width: 320, minHeight: 560, background: CARD, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Screen 2</span>
                </div>
              </div>
              <div className="md:order-1">
                <p className="text-xs tracking-[0.18em] uppercase mb-5" style={{ color: GREEN }}>Pin Detail</p>
                <h3 className="mb-4 font-bold" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  Everything you need before you walk there.
                </h3>
                <p className="text-base leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  Tapping a pin slides up the detail sheet. Photo, rating, food type, timestamp, and location. Confirm Still Here and Add Review live here — the two actions that keep the map alive.
                </p>
              </div>
            </div>

            {/* Screen 3 — DROP A PIN STEP 1 — image left */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* SCREEN 3 - Add pin step 1 — replace div+span with: <img src="YOUR_BLOB_URL" alt="Pinned add pin step 1 screen" style={{ width: 320, display: 'block' }} /> */}
                <div style={{ width: 320, minHeight: 560, background: CARD, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Screen 3</span>
                </div>
              </div>
              <div>
                <p className="text-xs tracking-[0.18em] uppercase mb-5" style={{ color: GREEN }}>Drop a Pin — Step 1</p>
                <h3 className="mb-4 font-bold" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  Drop it where it is.
                </h3>
                <p className="text-base leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  Step one is location. Drag the map to place the pin exactly where the stall is, or search by area name. The map stays honest because the person placing the pin was just there.
                </p>
              </div>
            </div>

            {/* Screen 4 — DROP A PIN STEP 2 — image right */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2" style={{ display: 'flex', justifyContent: 'center' }}>
                {/* SCREEN 4 - Add pin step 2 — replace div+span with: <img src="YOUR_BLOB_URL" alt="Pinned add pin step 2 screen" style={{ width: 320, display: 'block' }} /> */}
                <div style={{ width: 320, minHeight: 560, background: CARD, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Screen 4</span>
                </div>
              </div>
              <div className="md:order-1">
                <p className="text-xs tracking-[0.18em] uppercase mb-5" style={{ color: GREEN }}>Drop a Pin — Step 2</p>
                <h3 className="mb-4 font-bold" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  Name it, tag it, rate it.
                </h3>
                <p className="text-base leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  Step two captures the details. Food type, stall name, a quick note, and a rating. A photo is optional but encouraged. The whole flow takes under a minute.
                </p>
              </div>
            </div>

            {/* Screen 5 — PROFILE — image left */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* SCREEN 5 - User profile — replace div+span with: <img src="YOUR_BLOB_URL" alt="Pinned user profile screen" style={{ width: 320, display: 'block' }} /> */}
                <div style={{ width: 320, minHeight: 560, background: CARD, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Screen 5</span>
                </div>
              </div>
              <div>
                <p className="text-xs tracking-[0.18em] uppercase mb-5" style={{ color: GREEN }}>Profile</p>
                <h3 className="mb-4 font-bold" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                  Your pins, your reputation.
                </h3>
                <p className="text-base leading-[1.7]" style={{ color: 'rgba(255,255,255,0.62)' }}>
                  The profile shows what you've contributed — pins dropped, stalls visited, followers. Tier badges reward active contributors. No follower pressure, just a record of good finds.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── FEATURE SPOTLIGHT ─────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Feature
          </p>

          {/* Headline + subtext */}
          <div className="mb-14 max-w-2xl">
            <h2
              className="anim-fade-up mb-5"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              A map that stays alive.
            </h2>
            <p
              className="anim-fade-up text-base leading-[1.7]"
              style={{ animationDelay: '0.26s', color: 'rgba(255,255,255,0.62)' }}
            >
              The biggest problem with crowd-sourced location data isn't adding it — it's keeping it accurate. Stalls close. They move. They take random days off. A pin that was true six months ago might be useless today.
            </p>
          </div>

          {/* Pin state cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              {
                dot:   GREEN,
                state: 'CONFIRMED',
                body:  'Pinned or confirmed within 3 hours. Someone was just there.',
              },
              {
                dot:   AMBER,
                state: 'UNCONFIRMED',
                body:  'Last seen today. Likely still there but unconfirmed.',
              },
              {
                dot:   GREY_DOT,
                state: 'STALE',
                body:  'No confirmation in over 24 hours. May have moved or closed early.',
              },
            ].map(({ dot, state, body }) => (
              <div
                key={state}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                {/* Dot + state label */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: dot,
                      flexShrink: 0,
                      display: 'block',
                    }}
                  />
                  <p
                    className="text-xs tracking-[0.18em] uppercase"
                    style={{ color: dot }}
                  >
                    {state}
                  </p>
                </div>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                label: 'FOR THE EATER',
                body:  'You know what you\'re looking at is real. The amber and grey states tell you when to be skeptical — before you make the trip.',
              },
              {
                label: 'FOR THE STALL',
                body:  'Great stalls get confirmed more. That confirmation history becomes their reputation — built organically, without them ever touching an app.',
              },
            ].map(({ label, body }) => (
              <div
                key={label}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  {label}
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ── ANCHOR STATEMENT 2 ────────────────────────────────────────────── */}
        <div
          className="w-full px-6 md:px-10"
          style={{ paddingTop: 120, paddingBottom: 120 }}
        >
          <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: GREEN,
              }}
            >
              Every pin makes the map better.
            </p>
          </div>
        </div>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── CONFIRM STILL HERE ────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Core Mechanic
          </p>

          {/* Headline + subtext */}
          <div className="mb-14 max-w-2xl">
            <h2
              className="anim-fade-up mb-5"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              Confirm still here.
            </h2>
            <p
              className="anim-fade-up text-base leading-[1.7]"
              style={{ animationDelay: '0.26s', color: 'rgba(255,255,255,0.62)' }}
            >
              Street food data goes stale fast. Confirm Still Here is a one-tap community update system that keeps the map honest — without requiring stall owners to do anything.
            </p>
          </div>

          {/* Three step cards with arrow connectors */}
          <div className="mb-5">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-center">

              {/* Step 1 */}
              <div
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  Step 1 — Pin Added
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  A user spots a stall and drops a pin. It goes live on the map immediately, marked green.
                </p>
              </div>

              {/* Arrow 1 */}
              <div
                className="hidden md:flex items-center justify-center flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.2)', fontSize: 22, width: 32 }}
              >
                →
              </div>

              {/* Step 2 */}
              <div
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: AMBER }}
                >
                  Step 2 — Time Passes
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  No confirmation comes in. The pin shifts to amber, then grey. The map is honest about uncertainty.
                </p>
              </div>

              {/* Arrow 2 */}
              <div
                className="hidden md:flex items-center justify-center flex-shrink-0"
                style={{ color: 'rgba(255,255,255,0.2)', fontSize: 22, width: 32 }}
              >
                →
              </div>

              {/* Step 3 */}
              <div
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  Step 3 — Confirmed
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  Someone walks past and taps Confirm Still Here. One tap. Pin goes green again.
                </p>
              </div>

            </div>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                label: 'FOR THE EATER',
                body:  'Green means someone was just there. Amber means proceed with mild caution. Grey means call ahead or explore nearby.',
              },
              {
                label: 'FOR THE STALL',
                body:  'No app needed. No account needed. Good stalls naturally get confirmed more — building a reputation purely through foot traffic.',
              },
            ].map(({ label, body }) => (
              <div
                key={label}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  {label}
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ── ANCHOR STATEMENT 3 ────────────────────────────────────────────── */}
        <div
          className="w-full px-6 md:px-10"
          style={{ paddingTop: 120, paddingBottom: 120 }}
        >
          <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              <span style={{ color: '#ffffff', display: 'block' }}>
                No admin team. No manual updates.
              </span>
              <span style={{ color: GREEN, display: 'block' }}>
                The community does it naturally.
              </span>
            </p>
          </div>
        </div>

        {/* ── DIVIDER ───────────────────────────────────────────────────────── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 40px' }} />

        {/* ── WHAT I LEARNED ────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          {/* Section label */}
          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-8"
            style={{ color: GREEN, animationDelay: '0.1s' }}
          >
            Reflection
          </p>

          {/* Headline */}
          <div className="mb-14 max-w-2xl">
            <h2
              className="anim-fade-up"
              style={{
                animationDelay: '0.18s',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
              }}
            >
              What I learned from this project.
            </h2>
          </div>

          {/* Four numbered cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                num:   '1',
                bold:  'No reference point forces better thinking.',
                body:  'There\'s no app like Pinned, which meant every decision had to be justified from first principles. That constraint made me a sharper product thinker.',
              },
              {
                num:   '2',
                bold:  'The hardest problem wasn\'t visual. It was systemic.',
                body:  'Designing a map that stays accurate without anyone maintaining it pushed me beyond UI into product architecture and community behavior.',
              },
              {
                num:   '3',
                bold:  'Component libraries pay off fast.',
                body:  'My first time using Figma variables properly. It slowed me down at the start and saved me on every screen after.',
              },
              {
                num:   '4',
                bold:  'Timebox your explorations.',
                body:  'With no reference, small decisions took too long. Next time I\'d set a hard limit on exploration and commit sooner.',
              },
            ].map(({ num, bold, body }) => (
              <div
                key={num}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <p
                  className="text-xs tracking-[0.18em] uppercase mb-4"
                  style={{ color: GREEN }}
                >
                  {num}
                </p>
                <p
                  className="text-base font-semibold mb-3"
                  style={{ color: '#fff', lineHeight: 1.4 }}
                >
                  {bold}
                </p>
                <p
                  className="text-base leading-[1.7]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer
          className="px-6 md:px-10 py-12"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span
              className="text-sm font-bold tracking-[0.15em]"
              style={{ color: GREEN }}
            >
              PINNED
            </span>
            <FooterIcons figmaHref="#" />
          </div>
        </footer>

      </main>
    </>
  )
}
