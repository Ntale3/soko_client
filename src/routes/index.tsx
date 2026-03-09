import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="max-h-dvh  h-100px bg-forest-texture">
      <h3 className="text-primary">Welcome Home!</h3>
    </div>
  )
}
