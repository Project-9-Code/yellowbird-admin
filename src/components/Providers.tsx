import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { User } from "firebase/auth";

export default async function AppProviders(props: PropsWithChildren) {
  return (
    <AuthProvider serverUser={{} as User}>
      {props.children}
    </AuthProvider>
  );
}
