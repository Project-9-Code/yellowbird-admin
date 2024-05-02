import usePrivateRoute from "@/components/hooks/usePrivateRoute";
import { PropsWithChildren } from "react";

export default async function LessonLayout({ children }: PropsWithChildren) {
  await usePrivateRoute();
  return children;
}
