import type { ReactNode } from 'react'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const serif = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-serif',
    display: 'swap',
})

const sans = Inter({
    subsets: ['latin'],
    weight: ['400', '500'],
    variable: '--font-sans',
    display: 'swap',
})

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang= "en" className = {`${serif.variable} ${sans.variable}`
}>
    <body className="bg-paper text-ink font-sans antialiased" >
        <Header />
{ children }
<Footer />
    </body>
        </html>
  )
}