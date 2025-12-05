import { HTMLAttributes, ReactNode } from 'react'

import { SCROLL_AREA_ID } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  useScrollAreaId?: boolean
  className?: string
  children?: ReactNode
}

export const ScrollArea = ({
  useScrollAreaId = false,
  className,
  children,
  ...rest
}: ScrollAreaProps) => (
  <div
    {...(useScrollAreaId && { id: SCROLL_AREA_ID })}
    className={cn('scrollable-area relative flex w-full flex-col', className)}
    {...rest}
  >
    {children}
  </div>
)
