'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function ConvertToPropertyButton() {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<'idle' | 'converting' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [submissionId, setSubmissionId] = useState<string | null>(null)

  useEffect(() => {
    // URL is like /admin/collections/rental-submissions/[id]
    const match = pathname?.match(/\/rental-submissions\/(\d+)/)
    if (match && match[1]) setSubmissionId(match[1])
  }, [pathname])

  if (!submissionId) return null

  async function handleConvert() {
    if (!confirm('Convert this submission into a live rental listing?')) return

    setState('converting')
    setError('')

    try {
      const res = await fetch('/api/convert-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Conversion failed')
      }

      setState('done')
      setTimeout(() => {
        router.push('/admin/collections/properties')
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div style={{ padding: '12px', background: '#f0f9f0', border: '1px solid #c3e6c3', borderRadius: '4px', marginBottom: '16px' }}>
        ✓ Converted to a live listing. Redirecting…
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <button
        type="button"
        onClick={handleConvert}
        disabled={state === 'converting'}
        style={{
          padding: '10px 20px',
          background: state === 'converting' ? '#888' : '#0f0f0f',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: state === 'converting' ? 'wait' : 'pointer',
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        {state === 'converting' ? 'Converting…' : 'Convert to Live Listing'}
      </button>
      {error && (
        <p style={{ color: '#b00020', fontSize: '12px', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </div>
  )
}
