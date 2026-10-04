'use client'

import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Property, Media } from '@/payload-types'


type Props = {
  properties: Property[]
  mapboxToken: string
}

export function PropertyMap({ properties, mapboxToken }: Props) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapboxToken) {
      setError('Mapbox token not configured')
      return
    }

    mapboxgl.accessToken = mapboxToken

    if (!mapContainer.current) return
    if (map.current) return

    const withCoords = properties.filter(
      (p) => p.coordinates && Array.isArray(p.coordinates) && p.coordinates.length === 2
    )

    const validCoords = withCoords.map((p) => ({
      lng: (p.coordinates as number[])[0],
      lat: (p.coordinates as number[])[1],
    }))

    let center: [number, number] = [76.75, 30.66]
    let zoom = 10

    if (validCoords.length > 0) {
      const avgLng = validCoords.reduce((s, c) => s + c.lng, 0) / validCoords.length
      const avgLat = validCoords.reduce((s, c) => s + c.lat, 0) / validCoords.length
      center = [avgLng, avgLat]
      zoom = 11
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center,
      zoom,
    })

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')

    map.current.on('load', () => {
      withCoords.forEach((prop) => {
        const coords = prop.coordinates as number[]
        const [lng, lat] = coords

        const image = prop.images?.[0] as Media | undefined
        const imageUrl = image?.url || ''

        const el = document.createElement('div')
        el.style.cssText = `
          width: 40px;
          height: 40px;
          background: #1A1A1A;
          border: 2px solid #FAF9F6;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          overflow: hidden;
        `

        if (imageUrl) {
          el.innerHTML = `<img src="${imageUrl}" alt="" style="width: 100%; height: 100%; object-fit: cover;" />`
        } else {
          el.innerHTML = `<span style="color: #FAF9F6; font-size: 14px;">•</span>`
        }

        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.15)'
        })
        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)'
        })

        const slug = prop.slug || ''
        const detailUrl = `/properties/${slug}`
        const popupHtml = `
          <div style="font-family: system-ui, sans-serif; max-width: 240px;">
            ${
              imageUrl
                ? `<img src="${imageUrl}" alt="" style="width: 100%; height: 140px; object-fit: cover; display: block; margin-bottom: 12px;" />`
                : ''
            }
            <p style="font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #6B6B6B; margin: 0 0 6px;">
              ${prop.location} · ${prop.listingType === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
            <p style="font-family: Georgia, serif; font-size: 18px; font-weight: 300; margin: 0 0 12px; color: #1A1A1A;">
              ${prop.title}
            </p>
            <a href="${detailUrl}" style="font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #1A1A1A; text-decoration: none; border-bottom: 1px solid #1A1A1A; padding-bottom: 2px;">
              View Property →
            </a>
          </div>
        `

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          maxWidth: '260px',
        }).setHTML(popupHtml)

        const marker = new mapboxgl.Marker({ element: el })
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map.current!)

        markersRef.current.push(marker)
      })
    })

    return () => {
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
      map.current?.remove()
      map.current = null
    }
  }, [properties, mapboxToken])

  if (error) {
    return (
      <div className="border border-hairline p-10 text-center">
        <p className="text-muted text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="relative border border-hairline" style={{ height: '70vh', minHeight: '500px' }}>
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
}
