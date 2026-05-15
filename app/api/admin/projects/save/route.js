import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { id, title, short_description, thumbnail_url } = await request.json()
    if (!id) return NextResponse.json({ ok: false, message: 'Missing id.' }, { status: 400 })

    await sql`
      UPDATE projects
      SET title             = ${title ?? null},
          short_description = ${short_description ?? null},
          thumbnail_url     = ${thumbnail_url ?? null},
          updated_at        = NOW()
      WHERE id = ${id}
    `
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return NextResponse.json({ ok: true, message: 'Saved.' })
  } catch (e) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
