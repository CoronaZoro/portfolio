import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'

// ── DevDNA palette (GitHub-dark) ───────────────────────────────────────────────
// Text colours come from the shared tokens (text-ink / text-soft / text-muted).
const BG          = '#0d1117'
const CARD        = '#161b22'
const CARD2       = '#1c2128'
const ACCENT      = '#7c6af7' // brand purple — large type and marks only (4.3:1 on CARD)
const ACCENT_TEXT = '#9d90fa' // purple for body-size text (6.4:1 on CARD)
const TINT        = 'rgba(124,106,247,0.08)'
const GREEN       = '#27c93f'
const MONO        = 'var(--font-mono, "JetBrains Mono", monospace)' // real code only

// ── Inline code ────────────────────────────────────────────────────────────────
function Code({ children }) {
  return (
    <code
      className="text-soft"
      style={{
        fontFamily: MONO,
        fontSize: '0.875em',
        background: TINT,
        borderRadius: 4,
        padding: '2px 6px',
      }}
    >
      {children}
    </code>
  )
}

// ── Breakdown item (left-bar accent) ───────────────────────────────────────────
function BreakdownItem({ title, children }) {
  return (
    <div style={{ borderLeft: `4px solid ${ACCENT}`, paddingLeft: 20 }}>
      <h3 className="text-lead font-medium mb-2" style={{ color: ACCENT_TEXT }}>{title}</h3>
      <p className="text-body">{children}</p>
    </div>
  )
}

// ── Terminal block (real command output — monospace is correct here) ──────────
function Terminal({ title = 'bash', children }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: '#0a0d12', fontFamily: MONO, fontSize: 16 }}>
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ background: CARD }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
        <span className="text-muted ml-2">{title}</span>
      </div>
      <div className="text-soft px-6 py-5 overflow-x-auto" style={{ lineHeight: '32px' }}>
        {children}
      </div>
    </div>
  )
}

// ── Image placeholder (fallback when a feature has no media yet) ───────────────
function ImgPlaceholder({ label, ratio = '16/10' }) {
  return (
    <div
      className="text-muted text-body flex flex-col items-center justify-center gap-2 rounded-xl"
      style={{ background: CARD, aspectRatio: ratio }}
    >
      {/* Replace this entire div with <img src="..." alt="..." className="w-full h-full object-cover rounded-xl" /> */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
      <span>{label}</span>
    </div>
  )
}

// ── Section heading + intro, two columns ──────────────────────────────────────
function SectionIntro({ title, children, className = 'mb-16' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start ${className}`}>
      <h2 className="anim-fade-up font-heading text-head font-medium text-ink" style={{ animationDelay: '0.1s' }}>
        {title}
      </h2>
      {children && (
        <p className="anim-fade-up text-body md:pt-1" style={{ animationDelay: '0.2s' }}>
          {children}
        </p>
      )}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DevDNAPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 text-soft" style={{ background: BG }}>

        {/* ════════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-10 pt-24 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">

            {/* Left — title + one-liner */}
            <div className="anim-fade-up" style={{ animationDelay: '0.2s' }}>
              <h1 className="font-heading text-display font-medium text-ink mb-6">
                Dev<span style={{ color: ACCENT }}>DNA</span><span className="text-muted">.</span>
              </h1>
              <p className="text-body max-w-[40ch] mb-6">
                Drop in a GitHub username. Get a complete read of the engineer behind it.
              </p>
              <p className="text-muted mb-6" style={{ fontFamily: MONO, fontSize: 16 }}>
                $ devdna analyze &lt;username&gt;
              </p>
              <p className="text-body text-muted flex items-center gap-3">
                Software · AI tool
                <span className="inline-flex items-center gap-2 font-medium" style={{ color: GREEN }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, display: 'inline-block' }} />
                  Live
                </span>
              </p>
            </div>

            {/* Right — facts */}
            <dl className="anim-fade-up grid grid-cols-1 sm:grid-cols-2 gap-2" style={{ animationDelay: '0.3s' }}>
              {[
                { label: 'Role',   value: 'Full Stack Developer' },
                { label: 'Type',   value: 'Developer tool (shipped)' },
                { label: 'Stack',  value: 'Next.js · TypeScript · Claude API · GitHub API · Upstash Redis' },
                { label: 'Status', value: 'Live', color: GREEN },
              ].map(({ label, value, color }) => (
                <div key={label} className="p-5 rounded-xl" style={{ background: CARD }}>
                  <dt className="text-body text-muted">{label}</dt>
                  <dd className={`text-body font-medium mt-1 ${color ? '' : 'text-ink'}`} style={color ? { color } : undefined}>{value}</dd>
                </div>
              ))}
            </dl>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            HERO BANNER
        ════════════════════════════════════════════════════════════════════ */}
        <img
          src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/DevDNA_Banner.png"
          alt="DevDNA hero banner"
          className="w-full"
          style={{ display: 'block' }}
        />

        {/* ════════════════════════════════════════════════════════════════════
            OVERVIEW
        ════════════════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-10 py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — headline + breakdown */}
            <div>
              <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-6" style={{ animationDelay: '0.1s' }}>
                A profile full of green squares tells you nothing about the engineer behind them.
              </h2>
              <p className="anim-fade-up text-body mb-12" style={{ animationDelay: '0.2s' }}>
                GitHub profiles are aesthetic. Customized READMEs, pinned repos, contribution graphs — they look impressive. But none of it tells you how someone actually writes code, when they work, or whether their commit habits suggest a disciplined engineer or someone who ships everything at 2am before a deadline.
              </p>

              <div className="anim-fade-up flex flex-col gap-8" style={{ animationDelay: '0.25s' }}>
                <BreakdownItem title="The aesthetic problem">
                  Developers spend hours making their profile look good. Badges, shields, animated banners. It looks great. It says nothing about how they actually code.
                </BreakdownItem>
                <BreakdownItem title="The information gap">
                  Commit cadence, language trajectory, coding time patterns, message quality — the signal is all there in the data. Nobody is reading it.
                </BreakdownItem>
                <BreakdownItem title="The recruiter problem">
                  A hiring manager opening a GitHub profile sees a grid of squares and a list of repo names. There&rsquo;s no layer that translates raw activity into readable signal.
                </BreakdownItem>
              </div>
            </div>

            {/* Right — terminal */}
            <div className="anim-fade-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-body italic mb-4">
                I ran it on my own GitHub first. Here&rsquo;s what it found:
              </p>
              <Terminal title="devdna — bash">
                <p className="text-muted">$ devdna analyze CoronaZoro</p>
                <p className="text-muted">{'>'} Fetching repos... <span style={{ color: GREEN }}>done</span></p>
                <p className="text-muted">{'>'} Running 3 parallel analyses... <span style={{ color: GREEN }}>done</span></p>
                <div style={{ height: 12 }} />
                <p>
                  <span style={{ color: ACCENT_TEXT }}>persona</span>
                  <span className="text-muted">{' '}&nbsp;→&nbsp;</span>
                  <span className="text-ink">&ldquo;The Midnight Architect&rdquo;</span>
                </p>
                <p>
                  <span style={{ color: ACCENT_TEXT }}>commits</span>
                  <span className="text-muted">{' '}&nbsp;→&nbsp;</span>
                  <span className="text-ink">81 analyzed · grade <span style={{ color: '#ffbd2e' }}>B+</span></span>
                </p>
                <p>
                  <span style={{ color: ACCENT_TEXT }}>pattern</span>
                  <span className="text-muted">{' '}&nbsp;→&nbsp;</span>
                  <span className="text-ink">late night · solo · JavaScript</span>
                </p>
                <div style={{ height: 12 }} />
                <p className="italic">
                  &ldquo;You&rsquo;re a disciplined builder. You also need to go outside.&rdquo;
                </p>
              </Terminal>

              {/* Stat callout below terminal */}
              <div className="mt-4 px-5 py-4 rounded-lg flex items-center gap-4" style={{ background: TINT }}>
                <span className="font-heading text-head font-medium" style={{ color: ACCENT_TEXT }}>3</span>
                <p className="text-body">
                  independent AI analyses run in parallel — fingerprint, commit score, health audit.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SOLUTION — Pipeline visualization
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ background: CARD }} className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">

            <SectionIntro title="GitHub shows you the commits. DevDNA shows you the developer." className="mb-16">
              Drop in any GitHub username and DevDNA runs it through a four-stage pipeline. Fetching your activity, transforming raw data into readable signals, running three parallel AI analyses, and serving everything cached and fast. No setup. No configuration. Just a username.
            </SectionIntro>

            {/* Pipeline flow */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-4 gap-2" style={{ animationDelay: '0.25s' }}>
              {[
                { label: 'Fetch',     title: 'Data ingestion',    desc: 'Top-15 repos by pushed_at, commit history, language breakdown. Under 20 API calls.' },
                { label: 'Transform', title: 'Signal extraction', desc: 'Raw commits become time buckets, cadence scores, message quality grades, and language vectors.' },
                { label: 'Analyze',   title: 'Parallel AI calls', desc: 'Three independent Claude calls run simultaneously — Fingerprint, Commit Score, Health Audit.' },
                { label: 'Serve',     title: 'Cached delivery',   desc: 'Every result cached in Upstash Redis at the feature level. 24h TTL. Mode-aware.' },
              ].map(({ label, title, desc }, i) => (
                <div key={label} className="relative p-6 rounded-xl" style={{ background: BG }}>
                  <p className="text-body font-medium mb-4" style={{ color: ACCENT_TEXT }}>{label}</p>
                  {/* Arrow connector between stages (desktop) */}
                  {i < 3 && (
                    <span
                      className="hidden md:flex absolute items-center justify-center rounded-full"
                      style={{
                        right: -16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 24,
                        height: 24,
                        background: ACCENT,
                        color: '#fff',
                        fontSize: 12,
                        zIndex: 2,
                      }}
                    >
                      →
                    </span>
                  )}
                  <h3 className="text-lead font-medium text-ink mb-2">{title}</h3>
                  <p className="text-body">{desc}</p>
                </div>
              ))}
            </div>

            {/* Three outputs below pipeline */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-3 gap-2 mt-2" style={{ animationDelay: '0.3s' }}>
              {[
                { label: 'Engineering fingerprint', desc: 'Archetypal persona + 3 sharp, specific insights grounded in your actual data.' },
                { label: 'Commit story',            desc: 'Last 50 commits scored, graded, broken down. Message quality is a signal.' },
                { label: 'Stack trajectory',        desc: 'Where your languages are trending. Predictive without any ML model.' },
              ].map(({ label, desc }) => (
                <div key={label} className="p-6 rounded-xl" style={{ background: TINT }}>
                  <h3 className="text-lead font-medium text-ink mb-2">{label}</h3>
                  <p className="text-body">{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            TECHNICAL — Metrics grid + breakdown
        ════════════════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">

            <SectionIntro title="Built to survive real traffic without burning through API credits.">
              Every architectural decision was made with two constraints in mind: GitHub&rsquo;s rate limits and Claude API costs. The pipeline runs four stages — data ingestion, transformation, AI analysis, and cached delivery.
            </SectionIntro>

            {/* Architecture diagram */}
            <div className="anim-fade-up mb-16" style={{ animationDelay: '0.2s' }}>
              <img
                src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/devdna_architecture_diagram.svg"
                alt="DevDNA system architecture diagram"
                className="rounded-xl w-full md:w-1/2 mx-auto"
                style={{ display: 'block' }}
              />
            </div>

            {/* 2×2 metric cards */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-2" style={{ animationDelay: '0.25s' }}>
              {[
                {
                  metric: '< 20',
                  unit: 'API calls',
                  label: 'Top-15 repo cap',
                  body: <>GitHub&rsquo;s unauthenticated API allows 60 req/hr. Sorting by <Code>pushed_at</Code> and capping at 15 repos keeps every full analysis under 20 calls enough headroom for concurrent users without needing auth.</>,
                },
                {
                  metric: '~60%',
                  unit: 'faster',
                  label: 'Parallel Claude calls',
                  body: 'Fingerprint, Commit Score, and Health Audit are independent. Running them in parallel instead of sequentially cuts total AI response time by approximately 60%. Each uses a deterministic system prompt engineered to return structured output.',
                },
                {
                  metric: '2×',
                  unit: 'cache keys',
                  label: 'Mode-aware cache',
                  body: 'Every response is cached at feature level in Upstash Redis with a 24h TTL. NORMAL and ROAST modes cache separately, switching modes on the second view is instant. Caching the whole page would invalidate clean data on a mode toggle.',
                },
                {
                  metric: '0',
                  unit: 'ML models',
                  label: 'Stack trajectory without ML',
                  body: 'Repos split into three time buckets. Language share calculated per bucket. Acceleration vector extrapolated forward six months. Directionally accurate with no training data, no model, no cold start.',
                },
              ].map(({ metric, unit, label, body }) => (
                <div key={label} className="p-7 rounded-xl flex flex-col gap-4" style={{ background: CARD }}>
                  {/* Metric callout */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-heading text-head font-medium" style={{ color: ACCENT_TEXT }}>{metric}</span>
                    <span className="text-body text-muted">{unit}</span>
                  </div>
                  <h3 className="text-lead font-medium text-ink">{label}</h3>
                  <p className="text-body">{body}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FEATURES
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ background: CARD }} className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">

            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-16 max-w-[20ch]" style={{ animationDelay: '0.1s' }}>
              What DevDNA actually tells you.
            </h2>

            {/* Feature rows */}
            {[
              {
                tag: 'Dashboard',
                title: 'Everything about your GitHub. At a glance.',
                copy: 'From contribution heatmap to language breakdown, commit velocity to coding time patterns, DevDNA surfaces the full picture of how you work the moment you land on the page.',
                videoSrc: 'https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Engi_Foot.mov',
                imgSrc: null,
                imgAlt: 'Dashboard overview',
              },
              {
                tag: 'Roast / Normal',
                title: 'Same data. Completely different read.',
                copy: 'Normal mode gives you a professional analysis. Roast mode gives you the version your brutally honest senior engineer would write. Both are cached separately so switching is instant on the second view.',
                videoSrc: 'https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/RVN.mp4',
                imgSrc: null,
                imgAlt: 'Roast / Normal toggle',
              },
              {
                tag: 'Repo summaries',
                title: 'Lazy-loaded. Only analyzed when you need it.',
                copy: 'Every repository can be expanded for an AI-generated summary. Claude only analyzes a repo when you click it, keeping the initial page fast and API costs proportional to actual usage.',
                videoSrc: 'https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Repo.mp4',
                imgSrc: null,
                imgAlt: 'Repo summaries expanding',
              },
              {
                tag: 'Engineering fingerprint',
                title: 'An archetypal read of how you actually engineer.',
                copy: 'DevDNA reads your commit patterns, language trajectory, and coding habits. Then distills it into a persona label and three sharp, specific insights. No generic output. Everything grounded in your actual data.',
                videoSrc: null,
                imgSrc: 'https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/EN_FOOT.png',
                imgAlt: 'Engineering Fingerprint',
              },
            ].map(({ tag, title, copy, videoSrc, imgSrc, imgAlt }, i, arr) => (
              <div key={tag} className="anim-fade-up" style={{ marginBottom: i < arr.length - 1 ? 128 : 0 }}>

                {/* Text header row — title left, copy right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start mb-12">
                  <div>
                    <h3 className="font-heading text-head font-medium text-ink">{title}</h3>
                    <p className="text-body font-medium mt-2" style={{ color: ACCENT_TEXT }}>{tag}</p>
                  </div>
                  <p className="text-body md:pt-1">{copy}</p>
                </div>

                {/* Full-width media */}
                <div className="rounded-xl overflow-hidden">
                  {videoSrc
                    ? (
                      <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full"
                        style={{ display: 'block', pointerEvents: 'none' }}
                      />
                    )
                    : imgSrc
                    ? <img src={imgSrc} alt={imgAlt} className="w-full" style={{ display: 'block' }} />
                    : <ImgPlaceholder label={imgAlt} ratio="16/9" />
                  }
                </div>

              </div>
            ))}

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            REFLECTION
        ════════════════════════════════════════════════════════════════════ */}
        <section className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">

            <h2 className="anim-fade-up font-heading text-head font-medium text-ink mb-12 max-w-[20ch]" style={{ animationDelay: '0.1s' }}>
              What this project taught me.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
              {[
                {
                  bold: 'Caching is system design, not an afterthought.',
                  copy: 'Getting the cache architecture wrong has real consequences such as burned API credits, stale data, or a mode toggle that invalidates perfectly good GitHub data. Thinking about what to cache, at what level, and for how long forced me to think about the system holistically before writing a single line.',
                },
                {
                  bold: 'Parallel API calls are worth the complexity.',
                  copy: 'Running three Claude calls sequentially felt simpler at first. The 60% speed difference changed my mind. Thinking about what can run independently versus what depends on prior output is now a habit I bring to every API-heavy project.',
                },
                {
                  bold: 'Prompt engineering is an output contract.',
                  copy: 'Generic prompts produce generic output. The breakthrough was treating each Claude call as a structured contract — specifying exact output format, anti-patterns to avoid, and grounding instructions that force the model to work from the data rather than fill gaps with assumptions.',
                },
                {
                  bold: 'Building for yourself is the best user research.',
                  copy: "Running DevDNA on my own GitHub first wasn't just a test. It told me immediately what felt useful and what felt hollow. The roast mode came from that session. The best product decisions came from being the user.",
                },
              ].map(({ bold, copy }) => (
                <div key={bold} className="anim-fade-up">
                  <h3 className="text-lead font-medium text-ink mb-3">{bold}</h3>
                  <p className="text-body">{copy}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════════ */}
        <footer style={{ background: CARD }} className="px-6 md:px-10 py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-heading text-lead font-medium" style={{ color: ACCENT_TEXT }}>DevDNA.</p>
              <p className="text-body text-muted">© 2025 Randy Dawn Tai</p>
            </div>
            <FooterIcons />
          </div>
        </footer>

      </main>
    </>
  )
}
