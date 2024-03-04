import Button from "@/components/Button";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";

export default function SignInForm() {
  return (
    <form action={async () => {}}>
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
        containerClass="mb-10"
        labelActions={(
          <StyledLink href="/auth/resetPassword">
            Forgot Password?
          </StyledLink>
        )}
      />

      <Button label="Sign In" type="submit" />
    </form>
  );
}
