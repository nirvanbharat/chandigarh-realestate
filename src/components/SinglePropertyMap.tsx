'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

type Props = {
  coordinates: [number, number]
  title: string
  mapboxToken: string
}

export function SinglePropertyMap({ coordinates, title, mapboxToken }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [lng, lat] = coordinates

  // Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&travelmode=driving`

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

  if (error) {
    return null
  }

  return (
    <div>
      <div
        className="relative border border-hairline"
        style={{ height: '320px' }}
      >
        <div ref={mapContainer} className="w-full h-full" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[11px] tracking-label uppercase border-b border-ink pb-1 hover:border-accent hover:text-accent transition-colors duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Get Directions
        </a>

        <p className="text-[11px] tracking-label uppercase text-muted">
          {lat.toFixed(4)}, {lng.toFixed(4)}
        </p>
      </div>
    </div>
  )
}
