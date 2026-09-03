'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useKBar,
  useMatches,
  useRegisterActions,
  type Action,
} from 'kbar'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import projectsData from '@/data/projectsData'
import { cn } from '@/lib/utils'

interface SearchDoc {
  path: string
  title: string
  summary?: string
  date: string
  tags?: string[]
}

const NAV_KEYS: Record<string, string> = {
  '/': 'h',
  '/projects': 'w',
  '/blog': 'b',
  '/experience': 'e',
  '/about': 'a',
  '/bookmarks': 'k',
}

/* Posts are registered lazily, the first time the palette opens. */
function PostActions() {
  const router = useRouter()
  const [actions, setActions] = useState<Action[]>([])
  const { visible } = useKBar((state) => ({ visible: state.visualState !== 'hidden' }))

  useEffect(() => {
    if (!visible || actions.length > 0) return
    let cancelled = false
    fetch('/search.json')
      .then((res) => res.json())
      .then((docs: SearchDoc[]) => {
        if (cancelled) return
        setActions(
          docs.map((doc) => ({
            id: `post:${doc.path}`,
            name: doc.title,
            subtitle: doc.date.slice(0, 10),
            keywords: [doc.summary ?? '', ...(doc.tags ?? [])].join(' '),
            section: 'Writing',
            perform: () => router.push(`/${doc.path}`),
          }))
        )
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [visible, actions.length, router])

  useRegisterActions(actions, [actions])
  return null
}

function ThemeAction() {
  const { theme, setTheme } = useTheme()
  const action = useMemo<Action>(
    () => ({
      id: 'theme',
      name: theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
      shortcut: ['t'],
      keywords: 'theme dark light',
      section: 'Site',
      perform: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    }),
    [theme, setTheme]
  )
  useRegisterActions([action], [action])
  return null
}

function Results() {
  const { results } = useMatches()
  if (results.length === 0) {
    return (
      <p className="px-4 py-8 text-center font-mono text-xs text-muted">
        No match. Try a page name, a post title, or a tag.
      </p>
    )
  }
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="eyebrow px-4 pb-2 pt-5">{item}</div>
        ) : (
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between gap-4 px-4 py-2.5 text-sm transition-colors',
              active ? 'bg-accent/10 text-ink' : 'text-ink/80'
            )}
          >
            <div className="flex min-w-0 items-baseline gap-3">
              <span className="truncate">{item.name}</span>
              {item.subtitle && (
                <span className="shrink-0 font-mono text-[11px] text-muted">{item.subtitle}</span>
              )}
            </div>
            {item.shortcut?.length ? (
              <span className="hidden shrink-0 gap-1 sm:flex">
                {item.shortcut.map((key) => (
                  <kbd key={key} className="kbd">
                    {key}
                  </kbd>
                ))}
              </span>
            ) : null}
          </div>
        )
      }
    />
  )
}

export default function CommandPalette({ children }: { children: ReactNode }) {
  const router = useRouter()

  const actions = useMemo<Action[]>(() => {
    const pages: Action[] = headerNavLinks.map((link) => ({
      id: `page:${link.href}`,
      name: link.title,
      shortcut: ['g', NAV_KEYS[link.href] ?? ''].filter(Boolean),
      keywords: `go ${link.title.toLowerCase()}`,
      section: 'Pages',
      perform: () => router.push(link.href),
    }))
    const links: Action[] = [
      {
        id: 'resume',
        name: 'Resume (PDF)',
        keywords: 'cv resume pdf',
        section: 'Links',
        perform: () => window.open('/resume.pdf', '_blank', 'noopener'),
      },
      {
        id: 'github',
        name: 'GitHub',
        subtitle: 'github.com/Sarb0Z',
        keywords: 'github code repos',
        section: 'Links',
        perform: () => window.open(siteMetadata.github ?? '', '_blank', 'noopener'),
      },
      {
        id: 'linkedin',
        name: 'LinkedIn',
        keywords: 'linkedin profile',
        section: 'Links',
        perform: () => window.open(siteMetadata.linkedin ?? '', '_blank', 'noopener'),
      },
      {
        id: 'email',
        name: 'Email',
        subtitle: siteMetadata.email,
        keywords: 'email contact mail hire',
        section: 'Links',
        perform: () => window.location.assign(`mailto:${siteMetadata.email}`),
      },
    ]
    const work: Action[] = projectsData.map((project) => ({
      id: `work:${project.id}`,
      name: project.title,
      subtitle: project.label,
      keywords: [project.blurb, project.kind, ...project.stack].join(' '),
      section: 'Work',
      perform: () =>
        project.href.startsWith('http')
          ? window.open(project.href, '_blank', 'noopener')
          : router.push(project.href),
    }))
    return [...pages, ...work, ...links]
  }, [router])

  return (
    <KBarProvider actions={actions} options={{ enableHistory: false }}>
      <PostActions />
      <ThemeAction />
      <KBarPortal>
        <KBarPositioner className="z-[80] bg-paper/70 p-4 backdrop-blur-sm">
          <KBarAnimator className="w-full max-w-xl overflow-hidden rounded-lg border hairline bg-surface text-ink shadow-2xl shadow-ink/10">
            <div className="flex items-center gap-3 border-b hairline px-4">
              <span aria-hidden className="font-mono text-sm text-accent">
                $
              </span>
              <KBarSearch
                defaultPlaceholder="Jump to a page, post, or link"
                className="h-12 w-full border-0 bg-transparent p-0 font-mono text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-0"
              />
              <kbd className="kbd hidden sm:inline-flex">esc</kbd>
            </div>
            <div className="max-h-[60vh] overflow-y-auto pb-2">
              <Results />
            </div>
            <div className="flex items-center justify-between border-t hairline px-4 py-2 font-mono text-[11px] text-muted">
              <span>
                <kbd className="kbd">&uarr;</kbd> <kbd className="kbd">&darr;</kbd> move
                <span className="mx-2">&middot;</span>
                <kbd className="kbd">&crarr;</kbd> open
              </span>
              <span className="hidden sm:inline">
                <kbd className="kbd">g</kbd> then a letter to jump
              </span>
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  )
}
