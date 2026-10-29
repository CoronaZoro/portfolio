'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { Search, UploadCloud, X } from 'lucide-react'
import MediaCard, { VIDEO_RE, fileName, formatBytes } from './MediaCard'

// Keep in sync with ALLOWED_TYPES in app/api/admin/images/upload/route.js
const ACCEPT    = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif', 'video/mp4', 'video/webm', 'video/quicktime']
const MAX_BYTES = 500 * 1024 * 1024
// Above this, the Blob SDK splits the file into parallel, retryable parts
const MULTIPART_FROM = 20 * 1024 * 1024

// "My Photo (1).PNG" → "My-Photo-1-.PNG" — no slashes, spaces or path tricks
function safeName(name) {
  return name.replace(/[^\w.-]+/g, '-').replace(/^[.-]+/, '').slice(0, 100) || 'upload'
}

// "banner.png" → "banner-2.png", "banner-3.png", … whichever is free
function uniqueName(name, taken) {
  const dot  = name.lastIndexOf('.')
  const base = dot > 0 ? name.slice(0, dot) : name
  const ext  = dot > 0 ? name.slice(dot) : ''
  let n = 2
  while (taken.has(`${base}-${n}${ext}`)) n++
  return `${base}-${n}${ext}`
}

let nextId = 0

const chip = (active) => ({
  background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
  border: '1px solid ' + (active ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'),
  borderRadius: 999,
  color: active ? '#fff' : 'rgba(255,255,255,0.5)',
  fontSize: 12,
  padding: '5px 12px',
  cursor: 'pointer',
  fontFamily: 'inherit',
})

const smallBtn = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 4,
  color: 'rgba(255,255,255,0.8)',
  fontSize: 11,
  padding: '3px 9px',
  cursor: 'pointer',
  fontFamily: 'inherit',
}

export default function ImageUpload({ blobs: initial }) {
  const [blobs,    setBlobs]    = useState(initial)
  const [queue,    setQueue]    = useState([])    // { id, file, name, status, progress, error }
  const [query,    setQuery]    = useState('')
  const [filter,   setFilter]   = useState('all') // 'all' | 'images' | 'videos'
  const [dragging, setDragging] = useState(false)
  const inputRef   = useRef(null)
  const dragDepth  = useRef(0)                    // dragenter/leave fire per child element

  // Names already in the store or currently uploading — used to spot conflicts
  const takenNames = useMemo(() => new Set([
    ...blobs.map(b => fileName(b.pathname)),
    ...queue.filter(q => q.status === 'uploading').map(q => q.name),
  ]), [blobs, queue])

  const updateItem = (id, patch) =>
    setQueue(q => q.map(item => (item.id === id ? { ...item, ...patch } : item)))
  const removeItem = (id) =>
    setQueue(q => q.filter(item => item.id !== id))

  async function startUpload(item, name, overwrite = false) {
    updateItem(item.id, { name, status: 'uploading', progress: 0, error: null })
    try {
      const result = await upload(`portfolio/${name}`, item.file, {
        access:          'public',
        handleUploadUrl: '/api/admin/images/upload',
        clientPayload:   JSON.stringify({ overwrite }),
        contentType:     item.file.type,
        multipart:       item.file.size > MULTIPART_FROM,
        onUploadProgress: ({ percentage }) => updateItem(item.id, { progress: percentage }),
      })
      // Show it in the grid straight away (replacing the old entry on overwrite).
      // `bust` forces the preview to reload — a replaced file keeps the same URL.
      setBlobs(prev => [
        { url: result.url, pathname: result.pathname, size: item.file.size, uploadedAt: new Date().toISOString(), bust: Date.now() },
        ...prev.filter(b => b.pathname !== result.pathname),
      ])
      updateItem(item.id, { status: 'done', progress: 100 })
      setTimeout(() => removeItem(item.id), 2500)
    } catch (err) {
      updateItem(item.id, { status: 'error', error: err.message })
    }
  }

  const addFiles = useCallback((fileList) => {
    const taken = new Set(takenNames)
    for (const file of fileList) {
      // Pasted screenshots all arrive as "image.png" — give them a unique name
      const raw  = file.name && file.name !== 'image.png' ? file.name : `pasted-${Date.now()}.${(file.type.split('/')[1] || 'png')}`
      const name = safeName(raw)
      const item = { id: ++nextId, file, name, status: 'queued', progress: 0, error: null }

      if (!ACCEPT.includes(file.type)) {
        item.status = 'error'
        item.error  = 'Only PNG, JPEG, WebP, GIF, AVIF, MP4, WebM or MOV.'
      } else if (file.size > MAX_BYTES) {
        item.status = 'error'
        item.error  = `Too large (${formatBytes(file.size)}, max 500 MB).`
      } else if (taken.has(name)) {
        item.status = 'conflict'
      }

      setQueue(q => [...q, item])
      if (item.status === 'queued') {
        taken.add(name)
        startUpload(item, name)
      }
    }
  // startUpload only uses state setters, so takenNames is the real dependency
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [takenNames])

  // Paste images from the clipboard anywhere on the page
  useEffect(() => {
    function onPaste(e) {
      const files = [...(e.clipboardData?.files ?? [])]
      if (files.length) {
        e.preventDefault()
        addFiles(files)
      }
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [addFiles])

  // ── Drag & drop anywhere on the page ─────────────────────────────────
  function onDragEnter(e) {
    if (!e.dataTransfer.types.includes('Files')) return
    e.preventDefault()
    dragDepth.current++
    setDragging(true)
  }
  function onDragLeave() {
    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) setDragging(false)
  }
  function onDrop(e) {
    e.preventDefault()
    dragDepth.current = 0
    setDragging(false)
    if (e.dataTransfer.files.length) addFiles([...e.dataTransfer.files])
  }

  const visible = blobs.filter(b => {
    const name = fileName(b.pathname)
    if (filter === 'images' &&  VIDEO_RE.test(name)) return false
    if (filter === 'videos' && !VIDEO_RE.test(name)) return false
    return !query || name.toLowerCase().includes(query.toLowerCase())
  })
  const videoCount = blobs.filter(b => VIDEO_RE.test(b.pathname)).length

  return (
    <div
      onDragEnter={onDragEnter}
      onDragOver={e => e.preventDefault()}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {/* ── Drop zone ── */}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          padding: '28px 20px',
          marginBottom: 16,
          background: dragging ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.025)',
          border: `1.5px dashed ${dragging ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}`,
          borderRadius: 10,
          color: '#fff',
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.15s, border-color 0.15s',
        }}
      >
        <UploadCloud size={22} color="rgba(255,255,255,0.6)" />
        <span style={{ fontSize: 14, fontWeight: 500 }}>
          {dragging ? 'Drop to upload' : 'Drop images or videos here, or click to browse'}
        </span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          You can also paste a screenshot · PNG, JPEG, WebP, GIF, AVIF, MP4, WebM, MOV · up to 500 MB
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ACCEPT.join(',')}
        onChange={e => { addFiles([...e.target.files]); e.target.value = '' }}
        style={{ display: 'none' }}
      />

      {/* ── Upload queue ── */}
      {queue.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          {queue.map(item => (
            <div key={item.id} style={{
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${item.status === 'error' ? 'rgba(230,51,35,0.4)' : 'rgba(255,255,255,0.08)'}`,
              borderRadius: 6,
              fontSize: 12,
            }}>
              {/* Progress fill */}
              {item.status === 'uploading' && (
                <div style={{
                  position: 'absolute', inset: 0, right: 'auto',
                  width: `${item.progress}%`,
                  background: 'rgba(255,255,255,0.06)',
                  transition: 'width 0.2s',
                }} />
              )}

              <span style={{ position: 'relative', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.name}
                <span style={{ color: 'rgba(255,255,255,0.35)', marginLeft: 8 }}>{formatBytes(item.file.size)}</span>
              </span>

              <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                {item.status === 'uploading' && (
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontVariantNumeric: 'tabular-nums' }}>{Math.round(item.progress)}%</span>
                )}
                {item.status === 'done' && <span style={{ color: 'rgba(100,220,130,0.9)' }}>Uploaded</span>}
                {item.status === 'error' && <span style={{ color: '#e63323' }}>{item.error}</span>}
                {item.status === 'conflict' && (
                  <>
                    <span style={{ color: 'rgba(255,200,90,0.9)' }}>Already exists</span>
                    <button type="button" style={smallBtn} onClick={() => startUpload(item, item.name, true)}>Replace</button>
                    <button type="button" style={smallBtn} onClick={() => startUpload(item, uniqueName(item.name, takenNames))}>Keep both</button>
                  </>
                )}
                {item.status !== 'uploading' && item.status !== 'done' && (
                  <button type="button" aria-label="Dismiss" onClick={() => removeItem(item.id)}
                    style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: 2, display: 'flex' }}>
                    <X size={14} />
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Toolbar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: 280 }}>
          <Search size={13} color="rgba(255,255,255,0.35)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search files"
            style={{
              width: '100%',
              boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: '#fff',
              fontSize: 12,
              padding: '7px 10px 7px 30px',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <button type="button" style={chip(filter === 'all')}    onClick={() => setFilter('all')}>All {blobs.length}</button>
        <button type="button" style={chip(filter === 'images')} onClick={() => setFilter('images')}>Images {blobs.length - videoCount}</button>
        <button type="button" style={chip(filter === 'videos')} onClick={() => setFilter('videos')}>Videos {videoCount}</button>
      </div>

      {/* ── Library grid ── */}
      {visible.length === 0 ? (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>
          {blobs.length === 0 ? 'Nothing uploaded yet.' : 'No files match.'}
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {visible.map(blob => (
            <MediaCard
              key={`${blob.url}-${blob.bust ?? ''}`}
              blob={blob}
              onDeleted={url => setBlobs(prev => prev.filter(b => b.url !== url))}
            />
          ))}
        </div>
      )}
    </div>
  )
}
