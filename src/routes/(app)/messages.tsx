import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/messages')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/(app)/messages"!</div>
}
