import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { Eyebrow } from '@/components/design'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className="max-w-prose">
      <div className="space-y-3 pb-10 pt-6">
        <Eyebrow>Topics</Eyebrow>
        <PageTitle>Tags</PageTitle>
      </div>
      {tagKeys.length === 0 && <p className="text-muted">No tags found.</p>}
      <ul>
        {sortedTags.map((t) => {
          return (
            <li key={t}>
              <div className="flex items-center justify-between border-t hairline py-3">
                <Link
                  href={`/tags/${slug(t)}`}
                  className="display text-xl transition-colors hover:text-accent"
                  aria-label={`View posts tagged ${t}`}
                >
                  {t}
                </Link>
                <span className="font-mono text-xs text-muted">{tagCounts[t]}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
