import { Fragment, ReactNode } from 'react'
import Link from './Link'
import { cn } from '@/lib/utils'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('eyebrow', className)}>{children}</p>
}

export function SectionHeading({
  index,
  title,
  aside,
  className,
}: {
  index?: string
  title: string
  aside?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-end justify-between border-t hairline pt-4', className)}>
      <div className="flex items-baseline gap-4">
        {index && (
          <span className="font-mono text-xs tabular-nums text-accent" aria-hidden>
            {index}
          </span>
        )}
        <h2 className="display text-2xl md:text-3xl">{title}</h2>
      </div>
      {aside && <div className="hidden text-sm text-muted sm:block">{aside}</div>}
    </div>
  )
}

export function Button({
  href,
  children,
  variant = 'primary',
  className,
}: {
  href: string
  children: ReactNode
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const base =
    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors'
  const styles =
    variant === 'primary'
      ? 'bg-ink text-paper hover:bg-accent hover:text-accent-ink'
      : 'border hairline text-ink hover:border-accent hover:text-accent'
  return (
    <Link href={href} className={cn(base, styles, className)}>
      {children}
    </Link>
  )
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent',
        className
      )}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        &rarr;
      </span>
    </Link>
  )
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-2xl tabular-nums tracking-tight text-ink md:text-[2rem]">
        {value}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  )
}

/* A key: value block in mono, the way a config file or `env` output reads. */
export function FactList({
  items,
  className,
}: {
  items: [string, ReactNode][]
  className?: string
}) {
  return (
    <dl
      className={cn(
        'grid grid-cols-[max-content_1fr] gap-x-5 gap-y-1.5 font-mono text-[13px] leading-relaxed',
        className
      )}
    >
      {items.map(([key, value]) => (
        <Fragment key={key}>
          <dt className="text-muted">
            {key}
            <span aria-hidden>:</span>
          </dt>
          <dd className="min-w-0 text-ink">{value}</dd>
        </Fragment>
      ))}
    </dl>
  )
}

export function Availability() {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      Open to work
    </span>
  )
}
