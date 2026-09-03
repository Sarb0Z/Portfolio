import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Image from '@/components/Image'
import { Eyebrow, ArrowLink } from '@/components/design'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}
export default function PostSimple({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { slug, date, title, tags, summary } = content

  return (
    <SectionContainer>
      <div className="hidden md:block">
        <ScrollTopAndComment />
      </div>
      <article className="mx-auto max-w-prose">
        <header className="space-y-3 pb-8">
          <Eyebrow>
            <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            {tags && tags.length > 0 && ` · ${tags.join(' · ')}`}
          </Eyebrow>
          <PageTitle>{title}</PageTitle>
          {summary && <p className="text-lg text-muted">{summary}</p>}
        </header>
        <div className="border-t hairline pt-8">
          <div className="prose dark:prose-invert">{children}</div>
        </div>
        {siteMetadata.comments && (
          <div className="pb-6 pt-6" id="comment">
            <Comments slug={slug} />
          </div>
        )}
        <footer className="mt-10 space-y-8 border-t hairline pt-8">
          {(prev?.path || next?.path) && (
            <div className="flex items-center justify-between">
              {prev?.path ? (
                <Link
                  href={`/${prev.path}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent"
                  aria-label={`Previous post: ${prev.title}`}
                >
                  <span aria-hidden>&larr;</span> {prev.title}
                </Link>
              ) : (
                <span />
              )}
              {next?.path && <ArrowLink href={`/${next.path}`}>{next.title}</ArrowLink>}
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              {authorDetails.map((author) => (
                <div className="flex items-center gap-2" key={author.name}>
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      width={32}
                      height={32}
                      alt="avatar"
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-muted">
                    {author.name}
                    {author.linkedin && (
                      <>
                        {' '}
                        &middot;{' '}
                        <Link href={author.linkedin} className="hover:text-accent">
                          LinkedIn
                        </Link>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
            <ArrowLink href="/blog">Back to writing</ArrowLink>
          </div>
        </footer>
      </article>
    </SectionContainer>
  )
}
