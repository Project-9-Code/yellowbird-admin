import Button from "@/components/Button";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yellowbird Incubator",
};

export default function CreateUserPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[470px] m-auto rounded-md bg-white p-[40px] pt-[26px] ring-1 ring-black/[0.12] mb-5">
        <h1 className="mb-5 font-ginto text-4xl text-headlineText font-medium">
          Create your account
        </h1>

        <form>
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

          <Button label="Create Account" type="submit" />
        </form>
      </div>

      <span className="text-base font-medium">
        Already have an account? <StyledLink href="/auth/signin" className="text-base">Sign In</StyledLink>
      </span>
    </div>
  );
}