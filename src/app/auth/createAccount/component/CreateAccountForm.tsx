"use client";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import StyledLink from "@/components/Link";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";

export default function CreateAccountForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const onNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setName(event.target.value), [setName]);
  const onEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value), [setEmail]);
  const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value), [setPassword]);

  const onSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
  
    try {
      setIsLoading(true);
      const user = await createUserWithEmailAndPassword(getAuth(), email, password);
      await updateProfile(user.user, { displayName: name });
    } catch (error) {
      console.error(error);
      setError("Error creating user");
    }
    setIsLoading(false);
  }, [email, password, name]);

  return (
    <form onSubmit={onSubmit}>
      <InputField
        id="name"
        label="Name"
        placeholder="Full name"
        containerClass="mb-6"
        value={name}
        onChange={onNameChange}
      />

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
        min={8}
        placeholder="Your password"
        containerClass="mb-6"
        value={password}
        onChange={onPasswordChange}
      />
      
      {error && (
        <div className="mt-4 bg-red-500 p-2 rounded-sm flex justify-center mb-6">
          <span className="text-white">{error}</span>
        </div>
      )}

      <div className="text-base text-bodyText mb-10">
        By clicking “Create your account” below, you agree to our <StyledLink href="">Terms of Service and Privacy Statement</StyledLink>. We’ll occasionally send you account related emails.
      </div>

      <Button label="Create Account" type="submit" onClick={onSubmit} />
    </form>
  );
}