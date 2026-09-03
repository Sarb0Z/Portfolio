import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { Eyebrow } from '@/components/design'
import { getBookmarks } from '@/lib/raindrop'
import { sortByProperty } from '@/lib/utils'
import { genPageMetadata } from '@/app/seo'

export default async function BookmarksPage() {
  const bookmarks = await getBookmarks()
  const sortedBookmarks = sortByProperty(bookmarks || [], 'title') || []

  return (
    <div className="max-w-prose">
      <div className="space-y-3 pb-10 pt-6">
        <Eyebrow>Bookmarks</Eyebrow>
        <PageTitle>Things worth keeping</PageTitle>
        <p className="max-w-prose text-muted">
          Collections synced from Raindrop. Mostly systems, infrastructure, and tooling.
        </p>
      </div>
      {sortedBookmarks.length === 0 && <p className="text-muted">Nothing synced yet.</p>}
      <ul>
        {sortedBookmarks.map((bookmark) => (
          <li key={bookmark._id}>
            <div className="flex items-center justify-between border-t hairline py-3">
              <Link
                href={`/bookmarks/${bookmark.slug}`}
                className="display text-xl transition-colors hover:text-accent"
              >
                {bookmark.title}
              </Link>
              <span className="font-mono text-xs text-muted">{bookmark.count}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const metadata = genPageMetadata({
  title: 'Bookmarks',
  description: 'A curated selection of various handpicked bookmarks',
})
