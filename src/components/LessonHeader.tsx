"use client";

import Image from "next/image";
import Button from "./Button";
import Info from "@/svgs/grey-info.svg";
import CloseX from "@/svgs/closeX.svg";
import Folder from "@/svgs/folder.svg";
import { Course } from "@/graphql/graphql";
import { useSearchParams } from "next/navigation";

export default function LessonHeader({ course }: { course: Course }) {
  const searchParams = useSearchParams();
  const lessonTitle = searchParams.get("title") ?? "";

  return (
    <div className="flex flex-row items-center bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.10)] sticky top-0">
      <Button
        buttonClassName="!w-[60px] !h-[72px] flex items-center justify-center bg-transparent"
        isLink
        href={`/course/${course?.id}`}
      >
        <Image src={CloseX} alt="Close" className="text-bodyText"/>
      </Button>

      <div className="flex flex-row items-center shadow-[-1px_0_0_0_rgba(0,0,0,0.05)] h-full">
        <Image src={Folder} alt="Folder" className="ml-[15px] mr-[10px]" />
        <span className="mr-[10px]">{course?.name}</span>
        <span className="mr-[10px]">/</span>
        <span className="text-disabledText">
          {lessonTitle.length > 0 ? lessonTitle : "Untitled"}
        </span>
      </div>

      <div className="flex grow h-full" />

      <div className="flex flex-row items-center mr-[56px]">
        <Button
          label={(
            <div className="flex flex-row">
              <Image src={Info} alt="Info Handle" className="mr-2"/>
              <span className="text-disabledText">Info</span>
            </div>
          )}
          buttonClassName="!w-[87px] !h-[40px] bg-white px-1 py-2 border border-bordeerBg rounded-[6px] mr-[12px]"
          textClassName="text-black"
        />
        <Button label="Submit Lesson" type="submit" buttonClassName="!w-[130px] !h-[40px]" preventDefault={false} />
      </div>
    </div>
  );
}