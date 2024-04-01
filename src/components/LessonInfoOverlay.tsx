import { Menu } from "@szhsin/react-menu";
import { ReactNode, forwardRef } from "react";
import Button from "./Button";
import Image from "next/image";
import Info from "@/svgs/grey-info.svg";
import { Course, Lesson, LessonBlock, LessonBlockTypes } from "@/graphql/graphql";
import { useSearchParams } from "next/navigation";

export default function LessonInfoOverlay({ lesson }: { lesson?: Lesson }) {
  return (
    <Menu menuButton={<InfoButton />} direction="bottom" align="end" gap={8}>
      <LessonInfo lesson={lesson} />
    </Menu>
  );
}

const InfoButton = forwardRef(function InfoButtonComponent(props, ref) {
  return (
    <Button
      {...props}
      ref={ref}
      label={(
        <div className="flex flex-row">
          <Image src={Info} alt="Info Handle" className="mr-2"/>
          <span className="text-disabledText">Info</span>
        </div>
      )}
      buttonClassName="!w-[87px] !h-[40px] bg-white px-1 py-2 border border-bordeerBg rounded-[6px] mr-[12px]"
      textClassName="text-black"
    />
  );
});

function LessonInfo({ lesson, course }: { lesson?: Lesson, course?: Course }) {
  const searchParams = useSearchParams();
  const title = lesson?.title ??  searchParams.get("title") ?? "Untitled";
  const courseName = lesson?.course?.name ??  course?.name ?? "[No Course]";
  const authorName = lesson?.author?.name ?? "Unknown";
  const numOfScreens = (lesson?.blocks?.length ?? 0) + 2;
  const numOfQuestions = lesson?.blocks?.reduce((acc, block) => acc + (isQuestionBlock(block as LessonBlock) ? 1 : 0), 0) ?? 0;
  const lastUpdated = lesson?.lastUpdated ?? searchParams.get("lastUpdated") ?? Date.now();

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
    block.type === LessonBlockTypes.Choice ||
    block.type === LessonBlockTypes.MultiChoice ||
    block.type === LessonBlockTypes.MultiSelect
  );
}
