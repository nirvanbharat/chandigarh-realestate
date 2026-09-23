import { SellForm } from '@/components/SellForm'

export default function SellPage() {
  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Sell
        </p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          Sell With Us
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8 text-ink/80 leading-relaxed max-w-prose">
          <p>
            We represent a small, considered catalogue of properties across
            the Chandigarh Tricity. If you are considering selling — or
            simply want to understand what your property is worth in the
            current market — we would be glad to help.
          </p>
          <p>
            Every listing is personally walked, photographed, and presented
            with the care it deserves. We work with a limited number of
            clients at a time, which means yours gets our full attention.
          </p>
          <p>
            Share a few details below and we&apos;ll be in touch within 24
            hours. All conversations are confidential.
          </p>
        </div>

        <div>
          <SellForm />
        </div>
      </div>
    </main>
  )
}
