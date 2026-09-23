import Link from 'next/link'

export function Header() {
    return (
        <header className= "border-b border-hairline bg-paper sticky top-0 z-50" >
        <div className="mx-auto max-w-site px-6 md:px-12 py-6 flex items-center justify-between" >
            <Link href="/" className = "font-serif text-2xl font-light tracking-tight" >
                Nirvan Bharat
                    </Link>
                    < nav className = "hidden md:flex gap-10 text-[11px] tracking-label uppercase" >
                        <Link href="/properties" className = "hover:text-accent transition-colors" > Properties </Link>
                            < Link href = "/locations/mohali" className = "hover:text-accent transition-colors" > Mohali </Link>
                                < Link href = "/locations/chandigarh" className = "hover:text-accent transition-colors" > Chandigarh </Link>
                                    < Link href = "/about" className = "hover:text-accent transition-colors" > About </Link>
        < Link href = "/contact" className = "hover:text-accent transition-colors" > Contact </Link>
                                            </nav>
                                            </div>
                                            </header>
  )
}


