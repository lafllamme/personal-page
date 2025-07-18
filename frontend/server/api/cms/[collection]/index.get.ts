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
        const query = getQuery(event)
        const config = useRuntimeConfig()

        if (!collection) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Collection parameter is required'
            })
        }

        // Try fallback to process.env if runtime config doesn't work
        const databaseUri = config.databaseUri
        const payloadSecret = config.payloadSecret

        if (!databaseUri) {
            consola.error('❌ No DATABASE_URI found in runtime config or process.env')
            throw createError({
                statusCode: 500,
                statusMessage: 'Database configuration missing'
            })
        }

        consola.log('✅ Using database URI and payload secret')

        // Statt minimalCollections einfach die originalen Collections verwenden
        const collections = [Users, Media, Pages, Posts, Categories]

        // Create Payload config mit allen Feldern
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

        //TODO: Make this clean
        // For posts collection, only show published posts by default
        if (collection === 'posts' && !options.where) {
            // Only show published posts
            options.where = {
                status: {
                    equals: 'published'
                }
            }
            consola.log('📝 Posts collection detected - filtering for published posts only')
        } else if (collection === 'posts' && options.where && options.where._overridePublishedFilter) {
            // Remove the override flag and don't apply the published filter
            delete options.where._overridePublishedFilter
            consola.log('📝 Posts collection detected - showing all posts (including drafts)')
        }

        consola.log(`🚀 Fetching ${collection} with options:`, options)

        // Use Payload's local API directly
        const result = await payload.find({
            collection,
            ...options,
        })

        consola.log(`✅ Successfully fetched ${result.docs.length} ${collection}`)
        consola.log(`📊 Total docs: ${result.totalDocs}, Page: ${result.page}, Limit: ${result.limit}`)

        // Debug: Log the first few docs to see what we're getting
        if (result.docs.length > 0) {
            consola.log(`📝 First doc:`, {
                id: result.docs[0].id,
                title: result.docs[0].title,
                publishedAt: result.docs[0].publishedAt,
                createdAt: result.docs[0].createdAt,
                status: result.docs[0].status
            })
        }

        // Set cache control headers to prevent caching
        setResponseHeaders(event, {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'X-Cache-Status': 'BYPASS'
        })

        return result
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
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch collection data'
        })
    }
}) 