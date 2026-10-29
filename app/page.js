import { sql } from '@/lib/db'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'

export default async function Home() {
  const [{ rows }, { rows: profileRows }] = await Promise.all([
    sql`
      SELECT id, title, short_description, tags, hackathon_winner, thumbnail_url, case_study_path, display_order
      FROM projects
      WHERE visible = true
      ORDER BY display_order ASC
    `,
    sql`
      SELECT tagline, available_from, email, linkedin_url, github_url, figma_url, resume_url
      FROM profile
      WHERE id = 1
    `,
  ])

  // slug = last segment of case_study_path, e.g. /projects/guardian → guardian.
  // BentoGrid uses it to look up each card's accent + fallback image.
  const projects = rows
    .filter(row => row.case_study_path)
    .map(row => ({ ...row, slug: row.case_study_path.split('/').pop() }))
  const profile  = profileRows[0] ?? {}

  return (
    <>
      <Navbar />
      <main>
        <Hero tagline={profile.tagline} />
        <BentoGrid projects={projects} />
        <AboutSection availableFrom={profile.available_from} />
      </main>
      <ContactSection profile={profile} />
    </>
  )
}
