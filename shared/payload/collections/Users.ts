import type { CollectionConfig } from 'payload'

export const roleOptions = ['admin', 'editor', 'viewer'] as const
export type Role = (typeof roleOptions)[number]

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true, // Enable API key authentication
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'createdAt'],
  },
  access: {
    // Only admins can create new users
    create: ({ req }) => {
      const user = req.user
      return !!user && user.role === 'admin'
    },
    // Users can read their own profile, admins can read all
    read: ({ req }) => {
      const user = req.user
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // Users can update their own profile, admins can update all
    update: ({ req }) => {
      const user = req.user
      if (!user) return false
      if (user.role === 'admin') return true
      return { id: { equals: user.id } }
    },
    // Only admins can delete users
    delete: ({ req }) => {
      const user = req.user
      return !!user && user.role === 'admin'
    },
  },
  fields: [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: roleOptions.map(r => ({ 
        label: r.charAt(0).toUpperCase() + r.slice(1), 
        value: r 
      })),
      admin: {
        position: 'sidebar',
        description: 'User role determines access permissions',
      },
      access: {
        // Only admins can change roles
        update: ({ req }) => {
          const user = req.user
          return !!user && user.role === 'admin'
        },
      },
    },
    {
      name: 'firstName',
      type: 'text',
      admin: {
        description: 'User\'s first name',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        description: 'User\'s last name',
      },
    },
    // email + password come from the Auth plugin automatically
  ],
}

export default Users
