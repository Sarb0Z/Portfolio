import { notFound } from 'next/navigation'
import { Metadata } from 'next'

import PageTitle from '@/components/PageTitle'
import { ArrowLink, Eyebrow } from '@/components/design'
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
  const items = bookmarkItems?.items || []

  return (
    <div className="max-w-prose">
      <div className="space-y-3 pb-10 pt-6">
        <Eyebrow>Bookmarks</Eyebrow>
        <PageTitle>{currentBookmark.title}</PageTitle>
        <p className="max-w-prose text-muted">
          {currentBookmark.count} {currentBookmark.count === 1 ? 'link' : 'links'} in this
          collection
        </p>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <div className="space-y-1.5 border-t hairline py-4">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[15px] font-medium hover:text-accent"
              >
                {item.title}
              </a>
              <p className="font-mono text-xs text-muted">
                {item.domain}
                {item.domain && ' · '}
                {item.created.slice(0, 10)}
              </p>
              {(item.excerpt || item.note) && (
                <p className="text-sm text-muted">{item.excerpt || item.note}</p>
              )}
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t hairline pt-6">
        <ArrowLink href="/bookmarks">Back to bookmarks</ArrowLink>
      </div>
    </div>
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
