import { NextResponse } from 'next/server'
import { generateKitFromPrompt } from '@/lib/claude'
import { searchPhotos } from '@/lib/images'
import {
  generatePaletteFromHexCodes,
  getMutedBackground,
  getDarkTextColor,
  ensureSwatchContrast,
} from '@/lib/colors'
import { getFontEmbedUrl } from '@/lib/fonts'
import { rateLimit, clientIp } from '@/lib/rateLimit'

const MAX_PROMPT_LENGTH = 300
const MODES = ['search', 'chat']

// Browsers always send Origin on cross-site POSTs — reject other sites calling this API.
// (Scripts can omit it, which is why the rate limit below is the real guard.)
function isSameOrigin(req) {
  const origin = req.headers.get('origin')
  if (!origin) return true
  try {
    return new URL(origin).host === req.headers.get('host')
  } catch {
    return false
  }
}

export async function POST(req) {
  if (!isSameOrigin(req)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 })
  }

  // Each call costs Anthropic + Unsplash credits — cap per IP
  const ip = clientIp(req)
  const perMinute = rateLimit(`generate:min:${ip}`, { limit: 5, windowMs: 60 * 1000 })
  const perDay    = rateLimit(`generate:day:${ip}`, { limit: 30, windowMs: 24 * 60 * 60 * 1000 })
  const limited   = !perMinute.ok ? perMinute : !perDay.ok ? perDay : null
  if (limited) {
    return NextResponse.json(
      { error: 'Too many requests — try again in a bit.' },
      { status: 429, headers: { 'Retry-After': String(limited.retryAfter) } }
    )
  }

  try {
    const body = await req.json()
    const { prompt, mode } = body

    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 })
    }
    if (prompt.length > MAX_PROMPT_LENGTH) {
      return NextResponse.json({ error: `Keep it under ${MAX_PROMPT_LENGTH} characters.` }, { status: 400 })
    }

    // ── 1. Ask Claude for the kit spec ───────────────────────────────────────
    const spec = await generateKitFromPrompt(prompt.trim(), MODES.includes(mode) ? mode : 'search')

    // ── 2. Parallel: generate palette + fetch images ──────────────────────────
    const imageCount = spec.layout === 2 ? 4 : 3
    const imageQuery =
      spec.imageSearchQuery ||
      `${spec.vibeName} ${(spec.tags ?? []).slice(0, 2).join(' ')} aesthetic`

    const hexCodes = (spec.paletteColors ?? []).map((c) => c.hex)

    const [swatches, rawPhotos] = await Promise.all([
      Promise.resolve(generatePaletteFromHexCodes(hexCodes)),
      searchPhotos(imageQuery, imageCount),
    ])

    // ── 3. Build palette ──────────────────────────────────────────────────────
    const background = getMutedBackground(swatches)
    const finalSwatches =
      spec.layout === 2 ? ensureSwatchContrast(swatches, background) : swatches
    const textColor = getDarkTextColor(finalSwatches)

    // ── 4. Build images — pad with empty slots if Unsplash returns fewer ──────
    const filledPhotos = Array.from({ length: imageCount }, (_, i) => {
      const photo = rawPhotos[i]
      return photo
        ? {
            url: photo.urls.regular,
            alt: photo.alt_description ?? photo.description ?? `${spec.vibeName} ${i + 1}`,
            shape: 'rectangle',
          }
        : { url: '', alt: `Image ${i + 1}`, shape: 'rectangle' }
    })

    // ── 5. Pick first font pair ───────────────────────────────────────────────
    const pair = spec.fontPairingSuggestions?.[0] ?? {
      display: 'Fraunces',
      displayCategory: 'serif',
      body: 'Inter',
      bodyCategory: 'sans-serif',
    }

    const fontEmbedUrl = getFontEmbedUrl([pair.display, pair.body])

    // ── 6. Assemble the Kit ───────────────────────────────────────────────────
    const kit = {
      id: crypto.randomUUID(),
      vibeName: spec.vibeName,
      tags: spec.tags ?? [],
      layout: spec.layout ?? 1,
      fonts: {
        display: { name: pair.display, category: pair.displayCategory, sampleText: pair.display },
        body:    { name: pair.body,    category: pair.bodyCategory,    sampleText: pair.body    },
      },
      palette: { swatches: finalSwatches, background, textColor },
      images: filledPhotos,
      fontEmbedUrl,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ kit })
  } catch (err) {
    // Log the details server-side; don't echo internals (API errors, key names) to the browser
    console.error('[/api/generate]', err)
    return NextResponse.json({ error: 'Failed to generate kit. Please try again.' }, { status: 500 })
  }
}
