'use server'

import { getBookmarkItems } from '@/lib/raindrop'

export async function getBookmarkItemsByPageIndex(id: number, pageIndex: number = 0) {
  const data = await getBookmarkItems(id, pageIndex)
  return {
    result: data !== null,
    items: data?.items || [],
    count: data?.count || 0,
  }
}
