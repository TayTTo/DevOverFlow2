import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/question/$id')({
  component: QuestionDetails,
})

// Placeholder: the Next.js app linked here but had no page yet.
function QuestionDetails() {
  const { id } = Route.useParams()
  return <div>Question {id}</div>
}
