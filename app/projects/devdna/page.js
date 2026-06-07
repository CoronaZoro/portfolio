import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG      = '#0d1117'
const CARD    = '#161b22'
const CARD2   = '#1c2128'
const BORDER  = '#21262d'
const ACCENT  = '#7c6af7'
const MUTED   = 'rgba(255,255,255,0.38)'
const MUTED2  = 'rgba(255,255,255,0.55)'
const TEXT    = 'rgba(255,255,255,0.82)'
const MONO    = 'var(--font-mono, "JetBrains Mono", monospace)'

// ── Section label ──────────────────────────────────────────────────────────────
function Label({ children }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 10,
        fontWeight: 600,
        color: ACCENT,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: 28,
      }}
    >
      <span style={{ width: 16, height: 1, background: ACCENT, display: 'inline-block' }} />
      {children}
    </span>
  )
}

// ── Inline code ────────────────────────────────────────────────────────────────
function Code({ children }) {
  return (
    <code
      style={{
        fontFamily: MONO,
        fontSize: '0.88em',
        color: 'rgba(255,255,255,0.55)',
        background: 'rgba(124,106,247,0.08)',
        border: '1px solid rgba(124,106,247,0.15)',
        borderRadius: 4,
        padding: '1px 6px',
      }}
    >
      {children}
    </code>
  )
}

// ── Breakdown item (left-border accent) ────────────────────────────────────────
function BreakdownItem({ label, children, last = false }) {
  return (
    <div
      style={{
        borderLeft: `2px solid ${ACCENT}`,
        paddingLeft: 20,
        marginBottom: last ? 0 : 32,
      }}
    >
      <p
        style={{
          fontFamily: MONO,
          fontSize: 10,
          color: ACCENT,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        {label}
      </p>
      <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
        {children}
      </p>
    </div>
  )
}

// ── Terminal block ─────────────────────────────────────────────────────────────
function Terminal({ title = 'bash', children }) {
  return (
    <div
      style={{
        background: '#0a0d12',
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: MONO,
        fontSize: 13,
        boxShadow: `0 0 0 1px rgba(124,106,247,0.06), 0 8px 32px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          padding: '10px 16px',
          borderBottom: `1px solid ${BORDER}`,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: CARD,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, fontSize: 11, color: MUTED, letterSpacing: '0.04em' }}>{title}</span>
      </div>
      <div style={{ padding: '20px 24px', color: TEXT, lineHeight: 2 }}>
        {children}
      </div>
    </div>
  )
}

// ── Image placeholder ──────────────────────────────────────────────────────────
function ImgPlaceholder({ label, ratio = '16/10' }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        aspectRatio: ratio,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        color: MUTED,
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: '0.06em',
      }}
    >
      {/* Replace this entire div with <img src="..." alt="..." className="w-full h-full object-cover rounded-xl" /> */}
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
      <span style={{ opacity: 0.35, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</span>
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DevDNAPage() {
  return (
    <>
      <Navbar />
      <main
        className="pt-16"
        style={{ background: BG, color: '#ffffff', fontFamily: 'var(--font-sans)' }}
      >

        {/* ════════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════════ */}
        <section className="relative px-6 md:px-10 pt-24 pb-20 max-w-7xl mx-auto">

          {/* Subtle purple radial glow behind title */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 60,
              left: -80,
              width: 500,
              height: 400,
              background: 'radial-gradient(ellipse at center, rgba(124,106,247,0.10) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Category + status row */}
          <div className="anim-fade-up flex items-center gap-4 mb-12" style={{ animationDelay: '0.1s' }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: ACCENT,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Software / AI Tool
            </span>
            <span style={{ width: 1, height: 12, background: BORDER, display: 'inline-block' }} />
            {/* ● LIVE badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                fontWeight: 600,
                color: '#27c93f',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontFamily: MONO,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#27c93f',
                  display: 'inline-block',
                  boxShadow: '0 0 6px #27c93f',
                }}
              />
              Live
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — title + one-liner */}
            <div className="anim-fade-up" style={{ animationDelay: '0.2s' }}>
              <h1
                className="mb-6"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(3.2rem, 8vw, 6rem)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  color: '#ffffff',
                }}
              >
                Dev
                <span style={{ color: ACCENT }}>DNA</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>.</span>
              </h1>
              <p
                style={{
                  color: TEXT,
                  fontSize: 16,
                  lineHeight: 1.7,
                  maxWidth: 380,
                  marginBottom: 28,
                }}
              >
                Drop in a GitHub username. Get a complete read of the engineer behind it.
              </p>
              {/* Mono sub-line */}
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 12,
                  color: MUTED,
                  letterSpacing: '0.04em',
                }}
              >
                $ devdna analyze &lt;username&gt;
              </p>
            </div>

            {/* Right — metadata grid */}
            <div
              className="anim-fade-up"
              style={{
                animationDelay: '0.3s',
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {[
                { label: 'MY ROLE', value: 'Full Stack Developer' },
                { label: 'TYPE',    value: 'Developer Tool (Shipped)' },
                { label: 'STACK',   value: 'Next.js · TypeScript · Claude API · GitHub API · Upstash Redis' },
                { label: 'STATUS',  value: 'Live & deployed' },
              ].map(({ label, value }, i) => (
                <div
                  key={i}
                  style={{
                    padding: '18px 22px',
                    borderBottom: i < 3 ? `1px solid ${BORDER}` : 'none',
                    borderLeft: 'none',
                    background: i % 2 === 0 ? CARD : CARD2,
                    transition: 'border-left-color 0.2s',
                  }}
                >
                  <p
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: MUTED,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                      fontFamily: MONO,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: i === 3 ? '#27c93f' : TEXT,
                      fontFamily: i === 2 || i === 3 ? MONO : 'var(--font-sans)',
                      lineHeight: 1.5,
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            HERO BANNER
        ════════════════════════════════════════════════════════════════════ */}
        {/* HERO BANNER */}
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
          <Label>Overview</Label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — headline + breakdown */}
            <div>
              <h2
                className="anim-fade-up mb-6"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  animationDelay: '0.1s',
                }}
              >
                A profile full of green squares tells you nothing about the engineer behind them.
              </h2>

              <p
                className="anim-fade-up mb-12"
                style={{
                  color: TEXT,
                  lineHeight: 1.8,
                  fontSize: 15,
                  animationDelay: '0.2s',
                }}
              >
                GitHub profiles are aesthetic. Customized READMEs, pinned repos, contribution graphs — they look impressive. But none of it tells you how someone actually writes code, when they work, or whether their commit habits suggest a disciplined engineer or someone who ships everything at 2am before a deadline.
              </p>

              <div className="anim-fade-up flex flex-col gap-8" style={{ animationDelay: '0.25s' }}>
                <BreakdownItem label="I — The Aesthetic Problem">
                  Developers spend hours making their profile look good. Badges, shields, animated banners. It looks great. It says nothing about how they actually code.
                </BreakdownItem>
                <BreakdownItem label="II — The Information Gap">
                  Commit cadence, language trajectory, coding time patterns, message quality — the signal is all there in the data. Nobody is reading it.
                </BreakdownItem>
                <BreakdownItem label="III — The Recruiter Problem" last>
                  A hiring manager opening a GitHub profile sees a grid of squares and a list of repo names. There&rsquo;s no layer that translates raw activity into readable signal.
                </BreakdownItem>
              </div>
            </div>

            {/* Right — terminal */}
            <div className="anim-fade-up" style={{ animationDelay: '0.3s' }}>
              <p
                style={{
                  color: MUTED2,
                  fontSize: 13,
                  fontStyle: 'italic',
                  marginBottom: 14,
                  fontFamily: 'var(--font-sans)',
                }}
              >
                I ran it on my own GitHub first. Here&rsquo;s what it found:
              </p>
              <Terminal title="devdna — bash">
                <p style={{ color: MUTED }}>$ devdna analyze CoronaZoro</p>
                <p style={{ color: MUTED }}>{'>'} Fetching repos... <span style={{ color: '#27c93f' }}>done</span></p>
                <p style={{ color: MUTED }}>{'>'} Running 3 parallel analyses... <span style={{ color: '#27c93f' }}>done</span></p>
                <div style={{ height: 1, background: BORDER, margin: '12px 0' }} />
                <p>
                  <span style={{ color: ACCENT }}>persona</span>
                  <span style={{ color: MUTED }}>{' '}&nbsp;→&nbsp;</span>
                  <span style={{ color: '#ffffff' }}>"The Midnight Architect"</span>
                </p>
                <p>
                  <span style={{ color: ACCENT }}>commits</span>
                  <span style={{ color: MUTED }}>{' '}&nbsp;→&nbsp;</span>
                  <span style={{ color: '#ffffff' }}>81 analyzed · grade <span style={{ color: '#ffbd2e' }}>B+</span></span>
                </p>
                <p>
                  <span style={{ color: ACCENT }}>pattern</span>
                  <span style={{ color: MUTED }}>{' '}&nbsp;→&nbsp;</span>
                  <span style={{ color: '#ffffff' }}>late night · solo · JavaScript</span>
                </p>
                <div style={{ height: 1, background: BORDER, margin: '12px 0' }} />
                <p style={{ color: MUTED2, fontStyle: 'italic' }}>
                  &ldquo;You&rsquo;re a disciplined builder. You also need to go outside.&rdquo;
                </p>
              </Terminal>

              {/* Stat callout below terminal */}
              <div
                style={{
                  marginTop: 16,
                  padding: '14px 20px',
                  background: `rgba(124,106,247,0.06)`,
                  border: `1px solid rgba(124,106,247,0.18)`,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 18, fontWeight: 700, color: ACCENT, fontFamily: MONO }}>3</span>
                <p style={{ fontSize: 12, color: MUTED2, lineHeight: 1.5 }}>
                  independent AI analyses run in parallel — fingerprint, commit score, health audit.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SOLUTION — Pipeline visualization
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ borderTop: `1px solid ${BORDER}`, background: CARD }} className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">

            <Label>Solution</Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
              <h2
                className="anim-fade-up"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  animationDelay: '0.1s',
                }}
              >
                GitHub shows you the commits. DevDNA shows you the developer.
              </h2>
              <p
                className="anim-fade-up"
                style={{
                  color: TEXT,
                  lineHeight: 1.8,
                  fontSize: 15,
                  animationDelay: '0.2s',
                  paddingTop: 4,
                }}
              >
                Drop in any GitHub username and DevDNA runs it through a four-stage pipeline — fetching your activity, transforming raw data into readable signals, running three parallel AI analyses, and serving everything cached and fast. No setup. No configuration. Just a username.
              </p>
            </div>

            {/* Pipeline flow */}
            <div className="anim-fade-up" style={{ animationDelay: '0.25s' }}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                {[
                  {
                    step: '01',
                    label: 'Fetch',
                    title: 'Data Ingestion',
                    desc: 'Top-15 repos by pushed_at, commit history, language breakdown. Under 20 API calls.',
                    icon: '↓',
                  },
                  {
                    step: '02',
                    label: 'Transform',
                    title: 'Signal Extraction',
                    desc: 'Raw commits become time buckets, cadence scores, message quality grades, and language vectors.',
                    icon: '⇄',
                  },
                  {
                    step: '03',
                    label: 'Analyze',
                    title: 'Parallel AI Calls',
                    desc: 'Three independent Claude calls run simultaneously — Fingerprint, Commit Score, Health Audit.',
                    icon: '⟳',
                  },
                  {
                    step: '04',
                    label: 'Serve',
                    title: 'Cached Delivery',
                    desc: 'Every result cached in Upstash Redis at the feature level. 24h TTL. Mode-aware.',
                    icon: '→',
                  },
                ].map(({ step, label, title, desc, icon }, i) => (
                  <div
                    key={i}
                    style={{
                      borderLeft: `1px solid ${BORDER}`,
                      borderTop: `1px solid ${BORDER}`,
                      borderBottom: `1px solid ${BORDER}`,
                      borderRight: i === 3 ? `1px solid ${BORDER}` : 'none',
                      padding: '28px 24px',
                      position: 'relative',
                      background: BG,
                    }}
                  >
                    {/* Step number */}
                    <div
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        color: ACCENT,
                        letterSpacing: '0.16em',
                        marginBottom: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>{step} — {label.toUpperCase()}</span>
                      {/* Arrow connector (hidden on last) */}
                      {i < 3 && (
                        <span
                          className="hidden md:block"
                          style={{
                            position: 'absolute',
                            right: -12,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 22,
                            height: 22,
                            background: CARD,
                            border: `1px solid ${BORDER}`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 10,
                            color: ACCENT,
                            zIndex: 2,
                          }}
                        >
                          →
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#ffffff',
                        marginBottom: 10,
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </p>
                    <p style={{ fontSize: 13, color: MUTED2, lineHeight: 1.65 }}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Three outputs below pipeline */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-3 gap-4 mt-5" style={{ animationDelay: '0.3s' }}>
              {[
                {
                  n: '01',
                  label: 'Engineering Fingerprint',
                  desc: 'Archetypal persona + 3 sharp, specific insights grounded in your actual data.',
                },
                {
                  n: '02',
                  label: 'Commit Story',
                  desc: 'Last 50 commits scored, graded, broken down. Message quality is a signal.',
                },
                {
                  n: '03',
                  label: 'Stack Trajectory',
                  desc: "Where your languages are trending — predictive without any ML model.",
                },
              ].map(({ n, label, desc }) => (
                <div
                  key={label}
                  style={{
                    padding: '22px 22px',
                    border: `1px solid ${BORDER}`,
                    borderRadius: 10,
                    background: 'rgba(124,106,247,0.07)',
                  }}
                >
                  <p style={{ fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: '0.14em', marginBottom: 14 }}>{n}</p>
                  <p style={{ fontWeight: 700, fontSize: 14, color: '#ffffff', marginBottom: 10, lineHeight: 1.3 }}>{label}</p>
                  <p style={{ fontSize: 13, color: MUTED2, lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            TECHNICAL — Metrics grid + breakdown
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{ borderTop: `1px solid ${BORDER}` }} className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">

            <Label>Technical</Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-16">
              <h2
                className="anim-fade-up"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  animationDelay: '0.1s',
                }}
              >
                Built to survive real traffic without burning through API credits.
              </h2>
              <p
                className="anim-fade-up"
                style={{
                  color: TEXT,
                  lineHeight: 1.8,
                  fontSize: 15,
                  animationDelay: '0.2s',
                  paddingTop: 4,
                }}
              >
                Every architectural decision was made with two constraints in mind: GitHub&rsquo;s rate limits and Claude API costs. The pipeline runs four stages — data ingestion, transformation, AI analysis, and cached delivery.
              </p>
            </div>

            {/* Architecture diagram placeholder */}
            {/* ARCHITECTURE DIAGRAM */}
            <div className="anim-fade-up mb-16" style={{ animationDelay: '0.2s' }}>
              <img
                src="https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/devdna_architecture_diagram.svg"
                alt="DevDNA system architecture diagram"
                className="w-full rounded-xl"
                style={{ display: 'block', border: `1px solid ${BORDER}` }}
              />
            </div>

            {/* 2×2 metric cards grid */}
            <div className="anim-fade-up grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" style={{ animationDelay: '0.25s' }}>
              {[
                {
                  metric: '< 20',
                  unit: 'API calls',
                  label: 'I — Top-15 Repo Cap',
                  body: <>GitHub&rsquo;s unauthenticated API allows 60 req/hr. Sorting by <Code>pushed_at</Code> and capping at 15 repos keeps every full analysis under 20 calls — enough headroom for concurrent users without needing auth.</>,
                },
                {
                  metric: '~60%',
                  unit: 'faster',
                  label: 'II — Parallel Claude Calls',
                  body: 'Fingerprint, Commit Score, and Health Audit are independent. Running them in parallel instead of sequentially cuts total AI response time by approximately 60%. Each uses a deterministic system prompt engineered to return structured output.',
                },
                {
                  metric: '2×',
                  unit: 'cache keys',
                  label: 'III — Mode-Aware Cache',
                  body: 'Every response is cached at feature level in Upstash Redis with a 24h TTL. NORMAL and ROAST modes cache separately — switching modes on the second view is instant. Caching the whole page would invalidate clean data on a mode toggle.',
                },
                {
                  metric: '0',
                  unit: 'ML models',
                  label: 'IV — Stack Trajectory Without ML',
                  body: 'Repos split into three time buckets. Language share calculated per bucket. Acceleration vector extrapolated forward six months. Directionally accurate — no training data, no model, no cold start.',
                },
              ].map(({ metric, unit, label, body }, i) => (
                <div
                  key={i}
                  style={{
                    background: CARD,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 12,
                    padding: '28px 28px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  {/* Metric callout */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                        fontWeight: 700,
                        color: ACCENT,
                        lineHeight: 1,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {metric}
                    </span>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 12,
                        color: MUTED2,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {unit}
                    </span>
                  </div>
                  {/* Divider */}
                  <div style={{ height: 1, background: BORDER }} />
                  {/* Label */}
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      color: ACCENT,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </p>
                  {/* Body */}
                  <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.7 }}>{body}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FEATURES
        ════════════════════════════════════════════════════════════════════ */}
        <section
          style={{ borderTop: `1px solid ${BORDER}`, background: CARD }}
          className="px-6 md:px-10 py-24"
        >
          <div className="max-w-7xl mx-auto">

            <Label>Features</Label>

            <h2
              className="anim-fade-up mb-20"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: 460,
                animationDelay: '0.1s',
              }}
            >
              What DevDNA actually tells you.
            </h2>

            {/* Feature rows */}
            {[
              {
                n: '01',
                tag: 'Dashboard',
                title: 'Everything about your GitHub. At a glance.',
                copy: 'From contribution heatmap to language breakdown, commit velocity to coding time patterns — DevDNA surfaces the full picture of how you work the moment you land on the page.',
                // FEATURE 1 — Dashboard overview scroll GIF placeholder
                videoSrc: null,
                imgSrc: null,
                imgAlt: 'Dashboard overview scroll GIF',
              },
              {
                n: '02',
                tag: 'Roast / Normal',
                title: 'Same data. Completely different read.',
                copy: 'Normal mode gives you a professional analysis. Roast mode gives you the version your brutally honest senior engineer would write. Both are cached separately — switching is instant on the second view.',
                videoSrc: 'https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/RVN.mp4',
                imgSrc: null,
                imgAlt: 'Roast / Normal toggle GIF',
              },
              {
                n: '03',
                tag: 'Repo Summaries',
                title: 'Lazy-loaded. Only analyzed when you need it.',
                copy: 'Every repository can be expanded for an AI-generated summary. Claude only analyzes a repo when you click it — keeping the initial page fast and API costs proportional to actual usage.',
                videoSrc: 'https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Repo.mp4',
                imgSrc: null,
                imgAlt: 'Repo summaries expand GIF',
              },
              {
                n: '04',
                tag: 'Engineering Fingerprint',
                title: 'An archetypal read of how you actually engineer.',
                copy: 'DevDNA reads your commit patterns, language trajectory, and coding habits — then distills it into a persona label and three sharp, specific insights. No generic output. Everything grounded in your actual data.',
                videoSrc: 'https://glvaofqhx5qgyksk.public.blob.vercel-storage.com/portfolio/Engi_Foot.mov',
                imgSrc: null,
                imgAlt: 'Engineering Fingerprint in action',
              },
            ].map(({ n, tag, title, copy, videoSrc, imgSrc, imgAlt }) => (
              <div key={n} className="anim-fade-up" style={{ marginBottom: 140 }}>

                {/* Text header row — label left, copy right */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start"
                  style={{ marginBottom: 48 }}
                >
                  {/* Left: number + tag + title */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <span style={{ fontFamily: MONO, fontSize: 10, color: MUTED, letterSpacing: '0.1em' }}>{n}</span>
                      <span style={{ width: 1, height: 10, background: BORDER }} />
                      <span style={{ fontSize: 10, fontWeight: 600, color: ACCENT, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{tag}</span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        lineHeight: 1.25,
                      }}
                    >
                      {title}
                    </h3>
                  </div>
                  {/* Right: description */}
                  <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15, paddingTop: 4 }}>{copy}</p>
                </div>

                {/* Full-width media */}
                <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
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
                    ? (
                      <img
                        src={imgSrc}
                        alt={imgAlt}
                        className="w-full"
                        style={{ display: 'block' }}
                      />
                    )
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
        <section style={{ borderTop: `1px solid ${BORDER}` }} className="px-6 md:px-10 py-24">
          <div className="max-w-7xl mx-auto">

            <Label>Reflection</Label>

            <h2
              className="anim-fade-up mb-16"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                maxWidth: 440,
                animationDelay: '0.1s',
              }}
            >
              What this project taught me.
            </h2>

            <div style={{ maxWidth: 720 }}>
              {[
                {
                  num: '01',
                  bold: 'Caching is system design, not an afterthought.',
                  copy: "Getting the cache architecture wrong has real consequences — burned API credits, stale data, or a mode toggle that invalidates perfectly good GitHub data. Thinking about what to cache, at what level, and for how long forced me to think about the system holistically before writing a single line.",
                },
                {
                  num: '02',
                  bold: 'Parallel API calls are worth the complexity.',
                  copy: "Running three Claude calls sequentially felt simpler at first. The 60% speed difference changed my mind. Thinking about what can run independently versus what depends on prior output is now a habit I bring to every API-heavy project.",
                },
                {
                  num: '03',
                  bold: 'Prompt engineering is an output contract.',
                  copy: "Generic prompts produce generic output. The breakthrough was treating each Claude call as a structured contract — specifying exact output format, anti-patterns to avoid, and grounding instructions that force the model to work from the data rather than fill gaps with assumptions.",
                },
                {
                  num: '04',
                  bold: 'Building for yourself is the best user research.',
                  copy: "Running DevDNA on my own GitHub first wasn't just a test — it told me immediately what felt useful and what felt hollow. The roast mode came from that session. The best product decisions came from being the user.",
                },
              ].map(({ num, bold, copy }, i, arr) => (
                <div key={num}>
                  <div className="anim-fade-up flex gap-10 items-start py-10">
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
                        fontWeight: 700,
                        color: 'rgba(124,106,247,0.12)',
                        lineHeight: 1,
                        flexShrink: 0,
                        minWidth: 72,
                        letterSpacing: '-0.02em',
                        userSelect: 'none',
                      }}
                    >
                      {num}
                    </span>
                    <div style={{ paddingTop: 6 }}>
                      <p
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 700,
                          fontSize: 17,
                          color: '#ffffff',
                          marginBottom: 12,
                          lineHeight: 1.35,
                        }}
                      >
                        {bold}
                      </p>
                      <p style={{ color: TEXT, lineHeight: 1.8, fontSize: 15 }}>{copy}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ height: 1, background: BORDER }} />
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════════ */}
        <footer style={{ borderTop: `1px solid ${BORDER}`, background: CARD }} className="px-6 md:px-10 py-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p
                style={{
                  fontFamily: MONO,
                  fontSize: 13,
                  color: ACCENT,
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                DevDNA.
              </p>
              <p style={{ color: MUTED, fontSize: 12 }}>© 2025 Randy Dawn Tai</p>
            </div>
            <FooterIcons />
          </div>
        </footer>

      </main>
    </>
  )
}
