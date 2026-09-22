import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import type { Where } from 'payload'

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const payload = await getPayload({ config })

  const and: Where[] = [{ status: { equals: 'available' } }]

  if (typeof params.location === 'string' && params.location) {
    and.push({ location: { equals: params.location } })
  }
  if (typeof params.type === 'string' && params.type) {
    and.push({ type: { equals: params.type } })
  }
  if (typeof params.q === 'string' && params.q) {
    and.push({ title: { like: params.q } })
  }

  const { docs: properties } = await payload.find({
    collection: 'properties',
    where: { and },
    sort: '-createdAt',
    limit: 100,
    depth: 2,
  })

  const count = properties.length

  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Catalogue
        </p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          Properties
        </h1>
      </header>

      <Suspense fallback={<div className="h-32" />}>
        <PropertyFilters />
      </Suspense>

      <p className="mt-8 mb-12 text-[11px] tracking-label uppercase text-muted">
        {count} {count === 1 ? 'property' : 'properties'}
      </p>

      {count === 0 ? (
        <p className="text-muted">No properties match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </main>
  )
}
