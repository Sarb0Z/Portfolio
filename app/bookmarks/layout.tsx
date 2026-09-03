import { ReactNode } from 'react'

interface BookmarksLayoutProps {
  children: ReactNode
}

export default function BookmarksLayout({ children }: BookmarksLayoutProps) {
  return <>{children}</>
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
}
