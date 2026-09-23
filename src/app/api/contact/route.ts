import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    const { name, email, phone, message } = await req.json()

    if (!name || !email || !message) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        )
    }

    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'info.nirvanbharat@gmail.com',        // â† your email
            replyTo: email,
            subject: `Contact form: ${name}`,
            text: `
Name:  ${name}
Email: ${email}
Phone: ${phone || '(not provided)'}

${message}
      `.trim(),
        })
    } catch (err) {
        console.error('Resend error:', err)
        return NextResponse.json({ error: 'Email failed' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
}
