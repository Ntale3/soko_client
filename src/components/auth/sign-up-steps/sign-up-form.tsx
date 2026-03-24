import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { C } from "@/constants/colors"
import { Ic } from "@/constants/crisp-svg"
import { DistrictSelect } from "../DistrictSelect"
import { Checkbox } from "@/components/ui/checkbox"
import { MoveLeft } from "lucide-react"
import { useSignUpStore } from "@/store/useSignUpStore"
import { useState } from "react"

const SignUpForm = () => {
  const { next, back, setCanProceed } = useSignUpStore();

  const [fields, setFields] = useState({
    fullName: "", email: "", phone: "", password: "", confirm: "", terms: false,
  });

  function validate(updated: typeof fields) {
    const valid =
      updated.fullName.trim().length > 1 &&
      updated.email.includes("@") &&
      updated.phone.trim().length >= 9 &&
      updated.password.length >= 8 &&
      updated.password === updated.confirm &&
      updated.terms;
    setCanProceed(valid);
  }

  function update<K extends keyof typeof fields>(key: K, value: typeof fields[K]) {
    const updated = { ...fields, [key]: value };
    setFields(updated);
    validate(updated);
  }

  return (
    <form className="w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); next(); }}>
      <FieldGroup>
        <Field>
          <h3 className="font-bold text-2xl">Create your account</h3>
          <p className="text-muted-foreground text-sm">
            Already have an account? <Button variant="link">Sign in</Button>
          </p>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-name">FullName <span className="text-destructive">*</span></FieldLabel>
          <Input
            id="form-name" type="text" className="h-11" placeholder="Kasule Andrew"
            leftIcon={<Ic n="user" s={18} c={C.muted} />}
            value={fields.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input
            id="form-email" type="email" placeholder="andrew@example.com" className="h-11"
            leftIcon={<Ic n="mail" s={18} c={C.muted} />}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            required
          />
          <FieldDescription>We'll never share your email with anyone.</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="form-phone">PhoneNumber <span className="text-destructive">*</span></FieldLabel>
          <Input
            id="form-phone" type="tel" placeholder="7XX XXX XXX" className="h-11"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
          />
        </Field>

        <DistrictSelect />

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="form-password">Password <span className="text-destructive">*</span></FieldLabel>
            <Input
              id="form-password" type="password" placeholder="Min 8 chars" className="h-11"
              value={fields.password}
              onChange={(e) => update("password", e.target.value)}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="form-password-confirm">Confirm <span className="text-destructive">*</span></FieldLabel>
            <Input
              id="form-password-confirm" type="password" placeholder="Repeat password" className="h-11"
              value={fields.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              required
            />
          </Field>
        </div>

        <Field orientation="horizontal">
          <Checkbox
            id="terms-checkbox"
            checked={fields.terms}
            onCheckedChange={(v) => update("terms", !!v)}
          />
          <FieldLabel htmlFor="terms-checkbox" className="text-muted-foreground">
            <p className="text-xs">
              I agree to Shamba's <span className="text-primary">Terms of Service, Privacy Policy</span>, and <span className="text-primary">Farmer Agreement.</span>
            </p>
          </FieldLabel>
        </Field>

        <Field>
          <Button type="submit" className="w-full h-11 mt-4">
            Create Account <Ic n="arrow" s={18} c="var(--primary-foreground)" />
          </Button>
        </Field>

        <Field>
          <Button type="button" className="w-full h-11" variant="ghost" onClick={back}>
            <MoveLeft /> Back
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}

export default SignUpForm