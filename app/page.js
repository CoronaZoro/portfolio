import { sql } from '@vercel/postgres'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BorderGlow from './components/BorderGlow'
import ScrollReveal from './components/ScrollReveal'
import ContactSection from './components/ContactSection'

// Static visual config — things that never change via the admin panel
const visualConfig = {
  1: { slug: 'guardian', rightBg: '#ffffff' },
  2: { slug: 'huesta',   rightBg: '#ffffff' },
  3: { slug: 'bouzer',   rightBg: '#f5f0e6' },
  4: { slug: 'attend',   rightBg: '#ffffff' },
}

function GuardianLeft() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-shrink-0" style={{ background: '#0a0f0d', minHeight: '220px' }}>
      <div className="flex flex-col items-center gap-4">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <path d="M28 4L6 14v14c0 12.7 9.4 24.6 22 28 12.6-3.4 22-15.3 22-28V14L28 4z" fill="#1a2e1a" stroke="#4ade80" strokeWidth="1.5"/>
          <path d="M28 4L6 14v14c0 12.7 9.4 24.6 22 28 12.6-3.4 22-15.3 22-28V14L28 4z" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
          <path d="M21 28l5 5 9-9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-white text-2xl font-bold tracking-[0.2em]">GUARDIAN</span>
      </div>
    </div>
  )
}

function HuestaLeft() {
  return (
    <div className="w-full h-full flex-shrink-0 overflow-hidden" style={{ minHeight: '220px' }}>
      <img src="/Huesta.png" alt="Huesta" className="w-full h-full object-cover" />
    </div>
  )
}

function BouzerLeft() {
  return (
    <div className="w-full flex-shrink-0 overflow-hidden" style={{ minHeight: '220px' }}>
      <img src="/BOUZER.png" alt="Bouzer" className="w-full h-full object-cover" />
    </div>
  )
}

function AttendLeft() {
  return (
    <div className="w-full flex-shrink-0 overflow-hidden" style={{ minHeight: '220px' }}>
      <img src="/Attend.png" alt="Attend" className="w-full h-full object-cover" />
    </div>
  )
}

const leftPanels = {
  guardian: GuardianLeft,
  huesta:   HuestaLeft,
  bouzer:   BouzerLeft,
  attend:   AttendLeft,
}

function Projects({ projects }) {
  return (
    <section id="work" className="px-6 md:px-10 py-16 md:py-24">
      <p className="text-sm tracking-[0.2em] uppercase text-white/60 text-center mb-10 md:mb-16">Selected Works</p>
      <div className="flex flex-col gap-6 md:gap-8 max-w-7xl mx-auto">
        {projects.map((project, i) => {
          const LeftPanel = leftPanels[project.slug]
          return (
            <ScrollReveal key={project.id} delay={i * 0.1}>
            <BorderGlow>
              <div className="flex flex-col md:flex-row w-full" style={{ minHeight: '482px' }}>
                {/* Image panel — full width on mobile, half on desktop */}
                <div className="w-full md:w-1/2 md:flex-shrink-0 self-stretch">
                  <LeftPanel />
                </div>
                {/* Text panel */}
                <div
                  className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-between md:flex-shrink-0"
                  style={{ background: project.rightBg }}
                >
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 tracking-wide uppercase">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.hackathon_winner && (
                        <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black text-white tracking-wide uppercase">
                          🏆 Hackathon Winner
                        </span>
                      )}
                      {project.tags && project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1.5 rounded-full border border-black/25 text-black/70 tracking-wide uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-black/60 leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>
                  <a
                    href={`/projects/${project.slug}`}
                    className="text-sm md:text-base text-black/70 flex items-center gap-1 mt-6 md:mt-8 hover:text-black transition-colors w-fit"
                  >
                    View Case Study <span className="text-base md:text-lg">↗</span>
                  </a>
                </div>
              </div>
            </BorderGlow>
            </ScrollReveal>
          )
        })}
      </div>
    </section>
  )
}

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
    SELECT id, title, short_description, tags, hackathon_winner, visible, display_order
    FROM projects
    WHERE visible = true
    ORDER BY display_order ASC
  `

  // Merge DB rows with static visual config (slug, rightBg)
  const projects = rows.map(row => ({
    ...row,
    ...visualConfig[row.id],
  }))

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects projects={projects} />
        <About />
      </main>
      <ContactSection />
    </>
  )
}
