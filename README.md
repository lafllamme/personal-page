# Personal Page Monorepo

A modern monorepo combining Nuxt 3 frontend with Payload CMS 3.0 backend using **Local API Mode** and **TurboRepo** for maximum performance.

## 🏗️ Architecture

```
personal-page/
├── frontend/          # Nuxt 3 application (port 3000)
├── cms/              # Payload CMS 3.0 (port 3001)
├── shared/           # Shared Payload config, types and utilities
├── turbo.json        # TurboRepo configuration
└── ...configuration files
```

## ⚡ Key Features

### 🔥 Payload Local API Mode
- **Zero Network Latency**: Direct database access through `getPayload()`
- **Enhanced Security**: No external API exposure
- **Type Safety**: Shared TypeScript definitions
- **Better Performance**: Server-side request optimization

### 🚀 TurboRepo Integration
- **Intelligent Caching**: Build outputs cached automatically
- **Parallel Execution**: Run tasks across workspaces simultaneously
- **Optimized Builds**: Only rebuild what changed
- **Remote Caching**: Share cache across team (optional)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended)
- PostgreSQL database

### Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd personal-page
   pnpm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your database credentials and secrets.

3. **Database setup:**
   Create a PostgreSQL database:
   ```sql
   CREATE DATABASE personal_page_cms;
   ```

4. **Start development servers:**
   ```bash
   turbo dev
   ```
   This runs both frontend (localhost:3000) and CMS (localhost:3001) concurrently with optimized caching.

## 📁 Project Structure

### Frontend (`/frontend`)
- **Framework:** Nuxt 3 with TypeScript
- **Styling:** UnoCSS + TailwindCSS  
- **Components:** Comprehensive UI component library
- **Features:** i18n, dark mode, animations, 3D graphics
- **API Integration:** Local API mode through Nuxt server routes

### CMS (`/cms`) 
- **Framework:** Payload CMS 3.0 (Next.js based)
- **Database:** PostgreSQL
- **Admin Panel:** Available at `localhost:3001/admin`
- **Local API:** Shared configuration with frontend

### Shared (`/shared`)
- **Payload Config:** Common Payload configuration
- **Types:** TypeScript definitions shared between frontend and CMS
- **Utils:** Common utility functions

## 🛠️ Development

### TurboRepo Commands

```bash
# Development (with caching)
turbo dev              # Run both frontend and CMS
turbo dev --filter=@tec/frontend  # Run only frontend
turbo dev --filter=@tec/cms       # Run only CMS

# Building (with intelligent caching)
turbo build            # Build both apps
turbo build --filter=@tec/frontend  # Build frontend only
turbo build --filter=@tec/cms       # Build CMS only

# Type generation
turbo payload:generate-types  # Generate types from Payload CMS

# Utilities
turbo clean            # Clean all build artifacts
turbo lint            # Lint both projects
```

### Local Development URLs

- **Frontend:** http://localhost:3000
- **CMS Admin:** http://localhost:3001/admin
- **Test Integration:** http://localhost:3000/cms-test

## 🔧 Local API Architecture

### How It Works

Instead of making HTTP requests between frontend and CMS, we use Payload's **Local API Mode**:

1. **Shared Configuration**: Both apps import the same Payload config from `/shared`
2. **Nuxt Server Routes**: API routes in `/frontend/server/api/cms/` use `getPayload()` directly
3. **Zero Latency**: Direct database access without network overhead
4. **Type Safety**: Shared TypeScript types ensure consistency

### API Routes

```typescript
// Frontend API routes using Local API
GET /api/cms/[collection]           # Find collection documents
GET /api/cms/[collection]/[id]      # Find by ID
GET /api/cms/[collection]/slug/[slug]  # Find by slug
```

### Frontend Usage

```typescript
const { getPages, getPosts, getPageBySlug } = usePayloadAPI()

// Fetch all pages (uses local API internally)
const pages = await getPages()

// Fetch a specific page by slug (zero network latency)
const page = await getPageBySlug('about')
```

## 🚀 Deployment

### Vercel (Recommended)

The monorepo is configured for seamless Vercel deployment with local API benefits:

1. **Connect your repository to Vercel**
2. **Set environment variables:**
   - `DATABASE_URI` - Your production PostgreSQL connection string
   - `PAYLOAD_SECRET` - A secure random string
   - `FRONTEND_URL` - Your domain URL

3. **Deploy:** Vercel will automatically build and deploy both applications

### Environment Variables

| Variable | Description | Development | Production |
|----------|-------------|-------------|------------|
| `DATABASE_URI` | PostgreSQL connection string | `postgres://postgres:password@localhost:5432/personal_page_cms` | Your hosted DB URL |
| `PAYLOAD_SECRET` | Payload encryption key | Any random string | Secure random string |
| `PAYLOAD_PUBLIC_SERVER_URL` | CMS server URL | `http://localhost:3001` | `https://yourdomain.com` |
| `FRONTEND_URL` | Frontend URL | `http://localhost:3000` | `https://yourdomain.com` |

## 🏢 Architecture Benefits

### Local Development
- **🔥 Zero Latency**: Direct database access via local API
- **🔄 Parallel Development**: Work on frontend and CMS simultaneously
- **🧰 Type Safety**: Shared TypeScript types ensure consistency
- **⚡ Hot Reloading**: Both applications support HMR
- **📊 Intelligent Caching**: TurboRepo optimizes build performance

### Production
- **🚀 Single Deployment**: Deploy both apps together on Vercel
- **⚡ Optimized Performance**: Payload CMS 3.0's Next.js foundation + local API
- **📈 Scalable**: Ready for enterprise-level traffic
- **🔍 SEO Friendly**: SSR/SSG support from Nuxt
- **🔐 Enhanced Security**: No external API exposure

## 🧩 Key Technologies

- **🎯 Nuxt 3**: Full-stack Vue framework
- **📦 Payload CMS 3.0**: Next.js-based headless CMS  
- **⚡ TurboRepo**: High-performance build system
- **🗄️ PostgreSQL**: Robust database foundation
- **🎨 UnoCSS + TailwindCSS**: Atomic CSS framework
- **📝 TypeScript**: End-to-end type safety
- **🏗️ pnpm Workspaces**: Efficient package management

## 🔧 Configuration

### Adding New Collections to Payload

1. Create collection in `shared/payload/collections/`
2. Add to `shared/payload/config.ts`
3. Generate types: `turbo payload:generate-types`
4. Use in frontend with `usePayloadAPI()` composable

### Frontend Integration Examples

```typescript
// Get all posts with local API
const { getPosts } = usePayloadAPI()
const posts = await getPosts({ limit: 10, sort: '-publishedAt' })

// Get page by slug with zero latency
const { getPageBySlug } = usePayloadAPI()
const aboutPage = await getPageBySlug('about')

// Custom collection query
const { findCollection } = usePayloadAPI()
const products = await findCollection('products', {
  where: { featured: { equals: true } },
  limit: 5
})
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `turbo lint` and `turbo type-check`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using the latest web technologies for maximum performance and developer experience.**
