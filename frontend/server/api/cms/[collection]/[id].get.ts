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
    const id = getRouterParam(event, 'id')
    const query = getQuery(event)
    const config = useRuntimeConfig()
    
    if (!collection || !id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection and ID parameters are required'
      })
    }

    const databaseUri = config.databaseUri || process.env.NUXT_DATABASE_URI
    const payloadSecret = config.payloadSecret || process.env.NUXT_PAYLOAD_SECRET

    if (!databaseUri) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Database configuration missing'
      })
    }

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
      statusMessage: 'Failed to fetch document'
    })
  }
}) 