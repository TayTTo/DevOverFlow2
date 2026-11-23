import { createFileRoute } from '@tanstack/react-router'

import { auth } from '@/lib/auth'

// Replaces app/api/auth/[...nextauth]/route.ts: Better Auth handles every
// /api/auth/* request (sign-in, sign-up, OAuth callbacks, session).
export const Route = createFileRoute('/api/auth/$')({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
})
