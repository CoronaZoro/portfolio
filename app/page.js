import { sql } from '@vercel/postgres'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'

// Slug map — only thing that can't come from DB (ties project ID to route)
const SLUG = { 1: 'guardian', 2: 'huesta', 3: 'bouzer', 4: 'attend' }

export default async function Home() {
  const { rows } = await sql`
    SELECT id, title, short_description, tags, hackathon_winner, thumbnail_url, visible, display_order
    FROM projects
    WHERE visible = true
    ORDER BY display_order ASC
  `

  const projects = rows.map(row => ({ ...row, slug: SLUG[row.id] }))

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BentoGrid projects={projects} />
        <AboutSection />
      </main>
      <ContactSection />
    </>
  )
}
