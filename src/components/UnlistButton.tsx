'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export function UnlistButton() {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [propertyId, setPropertyId] = useState<string | null>(null)

  useEffect(() => {
    // URL is like /admin/collections/properties/[id]
    const match = pathname?.match(/\/properties\/(\d+)/)
    if (match && match[1]) setPropertyId(match[1])
  }, [pathname])

  if (!propertyId) return null

  async function handleUnlist() {
    if (!confirm('Unlist this property? It will disappear from the site.')) return

    setState('loading')
    setError('')

    try {
      const res = await fetch('/api/unlist-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Unlist failed')
      }

      setState('done')
      setTimeout(() => {
        router.push('/admin/collections/properties')
      }, 1200)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setState('error')
    }
  }

  if (state === 'done') {
    return (
      <div style={{ padding: '12px', background: '#f0f9f0', border: '1px solid #c3e6c3', borderRadius: '4px', marginBottom: '16px' }}>
        ✓ Unlisted. Redirecting…
      </div>
    )
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <button
        type="button"
        onClick={handleUnlist}
        disabled={state === 'loading'}
        style={{
          padding: '10px 20px',
          background: state === 'loading' ? '#888' : '#b00020',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: state === 'loading' ? 'wait' : 'pointer',
          fontSize: '13px',
          fontWeight: 500,
        }}
      >
        {state === 'loading' ? 'Unlisting…' : 'Unlist from Site'}
      </button>
      {error && (
        <p style={{ color: '#b00020', fontSize: '12px', marginTop: '8px' }}>
          {error}
        </p>
      )}
    </div>
  )
}
