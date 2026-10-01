import { SavedList } from '@/components/SavedList'

export const metadata = {
  title: 'Saved Properties | Nirvan Bharat',
}

export default function SavedPage() {
  return (
    <main className="mx-auto max-w-site px-6 md:px-12 py-20">
      <header className="mb-16 border-b border-hairline pb-10">
        <p className="text-[11px] tracking-label uppercase text-muted">
          Shortlist
        </p>
        <h1 className="mt-4 font-serif text-5xl md:text-6xl font-light text-ink">
          Saved Properties
        </h1>
      </header>

      <SavedList />
    </main>
  )
}
