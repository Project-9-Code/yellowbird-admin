import { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { getUser } from "@/utils/firebase/server";
import { cookies } from "next/headers";

export default async function AppProviders(props: PropsWithChildren) {
  const user = await getUser(cookies());
  return (
    <AuthProvider serverUser={user}>
      {props.children}
    </AuthProvider>
  );
}
