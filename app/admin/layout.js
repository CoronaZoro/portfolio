import NavLinks from './NavLinks'

export const metadata = { title: 'Admin — Randy Dawn Tai' }

export default function AdminLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0e0c0a',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
    }}>

      {/* Sidebar */}
      <aside style={{
        width: 200,
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.08)',
        padding: '28px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 4 }}>Admin</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Randy Dawn Tai</div>
        </div>

        <NavLinks />

        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}
          >
            View live site ↗
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: '40px 48px', maxWidth: 860, overflowY: 'auto' }}>
        {children}
      </main>

    </div>
  )
}
