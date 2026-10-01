import { RentalSubmitForm } from '@/components/RentalSubmitForm'

export default function RentListPage() {
  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">Rent</p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          List Your Property
        </h1>
        <p className="mt-6 max-w-prose text-ink/70 leading-relaxed">
          Fill in the details below. Our team will review your submission and
          get in touch within 24 hours. All listings are vetted before they
          appear on the site.
        </p>
      </header>

      <div className="max-w-3xl">
        <RentalSubmitForm />
      </div>
    </main>
  )
}
