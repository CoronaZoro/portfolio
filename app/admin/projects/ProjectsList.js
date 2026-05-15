'use client'

import { useActionState, useRef } from 'react'
import { saveProject, toggleVisibility, moveProject } from '../actions'

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 6,
  color: '#fff',
  fontSize: 13,
  padding: '8px 12px',
  outline: 'none',
  fontFamily: 'inherit',
  width: '100%',
}

const btnStyle = (variant = 'default') => ({
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
})

function ProjectRow({ project, isFirst, isLast }) {
  const [state, action, pending] = useActionState(saveProject, null)

  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 10,
      padding: '20px 22px',
      marginBottom: 12,
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        {/* Thumbnail */}
        {project.thumbnail_url && (
          <img
            src={project.thumbnail_url}
            alt=""
            style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }}
          />
        )}

        {/* Title area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {project.title}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>ID: {project.id}</div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Visibility toggle */}
          <form action={toggleVisibility}>
            <input type="hidden" name="id" value={project.id} />
            <input type="hidden" name="visible" value={String(project.visible)} />
            <button type="submit" style={{
              ...btnStyle(),
              color: project.visible ? 'rgba(100,220,130,0.9)' : 'rgba(255,255,255,0.3)',
              borderColor: project.visible ? 'rgba(100,220,130,0.2)' : 'rgba(255,255,255,0.08)',
            }}>
              {project.visible ? '● Visible' : '○ Hidden'}
            </button>
          </form>

          {/* Move up */}
          <form action={moveProject}>
            <input type="hidden" name="id" value={project.id} />
            <input type="hidden" name="direction" value="up" />
            <button type="submit" disabled={isFirst} style={{ ...btnStyle(), padding: '6px 10px', opacity: isFirst ? 0.3 : 1 }}>↑</button>
          </form>

          {/* Move down */}
          <form action={moveProject}>
            <input type="hidden" name="id" value={project.id} />
            <input type="hidden" name="direction" value="down" />
            <button type="submit" disabled={isLast} style={{ ...btnStyle(), padding: '6px 10px', opacity: isLast ? 0.3 : 1 }}>↓</button>
          </form>
        </div>
      </div>

      {/* Edit form */}
      <form action={action}>
        <input type="hidden" name="id" value={project.id} />
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 6 }}>
            Title
          </label>
          <input type="text" name="title" defaultValue={project.title} style={inputStyle} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 6 }}>
            Short description
          </label>
          <textarea
            name="short_description"
            defaultValue={project.short_description ?? ''}
            rows={2}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="submit" disabled={pending} style={btnStyle('primary')}>
            {pending ? 'Saving…' : 'Save'}
          </button>
          {state && (
            <span style={{ fontSize: 12, color: state.ok ? 'rgba(100,220,130,0.9)' : '#e63323' }}>
              {state.message}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default function ProjectsList({ projects }) {
  return (
    <div>
      {projects.map((project, i) => (
        <ProjectRow
          key={project.id}
          project={project}
          isFirst={i === 0}
          isLast={i === projects.length - 1}
        />
      ))}
    </div>
  )
}
