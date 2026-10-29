'use client'

// Two-column grid of screen captures that open in a zoomable lightbox.
// Shared by the Bouzer and Attend case studies.
//
//   screens    [{ src, label }]
//   tileBg     background behind each capture while it loads
//   tileHeight crop height of each tile in px
//   fit        'width' for landscape captures, 'height' for tall phone screens

import { useState, useEffect, useCallback, useRef } from 'react'

const btn = 'flex items-center justify-center rounded-full bg-white/10 text-soft hover:bg-white/20 hover:text-ink transition-colors'

function Lightbox({ screens, fit, index, onClose, onPrev, onNext }) {
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

  const sizing = fit === 'height'
    ? { height: `${scale * 72}vh`, width: 'auto', maxWidth: '90vw', transition: isDragging.current ? 'none' : 'height 0.15s ease' }
    : { width: `${scale * 85}vw`, maxWidth: `${scale * 1000}px`, transition: isDragging.current ? 'none' : 'width 0.15s ease, max-width 0.15s ease' }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(0,0,0,0.92)', animation: 'fadeIn 0.25s ease forwards' }}
      onClick={onClose}
    >
      {/* ── Top bar ── */}
      <div
        className="relative flex flex-col md:flex-row md:items-center md:justify-between px-6 md:px-10 py-4 flex-shrink-0 gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-body text-soft pr-12 md:pr-0">{screen.label}</span>

        {/* Zoom slider */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { const v = Math.max(1, parseFloat((scale - 0.1).toFixed(2))); setScale(v); if (v === 1) setOffset({ x: 0, y: 0 }) }}
            className={`${btn} w-8 h-8 text-body`}
            aria-label="Zoom out"
          >−</button>
          <input
            type="range" min="1" max="2" step="0.02" value={scale} onChange={handleSlider}
            style={{ flex: 1, maxWidth: 160, accentColor: 'var(--color-soft)', cursor: 'pointer' }}
            aria-label="Zoom"
          />
          <button
            onClick={() => setScale((v) => Math.min(2, parseFloat((v + 0.1).toFixed(2))))}
            className={`${btn} w-8 h-8 text-body`}
            aria-label="Zoom in"
          >+</button>
          <span className="text-body text-muted tabular-nums" style={{ minWidth: 48 }}>
            {Math.round(scale * 100)}%
          </span>
        </div>

        {/* Close — absolute top-right always visible */}
        <button className={`${btn} absolute top-3 right-4 w-10 h-10`} onClick={onClose} aria-label="Close">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </button>
      </div>

      {/* ── Image area (scrollable) ── */}
      <div
        className="flex-1 min-h-0 overflow-auto flex items-start justify-center"
        style={{ padding: '40px 0', cursor: scale > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default' }}
        data-lenis-prevent
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
            ...sizing,
            objectFit: 'contain',
            display: 'block',
            transform: scale > 1 ? `translate(${offset.x / scale}px, ${offset.y / scale}px)` : 'none',
            userSelect: 'none',
            flexShrink: 0,
          }}
        />
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex items-center justify-between px-6 md:px-10 py-5 flex-shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <button onClick={() => { resetZoom(); onPrev() }} className={`${btn} text-body px-5 py-2`}>← Prev</button>
          <button onClick={() => { resetZoom(); onNext() }} className={`${btn} text-body px-5 py-2`}>Next →</button>
        </div>
        <span className="text-body text-muted tabular-nums">
          {index + 1} / {screens.length}
        </span>
      </div>
    </div>
  )
}

export default function ScreenGallery({ screens, tileBg = '#f5f1ea', tileHeight = 320, fit = 'width' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevScreen    = useCallback(() => setLightboxIndex((i) => (i - 1 + screens.length) % screens.length), [screens.length])
  const nextScreen    = useCallback(() => setLightboxIndex((i) => (i + 1) % screens.length), [screens.length])

  // Lock page scroll (and Lenis) while the lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.__lenis?.stop()
    } else {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [lightboxIndex])

  return (
    <>
      {lightboxIndex !== null && (
        <Lightbox
          screens={screens}
          fit={fit}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevScreen}
          onNext={nextScreen}
        />
      )}

      <div className="grid grid-cols-2 gap-4 md:gap-5">
        {screens.map((screen, i) => (
          <button
            type="button"
            key={screen.src}
            className="relative overflow-hidden cursor-pointer rounded-lg text-left"
            style={{ background: tileBg }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setLightboxIndex(i)}
            aria-label={`Expand ${screen.label}`}
          >
            <img
              src={screen.src}
              alt={screen.label}
              className="w-full"
              style={{ height: tileHeight, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
              style={{ background: 'rgba(0,0,0,0.6)', opacity: hoveredIndex === i ? 1 : 0 }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <line x1="7" y1="1" x2="7" y2="13" stroke="white" strokeWidth="1.5"/>
                  <line x1="1" y1="7" x2="13" y2="7" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="text-body text-ink">Expand</span>
            </div>
          </button>
        ))}
      </div>
    </>
  )
}
