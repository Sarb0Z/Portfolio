import { ReactNode } from 'react'

import { BookmarkSidebar } from '@/components/bookmark-sidebar'
import { getBookmarks } from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'

interface BookmarksLayoutProps {
  children: ReactNode
}

export default async function BookmarksLayout({ children }: BookmarksLayoutProps) {
  const bookmarks = await getBookmarks()
  const sortedBookmarks = sortByProperty(bookmarks || [], 'title') || []

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Sidebar - hidden on mobile, shown on lg+ */}
      <div className="hidden w-72 shrink-0 lg:block">
        <BookmarkSidebar bookmarks={sortedBookmarks} />
      </div>
      {/* Main content area */}
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
}
