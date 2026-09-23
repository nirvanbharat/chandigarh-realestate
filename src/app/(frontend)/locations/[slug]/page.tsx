import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PropertyCard } from '@/components/PropertyCard'
import type { Media } from '@/payload-types'
import type { Metadata } from 'next'

const LOCATION_DATA: Record<string, { label: string; blurb: string }> = {
    chandigarh: {
        label: 'Chandigarh',
        blurb:
            'The original planned city. Sectors 5, 9, 17 and 35 hold the most prestigious addresses in the Tricity. Supply is constrained and prices reflect it â€” this is where long-term value lives.',
    },
    mohali: {
        label: 'Mohali',
        blurb:
            'The growth engine of the Tricity. Aerocity, Airport Road, and IT City have absorbed most of the region\'s new premium supply. Modern towers, gated communities, and direct airport access.',
    },
    panchkula: {
        label: 'Panchkula',
        blurb:
            'Quieter, greener, and lower-density than Chandigarh. Preferred by families who want space without leaving the Tricity. Sectors 2, 5, 8 and 20 are the established premium pockets.',
    },
    zirakpur: {
        label: 'Zirakpur',
        blurb:
            'The transitional market between Chandigarh and Mohali. Strong mid-income demand, better value per square foot, and quick access to both cities. Good for end-users and first investors.',
    },
    'new-chandigarh': {
        label: 'New Chandigarh',
        blurb:
            'The planned extension north of Chandigarh. Larger plots, lower density, and long-horizon appreciation. Best for buyers willing to wait 3â€“5 years for infrastructure to mature.',
    },
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const data = LOCATION_DATA[slug]
    if (!data) return {}
    return {
        title: `${data.label} Properties | Nirvan Bharat`,
        description: data.blurb.slice(0, 155),
    }
}

export default async function LocationPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const data = LOCATION_DATA[slug]
    if (!data) notFound()

    const payload = await getPayload({ config })

    const { docs: properties } = await payload.find({
        collection: 'properties',
        where: {
            and: [
                { location: { equals: slug } },
                { status: { equals: 'available' } },
            ],
        },
        sort: '-createdAt',
        limit: 100,
        depth: 2,
    })

    // Use first available property image as hero
    const heroImage = properties[0]?.images?.[0] as Media | undefined

    return (
        <main>
        {/* Hero */ }
        < section className = "relative h-[60vh] min-h-[440px] bg-ink" >
        { heroImage?.url && (
                <Image
            src={ heroImage.url }
    alt = { heroImage.alt || data.label }
    fill
    priority
    sizes = "100vw"
    className = "object-cover opacity-80"
        />
        )
}
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    <div className="absolute inset-0 flex items-end" >
        <div className="mx-auto max-w-site w-full px-6 md:px-12 pb-16" >
            <p className="text-[11px] tracking-label uppercase text-paper/70" >
                Location
                </p>
                < h1 className = "mt-4 font-serif text-5xl md:text-7xl font-light text-paper leading-[1.05]" >
                { data.label }
                    </h1>
                    </div>
                    </div>
                    </section>

{/* Blurb */ }
<section className="mx-auto max-w-site px-6 md:px-12 py-20" >
    <p className="max-w-prose text-ink/80 leading-relaxed text-lg" >
    { data.blurb }
        </p>
        </section>

{/* Properties */ }
<section className="mx-auto max-w-site px-6 md:px-12 pb-section" >
    <header className="mb-12 flex items-end justify-between border-b border-hairline pb-8" >
        <div>
        <p className="text-[11px] tracking-label uppercase text-muted" >
            Catalogue
            </p>
            < h2 className = "mt-4 font-serif text-3xl md:text-4xl font-light" >
                Properties in { data.label }
                </h2>
                </div>
                < p className = "text-[11px] tracking-label uppercase text-muted" >
                { properties.length }{ ' ' }
{ properties.length === 1 ? 'property' : 'properties' }
</p>
    </header>

{
    properties.length === 0 ? (
        <p className= "text-muted" >
        No properties currently listed in { data.label }.Contact us for
            off - market opportunities.
          </p>
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
</section>
    </main>
  )
}
