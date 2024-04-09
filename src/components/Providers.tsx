import { PropsWithChildren } from "react";

export default async function AppProviders(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
