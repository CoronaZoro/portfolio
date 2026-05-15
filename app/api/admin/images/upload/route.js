import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
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
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
