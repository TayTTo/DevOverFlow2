import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/sign-up')({ component: SignUp })

function SignUp() {
  // TODO(phase 3): migrate AuthForm
  return null
}
