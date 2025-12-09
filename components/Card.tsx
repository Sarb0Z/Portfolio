'use client'

import { useEffect, useState } from 'react'
import Image from './Image'
import { LazyDevIcon } from './LazyDevIcon'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  techStack: string[]
  priority?: boolean
}

const Card = ({ title, description, imgSrc, href, techStack, priority = false }: CardProps) => {
  // to solve hydration mismatch error
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="max-w-lg">
      <div className="flex flex-col h-full overflow-hidden rounded-xl border-2 p-[6px] border-zinc-300 hover:border-black dark:border-zinc-700 hover:dark:border-white/90">
        {imgSrc && (
          <div className="flex-shrink-0 object-none">
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center md:h-72 lg:h-72"
              width={500}
              height={300}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              priority={priority}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F9PQAJZwN4gR8DpgAAAABJRU5ErkJggg=="
            />
          </div>
        )}
        <div className="flex-grow p-3">
          <div className="flex flex-wrap gap-2 mb-5">
            {techStack.map((t) => (
              <div
                key={t}
                className="flex items-center justify-center gap-2 text-white rounded-md border :border-white bg-black p-1 px-2 font-bold text-sm md:text-base"
              >
                {t}
                <LazyDevIcon name={t} />
              </div>
            ))}
          </div>
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
          <p className="prose max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          <a
            href={href}
            className="mt-auto text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}

export default Card
