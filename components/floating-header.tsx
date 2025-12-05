'use client'

import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, ReactNode, useEffect, useMemo, useState } from 'react'
import Balancer from 'react-wrap-balancer'

import { MOBILE_SCROLL_THRESHOLD, SCROLL_AREA_ID } from '@/lib/constants'
import type { Bookmark } from '@/lib/raindrop'

interface FloatingHeaderProps {
  scrollTitle?: string
  title?: string
  goBackLink?: string
  bookmarks?: Bookmark[]
  currentBookmark?: Bookmark
  children?: ReactNode
}

export const FloatingHeader = memo(
  ({ scrollTitle, title, goBackLink, children }: FloatingHeaderProps) => {
    const [transformValues, setTransformValues] = useState({
      translateY: 0,
      opacity: scrollTitle ? 0 : 1,
    })
    const pathname = usePathname()
    const isWritingPath = pathname.startsWith('/writing')

    useEffect(() => {
      const scrollAreaElem = document.querySelector(`#${SCROLL_AREA_ID}`)

      const onScroll = (e: Event) => {
        const target = e.target as HTMLElement
        const scrollY = target.scrollTop

        const translateY = Math.max(100 - scrollY, 0)
        const opacity = Math.min(
          Math.max(
            Number(
              (
                (scrollY -
                  MOBILE_SCROLL_THRESHOLD * (MOBILE_SCROLL_THRESHOLD / (scrollY ** 2 / 100))) /
                100
              ).toFixed(2)
            ),
            0
          ),
          1
        )

        setTransformValues({ translateY, opacity })
      }

      if (scrollTitle) {
        scrollAreaElem?.addEventListener('scroll', onScroll, {
          passive: true,
        })
      }
      return () => scrollAreaElem?.removeEventListener('scroll', onScroll)
    }, [scrollTitle])

    const memoizedBalancer = useMemo(
      () => (
        <Balancer ratio={0.35}>
          <span className="line-clamp-2 font-semibold tracking-tight">{title}</span>
        </Balancer>
      ),
      [title]
    )

    return (
      <header className="sticky inset-x-0 top-0 z-10 mx-auto flex h-12 w-full shrink-0 items-center overflow-hidden border-b border-gray-200 bg-white/95 text-sm font-medium backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-700 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 lg:hidden">
        <div className="flex size-full items-center px-3">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-1 items-center gap-1">
              {goBackLink ? (
                <Link
                  href={goBackLink}
                  title="Go back"
                  className="shrink-0 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeftIcon size={16} />
                </Link>
              ) : (
                <Link
                  href="/"
                  className="shrink-0 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <ArrowLeftIcon size={16} />
                </Link>
              )}
              <div className="flex flex-1 items-center justify-between">
                {scrollTitle && (
                  <span
                    className="line-clamp-2 font-semibold tracking-tight text-gray-900 dark:text-gray-100"
                    style={{
                      transform: `translateY(${transformValues.translateY}%)`,
                      opacity: transformValues.opacity,
                    }}
                  >
                    {scrollTitle}
                  </span>
                )}
                {title && memoizedBalancer}
              </div>
            </div>
            {/* This is a hack to show writing views with framer motion reveal effect */}
            {scrollTitle && isWritingPath && (
              <div className="flex min-w-[50px] justify-end">{children}</div>
            )}
          </div>
        </div>
      </header>
    )
  }
)
FloatingHeader.displayName = 'FloatingHeader'
