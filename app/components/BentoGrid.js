'use client'

import { motion } from 'framer-motion'

// ── Per-project static config (accent colour + background visual) ──────────
const CONFIG = {
  guardian: {
    accent: '#4ade80',
    bg: (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #060d07 0%, #0a1a0c 100%)' }}
      >
        <div className="flex flex-col items-center gap-5">
          <svg width="72" height="72" viewBox="0 0 56 56" fill="none">
            <path d="M28 4L6 14v14c0 12.7 9.4 24.6 22 28 12.6-3.4 22-15.3 22-28V14L28 4z"
              fill="#0d2010" stroke="#4ade80" strokeWidth="1.5" />
            <path d="M21 28l5 5 9-9" stroke="#4ade80" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-white font-bold tracking-[0.22em]" style={{ fontSize: 26 }}>
            GUARDIAN
          </span>
        </div>
      </div>
    ),
  },
  huesta: {
    accent: '#c8a876',
    bg: (
      <img src="/Huesta.png" alt="Huesta"
        className="w-full h-full object-cover" />
    ),
  },
  bouzer: {
    accent: '#e8d4a8',
    bg: (
      <img src="/BOUZER.png" alt="Bouzer"
        className="w-full h-full object-cover" />
    ),
  },
  attend: {
    accent: '#60a5fa',
    bg: (
      <img src="/Attend.png" alt="Attend"
        className="w-full h-full object-cover" />
    ),
  },
}

// ── Individual bento card ──────────────────────────────────────────────────
function BentoCard({ project, delay = 0, minHeight = 380 }) {
  const cfg    = CONFIG[project.slug] ?? {}
  const accent = cfg.accent ?? '#ffffff'

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 28px 70px rgba(0,0,0,0.55), 0 0 50px ${accent}22`,
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      className="relative overflow-hidden rounded-2xl"
      style={{ minHeight, cursor: 'pointer' }}
    >
      {/* Background visual */}
      <div className="absolute inset-0">
        {cfg.bg}
      </div>

      {/* Gradient overlay — heavier at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.05) 75%, transparent 100%)',
        }}
      />

      {/* Accent line along the top edge */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${accent}80 0%, ${accent}20 60%, transparent 100%)`,
        }}
      />

      {/* Card content anchored to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">

        {/* Tags with glassmorphism */}
        <div className="flex flex-wrap gap-2 mb-3">
          {project.hackathon_winner && (
            <span
              className="text-xs px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-wide"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: '#fff',
                letterSpacing: '0.07em',
              }}
            >
              🏆 Hackathon Winner
            </span>
          )}
          {project.tags && project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full backdrop-blur-md uppercase"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.08em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h2
          className="font-bold text-white tracking-tight mb-2"
          style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', lineHeight: 1.15 }}
        >
          {project.title}
        </h2>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-5"
          style={{
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '56ch',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.short_description}
        </p>

        {/* CTA */}
        <a
          href={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ color: accent }}
        >
          View Case Study <span>↗</span>
        </a>
      </div>
    </motion.div>
  )
}

// ── Grid layout ────────────────────────────────────────────────────────────
export default function BentoGrid({ projects }) {
  if (!projects?.length) return null

  // Positions are order-based: [0] full, [1]+[2] side-by-side, [3] full
  const [p0, p1, p2, p3] = projects

  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24">
      <p className="text-sm tracking-[0.2em] uppercase text-white/60 text-center mb-10 md:mb-16">
        Selected Works
      </p>

      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-5">

        {/* Row 1 — Guardian, full width */}
        {p0 && <BentoCard project={p0} delay={0}    minHeight={440} />}

        {/* Row 2 — Huesta + Bouzer, 2-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {p1 && <BentoCard project={p1} delay={0.1} minHeight={390} />}
          {p2 && <BentoCard project={p2} delay={0.2} minHeight={390} />}
        </div>

        {/* Row 3 — Attend, full width */}
        {p3 && <BentoCard project={p3} delay={0.1} minHeight={380} />}

      </div>
    </section>
  )
}
