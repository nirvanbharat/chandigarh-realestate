'use client'

import { useState } from 'react'

const LOCATIONS = [
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'mohali', label: 'Mohali' },
  { value: 'panchkula', label: 'Panchkula' },
  { value: 'zirakpur', label: 'Zirakpur' },
  { value: 'new-chandigarh', label: 'New Chandigarh' },
]

const TYPES = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'plot', label: 'Plot' },
  { value: 'penthouse', label: 'Penthouse' },
]

export function RentalSubmitForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const [photoCount, setPhotoCount] = useState(0)

  async function handleSubmit(formData: FormData) {
    setState('sending')
    setError('')

    try {
      const res = await fetch('/api/rental-submission', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed')
      }

      setState('sent')
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="border border-hairline p-10 bg-white">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Submitted
        </p>
        <p className="mt-4 font-serif text-2xl font-light">
          Thank you. We&apos;ll review your submission and be in touch within 24 hours.
        </p>
      </div>
    )
  }

  const fieldClass =
    'w-full border-b border-hairline bg-transparent py-3 text-sm focus:border-ink outline-none transition-colors'
  const labelClass = 'text-[11px] tracking-label uppercase text-muted'

  return (
    <form action={handleSubmit} className="space-y-12">
      <div>
        <p className="text-[11px] tracking-label uppercase text-muted mb-6 pb-3 border-b border-hairline">
          Your Details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">
          <label className="block">
            <span className={labelClass}>Name *</span>
            <input name="ownerName" required className={fieldClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Phone *</span>
            <input name="phone" type="tel" required className={fieldClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Email *</span>
            <input name="email" type="email" required className={fieldClass} />
          </label>
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-label uppercase text-muted mb-6 pb-3 border-b border-hairline">
          Property Details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
          <label className="block md:col-span-2">
            <span className={labelClass}>Property Title *</span>
            <input
              name="title"
              required
              placeholder="e.g. 3 BHK in Sector 17, Chandigarh"
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>Location *</span>
            <select name="location" required className={fieldClass}>
              {LOCATIONS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Type *</span>
            <select name="type" required className={fieldClass}>
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Configuration</span>
            <input name="configuration" placeholder="3 BHK" className={fieldClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Area</span>
            <input name="area" placeholder="1800 sq ft" className={fieldClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Monthly Rent *</span>
            <input name="monthlyRent" required placeholder="45,000" className={fieldClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Deposit</span>
            <input name="deposit" placeholder="2 months" className={fieldClass} />
          </label>
          <label className="block md:col-span-2">
            <span className={labelClass}>Description</span>
            <textarea name="description" rows={4} className={fieldClass} />
          </label>
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-label uppercase text-muted mb-6 pb-3 border-b border-hairline">
          Photos
        </p>
        <label className="block">
          <span className={labelClass}>Upload up to 10 photos</span>
          <input
            type="file"
            name="photos"
            multiple
            accept="image/*"
            onChange={(e) => setPhotoCount(e.target.files?.length || 0)}
            className="mt-3 w-full text-sm text-ink/70 file:mr-4 file:py-3 file:px-6 file:border-0 file:bg-ink file:text-paper file:text-[11px] file:tracking-label file:uppercase hover:file:bg-accent file:transition-colors file:cursor-pointer"
          />
          {photoCount > 0 && (
            <p className="mt-3 text-xs text-muted">
              {photoCount} photo{photoCount === 1 ? '' : 's'} selected
            </p>
          )}
        </label>
      </div>

      {error && <p className="text-xs text-accent">{error}</p>}

      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full py-4 bg-ink text-paper text-[11px] tracking-label uppercase hover:bg-accent transition-colors disabled:opacity-50"
      >
        {state === 'sending' ? 'Submitting…' : 'Submit Property'}
      </button>
    </form>
  )
}
