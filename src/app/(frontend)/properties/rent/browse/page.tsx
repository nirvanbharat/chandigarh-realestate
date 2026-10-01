export const revalidate = 60

import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'
import type { Where } from 'payload'

export default async function RentBrowsePage() {
  const payload = await getPayload({ config })

  const where: Where = {
    and: [
      { status: { equals: 'available' } },
      { listingType: { equals: 'rent' } },
    ],
  }

  const { docs: properties } = await payload.find({
    collection: 'properties',
    where,
    sort: ['title'],
    limit: 100,
    depth: 2,
  })

  const count = properties.length

  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">Rent</p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          Rental Listings
        </h1>
      </header>

      <p className="mt-8 mb-12 text-[11px] tracking-label uppercase text-muted">
        {count} {count === 1 ? 'property' : 'properties'}
      </p>

      {count === 0 ? (
        <p className="text-muted">No rental listings yet. Check back soon.</p>
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
