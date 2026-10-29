// scripts/migrate.js
// Creates the Postgres tables for the portfolio refresh.
// Run with: node scripts/migrate.js

require('dotenv').config({ path: '.env.local' })
const { sql } = require('@vercel/postgres')

async function migrate() {
  console.log('Running database migration...')

  // ── profile ─────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS profile (
      id               SERIAL PRIMARY KEY,
      name             VARCHAR(100),
      tagline          TEXT,
      about_text       TEXT,
      email            VARCHAR(100),
      linkedin_url     TEXT,
      github_url       TEXT,
      figma_url        TEXT,
      resume_url       TEXT,
      available_from   VARCHAR(100),
      updated_at       TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('✓ profile table ready')

  // ── projects ─────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id                SERIAL PRIMARY KEY,
      title             VARCHAR(100),
      short_description TEXT,
      tags              TEXT[],
      thumbnail_url     TEXT,
      case_study_path   VARCHAR(100),
      hackathon_winner  BOOLEAN DEFAULT FALSE,
      display_order     INTEGER,
      visible           BOOLEAN DEFAULT TRUE,
      updated_at        TIMESTAMP DEFAULT NOW()
    )
  `
  console.log('✓ projects table ready')

  // ── seed profile row if empty ────────────────────────────────────────
  const { rows } = await sql`SELECT COUNT(*) FROM profile`
  if (parseInt(rows[0].count) === 0) {
    await sql`
      INSERT INTO profile
        (name, tagline, about_text, email, linkedin_url, github_url, figma_url, resume_url, available_from)
      VALUES (
        'Randy Dawn Tai',
        'Product designer who makes things feel good.',
        'I''m a third-year ICT student at a university in Bangkok, building toward a career in product design. I care about the details, the transitions that feel off, and the moments that make someone go "wow". My background spans pure UX design and AI-integrated products.',
        'saiywetphoneaung@gmail.com',
        'https://www.linkedin.com/in/randy-dawn-tai',
        'https://github.com/CoronaZoro',
        'https://www.figma.com/@saiywetphoneaun',
        'https://drive.google.com/file/d/1OWxUnSVfwJn90_0oTy-BFM9wTw_Dr0zV/preview',
        'August 2026'
      )
    `
    console.log('✓ profile seeded with default values')
  } else {
    console.log('  profile already has data, skipping seed')
  }

  // ── seed projects ────────────────────────────────────────────────────
  // Inserts any project whose case_study_path isn't in the table yet, so re-running
  // this after adding a case study page adds just the new row. Existing rows
  // (and anything edited in the admin) are left untouched.
  {
    const projects = [
      {
        title: 'Guardian',
        short_description: 'A real-time fall detection system built for safety. Combines computer vision with a live monitoring dashboard. Won first place at the university hackathon.',
        tags: ['AI / ML', 'UX Design', 'Next.js'],
        thumbnail_url: null,
        case_study_path: '/projects/guardian',
        hackathon_winner: true,
        display_order: 1,
      },
      {
        title: 'Huesta',
        short_description: 'A zero-login AI design tool that generates complete UI kits — colour palettes, typography, and layout — from a keyword, a conversation, or a reference image.',
        tags: ['AI Product', 'Design Tool', 'UX Design'],
        thumbnail_url: null,
        case_study_path: '/projects/huesta',
        hackathon_winner: false,
        display_order: 3,
      },
      {
        title: 'Bouzer',
        short_description: 'A luxury perfume brand experience designed to evoke sensory depth through typography, whitespace, and deliberate pacing.',
        tags: ['Brand Design', 'UI/UX Design'],
        thumbnail_url: null,
        case_study_path: '/projects/bouzer',
        hackathon_winner: false,
        display_order: 2,
      },
      {
        title: 'Attend',
        short_description: 'A student attendance management system redesigned for clarity giving educators a calm, data-rich view of class participation.',
        tags: ['UI/UX Design', 'Mobile'],
        thumbnail_url: null,
        case_study_path: '/projects/attend',
        hackathon_winner: false,
        display_order: 4,
      },
      {
        title: 'Pinned.',
        short_description: 'A community-driven street food discovery map for Bangkok.',
        tags: ['UI/UX', 'Mobile App'],
        thumbnail_url: null,
        case_study_path: '/projects/pinned',
        hackathon_winner: false,
        display_order: 5,
      },
      {
        title: 'DevDNA.',
        short_description: 'Drop in a GitHub username. Get a complete read of the engineer behind it.',
        tags: ['Software', 'AI Tool'],
        thumbnail_url: null,
        case_study_path: '/projects/devdna',
        hackathon_winner: false,
        display_order: 6,
      },
    ]

    let added = 0
    for (const p of projects) {
      const { rowCount } = await sql`
        INSERT INTO projects
          (title, short_description, tags, thumbnail_url, case_study_path, hackathon_winner, display_order, visible)
        SELECT
          ${p.title}::text,
          ${p.short_description}::text,
          ${p.tags}::text[],
          ${p.thumbnail_url}::text,
          ${p.case_study_path}::text,
          ${p.hackathon_winner}::boolean,
          ${p.display_order}::integer,
          true
        WHERE NOT EXISTS (SELECT 1 FROM projects WHERE case_study_path = ${p.case_study_path})
      `
      if (rowCount) {
        added++
        console.log(`✓ added project: ${p.title}`)
      }
    }
    if (!added) console.log('  projects already up to date')
  }

  console.log('\nMigration complete.')
  process.exit(0)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
