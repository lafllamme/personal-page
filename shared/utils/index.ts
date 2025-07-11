// Shared utility functions

export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString()
}

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

// Export access control utilities
export * from './access' 