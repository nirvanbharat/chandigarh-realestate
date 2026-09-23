import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { HeroSearch } from '@/components/HeroSearch'

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

  return (
    <main className="hero-full">
      {/* ── HERO: full-viewport video, ends at fold ── */}
      <section className="relative h-screen min-h-[640px] overflow-hidden bg-ink">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover hero-video"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative h-full flex flex-col items-center justify-center px-6 pt-20">
          <p className="text-[11px] tracking-label uppercase text-white/70 mb-6 hero-fade hero-fade-1">
            Chandigarh · Mohali · Panchkula · Zirakpur
          </p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white text-center max-w-4xl leading-[1.05] hero-fade hero-fade-2">
            Find Your Luxury Home
          </h1>

          <div className="mt-12 w-full hero-fade hero-fade-3">
            <HeroSearch />
          </div>

          <p className="mt-8 text-[11px] tracking-label uppercase text-white/60 hero-fade hero-fade-4">
            {settings.heroSubline || 'A curated catalogue across the Tricity'}
          </p>
        </div>
      </section>

      {/* ── CONTENT: solid paper, animated on scroll ── */}

      {/* By Location */}
      <section className="border-t border-hairline bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-12 py-section">
          <header className="mb-16 reveal">
            <p className="text-[11px] tracking-label uppercase text-muted">
              Explore
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light">
              By Location
            </h2>
          </header>

          <div className="grid grid-cols-2 md:grid-cols-5 border-t border-hairline">
            {LOCATIONS.map((loc, i) => (
              <Link
                key={loc.slug}
                href={`/locations/${loc.slug}`}
                className={`reveal group py-10 border-b border-hairline md:border-b-0 md:border-r ${
                  i === LOCATIONS.length - 1 ? 'md:border-r-0' : ''
                } md:px-6 flex flex-col justify-between min-h-[180px]`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-[11px] tracking-label uppercase text-muted">
                  0{i + 1}
                </span>
                <span className="font-serif text-2xl font-light group-hover:text-accent transition-colors duration-500">
                  {loc.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="border-t border-hairline bg-paper">
        <div className="mx-auto max-w-site px-6 md:px-12 py-section grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="reveal">
            <p className="text-[11px] tracking-label uppercase text-muted">
              Vision
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl font-light leading-tight">
              {settings.aboutHeading || 'A quiet approach to real estate.'}
            </h2>
          </div>
          <div className="md:pt-16 reveal" style={{ animationDelay: '150ms' }}>
            <p className="text-ink/80 leading-relaxed max-w-prose">
              {settings.aboutBody ||
                'We represent a small, considered catalogue of listings across the Chandigarh Tricity. Every listing is personally vetted, and every conversation is confidential.'}
            </p>
            <Link
              href="/vision"
              className="inline-block mt-10 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors duration-500"
            >
              Read more
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
