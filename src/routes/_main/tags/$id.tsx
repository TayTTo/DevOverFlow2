import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/tags/$id')({ component: Tag })

// Placeholder: the Next.js app linked here but had no page yet.
function Tag() {
  const { id } = Route.useParams()
  return <div>Tag {id}</div>
}
