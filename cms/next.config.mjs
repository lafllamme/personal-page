import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'https', hostname: 'blob.vercel-storage.com' },
    ],
  },
  // Optimize build performance and reduce resource usage
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    // Reduce memory usage during build
    optimizePackageImports: ['@payloadcms/ui', 'monaco-editor'],
  },
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // Reduce file handle usage during build
    if (!isServer) {
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        // Reduce parallelism to avoid too many file handles
        moduleIds: 'deterministic',
        chunkIds: 'deterministic',
      }
    }

    // Limit cache size to reduce memory usage
    webpackConfig.cache = {
      ...webpackConfig.cache,
      maxMemoryGenerations: 1,
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
