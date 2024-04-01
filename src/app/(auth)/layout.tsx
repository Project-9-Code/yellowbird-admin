import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className={`bg-snowGrey w-full h-full pt-[90px]`}>
      {children}
    </div>
  );
}
