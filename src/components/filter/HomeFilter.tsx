import { getRouteApi } from '@tanstack/react-router'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const filters = [
  { name: 'React', value: 'react' },
  { name: 'Javascript', value: 'javascript' },
  // { name: 'Newest', value: 'newest' },
  // { name: 'Popular', value: 'popular' },
  // { name: 'Unanswered', value: 'unanswered' },
  // { name: 'Recommended', value: 'recommended' },
]

// Typed access to the home route's search params without importing the
// route file (avoids a circular import).
const homeRoute = getRouteApi('/_main/')

const HomeFilter = () => {
  // The URL is the single source of truth: no local `active` state needed.
  const { filter: active } = homeRoute.useSearch()
  const navigate = homeRoute.useNavigate()

  const handleFilterClick = (filter: string) => {
    void navigate({
      search: (prev) => ({
        ...prev,
        filter: filter === active ? undefined : filter,
      }),
    })
  }

  return (
    <div className="mt-10 flex-wrap sm:flex gap-3 hidden">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className={cn(
            'body-medium py-3 px-6 rounded-2 shadow-none capitalize',
            active === filter.value
              ? 'bg-primary-100 dark:bg-dark-400 primary-text-gradient'
              : 'background-light800_dark300 text-light-500',
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  )
}

export default HomeFilter
