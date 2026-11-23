import { createFileRoute } from '@tanstack/react-router'

import QuestionForm from '@/components/forms/QuestionForm'

export const Route = createFileRoute('/_main/ask-question')({
  component: AskQuestion,
})

function AskQuestion() {
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Ask a question</h3>
      <div className="mt-9">
        <QuestionForm />
      </div>
    </div>
  )
}
