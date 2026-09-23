import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About | Nirvan Bharat',
    description:
        'A quiet, considered approach to real estate across Chandigarh, Mohali, Panchkula, Zirakpur, and New Chandigarh.',
}

export default function AboutPage() {
    return (
        <main>
        {/* Header */ }
        < section className = "mx-auto max-w-site px-6 md:px-12 py-20" >
            <p className="text-[11px] tracking-label uppercase text-muted" > About </p>
                < h1 className = "mt-4 font-serif text-5xl md:text-7xl font-light leading-[1.05] max-w-4xl" >
                    A quiet approach to real estate.
        </h1>
                        </section>

    {/* Two-column body */ }
    <section className="border-t border-hairline" >
        <div className="mx-auto max-w-site px-6 md:px-12 py-section grid grid-cols-1 md:grid-cols-12 gap-16" >
            <div className="md:col-span-4" >
                <p className="text-[11px] tracking-label uppercase text-muted" >
                    Who we are
                        </p>
                        </div>
                        < div className = "md:col-span-8 space-y-6 text-ink/80 leading-relaxed max-w-prose" >
                            <p>
                            We represent a small, considered catalogue of properties across
              the Chandigarh Tricity.Every listing is personally vetted, and
              every conversation is confidential.
            </p>
        <p>
              Our focus is on the buyer who values clarity over volume â€” who
              wants to understand a micro - market, not scroll through hundreds
              of listings.We work across Chandigarh, Mohali, Panchkula,
        Zirakpur, and New Chandigarh, with an emphasis on the emerging
              premium pockets of the region.
            </p>
        <p>
              If you are buying, we help you see what is actually for sale â€”
              and what is worth waiting for.If you are selling, we present
              your property with the care it deserves.
            </p>
        </div>
        </div>
        </section>

    {/* Principles */ }
    <section className="border-t border-hairline" >
        <div className="mx-auto max-w-site px-6 md:px-12 py-section" >
            <p className="text-[11px] tracking-label uppercase text-muted mb-16" >
                How we work
                    </p>
                    < div className = "grid grid-cols-1 md:grid-cols-3 gap-12" >
                    {
                        [
                        {
                            n: '01',
                            h: 'Curation over volume',
                            b: 'We list fewer properties than most. Every one is walked, photographed, and understood before it appears on this site.',
                        },
                        {
                            n: '02',
                            h: 'Discretion',
                            b: 'Off-market opportunities, quiet negotiations, and confidential briefs are the norm in the segment we serve.',
                        },
                        {
                            n: '03',
                            h: 'Local depth',
                            b: 'We work one region â€” the Tricity â€” and know its sectors, builders, and price movements in detail.',
                        },
            ].map((p) => (
                            <div key= { p.n } className = "border-t border-hairline pt-8" >
                            <p className="text-[11px] tracking-label uppercase text-muted" >
                            { p.n }
                            </p>
                        < h3 className = "mt-4 font-serif text-2xl font-light" > { p.h } </h3>
                        < p className = "mt-4 text-sm text-ink/70 leading-relaxed" > { p.b } </p>
                        </div>
                        ))
                    }
                        </div>
                        </div>
                        </section>

    {/* Contact strip */ }
    <section className="border-t border-hairline" >
        <div className="mx-auto max-w-site px-6 md:px-12 py-section text-center" >
            <p className="text-[11px] tracking-label uppercase text-muted" >
                Start a conversation
                    </p>
                    < h2 className = "mt-6 font-serif text-4xl md:text-5xl font-light max-w-2xl mx-auto leading-tight" >
                        Tell us what you & apos;re looking for.
          </h2>
                            < a
            href = "/contact"
            className = "inline-block mt-10 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors"
        >
        Contact us
            </a>
            </div>
            </section>
            </main>
  )
}
