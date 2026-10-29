import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'

const FACTS = [
  ['Role',        'AI/ML UX'],
  ['Timeline',    'February – March 2025'],
  ['Team',        '1 frontend engineer, 1 NLP engineer, 1 AI/ML engineer'],
  ['Built with',  'Machine learning, object detection, NLP'],
]

const SHOWCASE = [
  {
    src: '/Fall.png',
    title: 'Fall detected',
    body: 'When a fall is confirmed, the status flips to red and an alert is sent instantly to nearby responders via LINE. The reason: fall confirmed velocity and position both crossed the threshold.',
  },
  {
    src: '/sleeping.png',
    title: 'Sleeping',
    body: 'The biggest hurdle: sleeping looks almost identical to falling. Guardian uses skeleton overlay, aspect ratio, and hip velocity to classify the state as SLEEPING so no false alarm is triggered.',
  },
  {
    src: '/Dashboard.png',
    title: 'Dashboard',
    body: 'The responder dashboard monitors the live feed in real time. When no incident is active, the system stays on standby ready to be called up whenever.',
  },
]

const IMPACT = [
  ['Faster response', 'Traditional fall detection relies on someone walking past. With Guardian, a responder can be alerted and on their way within 60 seconds of a confirmed fall before "The Long Lie" even begins.'],
  ['Lower staffing costs', 'Hospitals using virtual monitoring systems have reported reducing their reliance on 1-on-1 patient sitters by 75%, with annual savings of up to $4.7 million per facility.'],
  ['No privacy compromise', 'Guardian detects falls using skeletal pose and movement data, not facial recognition. No identifiable features are stored or processed, making it viable in privacy-sensitive environments like hospitals and care homes.'],
  ['Runs on existing cameras', 'No new cameras needed. Guardian runs on existing CCTV setups, meaning facilities can deploy it without significant hardware investment.'],
]

export default function GuardianPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 bg-ground text-ink" style={{ fontFamily: 'var(--font-sans)' }}>

        {/* ── Hero ── */}
        <section className="px-6 md:px-10 pt-20 md:pt-28 pb-12 max-w-7xl mx-auto">
          <h1 className="anim-fade-up text-display font-medium" style={{ animationDelay: '0.35s' }}>
            Guardian
          </h1>
          <p className="anim-fade-up text-lead mt-6 max-w-[34ch]" style={{ animationDelay: '0.55s' }}>
            Real-time fall detection for hospitals and care facilities. Hackathon winner.
          </p>
        </section>

        {/* ── Thumbnail ── */}
        <section className="anim-fade-up px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto" style={{ animationDelay: '0.65s' }}>
          <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full">
            <div className="w-full md:w-2/5 flex flex-col items-center justify-center gap-4 py-10 md:py-0" style={{ background: '#0a0f0d', minHeight: '180px' }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
                <path d="M28 4L6 14v14c0 12.7 9.4 24.6 22 28 12.6-3.4 22-15.3 22-28V14L28 4z" fill="#1a2e1a" stroke="#4ade80" strokeWidth="1.5"/>
                <path d="M21 28l5 5 9-9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-xl font-bold tracking-[0.2em]">GUARDIAN</span>
            </div>
            <div className="w-full md:w-3/5 flex items-center justify-center px-6 md:px-10 py-8" style={{ background: '#0d1117' }}>
              <img src="/Dashboard.png" alt="Guardian responder dashboard" className="w-full rounded-lg" style={{ objectFit: 'contain', maxHeight: '320px' }} />
            </div>
          </div>
        </section>

        {/* ── Overview ── */}
        <section className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-2">
            <p className="anim-fade-up text-lead max-w-[40ch]" style={{ animationDelay: '0.1s' }}>
              Guardian is a real-time fall detection system built for hospitals, care facilities, and large spaces where staff coverage is limited.
            </p>
            <p className="anim-fade-up text-body mt-6 max-w-[62ch]" style={{ animationDelay: '0.2s' }}>
              It monitors a space 24/7 using a camera feed, automatically detects when a person has fallen, and instantly alerts nearby responders via LINE, all without storing any identifiable facial data.
            </p>
            <p className="anim-fade-up text-body mt-4 max-w-[62ch]" style={{ animationDelay: '0.3s' }}>
              The system distinguishes between falling and sleeping using skeletal pose estimation, hip velocity, and aspect ratio analysis, solving the hardest problem in fall detection. When a fall is confirmed, responders are notified within seconds and can monitor the situation live through the dashboard.
            </p>
          </div>
          <dl className="anim-fade-up flex flex-col gap-6 bg-surface rounded-2xl p-6 md:p-8 self-start" style={{ animationDelay: '0.2s' }}>
            {FACTS.map(([label, value]) => (
              <div key={label}>
                <dt className="text-small text-muted">{label}</dt>
                <dd className="text-body mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Problem / Solution ── */}
        <section className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="anim-fade-up text-head font-medium" style={{ animationDelay: '0.1s' }}>The long fall</h2>
            <p className="anim-fade-up text-body mt-6 max-w-[62ch]" style={{ animationDelay: '0.2s' }}>
              Falls are the second leading cause of unintentional injury deaths worldwide. In hospitals and care facilities, the real danger isn&apos;t the fall itself, it&apos;s the time before someone finds you. We called this &ldquo;The Long Lie.&rdquo; A person on the floor for over an hour faces serious risk of dehydration, muscle breakdown, and death. With limited night staff and large facilities, this gap is a real and unsolved problem.
            </p>
          </div>
          <div>
            <h2 className="anim-fade-up text-head font-medium" style={{ animationDelay: '0.15s' }}>A supervisor that never sleeps</h2>
            <p className="anim-fade-up text-body mt-6 max-w-[62ch]" style={{ animationDelay: '0.25s' }}>
              A 24/7 automated vigilance system that triggers an instant alert the moment a fall is validated. It acts as a Digital Supervisor that fills this gap during night shifts or in low-traffic areas like warehouses or hallways.
            </p>
          </div>
        </section>

        {/* ── System showcase ── */}
        <section className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto">
          <h2 className="anim-fade-up text-head font-medium mb-12 md:mb-16" style={{ animationDelay: '0.1s' }}>The system in action</h2>
          <div className="flex flex-col gap-20">
            {SHOWCASE.map(({ src, title, body }, i) => (
              <div key={title} className="anim-fade-up flex flex-col md:flex-row gap-8 md:gap-12 items-start" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
                <div className="w-full md:w-3/5 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={src} alt={title} className="w-full object-cover" />
                </div>
                <div className="md:w-2/5">
                  <h3 className="text-lead font-medium">{title}</h3>
                  <p className="text-body mt-3">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Beyond the prototype ── */}
        <section className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto">
          <h2 className="anim-fade-up text-head font-medium mb-12 md:mb-16" style={{ animationDelay: '0.1s' }}>Beyond the prototype</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {IMPACT.map(([title, body], i) => (
              <li key={title} className="anim-fade-up" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
                <h3 className="text-lead font-medium">{title}</h3>
                <p className="text-body mt-3 max-w-[56ch]">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── What I learned ── */}
        <section className="px-6 md:px-10 pb-24 md:pb-32 max-w-7xl mx-auto">
          <h2 className="anim-fade-up text-head font-medium" style={{ animationDelay: '0.1s' }}>What I learned</h2>
          <p className="anim-fade-up text-body mt-6 max-w-[62ch]" style={{ animationDelay: '0.2s' }}>
            Guardian was my first time working with machine learning end to end from sourcing datasets and training a model to integrating it into a live system. I learned how to use FastAPI and WebSockets to pipe real-time detection data into a frontend, which pushed me to think about UX differently. Designing for a live feed means the interface has to communicate system states instantly so there&apos;s no loading screen to hide behind. It made me a more practical designer, one who thinks about how data actually moves before deciding how it should look.
          </p>
          <a
            href="https://github.com/CoronaZoro/falldetection"
            target="_blank"
            rel="noopener noreferrer"
            className="anim-fade-up inline-flex items-center gap-2 mt-10 bg-ink text-ground text-body font-medium px-8 py-3 rounded-full transition-opacity hover:opacity-85"
            style={{ animationDelay: '0.3s' }}
          >
            View on GitHub →
          </a>
        </section>

        {/* ── Footer ── */}
        <footer className="px-6 md:px-10 py-12 bg-surface">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <span className="text-lead font-medium">Guardian</span>
            <FooterIcons figmaHref="https://www.figma.com/@saiywetphoneaun" />
          </div>
        </footer>

      </main>
    </>
  )
}
