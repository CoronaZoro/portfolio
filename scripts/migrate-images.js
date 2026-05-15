// scripts/migrate-images.js
// Uploads all /public images to Vercel Blob storage.
// Run with: node scripts/migrate-images.js
//
// After running, the console prints a mapping of local path → blob URL.
// You can use these URLs to update thumbnail_url in the projects table.

require('dotenv').config({ path: '.env.local' })

const { put } = require('@vercel/blob')
const fs = require('fs')
const path = require('path')

// Only migrate portfolio images — skip Next.js boilerplate SVGs
const SKIP = new Set(['file.svg', 'globe.svg', 'next.svg', 'vercel.svg', 'window.svg'])
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

async function migrateImages() {
  const files = fs.readdirSync(PUBLIC_DIR).filter((f) => {
    const ext = path.extname(f).toLowerCase()
    const isImage = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'].includes(ext)
    return isImage && !SKIP.has(f)
  })

  console.log(`Found ${files.length} images to migrate.\n`)

  const results = {}

  for (const file of files) {
    const filePath = path.join(PUBLIC_DIR, file)
    const fileBuffer = fs.readFileSync(filePath)
    const ext = path.extname(file).toLowerCase()

    const contentTypeMap = {
      '.png':  'image/png',
      '.jpg':  'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg':  'image/svg+xml',
      '.gif':  'image/gif',
    }

    try {
      const blob = await put(`portfolio/${file}`, fileBuffer, {
        access: 'public',
        contentType: contentTypeMap[ext] || 'application/octet-stream',
      })
      results[file] = blob.url
      console.log(`✓ ${file}`)
      console.log(`  → ${blob.url}\n`)
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`)
    }
  }

  console.log('\n── Blob URL mapping ────────────────────────────────────')
  console.log(JSON.stringify(results, null, 2))
  console.log('\nMigration complete.')
  process.exit(0)
}

migrateImages().catch((err) => {
  console.error('Image migration failed:', err)
  process.exit(1)
})
