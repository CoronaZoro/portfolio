import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { id, visible } = await request.json()
    if (!id) return NextResponse.json({ ok: false, message: 'Missing id.' }, { status: 400 })

    await sql`
      UPDATE projects
      SET visible    = ${!visible},
          updated_at = NOW()
      WHERE id = ${id}
    `
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return NextResponse.json({ ok: true, visible: !visible })
  } catch (e) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
