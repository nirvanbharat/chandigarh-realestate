'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSaved } from '@/hooks/useSaved'
import { PropertyCard } from '@/components/PropertyCard'
import type { Property } from '@/payload-types'

export function SavedList() {
  const { saved, mounted } = useSaved()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!mounted) return
    if (saved.length === 0) {
      setProperties([])
      setLoading(false)
      return
    }

    setLoading(true)

    fetch('/api/properties?limit=500&depth=2')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || !data.docs) {
          setProperties([])
          return
        }
        const allProps = data.docs as Property[]
        const ordered = saved
          .map((id) => allProps.find((p) => String(p.id) === String(id)))
          .filter(Boolean) as Property[]
        setProperties(ordered)
      })
      .catch(() => setProperties([]))
      .finally(() => setLoading(false))
  }, [saved, mounted])

  if (!mounted || loading) {
    return <p className="text-muted text-sm">Loading…</p>
  }

  if (saved.length === 0) {
    return (
      <div className="max-w-prose">
        <p className="text-ink/80 leading-relaxed text-lg">
          You haven&apos;t saved any properties yet. Browse our listings and
          click the heart icon to add them here.
        </p>
        <Link
          href="/properties/buy"
          className="inline-block mt-10 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors"
        >
          Browse listings
        </Link>
      </div>
    )
  }

  return (
    <>
      <p className="mb-12 text-[11px] tracking-label uppercase text-muted">
        {properties.length} {properties.length === 1 ? 'property' : 'properties'}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  )
}
