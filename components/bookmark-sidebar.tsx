'use client'

import { BookmarkIcon, ChevronRightIcon, FolderIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { Bookmark } from '@/lib/raindrop'

interface BookmarkSidebarProps {
  bookmarks: Bookmark[]
  className?: string
}

export const BookmarkSidebar = ({ bookmarks, className }: BookmarkSidebarProps) => {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'flex h-full w-full flex-col border-r border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50',
        className
      )}
    >
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          <BookmarkIcon size={16} />
          Collections
        </h2>
      </div>
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {bookmarks.map((bookmark) => {
            const isActive = pathname === `/bookmarks/${bookmark.slug}`
            return (
              <li key={bookmark._id}>
                <Link
                  href={`/bookmarks/${bookmark.slug}`}
                  className={cn(
                    'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200',
                    isActive
                      ? 'bg-primary-500 text-white shadow-sm dark:bg-primary-600'
                      : 'text-gray-700 hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-800/70'
                  )}
                >
                  <FolderIcon
                    size={18}
                    className={cn(
                      'shrink-0 transition-colors',
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400'
                    )}
                  />
                  <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                    <span className="truncate font-medium">{bookmark.title}</span>
                    <span
                      className={cn(
                        'text-xs',
                        isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'
                      )}
                    >
                      {bookmark.count} {bookmark.count === 1 ? 'bookmark' : 'bookmarks'}
                    </span>
                  </div>
                  <ChevronRightIcon
                    size={16}
                    className={cn(
                      'shrink-0 opacity-0 transition-all duration-200 group-hover:opacity-100',
                      isActive ? 'text-white opacity-100' : 'text-gray-400'
                    )}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      {bookmarks.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
          <FolderIcon size={32} className="mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">No collections yet</p>
        </div>
      )}
    </aside>
  )
}
