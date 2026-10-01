import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

async function run() {
  console.log('Initializing Payload...\n')
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'properties', limit: 500 })
  console.log('Found ' + docs.length + ' properties\n')
  let updated = 0
  for (const prop of docs) {
    if (prop.listingType && prop.listingType !== 'sale') continue
    try {
      await payload.update({
        collection: 'properties',
        id: prop.id,
        data: { listingType: 'sale' },
      })
      updated++
      console.log('  ✓ ' + prop.title)
    } catch (err) {
      console.log('  ✗ ' + prop.title + ': ' + err.message)
    }
  }
  console.log('\nUpdated: ' + updated)
  process.exit(0)
}

run().catch((err) => { console.error('Fatal:', err); process.exit(1) })
