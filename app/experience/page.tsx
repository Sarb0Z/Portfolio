import { ExperienceTimeline } from '@/components/experience'
import PageTitle from '@/components/PageTitle'
import { Eyebrow } from '@/components/design'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Experience',
  description: 'My professional journey through the tech industry',
})

export default function ExperiencePage() {
  return (
    <>
      <div className="rise max-w-3xl pb-12">
        <Eyebrow>Experience</Eyebrow>
        <div className="mt-3">
          <PageTitle>Where the work happened</PageTitle>
        </div>
        <p className="mt-5 text-lg text-muted">
          Three years across a zero-trust network platform, an email platform built solo, and the
          tooling under AI products.
        </p>
        <p className="mt-4 font-mono text-xs text-muted">Reverse chronological, YYYY-MM.</p>
      </div>
      <ExperienceTimeline />
    </>
  )
}
