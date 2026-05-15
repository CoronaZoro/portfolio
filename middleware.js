// middleware.js
// Password-protects all /admin routes using the ADMIN_PASSWORD env var.
// On GET: serves a minimal login form.
// On POST: checks the password and sets a session cookie.

import { NextResponse } from 'next/server'

const COOKIE = 'admin_auth'
const LOGIN_HTML = (error = '') => `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Admin Login</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0e0c0a;
      color: #fff;
      font-family: system-ui, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
      max-width: 320px;
      padding: 40px 32px;
      border: 0.5px solid rgba(255,255,255,0.12);
      border-radius: 12px;
    }
    label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
    input[type="password"] {
      background: rgba(255,255,255,0.05);
      border: 0.5px solid rgba(255,255,255,0.15);
      border-radius: 8px;
      color: #fff;
      font-size: 14px;
      padding: 10px 14px;
      outline: none;
      width: 100%;
    }
    input[type="password"]:focus { border-color: rgba(255,255,255,0.4); }
    button {
      background: #fff;
      color: #0e0c0a;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      padding: 10px;
      cursor: pointer;
      margin-top: 4px;
    }
    button:hover { opacity: 0.88; }
    .error { font-size: 12px; color: #e63323; }
  </style>
</head>
<body>
  <form method="POST">
    <label>Admin password</label>
    <input type="password" name="password" autofocus autocomplete="current-password" />
    ${error ? `<p class="error">${error}</p>` : ''}
    <button type="submit">Enter</button>
  </form>
</body>
</html>`

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Only guard /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    // No password set — block access entirely
    return new NextResponse('ADMIN_PASSWORD env var is not set.', { status: 503 })
  }

  // ── POST: check submitted password ──────────────────────────────────
  if (request.method === 'POST') {
    const body = await request.text()
    const params = new URLSearchParams(body)
    const submitted = params.get('password') || ''

    if (submitted === adminPassword) {
      const res = NextResponse.redirect(request.nextUrl)
      res.cookies.set(COOKIE, adminPassword, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8, // 8 hours
        path: '/',
      })
      return res
    }

    return new NextResponse(LOGIN_HTML('Incorrect password.'), {
      status: 401,
      headers: { 'Content-Type': 'text/html' },
    })
  }

  // ── GET: check cookie ────────────────────────────────────────────────
  const cookie = request.cookies.get(COOKIE)
  if (cookie?.value === adminPassword) {
    return NextResponse.next()
  }

  return new NextResponse(LOGIN_HTML(), {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  })
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
