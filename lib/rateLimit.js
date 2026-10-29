// lib/rateLimit.js
// Fixed-window, in-memory rate limiter.
//
// Counts are per serverless instance, so this is a deterrent rather than a hard cap.
// For a guaranteed limit, add a rate-limit rule in Vercel Dashboard → Firewall.

const buckets = new Map()

// Returns { ok: true } or { ok: false, retryAfter } (seconds until the window resets).
export function rateLimit(key, { limit, windowMs }) {
  const now = Date.now()

  // Drop expired windows so the map can't grow forever.
  if (buckets.size > 5000) {
    for (const [k, b] of buckets) if (now > b.reset) buckets.delete(k)
  }

  const bucket = buckets.get(key)
  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs })
    return { ok: true }
  }

  bucket.count++
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.reset - now) / 1000) }
  }
  return { ok: true }
}

export function clientIp(request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}
