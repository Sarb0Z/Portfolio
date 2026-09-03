'use client'

import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-paper/80 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      <div className="mx-auto flex h-16 w-full max-w-site items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-baseline gap-3">
          <span className="display text-xl leading-none sm:text-2xl">Abdul Rafay Zahid</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted lg:inline">
            Backend &amp; systems
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.title}
                  href={link.href}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-colors hover:text-accent',
                    active ? 'bg-line/10 text-ink' : 'text-muted'
                  )}
                >
                  {link.title}
                </Link>
              )
            })}
          <div className="ml-3 flex items-center gap-1 border-l hairline pl-3 text-muted">
            <SearchButton />
            <span className="[&>button]:rounded-full [&>button]:p-2 [&>button]:transition-colors [&>button:hover]:text-accent [&_svg]:h-[18px] [&_svg]:w-[18px]">
              <ThemeSwitch />
            </span>
          </div>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <SearchButton showHint={false} />
          <span className="[&>button]:rounded-full [&>button]:p-2 [&_svg]:h-[18px] [&_svg]:w-[18px]">
            <ThemeSwitch />
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
