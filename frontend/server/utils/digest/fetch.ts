export async function fetchWithRetry(url: string, retries = 2, baseDelayMs = 400): Promise<Response> {
  let lastErr: unknown
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'TecNewsDigest/0.1 (+https://example.com)',
          'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
        },
      })
      if (!res.ok)
        throw new Error(`HTTP ${res.status} ${res.statusText}`)
      return res
    }
    catch (err) {
      lastErr = err
      if (attempt < retries) {
        const delay = baseDelayMs * 2 ** attempt
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }
  throw lastErr
}
