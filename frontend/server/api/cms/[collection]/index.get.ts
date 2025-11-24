import consola from 'consola'

const FOUR_HOURS_IN_SECONDS = 60 * 60 * 4

interface CollectionFetchOptions {
  payloadApiUrl: string
  collection: string
  queryString: string
}

async function fetchCollectionFromCMS(options: CollectionFetchOptions) {
  const { payloadApiUrl, collection, queryString } = options
  const apiUrl = `${payloadApiUrl}/${collection}?${queryString}`
  consola.log(`🚀 Fetching from CMS API: ${apiUrl}`)

  const response = await $fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (collection === 'posts' && (response as any).docs) {
    for (const doc of (response as any).docs) {
      if (doc.content && doc.content.root && doc.content.root.children) {
        for (const child of doc.content.root.children) {
          if (child.type === 'upload' && child.value === null && child.id) {
            try {
              child.value = await $fetch(`${payloadApiUrl}/media/${child.id}`)
              consola.log(`✅ Populated upload relationship for media ID: ${child.id}`)
            }
            catch (error) {
              consola.error(`❌ Failed to populate upload relationship for media ID: ${child.id}`, error)
            }
          }
        }
      }
    }
  }

  return response
}

const fetchCollectionCached = cachedFunction(fetchCollectionFromCMS, {
  name: 'payload-collection-cache',
  maxAge: FOUR_HOURS_IN_SECONDS,
  swr: true,
  getKey: (options: CollectionFetchOptions) =>
    `${options.payloadApiUrl}:${options.collection}?${options.queryString}`,
})

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

    if (query.limit)
      queryParams.append('limit', query.limit as string)
    if (query.page)
      queryParams.append('page', query.page as string)
    if (query.sort)
      queryParams.append('sort', query.sort as string)
    if (query.depth)
      queryParams.append('depth', query.depth as string)
    if (query.where)
      queryParams.append('where', query.where as string)

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

    const queryString = queryParams.toString()
    const shouldBypassCache
      = query.cache === '0'
        || query.cache === 'false'
        || query.cache === 'no'
        || query.cache === 'bypass'

    const fetchOptions: CollectionFetchOptions = {
      payloadApiUrl,
      collection,
      queryString,
    }

    const response = shouldBypassCache
      ? await fetchCollectionFromCMS(fetchOptions)
      : await fetchCollectionCached(fetchOptions)

    consola.log(`✅ Successfully fetched ${collection} from CMS API`)

    setResponseHeaders(event, shouldBypassCache
      ? {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Cache-Status': 'BYPASS',
        }
      : {
          'Cache-Control': `public, max-age=0, s-maxage=${FOUR_HOURS_IN_SECONDS}, stale-while-revalidate=60`,
          'X-Cache-Status': 'ENABLED',
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
