import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

// Nominatim requires a descriptive User-Agent
const USER_AGENT = 'NirvanBharat-RealEstate/1.0 (info.nirvanbharat@gmail.com)'

// Map Payload location values to search terms
const LOCATION_QUERY = {
  chandigarh: 'Chandigarh, India',
  mohali: 'Mohali, Punjab, India',
  panchkula: 'Panchkula, Haryana, India',
  zirakpur: 'Zirakpur, Punjab, India',
  'new-chandigarh': 'New Chandigarh, Punjab, India',
}

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT },
  })
  if (!res.ok) return null
  const data = await res.json()
  if (!data || data.length === 0) return null
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    display: data[0].display_name,
  }
}

async function run() {
  const dryRun = !process.argv.includes('--live')

  console.log('Mode: ' + (dryRun ? 'DRY RUN' : 'LIVE — will write to DB'))
  console.log('')

  const payload = await getPayload({ config })

  const { docs: properties } = await payload.find({
    collection: 'properties',
    limit: 500,
  })

  console.log('Found ' + properties.length + ' properties\n')

  let updated = 0
  let skipped = 0

  for (const prop of properties) {
    if (prop.coordinates) {
      console.log('⏭ ' + prop.title + ' (already has coordinates)')
      skipped++
      continue
    }

    const locationTerm = LOCATION_QUERY[prop.location] || prop.location

    // Prefer the property title if it contains a sector hint, otherwise use location
    const query = prop.title + ', ' + locationTerm

    console.log('→ ' + prop.title)
    console.log('  Query: ' + query)

    const result = await geocode(query)

    // If the title-based search fails, try just the location
    let finalResult = result
    if (!result) {
      console.log('  Title lookup failed, trying location only...')
      finalResult = await geocode(locationTerm)
    }

    if (!finalResult) {
      console.log('  ✗ No coordinates found\n')
      continue
    }

    console.log('  ✓ ' + finalResult.lat + ', ' + finalResult.lng)
    console.log('  Matched: ' + finalResult.display.slice(0, 80))

    if (!dryRun) {
      try {
        await payload.update({
          collection: 'properties',
          id: prop.id,
          data: {
            coordinates: [finalResult.lng, finalResult.lat],
          },
        })
        updated++
      } catch (err) {
        console.log('  ✗ Update failed: ' + err.message)
      }
    }

    console.log('')

    // Nominatim rate limit: 1 request per second
    await new Promise((r) => setTimeout(r, 1100))
  }

  console.log('─────────────────────')
  console.log('Updated: ' + updated)
  console.log('Skipped: ' + skipped)
  console.log('')
  if (dryRun) {
    console.log('Run with --live to save the coordinates.')
  }
}

run().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
