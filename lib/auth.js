// lib/auth.js
// Admin session helpers shared by middleware.js and lib/db.js.
//
// The session cookie holds `<expiry>.<hmac>` signed with ADMIN_PASSWORD — never the
// password itself. Changing ADMIN_PASSWORD invalidates every existing session.
// Uses Web Crypto so it runs in both middleware and Node route handlers.

export const SESSION_COOKIE  = 'admin_auth'
export const SESSION_MAX_AGE = 60 * 60 * 8 // 8 hours, in seconds

const encoder = new TextEncoder()

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer), b => b.toString(16).padStart(2, '0')).join('')
}

async function hmac(secret, message) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(message)))
}

async function sha256(value) {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(value)))
}

// Constant-time compare — doesn't leak how many leading characters matched.
function safeEqual(a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

// Hash both sides first so the compare is always fixed-length.
export async function checkPassword(submitted, adminPassword) {
  return safeEqual(await sha256(submitted), await sha256(adminPassword))
}

export async function createSessionToken(adminPassword) {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE)
  return `${expires}.${await hmac(adminPassword, expires)}`
}

export async function verifySessionToken(token, adminPassword) {
  if (!token) return false
  const [expires, signature] = token.split('.')
  if (!expires || !signature) return false
  if (Number(expires) < Date.now() / 1000) return false
  return safeEqual(signature, await hmac(adminPassword, expires))
}
