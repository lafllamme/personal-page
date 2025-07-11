import type { Access, AccessArgs } from 'payload'
import type { Role } from '../payload/collections/Users'

export const hasRole =
  (...allowed: Role[]): Access =>
  ({ req }: AccessArgs) => {
    const user = req.user
    return !!user && allowed.includes(user.role as Role)
  }

// Shorthand for common cases
export const isAdmin = hasRole('admin')
export const isEditor = hasRole('admin', 'editor')
export const isViewer = hasRole('admin', 'editor', 'viewer')

// Allow public read access but require authentication for write operations
export const publicRead: Access = () => true
export const authenticatedWrite: Access = ({ req }: AccessArgs) => !!req.user 