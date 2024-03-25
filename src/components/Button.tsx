"use client";

import clsx from "clsx";
import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { ClockLoader } from "react-spinners";

interface ButtonProps {
  label?: ReactNode;
  type?: "submit" | "reset" | "button";
  buttonClassName?: string;
  textClassName?: string;
  loading?: boolean;
  showLoader?: boolean;
  isLink?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: ButtonProps) {
  const { pending } = useFormStatus();
  const { showLoader=true, loading=false, isLink=false, href="" } = props;
  const isLoading = showLoader && (loading || pending);

  return (
    (isLink) ? (
      <Link
        href={href}
        className={clsx(`flex flex-row p-3 justify-center items-center bg-success w-full rounded`, props.buttonClassName)}
      >
        <span className={clsx("text-white text-base font-medium", props.textClassName)}>
          {props.label}
        </span>
      </Link>
    ) : (
      <button
        disabled={isLoading}
        className={clsx(`flex flex-row p-3 justify-center items-center bg-success w-full rounded`, props.buttonClassName)}
        type={props.type}
        onClick={props.onClick}
      >
        {isLoading && <ClockLoader size={16} color="white" loading className="mr-[4px]" />}
        <span className={clsx("text-white text-base font-medium", props.textClassName)}>
          {props.label}
        </span>
      </button>
    )
  );
}
