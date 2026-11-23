import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/collections')({
  component: Collections,
})

function Collections() {
  return <div>Collections</div>
}
