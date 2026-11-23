import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/jobs')({ component: Jobs })

function Jobs() {
  return <div>Jobs</div>
}
