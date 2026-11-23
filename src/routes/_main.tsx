import { Outlet, createFileRoute } from '@tanstack/react-router'

import LeftSideBar from '@/components/navigation/LeftSideBar'
import Navbar from '@/components/navigation/navbar'
import RightSideBar from '@/components/navigation/RightSideBar'

// Pathless layout: replaces Next.js app/(root)/layout.tsx
export const Route = createFileRoute('/_main')({ component: MainLayout })

function MainLayout() {
  return (
    <main className="background-light850_dark100 relative">
      <div>
        <Navbar />
      </div>
      <div className="flex">
        <LeftSideBar />
        <section className="flex flex-col lg:pl-[266] sm:pl-[80] background-light900_dark200 light-border min-h-screen pt-[108px] w-full min-lg:pr-[332]">
          <div className="mx-auto w-full max-w-5xl">
            <Outlet />
          </div>
        </section>
        <RightSideBar />
      </div>
    </main>
  )
}
