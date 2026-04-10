'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Navbar from '../../components/Navbar'

const screens = [
  { src: '/Home%20Page.png',    label: 'Home Page — Attend' },
  { src: '/Home%20Page-1.png',  label: 'Home Page Alt — Attend' },
  { src: '/Attendance.png',     label: 'Attendance View — Attend' },
  { src: '/Attendance%202.png', label: 'Attendance Detail — Attend' },
]

// ── Lightbox with slider zoom (same as Bouzeur) ─────────────────────
function Lightbox({ index, onClose, onPrev, onNext }) {
  const screen = screens[index]
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const offsetAtDrag = useRef({ x: 0, y: 0 })

  const resetZoom = useCallback(() => { setScale(1); setOffset({ x: 0, y: 0 }) }, [])

  useEffect(() => { resetZoom() }, [index, resetZoom])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  { resetZoom(); onPrev() }
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

  const handleMouseUp = useCallback(() => { isDragging.current = false }, [])

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
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-10 py-5 flex-shrink-0"
        style={{ borderBottom: '0.5px solid rgba(255,255,255,0.08)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.35)', minWidth: 200 }}>
          {screen.label}
        </span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => { const v = Math.max(1, parseFloat((scale - 0.1).toFixed(2))); setScale(v); if (v === 1) setOffset({ x: 0, y: 0 }) }}
            className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', width: 24, textAlign: 'center' }}
          >−</button>
          <input type="range" min="1" max="2" step="0.02" value={scale} onChange={handleSlider}
            style={{ width: 160, accentColor: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
          <button
            onClick={() => setScale((v) => Math.min(2, parseFloat((v + 0.1).toFixed(2))))}
            className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', width: 24, textAlign: 'center' }}
          >+</button>
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(255,255,255,0.3)', minWidth: 40 }}>
            {Math.round(scale * 100)}%
          </span>
        </div>
        <div className="flex items-center justify-end" style={{ minWidth: 200 }}>
          <button
            className="flex items-center justify-center"
            style={{ width: 36, height: 36, border: '0.5px solid rgba(255,255,255,0.25)', borderRadius: '50%' }}
            onClick={onClose} aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="1" y1="1" x2="11" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
              <line x1="11" y1="1" x2="1" y2="11" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Image area */}
      <div
        className="flex-1 overflow-auto flex items-start justify-center"
        style={{ padding: '40px 0', cursor: scale > 1 ? 'grab' : 'default' }}
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
            height: `${scale * 72}vh`,
            width: 'auto',
            maxWidth: '90vw',
            objectFit: 'contain',
            display: 'block',
            transform: scale > 1 ? `translate(${offset.x / scale}px, ${offset.y / scale}px)` : 'none',
            transition: isDragging.current ? 'none' : 'height 0.15s ease',
            userSelect: 'none',
            flexShrink: 0,
          }}
        />
      </div>

      {/* Bottom bar */}
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
          >← Prev</button>
          <button
            onClick={() => { resetZoom(); onNext() }}
            className="text-xs tracking-[0.25em] uppercase hover:text-white transition-colors"
            style={{ border: '0.5px solid rgba(255,255,255,0.2)', borderRadius: 2, padding: '6px 14px', color: 'rgba(255,255,255,0.4)' }}
          >Next →</button>
        </div>
        <span className="text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {index + 1} / {screens.length}
        </span>
      </div>
    </div>
  )
}

// ── Screen grid ─────────────────────────────────────────────────────
function ScreenGrid({ onOpen }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  return (
    <div className="grid grid-cols-2 gap-5">
      {screens.map((screen, i) => (
        <div
          key={i}
          className="relative overflow-hidden cursor-pointer"
          style={{ borderRadius: 6, border: '0.5px solid rgba(255,255,255,0.1)', background: '#f0f4f8' }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onOpen(i)}
        >
          <img
            src={screen.src}
            alt={screen.label}
            className="w-full"
            style={{ height: 340, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
          />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
            style={{ background: 'rgba(0,0,0,0.6)', opacity: hoveredIndex === i ? 1 : 0 }}
          >
            <div className="flex items-center justify-center"
              style={{ width: 40, height: 40, border: '0.5px solid rgba(255,255,255,0.5)', borderRadius: '50%' }}>
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
export default function AttendPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const openLightbox  = useCallback((i) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevScreen    = useCallback(() => setLightboxIndex((i) => (i - 1 + screens.length) % screens.length), [])
  const nextScreen    = useCallback(() => setLightboxIndex((i) => (i + 1) % screens.length), [])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  const DARK  = '#000211'
  const LIGHT = '#d4dfe9'
  const BLUE  = '#4472c4'

  return (
    <>
      <Navbar />
      {lightboxIndex !== null && (
        <Lightbox index={lightboxIndex} onClose={closeLightbox} onPrev={prevScreen} onNext={nextScreen} />
      )}

      <main className="pt-16" style={{ fontFamily: 'var(--font-sans)' }}>

        {/* ── HERO — dark ── */}
        <section style={{ background: DARK, color: '#fff' }}>
          <div className="px-6 md:px-10 pt-20 pb-6 max-w-7xl mx-auto">

            {/* Title + thumbnail side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  UI/UX Design | Mobile App
                </p>
                <h1 className="mb-4" style={{ fontFamily: 'var(--font-sans)', fontSize: '4rem', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                  Attend<span style={{ color: BLUE }}>.</span>
                </h1>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 320 }}>
                  A mobile attendance tracking app designed to make taking and reviewing attendance fast, clear, and frustration-free for university professors.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ border: '0.5px solid rgba(255,255,255,0.1)' }}>
                <img src="/Attend.png" alt="Attend App" className="w-full" style={{ display: 'block' }} />
              </div>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-4 mt-14 mb-8" style={{ borderTop: '0.5px solid rgb(255, 255, 255)' }}>
              {[
                { label: 'My Role',  value: 'UI/UX Designer' },
                { label: 'Type',     value: 'School Project' },
                { label: 'Platform', value: 'Mobile' },
                { label: 'Focus',    value: 'Functional UX' },
              ].map(({ label, value }, i) => (
                <div
                  key={i}
                  className="py-7 pr-6"
                  style={{ borderRight: i < 3 ? '0.5px solid rgb(255, 255, 255)' : 'none', paddingLeft: i === 0 ? 0 : '1.5rem' }}
                >
                  <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>{label}</p>
                  <p className="text-sm font-medium" style={{ color: BLUE }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OVERVIEW — light blue-grey ── */}
        <section style={{ background: LIGHT }}>
          <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase mb-6" style={{ color: 'rgba(0, 0, 0, 0.75)' }}>Overview</p>
              <h2 className="mb-6" style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.1, color: '#111', letterSpacing: '-0.02em' }}>
                Clarity over style.
              </h2>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)' }}>
                Attend is a concept mobile app built for university lecturers managing multiple course sections. The brief was simple: make attendance feel effortless. Every screen decision prioritised function. No decorative elements that didn&apos;t carry information.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-0">
              {[
                { title: 'Users',     sub: 'University professors & admins' },
                { title: 'User Roles', sub: 'Lecturer · Admin' },
                { title: 'Core Flow', sub: 'View courses → take attendance → generate report' },
              ].map(({ title, sub }, i) => (
                <div key={i} className="py-6" style={{ borderTop: '0.5px solid rgb(0, 0, 0)' }}>
                  <p className="text-base font-medium mb-2" style={{ color: '#111' }}>{title}</p>
                  <p className="text-sm" style={{ color: BLUE }}>{sub}</p>
                </div>
              ))}
              <div style={{ borderTop: '0.5px solid rgb(0, 0, 0)' }} />
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

        {/* ── DESIGN DECISIONS — light blue-grey ── */}
        <section style={{ background: LIGHT }}>
          <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
            <p className="text-xs tracking-[0.25em] uppercase mb-12" style={{ color: 'rgb(0, 0, 0)' }}>Design Decisions</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {[
                {
                  num: '01',
                  title: 'Color as status',
                  body: 'Each course gets a color that carries through the entire flow, from the course card to the attendance screen header. No reading required to understand state.',
                },
                {
                  num: '02',
                  title: 'Two roles, one system',
                  body: 'The app handles both lecturer and admin views. Same layout, same components, different data. Keeps the learning curve low for both user types.',
                },
              ].map(({ num, title, body }, i) => (
                <div
                  key={i}
                  className="p-8"
                  style={{ borderLeft: '0.5px solid rgb(0, 0, 0)' }}
                >
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '2.5rem', fontWeight: 700, color: 'rgba(0,0,0,0.12)', marginBottom: '1rem', lineHeight: 1 }}>{num}</p>
                  <p className="text-sm font-medium mb-3" style={{ color: BLUE, letterSpacing: '0.01em' }}>{title}</p>
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
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Attend was my second project, and a deliberate shift in thinking. After Bouzeur, where the goal was atmosphere and craft, I wanted to design something that prioritised usability over beauty. It pushed me to think from the user's perspective first and make visual decisions in service of function, not the other way around. More than any other project, Attend is where the full UI/UX process clicked for me.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.figma.com/design/qZQAGA8V5BbekFfC2pzEwd/Student-Attendance?node-id=0-1&t=prcX6lFLIyqWSxCJ-1"
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
          <div className="px-6 md:px-10 py-10 max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-sm font-bold tracking-[0.2em]" style={{ color: '#fff' }}>ATTEND</span>
            <div className="flex items-center gap-8">
              {[
                { label: 'Email',    href: 'mailto:phonerandy7@gmail.com' },
                { label: 'Figma',    href: 'https://www.figma.com/design/qZQAGA8V5BbekFfC2pzEwd/Student-Attendance?node-id=0-1&t=prcX6lFLIyqWSxCJ-1' },
                { label: 'GitHub',   href: 'https://github.com/CoronaZoro' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-ywet-phone-aung-053a55376/' },
                { label: 'Resume',   href: '#' },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-sm hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
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
