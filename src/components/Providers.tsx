import { getAuthenticatedAppForUser } from "@/utils/auth/server";
import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { User } from "firebase/auth";

export default async function AppProviders(props: PropsWithChildren) {
  const { currentUser } = await getAuthenticatedAppForUser();
  return (
    <AuthProvider serverUser={currentUser as User}>
      {props.children}
    </AuthProvider>
  );
}
