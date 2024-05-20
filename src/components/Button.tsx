"use client";

import { cn } from "@/utils/common";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent, MouseEventHandler, PropsWithChildren, ReactNode, forwardRef, useCallback } from "react";
import { ClockLoader } from "react-spinners";
import { Button } from "./ui/button";

interface ButtonProps {
  label?: ReactNode;
  type?: "submit" | "reset" | "button";
  buttonClassName?: string;
  textClassName?: string;
  loading?: boolean;
  showLoader?: boolean;
  isLink?: boolean;
  href?: string;
  preventDefault?: boolean;
  goBack?: boolean;
  onClick?: (MouseEventHandler<HTMLButtonElement>);
}

export default forwardRef<any, PropsWithChildren<ButtonProps>>(function AppButton(props, ref) {
  const router = useRouter();
  const { showLoader=true, loading=false, isLink=false, href="", preventDefault=true, goBack, onClick } = props;
  const isLoading = showLoader && loading;

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (props.type !== "submit" && preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (goBack) router.back();
    onClick?.(e);
  }, [onClick, router, goBack, preventDefault, props.type]);

  return (
    (isLink) ? (
      <Link
        ref={ref}
        href={href}
        className={cn(`flex flex-row p-3 justify-center items-center bg-success w-full rounded`, props.buttonClassName)}
      >
        <span className={cn("text-white text-base font-medium", props.textClassName)}>
          {props.label}
        </span>
        {props.children}
      </Link>
    ) : (
      <Button
        ref={ref}
        disabled={isLoading}
        className={cn(`flex flex-row p-3 justify-center items-center bg-success w-full rounded`, props.buttonClassName)}
        type={props.type}
        onClick={handleClick}
      >
        {isLoading && <ClockLoader size={16} color="white" loading className="mr-[4px]" />}
        <span className={cn("text-white text-base font-medium", props.textClassName)}>
          {props.label}
        </span>
        {props.children}
      </Button>
    )
  );
});
