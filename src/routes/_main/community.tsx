import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/community')({
  component: Community,
})

function Community() {
  return <div>Community</div>
}
