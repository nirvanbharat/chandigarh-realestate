'use client'

import { useState } from 'react'

export function SellForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setState('sending')
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
          source: 'sell-form',
        }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) throw new Error('Failed')
      setState('sent')
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="border border-hairline p-10 bg-white">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Thank you
        </p>
        <p className="mt-4 font-serif text-2xl font-light">
          {"We'll be in touch within 24 hours."}
        </p>
      </div>
    )
  }

  const fieldClass =
    'w-full border-b border-hairline bg-transparent py-3 text-sm focus:border-ink outline-none transition-colors'

  return (
    <form action={handleSubmit} className="space-y-6">
      <label className="block">
        <span className="text-[11px] tracking-label uppercase text-muted">
          Name *
        </span>
        <input name="name" required className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-[11px] tracking-label uppercase text-muted">
          Email *
        </span>
        <input name="email" type="email" required className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-[11px] tracking-label uppercase text-muted">
          Phone *
        </span>
        <input name="phone" type="tel" required className={fieldClass} />
      </label>
      <label className="block">
        <span className="text-[11px] tracking-label uppercase text-muted">
          Property Details *
        </span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Location, size, type — anything helpful"
          className={fieldClass}
        />
      </label>

      {error && <p className="text-xs text-accent">{error}</p>}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full py-4 bg-ink text-paper text-[11px] tracking-label uppercase hover:bg-accent transition-colors disabled:opacity-50"
      >
        {state === 'sending' ? 'Sending…' : 'Submit'}
      </button>
    </form>
  )
}


