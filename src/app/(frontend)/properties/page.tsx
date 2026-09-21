import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'

export default async function PropertiesPage() {
    const payload = await getPayload({ config })

    const { docs: properties } = await payload.find({
        collection: 'properties',
        where: { status: { equals: 'available' } },
        sort: '-createdAt',
        limit: 50,
    })

    return (
        <main className= "mx-auto max-w-site px-6 md:px-12 py-20" >
        <header className="mb-16 border-b border-hairline pb-10" >
            <p className="text-[11px] tracking-label uppercase text-muted" >
                Catalogue
                </p>
                < h1 className = "mt-4 font-serif text-5xl md:text-6xl font-light text-ink" >
                    Properties
                    </h1>
        </header>
                    < PropertyFilters />

    {
        properties.length === 0 ? (
            <p className= "text-muted" > No properties yet.</p>
      ) : (
            <div className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4" >
            {
                properties.map((property) => (
                    <PropertyCard key= { property.id } property = { property } />
          ))
            }
            </div>
      )
    }
    </main>
  )
}