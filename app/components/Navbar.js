'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const buttonRef    = useRef(null)
  const firstLinkRef = useRef(null)
  const wasOpen      = useRef(false)

  // Opening moves focus into the drawer; closing (Escape, link, backdrop) hands it
  // back to the menu button so keyboard users don't lose their place.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus()
    } else if (wasOpen.current) {
      buttonRef.current?.focus()
    }
    wasOpen.current = open
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Scroll-reactive background — transparent at top, fills in after 80px
  const { scrollY } = useScroll()
  const bgAlpha      = useTransform(scrollY, [0, 80], [0, 0.85])
  const blurPx       = useTransform(scrollY, [0, 80], [0, 12])
  const bgColor      = useMotionTemplate`rgba(14,12,10,${bgAlpha})`
  const backdropBlur = useMotionTemplate`blur(${blurPx}px)`

  const links = [
    { label: 'Home',    href: '/' },
    { label: 'Works',   href: '/#work' },
    { label: 'About',   href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-16 h-16"
        style={{ backgroundColor: bgColor, backdropFilter: backdropBlur }}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        <Link href="/" className="font-heading text-body font-medium text-ink hover:opacity-70 transition-opacity">
          Randy Dawn Tai
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="text-body text-soft hover:text-ink transition-colors">{label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          ref={buttonRef}
          className="md:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span className="block w-6 h-0.5 bg-ink transition-[transform,opacity] duration-300"
            style={{ transform: open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
          <span className="block w-6 h-0.5 bg-ink transition-[transform,opacity] duration-300"
            style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-6 h-0.5 bg-ink transition-[transform,opacity] duration-300"
            style={{ transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
        </button>
      </motion.nav>

      {/* Slide-in drawer — mobile only */}
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer panel — inert while closed so its links are out of the Tab order
          and hidden from screen readers (it's only slid off-screen, not removed) */}
      <nav
        id="mobile-menu"
        aria-label="Menu"
        inert={!open}
        className="md:hidden fixed top-0 right-0 h-full w-72 z-50 flex flex-col pt-24 px-8 gap-8"
        style={{
          background: 'var(--color-surface)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {links.map(({ label, href }, i) => (
          <a
            key={label}
            ref={i === 0 ? firstLinkRef : undefined}
            href={href}
            onClick={() => setOpen(false)}
            className="font-heading text-head font-medium text-soft hover:text-ink transition-colors"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'translateX(0)' : 'translateX(20px)',
              transition: `opacity 0.3s ease ${0.1 + i * 0.06}s, transform 0.3s ease ${0.1 + i * 0.06}s`,
            }}
          >
            {label}
          </a>
        ))}

        {/* Contact links at bottom */}
        <div className="mt-auto mb-12 flex flex-col gap-4">
          {[
            { label: 'Email',    href: 'mailto:phonerandy7@gmail.com' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-ywet-phone-aung-053a55376/' },
            { label: 'GitHub',   href: 'https://github.com/CoronaZoro' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="text-body text-muted hover:text-ink transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
