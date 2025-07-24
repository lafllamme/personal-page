FROM node:22-alpine AS base

WORKDIR /app

# Copy only the root workspace files and relevant package.jsons
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY shared/package.json shared/
COPY frontend/package.json frontend/

# Install pnpm globally
RUN npm install -g pnpm

# Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# Copy the full monorepo (so shared code is available)
COPY . .

# Build the frontend app (and shared, if needed)
# Clean any previous builds first
RUN rm -rf /app/frontend/.nuxt /app/frontend/.output
RUN pnpm --filter @personal-page/frontend... build
RUN echo "=== DEBUG: Frontend contents after build ===" && ls -la /app/frontend
RUN echo "=== DEBUG: .nuxt contents ===" && ls -la /app/frontend/.nuxt
RUN echo "=== DEBUG: .output contents ===" && ls -la /app/frontend/.output
RUN echo "=== DEBUG: .output/nitro.json ===" && cat /app/frontend/.output/nitro.json
# Remove .nuxt directory to force Nuxt to use .output for SSR mode
RUN rm -rf /app/frontend/.nuxt
RUN echo "=== DEBUG: After removing .nuxt, frontend contents ===" && ls -la /app/frontend

WORKDIR /app/frontend
EXPOSE 3000
CMD ["pnpm", "docker:start"] 