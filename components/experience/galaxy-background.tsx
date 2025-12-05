'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, useReducedMotion, Variants } from 'framer-motion'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function GalaxyBackground() {
  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate stars with useMemo to prevent re-renders
  const stars = useMemo(() => {
    const count = isMobile ? 30 : 80
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    }))
  }, [isMobile])

  // Star animation variants
  const starVariants: Variants = {
    animate: (star: Star) => ({
      opacity: [0.2, 1, 0.2],
      scale: [1, 1.2, 1],
      transition: {
        duration: star.duration,
        delay: star.delay,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    }),
    static: {
      opacity: 0.6,
      scale: 1,
    },
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-cosmic-900 via-cosmic-800 to-cosmic-900">
      {/* Nebula blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-nebula-purple/10 blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, 30, 0],
                  y: [0, -20, 0],
                }
          }
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-nebula-blue/10 blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: [0, -30, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-nebula-pink/5 blur-3xl"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.1, 1],
                }
          }
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-starlight"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          variants={starVariants}
          animate={prefersReducedMotion ? 'static' : 'animate'}
          custom={star}
        />
      ))}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-900/80 via-transparent to-cosmic-900/40" />
    </div>
  )
}
