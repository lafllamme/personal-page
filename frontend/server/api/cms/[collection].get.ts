import { getPayload } from 'payload'
import payloadConfig from '@personal-page/shared/payload'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    const query = getQuery(event)
    
    if (!collection) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection parameter is required'
      })
    }

    // Get Payload instance using local API
    const payload = await getPayload({
      config: payloadConfig,
    })

    // Parse query parameters
    const options: any = {}
    
    if (query.limit) options.limit = parseInt(query.limit as string)
    if (query.page) options.page = parseInt(query.page as string)
    if (query.sort) options.sort = query.sort
    if (query.depth) options.depth = parseInt(query.depth as string)
    if (query.where) {
      try {
        options.where = JSON.parse(query.where as string)
      } catch (e) {
        // Invalid JSON, ignore where clause
      }
    }

    // Use Payload's local API directly
    const result = await payload.find({
      collection,
      ...options,
    })

    return result
  } catch (error) {
    console.error('Local API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch collection data'
    })
  }
}) 