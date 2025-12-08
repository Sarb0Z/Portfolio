'use client'

import { useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface MobileNavProps {
  isExperiencePage?: boolean
}

const MobileNav = ({ isExperiencePage = false }: MobileNavProps) => {
  const [navShow, setNavShow] = useState(false)
  const pathname = usePathname()

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className={`p-2 rounded-lg transition-colors ${
          isExperiencePage
            ? 'hover:bg-white/10 text-white'
            : 'hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          navShow ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggleNav}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onToggleNav()
          }
        }}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 transform bg-white dark:bg-zinc-900 shadow-2xl transition-transform duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</span>
          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close Menu"
            onClick={onToggleNav}
          >
            <X size={24} className="text-gray-900 dark:text-gray-100" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-1">
            {headerNavLinks.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  onClick={onToggleNav}
                  className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    pathname === route.href
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {route.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <p className="font-semibold text-gray-900 dark:text-gray-100">Abdul Rafay Zahid</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileNav
