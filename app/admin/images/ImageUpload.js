'use client'

import { useActionState, useRef, useEffect } from 'react'
import { uploadImage } from '../actions'

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function fileName(url) {
  return decodeURIComponent(url.split('/').pop().split('?')[0])
}

export default function ImageUpload({ blobs }) {
  const [state, action, pending] = useActionState(uploadImage, null)
  const formRef = useRef(null)

  // Reset the file input after a successful upload
  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset()
    }
  }, [state])

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
        <form ref={formRef} action={action}>
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
              }}
            >
              {pending ? 'Uploading…' : 'Upload'}
            </button>
          </div>
          {state && (
            <div style={{ marginTop: 10, fontSize: 13, color: state.ok ? 'rgba(100,220,130,0.9)' : '#e63323' }}>
              {state.message}
              {state.ok && state.url && (
                <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: 8 }}>
                  → <a href={state.url} target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{state.url}</a>
                </span>
              )}
            </div>
          )}
        </form>
      </div>

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
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(blob.url)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 4,
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: 11,
                    padding: '4px 10px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    width: '100%',
                  }}
                >
                  Copy URL
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
