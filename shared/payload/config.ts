import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const payloadConfig = buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    routes: {
      createFirstUser: '/create-first-user',
      login: '/login',
      logout: '/logout',
      reset: '/reset-password',
      forgot: '/forgot-password',
    },
  },
  collections: [Users, Media, Pages, Posts, Categories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-key-for-development',
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  cors: [
    'http://localhost:3000', // Nuxt frontend
    'http://localhost:3001', // Payload CMS
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'http://localhost:3000',
  ],

  typescript: {
    outputFile: path.resolve(dirname, '../types/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://localhost:5432/payload',
    },
  }),
  plugins: [
    // Plugins can be added here
  ],
  graphQL: {
    schemaOutputFile: path.resolve(dirname, '../types/graphql-schema.ts'),
  },
})

export default payloadConfig
