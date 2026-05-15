'use client'

import { motion } from 'framer-motion'

// ── Per-project static config ─────────────────────────────────────────────
// accent: brand colour for tags, CTA, top-edge line
// fallbackBg: shown when thumbnail_url is null
const CONFIG = {
  guardian: {
    accent: '#4ade80',
    fallbackBg: (
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
    fallbackBg: <img src="/Huesta.png" alt="Huesta" className="w-full h-full object-cover" />,
  },
  bouzer: {
    accent: '#e8d4a8',
    fallbackBg: <img src="/BOUZER.png" alt="Bouzer" className="w-full h-full object-cover" />,
  },
  attend: {
    accent: '#60a5fa',
    fallbackBg: <img src="/Attend.png" alt="Attend" className="w-full h-full object-cover" />,
  },
}

// Variants propagate from the card root down to child motion elements
const hoverVariants = {
  rest:  { transition: { duration: 0.3, ease: 'easeOut' } },
  hover: { transition: { duration: 0.3, ease: 'easeOut' } },
}
const dimVariants = {
  rest:  { opacity: 0 },
  hover: { opacity: 0.22 },
}
const panelVariants = {
  rest:  { opacity: 0, x: 24 },
  hover: { opacity: 1,  x: 0  },
}

// ── Single card ───────────────────────────────────────────────────────────
function BentoCard({ project, delay = 0, minHeight = 400 }) {
  const cfg    = CONFIG[project.slug] ?? {}
  const accent = cfg.accent ?? '#ffffff'

  return (
    // Outer wrapper handles scroll-reveal only
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className="rounded-2xl overflow-hidden"
    >
      {/* Inner wrapper handles hover state propagation */}
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={hoverVariants}
        className="relative overflow-hidden"
        style={{ minHeight, cursor: 'pointer' }}
      >

        {/* ── Background: thumbnail or fallback, always full-bleed ── */}
        <div className="absolute inset-0">
          {project.thumbnail_url
            ? <img src={project.thumbnail_url} alt={project.title}
                className="w-full h-full object-cover" />
            : cfg.fallbackBg}
        </div>

        {/* Accent top-edge line (always visible) */}
        <div
          className="absolute top-0 left-0 right-0 z-10"
          style={{
            height: 2,
            background: `linear-gradient(90deg, ${accent}90 0%, ${accent}30 60%, transparent 100%)`,
          }}
        />

        {/* ── Desktop dim overlay — fades in on hover ── */}
        <motion.div
          variants={dimVariants}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black hidden md:block"
          style={{ zIndex: 1 }}
        />

        {/* ── Desktop right panel — slides in on hover ── */}
        <motion.div
          variants={panelVariants}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute top-0 right-0 bottom-0 hidden md:flex flex-col justify-center"
          style={{
            width: '45%',
            padding: '36px 40px',
            background: 'rgba(14,12,10,0.90)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            zIndex: 2,
          }}
        >
          <PanelContent project={project} accent={accent} />
        </motion.div>

        {/* ── Mobile bottom strip — always visible, gradient bg ── */}
        <div
          className="md:hidden absolute bottom-0 left-0 right-0 p-5"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            zIndex: 2,
          }}
        >
          <h2 className="text-lg font-bold text-white mb-2 tracking-tight">
            {project.title}
          </h2>
          <a
            href={`/projects/${project.slug}`}
            className="text-sm font-medium"
            style={{ color: accent }}
          >
            View Case Study ↗
          </a>
        </div>

      </motion.div>
    </motion.div>
  )
}

// ── Shared text content for the right panel ───────────────────────────────
function PanelContent({ project, accent }) {
  return (
    <div>
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.hackathon_winner && (
          <span
            className="text-xs px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-wide"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
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
        className="font-bold text-white tracking-tight mb-3"
        style={{ fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.15 }}
      >
        {project.title}
      </h2>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-6"
        style={{
          color: 'rgba(255,255,255,0.55)',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {project.short_description}
      </p>

      {/* CTA */}
      <a
        href={`/projects/${project.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-75"
        style={{ color: accent }}
      >
        View Case Study <span>↗</span>
      </a>
    </div>
  )
}

// ── Grid layout ────────────────────────────────────────────────────────────
// Order: Guardian (full) → Bouzer + Attend (2-col) → Huesta (full)
export default function BentoGrid({ projects }) {
  if (!projects?.length) return null

  const guardian = projects.find(p => p.slug === 'guardian')
  const bouzer   = projects.find(p => p.slug === 'bouzer')
  const attend   = projects.find(p => p.slug === 'attend')
  const huesta   = projects.find(p => p.slug === 'huesta')

  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24">
      <p className="text-sm tracking-[0.2em] uppercase text-white/60 text-center mb-10 md:mb-16">
        Selected Works
      </p>

      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-5">

        {/* Row 1 — Guardian, full width */}
        {guardian && <BentoCard project={guardian} delay={0}   minHeight={500} />}

        {/* Row 2 — Bouzer + Attend, 2-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {bouzer && <BentoCard project={bouzer} delay={0.1} minHeight={420} />}
          {attend && <BentoCard project={attend} delay={0.2} minHeight={420} />}
        </div>

        {/* Row 3 — Huesta, full width */}
        {huesta && <BentoCard project={huesta} delay={0.1} minHeight={480} />}

      </div>
    </section>
  )
}
