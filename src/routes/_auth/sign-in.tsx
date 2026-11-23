import { createFileRoute } from '@tanstack/react-router'

import AuthForm from '@/components/forms/AuthForm'
import { signInWithCredentials } from '@/lib/actions/auth'
import { signInSchema } from '@/lib/validation'

export const Route = createFileRoute('/_auth/sign-in')({ component: SignIn })

function SignIn() {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={signInSchema}
      defaultValues={{ email: '', password: '' }}
      onSubmit={signInWithCredentials}
    />
  )
}
