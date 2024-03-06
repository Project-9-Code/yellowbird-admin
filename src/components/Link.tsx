import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

type StyledLinkProps = LinkProps & {
  className?: string;
}

export default function StyledLink(props: PropsWithChildren<StyledLinkProps>) {
  return (
    <Link
      href={props.href}
      className={clsx("text-actionLink text-base font-medium", props.className)}
    >
      {props.children}
    </Link>
  );
}
