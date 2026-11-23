import { Link } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'
import NavLinks from './navbar/NavLinks'

const LeftSideBar = () => {
  return (
    <div className="w-[266px] max-lg:w-fit max-lg:items-center border absolute top-0 left-0 pt-[108px] h-screen background-light900_dark200 light-border shadow-light-300 dark:shadow-none max-sm:hidden flex flex-col justify-between px-1 pb-2">
      <NavLinks />
      <div className="flex flex-col gap-1.5">
        <Button
          asChild
          className="w-full small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border py-3 shadow-none"
        >
          <Link to={ROUTES.SIGN_IN}>
            <img
              src="/icons/account.svg"
              alt="Account"
              width={20}
              height={20}
              className="invert-colors min-lg:hidden"
            />
            <span className="primary-text-gradient max-lg:hidden">Log in</span>
          </Link>
        </Button>
        <Button
          asChild
          className="w-full small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] rounded-lg border py-3 shadow-none"
        >
          <Link to={ROUTES.SIGN_UP}>
            <img
              src="/icons/sign-up.svg"
              alt="Sign up"
              width={20}
              height={20}
              className="invert-colors min-lg:hidden"
            />
            <span className="max-lg:hidden">Sign up</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default LeftSideBar
