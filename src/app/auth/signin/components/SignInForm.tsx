"use client";

import Button from "@/components/Button";
import ErrorContainer from "@/components/ErrorContainer";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";
import { signIn } from "@/utils/firebase/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), [setEmail]);
  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), [setPassword]);

  const onSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    setError(undefined);
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.refresh();
    } catch (e) {
      const code = (e as any).code;
      switch (code) {
        case "auth/wrong-password":
          setError("Invalid password");
          break;
      
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        
        default:
          console.error(e);
          break;
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, router]);

  return (
    <form onSubmit={onSubmit}>
      <InputField
        id="email"
        label="Email Address"
        type="email"
        placeholder="you@youremail.com"
        containerClass="mb-6"
        value={email}
        onChange={onEmailChange}
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
        value={password}
        onChange={onPasswordChange}
      />
      
      {error && (
        <ErrorContainer>
          <span>{error}</span>
        </ErrorContainer>
      )}

      <Button label="Sign In" type="submit" loading={isLoading} />
    </form>
  );
}
