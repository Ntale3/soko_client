import AuthLayout from '@/components/auth/auth-layout'
import { panel } from '@/components/auth/sign-up-panel'
import { createFileRoute } from '@tanstack/react-router'
import { StepWrapper } from '@/components/auth/sign-up-steps/StepWrapper'

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout panel={panel}>
     <StepWrapper/>
    </AuthLayout>
  )
}
