import { PropsWithChildren } from "react";

export default function ErrorContainer(props: PropsWithChildren) {
  return (
    <div className="mt-4 bg-red-500 p-2 rounded-sm flex justify-center mb-6 text-white">
      {props.children}
    </div>
  )
}
