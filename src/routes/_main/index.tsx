import { Link, createFileRoute } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'

export const Route = createFileRoute('/_main/')({ component: Home })

function Home() {
  return (
    <>
      <section className="flex flex-col-reverse sm:flex-row justify-between w-full sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 text-light-900"
          asChild
        >
          <Link to={ROUTES.ASK_QUESTION}>Ask a question</Link>
        </Button>
      </section>
      {/* TODO(phase 2): LocalSearch, HomeFilter and the QuestionCard list */}
    </>
  )
}
