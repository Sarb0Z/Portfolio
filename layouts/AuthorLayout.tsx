import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import { Eyebrow, FactList } from '@/components/design'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, linkedin, github } = content

  return (
    <div>
      <div className="rise max-w-3xl pb-12">
        <Eyebrow>About</Eyebrow>
        <div className="mt-3">
          <PageTitle>{name}</PageTitle>
        </div>
        <p className="mt-4 text-lg text-muted">
          {occupation}
          {company ? `, ${company}` : ''}
        </p>
      </div>
      <div className="grid gap-12 border-t hairline pt-10 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            {avatar && (
              <Image
                src={avatar}
                alt={name}
                width={894}
                height={974}
                className="w-full max-w-xs rounded-lg border hairline grayscale transition duration-500 hover:grayscale-0"
              />
            )}
            <FactList
              className="mt-6 max-w-xs"
              items={[
                ['base', 'Karachi, Pakistan, UTC+5'],
                ['hours', 'Gulf (GMT+4) and EU mornings'],
                ['open to', 'remote via EOR or contract, sponsored relocation'],
                ['degree', 'BS Computer Science, FAST NUCES, 2024'],
                ['experience', 'about three years'],
              ]}
            />
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <a href="/resume.pdf" className="link-underline">
                  Resume (PDF)
                </a>
              </li>
              <li>
                <Link href={github ?? ''} className="link-underline">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href={linkedin ?? ''} className="link-underline">
                  LinkedIn
                </Link>
              </li>
              <li>
                <a href={`mailto:${email}`} className="link-underline">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </aside>
        <div className="prose dark:prose-invert lg:col-span-8">{children}</div>
      </div>
    </div>
  )
}
