import { Button, Eyebrow } from '@/components/design'

export default function NotFound() {
  return (
    <div className="rise max-w-prose py-10">
      <Eyebrow>Error</Eyebrow>
      <p className="mt-3 font-mono text-7xl tabular-nums tracking-tight text-accent md:text-8xl">
        404
      </p>
      <h1 className="display mt-4 text-3xl md:text-5xl">No such page.</h1>
      <p className="mt-4 text-lg text-muted">
        The address may have moved, or it never existed. Everything on the site is reachable from
        the links below or the command palette.
      </p>
      <p className="mt-3 font-mono text-xs text-muted">
        <kbd className="kbd">⌘</kbd> <kbd className="kbd">K</kbd> opens the palette.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">Home</Button>
        <Button href="/projects" variant="ghost">
          Work
        </Button>
        <Button href="/blog" variant="ghost">
          Writing
        </Button>
      </div>
    </div>
  )
}
