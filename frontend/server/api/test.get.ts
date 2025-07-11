export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  return {
    success: true,
    message: "Server route works!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasDatabase: !!config.databaseUri,
    hasPayloadSecret: !!config.payloadSecret,
    url: getRequestURL(event).href,
  }
}) 