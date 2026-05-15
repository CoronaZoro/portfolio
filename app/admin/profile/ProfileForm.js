'use client'

import { useState } from 'react'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 8,
  color: '#fff',
  fontSize: 13,
  padding: '10px 14px',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const labelStyle = {
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  display: 'block',
  marginBottom: 6,
}

const sectionHeadStyle = {
  fontSize: 12,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.25)',
  marginBottom: 20,
  paddingBottom: 10,
  borderBottom: '1px solid rgba(255,255,255,0.06)',
}

function Field({ label, name, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        autoComplete="off"
      />
    </div>
  )
}

function TextArea({ label, name, value, onChange, placeholder }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        placeholder={placeholder}
        rows={5}
        style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
      />
    </div>
  )
}

export default function ProfileForm({ profile }) {
  const [fields, setFields] = useState({
    tagline:        profile.tagline        ?? '',
    about_text:     profile.about_text     ?? '',
    email:          profile.email          ?? '',
    linkedin_url:   profile.linkedin_url   ?? '',
    github_url:     profile.github_url     ?? '',
    figma_url:      profile.figma_url      ?? '',
    resume_url:     profile.resume_url     ?? '',
    available_from: profile.available_from ?? '',
  })
  const [status, setStatus] = useState(null)   // { ok, message }
  const [saving, setSaving] = useState(false)

  function handleChange(name, value) {
    setFields(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setStatus(null)
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      setStatus(data)
    } catch (err) {
      setStatus({ ok: false, message: err.message })
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600 }}>

      {/* Identity */}
      <section style={{ marginBottom: 36 }}>
        <div style={sectionHeadStyle}>Identity</div>
        <Field
          label="Tagline"
          name="tagline"
          value={fields.tagline}
          onChange={handleChange}
          placeholder="e.g. Product Designer based in Bangkok"
        />
        <TextArea
          label="About text"
          name="about_text"
          value={fields.about_text}
          onChange={handleChange}
          placeholder="Write a short bio..."
        />
      </section>

      {/* Contact & Links */}
      <section style={{ marginBottom: 36 }}>
        <div style={sectionHeadStyle}>Contact &amp; Links</div>
        <Field
          label="Email"
          name="email"
          type="email"
          value={fields.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
        <Field
          label="LinkedIn URL"
          name="linkedin_url"
          value={fields.linkedin_url}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/..."
        />
        <Field
          label="GitHub URL"
          name="github_url"
          value={fields.github_url}
          onChange={handleChange}
          placeholder="https://github.com/..."
        />
        <Field
          label="Figma URL"
          name="figma_url"
          value={fields.figma_url}
          onChange={handleChange}
          placeholder="https://figma.com/@..."
        />
        <Field
          label="Resume URL"
          name="resume_url"
          value={fields.resume_url}
          onChange={handleChange}
          placeholder="https://..."
        />
      </section>

      {/* Availability */}
      <section style={{ marginBottom: 36 }}>
        <div style={sectionHeadStyle}>Availability</div>
        <Field
          label="Available from"
          name="available_from"
          value={fields.available_from}
          onChange={handleChange}
          placeholder="e.g. June 2025 or Immediately"
        />
      </section>

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: '#fff',
            color: '#0e0c0a',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 22px',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.6 : 1,
            fontFamily: 'inherit',
          }}
        >
          {saving ? 'Saving…' : 'Save profile'}
        </button>

        {status && (
          <span style={{ fontSize: 13, color: status.ok ? 'rgba(100,220,130,0.9)' : '#e63323' }}>
            {status.message}
          </span>
        )}
      </div>
    </form>
  )
}
