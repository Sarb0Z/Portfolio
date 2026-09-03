import { ExperienceCard } from './experience-card'
import experienceData from '@/data/experienceData'

export function ExperienceTimeline() {
  return (
    <div>
      {experienceData.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  )
}
