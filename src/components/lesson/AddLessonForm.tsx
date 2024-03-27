
"use client";

import LessonHeader from "@/components/LessonHeader";
import { Course } from "@/graphql/graphql";
import LessonIntro from "./Intro";
import LessonRecap from "./Recap";
import AddLessonBlock from "./AddLessonBlock";

export default function AddLessonForm({ course }: { course: Course }) {
  return (
    <form className="flex flex-col w-full grow overflow-hidden">
      <LessonHeader course={course} />

      <div className="flex grow flex-col items-center overflow-auto">
        <LessonIntro course={course} />
        <AddLessonBlock />
        <LessonRecap />
      </div>
    </form>
  );
}
