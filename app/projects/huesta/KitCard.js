'use client'

import { useEffect } from 'react'
import { getCssFontFamily } from '@/lib/fonts'

// ── Sub-components ────────────────────────────────────────────────────────────

function ColorSwatch({ hex }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 6,
        background: hex,
        border: '1px solid rgba(255,255,255,0.12)',
        flexShrink: 0,
      }} />
      <span style={{ fontSize: 10, color: '#888', fontFamily: 'monospace', letterSpacing: '0.02em' }}>
        {hex.toUpperCase()}
      </span>
    </div>
  )
}

// Organic blob-shaped swatch for Layout 2
const BLOB_RADII = [
  '60% 40% 70% 30% / 50% 60% 40% 50%',
  '40% 60% 30% 70% / 60% 40% 55% 45%',
  '55% 45% 65% 35% / 45% 55% 50% 50%',
  '45% 55% 40% 60% / 55% 45% 60% 40%',
  '50% 50% 45% 55% / 40% 60% 45% 55%',
]

function BlobSwatch({ hex, index, textColor }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 44,
        height: 44,
        background: hex,
        borderRadius: BLOB_RADII[index % BLOB_RADII.length],
        flexShrink: 0,
      }} />
      <span style={{ fontSize: 10, color: textColor, opacity: 0.55, fontFamily: 'monospace' }}>
        {hex.toUpperCase()}
      </span>
    </div>
  )
}

function MoodTag({ tag, textColor }) {
  return (
    <span style={{
      border: `1px solid ${textColor}60`,
      color: textColor,
      fontSize: 10,
      padding: '2px 10px',
      borderRadius: 100,
      opacity: 0.7,
      letterSpacing: '0.05em',
      textTransform: 'lowercase',
    }}>
      {tag}
    </span>
  )
}

function KitImageDark({ url, alt }) {
  if (!url) return (
    <div style={{ width: '100%', height: '100%', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: '#555', fontSize: 11 }}>No image</span>
    </div>
  )
  return (
    <img
      src={url}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      onError={(e) => { e.currentTarget.style.display = 'none' }}
    />
  )
}

function KitImageLight({ url, alt, placeholderBg }) {
  if (!url) return (
    <div style={{ width: '100%', height: '100%', background: placeholderBg }} />
  )
  return (
    <img
      src={url}
      alt={alt}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: placeholderBg }}
      onError={(e) => { e.currentTarget.style.display = 'none' }}
    />
  )
}

// ── Layout 1 — dark editorial ─────────────────────────────────────────────────

function Layout1Card({ kit }) {
  const { vibeName, fonts, palette } = kit
  const displayFont = getCssFontFamily(fonts.display.name, fonts.display.category)
  const bodyFont    = getCssFontFamily(fonts.body.name,    fonts.body.category)
  const [img1, img2, img3] = kit.images
  const divider = '1px solid rgba(255,255,255,0.1)'

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', width: '100%', background: '#1a1a1a', color: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '28px 32px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>Design Style</p>
          <h3 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1, margin: 0 }}>
            {vibeName}
          </h3>
        </div>
        <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Huesta</p>
      </div>

      {/* Body */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '52% 48%',
        borderTop: divider,
        borderBottom: divider,
        minHeight: 320,
      }}>
        {/* Left: type + palette */}
        <div style={{ borderRight: divider }}>
          <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>Typography</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ fontSize: 12, color: '#888', margin: 0 }}>Display</p>
              <p style={{ fontFamily: displayFont, fontSize: 26, lineHeight: 1.2, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {fonts.display.sampleText}
              </p>
              <p style={{ fontSize: 10, color: '#666', margin: 0 }}>Type — {fonts.display.category}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ fontSize: 12, color: '#888', margin: 0 }}>Body</p>
              <p style={{ fontFamily: bodyFont, fontSize: 22, fontWeight: 700, letterSpacing: '0.12em', margin: 0 }}>
                {fonts.body.sampleText}
              </p>
              <p style={{ fontSize: 10, color: '#666', margin: 0 }}>Type — {fonts.body.category}</p>
            </div>
          </div>

          <div style={{ padding: '20px 32px', borderTop: divider }}>
            <p style={{ fontSize: 12, color: '#888', marginBottom: 16, marginTop: 0 }}>Color Palette</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {palette.swatches.map((hex) => (
                <ColorSwatch key={hex} hex={hex} />
              ))}
            </div>
          </div>
        </div>

        {/* Right: image grid */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 320 }}>
          <div style={{ flex: '1 1 58%', borderBottom: divider, overflow: 'hidden', minHeight: 0 }}>
            <KitImageDark url={img1?.url ?? ''} alt={img1?.alt ?? ''} />
          </div>
          <div style={{ flex: '1 1 42%', display: 'flex', minHeight: 0 }}>
            <div style={{ flex: 1, borderRight: divider, overflow: 'hidden' }}>
              <KitImageDark url={img2?.url ?? ''} alt={img2?.alt ?? ''} />
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <KitImageDark url={img3?.url ?? ''} alt={img3?.alt ?? ''} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: '#888' }}>Huesta</span>
        <div style={{ display: 'flex', gap: 8 }}>
          {(kit.tags ?? []).slice(0, 3).map(tag => (
            <span key={tag} style={{ fontSize: 10, color: '#666', border: '1px solid #333', borderRadius: 100, padding: '2px 8px' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Layout 2 — light expressive ───────────────────────────────────────────────

function Layout2Card({ kit }) {
  const { vibeName, tags, fonts, palette } = kit
  const bg          = palette.background || '#d6e4ed'
  const textColor   = palette.textColor  || '#13275D'
  const displayFont = getCssFontFamily(fonts.display.name, fonts.display.category)
  const bodyFont    = getCssFontFamily(fonts.body.name,    fonts.body.category)
  const [img1, img2, img3, img4] = kit.images
  const divider     = `1px solid ${textColor}20`

  // Slightly darkened bg for image placeholders
  let placeholderBg = bg
  try {
    // Simple lightness shift without importing chroma on the client bundle
    placeholderBg = bg
  } catch { /* fallback */ }

  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', width: '100%', background: bg, color: textColor }}>
      {/* Header */}
      <div style={{ padding: '28px 32px 20px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{ fontSize: 12, color: textColor, opacity: 0.55, margin: 0 }}>Design Style</p>
          <h3 style={{ fontFamily: displayFont, fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 300, lineHeight: 1, margin: 0, color: textColor }}>
            {vibeName}
          </h3>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(tags ?? []).map(tag => <MoodTag key={tag} tag={tag} textColor={textColor} />)}
          </div>
        </div>
        <p style={{ fontSize: 12, color: textColor, opacity: 0.55, marginTop: 4 }}>Huesta</p>
      </div>

      {/* Top 3-column row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '28% 30% 42%',
        borderTop: divider,
        borderBottom: divider,
        minHeight: 300,
      }}>
        {/* Col 1: blob swatches */}
        <div style={{ padding: '20px', borderRight: divider, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <p style={{ fontSize: 12, color: textColor, opacity: 0.55, marginBottom: 8, marginTop: 0 }}>Color Palette</p>
          {palette.swatches.map((hex, i) => (
            <BlobSwatch key={hex} hex={hex} index={i} textColor={textColor} />
          ))}
        </div>

        {/* Col 2: typography */}
        <div style={{ padding: '20px 24px', borderRight: divider, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p style={{ fontSize: 12, color: textColor, opacity: 0.55, margin: 0 }}>Typography</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontSize: 12, color: textColor, opacity: 0.55, margin: 0 }}>Display</p>
            <p style={{ fontFamily: displayFont, fontSize: 28, lineHeight: 1.2, fontStyle: 'italic', margin: 0, color: textColor }}>
              {fonts.display.sampleText}
            </p>
            <p style={{ fontSize: 10, color: textColor, opacity: 0.45, margin: 0 }}>Type — {fonts.display.category}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{ fontSize: 12, color: textColor, opacity: 0.55, margin: 0 }}>Body</p>
            <p style={{ fontFamily: bodyFont, fontSize: 20, fontWeight: 700, margin: 0, color: textColor }}>
              {fonts.body.sampleText}
            </p>
            <p style={{ fontSize: 10, color: textColor, opacity: 0.45, margin: 0 }}>Type — {fonts.body.category}</p>
          </div>
        </div>

        {/* Col 3: Image 1 */}
        <div style={{ overflow: 'hidden', minHeight: 300 }}>
          <KitImageLight url={img1?.url ?? ''} alt={img1?.alt ?? ''} placeholderBg={placeholderBg} />
        </div>
      </div>

      {/* Bottom image row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '32% 26% 42%',
        height: 200,
        borderBottom: divider,
      }}>
        <div style={{ borderRight: divider, overflow: 'hidden' }}>
          <KitImageLight url={img2?.url ?? ''} alt={img2?.alt ?? ''} placeholderBg={placeholderBg} />
        </div>
        <div style={{ borderRight: divider, overflow: 'hidden' }}>
          <KitImageLight url={img3?.url ?? ''} alt={img3?.alt ?? ''} placeholderBg={placeholderBg} />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <KitImageLight url={img4?.url ?? ''} alt={img4?.alt ?? ''} placeholderBg={placeholderBg} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, color: textColor, opacity: 0.55 }}>Huesta</span>
      </div>
    </div>
  )
}

// ── Main export — picks layout automatically ──────────────────────────────────

export default function KitCard({ kit }) {
  // Inject Google Font into <head> whenever a new kit arrives
  useEffect(() => {
    if (!kit?.fontEmbedUrl) return
    const existing = document.getElementById('huesta-kit-font')
    if (existing) existing.remove()
    const link = document.createElement('link')
    link.id   = 'huesta-kit-font'
    link.rel  = 'stylesheet'
    link.href = kit.fontEmbedUrl
    document.head.appendChild(link)
    return () => { link.remove() }
  }, [kit?.fontEmbedUrl])

  if (!kit) return null
  return kit.layout === 2 ? <Layout2Card kit={kit} /> : <Layout1Card kit={kit} />
}
