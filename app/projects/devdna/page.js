import Navbar from '../../components/Navbar'
import FooterIcons from '../../components/FooterIcons'

// ── Design tokens ──────────────────────────────────────────────────────────────
const BG      = '#0d1117'
const CARD    = '#161b22'
const BORDER  = '#21262d'
const ACCENT  = '#7c6af7'
const MUTED   = 'rgba(255,255,255,0.45)'
const TEXT    = 'rgba(255,255,255,0.82)'

// ── Shared styles ──────────────────────────────────────────────────────────────
const sectionLabel = {
  fontSize: 10,
  fontWeight: 600,
  color: ACCENT,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  marginBottom: 24,
  display: 'block',
}

const breakdownItem = {
  borderLeft: `2px solid ${ACCENT}`,
  paddingLeft: 20,
  marginBottom: 32,
}

// ── Terminal block ─────────────────────────────────────────────────────────────
function Terminal({ children }) {
  return (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
        fontSize: 13,
      }}
    >
      {/* Three dots header */}
      <div
        style={{
          padding: '10px 16px',
          borderBottom: `1px solid ${BORDER}`,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
      </div>
      <div style={{ padding: '20px 24px', color: TEXT, lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}

// ── Feature row ────────────────────────────────────────────────────────────────
function FeatureRow({ imageComment, imageAlt, title, copy, imageRight = false }) {
  const imgBlock = (
    <div
      style={{
        background: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        aspectRatio: '16/10',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: MUTED,
        fontSize: 12,
        fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
      }}
    >
      {/* {imageComment} */}
      {/* Replace the div above with: <img src="..." alt={imageAlt} className="w-full h-full object-cover rounded-xl" /> */}
      <span style={{ opacity: 0.4 }}>{imageAlt}</span>
    </div>
  )

  const textBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={sectionLabel}>{title.toUpperCase()}</span>
      <h3
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
          fontWeight: 700,
          color: '#ffffff',
          marginBottom: 16,
          lineHeight: 1.3,
        }}
      >
        {title}
      </h3>
      <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15, fontFamily: 'var(--font-sans)' }}>
        {copy}
      </p>
    </div>
  )

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
      style={{ marginBottom: 72 }}
    >
      {imageRight ? <>{textBlock}{imgBlock}</> : <>{imgBlock}{textBlock}</>}
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

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 pt-20 pb-16 max-w-7xl mx-auto">

          <p
            className="anim-fade-up text-xs tracking-[0.22em] uppercase mb-10"
            style={{ color: ACCENT, animationDelay: '0.15s' }}
          >
            Software / AI Tool
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

            {/* Left — title + one-liner */}
            <div className="anim-fade-up" style={{ animationDelay: '0.25s' }}>
              <h1
                className="mb-5"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                DevDNA.
              </h1>
              <p
                className="text-base leading-[1.7]"
                style={{ color: 'rgba(255,255,255,0.62)', maxWidth: 400 }}
              >
                Drop in a GitHub username. Get a complete read of the engineer behind it.
              </p>
            </div>

            {/* Right — metadata grid */}
            <div
              className="anim-fade-up grid grid-cols-2 gap-0"
              style={{
                animationDelay: '0.35s',
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {[
                { label: 'MY ROLE', value: 'Full Stack Developer' },
                { label: 'TYPE',    value: 'Developer Tool (Shipped)' },
                { label: 'STACK',   value: 'Next.js · TypeScript · Claude API · GitHub API · Upstash Redis' },
                { label: 'STATUS',  value: 'Live' },
              ].map(({ label, value }, i) => (
                <div
                  key={i}
                  className="p-5"
                  style={{
                    borderRight:  i % 2 === 0 ? `1px solid ${BORDER}` : 'none',
                    borderBottom: i < 2       ? `1px solid ${BORDER}` : 'none',
                    background: CARD,
                  }}
                >
                  <p
                    className="text-xs tracking-[0.2em] uppercase mb-2"
                    style={{ color: MUTED }}
                  >
                    {label}
                  </p>
                  <p className="text-sm font-medium" style={{ color: ACCENT }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── HERO BANNER IMAGE PLACEHOLDER ───────────────────────────────────── */}
        {/* HERO BANNER — replace this div with <img src="..." alt="DevDNA hero banner" className="w-full" style={{ display: 'block' }} /> */}
        <div
          style={{
            width: '100%',
            aspectRatio: '21/9',
            background: CARD,
            borderTop: `1px solid ${BORDER}`,
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: MUTED,
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: 13,
          }}
        >
          {/* hero banner image goes here */}
          <span style={{ opacity: 0.35 }}>hero banner image</span>
        </div>

        {/* ── OVERVIEW ────────────────────────────────────────────────────────── */}
        <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">

          <span style={sectionLabel} className="anim-fade-up">Overview</span>

          <h2
            className="anim-fade-up mb-6"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              lineHeight: 1.25,
              maxWidth: 680,
              animationDelay: '0.1s',
            }}
          >
            A profile full of green squares tells you nothing about the engineer behind them.
          </h2>

          <p
            className="anim-fade-up mb-16"
            style={{
              color: TEXT,
              lineHeight: 1.8,
              maxWidth: 640,
              fontSize: 15,
              animationDelay: '0.2s',
            }}
          >
            GitHub profiles are aesthetic. Customized READMEs, pinned repos, contribution graphs — they look impressive. But none of it tells you how someone actually writes code, when they work, or whether their commit habits suggest a disciplined engineer or someone who pushes everything at 2am before a deadline.
          </p>

          {/* Left-border breakdown blocks */}
          <div className="anim-fade-up mb-16" style={{ animationDelay: '0.25s', maxWidth: 640 }}>

            <div style={breakdownItem}>
              <p
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                I — The Aesthetic Problem
              </p>
              <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                Developers spend hours making their profile look good. Badges, shields, animated banners. It looks great. It says nothing about how they actually code.
              </p>
            </div>

            <div style={breakdownItem}>
              <p
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                II — The Information Gap
              </p>
              <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                Commit cadence, language trajectory, coding time patterns, message quality — the signal is all there in the data. Nobody is reading it.
              </p>
            </div>

            <div style={{ ...breakdownItem, marginBottom: 0 }}>
              <p
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: 11,
                  color: ACCENT,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                III — The Recruiter Problem
              </p>
              <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                A hiring manager opening a GitHub profile sees a grid of squares and a list of repo names. There&rsquo;s no layer that translates raw activity into readable signal.
              </p>
            </div>

          </div>

          {/* Terminal block */}
          <div className="anim-fade-up" style={{ animationDelay: '0.3s', maxWidth: 640 }}>
            <p
              style={{
                color: MUTED,
                fontSize: 14,
                fontStyle: 'italic',
                marginBottom: 12,
                fontFamily: 'var(--font-sans)',
              }}
            >
              I ran it on my own GitHub first. Here&rsquo;s what it found:
            </p>
            <Terminal>
              <p style={{ color: MUTED }}>$ devdna analyze CoronaZoro</p>
              <p>
                <span style={{ color: ACCENT }}>&gt;</span>{' '}
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>commits_to_portfolio:</span>{' '}
                <span style={{ color: '#ffffff' }}>81</span>
              </p>
              <p>
                <span style={{ color: ACCENT }}>&gt;</span>{' '}
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>top_activity:</span>{' '}
                <span style={{ color: '#ffffff' }}>late night, solo, JavaScript</span>
              </p>
              <p>
                <span style={{ color: ACCENT }}>&gt;</span>{' '}
                <span style={{ color: 'rgba(255,255,255,0.6)' }}>verdict:</span>{' '}
                <span style={{ color: '#ffffff' }}>&ldquo;You&rsquo;re a disciplined builder. You also need to go outside.&rdquo;</span>
              </p>
            </Terminal>
          </div>

        </section>

        {/* ── SOLUTION ────────────────────────────────────────────────────────── */}
        <section
          style={{ borderTop: `1px solid ${BORDER}` }}
          className="px-6 md:px-10 py-20"
        >
          <div className="max-w-7xl mx-auto">

            <span style={sectionLabel} className="anim-fade-up">Solution</span>

            <h2
              className="anim-fade-up mb-6"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                maxWidth: 620,
                animationDelay: '0.1s',
              }}
            >
              GitHub shows you the commits. DevDNA shows you the developer.
            </h2>

            <p
              className="anim-fade-up mb-16"
              style={{
                color: TEXT,
                lineHeight: 1.8,
                maxWidth: 640,
                fontSize: 15,
                animationDelay: '0.2s',
              }}
            >
              Drop in any GitHub username and DevDNA runs it through a four-stage pipeline — fetching your activity, transforming raw data into readable signals, running three parallel AI analyses, and serving everything cached and fast. No setup. No configuration. Just a username.
            </p>

            <div className="anim-fade-up" style={{ animationDelay: '0.25s', maxWidth: 640 }}>

              <div style={breakdownItem}>
                <p style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  I — Your Engineering Fingerprint
                </p>
                <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                  An archetypal persona label and three specific insights about how you actually work — not generic praise, not vague encouragement. A sharp, honest read of your development patterns.
                </p>
              </div>

              <div style={breakdownItem}>
                <p style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  II — Your Commit Story
                </p>
                <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                  Fifty of your most recent commit messages scored, graded, and broken down. Because how you write commits tells you something about how you think about your work.
                </p>
              </div>

              <div style={{ ...breakdownItem, marginBottom: 0 }}>
                <p style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  III — Your Stack Trajectory
                </p>
                <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                  Where your languages are trending over time — not just what you use now but where you&rsquo;re heading. Predictive without needing a machine learning model.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── TECHNICAL ───────────────────────────────────────────────────────── */}
        <section
          style={{ borderTop: `1px solid ${BORDER}` }}
          className="px-6 md:px-10 py-20"
        >
          <div className="max-w-7xl mx-auto">

            <span style={sectionLabel} className="anim-fade-up">Technical</span>

            <h2
              className="anim-fade-up mb-6"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                maxWidth: 620,
                animationDelay: '0.1s',
              }}
            >
              Built to survive real traffic without burning through API credits.
            </h2>

            <p
              className="anim-fade-up mb-12"
              style={{
                color: TEXT,
                lineHeight: 1.8,
                maxWidth: 640,
                fontSize: 15,
                animationDelay: '0.2s',
              }}
            >
              DevDNA runs a four-stage pipeline on every username — data ingestion, transformation, AI analysis, and cached delivery. Every architectural decision was made with two constraints in mind: GitHub&rsquo;s rate limits and Claude API costs.
            </p>

            {/* ARCHITECTURE DIAGRAM - system flow diagram */}
            {/* Replace this placeholder div with: <img src="..." alt="DevDNA system architecture diagram" className="w-full rounded-xl mb-16" style={{ border: `1px solid ${BORDER}` }} /> */}
            <div
              className="anim-fade-up mb-16"
              style={{
                animationDelay: '0.25s',
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 12,
                aspectRatio: '16/7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: MUTED,
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: 12,
              }}
            >
              <span style={{ opacity: 0.35 }}>architecture diagram</span>
            </div>

            <div className="anim-fade-up" style={{ animationDelay: '0.3s', maxWidth: 640 }}>

              <div style={breakdownItem}>
                <p style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  I — Top-15 Repo Cap
                </p>
                <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                  GitHub&rsquo;s unauthenticated API allows 60 requests per hour. Fetching commit data for every public repository would exhaust that instantly on active developers. Sorting by{' '}
                  <code style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>pushed_at</code>{' '}
                  and capping at 15 keeps every full analysis under 20 API calls — enough headroom for concurrent users without needing authentication.
                </p>
              </div>

              <div style={breakdownItem}>
                <p style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  II — Parallel Claude Calls
                </p>
                <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                  The three AI analyses — Engineering Fingerprint, Commit Score, and Health Audit — are independent. Running them in parallel instead of sequentially cuts total AI response time by approximately 60%. Each call uses a deterministic system prompt engineered to return structured output, not free-form prose.
                </p>
              </div>

              <div style={breakdownItem}>
                <p style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  III — Cache Architecture
                </p>
                <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                  Every response is cached at the feature level in Upstash Redis with a 24-hour TTL. NORMAL and ROAST modes cache separately — switching modes after the first load is instant on the second view. Getting this wrong has real consequences: cache the whole page and a mode toggle invalidates GitHub data that hasn&rsquo;t changed.
                </p>
              </div>

              <div style={{ ...breakdownItem, marginBottom: 0 }}>
                <p style={{ fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)', fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                  IV — Stack Trajectory Without ML
                </p>
                <p style={{ color: TEXT, lineHeight: 1.75, fontSize: 15 }}>
                  The language trend prediction uses no machine learning model. Repositories are split into three time buckets, language share is calculated per bucket, and an acceleration vector is extrapolated forward six months. Directionally accurate, no training data required.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────────────────── */}
        <section
          style={{ borderTop: `1px solid ${BORDER}` }}
          className="px-6 md:px-10 py-20"
        >
          <div className="max-w-7xl mx-auto">

            <span style={sectionLabel} className="anim-fade-up">Features</span>

            <h2
              className="anim-fade-up mb-16"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                maxWidth: 500,
                animationDelay: '0.1s',
              }}
            >
              What DevDNA actually tells you.
            </h2>

            {/* Feature 1 — image left, text right */}
            {/* FEATURE 1 - Engineering fingerprint screenshot */}
            {/* Replace placeholder div with <img src="..." alt="Engineering Fingerprint" ... /> */}
            <FeatureRow
              imageAlt="Engineering Fingerprint screenshot"
              title="Engineering Fingerprint"
              copy="Drop in a username and DevDNA reads your commit patterns, language trajectory, and coding habits — then distills it into an archetypal persona and three sharp, specific insights. No generic output. Everything is grounded in your actual data."
              imageRight={false}
            />

            {/* Feature 2 — image right, text left */}
            {/* FEATURE 2 - Roast/Normal toggle GIF */}
            {/* Replace placeholder div with <img src="..." alt="Roast/Normal toggle" ... /> */}
            <FeatureRow
              imageAlt="Roast / Normal toggle GIF"
              title="Roast / Normal"
              copy="Same data. Completely different read. Normal mode gives you a professional analysis. Roast mode gives you the version your brutally honest senior engineer would write. Both are cached separately — switching is instant."
              imageRight={true}
            />

            {/* Feature 3 — image left, text right */}
            {/* FEATURE 3 - Repo summary expand GIF */}
            {/* Replace placeholder div with <img src="..." alt="Repo summaries" ... /> */}
            <FeatureRow
              imageAlt="Repo summaries expand GIF"
              title="Repo Summaries"
              copy="Every repository can be expanded for an AI-generated summary. Lazy loaded — Claude only analyzes a repo when you click it, keeping the initial page fast and API costs low."
              imageRight={false}
            />

            {/* Feature 4 — image right, text left */}
            {/* FEATURE 4 - Commit score screenshot */}
            {/* Replace placeholder div with <img src="..." alt="Commit Score" ... /> */}
            <FeatureRow
              imageAlt="Commit Score screenshot"
              title="Commit Score"
              copy="Your last 50 commit messages scored, graded, and broken down. Because 'fix', 'update', and 'asdfgh' are a pattern — and patterns tell you something."
              imageRight={true}
            />

          </div>
        </section>

        {/* ── REFLECTION ──────────────────────────────────────────────────────── */}
        <section
          style={{ borderTop: `1px solid ${BORDER}` }}
          className="px-6 md:px-10 py-20"
        >
          <div className="max-w-7xl mx-auto">

            <span style={sectionLabel} className="anim-fade-up">Reflection</span>

            <h2
              className="anim-fade-up mb-16"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                maxWidth: 500,
                animationDelay: '0.1s',
              }}
            >
              What I learned from this project.
            </h2>

            <div className="flex flex-col gap-12" style={{ maxWidth: 680 }}>

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
              ].map(({ num, bold, copy }) => (
                <div key={num} className="anim-fade-up flex gap-8 items-start">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      fontWeight: 700,
                      color: 'rgba(124,106,247,0.18)',
                      lineHeight: 1,
                      flexShrink: 0,
                      minWidth: 60,
                    }}
                  >
                    {num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 700,
                        fontSize: 16,
                        color: '#ffffff',
                        marginBottom: 10,
                        lineHeight: 1.4,
                      }}
                    >
                      {bold}
                    </p>
                    <p style={{ color: TEXT, lineHeight: 1.8, fontSize: 15 }}>{copy}</p>
                  </div>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
        <footer
          style={{ borderTop: `1px solid ${BORDER}` }}
          className="px-6 md:px-10 py-12"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p style={{ color: MUTED, fontSize: 13 }}>
              © 2025 Randy Dawn Tai
            </p>
            <FooterIcons />
          </div>
        </footer>

      </main>
    </>
  )
}
