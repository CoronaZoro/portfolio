import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { url } = await request.json()
    if (!url) return NextResponse.json({ ok: false, message: 'Missing URL.' }, { status: 400 })

    await del(url)

    revalidatePath('/admin/images')
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
