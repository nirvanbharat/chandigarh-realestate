'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

type Props = {
  phone?: string
}

export function WhatsAppFloat({ phone = '919107868000' }: Props) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [contextName, setContextName] = useState<string | null>(null)

  // Read the page's H1 from the DOM — more reliable than document.title
  useEffect(() => {
    if (typeof document === 'undefined') return

    // Small delay to let the page render
    const timer = setTimeout(() => {
      const h1 = document.querySelector('main h1')
      const text = h1?.textContent?.trim() || ''
      if (text) setContextName(text)
      else setContextName(null)
    }, 300)

    return () => clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  function buildMessage(): string {
    if (!pathname) return "Hi, I'd like to know more about your properties."

    // Property detail: /properties/[slug] (but not buy/rent/sell)
    if (
      pathname.match(/^\/properties\/[^/]+$/) &&
      !pathname.includes('/buy') &&
      !pathname.includes('/rent') &&
      !pathname.includes('/sell')
    ) {
      return contextName
        ? `Hi, I'm interested in "${contextName}". Could you share more details?`
        : "Hi, I'm interested in a property I saw on your website."
    }

    // Rent browse
    if (pathname.startsWith('/properties/rent/browse') || pathname === '/properties/rent') {
      return "Hi, I'd like to know more about rental properties."
    }
    if (pathname.startsWith('/properties/rent/list')) {
      return "Hi, I'd like to list my property for rent."
    }

    // Buy listing
    if (pathname.startsWith('/properties/buy')) {
      return "Hi, I'd like to know more about a property for sale."
    }
    if (pathname.startsWith('/properties/sell')) {
      return "Hi, I'd like to sell my property. Could you help?"
    }

    // Location pages
    const locationMatch = pathname.match(/^\/locations\/([^/]+)/)
    if (locationMatch) {
      const label = contextName || locationMatch[1]
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
      return `Hi, I'm interested in properties in ${label}.`
    }

    // Guide detail
    if (pathname.match(/^\/guides\/[^/]+$/)) {
      return contextName
        ? `Hi, I read your guide "${contextName}" and have a question.`
        : "Hi, I read one of your guides and have a question."
    }
    if (pathname === '/guides') {
      return "Hi, I have a question about one of your area guides."
    }

    if (pathname === '/contact') return "Hi, I'd like to get in touch."
    if (pathname === '/vision') return "Hi, I'd like to know more about Nirvan Bharat."
    if (pathname === '/properties') return "Hi, I'd like to know more about your listings."

    return "Hi, I'd like to know more about your properties."
  }

  const message = buildMessage()
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 left-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] transition-all duration-500 hover:scale-110 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      style={{ boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)' }}
    >
      <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  )
}
