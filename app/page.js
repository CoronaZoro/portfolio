import { sql } from '@vercel/postgres'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollReveal from './components/ScrollReveal'
import BentoGrid from './components/BentoGrid'
import ContactSection from './components/ContactSection'

// Slug map — only thing that can't come from DB (ties project ID to route)
const SLUG = { 1: 'guardian', 2: 'huesta', 3: 'bouzer', 4: 'attend' }

function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-16 md:py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <ScrollReveal>
          <div>
            <p className="text-sm tracking-[0.15em] uppercase text-white/60 mb-6">About Me</p>
            <p className="text-base text-white/70 leading-relaxed mb-4">
              I&apos;m a third-year ICT student at a university in Bangkok, building toward a career in product design. I care about the details, the transitions that feel off, and the moments that make someone go &ldquo;wow&rdquo;.
            </p>
            <p className="text-base text-white/70 leading-relaxed">
              My background spans pure UX design and AI-integrated products, which means I&apos;m comfortable working across the full product surface from research and wireframes through to implementation. Currently seeking an internship for summer 2025.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div>
            <p className="text-sm tracking-[0.15em] uppercase text-white/60 mb-6">Tools &amp; Skills</p>
            <div className="flex flex-col gap-3">
              {[
                'Prototyping | User Research | Wireframe',
                'Figma | User Research | Brand Design',
                'Roboflow | Next.js | YOLO',
                'Python | JavaScript',
              ].map((line) => (
                <p key={line} className="text-base text-white/60">{line}</p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

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
        <About />
      </main>
      <ContactSection />
    </>
  )
}
