import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-hairline mt-section">
      <div className="mx-auto max-w-site px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <p className="font-serif text-2xl font-light">Nirvan Bharat</p>
          <p className="mt-4 text-xs text-muted leading-relaxed max-w-xs">
            A curated catalogue of listings across Chandigarh, Mohali, Panchkula, Zirakpur, and New Chandigarh.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-label uppercase text-muted mb-6">
            Explore
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/properties" className="hover:text-accent transition-colors">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/properties/buy" className="hover:text-accent transition-colors">
                Buy
              </Link>
            </li>
            <li>
              <Link href="/properties/sell" className="hover:text-accent transition-colors">
                Sell
              </Link>
            </li>
            <li>
              <Link href="/properties/rent" className="hover:text-accent transition-colors">
                Rent
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-label uppercase text-muted mb-6">
            Contact
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="mailto:hello@yourdomain.com" className="hover:text-accent transition-colors">
                hello@yourdomain.com
              </a>
            </li>
            <li>
              <a href="tel:+919876543210" className="hover:text-accent transition-colors">
                +91 98765 43210
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <div className="mx-auto max-w-site px-6 md:px-12 py-6 text-[11px] tracking-label uppercase text-muted flex justify-between">
          <span>© {new Date().getFullYear()} Nirvan Bharat</span>
          <span>RERA Registered</span>
        </div>
      </div>
    </footer>
  )
}
