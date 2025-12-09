'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ExperienceData, experienceTypeConfig } from '@/data/experienceData'
import { LazyDevIcon, getLazyIcon } from '@/components/LazyDevIcon'
import { cn } from '@/lib/utils'

interface ExperienceCardProps {
  experience: ExperienceData
  position: 'left' | 'right'
  index: number
}

// Parse text with [url] syntax into JSX with links
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
          className="text-violet-400 hover:text-violet-300 underline underline-offset-2"
        >
          ↗
        </a>
      )
    }
    return part
  })
}

export function ExperienceCard({ experience, position, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const prefersReducedMotion = useReducedMotion()

  const config = experienceTypeConfig[experience.type]
  const showExpandButton = experience.achievements.length > 3
  const visibleAchievements = isExpanded
    ? experience.achievements
    : experience.achievements.slice(0, 3)

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : position === 'left' ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('w-full max-w-lg', position === 'left' ? 'mr-auto' : 'ml-auto')}
    >
      <div
        className={cn(
          'relative p-6 rounded-2xl',
          'bg-cosmic-800/60 backdrop-blur-md',
          'border border-white/10',
          config.accentColor,
          'shadow-glow-md hover:shadow-glow-lg transition-shadow duration-300'
        )}
      >
        {/* Type badge with gradient */}
        <div
          className={cn(
            'absolute -top-3 left-4 px-3 py-1.5 rounded-full text-xs font-semibold',
            config.badgeGradient,
            'text-white shadow-lg',
            'border border-white/20'
          )}
        >
          <span className="drop-shadow-sm">{config.label}</span>
        </div>

        {/* Header */}
        <div className="mt-2 mb-4">
          <h3 className="text-xl font-bold text-starlight">{experience.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            {experience.href ? (
              <a
                href={experience.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 font-medium"
              >
                {experience.company} ↗
              </a>
            ) : (
              <span className="text-starlight-dim font-medium">{experience.company}</span>
            )}
            <span className="text-starlight-dim">•</span>
            <span className="text-starlight-dim">{experience.location}</span>
          </div>
          <p className="text-sm text-starlight-dim mt-1">
            {experience.startDate} — {experience.endDate || 'Present'}
          </p>
        </div>

        {/* Achievements */}
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-2 mb-4"
        >
          {visibleAchievements.map((achievement, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="flex items-start gap-2 text-sm text-starlight/80"
            >
              <span
                className={cn(
                  'mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0',
                  config.textColor.replace('text-', 'bg-')
                )}
              />
              <span>{parseLinksInText(achievement)}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Expand button */}
        {showExpandButton && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              'text-sm font-medium mb-4',
              config.textColor,
              'hover:underline underline-offset-2'
            )}
          >
            {isExpanded ? 'Show less' : `Show ${experience.achievements.length - 3} more`}
          </button>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {experience.techStack.map((tech) => {
            const hasIcon = getLazyIcon(tech) !== null
            return hasIcon ? (
              <div
                key={tech}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-cosmic-700/50 text-xs text-starlight-dim"
              >
                <LazyDevIcon name={tech} />
                <span>{tech}</span>
              </div>
            ) : (
              <div
                key={tech}
                className="px-2 py-1 rounded-md bg-cosmic-700/50 text-xs text-starlight-dim"
              >
                {tech}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
