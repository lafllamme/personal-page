import consola from 'consola'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    const query = getQuery(event)
    const config = useRuntimeConfig()

    if (!collection) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection parameter is required',
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
    
    if (query.limit) queryParams.append('limit', query.limit as string)
    if (query.page) queryParams.append('page', query.page as string)
    if (query.sort) queryParams.append('sort', query.sort as string)
    if (query.depth) queryParams.append('depth', query.depth as string)
    if (query.where) queryParams.append('where', query.where as string)

    // For posts collection, only show published posts by default
    if (collection === 'posts' && !query.where) {
      const whereFilter = JSON.stringify({
        status: {
          equals: 'published',
        },
      })
      queryParams.append('where', whereFilter)
      consola.log('📝 Posts collection detected - filtering for published posts only')
    }

    // Ensure depth is set for proper relationship population
    if (!query.depth) {
      queryParams.append('depth', '3')
      consola.log('🔍 No depth specified, defaulting to depth=3 for relationship population')
    }

    const apiUrl = `${payloadApiUrl}/${collection}?${queryParams.toString()}`
    consola.log(`🚀 Fetching from CMS API: ${apiUrl}`)

    // Make HTTP request to CMS API
    const response = await $fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // For posts collection, manually populate upload relationships if they're null
    if (collection === 'posts' && (response as any).docs) {
      for (const doc of (response as any).docs) {
        if (doc.content && doc.content.root && doc.content.root.children) {
          for (const child of doc.content.root.children) {
            if (child.type === 'upload' && child.value === null && child.id) {
              // Fetch the media document
              try {
                const mediaResponse = await $fetch(`${payloadApiUrl}/media/${child.id}`)
                child.value = mediaResponse
                consola.log(`✅ Populated upload relationship for media ID: ${child.id}`)
              } catch (error) {
                consola.error(`❌ Failed to populate upload relationship for media ID: ${child.id}`, error)
              }
            }
          }
        }
      }
    }

    consola.log(`✅ Successfully fetched ${collection} from CMS API`)

    // Set cache control headers to prevent caching
    setResponseHeaders(event, {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'X-Cache-Status': 'BYPASS',
    })

    return response
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
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch collection data from CMS',
    })
  }
})
