"use client";

import { signup } from "@/actions/auth";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";
import { FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "react-toastify";

export default function CreateAccountForm() {
  const { pending } = useFormStatus();
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await signup(new FormData(e.currentTarget));
    if (result) {
      toast.error(result, { position: "bottom-center" });
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <InputField
        id="name"
        label="Name"
        placeholder="Full name"
        containerClass="mb-6"
      />

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
        min={8}
        placeholder="Your password"
        containerClass="mb-6"
      />

      <div className="text-base text-bodyText mb-10">
        By clicking “Create your account” below, you agree to our <StyledLink href="">Terms of Service and Privacy Statement</StyledLink>. We’ll occasionally send you account related emails.
      </div>

      <Button label="Create Account" type="submit" loading={pending} />
    </form>
  );
}