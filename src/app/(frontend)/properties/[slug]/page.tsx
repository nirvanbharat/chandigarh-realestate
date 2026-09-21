import { getPayload } from 'payload'
import config from '@/payload.config'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Media, Property } from '@/payload-types'
import { InquiryForm } from '@/components/InquiryForm'

export default async function PropertyDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
        collection: 'properties',
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
    })

    const property = docs[0] as Property | undefined
    if (!property) notFound()

    const images = (property.images || []) as Media[]

    return (
        <main className= "mx-auto max-w-site px-6 md:px-12 py-16" >
        {/* Breadcrumb */ }
        < p className = "text-[11px] tracking-label uppercase text-muted mb-10" >
            Properties / { property.location }
            </p>

    {/* Image Gallery */ }
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-16" >
    {
        images[0]?.url && (
            <div className="md:col-span-3 relative aspect-[16/9] overflow-hidden bg-hairline">
                <Image
              src={ images[0].url }
    alt = { images[0].alt || property.title }
    fill
    sizes = "100vw"
    className = "object-cover"
    priority
        />
        </div>
        )
}
{
    images.slice(1, 4).map((img, i) => (
        <div key= { i } className = "relative aspect-[4/3] overflow-hidden bg-hairline" >
        {
            img.url && (
                <Image
                src={ img.url }
                alt = { img.alt || property.title }
                fill
                sizes = "33vw"
                className = "object-cover"
        />
            )
}
</div>
        ))}
</div>

{/* Two-column layout: details left, inquiry right */ }
<div className="grid grid-cols-1 lg:grid-cols-3 gap-16" >
{/* Left: property info */ }
    < div className = "lg:col-span-2" >
        <p className="text-[11px] tracking-label uppercase text-muted" >
        { property.location } · { property.type }
</p>

    < h1 className = "mt-4 font-serif text-4xl md:text-5xl font-light leading-tight text-ink" >
    { property.title }
        </h1>

{/* Key facts */ }
<dl className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-6 border-t border-hairline pt-10" >
    <div>
    <dt className="text-[11px] tracking-label uppercase text-muted" >
        Configuration
        </dt>
        < dd className = "mt-2 font-serif text-xl" > { property.configuration } </dd>
            </div>
            < div >
            <dt className="text-[11px] tracking-label uppercase text-muted" >
                Area
                </dt>
                < dd className = "mt-2 font-serif text-xl" >
                { property.area?.value?.toLocaleString('en-IN') }{ ' ' }
{ property.area?.unit === 'sqyd' ? 'sq yd' : 'sq ft' }
</dd>
    </div>
    < div >
    <dt className="text-[11px] tracking-label uppercase text-muted" >
        Status
        </dt>
        < dd className = "mt-2 font-serif text-xl capitalize" >
        { property.status }
            </dd>
            </div>
            </dl>

{/* Description */ }
{
    property.description && (
        <div className="mt-16 border-t border-hairline pt-10" >
            <p className="text-[11px] tracking-label uppercase text-muted mb-6" >
                Description
                </p>
                < div className = "max-w-prose text-ink/80 leading-relaxed" >
                {/* Rich text — we'll render this properly later */ }
                    < p > Description rendering coming next.</p>
                        </div>
                        </div>
          )
}

{/* Amenities */ }
{
    property.amenities && property.amenities.length > 0 && (
        <div className="mt-16 border-t border-hairline pt-10" >
            <p className="text-[11px] tracking-label uppercase text-muted mb-6" >
                Amenities
                </p>
                < ul className = "grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm text-ink/80" >
                {
                    property.amenities.map((a, i) => (
                        <li key= { i } >— { a.amenity } </li>
                    ))
                }
                    </ul>
                    </div>
          )
}
</div>

{/* Right: sticky inquiry panel */ }
<aside className="lg:col-span-1" >
    <div className="lg:sticky lg:top-12 border border-hairline p-8 bg-white" >
        <p className="text-[11px] tracking-label uppercase text-muted" >
            Price
            </p>
            < p className = "mt-3 font-serif text-3xl font-light" >
                On Request
                    </p>

    < InquiryForm
propertyId = { property.id }
propertyTitle = { property.title }
    />

        < p className = "mt-6 text-xs text-muted leading-relaxed" >
            Our team will respond within 24 hours.All inquiries are confidential.
            </p>
                </div>
                </aside>
                </div>
                </main>
  )
}