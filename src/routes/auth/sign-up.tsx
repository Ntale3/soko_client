import AuthLayout from '@/components/auth/auth-layout'
import { RadioGroupChoiceCard } from '@/components/auth/sign-up-steps/choice-card'
import { panel } from '@/components/auth/sign-up-panel'
import { createFileRoute } from '@tanstack/react-router'
import SignUpForm from '@/components/auth/sign-up-steps/sign-up-form'
import { OnboardingChecklist } from '@/components/auth/OnboardingChecklist'
import { CheckList } from '@/components/auth/sign-up-steps/check-list'

export const Route = createFileRoute('/auth/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <AuthLayout panel={panel}>
      <div >

          {/* <RadioGroupChoiceCard/> */}
          {/* <SignUpForm/> */}
          <CheckList/>
      </div>
    </AuthLayout>
  )
}
