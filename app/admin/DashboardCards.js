'use client'

import Link from 'next/link'

export default function DashboardCards({ cards }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      {cards.map(({ href, label, value, sub, action }) => (
        <Link key={href} href={href} style={{ textDecoration: 'none' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '20px 22px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <div style={{ fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 12 }}>{label}</div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16, minHeight: 32 }}>{sub}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{action}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
