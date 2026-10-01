import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(req: Request) {
  try {
    const { submissionId } = await req.json()

    if (!submissionId) {
      return NextResponse.json({ error: 'Missing submissionId' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    // Load the submission
    const submission = await payload.findByID({
      collection: 'rental-submissions',
      id: submissionId,
      depth: 1,
    })

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    if (submission.status === 'approved') {
      return NextResponse.json(
        { error: 'This submission has already been converted' },
        { status: 400 }
      )
    }

    // Extract photo IDs
    const photoIds = (submission.photos || [])
      .map((p: any) => (typeof p === 'object' && p !== null ? p.id : p))
      .filter(Boolean)

    // Create the Property
    const property = await payload.create({
      collection: 'properties',
      draft: false,
      data: {
        title: submission.title,
        location: submission.location,
        type: submission.type,
        listingType: 'rent',
        status: 'available',
        featured: false,
        unitTypes: submission.configuration
          ? [{ configuration: submission.configuration, superArea: submission.area || '' }]
          : [],
        images: photoIds.length > 0 ? photoIds : undefined,
      },
    })

    // Mark the submission as approved
    await payload.update({
      collection: 'rental-submissions',
      id: submissionId,
      data: { status: 'approved' },
    })

    return NextResponse.json({
      ok: true,
      propertyId: property.id,
    })
  } catch (err: any) {
    console.error('Convert error:', err)
    return NextResponse.json(
      { error: err.message || 'Conversion failed' },
      { status: 500 }
    )
  }
}
