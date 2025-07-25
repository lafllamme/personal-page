import type { CollectionConfig } from 'payload'
import { put } from '@vercel/blob'
import { publicRead, isEditor } from '../../utils'

const MediaCollection: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: publicRead, // Public can read media files
    create: isEditor, // Only admin & editor can create
    update: isEditor, // Only admin & editor can update
    delete: isEditor, // Only admin & editor can delete
  },
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

export const Media = MediaCollection
