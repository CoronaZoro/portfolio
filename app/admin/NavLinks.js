'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/admin',          label: 'Dashboard' },
  { href: '/admin/profile',  label: 'Profile' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/images',   label: 'Images' },
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <>
      {NAV.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: 'block',
              padding: '8px 20px',
              fontSize: 13,
              color: active ? '#fff' : 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              borderRadius: 6,
              margin: '0 8px',
              background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={e => {
              if (!active) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.color = '#fff'
              }
            }}
            onMouseLeave={e => {
              if (!active) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
              }
            }}
          >
            {label}
          </Link>
        )
      })}
    </>
  )
}
