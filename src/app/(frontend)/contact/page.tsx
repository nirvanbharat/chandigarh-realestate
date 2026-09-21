import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
    title: 'Contact | Chandigarh Tricity',
    description: 'Get in touch about properties across the Chandigarh Tricity.',
}

export default function ContactPage() {
    return (
        <main className= "mx-auto max-w-site px-6 md:px-12 py-20" >
        <header className="mb-16 border-b border-hairline pb-10" >
            <p className="text-[11px] tracking-label uppercase text-muted" >
                Contact
                </p>
                < h1 className = "mt-4 font-serif text-5xl md:text-6xl font-light" >
                    Get in touch
                    </h1>
                    </header>

                    < div className = "grid grid-cols-1 md:grid-cols-12 gap-16" >
                    {/* Left: contact details */ }
                        < div className = "md:col-span-5 space-y-12" >
                            <div>
                            <p className="text-[11px] tracking-label uppercase text-muted mb-4" >
                                Email
                                </p>
                                < a
    href = "mailto:hello@yourdomain.com"
    className = "font-serif text-2xl font-light hover:text-accent transition-colors"
        >
        hello@yourdomain.com
    </a>
        </div>
        < div >
        <p className="text-[11px] tracking-label uppercase text-muted mb-4" >
            Phone
            </p>
            < a
    href = "tel:+919876543210"
    className = "font-serif text-2xl font-light hover:text-accent transition-colors"
        >
        +91 9107868000
            </a>
            </div>
            < div >
            <p className="text-[11px] tracking-label uppercase text-muted mb-4" >
                Office
                </p>
                < p className = "font-serif text-2xl font-light leading-snug" >
                    Chandigarh Tricity
                        < br />
                        Sector 17, Chandigarh
                            </p>
                            </div>
                            </div>

    {/* Right: form */ }
    <div className="md:col-span-7" >
        <ContactForm />
        </div>
        </div>
        </main>
  )
}