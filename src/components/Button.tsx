import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  label?: ReactNode;
  type?: "submit" | "reset" | "button";
  buttonClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={clsx(`p-3 justify-center items-center bg-success w-full rounded`, props.buttonClassName)}
      type={props.type}
      onClick={props.onClick}
    >
      <span className="text-white text-base font-medium">
        {props.label}
      </span>
    </button>
  );
}
