type FetchRetryOptions = RequestInit & {
  retries?: number
  baseDelayMs?: number
}

function mergeHeaders(defaults: HeadersInit, overrides?: HeadersInit) {
  const merged = new Headers(defaults)
  if (overrides) {
    const extra = new Headers(overrides)
    extra.forEach((value, key) => {
      merged.set(key, value)
    })
  }
  return merged
}

export async function fetchWithRetry(
  url: string,
  optionsOrRetries: FetchRetryOptions | number = 2,
  baseDelayMs = 400,
): Promise<Response> {
  let lastErr: unknown
  const defaultHeaders: HeadersInit = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.2 Mobile/22C152 Safari/604.1',
    'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
  }

  const options = typeof optionsOrRetries === 'number' ? undefined : optionsOrRetries
  const retries = typeof optionsOrRetries === 'number' ? optionsOrRetries : (options?.retries ?? 2)
  const delayBase = typeof optionsOrRetries === 'number' ? baseDelayMs : (options?.baseDelayMs ?? 400)

  const headers = mergeHeaders(defaultHeaders, options?.headers)

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { ...options, headers })
      if (!res.ok)
        console.error(`HTTP ${res.status} ${res.statusText}`)
      return res
    }
    catch (err) {
      lastErr = err
      if (attempt < retries) {
        const delay = delayBase * 2 ** attempt
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  throw lastErr
}
