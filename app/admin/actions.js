'use server'

import { sql } from '@vercel/postgres'
import { put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

// ── Profile ──────────────────────────────────────────────────────────

export async function saveProfile(prevState, formData) {
  try {
    await sql`
      UPDATE profile SET
        tagline        = ${formData.get('tagline')},
        about_text     = ${formData.get('about_text')},
        email          = ${formData.get('email')},
        linkedin_url   = ${formData.get('linkedin_url')},
        github_url     = ${formData.get('github_url')},
        figma_url      = ${formData.get('figma_url')},
        resume_url     = ${formData.get('resume_url')},
        available_from = ${formData.get('available_from')},
        updated_at     = NOW()
      WHERE id = 1
    `
    revalidatePath('/')
    revalidatePath('/admin/profile')
    return { ok: true, message: 'Profile saved.' }
  } catch (e) {
    return { ok: false, message: e.message }
  }
}

// ── Projects ─────────────────────────────────────────────────────────

export async function saveProject(prevState, formData) {
  try {
    const id = formData.get('id')
    await sql`
      UPDATE projects SET
        title             = ${formData.get('title')},
        short_description = ${formData.get('short_description')},
        updated_at        = NOW()
      WHERE id = ${id}
    `
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return { ok: true, message: 'Saved.' }
  } catch (e) {
    return { ok: false, message: e.message }
  }
}

export async function toggleVisibility(formData) {
  const id    = formData.get('id')
  const cur   = formData.get('visible') === 'true'
  await sql`UPDATE projects SET visible = ${!cur}, updated_at = NOW() WHERE id = ${id}`
  revalidatePath('/')
  revalidatePath('/admin/projects')
}

export async function moveProject(formData) {
  const id        = parseInt(formData.get('id'))
  const direction = formData.get('direction') // 'up' | 'down'

  const { rows } = await sql`SELECT id, display_order FROM projects ORDER BY display_order ASC`
  const idx     = rows.findIndex((r) => r.id === id)
  const swapIdx = direction === 'up' ? idx - 1 : idx + 1
  if (swapIdx < 0 || swapIdx >= rows.length) return

  const a = rows[idx]
  const b = rows[swapIdx]
  await sql`UPDATE projects SET display_order = ${b.display_order} WHERE id = ${a.id}`
  await sql`UPDATE projects SET display_order = ${a.display_order} WHERE id = ${b.id}`

  revalidatePath('/')
  revalidatePath('/admin/projects')
}

// ── Images ───────────────────────────────────────────────────────────

export async function uploadImage(prevState, formData) {
  try {
    const file = formData.get('file')
    if (!file || file.size === 0) return { ok: false, message: 'No file selected.' }

    const blob = await put(`portfolio/${file.name}`, file, { access: 'public' })
    revalidatePath('/admin/images')
    return { ok: true, message: 'Uploaded.', url: blob.url }
  } catch (e) {
    return { ok: false, message: e.message }
  }
}
