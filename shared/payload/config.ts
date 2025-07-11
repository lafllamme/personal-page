import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'

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
      resetPassword: '/reset-password',
      forgotPassword: '/forgot-password',
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
  i18n: {
    supportedLanguages: { en: 'English' },
    fallbackLanguage: 'en',
  },
  typescript: {
    outputFile: path.resolve(dirname, '../types/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgres://localhost:5432/payload',
    },
  }),
  sharp,
  plugins: [
    // Plugins can be added here
  ],
})

export default payloadConfig 