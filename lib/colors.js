import chroma from 'chroma-js'

/**
 * Generate a 5-color palette directly from hex codes returned by Claude.
 * Validates each hex with chroma — pads/interpolates if fewer than 5 come back valid.
 */
export function generatePaletteFromHexCodes(hexCodes) {
  const valid = []
  for (const hex of hexCodes) {
    try {
      valid.push(chroma(hex).hex())
    } catch {
      // skip invalid
    }
  }
  if (valid.length >= 5) return valid.slice(0, 5)
  if (valid.length >= 2) return chroma.scale(valid).mode('lch').colors(5)
  return chroma.scale(['#0D0D0D', '#7C7C7C', '#444444', '#110F29', '#CFA764']).mode('lch').colors(5)
}

/**
 * For Layout 2: muted background derived from the lightest swatch.
 * Targets ~92% lightness and ~25% saturation in HSL.
 */
export function getMutedBackground(swatches) {
  if (swatches.length === 0) return '#f0f4f8'
  const sorted = [...swatches].sort(
    (a, b) => chroma(b).get('hsl.l') - chroma(a).get('hsl.l')
  )
  return chroma(sorted[0]).set('hsl.l', 0.92).set('hsl.s', 0.22).hex()
}

/**
 * For Layout 2: dark desaturated text color from the darkest swatch.
 */
export function getDarkTextColor(swatches) {
  if (swatches.length === 0) return '#1a1a2e'
  const sorted = [...swatches].sort(
    (a, b) => chroma(a).get('hsl.l') - chroma(b).get('hsl.l')
  )
  return chroma(sorted[0]).set('hsl.l', 0.18).set('hsl.s', 0.3).hex()
}

/**
 * For Layout 2: ensure every swatch is distinguishable from the card background.
 */
export function ensureSwatchContrast(swatches, background) {
  const bgL = chroma(background).get('hsl.l')
  return swatches.map((hex) => {
    try {
      const swatchL = chroma(hex).get('hsl.l')
      if (Math.abs(swatchL - bgL) < 0.15) {
        return chroma(hex).darken(1.2).hex()
      }
    } catch { /* leave as-is */ }
    return hex
  })
}
