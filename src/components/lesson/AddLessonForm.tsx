import LessonHeader from "@/components/LessonHeader";
import LessonIntro from "./Intro";
import LessonRecap from "./Recap";
import ViewLessonBlocks from "./ViewLessonBlocks";
import LessonFormContainer from "./LessonFormContainer";
import { Lesson, fetchLesson } from "@/requests/lesson";
import { getUser } from "@/requests/user";

export default async function AddLessonForm(
  { lessonId, lesson, edit }:
  { lessonId?: string, lesson?: Lesson, edit?: boolean }
) {

  const lessonData = (lessonId) ? await fetchLesson(lessonId) : lesson;
  const user = await getUser();
  console.log(lessonData, lessonId);

  return (
    <LessonFormContainer user={user} lesson={lessonData} edit={edit}>
      <LessonHeader lesson={lessonData} />

      <div className="flex grow flex-col items-center overflow-auto">
        <LessonIntro lesson={lessonData} />
        <ViewLessonBlocks lesson={lessonData} />
        <LessonRecap lesson={lessonData} />
      </div>
    </LessonFormContainer>
  );
}
