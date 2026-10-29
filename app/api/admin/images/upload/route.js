import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../../lib/db'

// Matches the accept list in app/admin/images/ImageUpload.js. SVG is left out on purpose:
// it can carry scripts.
const ALLOWED_TYPES = [
  'image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif',
  'video/mp4', 'video/webm', 'video/quicktime',
]

// Vercel caps serverless request bodies at 4.5 MB, so anything larger fails anyway.
const MAX_BYTES = 4.5 * 1024 * 1024

// "My Photo (1).PNG" → "My-Photo-1-.PNG" — no slashes, spaces or path tricks.
function safeName(name) {
  return name.replace(/[^\w.-]+/g, '-').replace(/^[.-]+/, '').slice(0, 100) || 'upload'
}

export async function POST(request) {
  const unauth = await requireAdmin(request)
  if (unauth) return unauth

  try {
    const formData = await request.formData()
    const file     = formData.get('file')

    if (!file || typeof file === 'string' || file.size === 0) {
      return NextResponse.json({ ok: false, message: 'No file selected.' }, { status: 400 })
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ ok: false, message: 'Only PNG, JPEG, WebP, GIF, AVIF, MP4, WebM or MOV files.' }, { status: 400 })
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, message: 'File is too large (max 4.5 MB).' }, { status: 400 })
    }

    const blob = await put(`portfolio/${safeName(file.name)}`, file, {
      access: 'public',
      contentType: file.type,
    })

    revalidatePath('/admin/images')
    return NextResponse.json({ ok: true, message: 'Uploaded.', url: blob.url })
  } catch (e) {
    console.error('[api/admin/images/upload]', e)
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
