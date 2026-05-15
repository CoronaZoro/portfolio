import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../../lib/db'

export async function POST(request) {
  const unauth = requireAdmin(request)
  if (unauth) return unauth

  try {
    const formData = await request.formData()
    const file     = formData.get('file')

    if (!file || file.size === 0) {
      return NextResponse.json({ ok: false, message: 'No file selected.' }, { status: 400 })
    }

    const blob = await put(`portfolio/${file.name}`, file, { access: 'public' })

    revalidatePath('/admin/images')
    return NextResponse.json({ ok: true, message: 'Uploaded.', url: blob.url })
  } catch (e) {
    console.error('[api/admin/images/upload]', e)
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
