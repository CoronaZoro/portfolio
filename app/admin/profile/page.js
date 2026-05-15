import { sql } from '@vercel/postgres'
import ProfileForm from './ProfileForm'

export default async function ProfilePage() {
  const { rows } = await sql`SELECT * FROM profile WHERE id = 1`
  const profile = rows[0] ?? {}

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Profile</h1>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
        Edit your public-facing profile information.
      </p>
      <ProfileForm profile={profile} />
    </div>
  )
}
