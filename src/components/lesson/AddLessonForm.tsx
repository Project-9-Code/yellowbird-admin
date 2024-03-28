"use client";

import LessonHeader from "@/components/LessonHeader";
import { Course } from "@/graphql/graphql";
import LessonIntro from "./Intro";
import LessonRecap from "./Recap";
import AddLessonBlock from "./AddLessonBlock";
import LessonBlockView from "./LessonBlock";
import useLessonBlocks from "../hooks/useLessonBlocks";

export default function AddLessonForm({ course }: { course: Course }) {
  const { lessonBlocks } = useLessonBlocks();

  return (
    <form className="flex flex-col w-full grow overflow-hidden">
      <LessonHeader course={course} />

      <div className="flex grow flex-col items-center overflow-auto">
        <LessonIntro course={course} />

        {lessonBlocks.map((block, index) => (
          <div key={`${block.id}-${index}`} className="flex flex-col w-full max-w-[680px]">
            <AddLessonBlock />
            <LessonBlockView block={block} />
          </div>
        ))}

        <AddLessonBlock />
        <LessonRecap />
      </div>
    </form>
  );
}
