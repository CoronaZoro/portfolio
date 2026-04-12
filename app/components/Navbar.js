'use client'

import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'Home',    href: '/' },
    { label: 'Works',   href: '/#work' },
    { label: 'About',   href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <nav
        className="anim-fade-down fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-16 h-16 border-b border-white/10"
        style={{ background: 'rgba(14,12,10,0.85)', backdropFilter: 'blur(12px)', animationDelay: '0.1s' }}
      >
        <a href="/" className="text-white text-sm font-medium tracking-wide hover:opacity-70 transition-opacity">
          Randy Dawn Tai
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 list-none">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="text-white/60 text-sm hover:text-white transition-colors">{label}</a>
            </li>
          ))}
        </ul>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-px bg-white transition-all duration-300"
            style={{ transform: open ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span className="block w-5 h-px bg-white transition-all duration-300"
            style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-5 h-px bg-white transition-all duration-300"
            style={{ transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* Slide-in drawer — mobile only */}
      {/* Backdrop */}
      <div
        className="md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none' }}
        onClick={() => setOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className="md:hidden fixed top-0 right-0 h-full w-72 z-50 flex flex-col pt-24 px-8 gap-8"
        style={{
          background: 'rgba(14,12,10,0.97)',
          backdropFilter: 'blur(20px)',
          borderLeft: '0.5px solid rgba(255,255,255,0.1)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {links.map(({ label, href }, i) => (
          <a
            key={label}
            href={href}
            onClick={() => setOpen(false)}
            className="text-white/70 text-2xl font-medium hover:text-white transition-colors"
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
        <div className="mt-auto mb-12 flex flex-col gap-4 border-t border-white/10 pt-8">
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
              className="text-white/40 text-sm hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
