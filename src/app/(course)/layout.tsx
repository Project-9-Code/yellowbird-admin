import AppLayout from "@/components/AppLayout";
import AppHeader from "@/components/Header";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <AppLayout header={<AppHeader />}>
      {children}
    </AppLayout>
  );
}
