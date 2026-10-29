import { list } from '@vercel/blob'
import ImageUpload from './ImageUpload'

// Always list the live store — files can also arrive via the Vercel dashboard or scripts
export const dynamic = 'force-dynamic'

export default async function ImagesPage() {
  const { blobs } = await list({ prefix: 'portfolio/', limit: 1000 })

  // Sort newest first
  const sorted = [...blobs].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Media</h1>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>
        Images and videos stored in Vercel Blob. Copy a URL or a ready-made tag to paste into a case study.
      </p>
      <ImageUpload blobs={sorted} />
    </div>
  )
}
