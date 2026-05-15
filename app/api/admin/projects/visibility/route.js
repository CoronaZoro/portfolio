import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { sql, requireAdmin } from '../../../../../lib/db'

export async function POST(request) {
  const unauth = requireAdmin(request)
  if (unauth) return unauth

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
    console.error('[api/admin/projects/visibility]', e)
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
