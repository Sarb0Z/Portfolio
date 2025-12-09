import Image from 'next/image'

import { Link2Icon } from 'lucide-react'

import type { BookmarkItem } from '@/lib/raindrop'

interface BookmarkCardProps {
  bookmark: BookmarkItem
  order: number
}

export const BookmarkCard = ({ bookmark, order }: BookmarkCardProps) => {
  const isPriority = order < 2

  return (
    <a
      key={bookmark._id}
      className="thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 transition-colors duration-300 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
      href={bookmark.link}
      target="_blank"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <Image
          src={bookmark.cover || '/assets/fallback.avif'}
          alt={bookmark.title}
          width={1200}
          height={630}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          priority={isPriority}
          loading={isPriority ? 'eager' : 'lazy'}
          className="animate-reveal aspect-[1200/630] rounded-lg border bg-cover bg-center bg-no-repeat object-cover"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = '/assets/fallback.avif'
          }}
        />
      </span>
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-4 text-lg leading-snug text-gray-900 dark:text-gray-100">
          {bookmark.title}
        </h2>
        <span className="line-clamp-4 inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Link2Icon size={16} />
          {bookmark.domain}
        </span>
        <span className="line-clamp-6 text-sm text-gray-600 dark:text-gray-300">
          {bookmark.excerpt || bookmark.note}
        </span>
      </div>
    </a>
  )
}
