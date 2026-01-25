// app.config.ts
export default defineAppConfig({
  meta: {
    title: 'TecNews – Tech News & Trends',
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    description: 'TecNews is your source for the latest technology news, trends, and analysis. Stay updated with fresh articles, expert insights, and more.',
    themeColor: '#5EAEA5',
    charset: 'utf-8',
  },
  head: {
    link: [
      // Standard favicon
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // PNG favicon for specific sizes
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      // SVG favicon for scalability
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      // Apple Touch Icon
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      // Apple Touch Icon (precomposed)
      { rel: 'apple-touch-icon-precomposed', href: '/apple-touch-icon.png' },
      // Web App Manifest
      { rel: 'manifest', href: '/site.webmanifest' },
      // Safari pinned tab
      { rel: 'mask-icon', href: '/favicon.svg', color: '#5EAEA5' },
    ],
    meta: [
      // Primary meta
      {
        hid: 'description',
        name: 'description',
        content: 'TecNews is your source for the latest technology news, trends, and analysis. Stay updated with fresh articles, expert insights, and more.',
      },
      { name: 'application-name', content: 'TecNews' },
      { name: 'apple-mobile-web-app-title', content: 'TecNews' },
      { name: 'theme-color', content: '#5EAEA5' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },

      // Open Graph / Facebook
      { property: 'og:title', content: 'TecNews – Tech News & Trends' },
      {
        property: 'og:description',
        content: 'The latest in tech, gadgets, software, and digital culture. Read TecNews for breaking news and in-depth analysis.',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://your-domain.com/' },
      { property: 'og:image', content: '/opengraph-image.png' }, // Add this image to /public

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'TecNews – Tech News & Trends' },
      { name: 'twitter:description', content: 'Stay on top of tech news and trends with TecNews.' },
      { name: 'twitter:image', content: '/opengraph-image.png' },

      // Misc
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    ],
  },
})
