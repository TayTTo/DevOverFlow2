import { createAuthClient } from 'better-auth/react'
import { inferAdditionalFields } from 'better-auth/client/plugins'

import type { auth } from './auth'

// Browser-side auth API (replaces next-auth/react). The type import lets
// signUp.email() accept the extra `username` field.
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
})
