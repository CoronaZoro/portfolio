'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const inputStyle = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 6,
  color: '#fff',
  fontSize: 13,
  padding: '8px 12px',
  outline: 'none',
  fontFamily: 'inherit',
  width: '100%',
  boxSizing: 'border-box',
}

function btn(variant = 'default') {
  return {
    background: variant === 'primary' ? '#fff' : 'rgba(255,255,255,0.06)',
    color: variant === 'primary' ? '#0e0c0a' : 'rgba(255,255,255,0.7)',
    border: '1px solid ' + (variant === 'primary' ? 'transparent' : 'rgba(255,255,255,0.1)'),
    borderRadius: 6,
    fontSize: 12,
    fontWeight: variant === 'primary' ? 600 : 400,
    padding: '6px 14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  }
}

function ProjectRow({ project, isFirst, isLast, onReorder }) {
  const [title, setTitle]       = useState(project.title ?? '')
  const [desc,  setDesc]        = useState(project.short_description ?? '')
  const [visible, setVisible]   = useState(project.visible)
  const [saving,  setSaving]    = useState(false)
  const [toggling, setToggling] = useState(false)
  const [moving,  setMoving]    = useState(false)
  const [status,  setStatus]    = useState(null) // { ok, message }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      const res  = await fetch('/api/admin/projects/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, title, short_description: desc }),
      })
      const data = await res.json()
      setStatus(data)
    } catch (err) {
      setStatus({ ok: false, message: err.message })
    } finally {
      setSaving(false)
    }
  }

  async function handleToggle() {
    setToggling(true)
    try {
      const res  = await fetch('/api/admin/projects/visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, visible }),
      })
      const data = await res.json()
      if (data.ok) setVisible(v => !v)
    } catch (err) {
      console.error(err)
    } finally {
      setToggling(false)
    }
  }

  async function handleMove(direction) {
    setMoving(direction)
    try {
      await fetch('/api/admin/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, direction }),
      })
      onReorder()        // triggers a full page refresh to reflect new order
    } catch (err) {
      console.error(err)
    } finally {
      setMoving(false)
    }
  }

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      padding: '20px 22px',
      marginBottom: 12,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {project.thumbnail_url && (
          <img
            src={project.thumbnail_url}
            alt=""
            style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
          />
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {project.title}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>ID: {project.id}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Visibility toggle */}
          <button
            type="button"
            onClick={handleToggle}
            disabled={toggling}
            style={{
              ...btn(),
              color:       visible ? 'rgba(100,220,130,0.9)' : 'rgba(255,255,255,0.3)',
              borderColor: visible ? 'rgba(100,220,130,0.2)' : 'rgba(255,255,255,0.08)',
              opacity: toggling ? 0.5 : 1,
            }}
          >
            {visible ? '● Visible' : '○ Hidden'}
          </button>

          {/* Move up */}
          <button
            type="button"
            onClick={() => handleMove('up')}
            disabled={isFirst || moving === 'up'}
            style={{ ...btn(), padding: '6px 10px', opacity: isFirst ? 0.3 : 1 }}
          >
            ↑
          </button>

          {/* Move down */}
          <button
            type="button"
            onClick={() => handleMove('down')}
            disabled={isLast || moving === 'down'}
            style={{ ...btn(), padding: '6px 10px', opacity: isLast ? 0.3 : 1 }}
          >
            ↓
          </button>
        </div>
      </div>

      {/* Edit form */}
      <form onSubmit={handleSave}>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 6 }}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 6 }}>
            Short description
          </label>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="submit" disabled={saving} style={{ ...btn('primary'), opacity: saving ? 0.6 : 1 }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          {status && (
            <span style={{ fontSize: 12, color: status.ok ? 'rgba(100,220,130,0.9)' : '#e63323' }}>
              {status.message}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default function ProjectsList({ projects: initial }) {
  const router   = useRouter()

  function onReorder() {
    router.refresh()   // re-fetches server data to show updated order
  }

  return (
    <div>
      {initial.map((project, i) => (
        <ProjectRow
          key={project.id}
          project={project}
          isFirst={i === 0}
          isLast={i === initial.length - 1}
          onReorder={onReorder}
        />
      ))}
    </div>
  )
}
