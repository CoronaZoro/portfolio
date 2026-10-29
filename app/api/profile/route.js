import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT email, linkedin_url, github_url, figma_url, resume_url
      FROM profile
      WHERE id = 1
    `
    if (!rows.length) return NextResponse.json({}, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (e) {
    console.error('[api/profile]', e)
    return NextResponse.json({ error: 'Failed to load profile.' }, { status: 500 })
  }
}
