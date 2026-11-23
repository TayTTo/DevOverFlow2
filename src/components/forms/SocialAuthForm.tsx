import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'
import { authClient } from '@/lib/auth-client'

const SocialAuthForm = () => {
  const buttonClass =
    'background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3 flex-wrap mt-1.5'

  // Replaces next-auth's signIn(provider): redirects to GitHub/Google and
  // back to the home page.
  const handleSignIn = async (provider: 'github' | 'google') => {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: ROUTES.HOME,
    })
    if (error) {
      toast.error('Sign-in failed', {
        description: error.message ?? `Could not sign in with ${provider}`,
      })
    }
  }

  return (
    <div className="flex mt-10 flex-wrap gap-2.5">
      <Button className={buttonClass} onClick={() => handleSignIn('github')}>
        <img
          src="/icons/github.svg"
          alt="GitHub logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>Log in with GitHub</span>
      </Button>
      <Button className={buttonClass} onClick={() => handleSignIn('google')}>
        <img
          src="/icons/google.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>Log in with Google</span>
      </Button>
    </div>
  )
}

export default SocialAuthForm
