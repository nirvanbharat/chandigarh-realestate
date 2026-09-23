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
      <div className="relative group">
        {/* Left: search icon */}
        <svg
          className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted pointer-events-none transition-colors duration-300 group-focus-within:text-ink"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.25}
            d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
          />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by project name"
          className="w-full pl-16 pr-20 py-5 bg-white/95 backdrop-blur-sm text-ink text-base placeholder:text-muted/70 outline-none focus:bg-white transition-colors"
        />

        {/* Right: submit button */}
        <button
          type="submit"
          aria-label="Search"
          disabled={!query.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-ink hover:text-accent transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5 transition-transform duration-300 group-focus-within:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.25}
              d="M5 12h14M13 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </form>
  )
}
