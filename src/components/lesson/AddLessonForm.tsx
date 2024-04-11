import LessonHeader from "@/components/LessonHeader";
import { Course, Lesson } from "@/graphql/graphql";
import LessonIntro from "./Intro";
import LessonRecap from "./Recap";
import ViewLessonBlocks from "./ViewLessonBlocks";
import LessonFormContainer from "./LessonFormContainer";
import { fetchCourseMeta } from "@/requests/course";
import { fetchLesson } from "@/requests/lesson";

export default async function AddLessonForm(
  { courseId, lessonId, lesson, edit }:
  { courseId?: string, lessonId?: string, lesson?: Lesson, edit?: boolean }
) {

  const lessonData = (lessonId) ? await fetchLesson(lessonId) : lesson;
  const courseData = (courseId) ? await fetchCourseMeta(courseId) : lessonData?.course as Course;

  return (
    <LessonFormContainer course={courseData} lesson={lessonData} edit={edit}>
      <LessonHeader course={courseData} lesson={lessonData} />

      <div className="flex grow flex-col items-center overflow-auto">
        <LessonIntro course={courseData} lesson={lessonData} />
        <ViewLessonBlocks lesson={lessonData} />
        <LessonRecap lesson={lessonData} />
      </div>
    </LessonFormContainer>
  );
}
