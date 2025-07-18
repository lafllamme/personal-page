import {getPayload} from 'payload'
import {buildConfig, type SharpDependency} from 'payload'
import {postgresAdapter} from '@payloadcms/db-postgres'
import sharp from 'sharp'
import type {Payload} from 'payload'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import consola from 'consola'
// Import shared collections but we'll create minimal versions
import {Users} from '@lafllamme/personal-page-shared/payload/collections/Users'
import {Media} from '@lafllamme/personal-page-shared/payload/collections/Media'
import {Pages} from '@lafllamme/personal-page-shared/payload/collections/Pages'
import {Posts} from '@lafllamme/personal-page-shared/payload/collections/Posts'
import {Categories} from '@lafllamme/personal-page-shared/payload/collections/Categories'

// Build config nur einmal auf Modulebene
const collections = [Users, Media, Pages, Posts, Categories]
const databaseUri = process.env.NUXT_DATABASE_URI
const payloadSecret = process.env.NUXT_PAYLOAD_SECRET
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

// Helper für Singleton-Instanz
async function getPayloadInstance(payloadConfig: Parameters<typeof getPayload>[0]['config']): Promise<Payload> {
    if (!(globalThis as any)._payloadInstance) {
        (globalThis as any)._payloadInstance = await getPayload({config: payloadConfig})
    }
    return (globalThis as any)._payloadInstance
}

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
            consola.error('❌ No DATABASE_URI found in runtime config or process.env')
            throw createError({
                statusCode: 500,
                statusMessage: 'Database configuration missing'
            })
        }

        consola.log('✅ Using database URI and payload secret')
        // Get Payload instance using local API (Singleton)
        const payload = await getPayloadInstance(payloadConfig)

        // Parse query parameters
        const options: any = {}

        if (query.depth) options.depth = parseInt(query.depth as string)

        consola.log(`🚀 Fetching ${collection} with slug ${slug} and options:`, options)

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

        consola.log(`✅ Successfully fetched ${collection} with slug ${slug}`)
        return result.docs[0]
    } catch (error) {
        consola.error('❌ Local API Error:', error)

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