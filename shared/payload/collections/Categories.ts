import type { CollectionConfig } from 'payload'
import { publicRead, isEditor } from '../../utils/access.js'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'description', 'updatedAt'],
  },
  access: {
    read: publicRead, // Public can read categories
    create: isEditor, // Only admin & editor can create
    update: isEditor, // Only admin & editor can update
    delete: isEditor, // Only admin & editor can delete
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the category name',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of the category',
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color code for the category (e.g., #3B82F6)',
      },
    },
  ],
} 