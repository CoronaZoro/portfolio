import Navbar from '../../components/Navbar'

export default function GuardianPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: '#0e0c0a', color: '#ffffff', fontFamily: 'var(--font-sans)' }}>

        {/* ── Hero title ── */}
        <section className="px-6 md:px-10 pt-20 pb-12 max-w-7xl mx-auto">
          <h1 className="anim-fade-up text-4xl md:text-6xl font-medium leading-tight mb-3" style={{ animationDelay: '0.35s' }}>
            Guardian Real-Time Fall Detection System
          </h1>
          <p className="anim-fade-up text-sm text-white/30 tracking-widest uppercase" style={{ animationDelay: '0.55s' }}>
            Hackathon Winner | Machine Learning | Object Detection | NLP | UX
          </p>
        </section>

        {/* ── Thumbnail ── */}
        <section className="anim-fade-up px-6 md:px-10 pb-20 max-w-7xl mx-auto" style={{ animationDelay: '0.65s' }}>
          <div className="flex rounded-2xl overflow-hidden w-full" style={{ minHeight: '400px' }}>
            <div className="w-2/5 flex flex-col items-center justify-center gap-4 flex-shrink-0" style={{ background: '#0a0f0d' }}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                <path d="M28 4L6 14v14c0 12.7 9.4 24.6 22 28 12.6-3.4 22-15.3 22-28V14L28 4z" fill="#1a2e1a" stroke="#4ade80" strokeWidth="1.5"/>
                <path d="M21 28l5 5 9-9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-xl font-bold tracking-[0.2em]">GUARDIAN</span>
            </div>
            <div className="w-3/5 flex-shrink-0 flex items-center justify-center px-10 py-8" style={{ background: '#0d1117' }}>
              <img src="/Dashboard.png" alt="Guardian Dashboard" className="w-full rounded-lg" style={{ objectFit: 'contain', maxHeight: '320px' }} />
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 max-w-7xl mx-auto" />

        {/* ── Overview ── */}
        <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <p className="anim-fade-up text-sm tracking-[0.15em] uppercase text-white/60 mb-5" style={{ animationDelay: '0.1s' }}>Overview</p>
            <p className="anim-fade-up text-base text-white/70 leading-relaxed mb-5" style={{ animationDelay: '0.2s' }}>
              Guardian is a real-time fall detection system built for hospitals, care facilities, and large spaces where staff coverage is limited. It monitors a space 24/7 using a camera feed, automatically detects when a person has fallen, and instantly alerts nearby responders via LINE, all without storing any identifiable facial data.
            </p>
            <p className="anim-fade-up text-base text-white/70 leading-relaxed" style={{ animationDelay: '0.3s' }}>
              The system distinguishes between falling and sleeping using skeletal pose estimation, hip velocity, and aspect ratio analysis, solving the hardest problem in fall detection. When a fall is confirmed, responders are notified within seconds and can monitor the situation live through the dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <div className="anim-fade-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-2">My Role</p>
              <p className="text-base text-white/70">AI/ML UX</p>
            </div>
            <div className="anim-fade-up border-t border-white/10 pt-6" style={{ animationDelay: '0.3s' }}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-2">Timeline</p>
              <p className="text-base text-white/70">February 2025 – March 2025</p>
            </div>
            <div className="anim-fade-up border-t border-white/10 pt-6" style={{ animationDelay: '0.4s' }}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-2">Team</p>
              <p className="text-base text-white/70">1 frontend engineer<br/>1 NLP engineer<br/>1 AI/ML engineer</p>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 max-w-7xl mx-auto" />

        {/* ── Problem / Solution ── */}
        <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="anim-fade-up text-sm tracking-[0.15em] uppercase text-white/55 mb-4" style={{ animationDelay: '0.1s' }}>The Problem</p>
            <h2 className="anim-fade-up text-4xl font-medium mb-6" style={{ animationDelay: '0.2s' }}>The Long Fall</h2>
            <p className="anim-fade-up text-base text-white/60 leading-relaxed" style={{ animationDelay: '0.3s' }}>
              Falls are the second leading cause of unintentional injury deaths worldwide. In hospitals and care facilities, the real danger isn't the fall itself, it's the time before someone finds you. We called this "The Long Lie." A person on the floor for over an hour faces serious risk of dehydration, muscle breakdown, and death. With limited night staff and large facilities, this gap is a real and unsolved problem.
            </p>
          </div>
          <div className="md:text-right">
            <p className="anim-fade-up text-sm tracking-[0.15em] uppercase text-white/55 mb-4" style={{ animationDelay: '0.15s' }}>The Solution</p>
            <h2 className="anim-fade-up text-4xl font-bold mb-6 tracking-wider" style={{ animationDelay: '0.25s' }}>GUARDIAN</h2>
            <p className="anim-fade-up text-base text-white/60 leading-relaxed" style={{ animationDelay: '0.35s' }}>
              A 24/7 automated vigilance system that triggers an instant alert the moment a fall is validated. It acts as a Digital Supervisor that fills this gap during night shifts or in low-traffic areas like warehouses or hallways.
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 max-w-7xl mx-auto" />

        {/* ── System Showcase ── */}
        <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
          <p className="anim-fade-up text-sm tracking-[0.15em] uppercase text-white/60 mb-12" style={{ animationDelay: '0.1s' }}>System Showcase</p>
          <div className="flex flex-col gap-20">

            <div className="anim-fade-up flex flex-col md:flex-row gap-10 items-start" style={{ animationDelay: '0.15s' }}>
              <div className="w-full md:w-3/5 rounded-xl overflow-hidden flex-shrink-0">
                <img src="/Fall.png" alt="Fall Detected" className="w-full object-cover" />
              </div>
              <div className="md:w-2/5">
                <h3 className="text-2xl font-medium mb-4">Fall Detected</h3>
                <p className="text-base text-white/60 leading-relaxed">
                  When a fall is confirmed, the status flips to red and an alert is sent instantly to nearby responders via LINE. The reason: fall confirmed velocity and position both crossed the threshold.
                </p>
              </div>
            </div>

            <div className="anim-fade-up flex flex-col md:flex-row gap-10 items-start" style={{ animationDelay: '0.2s' }}>
              <div className="w-full md:w-3/5 rounded-xl overflow-hidden flex-shrink-0">
                <img src="/sleeping.png" alt="Sleeping" className="w-full object-cover" />
              </div>
              <div className="md:w-2/5">
                <h3 className="text-2xl font-medium mb-4">Sleeping</h3>
                <p className="text-base text-white/60 leading-relaxed">
                  The biggest hurdle: sleeping looks almost identical to falling. Guardian uses skeleton overlay, aspect ratio, and hip velocity to classify the state as SLEEPING so no false alarm is triggered.
                </p>
              </div>
            </div>

            <div className="anim-fade-up flex flex-col md:flex-row gap-10 items-start" style={{ animationDelay: '0.25s' }}>
              <div className="w-full md:w-3/5 rounded-xl overflow-hidden flex-shrink-0">
                <img src="/Dashboard.png" alt="Dashboard" className="w-full object-cover" />
              </div>
              <div className="md:w-2/5">
                <h3 className="text-2xl font-medium mb-4">Dashboard</h3>
                <p className="text-base text-white/60 leading-relaxed">
                  The responder dashboard monitors the live feed in real time. When no incident is active, the system stays on standby ready to be called up whenever.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 max-w-7xl mx-auto" />

        {/* ── Beyond the Prototype ── */}
        <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto">
          <p className="anim-fade-up text-sm tracking-[0.15em] uppercase text-white/60 mb-10" style={{ animationDelay: '0.1s' }}>Beyond the Prototype</p>
          <div className="flex flex-col gap-8">
            {[
              ['01 — Faster Response', 'Traditional fall detection relies on someone walking past. With Guardian, a responder can be alerted and on their way within 60 seconds of a confirmed fall before "The Long Lie" even begins.'],
              ['02 — Reducing Staffing Costs', 'Hospitals using virtual monitoring systems have reported reducing their reliance on 1-on-1 patient sitters by 75%, with annual savings of up to $4.7 million per facility.'],
              ['03 — No Privacy Compromise', 'Guardian detects falls using skeletal pose and movement data, not facial recognition. No identifiable features are stored or processed, making it viable in privacy-sensitive environments like hospitals and care homes.'],
              ['04 — Scales With Existing Infrastructure', 'No new cameras needed. Guardian runs on existing CCTV setups, meaning facilities can deploy it without significant hardware investment.'],
            ].map(([title, body], i) => (
              <div key={i} className="anim-fade-up" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
                <p className="text-base font-medium text-white/90 mb-2">{title}</p>
                <p className="text-base text-white/50 leading-relaxed max-w-3xl">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 max-w-7xl mx-auto" />

        {/* ── What I Learned ── */}
        <section className="px-6 md:px-10 py-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-end justify-between">
          <div className="md:max-w-2xl">
            <p className="anim-fade-up text-sm tracking-[0.15em] uppercase text-white/60 mb-6" style={{ animationDelay: '0.1s' }}>What I Learned</p>
            <p className="anim-fade-up text-base text-white/60 leading-relaxed" style={{ animationDelay: '0.2s' }}>
              Guardian was my first time working with machine learning end to end from sourcing datasets and training a model to integrating it into a live system. I learned how to use FastAPI and WebSockets to pipe real-time detection data into a frontend, which pushed me to think about UX differently. Designing for a live feed means the interface has to communicate system states instantly so there's no loading screen to hide behind. It made me a more practical designer, one who thinks about how data actually moves before deciding how it should look.
            </p>
          </div>
          <div className="anim-fade-up flex-shrink-0" style={{ animationDelay: '0.3s' }}>
            <a
              href="https://github.com/CoronaZoro/falldetection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 text-base px-8 py-3 rounded-full hover:border-white/50 hover:text-white transition-colors"
            >
              View GitHub →
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="px-6 md:px-10 py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="text-sm font-bold tracking-[0.15em]">GUARDIAN</span>
            <div className="flex items-center gap-8">
              {[
                { label: 'Email', href: 'mailto:phonerandy7@gmail.com' },
                { label: 'Figma', href: '#' },
                { label: 'GitHub', href: 'https://github.com/CoronaZoro' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-ywet-phone-aung-053a55376/' },
                { label: 'Resume', href: '#' },
              ].map((link) => (
                <a key={link.label} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </main>
    </>
  )
}
