import { getPayload } from 'payload'
import payloadConfig from '@personal-page/shared/payload'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    const id = getRouterParam(event, 'id')
    const query = getQuery(event)
    
    if (!collection || !id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection and ID parameters are required'
      })
    }

    // Get Payload instance using local API
    const payload = await getPayload({
      config: payloadConfig,
    })

    // Parse query parameters
    const options: any = { id }
    
    if (query.depth) options.depth = parseInt(query.depth as string)

    // Use Payload's local API directly
    const result = await payload.findByID({
      collection,
      ...options,
    })

    return result
  } catch (error) {
    console.error('Local API Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch document'
    })
  }
}) 