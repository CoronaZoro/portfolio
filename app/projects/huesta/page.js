'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'

const DARK   = '#1A1818'
const CARD   = '#1e1b1b'
const ACCENT = '#c8a876'
const BORDER = '#2a2420'
const LIGHT  = '#EDEDED'
const MUTED  = 'rgba(255,255,255,0.35)'

/* ── Book-open reveal card ───────────────────────────────────────── */
function RevealCard({ label, inputContent, outputContent }) {
  const [open, setOpen]           = useState(false)
  const [interacted, setInteracted] = useState(false)

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ background: CARD, border: `0.5px solid ${BORDER}` }}
      onClick={() => { setOpen(o => !o); if (!interacted) setInteracted(true) }}
    >
      {/* Card label */}
      <span
        className="absolute top-5 left-6 text-xs tracking-[0.2em] uppercase z-10 pointer-events-none"
        style={{ color: ACCENT, opacity: 0.7 }}
      >
        {label}
      </span>

      <div className="flex" style={{ minHeight: '220px' }}>
        {/* Input panel — shrinks when open */}
        <div
          className="flex flex-col justify-center p-8 pt-14 overflow-hidden flex-shrink-0"
          style={{
            width: open ? '50%' : '100%',
            transition: 'width 400ms ease-in-out',
            borderRight: `0.5px solid ${BORDER}`,
          }}
        >
          {inputContent}
        </div>

        {/* Output panel — book-open animation */}
        <div
          className="overflow-hidden flex-shrink-0"
          style={{
            width: open ? '50%' : '0%',
            transition: 'width 400ms ease-in-out',
          }}
        >
          <div
            style={{
              width: '100%',
              minWidth: '300px',
              height: '100%',
              transformOrigin: 'left center',
              transform: open
                ? 'perspective(700px) rotateY(0deg)'
                : 'perspective(700px) rotateY(-25deg)',
              transition: 'transform 400ms ease-in-out',
            }}
          >
            {outputContent}
          </div>
        </div>
      </div>

      {/* Click hint — fades away after first interaction */}
      <span
        className="absolute bottom-4 right-5 text-xs tracking-widest pointer-events-none transition-opacity duration-500"
        style={{ color: ACCENT, opacity: interacted ? 0 : 0.45 }}
      >
        click to reveal →
      </span>
    </div>
  )
}

/* ── Placeholder image box ──────────────────────────────────────── */
function Placeholder({ label, aspect = 'aspect-video' }) {
  return (
    <div
      className={`w-full ${aspect} flex items-center justify-center rounded-lg`}
      style={{ background: '#2a2420' }}
    >
      <span
        className="text-xs tracking-[0.15em] uppercase text-center px-4"
        style={{ color: 'rgba(200,168,118,0.4)' }}
      >
        {label}
      </span>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function HuestaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: DARK, color: '#fff', fontFamily: 'var(--font-sans)' }}>

        {/* ── HERO ── */}
        <section className="px-6 md:px-10 pt-20 pb-0 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: MUTED }}>
                AI Product / Design Tool
              </p>
              <h1
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '5rem',
                  fontWeight: 400,
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                Huesta<span style={{ color: ACCENT }}>.</span>
              </h1>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 340 }}>
                A zero-login design tool that generates complete UI kits — colour palettes, typography, and layout — from a keyword, a conversation, or a reference image.
              </p>
            </div>

            {/* Metadata sidebar */}
            <div className="flex flex-col gap-6 md:mt-4">
              {[
                ['My Role',  'Product Designer / UX'],
                ['Type',     'Design Tool (Concept)'],
                ['Stack',    'Figma · Claude API · React'],
                ['Status',   'In Development'],
              ].map(([k, v]) => (
                <div key={k} className="border-t pt-5" style={{ borderColor: BORDER }}>
                  <p className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: MUTED }}>{k}</p>
                  <p className="text-sm font-medium" style={{ color: ACCENT }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero thumbnail */}
          <div className="mt-14 rounded-2xl overflow-hidden" style={{ border: `0.5px solid ${BORDER}` }}>
            <Placeholder label="[ Huesta — hero banner / product overview screenshot ]" aspect="aspect-[16/5]" />
          </div>
        </section>

        {/* ── PROBLEM / SOLUTION ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: MUTED }}>The Problem</p>
              <h2 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">
                The login wall that kills creative momentum.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Every designer knows the feeling: you&apos;re starting a project and you need references, a colour direction, a vibe. So you open Pinterest, Behance, Coolors, Google Fonts. You find one, like it, and the first thing you see is a login wall. You close the tab. That moment of friction kills creative momentum.
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: MUTED }}>The Solution</p>
              <h2
                className="text-3xl md:text-4xl mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                Huesta<span style={{ color: ACCENT }}>.</span>
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Existing tools are either too complex or too generic. There was nothing in the middle. Something fast, visual, and shareable that respected your time and let you just start. No account needed to create. No setup. Just input a vibe and get something back in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto" style={{ borderTop: `0.5px solid ${BORDER}` }} />

        {/* ── DESIGN PROCESS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-14" style={{ color: MUTED }}>Design Process</p>
          <p className="text-base mb-14 max-w-2xl" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Design came before code. Before writing a single line, two distinct card layouts were sketched out in Figma as wireframes, but it actually said designs that respected your time and let the product speak to its purpose.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Layout 1 */}
            <div>
              <Placeholder label="[ Layout 1 — Dark & Minimal wireframe ]" aspect="aspect-[4/3]" />
              <div className="mt-6">
                <p className="text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Layout 1</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Dark &amp; Minimal — tiles that are structured, dark background, typography forward. For the user who wants design as-the-point inspiration without noise.
                </p>
              </div>
            </div>
            {/* Layout 2 */}
            <div>
              <Placeholder label="[ Layout 2 — Expressive & Colorful wireframe ]" aspect="aspect-[4/3]" />
              <div className="mt-6">
                <p className="text-sm font-medium mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>Layout 2</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Expressive &amp; Colorful — playful returns, aquatic and vibrant vibes. Mood images, dynamic compositions, organic color swatches. Designed not just as a template, but as something worth keeping closer to an art piece than a utility card.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto" style={{ borderTop: `0.5px solid ${BORDER}` }} />

        {/* ── HOW IT WORKS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-4" style={{ color: MUTED }}>How it works</p>
          <p className="text-base mb-14" style={{ color: 'rgba(255,255,255,0.45)' }}>
            A single API generates an endpoint that and returns three external APIs.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0" style={{ borderTop: `0.5px solid ${BORDER}`, borderBottom: `0.5px solid ${BORDER}` }}>
            {[
              { n: '01', title: 'Input',    body: 'User types a keyword, describes a mood, or uploads a reference image.' },
              { n: '02', title: 'Prompt',   body: 'The input fires to the Claude API. It returns structured JSON — colors, typography, layout direction.' },
              { n: '03', title: 'Generate', body: 'Claude decides the fonts, a color palette, and selects images via Unsplash to bring the vibe to life.' },
              { n: '04', title: 'Output',   body: 'Layout is rendered and injected client-side based on the style. The user gets a shareable kit in seconds.' },
            ].map(({ n, title, body }, i) => (
              <div
                key={i}
                className="py-8 px-6"
                style={{ borderRight: i < 3 ? `0.5px solid ${BORDER}` : 'none' }}
              >
                <p className="text-xs tracking-[0.2em] mb-4" style={{ color: MUTED }}>{n}</p>
                <p className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: ACCENT }}>{title}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYSTEM ARCHITECTURE ── */}
        <section className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-8" style={{ color: MUTED }}>System Architecture</p>
          <div
            className="rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: CARD, border: `0.5px solid ${BORDER}`, minHeight: '280px' }}
          >
            <Placeholder label="[ System architecture diagram ]" aspect="aspect-[16/5]" />
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto" style={{ borderTop: `0.5px solid ${BORDER}` }} />

        {/* ── SELECTED OUTPUTS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-14" style={{ color: MUTED }}>Selected Outputs</p>

          <div className="flex flex-col gap-5">

            {/* Card 1 — Keyword Search */}
            <RevealCard
              label="Keyword Search"
              inputContent={
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-5" style={{ color: MUTED }}>Search</p>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: DARK, border: `0.5px solid ${BORDER}` }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="6" cy="6" r="4.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
                      <path d="M9.5 9.5L12 12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>chromatic chaos</span>
                    <span className="ml-auto w-0.5 h-4 rounded-full animate-pulse" style={{ background: ACCENT }} />
                  </div>
                  <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    Press Enter to generate your kit
                  </p>
                </div>
              }
              outputContent={
                <div className="p-6 h-full flex flex-col gap-3 justify-center">
                  <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: MUTED }}>Output Kit</p>
                  <Placeholder label="[ Chromatic Chaos — output kit thumbnail ]" aspect="aspect-square" />
                </div>
              }
            />

            {/* Card 2 — Talk to AI */}
            <RevealCard
              label="Talk to AI"
              inputContent={
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-5" style={{ color: MUTED }}>Describe your vibe</p>
                  <div
                    className="rounded-xl p-4"
                    style={{ background: DARK, border: `0.5px solid ${BORDER}` }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: '#2a2420' }}>
                        <span style={{ fontSize: 10, color: ACCENT }}>U</span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        something that feels like a warm golden sunset on the beach
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-3" style={{ borderTop: `0.5px solid ${BORDER}` }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: ACCENT, opacity: 0.8 }}>
                        <span style={{ fontSize: 9, color: DARK }}>H</span>
                      </div>
                      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Huesta is thinking…</span>
                    </div>
                  </div>
                </div>
              }
              outputContent={
                <div className="p-6 h-full flex flex-col gap-3 justify-center">
                  <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: MUTED }}>Output Kit</p>
                  <Placeholder label="[ Golden Shore — output kit thumbnail ]" aspect="aspect-square" />
                </div>
              }
            />

            {/* Card 3 — Image Upload */}
            <RevealCard
              label="Image Upload"
              inputContent={
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase mb-5" style={{ color: MUTED }}>Reference images</p>
                  <div className="grid grid-cols-3 gap-2">
                    <Placeholder label="[ Ref 1 ]" aspect="aspect-square" />
                    <Placeholder label="[ Ref 2 ]" aspect="aspect-square" />
                    <Placeholder label="[ Ref 3 ]" aspect="aspect-square" />
                  </div>
                  <p className="text-xs mt-3" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    3 images uploaded · analysing palette
                  </p>
                </div>
              }
              outputContent={
                <div className="p-6 h-full flex flex-col gap-3 justify-center">
                  <p className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: MUTED }}>Generated Kit</p>
                  <Placeholder label="[ Image-derived kit thumbnail ]" aspect="aspect-square" />
                </div>
              }
            />

          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto" style={{ borderTop: `0.5px solid ${BORDER}` }} />

        {/* ── DESIGN DECISIONS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-14" style={{ color: MUTED }}>Design Decisions</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                n: '01',
                title: 'No login by default.',
                body: 'Login walls kill creative momentum. Accounts are optional, only if you want to save. This single decision defines the product\'s personality.',
              },
              {
                n: '02',
                title: 'A prompt always shows generic output.',
                body: 'A snapshot always shows generic output regardless of input. This dark interface also helps frame the product as playful and expressive always. Output always feels intentional.',
              },
              {
                n: '03',
                title: 'Design output first.',
                body: 'Every design decision figures before touching code. Every API choice served a design goal. The result looks designed, not generated.',
              },
            ].map(({ n, title, body }) => (
              <div key={n}>
                <p className="text-xs tracking-[0.2em] mb-5" style={{ color: ACCENT, opacity: 0.6 }}>{n}</p>
                <p
                  className="text-base font-medium mb-3 leading-snug"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto" style={{ borderTop: `0.5px solid ${BORDER}` }} />

        {/* ── WHAT'S NEXT ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.25em] uppercase mb-14" style={{ color: MUTED }}>What&apos;s Next</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              {
                title: 'Build Your Own',
                body: 'Users get a layout template and can swap in their own images, colors, and fonts. No more constraints, not their direction but need the structure.',
              },
              {
                title: 'More Layouts',
                body: 'Expanding beyond two templates to cover more aesthetic territories: editorial, maximalist, minimal grid, and more.',
              },
              {
                title: 'Saved Items',
                body: 'Optional accounts to build a personal library of design kits over time.',
              },
              {
                title: 'Profile Library',
                body: 'Share or design communities like Dribbble, Twitter, Product Hunt. Getting feedback from real users.',
              },
            ].map(({ title, body }, i) => (
              <div
                key={title}
                className="py-8 pr-0 md:pr-12"
                style={{
                  borderTop: `0.5px solid ${BORDER}`,
                  borderRight: i % 2 === 0 ? `0.5px solid ${BORDER}` : 'none',
                  paddingLeft: i % 2 === 1 ? '3rem' : 0,
                }}
              >
                <p className="text-sm font-semibold mb-3 uppercase tracking-wide" style={{ color: ACCENT }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <div className="max-w-7xl mx-auto" style={{ borderTop: `0.5px solid ${BORDER}` }} />

        {/* ── WHAT I LEARNED ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: MUTED }}>What I Learned</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Huesta taught me a lot about AI product design. The hardest part wasn&apos;t the code, it was actually prompt engineering. Getting Claude to consistently return an accurate JSON with coherent font choices, color keywords, and the right layout decision required dozens of iterations. Small changes in phrasing produce wildly different outputs.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="px-6 md:px-10 py-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6" style={{ borderTop: `0.5px solid ${BORDER}` }}>
          <span className="text-sm font-bold tracking-[0.2em]" style={{ color: '#fff' }}>HUESTA</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {[
              ['Email',    'mailto:saiywetphoneaung@gmail.com'],
              ['Figma',    'https://www.figma.com/@saiywetphoneaun'],
              ['GitHub',   'https://github.com/CoronaZoro'],
              ['LinkedIn', 'https://www.linkedin.com/in/randy-dawn-tai'],
              ['Resume',   'https://drive.google.com/file/d/1OWxUnSVfwJn90_0oTy-BFM9wTw_Dr0zV/preview'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)' }}
              >
                {label}
              </a>
            ))}
          </div>
        </footer>

      </main>
    </>
  )
}
