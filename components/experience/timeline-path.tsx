'use client'

import { useRef, useState, useMemo } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  useSpring,
} from 'framer-motion'
import { TravelerIcon } from './traveler-icon'
import type { ExperienceType } from '@/data/experienceData'

interface TimelinePathProps {
  experienceCount: number
  experienceTypes: ExperienceType[]
}

// Space station themed icons based on experience type
type StationType =
  | 'space-station'
  | 'asteroid'
  | 'sun'
  | 'galaxy'
  | 'planet'
  | 'satellite'
  | 'nebula'
  | 'comet'
  | 'moon'

const typeToStation: Record<ExperienceType, StationType> = {
  'full-time': 'space-station',
  'part-time': 'satellite',
  internship: 'planet',
  contract: 'asteroid',
  remote: 'galaxy',
  'personal-project': 'comet',
  'open-source': 'nebula',
  volunteer: 'moon',
  education: 'sun',
}

const stationColors: Record<StationType, { primary: string; glow: string }> = {
  'space-station': { primary: '#10b981', glow: 'rgba(16, 185, 129, 0.6)' },
  satellite: { primary: '#f59e0b', glow: 'rgba(245, 158, 11, 0.6)' },
  planet: { primary: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.6)' },
  asteroid: { primary: '#06b6d4', glow: 'rgba(6, 182, 212, 0.6)' },
  galaxy: { primary: '#0ea5e9', glow: 'rgba(14, 165, 233, 0.6)' },
  comet: { primary: '#ec4899', glow: 'rgba(236, 72, 153, 0.6)' },
  nebula: { primary: '#f97316', glow: 'rgba(249, 115, 22, 0.6)' },
  moon: { primary: '#f43f5e', glow: 'rgba(244, 63, 94, 0.6)' },
  sun: { primary: '#6366f1', glow: 'rgba(99, 102, 241, 0.6)' },
}

// Space Station SVG Components
function SpaceStationIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Central hub */}
      <circle cx="24" cy="24" r="8" fill={color} opacity="0.8" />
      <circle cx="24" cy="24" r="6" fill="#1a1a3a" />
      <circle cx="24" cy="24" r="3" fill={color} opacity="0.6" />
      {/* Solar panels */}
      <rect x="4" y="22" width="12" height="4" rx="1" fill={color} opacity="0.7" />
      <rect x="32" y="22" width="12" height="4" rx="1" fill={color} opacity="0.7" />
      {/* Panel details */}
      <line x1="6" y1="24" x2="14" y2="24" stroke="#1a1a3a" strokeWidth="0.5" />
      <line x1="34" y1="24" x2="42" y2="24" stroke="#1a1a3a" strokeWidth="0.5" />
      {/* Antenna */}
      <line x1="24" y1="8" x2="24" y2="16" stroke={color} strokeWidth="1.5" />
      <circle cx="24" cy="6" r="2" fill={color} />
    </svg>
  )
}

function AsteroidIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <ellipse
        cx="24"
        cy="24"
        rx="14"
        ry="11"
        fill={color}
        opacity="0.7"
        transform="rotate(-15 24 24)"
      />
      {/* Craters */}
      <circle cx="20" cy="20" r="3" fill="#1a1a3a" opacity="0.5" />
      <circle cx="28" cy="26" r="4" fill="#1a1a3a" opacity="0.4" />
      <circle cx="18" cy="28" r="2" fill="#1a1a3a" opacity="0.3" />
      {/* Highlights */}
      <ellipse cx="30" cy="18" rx="2" ry="1" fill="white" opacity="0.3" />
    </svg>
  )
}

function SunIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Core */}
      <circle cx="24" cy="24" r="10" fill={color} />
      <circle cx="24" cy="24" r="7" fill="white" opacity="0.3" />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="24"
          y1="24"
          x2={24 + Math.cos((angle * Math.PI) / 180) * 20}
          y2={24 + Math.sin((angle * Math.PI) / 180) * 20}
          stroke={color}
          strokeWidth="2"
          opacity="0.6"
        />
      ))}
      {/* Corona effect */}
      <circle cx="24" cy="24" r="14" stroke={color} strokeWidth="1" opacity="0.4" fill="none" />
    </svg>
  )
}

function GalaxyIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Spiral arms */}
      <ellipse
        cx="24"
        cy="24"
        rx="16"
        ry="6"
        fill={color}
        opacity="0.3"
        transform="rotate(-30 24 24)"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="14"
        ry="5"
        fill={color}
        opacity="0.4"
        transform="rotate(30 24 24)"
      />
      <ellipse
        cx="24"
        cy="24"
        rx="12"
        ry="4"
        fill={color}
        opacity="0.5"
        transform="rotate(-60 24 24)"
      />
      {/* Core */}
      <circle cx="24" cy="24" r="5" fill={color} opacity="0.8" />
      <circle cx="24" cy="24" r="2" fill="white" opacity="0.6" />
      {/* Stars */}
      <circle cx="12" cy="20" r="1" fill="white" opacity="0.8" />
      <circle cx="36" cy="28" r="1" fill="white" opacity="0.8" />
      <circle cx="18" cy="34" r="0.5" fill="white" opacity="0.6" />
    </svg>
  )
}

function PlanetIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Planet body */}
      <circle cx="24" cy="24" r="12" fill={color} opacity="0.8" />
      {/* Atmosphere */}
      <circle cx="24" cy="24" r="14" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
      {/* Surface details */}
      <ellipse cx="20" cy="22" rx="4" ry="2" fill="#1a1a3a" opacity="0.3" />
      <ellipse cx="28" cy="28" rx="3" ry="1.5" fill="#1a1a3a" opacity="0.2" />
      {/* Ring */}
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="4"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
        fill="none"
        transform="rotate(-20 24 24)"
      />
    </svg>
  )
}

function SatelliteIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Body */}
      <rect x="18" y="18" width="12" height="12" rx="2" fill={color} opacity="0.8" />
      {/* Solar panels */}
      <rect x="4" y="20" width="12" height="8" rx="1" fill={color} opacity="0.6" />
      <rect x="32" y="20" width="12" height="8" rx="1" fill={color} opacity="0.6" />
      {/* Panel lines */}
      <line x1="7" y1="24" x2="13" y2="24" stroke="#1a1a3a" strokeWidth="0.5" />
      <line x1="35" y1="24" x2="41" y2="24" stroke="#1a1a3a" strokeWidth="0.5" />
      {/* Antenna */}
      <line x1="24" y1="10" x2="24" y2="18" stroke={color} strokeWidth="1" />
      <circle cx="24" cy="8" r="2" fill={color} opacity="0.6" />
      {/* Dish */}
      <path d="M22 32 Q24 38, 26 32" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function NebulaIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Cloud layers */}
      <ellipse cx="24" cy="26" rx="16" ry="10" fill={color} opacity="0.2" />
      <ellipse cx="20" cy="22" rx="10" ry="8" fill={color} opacity="0.3" />
      <ellipse cx="28" cy="28" rx="12" ry="7" fill={color} opacity="0.25" />
      {/* Core */}
      <circle cx="24" cy="24" r="4" fill={color} opacity="0.6" />
      {/* Embedded stars */}
      <circle cx="16" cy="20" r="1" fill="white" opacity="0.9" />
      <circle cx="32" cy="26" r="1.5" fill="white" opacity="0.8" />
      <circle cx="22" cy="30" r="0.5" fill="white" opacity="0.7" />
    </svg>
  )
}

function CometIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Tail */}
      <path
        d="M32 20 Q20 24, 6 28"
        stroke={color}
        strokeWidth="4"
        opacity="0.3"
        strokeLinecap="round"
      />
      <path
        d="M32 20 Q22 24, 10 26"
        stroke={color}
        strokeWidth="2"
        opacity="0.5"
        strokeLinecap="round"
      />
      {/* Core */}
      <circle cx="34" cy="18" r="6" fill={color} opacity="0.9" />
      <circle cx="32" cy="16" r="2" fill="white" opacity="0.5" />
      {/* Particles */}
      <circle cx="14" cy="26" r="1" fill={color} opacity="0.4" />
      <circle cx="20" cy="24" r="0.5" fill={color} opacity="0.3" />
    </svg>
  )
}

function MoonIcon({ color }: { color: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      {/* Moon body */}
      <circle cx="24" cy="24" r="12" fill={color} opacity="0.7" />
      {/* Craters */}
      <circle cx="20" cy="20" r="3" fill="#1a1a3a" opacity="0.3" />
      <circle cx="28" cy="26" r="4" fill="#1a1a3a" opacity="0.25" />
      <circle cx="18" cy="28" r="2" fill="#1a1a3a" opacity="0.2" />
      <circle cx="30" cy="18" r="1.5" fill="#1a1a3a" opacity="0.2" />
      {/* Glow */}
      <circle cx="24" cy="24" r="14" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
    </svg>
  )
}

function StationIcon({ type, color }: { type: StationType; color: string }) {
  switch (type) {
    case 'space-station':
      return <SpaceStationIcon color={color} />
    case 'asteroid':
      return <AsteroidIcon color={color} />
    case 'sun':
      return <SunIcon color={color} />
    case 'galaxy':
      return <GalaxyIcon color={color} />
    case 'planet':
      return <PlanetIcon color={color} />
    case 'satellite':
      return <SatelliteIcon color={color} />
    case 'nebula':
      return <NebulaIcon color={color} />
    case 'comet':
      return <CometIcon color={color} />
    case 'moon':
      return <MoonIcon color={color} />
  }
}

export function TimelinePath({ experienceCount, experienceTypes }: TimelinePathProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map scroll progress to path position (0-100%)
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Path configuration
  const pathWidth = 400
  const segmentHeight = 1000 // Height per experience segment
  const pathHeight = experienceCount * segmentHeight
  const amplitude = 120 // How far the path curves left/right

  // Generate the curved meandering path
  const curvePath = useMemo(() => {
    const points: string[] = []
    const numSegments = experienceCount - 1

    for (let i = 0; i <= numSegments; i++) {
      const y = i * segmentHeight
      const xOffset = Math.sin(i * Math.PI) * amplitude // Alternating curves
      const x = pathWidth / 2 + xOffset

      if (i === 0) {
        points.push(`M ${x} ${y}`)
      } else {
        // Create smooth bezier curves between points
        const prevY = (i - 1) * segmentHeight
        const prevXOffset = Math.sin((i - 1) * Math.PI) * amplitude
        const prevX = pathWidth / 2 + prevXOffset

        const controlY1 = prevY + segmentHeight * 0.5
        const controlY2 = y - segmentHeight * 0.5
        const controlX1 = prevX + (x - prevX) * 0.1
        const controlX2 = x - (x - prevX) * 0.1

        points.push(`C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x} ${y}`)
      }
    }

    return points.join(' ')
  }, [experienceCount, segmentHeight, amplitude, pathWidth])

  // Calculate position along the path for the traveler
  const getPointOnPath = (progress: number) => {
    const segmentIndex = Math.min(Math.floor(progress * (experienceCount - 1)), experienceCount - 2)
    const segmentProgress = progress * (experienceCount - 1) - segmentIndex

    const startY = segmentIndex * segmentHeight
    const endY = (segmentIndex + 1) * segmentHeight

    const startXOffset = Math.sin(segmentIndex * Math.PI) * amplitude
    const endXOffset = Math.sin((segmentIndex + 1) * Math.PI) * amplitude

    const startX = pathWidth / 2 + startXOffset
    const endX = pathWidth / 2 + endXOffset

    // Smooth bezier interpolation
    const t = segmentProgress
    const t2 = t * t
    const t3 = t2 * t
    const mt = 1 - t
    const mt2 = mt * mt
    const mt3 = mt2 * mt

    const controlY1 = startY + segmentHeight * 0.5
    const controlY2 = endY - segmentHeight * 0.5
    const controlX1 = startX + (endX - startX) * 0.1
    const controlX2 = endX - (endX - startX) * 0.1

    const x = mt3 * startX + 3 * mt2 * t * controlX1 + 3 * mt * t2 * controlX2 + t3 * endX
    const y = mt3 * startY + 3 * mt2 * t * controlY1 + 3 * mt * t2 * controlY2 + t3 * endY

    // Calculate rotation based on path tangent
    const dx =
      3 * mt2 * (controlX1 - startX) +
      6 * mt * t * (controlX2 - controlX1) +
      3 * t2 * (endX - controlX2)
    const dy =
      3 * mt2 * (controlY1 - startY) +
      6 * mt * t * (controlY2 - controlY1) +
      3 * t2 * (endY - controlY2)
    const rotation = Math.atan2(dx, dy) * (180 / Math.PI)

    return { x, y, rotation }
  }

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Update traveler position smoothly on scroll
  const travelerX = useTransform(smoothProgress, (latest) => {
    const pos = getPointOnPath(Math.min(latest, 0.999))
    return pos.x - 24
  })

  const travelerY = useTransform(smoothProgress, (latest) => {
    const pos = getPointOnPath(Math.min(latest, 0.999))
    return pos.y - 24
  })

  const travelerRotate = useTransform(smoothProgress, (latest) => {
    const pos = getPointOnPath(Math.min(latest, 0.999))
    return pos.rotation * 0.3
  })

  // Station positions along the path
  const stationPositions = useMemo(() => {
    return Array.from({ length: experienceCount }).map((_, i) => {
      const progress = experienceCount > 1 ? i / (experienceCount - 1) : 0
      const pos = getPointOnPath(progress)
      return { ...pos, type: typeToStation[experienceTypes[i]] }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceCount, experienceTypes])

  return (
    <div
      ref={containerRef}
      className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none"
      style={{ height: pathHeight, width: pathWidth }}
    >
      {/* Main glowing curved path */}
      <svg
        className="absolute top-0 left-0"
        width={pathWidth}
        height={pathHeight}
        viewBox={`0 0 ${pathWidth} ${pathHeight}`}
      >
        <defs>
          {/* Glow filter */}
          <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Enhanced gradient for path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="25%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="75%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Animated dash gradient */}
          <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Background path (dim) */}
        <path
          d={curvePath}
          stroke="#4c1d95"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />

        {/* Animated path (lit portion based on scroll) */}
        <motion.path
          d={curvePath}
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#pathGlow)"
          style={{
            pathLength: pathProgress,
          }}
          initial={{ pathLength: 0 }}
        />

        {/* Sparkle dots along path */}
        <motion.path
          d={curvePath}
          stroke="url(#dashGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 20"
          fill="none"
          style={{
            pathLength: pathProgress,
          }}
          initial={{ pathLength: 0 }}
        />
      </svg>

      {/* Floating particles along path */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {Array.from({ length: 8 }).map((_, i) => {
            const startProgress = i / 8
            const startPos = getPointOnPath(startProgress)
            return (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: startPos.x - 3,
                  top: startPos.y,
                  background:
                    'radial-gradient(circle, rgba(139,92,246,1) 0%, rgba(236,72,153,0.5) 100%)',
                }}
                animate={{
                  y: [0, pathHeight - startPos.y],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1, 0.5],
                }}
                transition={{
                  duration: 10,
                  delay: i * 1.2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )
          })}
        </div>
      )}

      {/* Traveler icon moving along curved path */}
      <motion.div
        className="absolute"
        style={{
          x: travelerX,
          y: travelerY,
          rotate: travelerRotate,
        }}
      >
        <TravelerIcon size={48} />
      </motion.div>

      {/* Space station markers for each experience */}
      {stationPositions.map((pos, index) => {
        const stationType = pos.type
        const colors = stationColors[stationType]

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: pos.x - 24,
              top: pos.y - 24,
            }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1.5, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: index * 0.1,
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 blur-lg rounded-full"
              style={{
                background: colors.glow,
                transform: 'scale(1.2)',
              }}
            />
            {/* Station icon */}
            <div className="relative">
              <StationIcon type={stationType} color={colors.primary} />
            </div>
            {/* Orbit ring animation */}
            {!prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-full border border-current"
                style={{
                  borderColor: colors.primary,
                  opacity: 0.3,
                  transform: 'scale(1.8)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
