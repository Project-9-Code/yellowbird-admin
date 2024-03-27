import clsx from "clsx";
import { PropsWithChildren } from "react";

interface CardProps {
  focused?: boolean;
  className?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
}

export default function Card(props: PropsWithChildren<CardProps>) {
  const { className, footer } = props;
  const borderBg = props.focused ? "border-actionLink" : "border-borderBg";
  const shadow = props.focused ? "shadow-[0_0_0_4px_#92D5F2]" : undefined;

  return (
    <div
      onClick={props.onClick}
      className={clsx("bg-white border rounded-[6px] w-full max-w-[680px]", borderBg, shadow, className)}
    >
      <div className="p-[24px]">
        {props.children}
      </div>

      {footer && (
        <div className="p-[24px] border-t border-borderBg">
          {footer}
        </div>
      )}
    </div>
  );
}
