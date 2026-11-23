import { useEffect, useState } from 'react'
import { getRouteApi } from '@tanstack/react-router'

import { Input } from '@/components/ui/input'

interface SearchProps {
  placeholder: string
  otherClasses?: string
}

const homeRoute = getRouteApi('/_main/')

const LocalSearch = ({ placeholder, otherClasses = '' }: SearchProps) => {
  const { query = '' } = homeRoute.useSearch()
  const navigate = homeRoute.useNavigate()
  const [searchQuery, setSearchQuery] = useState(query)

  // Keep the input in sync when the URL changes elsewhere (e.g. Back button).
  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  // Debounce: update the URL 300ms after the user stops typing.
  useEffect(() => {
    if (searchQuery === query) return

    const debounceFn = setTimeout(() => {
      void navigate({
        search: (prev) => ({ ...prev, query: searchQuery || undefined }),
        replace: true, // don't add a history entry per keystroke
        resetScroll: false,
      })
    }, 300)

    return () => clearTimeout(debounceFn)
  }, [searchQuery, query, navigate])

  return (
    <div className="flex items-center gap-2.5 background-light800_darkgradient rounded-[10px] border p-4 h-[56px] w-full light-border-2">
      <img src="/icons/search.svg" alt="Search" width={20} height={20} />
      <Input
        value={searchQuery}
        placeholder={placeholder}
        className={`border-none shadow-none no-focus outline-none ${otherClasses}`}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}

export default LocalSearch
