import StyledLink from "@/components/Link";
import { Metadata } from "next";
import SignInForm from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Yellowbird Incubator",
};

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[470px] m-auto rounded-md bg-white p-[40px] pt-[26px] ring-1 ring-black/[0.12] mb-5">
        <h1 className="mb-5 font-ginto text-4xl text-headlineText font-medium">
          Sign in to Yellowbird
        </h1>

        <SignInForm />
      </div>

      <span className="text-base font-medium">
        Don&apos;t have a login? <StyledLink href="/auth/createAccount" className="text-base">Create account</StyledLink>
      </span>
    </div>
  );
}
