import { getPayload } from 'payload'
import { buildConfig, type SharpDependency } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'

// Import shared collections but we'll create minimal versions
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

    // Create minimal collections without richText fields to avoid Lexical
    const minimalCollections = [
      {
        ...Users,
        // Remove any richText fields if they exist
        fields: Users.fields.filter(field => 
          !('name' in field) || (field.name !== 'richText' && field.name !== 'content')
        )
      },
      {
        ...Media,
        fields: Media.fields.filter(field => 
          !('name' in field) || (field.name !== 'richText' && field.name !== 'content')
        )
      },
      {
        ...Pages,
        fields: Pages.fields.filter(field => 
          !('name' in field) || (field.name !== 'richText' && field.name !== 'content')
        )
      },
      {
        ...Posts,
        // For Posts, we need to keep most fields but replace richText content with simple textarea
        fields: Posts.fields.map(field => {
          if ('name' in field && field.name === 'content') {
            return {
              name: 'content',
              type: 'textarea' as const,
              required: false,
            }
          }
          return field
        }).filter(field => 
          !('name' in field) || field.name !== 'richText'
        )
      },
      {
        ...Categories,
        fields: Categories.fields.filter(field => 
          !('name' in field) || (field.name !== 'richText' && field.name !== 'content')
        )
      }
    ]

    // Create Payload config WITHOUT lexical editor
    const payloadConfig = buildConfig({
      collections: minimalCollections,
      // NO EDITOR - this avoids the Lexical native module issue
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
    
    if (query.depth) options.depth = parseInt(query.depth as string)

    console.log(`🚀 Fetching ${collection} with slug ${slug} and options:`, options)

    // Use Payload's local API directly
    const result = await payload.find({
      collection,
      where: {
        slug: {
          equals: slug,
        },
      },
      ...options,
    })

    if (!result.docs.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Document not found'
      })
    }

    console.log(`✅ Successfully fetched ${collection} with slug ${slug}`)
    return result.docs[0]
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
      if (error.message.includes('not found')) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Document not found'
        })
      }
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch document'
    })
  }
}) 