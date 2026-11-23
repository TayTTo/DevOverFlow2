import { Outlet, createFileRoute } from '@tanstack/react-router'

import SocialAuthForm from '@/components/forms/SocialAuthForm'

// Pathless layout: replaces Next.js app/(auth)/layout.tsx
export const Route = createFileRoute('/_auth')({ component: AuthLayout })

function AuthLayout() {
  return (
    <div className="flex-center items-center justify-center bg-auth-light dark:bg-auth-dark min-h-screen px-4 py-4 shadow-light-300 bg-cover bg-no-repeat bg-center">
      <div className="light-border background-light800_dark200 shadow-light100_dark100 rounded-[10] min-w-full px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8 border">
        <div className="flex items-center justify-between gap-2">
          <div className="gap-y-2.5">
            <h1 className="h2-bold text-dark100_light900">Join DevFlow</h1>
            <p className="paragraph-regular text-dark500_light400">
              to continue to DevFlow
            </p>
          </div>
          <img
            src="/images/site-logo.svg"
            alt="site logo"
            height={23}
            width={23}
          />
        </div>
        <Outlet />
        <SocialAuthForm />
      </div>
    </div>
  )
}
