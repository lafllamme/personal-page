# Use the monorepo root as build context!
FROM node:18-alpine AS base

# 2. Set working directory
WORKDIR /app

# 3. Copy only the root workspace files and relevant package.jsons
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY shared/package.json shared/
COPY cms/package.json cms/

# 4. Install pnpm globally
RUN npm install -g pnpm

# 5. Install all workspace dependencies
RUN pnpm install --frozen-lockfile

# 6. Copy the full monorepo (so shared code is available)
COPY . .

# 7. Build the CMS app (and shared, if needed)
RUN pnpm --filter @tec/cms... build

# 8. Set the working directory to /app/cms for runtime
WORKDIR /app/cms

# 9. Expose the port your app runs on (e.g., 3001)
EXPOSE 3001

# 10. Start the app
CMD ["pnpm", "start"]
