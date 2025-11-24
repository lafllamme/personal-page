// import type { PayloadCollections } from '@shared/types/payload-types'

export interface PayloadPost {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: any
  featuredImage?: any
  author: any
  categories?: any[]
  tags?: { tag: string }[]
  publishedAt?: string
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface PayloadResponse<T> {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage?: number
  nextPage?: number
}

export interface PayloadFindOptions {
  limit?: number
  page?: number
  sort?: string
  where?: Record<string, any>
  depth?: number
}

export function usePayloadAPI() {
  const findCollection = async <T>(
    collection: string,
    options: PayloadFindOptions = {},
  ): Promise<PayloadResponse<T> | null> => {
    try {
      const params = new URLSearchParams()

      if (options.limit)
        params.append('limit', options.limit.toString())
      if (options.page)
        params.append('page', options.page.toString())
      if (options.sort)
        params.append('sort', options.sort)
      if (options.depth)
        params.append('depth', options.depth.toString())
      if (options.where)
        params.append('where', JSON.stringify(options.where))

      // Use Nuxt's local API routes that leverage Payload's local API
      const url = `/api/cms/${collection}?${params.toString()}`

      const data = await $fetch<PayloadResponse<T>>(url)
      return data
    }
    catch (error) {
      console.error(`Error fetching ${collection}:`, error)
      return null
    }
  }

  const findById = async <T>(
    collection: string,
    id: string,
    depth: number = 1,
  ): Promise<T | null> => {
    try {
      // Use Nuxt's local API routes
      const url = `/api/cms/${collection}/${id}?depth=${depth}`
      const data = await $fetch<T>(url)
      return data
    }
    catch (error) {
      console.error(`Error fetching ${collection} by ID ${id}:`, error)
      return null
    }
  }

  const findBySlug = async <T>(
    collection: string,
    slug: string,
    depth: number = 1,
  ): Promise<T | null> => {
    try {
      // Use Nuxt's local API routes
      const url = `/api/cms/${collection}/slug/${slug}?depth=${depth}`
      return await $fetch<T>(url)
    }
    catch (error) {
      console.error(`Error fetching ${collection} by slug ${slug}:`, error)
      return null
    }
  }

  // Specific content type helpers
  const getPages = (options: PayloadFindOptions = {}) =>
    findCollection('pages', { ...options, sort: '-updatedAt' })

  const getPosts = (options: PayloadFindOptions = {}) =>
    findCollection<PayloadPost>('posts', {
      ...options,
      sort: options.sort || '-publishedAt', // Only use default if no sort provided
    })

  const getMedia = (options: PayloadFindOptions = {}) =>
    findCollection('media', options)

  const getCategories = (options: PayloadFindOptions = {}) =>
    findCollection('categories', options)

  const getPageBySlug = (slug: string) => findBySlug('pages', slug)
  const getPostBySlug = (slug: string) => findBySlug('posts', slug)

  // Helper to get all posts including drafts (for admin purposes)
  const getAllPosts = (options: PayloadFindOptions = {}) =>
    findCollection<PayloadPost>('posts', {
      ...options,
      sort: options.sort || '-createdAt',
      // Pass a special flag to override the default published filter
      where: {
        ...options.where,
        _overridePublishedFilter: true,
      },
    })

  // Helper to get posts for AppleCard gallery
  const getGalleryPosts = (options: PayloadFindOptions = {}) =>
    findCollection<PayloadPost>('posts', {
      ...options,
      sort: options.sort || '-publishedAt',
      depth: 2, // Include featuredImage and categories
      where: {
        ...options.where,
        status: 'published',
        featuredImage: {
          exists: true,
        },
      },
    })

  return {
    findCollection,
    findById,
    findBySlug,
    getPages,
    getPosts,
    getMedia,
    getCategories,
    getPageBySlug,
    getPostBySlug,
    getAllPosts,
    getGalleryPosts,
  }
}
