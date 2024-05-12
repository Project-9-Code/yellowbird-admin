import { ReactNode } from "react";
import Image from "next/image";
import Info from "@/svgs/grey-info.svg";
import { useSearchParams } from "next/navigation";
import { LessonBlock, Lesson } from "@/requests/lesson";

export default function LessonInfoOverlay({ lesson }: { lesson?: Lesson }) {
  return null;
  /* return (
    <Popover.Root>
      <Popover.Trigger>
        <button type="button" className="flex flex-row items-center justify-center !w-[87px] !h-[40px] bg-white px-1 py-2 border border-bordeerBg rounded-[6px] mr-[12px]">
          <Image src={Info} alt="Info Handle" className="mr-2"/>
          <span className="text-disabledText">Info</span>
        </button>
      </Popover.Trigger>
      <Popover.Content width="300px">
        <LessonInfo lesson={lesson} />
      </Popover.Content>
    </Popover.Root>
  ); */
}

function LessonInfo({ lesson }: { lesson?: Lesson }) {
  const searchParams = useSearchParams();
  const title = (lesson?.title && lesson?.title?.length > 0) ? lesson?.title : searchParams.get("title") ?? "Untitled";
  const courseName = lesson?.course?.title ??  "[No Course]";
  const authorName = lesson?.author?.full_name ?? "Unknown";
  const numOfScreens = (lesson?.lesson_blocks?.length ?? 0) + 2;
  const numOfQuestions = lesson?.lesson_blocks?.reduce((acc, block) => acc + (isQuestionBlock(block as LessonBlock) ? 1 : 0), 0) ?? 0;
  const lastUpdated = lesson?.updated_at ?? searchParams.get("lastUpdated") ?? Date.now();

  return (
    <div className="w-[300px] flex flex-col px-5">
      <h1 className="text-[20px] font-bold mb-6">{title}</h1>

      <div className="flex flex-row flex-wrap justify-between mb-5">
        <InfoItem label="Course" value={courseName} />
        <InfoItem label="Author" value={authorName} />
        <InfoItem label="No. of Screens" value={numOfScreens} />
        <InfoItem label="No. of Questions" value={numOfQuestions} />

        <span className="text-[14px] text-subtext mt-[24px]">
          Last edited: {` ${lastUpdated}`}
        </span>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label?: string; value?: ReactNode }) {
  return (
    <div className="flex flex-col w-full max-w-32 min-w-32 my-1">
      <span className="text-[12px] text-disabledText">{label}</span>
      <span className="text-[14px] text-headlineText">{value ?? "N/A"}</span>
    </div>
  );
}

function isQuestionBlock(block: LessonBlock): boolean {
  return (
    block.type === "CHOICE" ||
    block.type === "MULTI_CHOICE" ||
    block.type === "MULTI_SELECT"
  );
}
