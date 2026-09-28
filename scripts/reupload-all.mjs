import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGES_DIR = path.join(__dirname, 'images')
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif']

const MIME_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
}

async function run() {
  console.log('Initializing Payload...\n')
  const payload = await getPayload({ config })

  const folders = fs.readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  console.log('Found ' + folders.length + ' folder(s)\n')

  for (const slug of folders) {
    const folderPath = path.join(IMAGES_DIR, slug)
    const files = fs.readdirSync(folderPath)
      .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10)
        const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10)
        return numA - numB
      })

    if (files.length === 0) continue

    const { docs: properties } = await payload.find({
      collection: 'properties',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (properties.length === 0) {
      console.log('Skipped ' + slug + ': no property')
      continue
    }

    const property = properties[0]
    console.log('Re-uploading ' + slug + ' (' + files.length + ' image(s))')

    const mediaIds = []

    for (const file of files) {
      const filePath = path.join(folderPath, file)
      const ext = path.extname(file).toLowerCase()
      const buffer = fs.readFileSync(filePath)
      const timestamp = Date.now()

      try {
        const media = await payload.create({
          collection: 'media',
          data: { alt: property.title + ' - ' + file },
          file: {
            data: buffer,
            mimetype: MIME_TYPES[ext] || 'image/jpeg',
            name: slug + '-' + timestamp + '-' + file,
            size: buffer.length,
          },
        })
        mediaIds.push(media.id)
        console.log('  Uploaded ' + file + ' (id ' + media.id + ')')
      } catch (err) {
        console.log('  Failed ' + file + ': ' + err.message)
      }
    }

    if (mediaIds.length > 0) {
      await payload.update({
        collection: 'properties',
        id: property.id,
        data: { images: mediaIds },
      })
      console.log('  Attached ' + mediaIds.length + ' image(s)\n')
    }
  }

  console.log('Done.')
  process.exit(0)
}

run().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
