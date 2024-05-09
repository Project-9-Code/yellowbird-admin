"use client"; 

import CopyIcon from "@/svgs/copy.svg";
import ArchiveIcon from "@/svgs/archive.svg";
import Image from "next/image";
import clsx from "clsx";
import { useCallback, useTransition } from "react";
import useSelectedCourseIds from "./hooks/useSelectedIds";
import { archiveCourses } from "@/actions/course";
import { Course } from "@/requests/course";

interface ListToolbarProps {
  onCopy?: () => void;
  onSelectAll?: () => void;
  onArchive?: () => void;
  allSelected?: boolean;
  visible?: boolean;
  courses?: Course[];
}

export default function ListToolbar(props: ListToolbarProps) {
  const { setSelectedIds, selectedIds } = useSelectedCourseIds();
  const visible = selectedIds.length > 0;
  const allSelected = selectedIds.length > 0 && props.courses?.length === selectedIds.length;
  const archiveCoursesWithIds = archiveCourses.bind(null, selectedIds);
  const [isPending, startTransition] = useTransition();

  const selectAll = useCallback(() => {
    const courses = (allSelected) ? [] : props.courses?.map((course) => course.id) ?? [];
    setSelectedIds(courses);
  }, [props.courses, allSelected, setSelectedIds]);

  const onArchive = useCallback(async () => {
   startTransition(archiveCoursesWithIds);
   setSelectedIds(selectedIds.filter((id) => !selectedIds.includes(id)));
  }, [archiveCoursesWithIds, selectedIds, setSelectedIds]);

  return (
    <div className={clsx("absolute top-5 left-0 w-full flex items-center justify-center", !visible && "hidden")}>
      <div className="p-4 bg-black flex flex-row gap-x-4 rounded-lg">
        <div className="flex flex-row items-center" onClick={selectAll}>
          <input
            type="checkbox"
            checked={allSelected}
            className="h-4 w-4 cursor-pointer mr-2"
            onChange={() => (allSelected) ? setSelectedIds([]) : selectAll()}
          />
          <span className="text-white text-base">
            Select all
          </span>
        </div>

        <div className="flex flex-row items-center cursor-pointer" onClick={props.onCopy}>
          <Image src={CopyIcon} alt="Copy" className="mr-2" />
          <span className="text-white text-base">
            Copy
          </span>
        </div>

        <button type="submit" className="flex flex-row items-center cursor-pointer" onClick={onArchive}>
          <Image src={ArchiveIcon} alt="Archive" className="mr-2" />
          <span className="text-white text-base">
            Archive
          </span>
        </button>
      </div>
    </div>
  )
}