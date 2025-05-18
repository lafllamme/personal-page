# Remove node_modules and build directories
# removes package-lock.json and pnpm-lock.yaml
# removes pnpm store and .npm directories

if [ -d ".node_modules" ]; then
  rm -rf node_modules
fi

if [ -d ".nuxt" ]; then
  rm -rf .nuxt
fi

if [ -d ".output" ]; then
  rm -rf .output
fi

if [ -d "build" ]; then
  rm -rf build
fi

if [ -f "package-lock.json" ]; then
  rm package-lock.json
fi

#if [ -f "pnpm-lock.yaml" ]; then
#  rm pnpm-lock.yaml
#fi

if [ -d ".pnpm-store" ]; then
  rm -rf .pnpm-store
fi
#Print a message to the console that we are finished with current time
echo "Cleaned at $(date)"