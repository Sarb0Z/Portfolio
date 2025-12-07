import { ExperienceTimeline } from '@/components/experience'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Experience',
  description: 'My professional journey through the tech industry',
})

export default function ExperiencePage() {
  return (
    <div className="relative h-screen overflow-y-auto bg-cosmic-900 snap-y snap-mandatory scroll-smooth">
      {/* Cosmic header - always dark theme for consistency */}
      <div className="relative z-20 pt-6 pb-8 md:pb-12 px-4 bg-gradient-to-b from-cosmic-900 via-cosmic-900/95 to-transparent snap-start">
        <div className="max-w-6xl mx-auto">
          {/* Decorative stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-4 left-10 w-1 h-1 bg-white rounded-full opacity-60" />
            <div className="absolute top-8 left-1/4 w-1.5 h-1.5 bg-violet-300 rounded-full opacity-50" />
            <div className="absolute top-6 right-20 w-1 h-1 bg-pink-300 rounded-full opacity-40" />
            <div className="absolute top-12 right-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-70" />
          </div>

          <h1 className="relative text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
              Experience
            </span>
            {/* Subtle glow effect behind text */}
            <span className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-pink-400/20 to-blue-400/20 blur-2xl -z-10" />
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl relative z-10">
            Shipped an enterprise networking solution to customers with tens of millions of users.
            Here&apos;s my journey through the tech cosmos.
          </p>

          {/* Decorative line */}
          <div className="mt-6 h-px w-32 bg-gradient-to-r from-violet-500 via-pink-500 to-transparent" />
        </div>
      </div>

      {/* Timeline */}
      <ExperienceTimeline />
    </div>
  )
}
