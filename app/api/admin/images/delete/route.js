import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../../lib/db'

export async function POST(request) {
  const unauth = requireAdmin(request)
  if (unauth) return unauth

  try {
    const { url } = await request.json()
    if (!url) return NextResponse.json({ ok: false, message: 'Missing URL.' }, { status: 400 })

    await del(url)

    revalidatePath('/admin/images')
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[api/admin/images/delete]', e)
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
