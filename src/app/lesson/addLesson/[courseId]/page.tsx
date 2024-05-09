import AddLessonForm from "@/components/lesson/AddLessonForm";
import { Course, fetchCourseMeta } from "@/requests/course";
import { Lesson } from "@/requests/lesson";

export default async function AddCourseLesson({ params }: { params: { courseId: string } }) {
  const course = await fetchCourseMeta(params.courseId);
  return <AddLessonForm lesson={{ course } as unknown as Lesson } />;
}
