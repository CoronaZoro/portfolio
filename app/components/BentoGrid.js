'use client'

import { motion } from 'framer-motion'

// ── Per-project static config ─────────────────────────────────────────────
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
    fallbackBg: <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/HUESTA.png" alt="Huesta" className="w-full h-full object-cover" />,
  },
  bouzer: {
    accent: '#e8d4a8',
    fallbackBg: <img src="/BOUZER.png" alt="Bouzer" className="w-full h-full object-cover" />,
  },
  attend: {
    accent: '#60a5fa',
    fallbackBg: <img src="/Attend.png" alt="Attend" className="w-full h-full object-cover" />,
  },
  pinned: {
    accent: '#2DCC70',
    fallbackBg: <img src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Pinned.png" alt="Pinned" className="w-full h-full object-cover" />,
  },
}

// ── Static entry for Pinned (not yet in DB — replace with DB row once seeded) ─
const PINNED_STATIC = {
  slug:              'pinned',
  title:             'Pinned.',
  short_description: 'A community-driven street food discovery map for Bangkok.',
  tags:              ['UI/UX', 'Mobile App'],
  thumbnail_url:     null,
  case_study_path:   '/projects/pinned',
}

// Bottom bar slides up from y:20 → y:0 on hover
const barVariants = {
  rest:  { opacity: 0, y: 20 },
  hover: { opacity: 1, y: 0  },
}

// ── Single card ───────────────────────────────────────────────────────────
function BentoCard({ project, delay = 0, heightClass = 'min-h-[220px] md:min-h-[420px]' }) {
  const cfg    = CONFIG[project.slug] ?? {}
  const accent = cfg.accent ?? '#ffffff'
  const primaryTag = project.tags?.[0] ?? null

  return (
    // Outer: scroll reveal only
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay }}
    >
      {/* Middle: scale pop + accent glow on hover */}
      <motion.div
        whileHover={{
          scale: 1.022,
          boxShadow: `0 0 0 1.5px ${accent}65, 0 8px 40px 0px ${accent}28`,
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="rounded-2xl overflow-hidden"
        style={{ cursor: 'pointer', boxShadow: `0 0 0 0px ${accent}00` }}
      >
        {/* Inner: hover variant propagation for bar */}
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          className={`relative overflow-hidden ${heightClass}`}
        >

        {/* ── Full-bleed thumbnail / fallback ── */}
        <div className="absolute inset-0">
          {project.thumbnail_url
            ? <img src={project.thumbnail_url} alt={project.title}
                className="w-full h-full object-cover" />
            : cfg.fallbackBg}
        </div>

        {/* ── Frosted glass bar — slides up on hover (desktop) ── */}
        <motion.div
          variants={barVariants}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 hidden md:block"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(10,9,8,0.72)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '18px 24px 20px',
          }}
        >
          {/* Row 1: title + primary tag */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <h2
              className="font-bold text-white tracking-tight leading-tight"
              style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}
            >
              {project.title}
            </h2>

            {primaryTag && (
              <span
                className="text-xs px-3 py-1 rounded-full shrink-0 uppercase tracking-wide backdrop-blur-md"
                style={{
                  background: `${accent}18`,
                  border: `1px solid ${accent}55`,
                  color: accent,
                  letterSpacing: '0.08em',
                }}
              >
                {primaryTag}
              </span>
            )}
          </div>

          {/* Row 2: one-line description */}
          <p
            className="text-sm mb-3"
            style={{
              color: 'rgba(255,255,255,0.6)',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {project.short_description}
          </p>

          {/* Row 3: CTA */}
          <a
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide uppercase transition-opacity hover:opacity-75"
            style={{ color: accent, letterSpacing: '0.1em' }}
          >
            View Case Study <span className="ml-0.5">↗</span>
          </a>
        </motion.div>

        {/* ── Mobile bottom strip — always visible, no animation ── */}
        <div
          className="md:hidden absolute bottom-0 left-0 right-0 px-5 py-4"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            background: 'rgba(10,9,8,0.72)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-white tracking-tight truncate">
              {project.title}
            </h2>
            <a
              href={`/projects/${project.slug}`}
              className="text-xs font-semibold shrink-0"
              style={{ color: accent }}
            >
              View ↗
            </a>
          </div>
        </div>

        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ── Grid layout ────────────────────────────────────────────────────────────
// Order: Guardian (full) → Bouzer + Huesta (2-col) → Pinned (full)
export default function BentoGrid({ projects }) {
  if (!projects?.length) return null

  const guardian = projects.find(p => p.slug === 'guardian')
  const bouzer   = projects.find(p => p.slug === 'bouzer')
  const huesta   = projects.find(p => p.slug === 'huesta')
  // Pinned: use DB row when available, else fall back to static entry
  const pinned   = projects.find(p => p.slug === 'pinned') ?? PINNED_STATIC

  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24" style={{ background: '#0e0c0a' }}>
      <p className="text-sm tracking-[0.2em] uppercase text-white/60 text-center mb-10 md:mb-16">
        Selected Works
      </p>

      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-5">

        {/* Row 1 — Guardian, full width */}
        {guardian && <BentoCard project={guardian} delay={0}   heightClass="min-h-[260px] md:min-h-[500px]" />}

        {/* Row 2 — Bouzer + Huesta, 2-column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {bouzer && <BentoCard project={bouzer} delay={0.1} heightClass="min-h-[220px] md:min-h-[420px]" />}
          {huesta && <BentoCard project={huesta} delay={0.2} heightClass="min-h-[220px] md:min-h-[420px]" />}
        </div>

        {/* Row 3 — Pinned, full width */}
        <BentoCard project={pinned} delay={0.1} heightClass="min-h-[260px] md:min-h-[480px]" />

      </div>
    </section>
  )
}
