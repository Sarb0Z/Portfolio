import { COLLECTION_IDS } from '@/lib/constants'

export interface Bookmark {
  _id: number
  title: string
  slug: string
  count: number
  cover?: string[]
}

export interface BookmarkItem {
  _id: number
  title: string
  excerpt?: string
  note?: string
  link: string
  cover?: string
  created: string
  tags?: string[]
  domain?: string
  collectionId?: number
}

export interface BookmarkItemsResponse {
  items: BookmarkItem[]
  count: number
}

export interface BookmarksResponse {
  items: Bookmark[]
}

const hasAccessToken = Boolean(process.env.RAINDROP_ACCESS_TOKEN)

const baseHeaders: Record<string, string> = {
  'Content-Type': 'application/json',
}

if (hasAccessToken) {
  baseHeaders.Authorization = `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`
}

const options: RequestInit = {
  method: 'GET',
  headers: baseHeaders,
  next: {
    revalidate: 60 * 60 * 24 * 2, // 2 days
  },
} as RequestInit

const RAINDROP_API_URL = 'https://api.raindrop.io/rest/v1'

export const getBookmarkItems = async (
  id: number,
  pageIndex: number = 0
): Promise<BookmarkItemsResponse | null> => {
  if (!id) throw new Error('Bookmark ID is required')
  if (typeof pageIndex !== 'number' || pageIndex < 0) {
    throw new Error('Invalid page index')
  }

  if (!hasAccessToken) {
    return { items: [], count: 0 }
  }

  try {
    const response = await fetch(
      `${RAINDROP_API_URL}/raindrops/${id}?` +
        new URLSearchParams({
          page: String(pageIndex),
          perpage: '50',
        }),
      options
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch bookmark items: ${(error as Error).message}`)
    return null
  }
}

export const getBookmarks = async (): Promise<Bookmark[] | null> => {
  if (!hasAccessToken) {
    return []
  }

  try {
    const response = await fetch(`${RAINDROP_API_URL}/collections`, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const bookmarks: BookmarksResponse = await response.json()

    const filtered = bookmarks.items.filter((bookmark) => COLLECTION_IDS.includes(bookmark._id))

    return filtered
  } catch (error) {
    console.error(`Failed to fetch bookmarks: ${(error as Error).message}`)
    return null
  }
}

export const getBookmark = async (id: number): Promise<Bookmark | null> => {
  if (!hasAccessToken) {
    return null
  }

  try {
    const response = await fetch(`${RAINDROP_API_URL}/collection/${id}`, options)
    return await response.json()
  } catch (error) {
    console.info(error)
    return null
  }
}
