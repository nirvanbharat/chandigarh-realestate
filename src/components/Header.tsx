'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/properties', label: 'Listings' },
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
            className="font-serif text-xl md:text-2xl font-light tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            Nirvan Bharat
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-12 text-[10px] tracking-label uppercase text-ink">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-accent transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu trigger — text label, not hamburger */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden text-[10px] tracking-label uppercase text-ink"
          >
            {open ? 'Close' : 'Menu'}
          </button>
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
