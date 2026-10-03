import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CSV_PATH = path.join(__dirname, '..', 'coordinates.csv')

function parseCsvLine(line) {
  const trimmed = line.trim()
  if (!trimmed) return null

  const firstComma = trimmed.indexOf(',')
  if (firstComma === -1) return null

  const title = trimmed.slice(0, firstComma).trim()
  let rest = trimmed.slice(firstComma + 1).trim()

  if (rest.startsWith('"') && rest.endsWith('"')) {
    rest = rest.slice(1, -1)
  }

  const parts = rest.split(',').map((s) => s.trim())
  if (parts.length !== 2) return null

  const lat = parseFloat(parts[0])
  const lng = parseFloat(parts[1])

  if (isNaN(lat) || isNaN(lng)) return null

  return { title, lat, lng }
}

async function run() {
  const dryRun = !process.argv.includes('--live')

  console.log('Mode: ' + (dryRun ? 'DRY RUN' : 'LIVE'))
  console.log('Reading: ' + CSV_PATH)
  console.log('')

  if (!fs.existsSync(CSV_PATH)) {
    console.error('CSV not found')
    process.exit(1)
  }

  const raw = fs.readFileSync(CSV_PATH, 'utf-8')
  const lines = raw.split('\n').filter((l) => l.trim())
  const dataLines = lines.slice(1)

  console.log('Found ' + dataLines.length + ' data row(s)\n')

  const payload = await getPayload({ config })

  let updated = 0
  let notFound = 0
  let invalid = 0

  for (const line of dataLines) {
    const parsed = parseCsvLine(line)
    if (!parsed) {
      console.log('✗ Skipped invalid line: ' + line.slice(0, 60))
      invalid++
      continue
    }

    const { title, lat, lng } = parsed

    const { docs } = await payload.find({
      collection: 'properties',
      where: { title: { equals: title } },
      limit: 5,
    })

    if (docs.length === 0) {
      console.log('✗ Not found: "' + title + '"')
      notFound++
      continue
    }

    for (const prop of docs) {
      if (!dryRun) {
        await payload.update({
          collection: 'properties',
          id: prop.id,
          data: {
            coordinates: [lng, lat],
          },
        })
      }
      console.log('✓ ' + title + ' → [' + lng.toFixed(5) + ', ' + lat.toFixed(5) + ']')
      updated++
    }
  }

  console.log('')
  console.log('─────────────────────')
  console.log('Updated: ' + updated)
  console.log('Not found: ' + notFound)
  console.log('Invalid: ' + invalid)

  if (dryRun) {
    console.log('')
    console.log('Run with --live to save.')
  }
}

run().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
