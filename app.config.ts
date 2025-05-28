// app.config.ts
export default defineAppConfig({
  meta: {
    viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
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
    ],
    meta: [
      // Apple Mobile Web App Title
      { name: 'apple-mobile-web-app-title', content: 'TecNews' },
    ],
  },
})
