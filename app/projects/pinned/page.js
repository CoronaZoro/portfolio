import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG       = '#161616'
const CARD     = '#242424'
const GREEN    = '#2DCC70'
const AMBER    = '#FFB800'
const GREY_DOT = '#555555' // dot only — 'Stale' label text uses the muted token

export default function PinnedPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 text-soft" style={{ background: BG }}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 pt-20 pb-16 max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — title + one-liner */}
            <div className="anim-fade-up" style={{ animationDelay: '0.25s' }}>
              <h1 className="font-heading text-display font-medium text-ink mb-5">
                Pinned.
              </h1>
              <p className="text-body max-w-[40ch]">
                A community-driven street food discovery map for Bangkok. Built for the people who eat, not the people who own.
              </p>
              <p className="text-body mt-4" style={{ color: GREEN }}>UI/UX design · Mobile app</p>
            </div>

            {/* Right — metadata grid */}
            <dl className="anim-fade-up grid grid-cols-2 gap-2" style={{ animationDelay: '0.35s' }}>
              {[
                { label: 'Role',   value: 'Product Designer / UX' },
                { label: 'Type',   value: 'Mobile app (concept)'  },
                { label: 'Stack',  value: 'Figma · Mapbox'        },
                { label: 'Status', value: 'Case study'            },
              ].map(({ label, value }) => (
                <div key={label} className="p-5 rounded-xl" style={{ background: CARD }}>
                  <dt className="text-body text-muted">{label}</dt>
                  <dd className="text-body font-medium mt-1" style={{ color: GREEN }}>{value}</dd>
                </div>
              ))}
            </dl>

          </div>
        </section>

        {/* ── HERO BANNER IMAGE ─────────────────────────────────────────────── */}
        <img
          src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Banner.png"
          alt="Pinned app screens"
          className="w-full"
          style={{ display: 'block' }}
        />


        {/* ── OVERVIEW / PROBLEM ────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline + subtext */}
          <div className="mb-12 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-5" style={{ animationDelay: '0.1s' }}>
              Bangkok&apos;s best food isn&apos;t on the map.
            </h2>
            <p className="anim-fade-up text-body" style={{ animationDelay: '0.2s' }}>
              Bangkok has more street food stalls than almost any city on earth. Most of them have never appeared on Google Maps and probably never will.
            </p>
          </div>

          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {[
              {
                title: 'Reality',
                body:  'Google Maps works great for restaurants, bars, and cafes. Street food stalls are almost completely absent.',
              },
              {
                title: 'Breakdown',
                body:  'Stall owners are focused on cooking and making a living. Setting up a digital profile isn\'t something they have time nor need.',
              },
              {
                title: 'Insight',
                body:  'Many stalls move, close early, or only open certain nights. Even when a stall is listed, there\'s no way to know if it\'s still there today.',
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>{title}</h3>
                <p className="text-body">
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
            <p className="text-lead text-ink italic mb-4">
              &quot;I walked 20 minutes to a stall I&apos;d been to before. It wasn&apos;t there. No way to know until you show up.&quot;
            </p>
            <p className="text-body text-muted">
              — Randy, Bangkok resident
            </p>
          </div>

        </section>

        {/* ── ANCHOR STATEMENT 1 ────────────────────────────────────────────── */}
        <div
          className="w-full px-6 md:px-10"
          style={{ paddingTop: 128, paddingBottom: 128 }}
        >
          <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
            <p className="font-heading text-statement font-medium">
              <span className="text-ink" style={{ display: 'block' }}>
                The problem isn&apos;t finding food.
              </span>
              <span style={{ color: GREEN, display: 'block' }}>
                It&apos;s trusting that it&apos;s still there.
              </span>
            </p>
          </div>
        </div>


        {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline + subtext */}
          <div className="mb-12 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-5" style={{ animationDelay: '0.1s' }}>
              So we pinned it there. Together.
            </h2>
            <p className="anim-fade-up text-body" style={{ animationDelay: '0.2s' }}>
              Pinned is a community-driven street food discovery map for Bangkok. No sign-ups required from stall owners. No corporate listings. Just people who eat street food, sharing what they find.
            </p>
          </div>

          {/* Three cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Map first',
                body: 'Every stall starts as a pin on a map. Not a feed, not a list. Because street food is about location — what\'s near you, right now.',
              },
              {
                title: 'Anyone can pin',
                body: 'Spot a great stall? Drop a pin in under a minute. Add a photo, a food type, a quick note. The map grows every time someone eats.',
              },
              {
                title: 'The community updates it',
                body: 'Pins don\'t just get added, they get maintained. Every user can confirm a stall is still there, keeping the map accurate without any central team managing it.',
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>{title}</h3>
                <p className="text-body">
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>


        {/* ── WIREFRAMES ────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline + subtext */}
          <div className="mb-12 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-5" style={{ animationDelay: '0.1s' }}>
              Structure before style.
            </h2>
            <p className="anim-fade-up text-body" style={{ animationDelay: '0.2s' }}>
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
            {/* WIREFRAMES IMAGE */}
            <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_wireframe.png" alt="Pinned wireframes" style={{ width: '100%', display: 'block' }} />
          </div>

        </section>


        {/* ── DESIGN SYSTEM ─────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline + subtext */}
          <div className="mb-12 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-5" style={{ animationDelay: '0.1s' }}>
              Built to be consistent.
            </h2>
            <p className="anim-fade-up text-body" style={{ animationDelay: '0.2s' }}>
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
              <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Typo.png" alt="Pinned colours and typography" style={{ width: '100%', height: 200, objectFit: 'contain', objectPosition: 'center', background: '#1a1a1a', display: 'block', borderRadius: '8px 8px 0 0' }} />
              <div className="p-6">
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>Colours &amp; typography</h3>
                <p className="text-body">
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
              <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_pins.png" alt="Pinned pin states" style={{ width: '100%', height: 200, objectFit: 'contain', objectPosition: 'center', background: '#1a1a1a', display: 'block', borderRadius: '8px 8px 0 0' }} />
              <div className="p-6">
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>Pin states</h3>
                <p className="text-body">
                  The four pin states aren&apos;t just visual, they communicate real information. Green means fresh. Amber means check. Grey means stale. Selected means this is the one. Every state has a job.
                </p>
              </div>
            </div>

            {/* Card 3 — Stall Card */}
            <div
              className="anim-fade-up"
              style={{ background: CARD, borderRadius: 12, overflow: 'hidden' }}
            >
              {/* DESIGN SYSTEM - stall card screenshot */}
              <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Card.png" alt="Pinned stall card component" style={{ width: '100%', height: 200, objectFit: 'contain', objectPosition: 'center', background: '#1a1a1a', display: 'block', borderRadius: '8px 8px 0 0' }} />
              <div className="p-6">
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>Stall card</h3>
                <p className="text-body">
                  The stall card is the core UI moment. Photo, name, food type, rating, timestamp, and two actions, Confirm Still Here and Add Review. Everything a user needs, nothing they don&apos;t.
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
            <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Components.png" alt="Pinned design system components" style={{ width: '100%', display: 'block' }} />
          </div>

        </section>


        {/* ── SCREEN WALKTHROUGH ────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline + subtext */}
          <div className="mb-16 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-5" style={{ animationDelay: '0.1s' }}>
              Six screens. One flow.
            </h2>
            <p className="anim-fade-up text-body" style={{ animationDelay: '0.2s' }}>
              Every screen was designed to get the user to the food as fast as possible.
            </p>
          </div>

          {/* Screen rows — alternating image left/right */}
          <div className="flex flex-col gap-24">

            {/* Screen 1 — MAP VIEW — image left */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center w-full">
                {/* SCREEN 1 - Map view */}
                <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Frame1.png" alt="Pinned map view screen" className="w-full md:w-[320px] block" />
              </div>
              <div>
                <h3 className="font-heading text-head font-medium text-ink">
                  The map is the app.
                </h3>
                <p className="text-body font-medium mt-2 mb-4" style={{ color: GREEN }}>Map view</p>
                <p className="text-body">
                  Opening Pinned drops you straight into the map. No feed, no onboarding, no friction. Filter chips let you narrow by food type. The FAB lets you add a pin in one tap.
                </p>
              </div>
            </div>

            {/* Screen 2 — PIN DETAIL — image right */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2 flex justify-center w-full">
                {/* SCREEN 2 - Pin detail sheet */}
                <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Frame2.png" alt="Pinned pin detail screen" className="w-full md:w-[320px] block" />
              </div>
              <div className="md:order-1">
                <h3 className="font-heading text-head font-medium text-ink">
                  Everything you need before you walk there.
                </h3>
                <p className="text-body font-medium mt-2 mb-4" style={{ color: GREEN }}>Pin detail</p>
                <p className="text-body">
                  Tapping a pin slides up the detail sheet. Photo, rating, food type, timestamp, and location. Confirm Still Here and Add Review live here — the two actions that keep the map alive.
                </p>
              </div>
            </div>

            {/* Screen 3 — FOOD MARKET CLUSTER — image left */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center w-full">
                {/* SCREEN 3 - Food market cluster */}
                <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Frame3.png" alt="Pinned food market cluster screen" className="w-full md:w-[320px] block" />
              </div>
              <div>
                <h3 className="font-heading text-head font-medium text-ink">
                  When one pin isn&apos;t enough.
                </h3>
                <p className="text-body font-medium mt-2 mb-4" style={{ color: GREEN }}>Cluster view</p>
                <p className="text-body">
                  Some areas have dozens of stalls in one block. The cluster pin groups them together so the map stays readable. Tap the cluster to expand and browse everything in that area.
                </p>
              </div>
            </div>

            {/* Screen 4 — DROP A PIN STEP 1 — image right */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2 flex justify-center w-full">
                {/* SCREEN 4 - Add pin step 1 */}
                <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Frame4.png" alt="Pinned add pin step 1 screen" className="w-full md:w-[320px] block" />
              </div>
              <div className="md:order-1">
                <h3 className="font-heading text-head font-medium text-ink">
                  Drop it where it is.
                </h3>
                <p className="text-body font-medium mt-2 mb-4" style={{ color: GREEN }}>Drop a pin — Step 1</p>
                <p className="text-body">
                  Step one is location. Drag the map to place the pin exactly where the stall is, or search by area name. The map stays honest because the person placing the pin was just there.
                </p>
              </div>
            </div>

            {/* Screen 5 — DROP A PIN STEP 2 — image left */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center w-full">
                {/* SCREEN 5 - Add pin step 2 */}
                <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Frame5.png" alt="Pinned add pin step 2 screen" className="w-full md:w-[320px] block" />
              </div>
              <div>
                <h3 className="font-heading text-head font-medium text-ink">
                  Name it, tag it, rate it.
                </h3>
                <p className="text-body font-medium mt-2 mb-4" style={{ color: GREEN }}>Drop a pin — Step 2</p>
                <p className="text-body">
                  Step two captures the details. Food type, stall name, a quick note, and a rating. A photo is optional but encouraged. The whole flow takes under a minute.
                </p>
              </div>
            </div>

            {/* Screen 6 — PROFILE — image right */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2 flex justify-center w-full">
                {/* SCREEN 6 - User profile */}
                <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned_Frame6.png" alt="Pinned user profile screen" className="w-full md:w-[320px] block" />
              </div>
              <div className="md:order-1">
                <h3 className="font-heading text-head font-medium text-ink">
                  Your pins, your reputation.
                </h3>
                <p className="text-body font-medium mt-2 mb-4" style={{ color: GREEN }}>Profile</p>
                <p className="text-body">
                  The profile shows what you&apos;ve contributed — pins dropped, stalls visited, followers. Tier badges reward active contributors. No follower pressure, just a record of good finds.
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* ── FEATURE SPOTLIGHT ─────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline + subtext */}
          <div className="mb-12 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-5" style={{ animationDelay: '0.1s' }}>
              A map that stays alive.
            </h2>
            <p className="anim-fade-up text-body" style={{ animationDelay: '0.2s' }}>
              The biggest problem with crowd-sourced location data isn&apos;t adding it, it&apos;s keeping it accurate. Stalls close. They move. They take random days off. A pin that was true six months ago might be useless today.
            </p>
          </div>

          {/* Pin state cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {[
              {
                dot:   GREEN,
                state: 'Confirmed',
                body:  'Pinned or confirmed within 3 hours. Someone was just there.',
              },
              {
                dot:   AMBER,
                state: 'Unconfirmed',
                body:  'Last seen today. Likely still there but unconfirmed.',
              },
              {
                dot:   GREY_DOT,
                state: 'Stale',
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
                  <h3 className="text-lead font-medium" style={{ color: dot === GREY_DOT ? 'var(--color-muted)' : dot }}>
                    {state}
                  </h3>
                </div>
                <p className="text-body">
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                label: 'For the eater',
                body:  'You know what you\'re looking at is real. The amber and grey states tell you when to be skeptical before you make the trip.',
              },
              {
                label: 'For the stall',
                body:  'Great stalls get confirmed more. That confirmation history becomes their reputation, built organically, without them ever touching an app.',
              },
            ].map(({ label, body }) => (
              <div
                key={label}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>{label}</h3>
                <p className="text-body">
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ── ANCHOR STATEMENT 2 ────────────────────────────────────────────── */}
        <div
          className="w-full px-6 md:px-10"
          style={{ paddingTop: 128, paddingBottom: 128 }}
        >
          <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
            <p className="font-heading text-statement font-medium" style={{ color: GREEN }}>
              Every pin makes the map better.
            </p>
          </div>
        </div>


        {/* ── CONFIRM STILL HERE ────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline + subtext */}
          <div className="mb-12 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-5" style={{ animationDelay: '0.1s' }}>
              Confirm still here.
            </h2>
            <p className="anim-fade-up text-body" style={{ animationDelay: '0.2s' }}>
              Street food data goes stale fast. Confirm Still Here is a one-tap community update system that keeps the map honest without requiring stall owners to do anything.
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
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>Pin added</h3>
                <p className="text-body">
                  A user spots a stall and drops a pin. It goes live on the map immediately, marked green.
                </p>
              </div>

              {/* Arrow 1 */}
              <div
                className="hidden md:flex items-center justify-center flex-shrink-0"
                style={{ color: 'var(--color-muted)', fontSize: 24, width: 32 }}
              >
                →
              </div>

              {/* Step 2 */}
              <div
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <h3 className="text-lead font-medium mb-3" style={{ color: AMBER }}>Time passes</h3>
                <p className="text-body">
                  No confirmation comes in. The pin shifts to amber, then grey. The map is honest about uncertainty.
                </p>
              </div>

              {/* Arrow 2 */}
              <div
                className="hidden md:flex items-center justify-center flex-shrink-0"
                style={{ color: 'var(--color-muted)', fontSize: 24, width: 32 }}
              >
                →
              </div>

              {/* Step 3 */}
              <div
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>Confirmed</h3>
                <p className="text-body">
                  Someone walks past and taps Confirm Still Here. One tap. Pin goes green again.
                </p>
              </div>

            </div>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                label: 'For the eater',
                body:  'Green means someone was just there. Amber means proceed with mild caution. Grey means call ahead or explore nearby.',
              },
              {
                label: 'For the stall',
                body:  'No app needed. No account needed. Good stalls naturally get confirmed more, building a reputation purely through foot traffic.',
              },
            ].map(({ label, body }) => (
              <div
                key={label}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <h3 className="text-lead font-medium mb-3" style={{ color: GREEN }}>{label}</h3>
                <p className="text-body">
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ── ANCHOR STATEMENT 3 ────────────────────────────────────────────── */}
        <div
          className="w-full px-6 md:px-10"
          style={{ paddingTop: 128, paddingBottom: 128 }}
        >
          <div className="max-w-7xl mx-auto" style={{ textAlign: 'center' }}>
            <p className="font-heading text-statement font-medium">
              <span className="text-ink" style={{ display: 'block' }}>
                No admin team. No manual updates.
              </span>
              <span style={{ color: GREEN, display: 'block' }}>
                The community does it naturally.
              </span>
            </p>
          </div>
        </div>


        {/* ── WHAT I LEARNED ────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">


          {/* Headline */}
          <div className="mb-12 max-w-2xl">
            <h2 className="anim-fade-up font-heading text-head font-medium text-ink" style={{ animationDelay: '0.1s' }}>
              What I learned from this project.
            </h2>
          </div>

          {/* Four numbered cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                bold:  'No reference point forces better thinking.',
                body:  'There\'s no app like Pinned, which meant every decision had to be justified from first principles. That constraint made me a sharper product thinker.',
              },
              {
                bold:  'The hardest problem wasn\'t visual. It was systemic.',
                body:  'Designing a map that stays accurate without anyone maintaining it pushed me beyond UI into product architecture and community behavior.',
              },
              {
                bold:  'Component libraries pay off fast.',
                body:  'My first time using Figma variables properly. It slowed me down at the start and saved me on every screen after.',
              },
              {
                bold:  'Timebox your explorations.',
                body:  'With no reference, small decisions took too long. Next time I\'d set a hard limit on exploration and commit sooner.',
              },
            ].map(({ bold, body }) => (
              <div
                key={bold}
                className="anim-fade-up p-6"
                style={{ background: CARD, borderRadius: 12 }}
              >
                <h3 className="text-lead font-medium text-ink mb-3">
                  {bold}
                </h3>
                <p className="text-body">
                  {body}
                </p>
              </div>
            ))}
          </div>

        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer className="px-6 md:px-10 py-12" style={{ background: CARD }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="font-heading text-lead font-medium" style={{ color: GREEN }}>
              Pinned.
            </span>
            <FooterIcons figmaHref="#" />
          </div>
        </footer>

      </main>
    </>
  )
}
