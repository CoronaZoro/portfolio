import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'
import ScreenGallery from '../../components/ScreenGallery'

const screens = [
  { src: '/Home%20Page.png',    label: 'Home page' },
  { src: '/Home%20Page-1.png',  label: 'Home page, alternate' },
  { src: '/Attendance.png',     label: 'Attendance view' },
  { src: '/Attendance%202.png', label: 'Attendance detail' },
]

// Attend's own palette — navy-dark and light blue-grey sections, blue accent.
// The brand blue is split by background so text always passes contrast.
const DARK          = '#000211'
const LIGHT         = '#d4dfe9'
const BLUE          = '#4472c4' // decorative only (title full stop)
const BLUE_ON_DARK  = '#6b93dc' // 6.7:1 on DARK
const BLUE_ON_LIGHT = '#2f5aa8' // 4.9:1 on LIGHT
const INK_DARK      = '#141a22'
const SOFT_DARK     = '#3b4552'
const MUTED_DARK    = '#4a5563'
const TILE          = 'rgba(255,255,255,0.05)'
const FIGMA         = 'https://www.figma.com/design/qZQAGA8V5BbekFfC2pzEwd/Student-Attendance?node-id=0-1&t=prcX6lFLIyqWSxCJ-1'

export default function AttendPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16 text-soft">

        {/* ── HERO — dark ── */}
        <section style={{ background: DARK }}>
          <div className="px-6 md:px-10 pt-20 pb-16 max-w-7xl mx-auto">

            {/* Title + thumbnail side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
              <div>
                <h1 className="font-heading text-display font-medium text-ink">
                  Attend<span style={{ color: BLUE }}>.</span>
                </h1>
                <p className="text-body mt-4 max-w-[40ch]">
                  A mobile attendance tracking app designed to make taking and reviewing attendance fast, clear, and frustration-free for university professors.
                </p>
                <p className="text-body text-muted mt-4">UI/UX design · Mobile app</p>
              </div>
              <div className="rounded-xl overflow-hidden">
                <img src="/Attend.png" alt="Attend app screens" className="w-full" style={{ display: 'block' }} />
              </div>
            </div>

            {/* Facts */}
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-12">
              {[
                { label: 'Role',     value: 'UI/UX Designer' },
                { label: 'Type',     value: 'School project' },
                { label: 'Platform', value: 'Mobile' },
                { label: 'Focus',    value: 'Functional UX' },
              ].map(({ label, value }) => (
                <div key={label} className="py-5 px-5 rounded-xl" style={{ background: TILE }}>
                  <dt className="text-body text-muted">{label}</dt>
                  <dd className="text-body font-medium mt-1" style={{ color: BLUE_ON_DARK }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── OVERVIEW — light blue-grey ── */}
        <section style={{ background: LIGHT }}>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="font-heading text-head font-medium" style={{ color: INK_DARK }}>
                Clarity over style.
              </h2>
              <p className="text-body mt-6" style={{ color: SOFT_DARK }}>
                Attend is a concept mobile app built for university lecturers managing multiple course sections. The brief was simple: make attendance feel effortless. Every screen decision prioritised function. No decorative elements that didn&apos;t carry information.
              </p>
            </div>
            <dl className="flex flex-col justify-center gap-8">
              {[
                { title: 'Users',      sub: 'University professors & admins' },
                { title: 'User roles', sub: 'Lecturer · Admin' },
                { title: 'Core flow',  sub: 'View courses → take attendance → generate report' },
              ].map(({ title, sub }) => (
                <div key={title}>
                  <dt className="text-body" style={{ color: MUTED_DARK }}>{title}</dt>
                  <dd className="text-lead font-medium mt-1" style={{ color: BLUE_ON_LIGHT }}>{sub}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── SELECTED SCREENS — dark ── */}
        <section style={{ background: DARK }}>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
            <h2 className="font-heading text-head font-medium text-ink mb-10">Selected screens</h2>
            <ScreenGallery screens={screens} tileBg="#f0f4f8" tileHeight={340} fit="height" />
          </div>
        </section>

        {/* ── DESIGN DECISIONS — light blue-grey ── */}
        <section style={{ background: LIGHT }}>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
            <h2 className="font-heading text-head font-medium mb-12" style={{ color: INK_DARK }}>Design decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {[
                {
                  title: 'Color as status',
                  body: 'Each course gets a color that carries through the entire flow, from the course card to the attendance screen header. No reading required to understand state.',
                },
                {
                  title: 'Two roles, one system',
                  body: 'The app handles both lecturer and admin views. Same layout, same components, different data. Keeps the learning curve low for both user types.',
                },
              ].map(({ title, body }) => (
                <div key={title}>
                  <h3 className="text-lead font-medium" style={{ color: BLUE_ON_LIGHT }}>{title}</h3>
                  <p className="text-body mt-3" style={{ color: SOFT_DARK }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT I LEARNED — dark ── */}
        <section style={{ background: DARK }}>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-12 md:items-end md:justify-between">
            <div className="max-w-[60ch]">
              <h2 className="font-heading text-head font-medium text-ink">What I learned</h2>
              <p className="text-body mt-4">
                Attend was my second project, and a deliberate shift in thinking. After Bouzeur, where the goal was atmosphere and craft, I wanted to design something that prioritised usability over beauty. It pushed me to think from the user&apos;s perspective first and make visual decisions in service of function, not the other way around. More than any other project, Attend is where the full UI/UX process clicked for me.
              </p>
            </div>
            <a
              href={FIGMA}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto flex-shrink-0 inline-flex items-center gap-2 text-body font-medium px-8 py-3 rounded-full text-ink transition-opacity hover:opacity-85"
              style={{ background: BLUE }}
            >
              View Figma file →
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: DARK }}>
          <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="font-heading text-lead font-medium text-ink">Attend<span style={{ color: BLUE }}>.</span></span>
            <FooterIcons figmaHref={FIGMA} />
          </div>
        </footer>

      </main>
    </>
  )
}
