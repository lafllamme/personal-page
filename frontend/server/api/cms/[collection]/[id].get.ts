import consola from 'consola'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    const id = getRouterParam(event, 'id')
    const query = getQuery(event)
    const config = useRuntimeConfig()

    if (!collection || !id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection and ID parameters are required',
      })
    }

    const payloadApiUrl = config.public.payloadApiUrl

    if (!payloadApiUrl) {
      consola.error('❌ No PAYLOAD_API_URL found in runtime config')
      throw createError({
        statusCode: 500,
        statusMessage: 'CMS API configuration missing',
      })
    }

    consola.log('✅ Using CMS API URL:', payloadApiUrl)

    // Build query parameters for the CMS API
    const queryParams = new URLSearchParams()

    if (query.depth)
      queryParams.append('depth', query.depth as string)

    const apiUrl = `${payloadApiUrl}/${collection}/${id}?${queryParams.toString()}`
    consola.log(`🚀 Fetching from CMS API: ${apiUrl}`)

    // Make HTTP request to CMS API
    const response = await $fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    consola.log(`✅ Successfully fetched ${collection} with ID ${id} from CMS API`)
    return response
  }
  catch (error: any) {
    consola.error('❌ CMS API Error:', error)

    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'CMS API connection failed - check PAYLOAD_API_URL',
        })
      }
      if (error.message.includes('authentication')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'CMS API authentication failed',
        })
      }
      if (error.message.includes('not found')) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Document not found',
        })
      }
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch document from CMS',
    })
  }
})
