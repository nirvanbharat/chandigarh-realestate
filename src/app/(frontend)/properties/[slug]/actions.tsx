'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitInquiry(formData: FormData) {
    const payload = await getPayload({ config })

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = (formData.get('message') as string) || ''
    const propertyId = formData.get('propertyId') as string
    const propertyTitle = formData.get('propertyTitle') as string

    if (!name || !email || !phone || !propertyId) {
        return { ok: false, error: 'Please fill in all required fields.' }
    }

    // 1. Store in Payload
    await payload.create({
        collection: 'inquiries',
        data: {
            name,
            email,
            phone,
            message,
            property: Number(propertyId),
        },
    })

    // 2. Send email notification
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',   // must be verified in Resend
            to: 'info.nirvanbharat@gmail.com',            // your email
            replyTo: email,
            subject: `New inquiry: ${propertyTitle}`,
            text: `
New inquiry for ${propertyTitle}

Name:  ${name}
Email: ${email}
Phone: ${phone}

Message:
${message || '(none)'}
      `.trim(),
        })
    } catch (err) {
        console.error('Resend failed:', err)
    }

    return { ok: true }
}