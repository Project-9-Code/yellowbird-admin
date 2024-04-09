import { fetchCourseMeta } from "@/api/course";
import AddLessonForm from "@/components/lesson/AddLessonForm";

export default async function AddCourseLesson({ params }: { params: { courseId: string } }) {
  const course = await fetchCourseMeta(params.courseId);
  return <AddLessonForm course={course} />;
}
