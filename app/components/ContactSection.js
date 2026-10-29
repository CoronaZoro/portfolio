'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText } from 'lucide-react'
import DinoGame from './DinoGame'

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}

function FigmaIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z"/>
      <path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z"/>
      <path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z"/>
      <path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 01-7 0z"/>
      <path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z"/>
    </svg>
  )
}

const MOODS = [
  {
    id: 'default',
    label: null,
    subtitle: 'Anything that catches your eye?',
    heading: "Let's talk.",
  },
  {
    id: 'hire',
    label: 'Hire me 💼',
    subtitle: "Let's build something great.",
    heading: "Let's work.",
  },
  {
    id: 'collab',
    label: 'Collab 🤝',
    subtitle: 'Got a project in mind?',
    heading: "Let's create.",
  },
  {
    id: 'browse',
    label: 'Just browsing 👀',
    subtitle: 'No pressure, take your time.',
    heading: 'Cool, stay a while.',
  },
]

const BUTTON_COLORS = {
  hire:   '#e63323',
  collab: '#3b82f6',
  browse: '#8b5cf6',
}

const BUTTONS = MOODS.slice(1)

// SOCIAL is built inside the component from the profile prop (see below)

export default function ContactSection({ profile = {} }) {
  const [active, setActive]     = useState('default')
  const [showDino, setShowDino] = useState(false)
  const mood = MOODS.find(m => m.id === active)

  // Build contact values from profile prop, falling back to defaults
  const emailHref    = profile.email        ? `mailto:${profile.email}` : 'mailto:phonerandy7@gmail.com'
  const emailDisplay = profile.email        ?? 'phonerandy7@gmail.com'
  const availableFrom = profile.available_from ?? 'Aug 2026'

  const SOCIAL = [
    {
      icon: LinkedinIcon,
      href: profile.linkedin_url || 'https://www.linkedin.com/in/sai-ywet-phone-aung-053a55376/',
      label: 'LinkedIn',
    },
    {
      icon: GithubIcon,
      href: profile.github_url || 'https://github.com/CoronaZoro',
      label: 'GitHub',
    },
    {
      icon: FigmaIcon,
      href: profile.figma_url || 'https://www.figma.com/@saiywetphoneaun',
      label: 'Figma',
    },
    {
      icon: FileText,
      href: profile.resume_url || 'https://drive.google.com/file/d/1OWxUnSVfwJn90_0oTy-BFM9wTw_Dr0zV/preview',
      label: 'Resume',
    },
  ]

  function handleMoodClick(id) {
    if (id === 'browse') {
      // Toggle dino; keep mood active state as usual
      setShowDino(prev => !prev)
      setActive(prev => prev === 'browse' ? 'default' : 'browse')
    } else {
      setShowDino(false)
      setActive(prev => prev === id ? 'default' : id)
    }
  }

  return (
    <section
      id="contact"
      style={{
        background: '#0e0c0a',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Main 3-column area ─────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 0,
          alignItems: 'center',
          padding: '80px 60px',
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
        }}
        className="contact-grid"
      >

        {/* ── Left: email ─────────────────────────────────── */}
        <div style={{ paddingRight: 40 }}>
          <motion.a
            href={emailHref}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="font-heading text-lead font-medium text-ink"
            style={{
              display: 'inline-block',
              textDecoration: 'none',
              paddingBottom: 8,
              borderBottom: '2px solid var(--color-soft)',
            }}
          >
            {emailDisplay}
          </motion.a>
        </div>

        {/* ── Center: mood selector ───────────────────────── */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          {/* Animated heading */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={mood.heading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="font-heading text-display font-medium text-ink mb-4"
            >
              {mood.heading}
            </motion.h2>
          </AnimatePresence>

          {/* Animated subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={mood.subtitle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-body text-soft italic mb-10"
            >
              {mood.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Mood buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            {BUTTONS.map(btn => {
              const isActive = active === btn.id
              const color = BUTTON_COLORS[btn.id]
              return (
                <button
                  key={btn.id}
                  onClick={() => handleMoodClick(btn.id)}
                  className={`text-body font-medium transition-colors ${isActive ? '' : 'text-soft hover:text-ink'}`}
                  style={{
                    background: isActive ? `${color}26` : 'rgba(255,255,255,0.06)',
                    border: 'none',
                    borderRadius: 100,
                    color: isActive ? color : undefined,
                    padding: '8px 20px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  {btn.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Right: phone + location ──────────────────────── */}
        <div style={{ paddingLeft: 40, textAlign: 'right' }}>
          <p className="font-heading text-lead font-medium text-ink mb-2">
            +66 84 169 6490
          </p>
          <p className="text-body text-muted">
            Bangkok, Thailand · Available {availableFrom}
          </p>
        </div>
      </div>

      {/* ── Dino game (slides up between divider and social bar) ── */}
      <AnimatePresence>
        {showDino && (
          <motion.div
            key="dino"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              maxWidth: 1200,
              width: '100%',
              margin: '0 auto',
              padding: '0 60px 24px',
              boxSizing: 'border-box',
            }}
            className="dino-wrap"
          >
            <DinoGame onClose={() => {
              setShowDino(false)
              setActive('default')
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div
        className="contact-footer"
        style={{
          padding: '32px 60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >

        {/* Social icons */}
        <div className="contact-footer-icons" style={{ display: 'flex', gap: 12 }}>
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-white/5 text-soft hover:bg-white/10 hover:text-ink transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Name line */}
        <p className="contact-footer-name text-body text-muted">
          Randy Dawn Tai
        </p>
      </div>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            padding: 60px 24px !important;
            gap: 56px !important;
            text-align: center !important;
          }
          .contact-grid > div {
            padding: 0 !important;
            text-align: center !important;
          }
          .dino-wrap {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .contact-footer {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .contact-footer-name {
            white-space: nowrap;
            flex-shrink: 0;
          }
          .contact-footer-icons a {
            width: 32px !important;
            height: 32px !important;
          }
        }
      `}</style>
    </section>
  )
}
