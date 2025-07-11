import { getPayload } from 'payload'
import payloadConfig from '@personal-page/shared/payload'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    const slug = getRouterParam(event, 'slug')
    const query = getQuery(event)
    
    if (!collection || !slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection and slug parameters are required'
      })
    }

    // Get Payload instance using local API
    const payload = await getPayload({
      config: payloadConfig,
    })

    // Parse query parameters
    const options: any = {
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    }
    
    if (query.depth) options.depth = parseInt(query.depth as string)

    // Use Payload's local API directly
    const result = await payload.find({
      collection,
      ...options,
    })

    // Return the first document if found
    if (result.docs.length > 0) {
      return result.docs[0]
    } else {
      throw createError({
        statusCode: 404,
        statusMessage: 'Document not found'
      })
    }
  } catch (error) {
    console.error('Local API Error:', error)
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch document by slug'
    })
  }
}) 