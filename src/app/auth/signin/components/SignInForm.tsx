"use client";

import { signIn } from "@/actions/auth";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";
import { FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

export default function SignInForm() {
  const { pending } = useFormStatus();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await signIn(new FormData(e.currentTarget));
    if (result) {
      toast.error(result, { position: "bottom-center" });
    }
  }

  return (
    <form onSubmit={onSubmit}>
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
