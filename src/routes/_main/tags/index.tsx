import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/tags/')({ component: Tags })

function Tags() {
  return <div>Tags</div>
}
