'use client'

import { useState, useEffect, useCallback, ReactNode } from 'react'
import dynamic from 'next/dynamic'
import type { SearchConfig } from 'pliny/search'

// Dynamically import SearchProvider - only loads when triggered
const SearchProvider = dynamic(() => import('pliny/search').then((mod) => mod.SearchProvider), {
  ssr: false,
})

interface LazySearchProviderProps {
  children: ReactNode
  searchConfig: SearchConfig
}

export function LazySearchProvider({ children, searchConfig }: LazySearchProviderProps) {
  const [isSearchLoaded, setIsSearchLoaded] = useState(false)

  // Load search on keyboard shortcut (Cmd/Ctrl + K) or first interaction
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsSearchLoaded(true)
    }
  }, [])

  const handleInteraction = useCallback(() => {
    if (!isSearchLoaded) {
      setIsSearchLoaded(true)
    }
  }, [isSearchLoaded])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    // Load on first click/touch anywhere (user is engaged)
    document.addEventListener('click', handleInteraction, { once: true })
    document.addEventListener('touchstart', handleInteraction, { once: true })

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [handleKeyDown, handleInteraction])

  if (isSearchLoaded) {
    return <SearchProvider searchConfig={searchConfig}>{children}</SearchProvider>
  }

  // Render children without search functionality until loaded
  return <>{children}</>
}
