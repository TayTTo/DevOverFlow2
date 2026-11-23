import { createFileRoute } from '@tanstack/react-router'

import AuthForm from '@/components/forms/AuthForm'
import { signUpWithCredentials } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validation'

export const Route = createFileRoute('/_auth/sign-up')({ component: SignUp })

function SignUp() {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{ username: '', name: '', email: '', password: '' }}
      onSubmit={signUpWithCredentials}
    />
  )
}
