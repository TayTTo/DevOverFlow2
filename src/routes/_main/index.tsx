import { Link, createFileRoute } from '@tanstack/react-router'

import QuestionCard from '@/components/cards/QuestionCard'
import HomeFilter from '@/components/filter/HomeFilter'
import LocalSearch from '@/components/search/LocalSearch'
import { Button } from '@/components/ui/button'
import ROUTES from '@/constants/routes'
import { questions } from '@/constants/mock'

interface HomeSearch {
  query?: string
  filter?: string
}

export const Route = createFileRoute('/_main/')({
  // Replaces Next.js `searchParams`: parsed, typed, and validated here.
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    query:
      typeof search.query === 'string' && search.query
        ? search.query
        : undefined,
    filter:
      typeof search.filter === 'string' && search.filter
        ? search.filter
        : undefined,
  }),
  component: Home,
})

function Home() {
  const { query = '', filter = '' } = Route.useSearch()

  const filteredQuestions = questions.filter((question) => {
    const matchedQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchedFilter =
      !filter ||
      question.tags.some((tag) =>
        tag.name.toLowerCase().includes(filter.toLowerCase()),
      )
    return matchedQuery && matchedFilter
  })

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
      <section className="mt-11">
        <LocalSearch placeholder="Search questions..." otherClasses="flex-1" />
        <HomeFilter />
      </section>
      <div className="mt-10 flex flex-col gap-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard key={question._id} question={question} />
          ))
        ) : (
          <p className="body-regular text-dark500_light700">
            No questions found.
          </p>
        )}
      </div>
    </>
  )
}
