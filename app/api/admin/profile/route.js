import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { tagline, about_text, email, linkedin_url, github_url, figma_url, resume_url, available_from } = body

    await sql`
      UPDATE profile SET
        tagline        = ${tagline        ?? null},
        about_text     = ${about_text     ?? null},
        email          = ${email          ?? null},
        linkedin_url   = ${linkedin_url   ?? null},
        github_url     = ${github_url     ?? null},
        figma_url      = ${figma_url      ?? null},
        resume_url     = ${resume_url     ?? null},
        available_from = ${available_from ?? null},
        updated_at     = NOW()
      WHERE id = 1
    `

    revalidatePath('/')
    revalidatePath('/admin/profile')
    revalidatePath('/projects/guardian')
    revalidatePath('/projects/bouzer')
    revalidatePath('/projects/attend')
    revalidatePath('/projects/huesta')

    return NextResponse.json({ ok: true, message: 'Profile saved.' })
  } catch (e) {
    return NextResponse.json({ ok: false, message: e.message }, { status: 500 })
  }
}
