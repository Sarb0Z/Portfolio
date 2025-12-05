'use client'

import Balancer from 'react-wrap-balancer'

interface PageTitleProps {
  title: string
  className?: string
}

export const PageTitle = ({ title, className }: PageTitleProps) => (
  <Balancer
    as="h1"
    className={`text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl ${className || ''}`}
  >
    {title}
  </Balancer>
)
