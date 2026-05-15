/**
 * Build a Google Fonts CSS v2 embed URL for a list of font families.
 */
export function getFontEmbedUrl(families) {
  const params = families
    .map((f) => `family=${f.replace(/ /g, '+')}:wght@400;700`)
    .join('&')
  return `https://fonts.googleapis.com/css2?${params}&display=swap`
}

/**
 * Build a CSS font-family string with appropriate fallbacks.
 */
export function getCssFontFamily(fontName, category) {
  const fallbacks = {
    serif: 'Georgia, "Times New Roman", serif',
    'sans-serif': 'Arial, Helvetica, sans-serif',
    display: 'Impact, fantasy',
    handwriting: 'cursive',
    monospace: '"Courier New", monospace',
  }
  return `"${fontName}", ${fallbacks[category] ?? 'sans-serif'}`
}
