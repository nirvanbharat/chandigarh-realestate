/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
    theme: {
        extend: {
            colors: {
                ink: '#1A1A1A',
                muted: '#6B6B6B',
                paper: '#FAF9F6',
                hairline: '#E5E3DE',
                accent: '#7B2D26',
            },
            fontFamily: {
                serif: ['var(--font-serif)', 'Georgia', 'serif'],
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
            },
            letterSpacing: {
                label: '0.18em',
            },
            maxWidth: {
                prose: '68ch',
                site: '1440px',
            },
            spacing: {
                section: '10rem',
            },
        },
    },
    plugins: [],
}