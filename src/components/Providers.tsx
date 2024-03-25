import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { getUser } from "@/utils/auth/server";

export default async function AppProviders(props: PropsWithChildren) {
  const user = await getUser();

  return (
    <AuthProvider serverUser={user}>
      {props.children}
    </AuthProvider>
  );
}
