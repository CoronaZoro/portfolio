import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { id, direction } = await request.json()
    if (!id || !direction) return NextResponse.json({ ok: false, message: 'Missing id or direction.' }, { status: 400 })

    const { rows } = await sql`SELECT id, display_order FROM projects ORDER BY display_order ASC`
    const idx     = rows.findIndex(r => r.id === id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1

    if (idx === -1 || swapIdx < 0 || swapIdx >= rows.length) {
      return NextResponse.json({ ok: false, message: 'Cannot move in that direction.' }, { status: 400 })
    }

    const a = rows[idx]
    const b = rows[swapIdx]
    await sql`UPDATE projects SET display_order = ${b.display_order} WHERE id = ${a.id}`
    await sql`UPDATE projects SET display_order = ${a.display_order} WHERE id = ${b.id}`

    revalidatePath('/')
    revalidatePath('/admin/projects')
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
