import type { z } from 'zod'

import { authClient } from '@/lib/auth-client'
import type { signInSchema, signUpSchema } from '@/lib/validation'
import type { ActionResponse } from '@/types'

// Replaces lib/action/auth.action.ts. Better Auth does the work the
// Next.js version did by hand: hashing passwords, creating the user and
// account documents, and starting the session.

const toResponse = (error: { message?: string } | null): ActionResponse =>
  error
    ? { success: false, error: { message: error.message ?? 'Request failed' } }
    : { success: true }

export async function signUpWithCredentials(
  params: z.infer<typeof signUpSchema>,
): Promise<ActionResponse> {
  const { error } = await authClient.signUp.email(params)
  return toResponse(error)
}

export async function signInWithCredentials(
  params: z.infer<typeof signInSchema>,
): Promise<ActionResponse> {
  const { error } = await authClient.signIn.email(params)
  return toResponse(error)
}
