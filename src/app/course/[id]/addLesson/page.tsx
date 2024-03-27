import { fetchCourseMeta } from "@/api/course";
import AddLessonForm from "@/components/lesson/AddLessonForm";

export default async function AddLesson({ params }: { params: { id: string } }) {
  const course = await fetchCourseMeta(params.id);

  return (
    <AddLessonForm course={course} />
  );
}
