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
    const slug = getRouterParam(event, 'slug')
    const query = getQuery(event)
    const config = useRuntimeConfig()
    
    if (!collection || !slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Collection and slug parameters are required'
      })
    }

    if (!config.databaseUri) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Database configuration missing'
      })
    }

    // Create Payload config with runtime database URI
    const payloadConfig = buildConfig({
      collections: [Users, Media, Pages, Posts, Categories],
      editor: lexicalEditor(),
      secret: config.payloadSecret || 'fallback-secret',
      db: postgresAdapter({
        pool: {
          connectionString: config.databaseUri,
        },
      }),
      sharp: sharp as SharpDependency,
    })

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
    
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch document by slug'
    })
  }
}) 