import { getRequestHeaders } from '@tanstack/react-start/server'
import { ZodError } from 'zod'
import type { ZodSchema } from 'zod'

import { auth } from '@/lib/auth'
import { UnauthorizedError, ValidationError } from '@/lib/http-errors'
import dbConnect from '@/lib/mongoose'

// Shared guard for server functions (replaces the Next.js server-action
// helper): validates params, optionally requires a signed-in user, and
// connects to MongoDB.
type ActionOptions<T> = {
  params?: T
  schema?: ZodSchema<T>
  authorize?: boolean
}

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOptions<T>) {
  if (schema && params) {
    try {
      schema.parse(params)
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>,
        )
      }
      return new Error('Schema validation failed')
    }
  }

  let session: Session = null
  if (authorize) {
    session = await auth.api.getSession({ headers: getRequestHeaders() })
    if (!session) return new UnauthorizedError()
  }

  await dbConnect()
  return { params, session }
}

export default action
