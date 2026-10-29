import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'
import ScreenGallery from '../../components/ScreenGallery'

const screens = [
  { src: '/HomePage-v2.png', label: 'Landing page' },
  { src: '/Product.png',     label: 'Product page' },
  { src: '/ShoppingBag.png', label: 'Shopping bag' },
  { src: '/Tracker.png',     label: 'Order tracker' },
]

// Bouzer's own palette — cream sections with dark text, gold accent.
// Text on cream uses solid dark tones (all ≥5:1 on CREAM).
const CREAM       = '#e8e2d5'
const GOLD        = '#b8933a' // on dark only (6.8:1)
const GOLD_DARK   = '#7a5c16' // gold for text on cream (4.8:1)
const INK_DARK    = '#1a1814'
const SOFT_DARK   = '#4a453e'
const MUTED_DARK  = '#5f5a51'
const SERIF       = { fontFamily: 'var(--font-serif)', fontWeight: 400 }
const FIGMA       = 'https://www.figma.com/design/5RK0oaIpFc1qAGMkXAO8uh/BOUZER-MOCKUP?node-id=0-1&t=BScyvY8dfhxcw8r3-1'

export default function BouzerPage() {
  return (
    <>
      <Navbar />

      <main className="pt-16 bg-ground text-soft">

        {/* ── HERO — dark ── */}
        <section>
          <div className="px-6 md:px-10 pt-20 pb-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
              {/* Left */}
              <div>
                <h1 className="text-display text-ink" style={{ ...SERIF, letterSpacing: '0.02em' }}>
                  BOUZEUR
                </h1>
                <p className="text-head text-muted italic mt-2" style={{ ...SERIF, letterSpacing: '0.02em' }}>
                  Luxury Redefined
                </p>
                <p className="text-body mt-6 max-w-[40ch]">
                  A concept luxury perfume brand designed to translate the tactile richness of high-end fragrance into a deliberate digital experience.
                </p>
                <p className="text-body text-muted mt-4">Brand design · UI/UX design</p>
              </div>
              {/* Right — facts */}
              <dl className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Role',       value: 'UI/UX Designer' },
                  { label: 'Type',       value: 'Concept project' },
                  { label: 'Typography', value: 'The Seasons, Satoshi' },
                  { label: 'Scope',      value: '4 screens, full flow' },
                ].map(({ label, value }) => (
                  <div key={label} className="p-5 bg-surface rounded-xl">
                    <dt className="text-body text-muted">{label}</dt>
                    <dd className="text-body mt-1" style={{ color: GOLD }}>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── OVERVIEW — cream ── */}
        <section style={{ background: CREAM }}>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <div>
              <h2 className="text-head" style={{ ...SERIF, color: INK_DARK }}>
                A Brand Built,<br />Not a Problem<br />Solved.
              </h2>
              <p className="text-body mt-6" style={{ color: SOFT_DARK }}>
                Bouzeur is a concept luxury perfume brand designed to capture the feeling of exclusivity and craftsmanship. Every screen had to feel like it belonged in the same universe from the hero down to the checkout button.
              </p>
            </div>
            <dl className="flex flex-col justify-center gap-8">
              {[
                { title: 'Brand identity',  sub: 'Dark · Exclusivity · Intentional' },
                { title: 'Brand direction', sub: 'Pure craftsmanship · Integrity' },
                { title: 'Screens',         sub: 'Landing · Product · Cart · Tracker' },
              ].map(({ title, sub }) => (
                <div key={title}>
                  <dt className="text-body" style={{ color: MUTED_DARK }}>{title}</dt>
                  <dd className="text-lead mt-1" style={{ color: INK_DARK }}>{sub}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── SELECTED SCREENS — dark ── */}
        <section>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
            <h2 className="text-head text-ink mb-10" style={SERIF}>Selected Screens</h2>
            <ScreenGallery screens={screens} tileBg="#f5f1ea" tileHeight={320} fit="width" />
          </div>
        </section>

        {/* ── DESIGN DECISIONS — cream ── */}
        <section style={{ background: CREAM }}>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
            <h2 className="text-head mb-12" style={{ ...SERIF, color: INK_DARK }}>Design Decisions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {[
                {
                  title: 'Dark over light',
                  body: 'The hero is dark because the product demanded it. Red silk and dark glass bottles needed a stage that matched their weight.',
                },
                {
                  title: 'Typography',
                  body: 'A regal serif paired with a modern sans-serif kept the brand from feeling too formal or too casual. The Seasons carries the luxury signal, Satoshi keeps it readable.',
                },
                {
                  title: 'Consistency as craft',
                  body: 'At this level, inconsistency breaks the illusion. Every button, spacing unit, and type size had to feel part of the same deliberate system.',
                },
              ].map(({ title, body }) => (
                <div key={title}>
                  <h3 className="text-lead" style={{ ...SERIF, color: GOLD_DARK }}>{title}</h3>
                  <p className="text-body mt-3" style={{ color: SOFT_DARK }}>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT I LEARNED — dark ── */}
        <section>
          <div className="px-6 md:px-10 py-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-12 md:items-end md:justify-between">
            <div className="max-w-[60ch]">
              <h2 className="text-head text-ink" style={SERIF}>What I Learned</h2>
              <p className="text-body mt-4">
                Bouzeur was my first UI/UX project and it taught me that luxury design is mostly about what you leave out. Getting the spacing right, the type hierarchy consistent, and the visual mood coherent across every screen pushed me to think about design as a system rather than just individual pages.
              </p>
            </div>
            <a
              href={FIGMA}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start md:self-auto flex-shrink-0 inline-flex items-center gap-2 text-body font-medium px-8 py-3 transition-opacity hover:opacity-85"
              style={{ background: GOLD, color: '#0e0c0a' }}
            >
              View Figma file →
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="bg-surface">
          <div className="px-6 md:px-10 py-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-lead text-ink" style={{ ...SERIF, letterSpacing: '0.04em' }}>BOUZEUR</span>
            <FooterIcons figmaHref={FIGMA} />
          </div>
        </footer>

      </main>
    </>
  )
}
