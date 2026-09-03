import { ArrowLink, Eyebrow } from '@/components/design'

export default function NotFound() {
  return (
    <div className="max-w-prose space-y-6 pb-10 pt-6">
      <Eyebrow>Bookmarks</Eyebrow>
      <h1 className="display text-4xl leading-[1.05] md:text-6xl">No such collection.</h1>
      <ArrowLink href="/bookmarks">Back to bookmarks</ArrowLink>
    </div>
  )
}
