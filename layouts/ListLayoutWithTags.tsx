/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import PageTitle from '@/components/PageTitle'
import { Eyebrow } from '@/components/design'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="border-t hairline pt-6">
      <nav className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.1em] text-muted">
        {!prevPage && <span className="cursor-not-allowed opacity-40">Previous</span>}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="text-ink transition-colors hover:text-accent"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} / {totalPages}
        </span>
        {!nextPage && <span className="cursor-not-allowed opacity-40">Next</span>}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="text-ink transition-colors hover:text-accent"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = pathname.split('/tags/')[1]

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const displayTitle = title === 'All Posts' ? 'Writing' : title

  return (
    <div>
      <div className="space-y-3 pb-10 pt-6">
        <Eyebrow>Writing</Eyebrow>
        <PageTitle>{displayTitle}</PageTitle>
        <p className="max-w-prose text-muted">
          Notes on systems, infrastructure, and the plumbing under AI products.
        </p>
        <p className="font-mono text-xs text-muted">
          {displayPosts.length} of {posts.length} posts
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_16rem]">
        <div>
          <ul>
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path}>
                  <article className="grid gap-2 border-t hairline py-6 md:grid-cols-[9rem_1fr] md:gap-8">
                    <div className="font-mono text-xs tabular-nums text-muted">
                      <time dateTime={date}>{date.slice(0, 10)}</time>
                    </div>
                    <div className="space-y-2">
                      <Link
                        href={`/${path}`}
                        className="display block text-2xl transition-colors hover:text-accent md:text-3xl"
                      >
                        {title}
                      </Link>
                      {summary && <p className="text-muted">{summary}</p>}
                      {tags && tags.length > 0 && (
                        <div className="flex flex-wrap pt-1">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Topics</Eyebrow>
          <ul className="mt-4 space-y-2 font-mono text-xs">
            {sortedTags.map((t) => {
              const isActive = activeTag === slug(t)
              return (
                <li key={t}>
                  {isActive ? (
                    <span className="text-accent">
                      {t} ({tagCounts[t]})
                    </span>
                  ) : (
                    <Link
                      href={`/tags/${slug(t)}`}
                      className="text-muted transition-colors hover:text-accent"
                      aria-label={`View posts tagged ${t}`}
                    >
                      {t} ({tagCounts[t]})
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
