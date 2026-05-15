'use client'

import { useActionState } from 'react'
import { saveProfile } from '../actions'

const field = {
  label: { fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', display: 'block', marginBottom: 6 },
  input: {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#fff',
    fontSize: 13,
    padding: '10px 14px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#fff',
    fontSize: 13,
    padding: '10px 14px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: 120,
  },
}

function Field({ label, name, value, type = 'text', placeholder }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={field.label}>{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={value ?? ''}
        placeholder={placeholder}
        style={field.input}
      />
    </div>
  )
}

function TextArea({ label, name, value, placeholder }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={field.label}>{label}</label>
      <textarea
        name={name}
        defaultValue={value ?? ''}
        placeholder={placeholder}
        style={field.textarea}
      />
    </div>
  )
}

export default function ProfileForm({ profile }) {
  const [state, action, pending] = useActionState(saveProfile, null)

  return (
    <form action={action} style={{ maxWidth: 600 }}>
      <section style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          Identity
        </div>
        <Field label="Tagline" name="tagline" value={profile.tagline} placeholder="e.g. Designer & Developer" />
        <TextArea label="About text" name="about_text" value={profile.about_text} placeholder="Write a short bio..." />
      </section>

      <section style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          Contact &amp; Links
        </div>
        <Field label="Email" name="email" value={profile.email} type="email" placeholder="you@example.com" />
        <Field label="LinkedIn URL" name="linkedin_url" value={profile.linkedin_url} placeholder="https://linkedin.com/in/..." />
        <Field label="GitHub URL" name="github_url" value={profile.github_url} placeholder="https://github.com/..." />
        <Field label="Figma URL" name="figma_url" value={profile.figma_url} placeholder="https://figma.com/@..." />
        <Field label="Resume URL" name="resume_url" value={profile.resume_url} placeholder="https://..." />
      </section>

      <section style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          Availability
        </div>
        <Field label="Available from (date or text)" name="available_from" value={profile.available_from} placeholder="e.g. June 2025 or Immediately" />
      </section>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          type="submit"
          disabled={pending}
          style={{
            background: '#fff',
            color: '#0e0c0a',
            border: 'none',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 22px',
            cursor: pending ? 'not-allowed' : 'pointer',
            opacity: pending ? 0.6 : 1,
          }}
        >
          {pending ? 'Saving…' : 'Save profile'}
        </button>

        {state && (
          <span style={{ fontSize: 13, color: state.ok ? 'rgba(100,220,130,0.9)' : '#e63323' }}>
            {state.message}
          </span>
        )}
      </div>
    </form>
  )
}
