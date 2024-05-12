import { PropsWithChildren } from "react";

export default async function AppProviders(props: PropsWithChildren) {
  return <>{props.children}</>;
}
