import Link from './Link'
import Cover from './Cover'
import { ArrowLink } from './design'
import type { Project } from '@/data/projectsData'
import { cn } from '@/lib/utils'

function linkLabel(project: Project) {
  return project.href.startsWith('http') ? 'View on GitHub' : 'Read more'
}

/* Featured row: the headline number set large, a diagram, the story. */
export function ProjectRow({ project, flip = false }: { project: Project; flip?: boolean }) {
  return (
    <article className="group grid gap-6 border-t hairline py-10 md:grid-cols-12 md:gap-10">
      <div className={cn('md:col-span-5', flip && 'md:order-2')}>
        <Link href={project.href} aria-label={project.title}>
          <Cover variant={project.cover} />
        </Link>
      </div>
      <div className={cn('flex flex-col md:col-span-7', flip && 'md:order-1')}>
        <p className="font-mono text-xs text-muted">
          {project.year}
          <span className="mx-2 text-line/40">/</span>
          {project.kind.toLowerCase()}
        </p>
        <p className="mt-3 font-mono text-3xl tabular-nums tracking-tight text-accent md:text-4xl">
          {project.label}
        </p>
        <h3 className="display mt-2 text-2xl md:text-3xl">
          <Link href={project.href} className="transition-colors hover:text-accent">
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/85">{project.description}</p>
        <p className="mt-4 font-mono text-xs text-muted">stack: {project.stack.join(', ')}</p>
        <ArrowLink href={project.href} className="mt-4">
          {linkLabel(project)}
        </ArrowLink>
      </div>
    </article>
  )
}

/*
 * Log listing: one line per project the way `ls -l` reads (year, kind, name, blurb, the
 * number), expanding in place to the diagram and the full story. Native <details>, so it
 * works without JavaScript and is keyboard accessible for free.
 */
export function ProjectLog({
  projects,
  openIds = [],
}: {
  projects: Project[]
  openIds?: string[]
}) {
  return (
    <ol className="border-t hairline">
      {projects.map((project) => (
        <li key={project.id} className="border-b hairline">
          <details open={openIds.includes(project.id)} className="group/row">
            <summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-baseline gap-x-4 py-4 [&::-webkit-details-marker]:hidden md:grid-cols-[3.5rem_6.5rem_1fr_auto_1rem]">
              <span className="font-mono text-xs tabular-nums text-muted">{project.year}</span>
              <span className="hidden font-mono text-xs text-muted md:inline">
                {project.kind.toLowerCase()}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-medium leading-snug text-ink transition-colors group-hover/row:text-accent">
                  {project.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted">{project.blurb}</span>
              </span>
              <span className="hidden font-mono text-xs tabular-nums text-accent sm:inline">
                {project.label}
              </span>
              <span
                aria-hidden
                className="hidden justify-self-end font-mono text-xs text-muted transition-transform group-open/row:rotate-90 md:inline"
              >
                &rsaquo;
              </span>
            </summary>
            <div className="grid gap-6 pb-8 md:grid-cols-12 md:gap-10 md:pl-[11rem]">
              <div className="md:col-span-5">
                <Cover variant={project.cover} label={project.label} />
              </div>
              <div className="md:col-span-7">
                <p className="text-[15px] leading-relaxed text-ink/85">{project.description}</p>
                <p className="mt-4 font-mono text-xs text-muted">
                  stack: {project.stack.join(', ')}
                </p>
                <ArrowLink href={project.href} className="mt-4">
                  {linkLabel(project)}
                </ArrowLink>
              </div>
            </div>
          </details>
        </li>
      ))}
    </ol>
  )
}
