import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { Metadata } from 'next'

import { BookmarkList } from '@/components/bookmark-list'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { ScreenLoadingSpinner } from '@/components/screen-loading-spinner'
import { ScrollArea } from '@/components/scroll-area'
import {
  getBookmarkItems,
  getBookmarks,
  type Bookmark,
  type BookmarkItemsResponse,
} from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'

interface PageProps {
  params: { slug: string }
}

export const dynamicParams = false
export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
  const bookmarks = await getBookmarks()
  // For static export without API access, return a placeholder to satisfy Next.js
  // The page will show "not found" for this placeholder slug
  if (!bookmarks || bookmarks.length === 0) {
    return [{ slug: '_placeholder' }]
  }
  return bookmarks.map((bookmark) => ({ slug: bookmark.slug }))
}

async function fetchData(slug: string): Promise<{
  bookmarks: Bookmark[]
  currentBookmark: Bookmark
  bookmarkItems: BookmarkItemsResponse | null
}> {
  const bookmarks = await getBookmarks()
  if (!bookmarks) notFound()

  const currentBookmark = bookmarks.find((bookmark) => bookmark.slug === slug)
  if (!currentBookmark) notFound()

  const sortedBookmarks = sortByProperty(bookmarks, 'title') || []
  const bookmarkItems = await getBookmarkItems(currentBookmark._id)

  return {
    bookmarks: sortedBookmarks,
    currentBookmark,
    bookmarkItems,
  }
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = params
  const { currentBookmark, bookmarkItems } = await fetchData(slug)

  return (
    <ScrollArea className="h-full bg-white dark:bg-gray-950" useScrollAreaId>
      {/* Mobile header - hidden on desktop since we have sidebar */}
      <FloatingHeader scrollTitle={currentBookmark.title} goBackLink="/bookmarks" />

      <div className="@container p-4 md:p-6 lg:p-8">
        {/* Page title - visible on all sizes but styled differently */}
        <div className="mb-6 lg:mb-8">
          <PageTitle title={currentBookmark.title} className="text-xl lg:text-2xl" />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {currentBookmark.count} {currentBookmark.count === 1 ? 'bookmark' : 'bookmarks'} in this
            collection
          </p>
        </div>

        <Suspense fallback={<ScreenLoadingSpinner />}>
          <BookmarkList id={currentBookmark._id} initialData={bookmarkItems} />
        </Suspense>
      </div>
    </ScrollArea>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata | null> {
  const { slug } = params
  const bookmarks = await getBookmarks()
  if (!bookmarks) return null

  const currentBookmark = bookmarks.find((bookmark) => bookmark.slug === slug)
  if (!currentBookmark) return null

  const siteUrl = `/bookmarks/${currentBookmark.slug}`
  const seoTitle = `${currentBookmark.title} | Bookmarks`
  const seoDescription = `A curated selection of various handpicked ${currentBookmark.title.toLowerCase()} bookmarks`

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      currentBookmark.title,
      'bookmarks',
      `${currentBookmark.title} bookmarks`,
      'collection',
      `${currentBookmark.title} collection`,
    ],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: siteUrl,
    },
    alternates: {
      canonical: siteUrl,
    },
  }
}
