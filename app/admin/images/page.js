import { list } from '@vercel/blob'
import ImageUpload from './ImageUpload'

export default async function ImagesPage() {
  const { blobs } = await list({ prefix: 'portfolio/' })

  // Sort newest first
  const sorted = [...blobs].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>Images</h1>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
        {blobs.length} file{blobs.length !== 1 ? 's' : ''} stored in Vercel Blob
      </p>
      <ImageUpload blobs={sorted} />
    </div>
  )
}
