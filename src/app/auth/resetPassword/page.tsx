import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ChangeEvent, useCallback, useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);
  const onSubmit = useCallback(async () => {
    await sendPasswordResetEmail(getAuth(), email);
  }, [email]);

  return (
    <div className="w-[470px] m-auto rounded-md bg-white p-[40px] pt-[26px] ring-1 ring-black/[0.12] mb-5">
      <h1 className="mb-5 font-ginto text-4xl text-headlineText font-medium">
        Password Reset
      </h1>

      <form onSubmit={onSubmit}>
        <InputField
          id="email"
          label="Email Address"
          type="email"
          placeholder="you@youremail.com"
          value={email}
          onChange={onEmailChange}
        />

        <div className="mt-1 mb-11 text-sm text-subtext">
          To reset your password, please enter the email address you use to sign in to Yellowbird.
        </div>

        <Button label="Send Reset Email" type="submit" />
      </form>
    </div>
  );
}