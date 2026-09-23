'use client'

import { useState } from 'react'
import { submitInquiry } from '@/app/(frontend)/properties/[slug]/actions'

export function InquiryForm({
    propertyId,
    propertyTitle,
}: {
    propertyId: number
    propertyTitle: string
}) {
    const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
    const [error, setError] = useState('')

    async function handleSubmit(formData: FormData) {
        setState('sending')
        setError('')
        const result = await submitInquiry(formData)
        if (result.ok) {
            setState('sent')
        } else {
            setError(result.error || 'Something went wrong.')
            setState('error')
        }
    }

    if (state === 'sent') {
        return (
            <div className= "border border-hairline p-8 bg-white" >
            <p className="text-[11px] tracking-label uppercase text-muted" > Thank you </p>
                < p className = "mt-4 font-serif text-2xl font-light" >
                    We'll be in touch within 24 hours.
        </p>
                        </div>
    )
    }

    return (
        <form action= { handleSubmit } className = "border border-hairline p-8 bg-white" >
            <input type="hidden" name = "propertyId" value = { propertyId } />
                <input type="hidden" name = "propertyTitle" value = { propertyTitle } />

                    <p className="text-[11px] tracking-label uppercase text-muted mb-6" >
                        Enquire
                        </p>

                        < div className = "space-y-5" >
                            <Field name="name" label = "Name" required />
                                <Field name="email" label = "Email" type = "email" required />
                                    <Field name="phone" label = "Phone" type = "tel" required />
                                        <Field name="message" label = "Message" textarea />
                                            </div>

    {
        error && (
            <p className="mt-4 text-xs text-accent" > { error } </p>
      )
    }

    <button
        type="submit"
    disabled = { state === 'sending'
}
className = "mt-8 w-full py-4 bg-ink text-paper text-[11px] tracking-label uppercase hover:bg-accent transition-colors disabled:opacity-50"
    >
{ state === 'sending' ? 'Sendingâ€¦' : 'Submit Inquiry'}
</button>
    </form>
  )
}

function Field({
    name,
    label,
    type = 'text',
    required,
    textarea,
}: {
    name: string
    label: string
    type?: string
    required?: boolean
    textarea?: boolean
}) {
    const base =
        'w-full border-b border-hairline bg-transparent py-3 text-sm focus:border-ink outline-none transition-colors'
    return (
        <label className= "block" >
        <span className="text-[11px] tracking-label uppercase text-muted" >
        { label }{ required && ' *' }
    </span>
    {
        textarea ? (
            <textarea name= { name } rows = { 3} required = { required } className = { base } />
      ) : (
            <input name= { name } type = { type } required = { required } className = { base } />
      )
    }
    </label>
  )
}

