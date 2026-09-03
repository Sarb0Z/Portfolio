/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import type { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

const CustomLink = ({ href, ...rest }: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isFile = href && /\.[a-z0-9]+$/i.test(href)
  const isInternalLink = href && href.startsWith('/') && !isFile
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink) {
    return <Link href={href} {...rest} />
  }

  if (isAnchorLink || isFile) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
