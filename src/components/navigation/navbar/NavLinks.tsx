import React from 'react'
import { Link, useLocation } from '@tanstack/react-router'

import { SheetClose } from '@/components/ui/sheet'
import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathname = useLocation({ select: (location) => location.pathname })

  return (
    <div className="flex flex-col gap-4">
      {sideBarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route

        const LinkComponent = (
          <Link
            to={item.route}
            className={cn(
              isActive
                ? 'primary-gradient rounded-lg text-light-900'
                : 'text-dark300_light900',
              'flex items-center justify-start gap-4 bg-transparent p-4',
            )}
          >
            <img
              src={item.imgUrl}
              width={16}
              height={16}
              alt={item.label}
              className={cn({ 'invert-colors': !isActive })}
            />
            <p
              className={cn(
                isActive ? 'base-bold' : 'base-medium',
                !isMobileNav && 'max-lg:hidden',
              )}
            >
              {item.label}
            </p>
          </Link>
        )

        return isMobileNav ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        )
      })}
    </div>
  )
}

export default NavLinks
