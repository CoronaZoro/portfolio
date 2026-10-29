'use client'

import { motion } from 'framer-motion'
import TypedText from './TypedText'

// Reusable fade-up variant with explicit delay
function fadeUp(delay = 0) {
  return {
    initial:    { opacity: 0, y: 20 },
    animate:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }
}

export default function Hero({ tagline }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 md:px-16">

      {/* Headline — two lines staggered */}
      <h1 className="font-heading text-display font-normal text-ink max-w-4xl">
        <motion.span {...fadeUp(0.1)} style={{ display: 'block' }}>
          Aspiring to make
        </motion.span>
        <motion.span {...fadeUp(0.28)} style={{ display: 'block' }}>
          functional designs a little more{' '}
          <TypedText text="fun." delay={1400} speed={130} />
        </motion.span>
      </h1>

      {/* Tagline (editable in /admin/profile) — under the headline, not above it */}
      <motion.p {...fadeUp(0.46)} className="text-lead text-muted mt-6">
        {tagline || 'Product Designer · AI/ML Developer · Bangkok'}
      </motion.p>

    </section>
  )
}
