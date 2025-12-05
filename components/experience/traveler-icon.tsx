'use client'

import { motion } from 'framer-motion'

// ============================================
// CONFIGURATION: Change this to swap traveler
// Options: 'astronaut' | 'alien'
// ============================================
export const DEFAULT_TRAVELER: TravelerVariant = 'astronaut'

export type TravelerVariant = 'astronaut' | 'alien'

interface TravelerIconProps {
  variant?: TravelerVariant
  className?: string
  size?: number
}

// Astronaut SVG - simple silhouette style
function AstronautSVG({ size = 40 }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Helmet */}
      <circle cx="32" cy="20" r="14" fill="url(#helmetGradient)" stroke="#8b5cf6" strokeWidth="2" />
      {/* Visor */}
      <ellipse cx="32" cy="20" rx="8" ry="6" fill="#1a1a3a" opacity="0.8" />
      <ellipse cx="34" cy="18" rx="2" ry="1.5" fill="#8b5cf6" opacity="0.5" />
      {/* Body */}
      <path
        d="M20 34 C20 28, 44 28, 44 34 L46 50 C46 54, 18 54, 18 50 Z"
        fill="url(#suitGradient)"
        stroke="#8b5cf6"
        strokeWidth="1.5"
      />
      {/* Backpack */}
      <rect x="22" y="32" width="6" height="14" rx="2" fill="#6366f1" />
      <rect x="36" y="32" width="6" height="14" rx="2" fill="#6366f1" />
      {/* Arms */}
      <ellipse
        cx="14"
        cy="40"
        rx="4"
        ry="6"
        fill="url(#suitGradient)"
        stroke="#8b5cf6"
        strokeWidth="1"
      />
      <ellipse
        cx="50"
        cy="40"
        rx="4"
        ry="6"
        fill="url(#suitGradient)"
        stroke="#8b5cf6"
        strokeWidth="1"
      />
      {/* Legs */}
      <ellipse
        cx="26"
        cy="58"
        rx="5"
        ry="4"
        fill="url(#suitGradient)"
        stroke="#8b5cf6"
        strokeWidth="1"
      />
      <ellipse
        cx="38"
        cy="58"
        rx="5"
        ry="4"
        fill="url(#suitGradient)"
        stroke="#8b5cf6"
        strokeWidth="1"
      />
      {/* Gradients */}
      <defs>
        <linearGradient
          id="helmetGradient"
          x1="18"
          y1="6"
          x2="46"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#f8fafc" />
          <stop offset="1" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient
          id="suitGradient"
          x1="18"
          y1="28"
          x2="46"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Alien SVG - friendly alien silhouette
function AlienSVG({ size = 40 }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head - larger, oval */}
      <ellipse
        cx="32"
        cy="22"
        rx="16"
        ry="18"
        fill="url(#alienGradient)"
        stroke="#10b981"
        strokeWidth="2"
      />
      {/* Eyes - large and dark */}
      <ellipse cx="24" cy="20" rx="5" ry="7" fill="#1a1a3a" />
      <ellipse cx="40" cy="20" rx="5" ry="7" fill="#1a1a3a" />
      {/* Eye shine */}
      <ellipse cx="26" cy="18" rx="1.5" ry="2" fill="#10b981" opacity="0.6" />
      <ellipse cx="42" cy="18" rx="1.5" ry="2" fill="#10b981" opacity="0.6" />
      {/* Body - slim */}
      <path
        d="M24 40 C24 34, 40 34, 40 40 L42 54 C42 58, 22 58, 22 54 Z"
        fill="url(#alienGradient)"
        stroke="#10b981"
        strokeWidth="1.5"
      />
      {/* Arms - long and thin */}
      <path
        d="M24 42 Q14 44, 10 52"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M40 42 Q50 44, 54 52"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Fingers */}
      <circle cx="8" cy="54" r="2" fill="#10b981" />
      <circle cx="12" cy="56" r="2" fill="#10b981" />
      <circle cx="56" cy="54" r="2" fill="#10b981" />
      <circle cx="52" cy="56" r="2" fill="#10b981" />
      {/* Antenna */}
      <path
        d="M28 4 Q26 0, 24 2"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36 4 Q38 0, 40 2"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="24" cy="2" r="2" fill="#10b981" />
      <circle cx="40" cy="2" r="2" fill="#10b981" />
      {/* Gradients */}
      <defs>
        <linearGradient
          id="alienGradient"
          x1="16"
          y1="4"
          x2="48"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function TravelerIcon({
  variant = DEFAULT_TRAVELER,
  className = '',
  size = 40,
}: TravelerIconProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -4, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* Glow effect behind traveler */}
      <div className="absolute inset-0 blur-md">
        {variant === 'astronaut' ? (
          <div className="w-full h-full rounded-full bg-violet-500/40" />
        ) : (
          <div className="w-full h-full rounded-full bg-emerald-500/40" />
        )}
      </div>

      {/* Icon */}
      <div className="relative">
        {variant === 'astronaut' ? <AstronautSVG size={size} /> : <AlienSVG size={size} />}
      </div>
    </motion.div>
  )
}
