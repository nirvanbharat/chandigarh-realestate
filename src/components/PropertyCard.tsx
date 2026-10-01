import Image from 'next/image'
import Link from 'next/link'
import type { Property, Media } from '@/payload-types'
import { SaveButton } from '@/components/SaveButton'

export function PropertyCard({ property }: { property: Property }) {
  const image = property.images?.[0] as Media | undefined
  const unitCount = property.unitTypes?.length || 0

  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-hairline">
        {image?.url && (
          <Image
            unoptimized
            src={image.url}
            alt={image.alt || property.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          />
        )}
        <div className="absolute top-3 right-3 bg-paper/90 backdrop-blur-sm rounded-full">
          <SaveButton propertyId={String(property.id)} />
        </div>
      </div>

      <div className="pt-5 pb-8 border-b border-hairline">
        <p className="text-[11px] tracking-label uppercase text-muted">
          {property.location} · {property.type}
        </p>

        <h3 className="mt-2 font-serif text-2xl font-light leading-snug text-ink">
          {property.title}
        </h3>

        {unitCount > 0 && (
          <p className="mt-3 text-sm text-muted">
            {unitCount} {unitCount === 1 ? 'configuration' : 'configurations'}
          </p>
        )}

        <p className="mt-4 text-[11px] tracking-label uppercase text-ink">
          Price on request
        </p>
      </div>
    </Link>
  )
}
