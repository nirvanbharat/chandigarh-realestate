'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'nirvanbharat-saved'

function readSaved(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeSaved(ids: string[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  window.dispatchEvent(new Event('saved-changed'))
}

export function useSaved() {
  const [saved, setSaved] = useState<string[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setSaved(readSaved())
    setMounted(true)

    function sync() {
      setSaved(readSaved())
    }
    window.addEventListener('saved-changed', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('saved-changed', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const toggle = useCallback((id: string) => {
    const current = readSaved()
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id]
    writeSaved(next)
  }, [])

  const remove = useCallback((id: string) => {
    const current = readSaved()
    writeSaved(current.filter((x) => x !== id))
  }, [])

  const isSaved = useCallback(
    (id: string) => saved.includes(id),
    [saved]
  )

  return { saved, toggle, remove, isSaved, mounted }
}
