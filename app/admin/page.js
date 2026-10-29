import { sql } from '@/lib/db'
import { list } from '@vercel/blob'
import DashboardCards from './DashboardCards'

// Counts come straight from the DB and Blob store on every visit
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const [{ rows: profileRows }, { rows: projectRows }, { blobs }] = await Promise.all([
    sql`SELECT name, tagline, updated_at FROM profile WHERE id = 1`,
    sql`SELECT COUNT(*) as total, SUM(CASE WHEN visible THEN 1 ELSE 0 END) as visible FROM projects`,
    list({ prefix: 'portfolio/' }),
  ])

  const profile  = profileRows[0]
  const projects = projectRows[0]
  const imgCount = blobs.length

  const cards = [
    {
      href:   '/admin/profile',
      label:  'Profile',
      value:  profile?.name || '—',
      sub:    profile?.tagline ? `"${profile.tagline.slice(0, 48)}${profile.tagline.length > 48 ? '…' : ''}"` : 'No tagline set',
      action: 'Edit profile →',
    },
    {
      href:   '/admin/projects',
      label:  'Projects',
      value:  `${projects?.total || 0} total`,
      sub:    `${projects?.visible || 0} visible`,
      action: 'Manage projects →',
    },
    {
      href:   '/admin/images',
      label:  'Media',
      value:  `${imgCount} files`,
      sub:    'Stored in Vercel Blob',
      action: 'Upload media →',
    },
  ]

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
        Welcome back. Everything looks good.
      </p>

      <DashboardCards cards={cards} />

      {profile?.updated_at && (
        <p suppressHydrationWarning style={{ marginTop: 40, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          Last profile update: {new Date(profile.updated_at).toLocaleString()}
        </p>
      )}
    </div>
  )
}
