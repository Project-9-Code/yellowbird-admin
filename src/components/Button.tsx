import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  label?: ReactNode;
  type?: "submit" | "reset" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={`p-3 justify-center items-center bg-success w-full rounded`}
      type={props.type}
      onClick={props.onClick}
    >
      <span className="text-white text-base font-medium">
        {props.label}
      </span>
    </button>
  );
}