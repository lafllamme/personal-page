import { consola } from 'consola'

export function useImageUrl() {
  const { public: { payloadUrl } } = useRuntimeConfig()
  const apiBase = payloadUrl

  function getImageUrl(url?: string) {
    if (!url)
      return ''
    if (url.startsWith('http'))
      return url

    // Ensure no double slashes
    if (url.startsWith('/')) {
      return apiBase + url
    }
    consola.debug('[useImageUrl] Constructing image URL:', url)
    return `${apiBase}/${url}`
  }

  return { getImageUrl }
}
