"use client";

import { Course } from "@/graphql/graphql";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import useSelectedCourseIds from "./hooks/useSelectedCourseIds";

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
  const { selectedCourseIds, setSelectedCourses } = useSelectedCourseIds();
  const selected = selectedCourseIds.includes(props.course.id);
  const showCheckbox = selectedCourseIds.length > 0 || props.selected || isHovered;
  const href = `/course/${props.course.id}`;

  const onCourseSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.checked;
    return (selected && !selectedCourseIds.includes(props.course.id)) ?
      setSelectedCourses([...selectedCourseIds, props.course.id]) :
      setSelectedCourses(selectedCourseIds.filter((id) => id !== props.course.id));
  }, [props.course.id, selectedCourseIds, setSelectedCourses]);

  console.log(props.course.name, props.course.coverPhoto)

  return (
    <div className="w-[234px] h-[252px] flex flex-col relative">
      <Link
        href={href}
        className="w-[234px] h-[168px] bg-brand mb-4 rounded-md"
        onMouseEnter={onHover}
        onMouseLeave={onHoverOut}
      >
        <input
          type="checkbox"
          className={clsx("absolute top-4 right-4 w-4 h-4 cursor-pointer", !showCheckbox && "hidden")}
          checked={selected}
          onChange={onCourseSelect}
          disabled={!showCheckbox}
        />
        {props.course.coverPhoto && props.course.coverPhoto.length > 0 && (
          <Image
            src={props.course.coverPhoto}
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
          {props.course.name}
        </span>

        <span className="text-sm">
          {props.course.description}
        </span>
      </Link>
    </div>
  );
}