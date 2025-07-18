import type { CollectionConfig } from 'payload'
import { put } from '@vercel/blob'

const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  hooks: {
    beforeChange: [
      async (args: any) => {
        const { data, file } = args
        if (file) {
          const { url } = await put(
            `uploads/${file.originalname}`,
            file.buffer,
            {
              access: 'public',
              token: process.env.BLOB_READ_WRITE_TOKEN,
            }
          )
          return {
            ...data,
            url, // set the url field to the blob URL
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for accessibility',
      },
    },
  ],
}

export default Media
