import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config.ts'

const projects = [
    // ─────────── MOHAli ───────────
    {
        title: 'Ambika La Parisian',
        location: 'mohali',
        units: [
            { configuration: '3B2T', superArea: '1450 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1720 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1775 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1785 Sq. Ft' },
            { configuration: '4+1 BHK', superArea: '2920 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2185/2205 Sq. Ft.' },
        ],
    },
    {
        title: 'Joy Grand',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '2866 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '3192 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '3677 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '4054 Sq. Ft.' },
        ],
    },
    {
        title: 'Horizon Belmond',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '2602 Sq. Ft. (Non Corner)' },
            { configuration: '3+1 BHK', superArea: '2808 Sq. Ft. (Corner)' },
            { configuration: '4+1 BHK', superArea: '3326 Sq. Ft. (Non Corner)' },
            { configuration: '4+1 BHK', superArea: '3538 Sq. Ft. (Corner)' },
            { configuration: 'Garden Villa / Penthouse / 5+1 BHK', superArea: '5300 Sq. Ft.' },
        ],
    },
    {
        title: 'Atulyam',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '3400 Sq. Ft. (Non Corner)' },
            { configuration: '3+1 BHK', superArea: '3800 Sq. Ft. (Corner)' },
            { configuration: '4+1 BHK', superArea: '4600 Sq. Ft.' },
            { configuration: '5+2 BHK', superArea: '6400 Sq. Ft.' },
        ],
    },
    {
        title: 'Noble Aurellia',
        location: 'mohali',
        units: [
            { configuration: '3 BHK', superArea: '2650 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2901 Sq. Ft' },
        ],
    },
    {
        title: 'Noble Magnolia',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '3351 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '4451 Sq. Ft.' },
            { configuration: '5+1 BHK', superArea: '5551 Sq. Ft.' },
        ],
    },
    {
        title: 'Hero Homes',
        location: 'mohali',
        units: [
            { configuration: '3 BHK + Store', superArea: '1661 Sq. Ft.' },
            { configuration: '3 BHK + Store', superArea: '1725 Sq. Ft.' },
            { configuration: '3 BHK + Store', superArea: '1926 Sq. Ft' },
            { configuration: '3 BHK + Store', superArea: '2085 Sq. Ft.' },
            { configuration: '2+1 BHK', superArea: '1481 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '1950 Sq. Ft.' },
            { configuration: '2 BHK', superArea: '1095 Sq. Ft.' },
            { configuration: '2+1 BHK', superArea: '1290 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1565 Sq. Ft.' },
            { configuration: '4 BHK', superArea: '3490 Sq. Ft.' },
        ],
    },
    {
        title: 'The Pinnacle',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '2450 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '3500 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '2100 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '2300 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '3800 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '4000 Sq. Ft.' },
            { configuration: 'Cloud Villa', superArea: '5000–5050 Sq. Ft.' },
        ],
    },
    {
        title: 'Medallion Republic',
        location: 'mohali',
        units: [
            { configuration: '2 BHK', superArea: '1350 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1750 Sq. Ft.' },
        ],
    },
    {
        title: 'Marbella Royce',
        location: 'mohali',
        units: [
            { configuration: '4 BHK', superArea: '3120 Sq. Ft.' },
            { configuration: '4 BHK', superArea: '3300 Sq. Ft' },
            { configuration: '5 BHK', superArea: '4120 Sq. Ft.' },
            { configuration: '5 BHK', superArea: '4300 Sq. Ft.' },
        ],
    },
    {
        title: 'Marbella Grand',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '2601 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '3672 Sq. Ft.' },
            { configuration: '5+1 BHK', superArea: '7111 Sq. Ft.' },
        ],
    },
    {
        title: 'Medallion Aurum',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK (4T)', superArea: '2950 Sq. Ft' },
            { configuration: '4+1 BHK', superArea: '3900 Sq. Ft.' },
            { configuration: '5+1 BHK', superArea: '7600 Sq. Ft.' },
        ],
    },
    {
        title: 'The Medallion 82',
        location: 'mohali',
        units: [
            { configuration: '3B 2T', superArea: '1550 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1995 Sq. Ft.' },
            { configuration: '4 BHK', superArea: '2695 Sq. Ft' },
        ],
    },
    {
        title: 'The Medallion Nova',
        location: 'mohali',
        units: [
            { configuration: '3 BHK', superArea: '1990 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2497 Sq. Ft' },
        ],
    },
    {
        title: 'JLPL Falcon',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '2480 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2565 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '3008 Sq. Ft.' },
        ],
    },
    {
        title: 'Noble Calista',
        location: 'mohali',
        units: [
            { configuration: '3+1 BHK', superArea: '2850 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '3500 Sq. Ft.' },
            { configuration: '5+1 BHK', superArea: '5000 Sq. Ft.' },
        ],
    },

    // ─────────── ZIRAKPUR ───────────
    {
        title: 'Escon Primera',
        location: 'zirakpur',
        units: [
            { configuration: '2 BHK', superArea: '1305 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2450 Sq. Ft.' },
            { configuration: '3B2T', superArea: '1550 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '2050 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1850 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2250 Sq Ft' },
            { configuration: '4 BHK', superArea: '3250 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '4650 Sq. Ft.' },
        ],
    },
    {
        title: 'Affinity Belgravia',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '2150 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2650 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '3380 Sq. Ft.' },
        ],
    },
    {
        title: 'Ananta Aspire',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '1843 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2247 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '2945 Sq. Ft.' },
        ],
    },
    {
        title: 'Vamana Arvindam',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '2325 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2690 Sq. Ft.' },
            { configuration: '4+1 BHK', superArea: '3685 Sq. Ft.' },
        ],
    },
    {
        title: 'Trishla City',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '1770 Sq. Ft' },
            { configuration: '3 BHK', superArea: '1808 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '2021 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '2048 Sq. Ft.' },
            { configuration: '4 BHK', superArea: '2540 Sq. Ft.' },
            { configuration: '4 BHK', superArea: '2750 Sq. Ft.' },
            { configuration: '5 BHK', superArea: '5600 Sq. Ft.' },
            { configuration: '5 BHK', superArea: '5340 Sq. Ft.' },
        ],
    },
    {
        title: 'The Zirk',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '1750 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1800 Sq. Ft' },
            { configuration: '3 BHK', superArea: '1900 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1990 Sq. Ft.' },
            { configuration: '3+1 BHK', superArea: '2290 Sq Ft' },
        ],
    },
    {
        title: 'Atlantis Grand',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '1915 Sq. Ft.' },
            { configuration: '3 BHK', superArea: '1995 Sq. Ft.' },
        ],
    },
    {
        title: 'Uptown Skylla',
        location: 'zirakpur',
        units: [
            { configuration: '2 BHK', superArea: '1220 SQ FT' },
            { configuration: '3B2T', superArea: '1420 SQFT' },
            { configuration: '3 BHK', superArea: '1505 SQFT' },
            { configuration: '3 BHK', superArea: '1665 SQFT' },
            { configuration: '3+1 BHK', superArea: '2020 SQ FT' },
            { configuration: '4+1 BHK', superArea: '2505 SQ FT' },
        ],
    },
    {
        title: 'Green Lotus Utsav',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '2100 Sq Ft' },
            { configuration: '3+1 BHK', superArea: '2525 Sq Ft' },
            { configuration: '4 BHK', superArea: '3130 Sq Ft' },
            { configuration: '5+1 BHK', superArea: '3785 Sq Ft' },
            { configuration: '5 BHK (Duplex)', superArea: '5750 Sq Ft' },
            { configuration: '5 BHK (Large)', superArea: '6255 Sq Ft' },
            { configuration: '6 BHK (Duplex)', superArea: '8035 Sq Ft' },
        ],
    },
    {
        title: 'MCC Genesis',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '2205 Sq Ft' },
            { configuration: '3 BHK', superArea: '2350 Sq ft' },
            { configuration: '3+1 BHK', superArea: '2572 Sq ft' },
            { configuration: '3+1 BHK', superArea: '2702 Sq Ft' },
            { configuration: '4+1 BHK', superArea: '3890 sq ft' },
        ],
    },
    {
        title: 'Atlantis 360',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '2325 Sq Ft' },
            { configuration: '3+1 BHK', superArea: '2600 Sq Ft' },
            { configuration: '4+1 BHK', superArea: '3204 Sq Ft' },
        ],
    },
    {
        title: 'MCC Fortune',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '1867 Sq ft' },
            { configuration: '3+1 BHK', superArea: '2300 Sq ft' },
            { configuration: '3+1 BHK', superArea: '3000 Sq ft' },
            { configuration: '4+1 BHK', superArea: '3000 Sq ft' },
            { configuration: '4+1 BHK', superArea: '3500 Sq ft' },
        ],
    },
    {
        title: 'Skyline Elevate',
        location: 'zirakpur',
        units: [
            { configuration: '3 BHK', superArea: '1600 Sq. Ft.' },
            { configuration: '4 BHK', superArea: '2200 Sq. Ft.' },
        ],
    },
]

async function run() {
    console.log('Initializing Payload...')
    const payload = await getPayload({ config })
    console.log(`Importing ${projects.length} projects...\n`)

    let created = 0
    let skipped = 0

    for (const project of projects) {
        const slug = project.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')

        try {
            // Check if already exists
            const existing = await payload.find({
                collection: 'properties',
                where: { slug: { equals: slug } },
                limit: 1,
            })

            if (existing.docs.length > 0) {
                console.log(`  ⏭  ${project.title} (already exists, skipped)`)
                skipped++
                continue
            }

            await payload.create({
                collection: 'properties',
                data: {
                    title: project.title,
                    slug,
                    location: project.location,
                    type: 'apartment',
                    status: 'available',
                    featured: created < 6,
                    unitTypes: project.units,
                },
            })

            console.log(`  ✓ ${project.title} (${project.units.length} unit types)`)
            created++
        } catch (err) {
            console.error(`  ✗ ${project.title} — ${err.message}`)
        }
    }

    console.log(`\n✓ Created: ${created}`)
    console.log(`⏭  Skipped: ${skipped}`)
    console.log(`\nDone. Open http://localhost:3000/properties`)

    process.exit(0)
}

run().catch((err) => {
    console.error('Fatal:', err)
    process.exit(1)
})