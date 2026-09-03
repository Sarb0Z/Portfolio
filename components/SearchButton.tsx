'use client'

import { useEffect, useState } from 'react'
import { useKBar } from 'kbar'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SearchButton({
  className,
  showHint = true,
}: {
  className?: string
  showHint?: boolean
}) {
  const { query } = useKBar()
  const [modKey, setModKey] = useState('⌘')

  useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) setModKey('Ctrl')
  }, [])

  return (
    <button
      type="button"
      onClick={query.toggle}
      aria-label="Open command palette"
      title="Command palette"
      className={cn(
        'inline-flex items-center gap-2 rounded-full p-2 text-muted transition-colors hover:text-accent',
        className
      )}
    >
      <Search size={18} />
      {showHint && (
        <span className="hidden items-center gap-0.5 lg:inline-flex">
          <kbd className="kbd">{modKey}</kbd>
          <kbd className="kbd">K</kbd>
        </span>
      )}
    </button>
  )
}
