'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

type Props = {
  coordinates: [number, number]
  title: string
  mapboxToken: string
  phone?: string
}

export function SinglePropertyMap({ coordinates, title, mapboxToken, phone }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [lng, lat] = coordinates

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
  const streetViewUrl = `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}`
  const phoneNumber = phone || '+919107868000'
  const callUrl = `tel:${phoneNumber.replace(/\s/g, '')}`

  useEffect(() => {
    if (!mapboxToken) {
      setError('Map token not configured')
      return
    }
    if (!mapContainer.current) return
    if (map.current) return

    mapboxgl.accessToken = mapboxToken

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: coordinates,
      zoom: 14,
      scrollZoom: false,
    })

    map.current.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      'top-right'
    )

    new mapboxgl.Marker({ color: '#1A1A1A' })
      .setLngLat(coordinates)
      .addTo(map.current)

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [coordinates, mapboxToken])

  if (error) return null

  return (
    <div>
      <div
        className="relative border border-hairline"
        style={{ height: '360px' }}
      >
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>

          <a
            href={streetViewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Street View
          </a>

          <a
            href={callUrl}
            className="inline-flex items-center gap-2 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call to Ask
          </a>
        </div>

        <p className="text-[11px] tracking-label uppercase text-muted">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </p>
      </div>
    </div>
  )
}
