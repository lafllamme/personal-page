import consola from 'consola'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    let slug = getRouterParam(event, 'slug')
    const query = getQuery(event)
    const config = useRuntimeConfig()

    // Decode URL-encoded slug
    if (slug) {
      slug = decodeURIComponent(slug)
    }

    consola.log('🔍 API Route Debug:')
    consola.log('  Collection:', collection)
    consola.log('  Raw Slug:', getRouterParam(event, 'slug'))
    consola.log('  Decoded Slug:', slug)
    consola.log('  Query:', query)
    consola.log('  URL:', event.node.req.url)

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

    if (query.depth)
      queryParams.append('depth', query.depth as string)

    // Add slug filter - try different formats
    const whereFilter = JSON.stringify({
      slug: {
        equals: slug,
      },
    })
    queryParams.append('where', whereFilter)

    // Also try without the equals operator
    const simpleWhereFilter = JSON.stringify({
      slug,
    })
    consola.log(`🔍 Simple where filter: ${simpleWhereFilter}`)

    // Try the find endpoint first
    const apiUrl = `${payloadApiUrl}/${collection}?${queryParams.toString()}`
    consola.log(`🚀 Fetching from CMS API: ${apiUrl}`)

    // Log the exact query being sent
    consola.log(`🔍 Where filter: ${whereFilter}`)
    consola.log(`🔍 Full query params: ${queryParams.toString()}`)

    // Also try alternative endpoint format
    const altApiUrl = `${payloadApiUrl}/${collection}/find?${queryParams.toString()}`
    consola.log(`🚀 Alternative API URL: ${altApiUrl}`)

    // Make HTTP request to CMS API
    let response: any

    try {
      response = await $fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }) as any
    }
    catch (error) {
      consola.log(`❌ First query failed, trying simple filter...`)

      // Try with simple filter
      const simpleQueryParams = new URLSearchParams()
      if (query.depth)
        simpleQueryParams.append('depth', query.depth as string)
      simpleQueryParams.append('where', simpleWhereFilter)

      const simpleApiUrl = `${payloadApiUrl}/${collection}?${simpleQueryParams.toString()}`
      consola.log(`🚀 Trying simple filter: ${simpleApiUrl}`)

      response = await $fetch(simpleApiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }) as any
    }

    consola.log(`🔍 Raw response from Payload:`, {
      totalDocs: response.totalDocs,
      docs: response.docs?.map((doc: any) => ({ id: doc.id, title: doc.title, slug: doc.slug })),
    })

    if (!response.docs || !response.docs.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Document not found',
      })
    }

    // Find the document that actually matches the requested slug
    const matchingDoc = response.docs.find((doc: any) => doc.slug === slug)

    if (!matchingDoc) {
      consola.error(`❌ No document found with slug '${slug}' in response`)
      consola.error(`❌ Available slugs:`, response.docs.map((doc: any) => doc.slug))
      throw createError({
        statusCode: 404,
        statusMessage: `Document with slug '${slug}' not found`,
      })
    }

    consola.log(`✅ Successfully fetched ${collection} with slug ${slug} from CMS API`)
    consola.log(`✅ Returning document:`, { id: matchingDoc.id, title: matchingDoc.title, slug: matchingDoc.slug })
    return matchingDoc
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
