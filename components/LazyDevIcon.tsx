'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

// Map of icon names to their dynamic imports
// This splits each icon into its own chunk, loaded on demand
const iconLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  Python: () => import('./DevIcons').then((mod) => ({ default: mod.PythonIcon })),
  React: () => import('./DevIcons').then((mod) => ({ default: mod.ReactIcon })),
  PostgreSQL: () => import('./DevIcons').then((mod) => ({ default: mod.Postgres })),
  TypeScript: () => import('./DevIcons').then((mod) => ({ default: mod.TypeScript })),
  MongoDB: () => import('./DevIcons').then((mod) => ({ default: mod.MongoDB })),
  FastAPI: () => import('./DevIcons').then((mod) => ({ default: mod.FastAPI })),
  Docker: () => import('./DevIcons').then((mod) => ({ default: mod.Docker })),
  PyTorch: () => import('./DevIcons').then((mod) => ({ default: mod.PyTorch })),
  TensorFlow: () => import('./DevIcons').then((mod) => ({ default: mod.TensorFlow })),
  NextJS: () => import('./DevIcons').then((mod) => ({ default: mod.NextJs })),
  MySQL: () => import('./DevIcons').then((mod) => ({ default: mod.MySQL })),
  Git: () => import('./DevIcons').then((mod) => ({ default: mod.Git })),
  Firebase: () => import('./DevIcons').then((mod) => ({ default: mod.Firebase })),
  Prisma: () => import('./DevIcons').then((mod) => ({ default: mod.Prisma })),
  'C++': () => import('./DevIcons').then((mod) => ({ default: mod.CppIcon })),
  Kafka: () => import('./DevIcons').then((mod) => ({ default: mod.KafkaIcon })),
  Azure: () => import('./DevIcons').then((mod) => ({ default: mod.AzureIcon })),
  ElasticSearch: () => import('./DevIcons').then((mod) => ({ default: mod.ElasticSearchIcon })),
  LangChain: () => import('./DevIcons').then((mod) => ({ default: mod.LangChainIcon })),
  OpenAI: () => import('./DevIcons').then((mod) => ({ default: mod.OpenAIIcon })),
  Playwright: () => import('./DevIcons').then((mod) => ({ default: mod.PlaywrightIcon })),
  Cython: () => import('./DevIcons').then((mod) => ({ default: mod.CythonIcon })),
  Pandas: () => import('./DevIcons').then((mod) => ({ default: mod.PandasIcon })),
  NumPy: () => import('./DevIcons').then((mod) => ({ default: mod.NumPyIcon })),
  Postman: () => import('./DevIcons').then((mod) => ({ default: mod.PostmanIcon })),
  Redis: () => import('./DevIcons').then((mod) => ({ default: mod.RedisIcon })),
  AWS: () => import('./DevIcons').then((mod) => ({ default: mod.AWSIcon })),
  GCP: () => import('./DevIcons').then((mod) => ({ default: mod.GCPIcon })),
  TailwindCSS: () => import('./DevIcons').then((mod) => ({ default: mod.TailwindCSSIcon })),
  SFML: () => import('./DevIcons').then((mod) => ({ default: mod.SFMLIcon })),
}

// Cache for dynamically created components
const dynamicIconCache: Record<string, ComponentType> = {}

/**
 * Get a lazily-loaded icon component by name.
 * Icons are split into separate chunks and only loaded when rendered.
 */
export function getLazyIcon(name: string): ComponentType | null {
  if (dynamicIconCache[name]) {
    return dynamicIconCache[name]
  }

  const loader = iconLoaders[name]
  if (!loader) {
    console.warn(`LazyDevIcon: Unknown icon "${name}"`)
    return null
  }

  const DynamicIcon = dynamic(loader, {
    ssr: false,
    loading: () => <span className="inline-block w-[22px] h-[22px]" />,
  })

  dynamicIconCache[name] = DynamicIcon
  return DynamicIcon
}

interface LazyDevIconProps {
  name: string
  className?: string
}

/**
 * A lazy-loading wrapper for DevIcons.
 * Use this instead of directly importing DevIcons to reduce initial bundle size.
 */
export function LazyDevIcon({ name, className }: LazyDevIconProps) {
  const Icon = getLazyIcon(name)
  if (!Icon) return null
  return (
    <span className={className}>
      <Icon />
    </span>
  )
}
