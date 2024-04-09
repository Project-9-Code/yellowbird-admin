import Button from "@/components/Button";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";
import { Metadata } from "next";
import CreateAccountForm from "./component/CreateAccountForm";

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

        <CreateAccountForm />
      </div>

      <span className="text-base font-medium">
        Already have an account? <StyledLink href="/auth/signin" className="text-base">Sign In</StyledLink>
      </span>
    </div>
  );
}