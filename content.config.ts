import { defineCollection, defineContentConfig } from '@nuxt/content'
// TODO: Fix ts error
export default defineContentConfig({
  // Global markdown options
  // @ts-expect-error This is available, we need to find the correct type
  highlight: {
    theme: {
      default: 'github-light', // Default theme (same as single string)
      dark: 'github-dark', // Theme used if `html.dark`
      sepia: 'monokai', // Theme used if `html.sepia`
    },
  },
  markdown: {
    remarkPlugins: {
      'remark-emoji': {
        options: {
          emoticon: true,
        },
      },
      'remark-gfm': false,
      'remark-oembed': {},
    },
  },
  // Define collections separately
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
  },
})
