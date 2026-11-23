import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sign-in')({ component: SignIn })

function SignIn() {
  // TODO(phase 3): migrate AuthForm
  return null
}
