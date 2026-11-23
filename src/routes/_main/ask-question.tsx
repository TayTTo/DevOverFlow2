import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/ask-question')({
  component: AskQuestion,
})

function AskQuestion() {
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Ask a question</h3>
      {/* TODO(phase 2): migrate QuestionForm and the MDX editor */}
    </div>
  )
}
