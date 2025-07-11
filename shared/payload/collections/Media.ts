import type { CollectionConfig } from 'payload'
import { publicRead, isEditor } from '../../utils/access'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: publicRead, // Public can read/view media
    create: isEditor, // Only admin & editor can upload
    update: isEditor, // Only admin & editor can update
    delete: isEditor, // Only admin & editor can delete
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
  upload: true,
}
