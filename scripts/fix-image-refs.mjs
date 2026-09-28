import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function run() {
  const dryRun = !process.argv.includes('--live')

  console.log('Mode: ' + (dryRun ? 'DRY RUN' : 'LIVE FIX'))
  console.log('')
  console.log('Initializing Payload...\n')
  const payload = await getPayload({ config })

  const { docs: properties } = await payload.find({
    collection: 'properties',
    limit: 100,
    depth: 2,
  })

  console.log('Checking ' + properties.length + ' properties...\n')

  let fixed = 0
  let clean = 0

  for (const property of properties) {
    const images = property.images || []
    if (images.length === 0) continue

    // Find images whose URL contains '-2.' (broken duplicates)
    const brokenImages = images.filter((img) => {
      const url = typeof img === 'object' && img !== null ? img.url : null
      return url && /-2\.(jpg|jpeg|png|webp)$/i.test(url)
    })

    if (brokenImages.length === 0) {
      clean++
      continue
    }

    console.log('Found ' + brokenImages.length + ' broken image(s) on ' + property.slug)

    // Strategy: keep only the images that DON'T end in -2
    const goodImages = images
      .filter((img) => {
        const url = typeof img === 'object' && img !== null ? img.url : null
        return !url || !/-2\.(jpg|jpeg|png|webp)$/i.test(url)
      })
      .map((img) => (typeof img === 'object' && img !== null ? img.id : img))

    if (goodImages.length === 0) {
      console.log('  No good image to fall back to, skipping')
      continue
    }

    if (!dryRun) {
      await payload.update({
        collection: 'properties',
        id: property.id,
        data: { images: goodImages },
      })
      console.log('  Fixed: now pointing at ' + goodImages.length + ' image(s)')
    } else {
      console.log('  Would fix: keep ' + goodImages.length + ' image(s)')
    }
    fixed++
  }

  console.log('')
  console.log('Summary:')
  console.log('  Already clean: ' + clean)
  console.log('  ' + (dryRun ? 'Would fix' : 'Fixed') + ': ' + fixed)

  if (dryRun) {
    console.log('')
    console.log('Run with --live to apply the fix.')
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})