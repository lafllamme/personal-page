import { withPayload } from '@payloadcms/next/withPayload'
import withRspack from 'next-rspack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'https', hostname: 'blob.vercel-storage.com' },
    ],
  },
  serverExternalPackages: ['payload'],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

const withPayloadConfig = withPayload(nextConfig, { devBundleServerPackages: false })

export default withRspack(withPayloadConfig)
