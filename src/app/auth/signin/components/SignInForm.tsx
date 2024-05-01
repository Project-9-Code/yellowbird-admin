"use client";

import { signIn } from "@/actions/auth";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";
import { useFormStatus } from "react-dom";

export default function SignInForm() {
  const { pending } = useFormStatus();

  return (
    <form action={signIn}>
      <InputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@youremail.com"
        containerClass="mb-6"
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Your password"
        containerClass="mb-6"
        labelActions={(
          <StyledLink href="/auth/resetPassword" className="text-xs">
            Forgot Password?
          </StyledLink>
        )}
      />

      <Button label="Sign In" type="submit" loading={pending} />
    </form>
  );
}
