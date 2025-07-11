// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, SharpDependency } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import shared collections with enhanced features
import { Users } from '@personal-page/shared/payload/collections/Users'
import { Media } from '@personal-page/shared/payload/collections/Media'
import { Pages } from '@personal-page/shared/payload/collections/Pages'
import { Posts } from '@personal-page/shared/payload/collections/Posts'
import { Categories } from '@personal-page/shared/payload/collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Posts, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp: sharp as SharpDependency,
  plugins: [
    // Only enable Payload Cloud in production
    ...(process.env.NODE_ENV === 'production' ? [payloadCloudPlugin()] : []),
    // storage-adapter-placeholder
  ],
})
