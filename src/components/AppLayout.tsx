import { PropsWithChildren, Suspense } from "react";

export default function AppLayout(
  { header, children }:
  PropsWithChildren<{ header: React.ReactNode }>
) {
  return (
    <div className="flex flex-col w-full grow overflow-hidden">
      {header}
      <div className="flex grow flex-col items-center overflow-auto">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
