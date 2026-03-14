import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { C } from "@/constants/colors"
import { Ic } from "@/constants/crisp-svg"
import { DistrictSelect } from "../DistrictSelect"
import { Checkbox } from "@/components/ui/checkbox"
import { MoveLeft } from "lucide-react"

const SignUpForm = () => {
  return (
     <form className="w-full max-w-sm">

      <FieldGroup>
        <Field>
          <h3 className="font-bold text-2xl">Create your account</h3>
          <p className="text-muted-foreground text-sm">Already have an account? <Button variant={"link"}>Sign in</Button></p>
        </Field>
        <Field>
          <FieldLabel htmlFor="fullname-required">
          FullName <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            id="form-name"
            type="text"
            className="h-11"
            placeholder="Kasule Andrew"
            leftIcon={<Ic n="user" s={18} c={C.muted}/>}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input
          id="form-email"
          type="email"
          placeholder="andrew@example.com"
          leftIcon={<Ic n="mail" s={18} c={C.muted}/>}
          className="h-11"
          required
          />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </Field>

        <Field>
            <FieldLabel htmlFor="phonenumber-required">
            PhoneNumber <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
            id="form-phone"
            type="tel"
            placeholder="7XX XXX XXX"
            className="h-11"
            required
            />
        </Field>

        {/* District selection component */}
        <DistrictSelect/>




         <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="password-required">
            Password <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
            id="form-password"
            type="password"
            placeholder="Min 8 chars"
            className="h-11"
            required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="fullname-required">
            Confirm-password <span className="text-destructive">*</span>
            </FieldLabel>
            <Input
            id="form-password-conformation"
            type="password"
            placeholder="Repeat password"
            className="h-11"
            required
            />
          </Field>
        </div>
        <Field orientation="horizontal">
              <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic" />
              <FieldLabel htmlFor="terms-checkbox-basic" className='text-muted-foreground'>
               <p className="text-xs">I agree to Shamba's <span className="text-primary"> Terms of Service, Privacy Policy</span>, and <span className="text-primary">Farmer Agreement.</span></p>
              </FieldLabel>
         </Field>

         <Field>
            <Button className="w-full h-11 mt-4">
              Create Account <Ic n="arrow" s={18} c={'var(--primary-foreground)'} />
            </Button>
         </Field>

         <Field>
            <Button className="w-full h-11 mt-4" variant={"ghost"}>
              <MoveLeft /> Back
            </Button>
         </Field>

      </FieldGroup>

    </form>
  )
}

export default SignUpForm