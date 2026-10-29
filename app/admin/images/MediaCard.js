'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Code, Link2, Trash2 } from 'lucide-react'

export const VIDEO_RE = /\.(mp4|webm|mov)$/i

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function fileName(pathname) {
  return decodeURIComponent(pathname.split('/').pop())
}

// Ready-to-paste JSX for the hand-coded case study pages
function snippet(blob) {
  const name = fileName(blob.pathname)
  if (VIDEO_RE.test(name)) {
    return `<video src="${blob.url}" autoPlay muted loop playsInline />`
  }
  const alt = name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
  return `<img src="${blob.url}" alt="${alt}" />`
}

// Videos only fetch metadata once scrolled into view; #t=0.1 shows the first frame
function VideoThumb({ url, style }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        io.disconnect()
      }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      src={inView ? `${url}#t=0.1` : undefined}
      preload="metadata"
      muted
      playsInline
      controls
      style={style}
    />
  )
}

const iconBtn = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 4,
  color: 'rgba(255,255,255,0.6)',
  fontSize: 11,
  padding: '5px 8px',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export default function MediaCard({ blob, onDeleted }) {
  const [copied,   setCopied]   = useState(null)  // 'url' | 'snippet' | 'failed'
  const [confirm,  setConfirm]  = useState(false) // first click on delete arms it
  const [deleting, setDeleting] = useState(false)
  const [error,    setError]    = useState(null)

  const name    = fileName(blob.pathname)
  const isVideo = VIDEO_RE.test(name)
  const ext     = name.split('.').pop().toUpperCase()

  // Disarm delete after 3s if not confirmed
  useEffect(() => {
    if (!confirm) return
    const t = setTimeout(() => setConfirm(false), 3000)
    return () => clearTimeout(t)
  }, [confirm])

  async function copy(kind) {
    const text = kind === 'url' ? blob.url : snippet(blob)
    let ok = false
    try {
      await navigator.clipboard.writeText(text)
      ok = true
    } catch {
      // Clipboard API can be blocked (permissions, embedded browsers) — fall back
      // to the old select-and-copy trick
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.cssText = 'position:fixed;opacity:0'
      document.body.appendChild(ta)
      ta.select()
      ok = document.execCommand('copy')
      ta.remove()
    }
    setCopied(ok ? kind : 'failed')
    setTimeout(() => setCopied(null), ok ? 1500 : 4000)
  }

  async function handleDelete() {
    if (!confirm) { setConfirm(true); return }
    setDeleting(true)
    setError(null)
    try {
      const res  = await fetch('/api/admin/images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: blob.url }),
      })
      const data = await res.json()
      if (data.ok) onDeleted(blob.url)
      else setError(data.message || 'Delete failed.')
    } catch (err) {
      setError(err.message)
    } finally {
      setDeleting(false)
      setConfirm(false)
    }
  }

  const mediaStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
  const previewUrl = blob.bust ? `${blob.url}?v=${blob.bust}` : blob.url

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 8,
      overflow: 'hidden',
    }}>
      {/* Preview */}
      <div style={{ aspectRatio: '16/10', background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
        {isVideo
          ? <VideoThumb url={previewUrl} style={mediaStyle} />
          : <img src={previewUrl} alt={name} loading="lazy" decoding="async" style={mediaStyle} />}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px' }}>
        <div title={name} style={{
          fontSize: 12,
          fontWeight: 500,
          marginBottom: 3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          color: 'rgba(255,255,255,0.85)',
        }}>
          {name}
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 9 }}>
          {ext} · {formatBytes(blob.size)}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          <button type="button" onClick={() => copy('url')} style={{ ...iconBtn, flex: 1 }} title="Copy URL">
            {copied === 'url' ? <Check size={12} /> : <Link2 size={12} />}
            {copied === 'url' ? 'Copied' : 'URL'}
          </button>
          <button type="button" onClick={() => copy('snippet')} style={{ ...iconBtn, flex: 1 }} title={`Copy ${isVideo ? '<video>' : '<img>'} tag`}>
            {copied === 'snippet' ? <Check size={12} /> : <Code size={12} />}
            {copied === 'snippet' ? 'Copied' : isVideo ? '<video>' : '<img>'}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            aria-label={confirm ? 'Confirm delete' : 'Delete'}
            title={confirm ? 'Click again to delete' : 'Delete'}
            style={{
              ...iconBtn,
              background: confirm ? 'rgba(230,51,35,0.85)' : 'rgba(230,51,35,0.08)',
              border: '1px solid rgba(230,51,35,0.35)',
              color: confirm ? '#fff' : 'rgba(230,51,35,0.8)',
              cursor: deleting ? 'not-allowed' : 'pointer',
              opacity: deleting ? 0.5 : 1,
            }}
          >
            <Trash2 size={12} />
            {confirm && 'Sure?'}
          </button>
        </div>

        {copied === 'failed' && (
          <div style={{ marginTop: 6, fontSize: 11, color: '#e63323', wordBreak: 'break-all', userSelect: 'all' }}>
            Couldn’t copy. Select and copy manually: {blob.url}
          </div>
        )}
        {error && (
          <div style={{ marginTop: 6, fontSize: 11, color: '#e63323' }}>{error}</div>
        )}
      </div>
    </div>
  )
}
