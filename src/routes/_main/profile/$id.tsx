import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/$id')({
  component: UserProfile,
})

// Placeholder: the Next.js app linked here but had no page yet.
function UserProfile() {
  const { id } = Route.useParams()
  return <div>Profile {id}</div>
}
