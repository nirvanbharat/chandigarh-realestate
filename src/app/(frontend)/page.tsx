import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { PropertyCard } from '@/components/PropertyCard'

const LOCATIONS = [
    { slug: 'chandigarh', label: 'Chandigarh' },
    { slug: 'mohali', label: 'Mohali' },
    { slug: 'panchkula', label: 'Panchkula' },
    { slug: 'zirakpur', label: 'Zirakpur' },
    { slug: 'new-chandigarh', label: 'New Chandigarh' },
]

export default async function HomePage() {
    const payload = await getPayload({ config })

    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const hero = settings.heroImage as Media | undefined

    const { docs: featured } = await payload.find({
        collection: 'properties',
        where: { featured: { equals: true }, status: { equals: 'available' } },
        limit: 6,
        depth: 2,
        sort: '-createdAt',
    })

    return (
        <main>
        {/* Hero */ }
        < section className = "relative h-[80vh] min-h-[600px] bg-ink" >
        { hero?.url && (
                <Image
            src={ hero.url }
    alt = { hero.alt || 'Featured property' }
    fill
    priority
    sizes = "100vw"
    className = "object-cover opacity-90"
        />
        )
}
<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    <div className="absolute inset-0 flex items-end" >
        <div className="mx-auto max-w-site w-full px-6 md:px-12 pb-20" >
            <p className="text-[11px] tracking-label uppercase text-paper/70" >
                Chandigarh · Mohali · Panchkula · Zirakpur
                    </p>
                    < h1 className = "mt-6 font-serif text-5xl md:text-7xl font-light text-paper max-w-3xl leading-[1.05]" >
                    { settings.heroHeadline }
                        </h1>
                        < p className = "mt-6 max-w-xl text-paper/80 text-sm leading-relaxed" >
                        { settings.heroSubline }
                            </p>
                            </div>
                            </div>
                            </section>

{/* Featured */ }
{
    featured.length > 0 && (
        <section className="mx-auto max-w-site px-6 md:px-12 py-section" >
            <header className="mb-16 flex items-end justify-between border-b border-hairline pb-8" >
                <div>
                <p className="text-[11px] tracking-label uppercase text-muted" >
                    Selected
                    </p>
                    < h2 className = "mt-4 font-serif text-4xl md:text-5xl font-light" >
                        Featured Properties
                            </h2>
                            </div>
                            < Link
    href = "/properties"
    className = "hidden md:inline text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors"
        >
        View all
            </Link>
            </header>

            < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4" >
            {
                featured.map((property) => (
                    <PropertyCard key= { property.id } property = { property } />
            ))
            }
                </div>
                </section>
      )
}

{/* Locations */ }
<section className="border-t border-hairline" >
    <div className="mx-auto max-w-site px-6 md:px-12 py-section" >
        <header className="mb-16" >
            <p className="text-[11px] tracking-label uppercase text-muted" >
                Explore
                </p>
                < h2 className = "mt-4 font-serif text-4xl md:text-5xl font-light" >
                    By Location
                        </h2>
                        </header>

                        < div className = "grid grid-cols-2 md:grid-cols-5 border-t border-hairline" >
                        {
                            LOCATIONS.map((loc, i) => (
                                <Link
                key= { loc.slug }
                href = {`/locations/${loc.slug}`}
className = {`group py-10 border-b border-hairline md:border-b-0 md:border-r ${i === LOCATIONS.length - 1 ? 'md:border-r-0' : ''
    } md:px-6 flex flex-col justify-between min-h-[180px]`}
              >
    <span className="text-[11px] tracking-label uppercase text-muted" >
        0{ i + 1 }
</span>
    < span className = "font-serif text-2xl font-light group-hover:text-accent transition-colors" >
    { loc.label }
        </span>
        </Link>
            ))}
</div>
    </div>
    </section>

{/* About */ }
<section className="border-t border-hairline" >
    <div className="mx-auto max-w-site px-6 md:px-12 py-section grid grid-cols-1 md:grid-cols-2 gap-16" >
        <div>
        <p className="text-[11px] tracking-label uppercase text-muted" >
            About
            </p>
            < h2 className = "mt-4 font-serif text-4xl md:text-5xl font-light leading-tight" >
            { settings.aboutHeading }
                </h2>
                </div>
                < div className = "md:pt-16" >
                    <p className="text-ink/80 leading-relaxed max-w-prose" >
                    {
                        settings.aboutBody ||
                            'We represent a small, considered catalogue of properties across the Chandigarh Tricity. Every listing is personally vetted, and every conversation is confidential.'
                    }
                        </p>
                        < Link
href = "/contact"
className = "inline-block mt-10 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors"
    >
    Get in touch
    </Link>
    </div>
    </div>
    </section>
    </main>
  )
}