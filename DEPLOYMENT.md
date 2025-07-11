# 🚀 Deployment Guide

This monorepo contains two separate applications that need to be deployed separately:

## 📦 Applications
- **CMS**: Next.js + Payload CMS (`cms/` folder)
- **Frontend**: Nuxt.js (`frontend/` folder)

## 🎯 Deployment Steps

### Step 1: Deploy CMS (Backend)

1. **Create new Vercel project for CMS:**
   ```bash
   cd cms/
   vercel --prod
   ```

2. **Set environment variables in Vercel dashboard:**
   - `DATABASE_URI`: Your PostgreSQL connection string
   - `PAYLOAD_SECRET`: A secure secret key for Payload

3. **Note the CMS URL** (e.g., `https://your-cms.vercel.app`)

### Step 2: Deploy Frontend

1. **Create new Vercel project for Frontend:**
   ```bash
   cd frontend/
   vercel --prod
   ```

2. **Set environment variables in Vercel dashboard:**
   - `PAYLOAD_PUBLIC_SERVER_URL`: The CMS URL from Step 1
   - `FRONTEND_URL`: Your frontend URL (e.g., `https://your-frontend.vercel.app`)
   - `NUXT_BUTTONDOWN_API_KEY`: Your newsletter API key (optional)

## 🔧 Environment Variables

### CMS Variables:
```
DATABASE_URI=postgresql://user:pass@host:5432/dbname
PAYLOAD_SECRET=your-secret-here
```

### Frontend Variables:
```
PAYLOAD_PUBLIC_SERVER_URL=https://your-cms.vercel.app
FRONTEND_URL=https://your-frontend.vercel.app
NUXT_BUTTONDOWN_API_KEY=your-key-here
```

## 🧪 Testing

After deployment:
1. Test CMS: `https://your-cms.vercel.app/admin`
2. Test Frontend: `https://your-frontend.vercel.app`
3. Test API connection: `https://your-frontend.vercel.app/demo`

## 📁 Project Structure
```
personal-page/
├── cms/           # Payload CMS (Next.js)
├── frontend/      # Nuxt.js frontend
├── shared/        # Shared types/utils
└── DEPLOYMENT.md  # This file
``` 