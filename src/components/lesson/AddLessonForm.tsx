import LessonHeader from "@/components/LessonHeader";
import { Course, Lesson } from "@/graphql/graphql";
import LessonIntro from "./Intro";
import LessonRecap from "./Recap";
import ViewLessonBlocks from "./ViewLessonBlocks";
import LessonFormContainer from "./LessonFormContainer";

export default function AddLessonForm(
  { course, lesson, edit }:
  { course?: Course, lesson?: Lesson, edit?: boolean }
) {
  const courseData = course ?? lesson?.course as Course;
  return (
    <LessonFormContainer course={courseData} lesson={lesson} edit={edit}>
      <LessonHeader course={courseData} lesson={lesson} />

      <div className="flex grow flex-col items-center overflow-auto">
        <LessonIntro course={courseData} lesson={lesson} />
        <ViewLessonBlocks lesson={lesson} />
        <LessonRecap lesson={lesson} />
      </div>
    </LessonFormContainer>
  );
}
