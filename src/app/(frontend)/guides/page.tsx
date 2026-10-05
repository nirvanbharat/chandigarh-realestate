export const revalidate = 60

import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import type { Media } from '@/payload-types'

export const metadata = {
  title: 'Neighborhood Guides | Nirvan Bharat',
  description:
    'In-depth guides to the neighborhoods of the Chandigarh Tricity — market trends, infrastructure, and what to know before you buy.',
}

export default async function GuidesPage() {
  const payload = await getPayload({ config })

  const { docs: guides } = await payload.find({
    collection: 'guides',
    sort: '-publishedAt',
    limit: 100,
    depth: 2,
  })

  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Editorial
        </p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          Neighborhood Guides
        </h1>
        <p className="mt-6 max-w-prose text-ink/70 leading-relaxed">
          Written guides to the micro-markets of the Tricity — what's moving,
          what to watch, and where the value is.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-muted">No guides published yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {guides.map((guide) => {
            const hero = guide.heroImage as Media | undefined
            return (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="group block"
              >
                {hero?.url && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-hairline mb-6">
                    <Image
                      unoptimized
                      src={hero.url}
                      alt={hero.alt || guide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                )}
                <p className="text-[11px] tracking-label uppercase text-muted">
                  {guide.location}
                </p>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl font-light leading-tight group-hover:text-accent transition-colors">
                  {guide.title}
                </h2>
                {guide.excerpt && (
                  <p className="mt-4 text-ink/70 leading-relaxed max-w-prose">
                    {guide.excerpt}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
