// Issues short-lived client tokens so the admin browser can upload straight to
// Vercel Blob. The file itself never passes through this function, which is what
// lets videos go past Vercel's 4.5 MB request-body limit.
// Client side: upload() from '@vercel/blob/client' in app/admin/images/ImageUpload.js.

import { handleUpload } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { requireAdmin } from '../../../../../lib/db'

// Keep in sync with ACCEPT in app/admin/images/ImageUpload.js. SVG is left out on
// purpose: it can carry scripts.
const ALLOWED_TYPES = [
  'image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif',
  'video/mp4', 'video/webm', 'video/quicktime',
]

const MAX_BYTES = 500 * 1024 * 1024 // 500 MB

export async function POST(request) {
  const unauth = await requireAdmin(request)
  if (unauth) return unauth

  try {
    const body = await request.json()
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!pathname.startsWith('portfolio/') || pathname.includes('..')) {
          throw new Error('Uploads must go in portfolio/.')
        }
        // The client sends { overwrite: true } only after "Replace" on a name conflict
        const { overwrite } = JSON.parse(clientPayload || '{}')
        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes:  MAX_BYTES,
          addRandomSuffix:     false,
          allowOverwrite:      overwrite === true,
        }
      },
    })
    return NextResponse.json(result)
  } catch (e) {
    console.error('[api/admin/images/upload]', e)
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
