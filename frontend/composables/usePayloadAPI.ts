// import type { PayloadCollections } from '@shared/types/payload-types'

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

export const usePayloadAPI = () => {
  const findCollection = async <T>(
    collection: string, 
    options: PayloadFindOptions = {}
  ): Promise<PayloadResponse<T> | null> => {
    try {
      const params = new URLSearchParams()
      
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.page) params.append('page', options.page.toString())
      if (options.sort) params.append('sort', options.sort)
      if (options.depth) params.append('depth', options.depth.toString())
      if (options.where) params.append('where', JSON.stringify(options.where))

      // Use Nuxt's local API routes that leverage Payload's local API
      const url = `/api/cms/${collection}?${params.toString()}`
      
      const data = await $fetch<PayloadResponse<T>>(url)
      return data
    } catch (error) {
      console.error(`Error fetching ${collection}:`, error)
      return null
    }
  }

  const findById = async <T>(
    collection: string, 
    id: string, 
    depth: number = 1
  ): Promise<T | null> => {
    try {
      // Use Nuxt's local API routes
      const url = `/api/cms/${collection}/${id}?depth=${depth}`
      const data = await $fetch<T>(url)
      return data
    } catch (error) {
      console.error(`Error fetching ${collection} by ID ${id}:`, error)
      return null
    }
  }

  const findBySlug = async <T>(
    collection: string, 
    slug: string, 
    depth: number = 1
  ): Promise<T | null> => {
    try {
      // Use Nuxt's local API routes
      const url = `/api/cms/${collection}/slug/${slug}?depth=${depth}`
      const data = await $fetch<T>(url)
      return data
    } catch (error) {
      console.error(`Error fetching ${collection} by slug ${slug}:`, error)
      return null
    }
  }

  // Specific content type helpers
  const getPages = (options: PayloadFindOptions = {}) => 
    findCollection('pages', { ...options, sort: '-updatedAt' })

  const getPosts = (options: PayloadFindOptions = {}) => 
    findCollection('posts', { ...options, sort: '-publishedAt' })

  const getMedia = (options: PayloadFindOptions = {}) => 
    findCollection('media', options)

  const getCategories = (options: PayloadFindOptions = {}) => 
    findCollection('categories', options)

  const getPageBySlug = (slug: string) => findBySlug('pages', slug)
  const getPostBySlug = (slug: string) => findBySlug('posts', slug)

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
  }
} 