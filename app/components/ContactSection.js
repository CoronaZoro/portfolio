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
        borderTop: '1px solid rgba(255,255,255,0.08)',
        fontFamily: 'ClashGrotesk, system-ui, sans-serif',
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
            style={{
              display: 'inline-block',
              fontSize: 'clamp(18px, 2.2vw, 28px)',
              fontWeight: 500,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              paddingBottom: 10,
              borderBottom: '2px solid rgba(255,255,255,0.5)',
            }}
          >
            {emailDisplay}
          </motion.a>
        </div>

        {/* ── Center: mood selector ───────────────────────── */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

          {/* Animated subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={mood.subtitle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                fontSize: 14,
                color: 'rgba(255,255,255,0.6)',
                fontStyle: 'italic',
                marginBottom: 14,
                letterSpacing: '0.01em',
              }}
            >
              {mood.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* Animated heading */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={mood.heading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '-0.03em',
                lineHeight: 1,
                margin: 0,
                marginBottom: 36,
              }}
            >
              {mood.heading}
            </motion.h2>
          </AnimatePresence>

          {/* Mood buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {BUTTONS.map(btn => {
              const isActive = active === btn.id
              const color = BUTTON_COLORS[btn.id]
              return (
                <button
                  key={btn.id}
                  onClick={() => handleMoodClick(btn.id)}
                  style={{
                    background: isActive ? `${color}14` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.12)'}`,
                    borderRadius: 100,
                    color: isActive ? color : 'rgba(255,255,255,0.65)',
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    padding: '9px 18px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    letterSpacing: '0.01em',
                    transition: 'all 0.15s ease',
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
          <p style={{
            fontSize: 'clamp(18px, 2.2vw, 28px)',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
            marginBottom: 10,
          }}>
            +66 84 169 6490
          </p>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
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
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '28px 60px',
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
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                transition: 'border-color 0.15s, color 0.15s',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        {/* Name line */}
        <p className="contact-footer-name" style={{
          fontSize: 14,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.05em',
        }}>
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
