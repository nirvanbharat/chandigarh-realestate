'use client'

import { useState } from 'react'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyMap } from '@/components/PropertyMap'
import type { Property } from '@/payload-types'

export function PropertyViewToggle({
  properties,
  mapboxToken,
}: {
  properties: Property[]
  mapboxToken: string
}) {
  const [view, setView] = useState<'grid' | 'map'>('grid')

  return (
    <>
      <div className="flex justify-end mb-8">
        <div className="inline-flex border border-hairline">
          <button
            type="button"
            onClick={() => setView('grid')}
            className={`px-6 py-3 text-[10px] tracking-label uppercase transition-colors duration-300 ${
              view === 'grid'
                ? 'bg-ink text-paper'
                : 'bg-transparent text-ink hover:text-accent'
            }`}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => setView('map')}
            className={`px-6 py-3 text-[10px] tracking-label uppercase transition-colors duration-300 border-l border-hairline ${
              view === 'map'
                ? 'bg-ink text-paper'
                : 'bg-transparent text-ink hover:text-accent'
            }`}
          >
            Map
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <PropertyMap properties={properties} mapboxToken={mapboxToken} />
      )}
    </>
  )
}
