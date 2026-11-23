import { useRouter } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'

const LogoutButton = ({ showLabelOnSmall = false }) => {
  const router = useRouter()

  const handleLogout = async () => {
    await authClient.signOut()
    await router.invalidate()
  }

  return (
    <Button
      onClick={handleLogout}
      className="w-full small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border py-3 shadow-none"
    >
      <LogOut className="size-5" />
      <span className={showLabelOnSmall ? '' : 'max-lg:hidden'}>Log out</span>
    </Button>
  )
}

export default LogoutButton
