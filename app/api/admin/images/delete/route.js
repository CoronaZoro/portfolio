import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/db'

export async function POST(request) {
  const unauth = await requireAdmin(request)
  if (unauth) return unauth

  try {
    const { url } = await request.json()
    if (!url) return NextResponse.json({ ok: false, message: 'Missing URL.' }, { status: 400 })

    // Only allow deleting files from this store's portfolio/ folder
    let parsed
    try { parsed = new URL(url) } catch { parsed = null }
    if (
      !parsed ||
      !parsed.hostname.endsWith('.public.blob.vercel-storage.com') ||
      !parsed.pathname.startsWith('/portfolio/')
    ) {
      return NextResponse.json({ ok: false, message: 'Not a portfolio file.' }, { status: 400 })
    }

    await del(url)

    revalidatePath('/admin/images')
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[api/admin/images/delete]', e)
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
