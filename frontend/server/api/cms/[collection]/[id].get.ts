import type { Payload, SharpDependency } from 'payload'
import { Categories } from '@lafllamme/personal-page-shared/payload/collections/Categories'
import { Media } from '@lafllamme/personal-page-shared/payload/collections/Media'
import { Pages } from '@lafllamme/personal-page-shared/payload/collections/Pages'
import { Posts } from '@lafllamme/personal-page-shared/payload/collections/Posts'
// Import shared collections but we'll create minimal versions
import { Users } from '@lafllamme/personal-page-shared/payload/collections/Users'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import consola from 'consola'
import { buildConfig, getPayload } from 'payload'
import sharp from 'sharp'
import config from 'shared/payload/config.frontend'

// Build config will be created inside the handler with runtime config

// Helper für Singleton-Instanz
async function getPayloadInstance(payloadConfig: Parameters<typeof getPayload>[0]['config']): Promise<Payload> {
  if (!(globalThis as any)._payloadInstance) {
    (globalThis as any)._payloadInstance = await getPayload({ config: payloadConfig })
  }
  return (globalThis as any)._payloadInstance
}

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

    const databaseUri = config.databaseUri
    const payloadSecret = config.payloadSecret

    if (!databaseUri) {
      consola.error('❌ No DATABASE_URI found in runtime config')
      throw createError({
        statusCode: 500,
        statusMessage: 'Database configuration missing',
      })
    }

    consola.log('✅ Using database URI and payload secret')

            // Create Payload config with runtime config
        const collections = [Users, Media, Pages, Posts, Categories]
        const payloadConfig = buildConfig({
          collections,
          editor: lexicalEditor(),
          secret: payloadSecret || 'fallback-secret',
          db: postgresAdapter({
            pool: {
              connectionString: databaseUri,
            },
          }),
          sharp: sharp as SharpDependency,
        })

        // Get Payload instance using local API (Singleton)
        const payload = await getPayloadInstance(payloadConfig)

    // Parse query parameters
    const options: any = {}

    if (query.depth)
      options.depth = Number.parseInt(query.depth as string)

    consola.log(`🚀 Fetching ${collection} with ID ${id} and options:`, options)

    // Use Payload's local API directly
    const result = await payload.findByID({
      collection,
      id,
      ...options,
    })

    consola.log(`✅ Successfully fetched ${collection} with ID ${id}`)
    return result
  }
  catch (error: any) {
    consola.error('❌ Local API Error:', error)

    // More specific error messages
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'Database connection failed - check DATABASE_URI',
        })
      }
      if (error.message.includes('authentication')) {
        throw createError({
          statusCode: 503,
          statusMessage: 'Database authentication failed',
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
      statusMessage: 'Failed to fetch document',
    })
  }
})
