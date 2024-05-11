"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import useSelectedCourseIds from "./hooks/useSelectedIds";
import { Course } from "@/requests/course";

interface CourseCardProps {
  course: Course;
  selected?: boolean;
  showCheckbox?: boolean;
  onSelect?: (selected: boolean) => void;
};

export default function CourseCard(props: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const onHover = useCallback((e: MouseEvent<HTMLElement>) => setIsHovered(true), []);
  const onHoverOut = useCallback(() => setIsHovered(false), []);
  const { selectedIds, setSelectedIds } = useSelectedCourseIds();
  const selected = selectedIds.includes(props.course.id);
  const showCheckbox = selectedIds.length > 0 || props.selected || isHovered;
  const href = `/course/${props.course.id}`;

  const onCourseSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.checked;
    return (selected && !selectedIds.includes(props.course.id)) ?
      setSelectedIds([...selectedIds, props.course.id]) :
      setSelectedIds(selectedIds.filter((id) => id !== props.course.id));
  }, [props.course.id, selectedIds, setSelectedIds]);

  return (
    <div className="w-[234px] h-[252px] flex flex-col relative">
      <Link
        shallow
        href={href}
        className="w-[234px] h-[168px] bg-brand mb-4 rounded-md"
        onMouseEnter={onHover}
        onMouseLeave={onHoverOut}
      >
        <input
          id={props.course.id}
          type="checkbox"
          className={clsx("absolute top-4 right-4 w-4 h-4 cursor-pointer", !showCheckbox && "hidden")}
          checked={selected}
          onChange={onCourseSelect}
          disabled={!showCheckbox}
        />
        {props.course.cover_photo_url && props.course.cover_photo_url.length > 0 && (
          <Image
            src={props.course.cover_photo_url}
            alt="Picture of course"
            width={234}
            height={168}
            className="w-[234px] h-[168px] rounded-md"
            priority
          />
        )}
      </Link>
      
      <Link href={href} className="flex flex-col">
        <span className="font-bold text-headlineText mb-1">
          {props.course.title}
        </span>

        <span className="text-sm line-clamp-3">
          {props.course.description}
        </span>
      </Link>
    </div>
  );
}
