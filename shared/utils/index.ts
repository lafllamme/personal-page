// Shared utility functions

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString()
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Export access control utilities
export * from './access.js'
