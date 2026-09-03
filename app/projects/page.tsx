import projectsData from '@/data/projectsData'
import { ProjectLog } from '@/components/ProjectRow'
import PageTitle from '@/components/PageTitle'
import { Eyebrow } from '@/components/design'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Work',
  description: 'Selected systems, infrastructure, and side projects by Abdul Rafay Zahid.',
})

export default function Projects() {
  const featuredIds = projectsData.filter((p) => p.featured).map((p) => p.id)
  return (
    <>
      <div className="rise max-w-3xl pb-12">
        <Eyebrow>Work</Eyebrow>
        <div className="mt-3">
          <PageTitle>Things that had to hold up</PageTitle>
        </div>
        <p className="mt-5 text-lg text-muted">
          A gateway that took 25x its original load, an email platform built alone, and the smaller
          pieces that taught me the rest. Hardest and lowest-level first.
        </p>
        <p className="mt-4 font-mono text-xs text-muted">
          {projectsData.length} entries. Click a row to expand it.
        </p>
      </div>
      <ProjectLog projects={projectsData} openIds={featuredIds} />
    </>
  )
}
