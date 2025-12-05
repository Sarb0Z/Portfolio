'use client'

import { GalaxyBackground } from './galaxy-background'
import { TimelinePath } from './timeline-path'
import { ExperienceCard } from './experience-card'
import experienceData from '@/data/experienceData'

export function ExperienceTimeline() {
  return (
    <div className="relative min-h-screen">
      {/* Galaxy background - fixed, behind everything */}
      <GalaxyBackground />

      {/* Timeline container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        {/* Timeline path - hidden on mobile, visible on md+ */}
        <div className="hidden md:block">
          <TimelinePath experienceCount={experienceData.length} />
        </div>

        {/* Experience cards */}
        <div className="relative space-y-16 md:space-y-24">
          {experienceData.map((experience, index) => (
            <div key={experience.id} className="md:grid md:grid-cols-2 md:gap-16">
              {/* Left side */}
              {index % 2 === 0 ? (
                <>
                  <div className="md:pr-8">
                    <ExperienceCard experience={experience} position="left" index={index} />
                  </div>
                  <div className="hidden md:block" /> {/* Spacer */}
                </>
              ) : (
                <>
                  <div className="hidden md:block" /> {/* Spacer */}
                  <div className="md:pl-8">
                    <ExperienceCard experience={experience} position="right" index={index} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
