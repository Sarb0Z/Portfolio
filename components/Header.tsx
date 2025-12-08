'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const isExperiencePage = pathname === '/experience' || pathname === '/experience/'
  const openToWork = true

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`z-50 top-0 left-0 right-0 h-14 md:h-[4.1rem] border-b fixed w-full backdrop-blur hidden md:block ${
          isExperiencePage
            ? 'bg-[#0a0a1a]/90 border-white/10 text-white'
            : 'supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 bg-white/95 dark:bg-gray-950/95 border-gray-200 dark:border-gray-800'
        }`}
      >
        <div className="flex items-center justify-between h-full p-4 max-w-[95rem] mx-auto">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label={siteMetadata.headerTitle}
              className="text-3xl font-semibold tracking-wider md:text-4xl font-fuggles"
            >
              <span
                className={`text-5xl bg-clip-text text-transparent md:text-6xl ${
                  isExperiencePage
                    ? 'bg-gradient-to-r from-violet-400 to-pink-400'
                    : 'bg-gradient-to-r from-primary-500 to-gray-400'
                }`}
              >
                S
              </span>
              arbz
            </Link>
            {openToWork && (
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl px-2 gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500" />
                </span>
                <a href={`mailto:${siteMetadata.email}`} className="text-sm">
                  Open to work
                </a>
              </div>
            )}
          </div>
          <div className="flex space-x-4 items-center">
            <ul className="flex items-center">
              {headerNavLinks
                .filter((link) => link.href !== '/')
                .map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className={`relative inline-block px-3 py-1 text-lg tracking-wider rounded-lg group hover:bg-gray-200 dark:hover:bg-gray-800 ${
                        isExperiencePage ? 'text-white' : ''
                      }`}
                    >
                      <span
                        className={`absolute rounded-full -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-[3px] bg-black dark:bg-white opacity-0 group-hover:opacity-100 transition-opacity ${
                          pathname.startsWith(link.href) ? 'opacity-100' : ''
                        }`}
                      />
                      {link.title}
                    </Link>
                  </li>
                ))}
            </ul>
            <SearchButton />
            <ThemeSwitch />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav
        className={`z-50 top-0 left-0 right-0 h-14 border-b fixed w-full backdrop-blur md:hidden ${
          isExperiencePage
            ? 'bg-[#0a0a1a]/90 border-white/10 text-white'
            : 'supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 bg-white/95 dark:bg-gray-950/95 border-gray-200 dark:border-gray-800'
        }`}
      >
        <div className="flex items-center justify-between h-full px-4 mx-auto">
          <Link
            href="/"
            aria-label={siteMetadata.headerTitle}
            className="text-3xl font-semibold tracking-wider font-fuggles"
          >
            <span
              className={`text-5xl bg-clip-text text-transparent ${
                isExperiencePage
                  ? 'bg-gradient-to-r from-violet-400 to-pink-400'
                  : 'bg-gradient-to-r from-primary-500 to-gray-400'
              }`}
            >
              S
            </span>
            arbz
          </Link>
          <div className="flex items-center gap-2">
            <ThemeSwitch />
            <MobileNav isExperiencePage={isExperiencePage} />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
