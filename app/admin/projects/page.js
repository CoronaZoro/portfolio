import { sql } from '@vercel/postgres'
import ProjectsList from './ProjectsList'

export default async function ProjectsPage() {
  const { rows: projects } = await sql`
    SELECT id, title, short_description, visible, display_order, thumbnail_url
    FROM projects
    ORDER BY display_order ASC
  `

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Projects</h1>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
        {projects.length} project{projects.length !== 1 ? 's' : ''} total
        &nbsp;·&nbsp;
        {projects.filter(p => p.visible).length} visible
      </p>
      <ProjectsList projects={projects} />
    </div>
  )
}
