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
  devdna: {
    accent: '#7c6af7',
    fallbackBg: (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)' }}
      >
        {/* DEVDNA BANNER — replace with: <img src="..." alt="DevDNA" className="w-full h-full object-cover" /> */}
        <div className="flex flex-col items-center gap-4">
          <span className="font-heading text-head font-medium text-ink">
            DevDNA.
          </span>
          <span className="text-body" style={{ color: '#9d90fa' }}>
            Software · AI tool
          </span>
        </div>
      </div>
    ),
  },
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
            <h3 className="font-heading text-lead font-medium text-ink">
              {project.title}
            </h3>

            {primaryTag && (
              <span
                className="text-body px-3 py-1 rounded-full shrink-0"
                style={{ background: `${accent}22`, color: accent }}
              >
                {primaryTag}
              </span>
            )}
          </div>

          {/* Row 2: one-line description */}
          <p className="text-body text-soft mb-3 truncate">
            {project.short_description}
          </p>

          {/* Row 3: CTA */}
          <a
            href={project.case_study_path}
            className="inline-flex items-center gap-1 text-body font-medium transition-opacity hover:opacity-75"
            style={{ color: accent }}
          >
            View case study <span className="ml-0.5">↗</span>
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
            <h3 className="font-heading text-body font-medium text-ink truncate">
              {project.title}
            </h3>
            <a
              href={project.case_study_path}
              className="inline-flex items-center gap-1 text-body font-medium shrink-0"
              style={{ color: accent }}
            >
              View case study
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0 }}>
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// ── Grid layout ────────────────────────────────────────────────────────────
// Projects arrive visible-only, sorted by display_order (set in /admin/projects).
// Rows alternate full width / two-up: [1] → [2, 3] → [4] → [5, 6] → …
// A card left alone in a two-up row goes full width instead.
function buildRows(projects) {
  const rows = []
  let i = 0
  while (i < projects.length) {
    const fullRow = rows.length % 2 === 0 || i === projects.length - 1
    rows.push(fullRow ? [projects[i]] : [projects[i], projects[i + 1]])
    i += fullRow ? 1 : 2
  }
  return rows
}

export default function BentoGrid({ projects }) {
  if (!projects?.length) return null

  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24 bg-ground">
      <h2 className="font-heading text-head font-medium text-ink max-w-7xl mx-auto mb-10 md:mb-12">
        Selected works
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col gap-4 md:gap-5">

        {buildRows(projects).map((row, r) =>
          row.length === 1 ? (
            // Full width — the first row is a little taller
            <BentoCard
              key={row[0].id}
              project={row[0]}
              delay={r === 0 ? 0 : 0.1}
              heightClass={r === 0 ? 'min-h-[260px] md:min-h-[500px]' : 'min-h-[260px] md:min-h-[480px]'}
            />
          ) : (
            // Two-up
            <div key={row[0].id} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {row.map((project, c) => (
                <BentoCard
                  key={project.id}
                  project={project}
                  delay={0.1 + c * 0.1}
                  heightClass="min-h-[220px] md:min-h-[420px]"
                />
              ))}
            </div>
          )
        )}

      </div>
    </section>
  )
}
