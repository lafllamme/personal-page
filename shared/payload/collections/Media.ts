import type {CollectionConfig} from 'payload'
import {publicRead, isEditor} from '../../utils'

const MediaCollection: CollectionConfig = {
    slug: 'media',
    upload: {disableLocalStorage: true},
    access: {
        read: publicRead, // Public can read media files
        create: isEditor, // Only admin & editor can create
        update: isEditor, // Only admin & editor can update
        delete: isEditor, // Only admin & editor can delete
    },
    hooks: {},
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
