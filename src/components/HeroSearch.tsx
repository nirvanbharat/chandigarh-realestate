'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function HeroSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/properties/buy?q=${encodeURIComponent(q)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="relative">
        <svg
          className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by project name or location"
          className="w-full pl-16 pr-6 py-5 bg-white/95 backdrop-blur-sm text-ink text-base placeholder:text-muted/70 outline-none focus:bg-white transition-colors"
        />
      </div>
    </form>
  )
}

