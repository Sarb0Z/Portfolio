'use client'

import { useState } from 'react'
import { ExperienceData, experienceTypeConfig } from '@/data/experienceData'
import Link from '@/components/Link'

interface ExperienceCardProps {
  experience: ExperienceData
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// "June 2024" -> "2024-06"; missing or "Present" -> "now"
function yearMonth(value?: string) {
  if (!value || value === 'Present') return 'now'
  const [month, year] = value.split(' ')
  const index = MONTHS.indexOf(month)
  if (index === -1 || !year) return value
  return `${year}-${String(index + 1).padStart(2, '0')}`
}

// Parse text with [url] syntax into JSX, rendering the captured URL as a small arrow link
function parseLinksInText(text: string) {
  const urlRegex = /\[([^\]]+)\]/g
  const parts = text.split(urlRegex)

  return parts.map((part, i) => {
    // Every odd index is a captured URL
    if (i % 2 === 1) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted transition-colors hover:text-accent"
        >
          ↗
        </a>
      )
    }
    return part
  })
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const config = experienceTypeConfig[experience.type]
  const showToggle = experience.achievements.length > 3
  const visibleAchievements = isExpanded
    ? experience.achievements
    : experience.achievements.slice(0, 3)
  const dateRange = `${yearMonth(experience.startDate)} to ${yearMonth(experience.endDate)}`

  return (
    <div className="grid gap-4 border-t hairline py-10 md:grid-cols-[11rem_1fr] md:gap-10">
      <div className="flex flex-col gap-2 md:sticky md:top-28 md:self-start">
        <span className="font-mono text-xs tabular-nums text-ink">{dateRange}</span>
        <span className="font-mono text-xs text-muted">{config.label.toLowerCase()}</span>
        {experience.location.toLowerCase() !== config.label.toLowerCase() && (
          <span className="font-mono text-xs text-muted">{experience.location.toLowerCase()}</span>
        )}
      </div>

      <div>
        <h2 className="display text-2xl md:text-3xl">{experience.title}</h2>
        {experience.href ? (
          <Link href={experience.href} className="link-underline text-muted">
            {experience.company}
          </Link>
        ) : (
          <p className="text-muted">{experience.company}</p>
        )}

        <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-ink/85 marker:text-muted">
          {visibleAchievements.map((achievement, i) => (
            <li key={i}>{parseLinksInText(achievement)}</li>
          ))}
        </ul>

        {showToggle && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="mt-3 font-mono text-xs text-accent underline-offset-4 hover:underline"
          >
            {isExpanded ? '- show less' : `+ ${experience.achievements.length - 3} more`}
          </button>
        )}

        <p className="mt-4 font-mono text-xs text-muted">
          stack: {experience.techStack.join(', ')}
        </p>
      </div>
    </div>
  )
}
