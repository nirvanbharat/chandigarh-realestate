import Link from 'next/link'

const OPTIONS = [
  {
    slug: 'buy',
    label: 'Buy',
    number: '01',
    description: 'Browse our curated catalogue of residences across the Tricity.',
  },
  {
    slug: 'sell',
    label: 'Sell',
    number: '02',
    description: 'List your property with us. Confidential, considered, and personal.',
  },
  {
    slug: 'rent',
    label: 'Rent',
    number: '03',
    description: 'Rental listings across Chandigarh, Mohali, Panchkula, and Zirakpur.',
  },
]

export default function ListingsLanding() {
  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Listings
        </p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          How can we help?
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-hairline">
        {OPTIONS.map((opt, i) => (
          <Link
            key={opt.slug}
            href={`/properties/${opt.slug}`}
            className={`group py-16 md:px-8 border-b border-hairline md:border-b-0 md:border-r flex flex-col justify-between min-h-[300px] ${
              i === OPTIONS.length - 1 ? 'md:border-r-0' : ''
            }`}
          >
            <span className="text-[11px] tracking-label uppercase text-muted">
              {opt.number}
            </span>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-light group-hover:text-accent transition-colors">
                {opt.label}
              </h2>
              <p className="mt-6 text-sm text-ink/60 leading-relaxed max-w-xs">
                {opt.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
