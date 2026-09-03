'use client'

import siteMetadata from '@/data/siteMetadata'
import { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitch'
import { ChevronsUp, MessagesSquare } from 'lucide-react'

const ScrollTopAndComment = () => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY > 50) {
        setShow(true)
      } else {
        setShow(false)
      }
    }

    window.addEventListener('scroll', handleWindowScroll)
    return () => window.removeEventListener('scroll', handleWindowScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0 })
  }
  const handleScrollToComment = () => {
    document.getElementById('comment')?.scrollIntoView()
  }
  return (
    <div
      className={`fixed bottom-8 right-1 md:right-8 flex-col gap-3 z-20 ${
        show ? 'flex' : 'hidden'
      }`}
    >
      {siteMetadata.comments?.provider && (
        <button
          aria-label="Scroll To Comment"
          onClick={handleScrollToComment}
          className="rounded-full border hairline bg-surface p-2 text-ink transition-colors hover:text-accent"
        >
          <MessagesSquare size={18} />
        </button>
      )}
      <button
        aria-label="Scroll To Top"
        onClick={handleScrollTop}
        className="rounded-full border hairline bg-surface p-2 text-ink transition-colors hover:text-accent"
      >
        <ChevronsUp size={18} />
      </button>
      <div className="ml-[0.5em]">
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default ScrollTopAndComment
