import Link from 'next/link'

export default function RentPage() {
  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Rent
        </p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          Rental Properties
        </h1>
      </header>

      <div className="max-w-prose">
        <p className="text-ink/80 leading-relaxed text-lg">
          Our rental catalogue is coming soon. In the meantime, we can help
          with rental inquiries across the Tricity — reach out and we&apos;ll
          connect you with what&apos;s available.
        </p>

        <Link
          href="/contact"
          className="inline-block mt-10 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors"
        >
          Get in touch
        </Link>
      </div>
    </main>
  )
}
