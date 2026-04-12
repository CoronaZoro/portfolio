'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Navbar from '../../components/Navbar'

const screens = [
  { src: '/HomePage-v2.png',    label: 'Landing Page — Bouzeur' },
  { src: '/Product.png',     label: 'Product Page — Bouzeur' },
  { src: '/ShoppingBag.png', label: 'Shopping Bag — Bouzeur' },
  { src: '/Tracker.png',     label: 'Order Tracker — Bouzeur' },
]

// ── Lightbox with slider zoom ───────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext }) {
  const screen = screens[index]
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const offsetAtDrag = useRef({ x: 0, y: 0 })

  const resetZoom = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
  }, [])

  useEffect(() => { resetZoom() }, [index, resetZoom])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') { resetZoom(); onPrev() }
      if (e.key === 'ArrowRight') { resetZoom(); onNext() }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext, resetZoom])

  const handleMouseDown = useCallback((e) => {
    if (scale <= 1) return
    e.preventDefault()
    isDragging.current = true
    dragStart.current = { x: e.clientX, y: e.clientY }
    offsetAtDrag.current = { ...offset }
  }, [scale, offset])

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return
    setOffset({
      x: offsetAtDrag.current.x + (e.clientX - dragStart.current.x),
      y: offsetAtDrag.current.y + (e.clientY - dragStart.current.y),
    })
  }, [])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleSlider = useCallback((e) => {
    const val = parseFloat(e.target.value)
    setScale(val)
    if (val === 1) setOffset({ x: 0, y: 0 })
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.92)', animation: 'fadeIn 0.25s ease forwards' }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="relative flex flex-col md:flex-row md:items-center md:justify-between px-5 md:px-10 py-4 flex-shrink-0 gap-3"
        style={{ borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Label */}
        <span className="text-xs tracking-[0.2em] uppercase pr-10 md:pr-0" style={{ color: 'rgba(255,255,255,0.35)' }}>
          {screen.label}
        </span>

        {/* Zoom slider */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { const v = Math.max(1, parseFloat((scale - 0.1).toFixed(2))); setScale(v); if (v === 1) setOffset({ x: 0, y: 0 }) }}
            className="text-xs tracking-widest"
            style={{ color: 'rgba(255,255,255,0.4)', width: 20, textAlign: 'center' }}
          >−</button>
          <input
            type="range" min="1" max="2" step="0.02" value={scale} onChange={handleSlider}
            style={{ flex: 1, maxWidth: 160, accentColor: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
          />
          <button
            onClick={() => setScale((v) => Math.min(2, parseFloat((v + 0.1).toFixed(2))))}
            className="text-xs tracking-widest"
            style={{ color: 'rgba(255,255,255,0.4)', width: 20, textAlign: 'center' }}
          >+</button>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)', minWidth: 36 }}>
            {Math.round(scale * 100)}%
          </span>
        </div>

        {/* Close — absolute top-right always visible */}
        <button
          className="absolute top-3 right-4 flex items-center justify-center"
          style={{ width: 32, height: 32, border: '0.5px solid rgba(255,255,255,0.25)', borderRadius: '50%' }}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <line x1="1" y1="1" x2="11" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
            <line x1="11" y1="1" x2="1" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
          </svg>
        </button>
      </div>

      {/* ── Image area (scrollable) ── */}
      <div
        className="flex-1 overflow-auto flex items-start justify-center"
        style={{ padding: '40px 0', cursor: scale > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default' }}
        onClick={onClose}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          src={screen.src}
          alt={screen.label}
          draggable={false}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: `${scale * 85}vw`,
            maxWidth: `${scale * 1000}px`,
            objectFit: 'contain',
            display: 'block',
            transform: scale > 1 ? `translate(${offset.x / scale}px, ${offset.y / scale}px)` : 'none',
            transition: isDragging.current ? 'none' : 'width 0.15s ease, max-width 0.15s ease',
            userSelect: 'none',
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex items-center justify-between px-10 py-5 flex-shrink-0"
        style={{ borderTop: '0.5px solid rgba(255,255,255,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => { resetZoom(); onPrev() }}
            className="text-xs tracking-[0.25em] uppercase hover:text-white transition-colors"
            style={{ border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 2, padding: '6px 14px', color: 'rgba(255,255,255,0.4)' }}
          >
            ← Prev
          </button>
          <button
            onClick={() => { resetZoom(); onNext() }}
            className="text-xs tracking-[0.25em] uppercase hover:text-white transition-colors"
            style={{ border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 2, padding: '6px 14px', color: 'rgba(255,255,255,0.4)' }}
          >
            Next →
          </button>
        </div>
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {index + 1} / {screens.length}
        </span>
      </div>
    </div>
  )
}

// ── Screen grid (2-col) ──────────────────────────────────────────────
function ScreenGrid({ onOpen }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className="grid grid-cols-2 gap-5">
      {screens.map((screen, i) => (
        <div
          key={i}
          className="relative overflow-hidden cursor-pointer"
          style={{ borderRadius: 6, border: '0.5px solid rgba(255,255,255,0.1)', background: '#f5f1ea' }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onOpen(i)}
        >
          <img
            src={screen.src}
            alt={screen.label}
            className="w-full"
            style={{ height: 320, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
            style={{ background: 'rgba(0,0,0,0.6)', opacity: hoveredIndex === i ? 1 : 0 }}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: 40, height: 40, border: '0.5px solid rgba(255,255,255,0.5)', borderRadius: '50%' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1"/>
                <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1"/>
              </svg>
            </div>
            <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>Expand</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────
export default function BouzerPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const openLightbox  = useCallback((i) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevScreen    = useCallback(() => setLightboxIndex((i) => (i - 1 + screens.length) % screens.length), [])
  const nextScreen    = useCallback(() => setLightboxIndex((i) => (i + 1) % screens.length), [])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const CREAM = '#e8e2d5'
  const DARK  = '#0e0c0a'
  const GOLD  = '#b8933a'

  return (
    <>
      <Navbar />
      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={closeLightbox} onPrev={prevScreen} onNext={nextScreen} />
      )}

      <main className="pt-16" style={{ fontFamily: 'var(--font-sans)' }}>

        {/* ── HERO — dark ── */}
        <section style={{ background: DARK, color: '#fff' }}>
          <div className="px-6 md:px-10 pt-20 pb-16 max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase mb-10" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Brand Design | UI/UX Design
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Left */}
              <div>
                <h1 className="mb-3" style={{ fontFamily: 'var(--font-serif)', fontSize: '4rem', lineHeight: 1, fontWeight: 400, letterSpacing: '0.02em' }}>
                  BOUZEUR
                </h1>
                <p className="mb-6" style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', lineHeight: 1.1, fontStyle: 'italic', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
                  Luxury Redefined
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 280 }}>
                  A concept luxury perfume brand designed to translate the tactile richness of high-end fragrance into a deliberate digital experience.
                </p>
              </div>
              {/* Right — stats grid */}
              <div className="grid grid-cols-2 gap-0" style={{ border: '0.5px solid rgba(255,255,255,0.12)' }}>
                {[
                  { label: 'My Role',     value: 'UI/UX Designer' },
                  { label: 'Type',        value: 'Concept Project' },
                  { label: 'Typography',  value: 'The Seasons | Satoshi' },
                  { label: 'Scope',       value: '4 screens | full flow' },
                ].map(({ label, value }, i) => (
                  <div
                    key={i}
                    className="p-5"
                    style={{
                      borderRight:  i % 2 === 0 ? '0.5px solid rgba(255,255,255,0.12)' : 'none',
                      borderBottom: i < 2        ? '0.5px solid rgba(255,255,255,0.12)' : 'none',
                    }}
                  >
                    <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>{label}</p>
                    <p className="text-sm" style={{ color: GOLD }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── OVERVIEW — cream ── */}
        <section style={{ background: CREAM }}>
          <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left */}
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(0, 0, 0, 0.75)' }}>Overview</p>
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', lineHeight: 1.1, color: '#111', fontWeight: 400 }}>
                A Brand Built,<br />Not a Problem<br />Solved.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)' }}>
                Bouzeur is a concept luxury perfume brand designed to capture the feeling of exclusivity and craftsmanship. Every screen had to feel like it belonged in the same universe from the hero down to the checkout button.
              </p>
            </div>
            {/* Right — pillars */}
            <div className="flex flex-col justify-center gap-0">
              {[
                { title: 'Brand Identity',    sub: 'Dark · Exclusivity · Intentional' },
                { title: 'Brand Direction',   sub: 'Pure Craftsmanship · Integrity' },
                { title: 'Screens',           sub: 'Landing · Product · Cart · Tracker' },
              ].map(({ title, sub }, i) => (
                <div key={i} className="py-6" style={{ borderTop: '0.5px solid rgba(0,0,0,0.15)' }}>
                  <p className="text-base font-medium mb-2" style={{ color: '#111' }}>{title}</p>
                  <p className="text-sm tracking-wide" style={{ color: 'rgba(0,0,0,0.5)' }}>{sub}</p>
                </div>
              ))}
              <div style={{ borderTop: '0.5px solid rgba(0,0,0,0.15)' }} />
            </div>
          </div>
        </section>

        {/* ── SELECTED SCREENS — dark ── */}
        <section style={{ background: DARK }}>
          <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase mb-10" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>Selected Screens</p>
            <ScreenGrid onOpen={openLightbox} />
          </div>
        </section>

        {/* ── DESIGN DECISIONS — cream ── */}
        <section style={{ background: CREAM }}>
          <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase mb-12" style={{ color: 'rgba(0,0,0,0.4)' }}>Design Decisions</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {[
                {
                  num: '01',
                  title: 'Dark Over Light',
                  body: 'The hero is dark because the product demanded it. Red silk and dark glass bottles needed a stage that matched their weight.',
                },
                {
                  num: '02',
                  title: 'Typography',
                  body: 'A regal serif paired with a modern sans-serif kept the brand from feeling too formal or too casual. The Seasons carries the luxury signal, Satoshi keeps it readable.',
                },
                {
                  num: '03',
                  title: 'Consistency as Craft',
                  body: 'At this level, inconsistency breaks the illusion. Every button, spacing unit, and type size had to feel part of the same deliberate system.',
                },
              ].map(({ num, title, body }, i) => (
                <div
                  key={i}
                  className="p-8"
                  style={{ borderLeft: '0.5px solid rgba(0,0,0,0.15)' }}
                >
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'rgba(0,0,0,0.15)', marginBottom: '1rem', lineHeight: 1 }}>{num}</p>
                  <p className="text-sm font-medium mb-3" style={{ color: GOLD, letterSpacing: '0.02em' }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)' }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT I LEARNED — dark ── */}
        <section style={{ background: DARK, color: '#fff' }}>
          <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-end justify-between">
            <div style={{ maxWidth: 520 }}>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>What I Learned</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Bouzeur was my first UI/UX project and it taught me that luxury design is mostly about what you leave out. Getting the spacing right, the type hierarchy consistent, and the visual mood coherent across every screen pushed me to think about design as a system rather than just individual pages.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.figma.com/design/5RK0oaIpFc1qAGMkXAO8uh/BOUZER-MOCKUP?node-id=0-1&t=BScyvY8dfhxcw8r3-1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-wide hover:opacity-70 transition-opacity"
                style={{ border: '0.5px solid rgba(255,255,255,0.35)', padding: '14px 28px', color: 'rgba(255,255,255,0.8)' }}
              >
                View Figma File →
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER — dark ── */}
        <footer style={{ background: DARK, borderTop: '0.5px solid rgba(255,255,255,0.1)' }}>
          <div className="px-6 md:px-10 py-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-sm font-bold tracking-[0.2em]" style={{ color: '#fff' }}>BOUZER</span>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {[
                { label: 'Email',    href: 'mailto:phonerandy7@gmail.com' },
                { label: 'Figma',    href: 'https://www.figma.com/design/5RK0oaIpFc1qAGMkXAO8uh/BOUZER-MOCKUP?node-id=0-1&t=BScyvY8dfhxcw8r3-1' },
                { label: 'GitHub',   href: 'https://github.com/CoronaZoro' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-ywet-phone-aung-053a55376/' },
                { label: 'Resume',   href: 'https://drive.google.com/file/d/1OWxUnSVfwJn90_0oTy-BFM9wTw_Dr0zV/preview' },
              ].map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}
