// lib/db.js
// Central Postgres connection + admin auth helper for all /api/admin/* routes.
//
// Connection priority:
//   1. POSTGRES_URL          — pooled Neon endpoint injected by Vercel Postgres
//   2. DATABASE_URL          — pooled Neon endpoint (Neon-native env var name)
//
// Never use POSTGRES_URL_NON_POOLING or DATABASE_URL_UNPOOLED in API routes.
// Those direct connections are for migration scripts only.

import { sql as _vercelSql, createPool } from '@vercel/postgres'
import { NextResponse } from 'next/server'

function buildSql() {
  // Vercel Postgres injects POSTGRES_URL — the default sql tag reads it automatically.
  if (process.env.POSTGRES_URL) return _vercelSql

  // Fallback: Neon may have injected DATABASE_URL instead.
  if (process.env.DATABASE_URL) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('[db] POSTGRES_URL not found — falling back to DATABASE_URL.')
    }
    const pool = createPool({ connectionString: process.env.DATABASE_URL })
    return pool.sql.bind(pool)
  }

  // Neither set — return default so @vercel/postgres throws a descriptive error.
  if (process.env.NODE_ENV === 'production') {
    console.error('[db] No Postgres connection string found. Set POSTGRES_URL in Vercel Dashboard → Settings → Environment Variables.')
  }
  return _vercelSql
}

export const sql = buildSql()

// ── Admin auth helper ────────────────────────────────────────────────────────
// Usage: const unauth = requireAdmin(request); if (unauth) return unauth
// Returns a NextResponse (401/503) if not authorized, or null if OK.
export function requireAdmin(request) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json(
      { ok: false, message: 'Server error: ADMIN_PASSWORD env var is not set.' },
      { status: 503 }
    )
  }
  const cookie = request.cookies.get('admin_auth')
  if (cookie?.value !== adminPassword) {
    return NextResponse.json({ ok: false, message: 'Unauthorized.' }, { status: 401 })
  }
  return null // authorized ✓
}
