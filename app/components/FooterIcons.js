'use client'

import { useEffect, useState } from 'react'
import { Mail, FileText } from 'lucide-react'

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

// Fallback values — used until the DB responds
const DEFAULTS = {
  email:        'mailto:phonerandy7@gmail.com',
  linkedin_url: 'https://www.linkedin.com/in/sai-ywet-phone-aung-053a55376/',
  github_url:   'https://github.com/CoronaZoro',
  resume_url:   'https://drive.google.com/file/d/1OWxUnSVfwJn90_0oTy-BFM9wTw_Dr0zV/preview',
}

export default function FooterIcons({ figmaHref }) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    fetch('/api/profile')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setProfile(data) })
      .catch(() => {})
  }, [])

  const email       = profile?.email       ? `mailto:${profile.email}` : DEFAULTS.email
  const linkedinUrl = profile?.linkedin_url ?? DEFAULTS.linkedin_url
  const githubUrl   = profile?.github_url   ?? DEFAULTS.github_url
  const resumeUrl   = profile?.resume_url   ?? DEFAULTS.resume_url
  // figmaHref prop is the per-project file link; fall back to profile's figma_url
  const figmaUrl    = figmaHref && figmaHref !== '#'
    ? figmaHref
    : (profile?.figma_url ?? null)

  const links = [
    { Icon: Mail,         href: email,       label: 'Email' },
    ...(figmaUrl ? [{ Icon: FigmaIcon, href: figmaUrl, label: 'Figma' }] : []),
    { Icon: GithubIcon,   href: githubUrl,   label: 'GitHub' },
    { Icon: LinkedinIcon, href: linkedinUrl, label: 'LinkedIn' },
    { Icon: FileText,     href: resumeUrl,   label: 'Resume' },
  ]

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {links.map(({ Icon, href, label }) => (
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
  )
}
