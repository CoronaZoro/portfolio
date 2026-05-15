'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileName(url) {
  return decodeURIComponent(url.split('/').pop().split('?')[0])
}

export default function ImageUpload({ blobs: initial }) {
  const [blobs,        setBlobs]       = useState(initial)
  const [status,       setStatus]      = useState(null)   // upload feedback { ok, message, url? }
  const [deleteStatus, setDeleteStatus] = useState(null)  // delete feedback { ok, message }
  const [pending,      setPending]     = useState(false)
  const [deleting,     setDeleting]    = useState(null)   // url currently being deleted
  const formRef  = useRef(null)
  const router   = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const file = formRef.current?.querySelector('input[type="file"]')?.files?.[0]
    if (!file) { setStatus({ ok: false, message: 'No file selected.' }); return }

    setPending(true)
    setStatus(null)

    const body = new FormData()
    body.append('file', file)

    try {
      const res  = await fetch('/api/admin/images/upload', { method: 'POST', body })
      const data = await res.json()
      setStatus(data)
      if (data.ok) {
        formRef.current?.reset()
        router.refresh()   // re-fetch blob list from server
      }
    } catch (err) {
      setStatus({ ok: false, message: err.message })
    } finally {
      setPending(false)
    }
  }

  async function handleDelete(url) {
    if (!confirm('Remove this image from Vercel Blob? This cannot be undone.')) return
    setDeleting(url)
    setDeleteStatus(null)
    try {
      const res  = await fetch('/api/admin/images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      })
      const data = await res.json()
      if (data.ok) {
        setBlobs(prev => prev.filter(b => b.url !== url))
      } else {
        setDeleteStatus({ ok: false, message: data.message || 'Delete failed.' })
      }
    } catch (err) {
      setDeleteStatus({ ok: false, message: err.message })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div>
      {/* Upload form */}
      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 10,
        padding: '22px 24px',
        marginBottom: 36,
        maxWidth: 520,
      }}>
        <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          Upload new image
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <input
              type="file"
              name="file"
              accept="image/*"
              required
              style={{
                flex: 1,
                minWidth: 200,
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            />
            <button
              type="submit"
              disabled={pending}
              style={{
                background: '#fff',
                color: '#0e0c0a',
                border: 'none',
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
                padding: '9px 18px',
                cursor: pending ? 'not-allowed' : 'pointer',
                opacity: pending ? 0.6 : 1,
                flexShrink: 0,
                fontFamily: 'inherit',
              }}
            >
              {pending ? 'Uploading…' : 'Upload'}
            </button>
          </div>

          {status && (
            <div style={{ marginTop: 10, fontSize: 13, color: status.ok ? 'rgba(100,220,130,0.9)' : '#e63323' }}>
              {status.message}
              {status.ok && status.url && (
                <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>
                  →{' '}
                  <a
                    href={status.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}
                  >
                    {status.url}
                  </a>
                </span>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Delete error */}
      {deleteStatus && !deleteStatus.ok && (
        <div style={{ marginBottom: 16, fontSize: 13, color: '#e63323' }}>
          ⚠ {deleteStatus.message}
        </div>
      )}

      {/* Image grid */}
      {blobs.length === 0 ? (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>No images uploaded yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {blobs.map((blob) => (
            <div
              key={blob.url}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {/* Preview */}
              <div style={{ aspectRatio: '16/10', background: 'rgba(255,255,255,0.03)', overflow: 'hidden' }}>
                <img
                  src={blob.url}
                  alt={fileName(blob.url)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Info */}
              <div style={{ padding: '10px 12px' }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 500,
                  marginBottom: 4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  {fileName(blob.url)}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
                  {formatBytes(blob.size)}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(blob.url)}
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: 11,
                      padding: '4px 0',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    Copy URL
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(blob.url)}
                    disabled={deleting === blob.url}
                    style={{
                      background: 'rgba(230,51,35,0.08)',
                      border: '1px solid rgba(230,51,35,0.25)',
                      borderRadius: 4,
                      color: deleting === blob.url ? 'rgba(230,51,35,0.4)' : 'rgba(230,51,35,0.75)',
                      fontSize: 11,
                      padding: '4px 10px',
                      cursor: deleting === blob.url ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      flexShrink: 0,
                    }}
                  >
                    {deleting === blob.url ? '…' : 'Remove'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
