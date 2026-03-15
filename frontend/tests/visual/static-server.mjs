import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../../storybook-static')
const host = '127.0.0.1'
const port = 6007

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.map', 'application/json; charset=utf-8'],
  ['.otf', 'font/otf'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.ttf', 'font/ttf'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
])

function resolveFilePath(urlPath) {
  const decodedPath = decodeURIComponent((urlPath || '/').split('?')[0])
  const normalizedPath = decodedPath === '/' ? '/index.html' : decodedPath
  const absolutePath = path.resolve(rootDir, `.${normalizedPath}`)

  // Prevent path traversal outside storybook-static.
  if (!absolutePath.startsWith(rootDir))
    return null

  if (existsSync(absolutePath) && statSync(absolutePath).isFile())
    return absolutePath

  if (existsSync(absolutePath) && statSync(absolutePath).isDirectory()) {
    const indexFile = path.join(absolutePath, 'index.html')
    if (existsSync(indexFile))
      return indexFile
  }

  return null
}

const server = createServer((req, res) => {
  const filePath = resolveFilePath(req.url ?? '/')
  if (!filePath) {
    res.statusCode = 404
    res.setHeader('content-type', 'text/plain; charset=utf-8')
    res.end('Not Found')
    return
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = mimeTypes.get(ext) ?? 'application/octet-stream'
  res.statusCode = 200
  res.setHeader('content-type', contentType)
  createReadStream(filePath).pipe(res)
})

server.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`[visual-server] serving ${rootDir} on http://${host}:${port}`)
})
