import clsx from "clsx";
import { MouseEventHandler, ReactNode } from "react";
import { ClockLoader } from "react-spinners";

interface ButtonProps {
  label?: ReactNode;
  type?: "submit" | "reset" | "button";
  buttonClassName?: string;
  textClassName?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      disabled={props.loading}
      className={clsx(`flex flex-row p-3 justify-center items-center bg-success w-full rounded`, props.buttonClassName)}
      type={props.type}
      onClick={props.onClick}
    >
      {props.loading && <ClockLoader size={16} color="white" loading className="mr-[4px]" />}
      <span className={clsx("text-white text-base font-medium", props.textClassName)}>
        {props.label}
      </span>
    </button>
  );
}
