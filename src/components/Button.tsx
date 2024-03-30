"use client";

import clsx from "clsx";
import Link from "next/link";
import { MouseEvent, MouseEventHandler, PropsWithChildren, ReactEventHandler, ReactNode, useCallback } from "react";
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
  onClick?: (MouseEventHandler<HTMLButtonElement>);
}

export default function Button(props: PropsWithChildren<ButtonProps>) {
  const { pending } = useFormStatus();
  const { showLoader=true, loading=false, isLink=false, href="", onClick } = props;
  const isLoading = showLoader && (loading || pending);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.(e);
  }, [onClick]);

  return (
    (isLink) ? (
      <Link
        href={href}
        className={clsx(props.buttonClassName, `flex flex-row p-3 justify-center items-center bg-success w-full rounded`)}
      >
        <span className={clsx("text-white text-base font-medium", props.textClassName)}>
          {props.label}
        </span>
        {props.children}
      </Link>
    ) : (
      <button
        disabled={isLoading}
        className={clsx(`flex flex-row p-3 justify-center items-center bg-success w-full rounded`, props.buttonClassName)}
        type={props.type}
        onClick={handleClick}
      >
        {isLoading && <ClockLoader size={16} color="white" loading className="mr-[4px]" />}
        <span className={clsx("text-white text-base font-medium", props.textClassName)}>
          {props.label}
        </span>
        {props.children}
      </button>
    )
  );
}
