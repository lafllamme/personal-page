import { consola } from 'consola'

export function useImageUrl() {
  const { public: { payloadUrl } } = useRuntimeConfig()
  const apiBase = payloadUrl

  function getImageUrl(url?: string) {
    if (!url) {
      consola.debug('[useImageUrl] No URL provided')
      return ''
    }
    
    // If it's already a full URL, return as is
    if (url.startsWith('http')) {
      consola.debug('[useImageUrl] Full URL detected:', url)
      return url
    }

    // Handle relative URLs from Payload CMS
    let finalUrl = url
    
    // If it starts with /api/media/file/, it's a Payload media URL
    if (url.startsWith('/api/media/file/')) {
      finalUrl = `${apiBase}${url}`
    }
    // If it starts with /uploads/, it's a local upload
    else if (url.startsWith('/uploads/')) {
      finalUrl = `${apiBase}${url}`
    }
    // If it's just a filename, assume it's in uploads
    else if (!url.startsWith('/')) {
      finalUrl = `${apiBase}/uploads/${url}`
    }
    // If it starts with /, just prepend the API base
    else {
      finalUrl = `${apiBase}${url}`
    }

    consola.debug('[useImageUrl] Constructed image URL:', { original: url, final: finalUrl })
    return finalUrl
  }

  return { getImageUrl }
}
