'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView, animate } from 'framer-motion'

// ── Data ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: 3, suffix: '',   label: 'Years studying'   },
  { value: 4, suffix: '+',  label: 'Projects built'   },
  { value: 1, suffix: 'st', label: 'Hackathon place'  },
]

const TABS = [
  {
    id: 'designer',
    label: 'Designer',
    content:
      'I care about the details, the transitions that feel off, the moments that make someone go wow. I approach every project by asking what it feels like to use, not just how it looks.',
  },
  {
    id: 'developer',
    label: 'Developer',
    content:
      'I build what I design. My stack is Next.js, Tailwind, Python, and React, plus computer vision tools like YOLOv11 and FastAPI when the project calls for it.',
  },
  {
    id: 'human',
    label: 'Human',
    content:
      "Third-year student based in Bangkok. I spend too much time coming up with ideas, obsess over small details, and I'm currently hunting for an internship starting August 2026.",
  },
]

// ── Counter ───────────────────────────────────────────────────────────────

function Counter({ value, suffix, delay = 0 }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return controls.stop
  }, [isInView, value, delay])

  return <span ref={ref}>{display}{suffix}</span>
}

// ── Main component ────────────────────────────────────────────────────────

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('designer')

  return (
    <section
      id="about"
      className="px-6 md:px-10 py-16 md:py-24 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="text-xs tracking-[0.2em] uppercase text-white/50 mb-12 md:mb-16"
        >
          About
        </motion.p>

        {/* ── Stats row — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="grid grid-cols-3 mb-16 md:mb-24"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-6 md:py-14"
              style={{
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <p
                className="font-bold text-white leading-none mb-2 md:mb-3 text-[2.25rem] sm:text-[3.5rem] md:text-[clamp(56px,8vw,120px)]"
                style={{ letterSpacing: '-0.04em' }}
              >
                <Counter value={stat.value} suffix={stat.suffix} delay={i * 0.15} />
              </p>
              <p className="text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.18em] uppercase text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── Tabs + Currently: 2-column on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left — Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Tab bar */}
            <div
              className="flex gap-0 mb-8"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative text-sm font-medium pb-3 pr-4 sm:pr-8 transition-colors duration-200"
                    style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0"
                        style={{ height: 2, right: 0, background: '#e63323' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-base leading-[1.7]"
                style={{ color: 'rgba(255,255,255,0.62)' }}
              >
                {TABS.find(t => t.id === activeTab)?.content}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Right — Currently card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.32 }}
            className="p-5 sm:p-8"
            style={{
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.02)',
              boxShadow: '0 0 40px rgba(230,51,35,0.06), 0 0 0 0 transparent',
            }}
          >
            <p className="text-xs tracking-[0.2em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Currently
            </p>
            <div className="flex flex-col gap-4">
              {[
                { text: 'Based in Bangkok, Thailand',       pulse: false },
                { text: 'Graduating 2027',                  pulse: false },
                { text: 'Open to internships from Aug 2026', pulse: true  },
                { text: 'Building Pinned',                  pulse: false },
              ].map(({ text, pulse }) => (
                <div key={text} className="flex items-center gap-3">
                  {pulse ? (
                    /* Animated green availability dot */
                    <span className="relative flex-shrink-0" style={{ width: 8, height: 8 }}>
                      <motion.span
                        animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                        style={{
                          position: 'absolute', inset: 0,
                          borderRadius: '50%',
                          background: '#4ade80',
                          display: 'block',
                        }}
                      />
                      <span style={{
                        position: 'absolute', inset: 0,
                        borderRadius: '50%',
                        background: '#4ade80',
                        display: 'block',
                      }} />
                    </span>
                  ) : (
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', flexShrink: 0, display: 'block', margin: '0 2px' }} />
                  )}
                  <span
                    className="text-sm leading-snug"
                    style={{ color: pulse ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.65)' }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
