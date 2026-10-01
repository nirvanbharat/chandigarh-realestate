'use client'

import { useSaved } from '@/hooks/useSaved'

export function SaveButton({
  propertyId,
  variant = 'icon',
}: {
  propertyId: string
  variant?: 'icon' | 'full'
}) {
  const { isSaved, toggle, mounted } = useSaved()
  const saved = isSaved(propertyId)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    toggle(propertyId)
  }

  // Prevent hydration mismatch: render nothing until mounted
  if (!mounted) {
    return variant === 'full' ? (
      <div className="h-12" />
    ) : (
      <div className="w-8 h-8" />
    )
  }

  if (variant === 'full') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={saved ? 'Remove from saved' : 'Save property'}
        className="flex items-center justify-center gap-2 w-full py-4 border border-hairline text-[11px] tracking-label uppercase text-ink hover:border-ink transition-colors duration-300"
      >
        <HeartIcon filled={saved} />
        {saved ? 'Saved' : 'Save'}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={saved ? 'Remove from saved' : 'Save property'}
      className="w-8 h-8 flex items-center justify-center text-ink hover:text-accent transition-colors duration-300"
    >
      <HeartIcon filled={saved} />
    </button>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    )
  }
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}
