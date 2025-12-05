import Link from 'next/link'
import { Suspense } from 'react'
import { BookmarkIcon, FolderIcon, ChevronRightIcon } from 'lucide-react'

import { FloatingHeader } from '@/components/floating-header'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { ScrollArea } from '@/components/scroll-area'
import { getBookmarks, type Bookmark } from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'
import { genPageMetadata } from '@/app/seo'

async function fetchData(): Promise<{ bookmarks: Bookmark[] }> {
  const bookmarks = await getBookmarks()
  const sortedBookmarks = sortByProperty(bookmarks || [], 'title') || []
  return { bookmarks: sortedBookmarks }
}

export default async function BookmarksPage() {
  const { bookmarks } = await fetchData()
  const totalBookmarks = bookmarks.reduce((acc, b) => acc + b.count, 0)

  return (
    <>
      {/* Mobile view - shows list of collections */}
      <ScrollArea className="h-full lg:hidden">
        <FloatingHeader title="Bookmarks" />
        <Suspense fallback={<ScreenLoadingSpinner />}>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {bookmarks?.map((bookmark) => {
              return (
                <Link
                  key={bookmark._id}
                  href={`/bookmarks/${bookmark.slug}`}
                  className="flex items-center gap-3 px-4 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <FolderIcon size={20} className="shrink-0 text-gray-400" />
                  <div className="flex flex-1 flex-col gap-0.5">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {bookmark.title}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {bookmark.count} {bookmark.count === 1 ? 'bookmark' : 'bookmarks'}
                    </span>
                  </div>
                  <ChevronRightIcon size={18} className="text-gray-400" />
                </Link>
              )
            })}
          </div>
        </Suspense>
      </ScrollArea>

      {/* Desktop view - shows welcome message with stats */}
      <div className="hidden h-full flex-col items-center justify-center bg-gray-50/30 p-8 dark:bg-gray-900/30 lg:flex">
        <div className="flex max-w-md flex-col items-center text-center">
          <div className="mb-6 rounded-full bg-primary-100 p-4 dark:bg-primary-900/30">
            <BookmarkIcon size={32} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">My Bookmarks</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            A curated collection of useful resources, articles, and tools I&apos;ve discovered.
          </p>
          <div className="mb-8 flex gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {bookmarks.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Collections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {totalBookmarks}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Bookmarks</div>
            </div>
          </div>
          {bookmarks.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ← Select a collection from the sidebar to browse
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export const metadata = genPageMetadata({
  title: 'Bookmarks',
  description: 'A curated selection of various handpicked bookmarks',
})
