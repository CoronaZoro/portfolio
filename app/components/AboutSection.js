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

export default function AboutSection({ availableFrom }) {
  const [activeTab, setActiveTab] = useState('designer')

  return (
    <section
      id="about"
      className="px-6 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="font-heading text-head font-medium text-ink mb-10 md:mb-12"
        >
          About
        </motion.h2>

        {/* ── Stats row — full width ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="grid grid-cols-3 gap-2 md:gap-4 mb-16 md:mb-24"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 md:py-16 bg-surface rounded-2xl"
            >
              {/* Big numbers are a deliberate exception to the type scale: 48 / 80 / 120 */}
              <p className="font-heading font-medium text-ink text-[48px] leading-[48px] md:text-[80px] md:leading-[80px] lg:text-[120px] lg:leading-[120px] mb-2 md:mb-4 tracking-[-0.02em]">
                <Counter value={stat.value} suffix={stat.suffix} delay={i * 0.15} />
              </p>
              <p className="text-body text-muted text-center px-2">
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
            <div className="flex gap-0 mb-8">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative text-body font-medium pb-3 mr-4 sm:mr-8 transition-colors duration-200 ${isActive ? 'text-ink' : 'text-muted hover:text-soft'}`}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
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
                className="text-body text-soft"
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
            className="p-6 sm:p-8 bg-surface rounded-2xl"
          >
            <h3 className="font-heading text-lead font-medium text-ink mb-6">
              Currently
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { text: 'Based in Bangkok, Thailand',       pulse: false },
                { text: 'Graduating 2027',                  pulse: false },
                { text: `Open to internships from ${availableFrom || 'Aug 2026'}`, pulse: true  },
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
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-muted)', flexShrink: 0, display: 'block', margin: '0 2px' }} />
                  )}
                  <span className={`text-body ${pulse ? 'text-ink' : 'text-soft'}`}>
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
