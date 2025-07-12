import { getPayload } from 'payload'
import { buildConfig, type SharpDependency } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Import shared collections
import { Users } from '@lafllamme/personal-page-shared/payload/collections/Users'
import { Media } from '@lafllamme/personal-page-shared/payload/collections/Media'
import { Pages } from '@lafllamme/personal-page-shared/payload/collections/Pages'
import { Posts } from '@lafllamme/personal-page-shared/payload/collections/Posts'
import { Categories } from '@lafllamme/personal-page-shared/payload/collections/Categories'

export default defineEventHandler(async (event) => {
  try {
    const collection = getRouterParam(event, 'collection')
    const query = getQuery(event)
    const config = useRuntimeConfig()
    
    if (!collection) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection parameter is required'
      })
    }

    // Try fallback to process.env if runtime config doesn't work
    const databaseUri = config.databaseUri || process.env.NUXT_DATABASE_URI
    const payloadSecret = config.payloadSecret || process.env.NUXT_PAYLOAD_SECRET

    if (!databaseUri) {
      console.error('❌ No DATABASE_URI found in runtime config or process.env')
      throw createError({
        statusCode: 500,
        statusMessage: 'Database configuration missing'
      })
    }

    console.log('✅ Using database URI and payload secret')

    // Create Payload config with runtime database URI
    const payloadConfig = buildConfig({
      collections: [Users, Media, Pages, Posts, Categories],
      editor: lexicalEditor(),
      secret: payloadSecret || 'fallback-secret',
      db: postgresAdapter({
        pool: {
          connectionString: databaseUri,
        },
      }),
      sharp: sharp as SharpDependency,
    })

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

    console.log(`🚀 Fetching ${collection} with options:`, options)

    // Use Payload's local API directly
    const result = await payload.find({
      collection,
      ...options,
    })

    console.log(`✅ Successfully fetched ${result.docs.length} ${collection}`)
    return result
  } catch (error) {
    console.error('❌ Local API Error:', error)
    
    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'Database connection failed - check DATABASE_URI'
        })
      }
      if (error.message.includes('authentication')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'Database authentication failed'
        })
      }
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch collection data'
    })
  }
}) 