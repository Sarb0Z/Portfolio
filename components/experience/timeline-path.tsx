'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { TravelerIcon } from './traveler-icon'

interface TimelinePathProps {
  experienceCount: number
}

export function TimelinePath({ experienceCount }: TimelinePathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress to path position (0-100%)
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Traveler Y position based on scroll
  const travelerY = useTransform(scrollYProgress, [0, 1], ['0%', `${(experienceCount - 1) * 100}%`])

  // Path height calculation
  const pathHeight = experienceCount * 400 // Approximate height per experience

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-20 pointer-events-none"
    >
      {/* Main glowing path */}
      <svg
        className="absolute left-1/2 -translate-x-1/2 h-full w-4"
        viewBox={`0 0 4 ${pathHeight}`}
        preserveAspectRatio="none"
      >
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient for path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Background path (dim) */}
        <line
          x1="2"
          y1="0"
          x2="2"
          y2={pathHeight}
          stroke="#4c1d95"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />

        {/* Animated path (lit portion based on scroll) */}
        <motion.line
          x1="2"
          y1="0"
          x2="2"
          y2={pathHeight}
          stroke="url(#pathGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#glow)"
          style={{
            pathLength: pathProgress,
          }}
          initial={{ pathLength: 0 }}
        />
      </svg>

      {/* Floating particles along path */}
      {!prefersReducedMotion && (
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-violet-400"
              style={{
                left: `${40 + Math.random() * 20}%`,
              }}
              animate={{
                y: ['0%', '100%'],
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.5],
              }}
              transition={{
                duration: 8,
                delay: i * 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      )}

      {/* Traveler icon moving along path */}
      <motion.div className="absolute left-1/2 -translate-x-1/2" style={{ top: travelerY }}>
        <TravelerIcon size={48} />
      </motion.div>

      {/* Milestone markers for each experience */}
      {Array.from({ length: experienceCount }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${(index / (experienceCount - 1)) * 100}%` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="w-4 h-4 rounded-full bg-cosmic-700 border-2 border-violet-500 shadow-glow-md" />
        </motion.div>
      ))}
    </div>
  )
}
