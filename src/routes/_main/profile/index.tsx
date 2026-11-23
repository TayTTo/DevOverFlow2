import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/profile/')({ component: Profile })

function Profile() {
  return <div>Profile</div>
}
