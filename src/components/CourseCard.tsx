"use client";

import { Course } from "@/graphql/graphql";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";

interface CourseCardProps {
  course: Course;
  selected?: boolean;
  showCheckbox?: boolean;
  onSelect?: (selected: boolean) => void;
};

export default function CourseCard(props: CourseCardProps) {
  const { onSelect } = props;
  const [isHovered, setIsHovered] = useState(false);
  const onHover = useCallback((e: MouseEvent<HTMLElement>) => setIsHovered(true), []);
  const onHoverOut = useCallback(() => setIsHovered(false), []);
  const onCourseSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => onSelect?.(e.target.checked), [onSelect]);
  const showCheckbox = props.showCheckbox || props.selected || isHovered;

  return (
    <div className="w-[234px] h-[252px] flex flex-col relative">
      <div
        className="w-[234px] h-[168px] bg-brand mb-4 rounded-md"
        onMouseEnter={onHover}
        onMouseLeave={onHoverOut}
      >
        <input
          type="checkbox"
          className={clsx("absolute top-4 right-4 w-4 h-4 cursor-pointer", !showCheckbox && "hidden")}
          checked={props.selected}
          onChange={onCourseSelect}
          disabled={!showCheckbox}
        />
        {props.course.coverPhoto && (
          <Image
            src={props.course.coverPhoto}
            alt="Picture of course"
            width={234}
            height={168}
            className="w-[234px] h-[168px] rounded-md"
            priority
          />
        )}
      </div>
      
      <Link href="" className="flex flex-col">
        <span className="font-bold text-headlineText mb-1">
          {props.course.name}
        </span>

        <span className="text-sm">
          {props.course.description}
        </span>
      </Link>
    </div>
  );
}
