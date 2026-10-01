import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  try {
    const { propertyId } = await req.json()

    if (!propertyId) {
      return NextResponse.json({ error: 'Missing propertyId' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    const property = await payload.findByID({
      collection: 'properties',
      id: propertyId,
      depth: 0,
    })

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    // Choose the right status based on listing type
    const newStatus = property.listingType === 'rent' ? 'rented' : 'sold'

    await payload.update({
      collection: 'properties',
      id: propertyId,
      data: { status: newStatus },
    })

    return NextResponse.json({ ok: true, status: newStatus })
  } catch (err: any) {
    console.error('Unlist error:', err)
    return NextResponse.json(
      { error: err.message || 'Unlist failed' },
      { status: 500 }
    )
  }
}
