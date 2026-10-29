'use client'

import { useState, useRef } from 'react'
import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'
import KitCard from './KitCard'

const DARK    = '#0A0A0A'
const CARD    = '#111111'
const BORDER  = '#222222'
const MUTED   = 'var(--color-muted)' // was #666 (3.3:1 on CARD); token passes
const RAINBOW = 'conic-gradient(from 0deg, #ff0000, #ff8800, #ffff00, #00cc00, #0088ff, #8800ff, #ff0000)'

/* ── Book-open reveal card ───────────────────────────────────────── */
function RevealCard({ label, inputContent, outputContent }) {
  const [open, setOpen]             = useState(false)
  const [interacted, setInteracted] = useState(false)
  // Mobile only: 'input' | 'output'
  const [mobileView, setMobileView] = useState('input')

  function handleDesktopClick() {
    setOpen(o => !o)
    if (!interacted) setInteracted(true)
  }

  function handleMobileReveal(e) {
    e.stopPropagation()
    setMobileView('output')
  }

  function handleMobileBack(e) {
    e.stopPropagation()
    setMobileView('input')
  }

  return (
    <div
      className="relative rounded-2xl overflow-hidden select-none"
      style={{ background: CARD }}
    >
      {/* Card label */}
      <span
        className="absolute top-5 left-6 text-body font-medium text-ink z-10 pointer-events-none"
      >
        {label}
      </span>

      {/* ── Mobile layout (below md) ─────────────────────────── */}
      <div className="md:hidden" style={{ minHeight: '220px' }}>

        {/* Input view */}
        <div
          className={`flex flex-col justify-center p-6 pt-14 cursor-pointer ${mobileView === 'output' ? 'hidden' : 'block'}`}
          onClick={handleMobileReveal}
        >
          {inputContent}
          <p className="text-body text-muted mt-5">
            Tap to reveal →
          </p>
        </div>

        {/* Output view */}
        <div className={mobileView === 'output' ? 'block' : 'hidden'}>
          {/* Back button */}
          <button
            onClick={handleMobileBack}
            className="absolute top-4 right-5 z-20 text-body text-muted hover:text-ink"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            ← Back
          </button>
          <div className="p-6 pt-14">
            {outputContent}
          </div>
        </div>

      </div>

      {/* ── Desktop layout (md+) — unchanged book-open animation ─ */}
      <div
        className="hidden md:flex cursor-pointer"
        style={{ minHeight: '220px' }}
        onClick={handleDesktopClick}
      >
        {/* Input panel — shrinks when open */}
        <div
          className="flex flex-col justify-center p-8 pt-14 overflow-hidden flex-shrink-0"
          style={{
            width: open ? '50%' : '100%',
            transition: 'width 400ms ease-in-out',
          }}
        >
          {inputContent}
        </div>

        {/* Output panel — book-open animation */}
        <div
          className="overflow-hidden flex-shrink-0"
          style={{
            background: '#171717', // one tone step from CARD marks the fold
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

      {/* Click hint — desktop only, fades after first interaction */}
      <span
        className="hidden md:block absolute bottom-4 right-5 text-body text-muted pointer-events-none transition-opacity duration-500"
        style={{ opacity: interacted ? 0 : 1 }}
      >
        Click to reveal →
      </span>
    </div>
  )
}

/* ── Try Huesta interactive section ─────────────────────────────── */
function TryHuesta() {
  const [prompt,      setPrompt]      = useState('')
  const [kit,         setKit]         = useState(null)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState(null)
  const [downloading, setDownloading] = useState(false)
  // Mobile only: 'input' | 'output'
  const [mobileView,  setMobileView]  = useState('input')

  const inputRef          = useRef(null)
  const resultRef         = useRef(null)
  const kitCardMobileRef  = useRef(null)   // used by download on mobile
  const kitCardDesktopRef = useRef(null)   // used by download on desktop

  async function handleGenerate(e) {
    e?.preventDefault()
    const val = prompt.trim()
    if (!val || loading) return
    setLoading(true)
    setError(null)
    setKit(null)
    try {
      const res  = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: val, mode: 'search' }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Generation failed.')
      setKit(data.kit)
      setMobileView('output')   // mobile: switch to output view on success
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function handleClear() {
    setKit(null)
    setPrompt('')
    setMobileView('input')
    inputRef.current?.focus()
  }

  async function handleDownload() {
    // Pick the ref for whichever layout is currently visible
    const targetRef = (typeof window !== 'undefined' && window.innerWidth < 768)
      ? kitCardMobileRef
      : kitCardDesktopRef
    if (!targetRef.current || downloading) return
    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      await document.fonts.ready
      const canvas = await html2canvas(targetRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false,
      })
      const url  = canvas.toDataURL('image/png')
      const name = `huesta-${(kit.vibeName ?? 'kit').toLowerCase().replace(/\s+/g, '-')}.png`
      const a    = document.createElement('a')
      a.href     = url
      a.download = name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      console.error('[huesta download]', err)
    } finally {
      setDownloading(false)
    }
  }

  // Reusable download button markup
  const DownloadBtn = (
    <button
      onClick={handleDownload}
      disabled={downloading}
      style={{
        background: downloading ? CARD : '#fff',
        border: `0.5px solid ${downloading ? BORDER : 'transparent'}`,
        borderRadius: 999,
        color: downloading ? MUTED : DARK,
        fontSize: 16,
        fontWeight: 500,
        padding: '4px 16px',
        cursor: downloading ? 'not-allowed' : 'pointer',
        fontFamily: 'inherit',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        transition: 'background 0.15s, color 0.15s',
      }}
    >
      {downloading ? 'Saving…' : (
        <>
          <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
            <path d="M5.5 1v6M2.5 5l3 3 3-3M1 9.5h9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download PNG
        </>
      )}
    </button>
  )

  const ClearBtn = (
    <button
      onClick={handleClear}
      style={{
        background: 'none',
        border: 'none',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 999,
        color: 'var(--color-soft)',
        fontSize: 16,
        padding: '4px 16px',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      Clear
    </button>
  )

  return (
    <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

      {/* Heading — always visible */}
      <div className="mb-12">
        <h2
          className="flex items-baseline gap-1.5 mb-4 text-head text-ink"
          style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
        >
          Try Huesta
          <span style={{
            display: 'inline-block',
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: RAINBOW,
            marginBottom: 6,
            flexShrink: 0,
          }} />
        </h2>
        <p className="text-body text-soft max-w-[48ch]">
          Type a vibe, a mood, an aesthetic. Claude picks the colours, fonts, and images.
        </p>
      </div>

      {/* ── Mobile layout (below md) ─────────────────────────────── */}
      <div className="md:hidden">

        {/* Input view — visible until kit is generated */}
        <div className={mobileView === 'output' ? 'hidden' : 'block'}>
          <form onSubmit={handleGenerate} style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: CARD,
              border: `0.5px solid ${BORDER}`,
              borderRadius: 12,
              padding: '14px 18px',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="6" cy="6" r="4.5" stroke={MUTED} strokeWidth="1.2"/>
                <path d="M9.5 9.5L12 12" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input
                type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="sunset at the shore…"
                disabled={loading}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--color-ink)',
                  fontSize: 16,
                  fontFamily: 'inherit',
                  opacity: loading ? 0.5 : 1,
                }}
              />
              {!prompt && !loading && (
                <span className="animate-pulse" style={{ width: 1.5, height: 16, background: 'rgba(255,255,255,0.3)', borderRadius: 1, flexShrink: 0 }} />
              )}
            </div>
            <button
              type="submit"
              disabled={!prompt.trim() || loading}
              style={{
                background: loading ? CARD : '#fff',
                color: loading ? MUTED : DARK,
                border: `0.5px solid ${loading ? BORDER : 'transparent'}`,
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 500,
                padding: '0 18px',
                cursor: !prompt.trim() || loading ? 'not-allowed' : 'pointer',
                opacity: !prompt.trim() ? 0.45 : 1,
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {loading ? '…' : 'Generate'}
            </button>
          </form>

          {loading && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, color: MUTED, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="animate-pulse" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: MUTED }} />
                Claude is crafting your kit…
              </div>
            </div>
          )}
          {error && (
            <p style={{ fontSize: 16, color: '#ff6b5e', marginBottom: 24 }}>⚠ {error}</p>
          )}
        </div>

        {/* Output view — shown after kit is generated */}
        {kit && (
          <div className={mobileView === 'output' ? 'block' : 'hidden'}>
            {/* Action row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => setMobileView('input')}
                style={{
                  background: 'none',
                  border: 'none',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 999,
                  color: 'var(--color-soft)',
                  fontSize: 16,
                  padding: '4px 16px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                ← Back
              </button>
              <p style={{ fontSize: 16, color: MUTED, margin: 0 }}>
                Layout {kit.layout}
              </p>
              {DownloadBtn}
              {ClearBtn}
            </div>
            {/* Card — horizontally scrollable so full desktop layout is visible */}
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div ref={kitCardMobileRef} style={{ minWidth: 580 }}>
                <KitCard kit={kit} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Desktop layout (md+) — unchanged ────────────────────── */}
      <div className="hidden md:block">
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: 10, maxWidth: 600, marginBottom: 12 }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: CARD,
            border: `0.5px solid ${BORDER}`,
            borderRadius: 12,
            padding: '14px 18px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <circle cx="6" cy="6" r="4.5" stroke={MUTED} strokeWidth="1.2"/>
              <path d="M9.5 9.5L12 12" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="sunset at the shore, dark academia, neon tokyo…"
              disabled={loading}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--color-ink)',
                fontSize: 16,
                fontFamily: 'inherit',
                opacity: loading ? 0.5 : 1,
              }}
            />
            {!prompt && !loading && (
              <span className="animate-pulse" style={{ width: 1.5, height: 16, background: 'rgba(255,255,255,0.3)', borderRadius: 1, flexShrink: 0 }} />
            )}
          </div>
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            style={{
              background: loading ? CARD : '#fff',
              color: loading ? MUTED : DARK,
              border: `0.5px solid ${loading ? BORDER : 'transparent'}`,
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 500,
              padding: '0 24px',
              cursor: !prompt.trim() || loading ? 'not-allowed' : 'pointer',
              opacity: !prompt.trim() ? 0.45 : 1,
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s, color 0.15s',
              minWidth: 110,
            }}
          >
            {loading ? 'Generating…' : 'Generate Kit'}
          </button>
        </form>

        {loading && (
          <div style={{ maxWidth: 600, marginBottom: 32 }}>
            <div style={{ fontSize: 16, color: MUTED, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="animate-pulse" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: MUTED }} />
              Claude is crafting your kit — colours, fonts, images…
            </div>
          </div>
        )}
        {error && (
          <p style={{ fontSize: 16, color: '#ff6b5e', marginBottom: 24, maxWidth: 600 }}>
            ⚠ {error}
          </p>
        )}

        {kit && (
          <div ref={resultRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
              <p style={{ fontSize: 16, color: MUTED, margin: 0 }}>
                Generated kit · Layout {kit.layout}
              </p>
              {DownloadBtn}
              {ClearBtn}
            </div>
            <div ref={kitCardDesktopRef}>
              <KitCard kit={kit} />
            </div>
          </div>
        )}
      </div>

    </section>
  )
}

/* ── Page ────────────────────────────────────────────────────────── */
export default function HuestaPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 text-soft" style={{ background: DARK }}>

        {/* ── HERO ── */}
        <section className="px-6 md:px-10 pt-20 pb-0 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

            <div>
              <h1
                className="mb-5 flex items-baseline gap-1 text-display text-ink"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
              >
                Huesta
                {/* Rainbow dot — only rainbow usage */}
                <span
                  style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: RAINBOW,
                    marginBottom: '8px',
                    flexShrink: 0,
                  }}
                />
              </h1>
              <p className="text-body max-w-[40ch]">
                A zero-login design tool that generates complete UI kits — colour palettes, typography, and layout — from a keyword, a conversation, or a reference image.
              </p>
              <p className="text-body text-muted mt-4">AI product · Design tool</p>
            </div>

            {/* Metadata sidebar */}
            <dl className="flex flex-col gap-6 md:mt-4">
              {[
                ['Role',     'Product Designer / UX'],
                ['Type',     'Design tool (concept)'],
                ['Stack',    'Figma · Claude API · React'],
                ['Status',   'In development'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-body text-muted">{k}</dt>
                  <dd className="text-body font-medium text-ink mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Hero thumbnail */}
          <div className="mt-12 rounded-2xl overflow-hidden" style={{ background: DARK }}>
              <img
              src="/Huesta_banner.png"
              alt="Huesta Banner"
              className="w-full h-auto block"
              />
          </div>
        </section>

        {/* ── PROBLEM / SOLUTION ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-head font-medium text-ink mb-6">
                The login wall that kills creative momentum.
              </h2>
              <p className="text-body">
                Every designer knows the feeling: you&apos;re starting a project and you need references, a colour direction, a vibe. So you open Pinterest, Behance, Coolors, Google Fonts. You find one, like it, and the first thing you see is a login wall. You close the tab. That moment of friction kills creative momentum.
              </p>
            </div>
            <div>
              <h2
                className="text-head text-ink mb-6 flex items-baseline gap-1"
                style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}
              >
                Huesta
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: RAINBOW,
                    marginBottom: '5px',
                    flexShrink: 0,
                  }}
                />
              </h2>
              <p className="text-body">
                Existing tools are either too complex or too generic. There was nothing in the middle. Something fast, visual, and shareable that respected your time and let you just start. No account needed to create. No setup. Just input a vibe and get something back in seconds.
              </p>
            </div>
          </div>
        </section>


        {/* ── DESIGN PROCESS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <h2 className="font-heading text-head font-medium text-ink mb-10">Design process</h2>
          <p className="text-body mb-10 max-w-[64ch]">
            Before writing a single line, two distinct card layouts were sketched out in Figma as wireframes. 
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img
                  src="/layout_1.png"
                  alt="Dark and Minimal Wireframe"
                  className="w-full aspect-[4/3] object-contain rounded-xl"
                  style={{ background: CARD }}
                  />
              <div className="mt-6">
                <h3 className="text-lead font-medium text-ink mb-2">Layout 1</h3>
                <p className="text-body">
                  Dark &amp; Minimal — tiles that are structured, dark background, typography forward. For the user who wants just wants inspiration without noise.
                </p>
              </div>
            </div>
            <div>
              <img
                src="/layout_2.png"
                alt="Expressive and Colorful Wireframe"
                className="w-full aspect-[4/3] object-contain rounded-xl"
                style={{ background: CARD }}
              />
              <div className="mt-6">
                <h3 className="text-lead font-medium text-ink mb-2">Layout 2</h3>
                <p className="text-body">
                  Expressive &amp; Colorful — playful returns, aquatic and vibrant vibes. Mood images, dynamic compositions, organic color swatches. Something worth keeping closer to an art piece than a utility card.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ── HOW IT WORKS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <h2 className="font-heading text-head font-medium text-ink mb-4">How it works</h2>
          <p className="text-body mb-10">
            A single API endpoint returns three external APIs working in concert.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { title: 'Input',    body: 'User types a keyword, describes a mood, or uploads a reference image.' },
              { title: 'Prompt',   body: 'The input fires to the Claude API. It returns structured JSON such as colors, typography, layout direction.' },
              { title: 'Generate', body: 'Claude decides the fonts, a color palette, and selects images via Unsplash to bring the vibe to life.' },
              { title: 'Output',   body: 'Layout is rendered and injected client-side based on the style. The user gets a shareable kit in seconds.' },
            ].map(({ title, body }) => (
              <div key={title} className="p-6 rounded-2xl" style={{ background: CARD }}>
                <h3 className="text-lead font-medium text-ink mb-3">{title}</h3>
                <p className="text-body">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SYSTEM ARCHITECTURE ── */}
        <section className="px-6 md:px-10 pb-20 max-w-7xl mx-auto">
          <h2 className="font-heading text-head font-medium text-ink mb-8">System architecture</h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: CARD }}
          >
            <img 
              src="/System_architecture.svg" 
              alt="System architecture" 
              className="w-full aspect-[16/9] object-contain" 
            />
          </div>
        </section>


        {/* ── SELECTED OUTPUTS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <h2 className="font-heading text-head font-medium text-ink mb-10">Selected outputs</h2>

          <div className="flex flex-col gap-5">

            {/* Card 1 — Keyword Search */}
            <RevealCard
              label="Keyword Search"
              inputContent={
                <div>
                  <p className="text-body text-muted mb-4">Search</p>
                  <div
                    className="flex items-center gap-3 rounded-xl px-4 py-3"
                    style={{ background: DARK }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="6" cy="6" r="4.5" stroke={MUTED} strokeWidth="1.2"/>
                      <path d="M9.5 9.5L12 12" stroke={MUTED} strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-body text-ink">sunset at the shore</span>
                    <span className="ml-auto w-0.5 h-4 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.4)' }} />
                  </div>
                  <p className="text-body text-muted mt-4">
                    Press Enter to generate your kit
                  </p>
                </div>
              }
              outputContent={
                <div className="p-6 h-full flex flex-col gap-3 justify-center">
                  <p className="text-body text-muted mb-2">Output kit</p>
                  <img 
                  src="/search_output.png" 
                  alt="search output" 
                  className="w-full h-auto object-cover" 
                  aspect="aspect-square" />
                </div>
              }
            />

            {/* Card 2 — Talk to AI */}
            <RevealCard
              label="Talk to AI"
              inputContent={
                <div>
                  <p className="text-body text-muted mb-4">Describe your vibe</p>
                  <div
                    className="rounded-xl p-4"
                    style={{ background: DARK, border: `0.5px solid ${BORDER}` }}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: BORDER }}>
                        <span style={{ fontSize: 12, color: '#fff' }}>U</span>
                      </div>
                      <p className="text-body text-ink">
                        morning breakfast with a beautiful view. The weather is warm and sunny
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-3" style={{ borderTop: `0.5px solid ${BORDER}` }}>
                      <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: CARD, border: `0.5px solid ${BORDER}` }}>
                        <span style={{ fontSize: 12, color: MUTED }}>H</span>
                      </div>
                      <span className="text-body text-muted">Huesta is thinking…</span>
                    </div>
                  </div>
                </div>
              }
              outputContent={
                <div className="p-6 h-full flex flex-col gap-3 justify-center">
                  <p className="text-body text-muted mb-2">Output kit</p>
                  <img 
                  src="/talkai_output.png" 
                  alt="talkai output" 
                  className="w-full h-auto object-cover" 
                  aspect="aspect-square" />
                </div>
              }
            />

            {/* Card 3 — Image Upload */}
            <RevealCard
              label="Image Upload"
              inputContent={
                <div>
                  <p className="text-body text-muted mb-4">Reference images</p>
                  <div className="grid grid-cols-3 gap-2">
                    <img src="/reference_1.jpg" alt="reference 1" className="w-full aspect-full object-contain rounded-lg" />
                    <img src="/reference_2.jpg" alt="reference 2" className="w-full aspect-full object-contain rounded-lg" />
                    <img src="/reference_3.jpg" alt="reference 3" className="w-full aspect-full object-contain rounded-lg" />
                  </div>
                  <p className="text-body text-muted mt-3">
                    3 images uploaded · analysing palette
                  </p>
                </div>
              }
              outputContent={
                <div className="p-6 h-full flex flex-col gap-3 justify-center">
                  <p className="text-body text-muted mb-2">Generated kit</p>
                  <img 
                    src="/upload_output.png" 
                    alt="upload output" 
                    className="w-full h-auto object-cover" 
                    aspect="aspect-square"
                  />
                </div>
              }
            />

          </div>
        </section>

        {/* ── TRY HUESTA ── */}
        <TryHuesta />


        {/* ── DESIGN DECISIONS ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <h2 className="font-heading text-head font-medium text-ink mb-10">How the algorithm works</h2>
          <div className="flex flex-col">
            {[
              {
                title: 'Structured JSON as the contract',
                body: "Claude doesn't return free-form text, it returns a strict JSON object every time. The prompt defines the exact shape: vibe name, hashtag array, layout decision, font pair, color keywords, and Unsplash search terms. This contract between the prompt and the frontend is what makes the output predictable and renderable. Getting Claude to respect this structure consistently required many iterations from small prompt changes would break the JSON format entirely.",
              },
              {
                title: 'Claude decides the layout',
                body: 'The prompt instructs Claude to assign either Layout 1 or Layout 2 based on the vibe. Dark, editorial, minimal, and luxury vibes get Layout 1. Playful, nature, colorful, and expressive vibes get Layout 2. This decision is baked into the prompt logic. Claude reads the mood it just interpreted and maps it to the right visual container. The result is an output that always feels coherent rather than a template the user had to pick themselves.',
              },
              {
                title: 'Color keywords, not hex codes',
                body: 'Early versions asked Claude to generate hex color codes directly. The results were inconsistent and often clashed badly. The fix was to ask Claude for descriptive color keywords instead, "deep navy", "warm sand", "burnt orange" and pass those to chroma.js which generates a harmonious 5-color palette. Separating the creative interpretation from the technical color generation made both better.',
              },
            ].map(({ title, body }) => (
              <div key={title} className="py-8 max-w-[72ch]">
                <div>
                  <h3 className="text-lead font-medium text-ink mb-3">
                    {title}
                  </h3>
                  <p className="text-body">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ── WHAT'S NEXT ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <h2 className="font-heading text-head font-medium text-ink mb-10">What&apos;s next</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              {
                title: 'Build your own',
                body: 'Users get a layout template and can swap in their own images, colors, and fonts. Structure without constraint.',
              },
              {
                title: 'More layouts',
                body: 'Expanding beyond two templates to cover more aesthetic territories: editorial, maximalist, minimal grid, and more.',
              },
              {
                title: 'Saved items',
                body: 'Optional accounts to build a personal library of design kits over time.',
              },
              {
                title: 'Profile library',
                body: 'Share to communities like Dribbble, Twitter, Product Hunt. Getting real feedback from real users.',
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="text-lead font-medium text-ink mb-3">{title}</h3>
                <p className="text-body">{body}</p>
              </div>
            ))}
          </div>
        </section>


        {/* ── WHAT I LEARNED ── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h2 className="font-heading text-head font-medium text-ink">What I learned</h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-body">
                Huesta taught me a lot about AI product design. The hardest part wasn&apos;t the code it was actually prompt engineering. Getting Claude to consistently return accurate JSON with coherent font choices, color keywords, and the right layout direction required dozens of iterations. Small changes in phrasing produce wildly different outputs.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: CARD }}>
          <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <span className="text-lead text-ink" style={{ fontFamily: 'var(--font-serif)' }}>Huesta</span>
            <FooterIcons figmaHref="https://www.figma.com/@saiywetphoneaun" />
          </div>
        </footer>

      </main>
    </>
  )
}
