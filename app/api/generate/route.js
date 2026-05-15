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

export async function POST(req) {
  try {
    const body = await req.json()
    const { prompt, mode } = body

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'prompt is required' }, { status: 400 })
    }

    // ── 1. Ask Claude for the kit spec ───────────────────────────────────────
    const spec = await generateKitFromPrompt(prompt.trim(), mode ?? 'search')

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
    console.error('[/api/generate]', err)
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `Failed to generate kit: ${message}` }, { status: 500 })
  }
}
