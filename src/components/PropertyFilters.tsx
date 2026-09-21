'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

const LOCATIONS = [
    { value: '', label: 'All locations' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'mohali', label: 'Mohali' },
    { value: 'panchkula', label: 'Panchkula' },
    { value: 'zirakpur', label: 'Zirakpur' },
    { value: 'new-chandigarh', label: 'New Chandigarh' },
]

const TYPES = [
    { value: '', label: 'All types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'plot', label: 'Plot' },
    { value: 'penthouse', label: 'Penthouse' },
]

const CONFIGS = [
    { value: '', label: 'Any configuration' },
    { value: '2BHK', label: '2BHK' },
    { value: '3BHK', label: '3BHK' },
    { value: '4BHK', label: '4BHK' },
    { value: '5BHK+', label: '5BHK+' },
]

export function PropertyFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams()

    function update(key: string, value: string) {
        const next = new URLSearchParams(params.toString())
        if (value) next.set(key, value)
        else next.delete(key)
        router.push(`${pathname}?${next.toString()}`)
    }

    const selectClass =
        'w-full border-b border-hairline bg-transparent py-3 text-[11px] tracking-label uppercase text-ink focus:border-ink outline-none transition-colors cursor-pointer'

    return (
        <div className= "grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-6 border-y border-hairline py-8" >
        <label className="block" >
            <span className="text-[11px] tracking-label uppercase text-muted" > Location </span>
                < select
    value = { params.get('location') || '' }
    onChange = {(e) => update('location', e.target.value)
}
className = { selectClass }
    >
{
    LOCATIONS.map((l) => (
        <option key= { l.value } value = { l.value } > { l.label } </option>
    ))
}
    </select>
    </label>

    < label className = "block" >
        <span className="text-[11px] tracking-label uppercase text-muted" > Type </span>
            < select
value = { params.get('type') || '' }
onChange = {(e) => update('type', e.target.value)}
className = { selectClass }
    >
{
    TYPES.map((t) => (
        <option key= { t.value } value = { t.value } > { t.label } </option>
    ))
}
    </select>
    </label>

    < label className = "block" >
        <span className="text-[11px] tracking-label uppercase text-muted" > Configuration </span>
            < select
value = { params.get('configuration') || '' }
onChange = {(e) => update('configuration', e.target.value)}
className = { selectClass }
    >
{
    CONFIGS.map((c) => (
        <option key= { c.value } value = { c.value } > { c.label } </option>
    ))
}
    </select>
    </label>

    < label className = "block" >
        <span className="text-[11px] tracking-label uppercase text-muted" > Search </span>
            < input
type = "text"
placeholder = "e.g. Sector 17"
defaultValue = { params.get('q') || '' }
onChange = {(e) => {
    const v = e.target.value
    // debounce-ish: only update on blur or after a pause
    clearTimeout((window as any).__filterTimeout)
        ; (window as any).__filterTimeout = setTimeout(() => update('q', v), 400)
}}
className = { selectClass + ' placeholder:text-muted/60'}
        />
    </label>
    </div>
  )
}