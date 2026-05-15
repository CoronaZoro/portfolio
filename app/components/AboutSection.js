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
          className="text-xs tracking-[0.2em] uppercase text-white/40 mb-12 md:mb-16"
        >
          About
        </motion.p>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="grid grid-cols-3 gap-6 md:gap-0 mb-16 md:mb-20"
          style={{ maxWidth: 560 }}
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col">
              {/* Divider left of 2nd and 3rd stat (desktop only) */}
              <div className="flex items-start gap-0">
                {i > 0 && (
                  <div
                    className="hidden md:block self-stretch mr-8"
                    style={{ width: 1, background: 'rgba(255,255,255,0.1)' }}
                  />
                )}
                <div className={i > 0 ? 'md:pl-0' : ''}>
                  <p
                    className="font-bold text-white leading-none mb-2"
                    style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.03em' }}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} delay={i * 0.15} />
                  </p>
                  <p className="text-xs tracking-[0.12em] uppercase text-white/40">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          style={{ maxWidth: 640 }}
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
                  className="relative text-sm font-medium pb-3 pr-8 transition-colors duration-200"
                  style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  {tab.label}
                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0"
                      style={{ height: 2, right: 32, background: '#e63323' }}
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
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              {TABS.find(t => t.id === activeTab)?.content}
            </motion.p>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
