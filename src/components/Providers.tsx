import { PropsWithChildren } from "react";
import { Theme } from '@radix-ui/themes';

export default async function AppProviders(props: PropsWithChildren) {
  return (
    <Theme className="flex flex-grow">
      {props.children}
    </Theme>
  );
}
