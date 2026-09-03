'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { usePathname } from 'next/navigation'
import { Menu, Search, X } from 'lucide-react'
import { useKBar } from 'kbar'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const { query } = useKBar()

  useEffect(() => {
    setMounted(true)
  }, [])

  const onToggleNav = () => {
    setNavShow((status) => {
      document.body.style.overflow = status ? 'auto' : 'hidden'
      return !status
    })
  }

  useEffect(() => {
    if (!navShow) document.body.style.overflow = 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [navShow])

  const menu = (
    <div className="fixed inset-0 z-[70] flex flex-col bg-paper text-ink">
      <div className="flex h-16 items-center justify-between border-b hairline px-5">
        <span className="display text-2xl">Menu</span>
        <button
          className="rounded-full p-2 hover:text-accent"
          aria-label="Close Menu"
          onClick={onToggleNav}
        >
          <X size={22} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-5 py-6">
        <ul className="divide-y hairline">
          {headerNavLinks.map((route, i) => (
            <li key={route.href}>
              <Link
                href={route.href}
                onClick={onToggleNav}
                className={cn(
                  'flex items-baseline justify-between py-4',
                  pathname === route.href ? 'text-accent' : 'text-ink'
                )}
              >
                <span className="display text-3xl">{route.title}</span>
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t hairline px-5 py-4">
        <button
          type="button"
          onClick={() => {
            onToggleNav()
            query.toggle()
          }}
          className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent"
        >
          <Search size={14} />
          Jump to a page or post
        </button>
      </div>
      <div className="border-t hairline px-5 py-5 text-sm text-muted">
        <a href={`mailto:${siteMetadata.email}`} className="link-underline">
          {siteMetadata.email}
        </a>
        <span className="mx-2">&middot;</span>
        <a href="/resume.pdf" className="link-underline">
          Resume
        </a>
      </div>
    </div>
  )

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="rounded-full p-2 text-ink hover:text-accent"
      >
        <Menu size={22} />
      </button>
      {mounted && navShow && createPortal(menu, document.body)}
    </>
  )
}

export default MobileNav
