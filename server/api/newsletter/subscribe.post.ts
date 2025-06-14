// server/api/newsletter/subscribe.post.ts
import type { ButtondownResponse } from '@/types'

export default defineEventHandler(async (event) => {
  // Parse frontend payload
  const { email } = await readBody(event) as { email?: string }

  // Validate email (simple regex)
  // TODO: Implemet zod validation
  if (!email || !/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }

  // Prepare Buttondown API payload
  const payload = {
    email_address: email,
    type: 'regular',
    tags: ['nuxt-newsletter'],
    ip_address:
            event.node.req.headers['x-forwarded-for']
            ?? event.node.req.socket.remoteAddress,
  }

  // Auth header from runtime config
  const token = useRuntimeConfig(event).email.newsletter.apiKey
  if (!token) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Newsletter not configured',
    })
  }

  try {
    // POST to Buttondown
    const res = await $fetch<ButtondownResponse>(
      'https://api.buttondown.com/v1/subscribers',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
          'X-Buttondown-Collision-Behavior': 'add',
        },
        body: payload,
      },
    )

    // Buttondown "already subscribed" or error
    if ('error' in res) {
      throw createError({ statusCode: 400, statusMessage: res.error })
    }

    return { success: true }
  }
  catch (err: any) {
    // Re-throw h3 errors, else general 500
    if (err.statusCode)
      throw err
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || String(err),
    })
  }
})
