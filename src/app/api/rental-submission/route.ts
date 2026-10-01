import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const payload = await getPayload({ config })

    const ownerName = formData.get('ownerName') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const title = formData.get('title') as string
    const location = formData.get('location') as string
    const type = formData.get('type') as string
    const configuration = formData.get('configuration') as string
    const area = formData.get('area') as string
    const monthlyRent = formData.get('monthlyRent') as string
    const deposit = formData.get('deposit') as string
    const description = formData.get('description') as string

    if (!ownerName || !phone || !email || !title || !location || !monthlyRent) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Upload photos to Media
    const photoIds: number[] = []
    const photoFiles = formData.getAll('photos') as File[]

    for (const file of photoFiles) {
      if (!file || typeof file === 'string') continue
      if (file.size === 0) continue
      if (!file.type.startsWith('image/')) continue

      const buffer = Buffer.from(await file.arrayBuffer())

      const media = await payload.create({
        collection: 'media',
        data: { alt: title + ' - ' + file.name },
        file: {
          data: buffer,
          mimetype: file.type,
          name: title.toLowerCase().replace(/[^\w]+/g, '-') + '-' + Date.now() + '-' + file.name,
          size: buffer.length,
        },
      })
      photoIds.push(Number(media.id))
    }

    await payload.create({
      collection: 'rental-submissions',
      data: {
        title,
        ownerName,
        phone,
        email,
        location: location as any,
        type: type as any,
        configuration: configuration || undefined,
        area: area || undefined,
        monthlyRent,
        deposit: deposit || undefined,
        description: description || undefined,
        photos: photoIds.length > 0 ? photoIds : undefined,
        status: 'pending',
      },
    })

    try {
      await resend.emails.send({
        from: 'inquiries@nirvanbharat.com',
        to: 'info.nirvanbharat@gmail.com',
        subject: 'New rental submission: ' + title,
        text: [
          'New rental submission received.',
          '',
          'Owner: ' + ownerName,
          'Phone: ' + phone,
          'Email: ' + email,
          '',
          'Property: ' + title,
          'Location: ' + location,
          'Type: ' + type,
          'Configuration: ' + (configuration || '-'),
          'Area: ' + (area || '-'),
          'Monthly Rent: ' + monthlyRent,
          'Deposit: ' + (deposit || '-'),
          '',
          'Description:',
          description || '(none)',
          '',
          'Photos attached: ' + photoIds.length,
          '',
          'Review at: https://nirvanbharat.com/admin/collections/rental-submissions',
        ].join('\n'),
      })
    } catch (err) {
      console.error('Email failed:', err)
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Submission error:', err)
    return NextResponse.json(
      { error: err.message || 'Submission failed' },
      { status: 500 }
    )
  }
}
