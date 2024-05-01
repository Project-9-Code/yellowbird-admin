import AppLayout from "@/components/AppLayout";
import AppHeader from "@/components/Header";
import usePrivateRoute from "@/components/hooks/usePrivateRoute";
import { PropsWithChildren } from "react";

export default async function MainLayout({ children }: PropsWithChildren) {
  await usePrivateRoute();

  return (
    <AppLayout header={<AppHeader />}>
      {children}
    </AppLayout>
  );
}
