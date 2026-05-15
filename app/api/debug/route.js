// TEMPORARY debug endpoint — DELETE after diagnosing the DB connection.
// Returns which env vars are present (never their values).
// Visit: /api/debug

import { NextResponse } from 'next/server'

export async function GET() {
  const vars = [
    'POSTGRES_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL_NON_POOLING',
    'POSTGRES_URL_NO_SSL',
    'POSTGRES_USER',
    'POSTGRES_HOST',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
    'DATABASE_URL',
    'DATABASE_URL_UNPOOLED',
    'ADMIN_PASSWORD',
    'BLOB_READ_WRITE_TOKEN',
  ]

  const result = {}
  for (const v of vars) {
    result[v] = process.env[v] ? '✓ set' : '✗ missing'
  }

  // Also try a quick DB ping so we can see the error message if it fails
  let dbTest = null
  try {
    const { sql } = await import('../../../lib/db')
    const { rows } = await sql`SELECT 1 AS ping`
    dbTest = rows[0]?.ping === 1 ? '✓ connected' : '✗ unexpected response'
  } catch (e) {
    dbTest = `✗ ${e.message}`
  }

  return NextResponse.json({ env: result, dbTest }, { status: 200 })
}
