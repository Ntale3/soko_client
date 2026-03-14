import AuthLayout from '@/components/auth/auth-layout'
import { panel } from '@/components/auth/sign-in-panel'
import { Logo } from '@/components/landing-page/logo'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { C } from '@/constants/colors'
import { Ic } from '@/constants/crisp-svg'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <AuthLayout panel={panel}>
      <div className="animate-[fadeUp_0.7s_cubic-bezier(.16,1,.3,1)_both]">
        {/* Heading Logo */}
        <div className="mb-8 lg:hidden">
          <Logo dark size="md" LogoStyle='text-primary' />
        </div>

        {/* Heading */}
        <div className='mb-8'>
            <h1 className="fraunces text-[32px] font-extrabold tracking-[-0.3px] mb-2 text-foreground">Welcome back</h1>
            <p className="text-[15px] text-muted-foreground">
            Don't have an account?{" "}
            <Button className='' variant={'link'} >
              <div className='flex items-center gap-0.5 justify-center'>
                <p className='text-primary font-semibold block'>Sign up free</p>
                <Ic n="arrow" s={18} c={'var(--primary)'} />
              </div>
            </Button>
            </p>

        </div>

      <Button
        className="mb-6 gap-3 py-3.25 px-7 rounded-[14px] text-[15px] w-full h-11"
        variant={'outline'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </Button>
    <div className="flex items-center gap-3">
      <Separator className="flex-1" />
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          or continue with email
        </p>
      <Separator className="flex-1" />
    </div>

    <form className='flex flex-col gap-2 mt-6'>

      <FieldGroup>

        <Field>
          <FieldLabel htmlFor="fullname-required">
           Email Address
          </FieldLabel>
          <Input
          leftIcon={<Ic n="mail" s={18} c={C.muted} />}
          type='email'
          className='h-11'
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="fullname-required">
           Password
          </FieldLabel>
          <Input
          leftIcon={<Ic n="lock" s={18} c={C.muted} />}
          type='password'
          className='h-11'
          />
        </Field>

        <Field orientation="horizontal">
          <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
          <FieldLabel htmlFor="terms-checkbox-basic" className='text-muted-foreground'>
            Keep me signed in for 30 days
          </FieldLabel>
        </Field>

        <Field>
          <Button className='w-full h-11'>
            Sign In <Ic n="arrow" s={18} c={'var(--primary-foreground'} />
        </Button>
        </Field>

        <Field>
          <p className='text-xs text-muted-foreground block'>
            By signing in you agree to our <span className='text-primary hover:underline'>Terms and conditions</span> and <span className='text-primary hover:underline'>Privacy Policy.</span>
          </p>
        </Field>

      </FieldGroup>

    </form>
    
      </div>
    </AuthLayout>
  )
}
