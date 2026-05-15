const UNSPLASH_BASE = 'https://api.unsplash.com'

function getAccessKey() {
  return process.env.UNSPLASH_ACCESS_KEY ?? process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
}

export async function searchPhotos(query, count = 5) {
  const accessKey = getAccessKey()
  if (!accessKey) {
    console.warn('[images] No Unsplash access key set')
    return []
  }
  try {
    const res = await fetch(
      `${UNSPLASH_BASE}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    )
    if (!res.ok) {
      console.error('[images] Unsplash error', res.status, await res.text())
      return []
    }
    const data = await res.json()
    return data.results ?? []
  } catch (err) {
    console.error('[images] fetch failed', err)
    return []
  }
}
