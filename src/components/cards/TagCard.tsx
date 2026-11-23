import type React from 'react'
import { Link } from '@tanstack/react-router'

import { Badge } from '@/components/ui/badge'
import { getDeviconClassName } from '@/lib/utils'

interface TagProps {
  _id: string
  name: string
  questionsCount?: number
  showCount?: boolean
  compact?: boolean
  remove?: boolean
  isButton?: boolean
  handleRemove?: () => void
}

const TagCard = ({
  _id,
  name,
  questionsCount,
  showCount,
  compact,
  remove,
  isButton,
  handleRemove,
}: TagProps) => {
  const iconClass = getDeviconClassName(name)
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  const Content = (
    <Badge className="flex flex-row subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
      <div className="flex-center space-x-2">
        <i className={`${iconClass} text-sm`} />
        <span>{name}</span>
      </div>
      {remove && (
        <img
          src="/icons/close.svg"
          width={12}
          height={12}
          alt="close icon"
          className="cursor-pointer object-contain invert-0 dark:invert"
          onClick={handleRemove}
        />
      )}
      {showCount && (
        <p className="small-medium text-dark500_light700">{questionsCount}</p>
      )}
    </Badge>
  )

  if (!compact) return null

  return isButton ? (
    <button onClick={handleClick} className="flex justify-between gap-2">
      {Content}
    </button>
  ) : (
    <Link
      to="/tags/$id"
      params={{ id: _id }}
      className="flex justify-between gap-2"
    >
      {Content}
    </Link>
  )
}

export default TagCard
