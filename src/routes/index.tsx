import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="bg-red-900">
      <h3 className="">Welcome Home!</h3>
    </div>
  )
}
