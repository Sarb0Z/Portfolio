import { ExperienceTimeline } from '@/components/experience'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Experience',
  description: 'My professional journey through the tech industry',
})

export default function ExperiencePage() {
  return (
    <div className="relative">
      {/* Cosmic header */}
      <div className="relative z-20 pt-6 pb-8 md:pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          <p className="mt-4 text-lg text-starlight-dim max-w-2xl">
            Shipped an enterprise networking solution to customers with tens of millions of users.
            Here's my journey through the tech cosmos.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <ExperienceTimeline />
    </div>
  )
}
