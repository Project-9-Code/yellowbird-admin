import { UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import DragHandle from "@/svgs/drag-handle.svg";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  id?: UniqueIdentifier;
  focused?: boolean;
  className?: string;
  footer?: React.ReactNode;
  disableDrag?: boolean;
  onClick?: () => void;
}

export default function Card(props: PropsWithChildren<CardProps>) {
  const { className, children, footer, focused, disableDrag, id="", onClick } = props;
  const borderBg = focused ? "border-actionLink" : "border-borderBg";
  const shadow = focused ? "shadow-[0_0_0_4px_#92D5F2]" : undefined;
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    transition,
  } : undefined;

  return (
    <div
      id={id as string}
      onClick={onClick}
      className={clsx("bg-white border rounded-[6px] w-full max-w-[680px]", borderBg, shadow, className)}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex flex-col p-[24px] pt-[8px]">
        {!focused && !disableDrag && (
          <div className="flex items-center justify-center">
            <button {...listeners} {...attributes} type="button" aria-describedby="">
              <Image src={DragHandle} alt="Drag Handle" className="rotate-90" />
            </button>
          </div>
        )}
        {children}
      </div>

      {footer && (
        <div className="p-[24px] border-t border-borderBg">
          {footer}
        </div>
      )}
    </div>
  );
}
