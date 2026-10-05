export const revalidate = 60

import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@/components/RichText'
import { PropertyCard } from '@/components/PropertyCard'
import type { Media, Where } from 'payload'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'guides',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })
  const guide = docs[0]
  if (!guide) return {}

  const hero = guide.heroImage as Media | undefined

  return {
    title: `${guide.title} | Nirvan Bharat`,
    description: guide.excerpt || undefined,
    openGraph: hero?.url
      ? { images: [{ url: hero.url }] }
      : undefined,
  }
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'guides',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })

  const guide = docs[0]
  if (!guide) notFound()

  const hero = guide.heroImage as Media | undefined

  // Related properties in the same location
  const where: Where = {
    and: [
      { status: { equals: 'available' } },
      { location: { equals: guide.location } },
    ],
  }

  const { docs: properties } = await payload.find({
    collection: 'properties',
    where,
    sort: ['title'],
    limit: 6,
    depth: 2,
  })

  return (
    <main>
      <section className="relative h-[60vh] min-h-[440px] bg-ink">
        {hero?.url && (
          <Image
            unoptimized
            src={hero.url}
            alt={hero.alt || guide.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-site w-full px-6 md:px-12 pb-16">
            <p className="text-[11px] tracking-label uppercase text-paper/70">
              {guide.location} · Guide
            </p>
            <h1 className="mt-4 font-serif text-4xl md:text-6xl font-light text-paper leading-[1.05] max-w-4xl">
              {guide.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-site px-6 md:px-12 py-20">
        <div className="max-w-prose mx-auto">
          <RichText data={guide.content} />
        </div>
      </section>

      {properties.length > 0 && (
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-site px-6 md:px-12 py-section">
            <header className="mb-16 flex items-end justify-between border-b border-hairline pb-8">
              <div>
                <p className="text-[11px] tracking-label uppercase text-muted">
                  Available now
                </p>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl font-light">
                  Properties in {guide.location}
                </h2>
              </div>
              <Link
                href={`/locations/${guide.location}`}
                className="hidden md:inline text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors"
              >
                View all
              </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
