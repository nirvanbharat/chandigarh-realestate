'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/properties', label: 'Listings' },
  { href: '/guides', label: 'Guides' },
  { href: '/vision', label: 'Vision' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled || open
            ? 'bg-paper border-b border-hairline'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-site px-6 md:px-12 h-20 md:h-24 flex items-center justify-between">
          <Link
            href="/"
            className="group flex flex-col leading-none"
            onClick={() => setOpen(false)}
          >
            <span className="font-serif text-3xl md:text-4xl font-light tracking-tight text-ink">
              Nirvan Bharat
            </span>
            <span className="mt-1 text-[9px] tracking-label uppercase text-muted">
              Private Real Estate
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-12 text-[10px] tracking-label uppercase text-ink">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/saved"
              aria-label="Saved properties"
              className="hover:text-accent transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-6">
            <Link
              href="/saved"
              aria-label="Saved properties"
              className="text-ink hover:text-accent transition-colors duration-300"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="text-[10px] tracking-label uppercase text-ink"
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-paper transition-opacity duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <nav className="h-full flex flex-col items-center justify-center gap-12 px-6">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`font-serif text-4xl font-light text-ink transition-all duration-700 ${
                open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: open ? `${120 + i * 80}ms` : '0ms' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}
