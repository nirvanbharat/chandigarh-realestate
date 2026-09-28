import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGES_DIR = path.join(__dirname, 'images')
const OUTPUT_DIR = path.join(__dirname, 'images-resized')
const MAX_WIDTH = 1920
const QUALITY = 80

async function run() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const folders = fs.readdirSync(IMAGES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)

  let totalIn = 0
  let totalOut = 0
  let processed = 0

  for (const folder of folders) {
    const srcFolder = path.join(IMAGES_DIR, folder)
    const dstFolder = path.join(OUTPUT_DIR, folder)
    if (!fs.existsSync(dstFolder)) fs.mkdirSync(dstFolder, { recursive: true })

    const files = fs.readdirSync(srcFolder)
    for (const file of files) {
      const src = path.join(srcFolder, file)
      const stat = fs.statSync(src)
      if (!stat.isFile()) continue

      const ext = path.extname(file).toLowerCase()
      if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) continue

      const baseName = path.basename(file, ext) + '.jpg'
      const dst = path.join(dstFolder, baseName)

      try {
        await sharp(src)
          .rotate()
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .jpeg({ quality: QUALITY, mozjpeg: true })
          .toFile(dst)

        const outStat = fs.statSync(dst)
        totalIn += stat.size
        totalOut += outStat.size
        processed++
        console.log(folder + '/' + file + ' -> ' + Math.round(stat.size/1024) + 'KB -> ' + Math.round(outStat.size/1024) + 'KB')
      } catch (err) {
        console.log('FAILED ' + folder + '/' + file + ': ' + err.message)
      }
    }
  }

  console.log('')
  console.log('Processed: ' + processed + ' file(s)')
  console.log('Before: ' + (totalIn/1024/1024).toFixed(1) + ' MB')
  console.log('After:  ' + (totalOut/1024/1024).toFixed(1) + ' MB')
  console.log('Saved:  ' + ((1 - totalOut/totalIn) * 100).toFixed(0) + '%')
  console.log('')
  console.log('Output: ' + OUTPUT_DIR)
}

run().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})