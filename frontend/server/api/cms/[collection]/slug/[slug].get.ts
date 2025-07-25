import consola from 'consola'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    const slug = getRouterParam(event, 'slug')
    const query = getQuery(event)
    const config = useRuntimeConfig()

    if (!collection || !slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection and slug parameters are required',
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
    
    if (query.depth) queryParams.append('depth', query.depth as string)
    
    // Add slug filter
    const whereFilter = JSON.stringify({
      slug: {
        equals: slug,
      },
    })
    queryParams.append('where', whereFilter)

    const apiUrl = `${payloadApiUrl}/${collection}?${queryParams.toString()}`
    consola.log(`🚀 Fetching from CMS API: ${apiUrl}`)

    // Make HTTP request to CMS API
    const response = await $fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }) as any

    if (!response.docs || !response.docs.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Document not found',
      })
    }

    consola.log(`✅ Successfully fetched ${collection} with slug ${slug} from CMS API`)
    return response.docs[0]
  }
  catch (error) {
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
