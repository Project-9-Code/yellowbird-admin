import AddLessonForm from "@/components/lesson/AddLessonForm";

export default async function AddCourseLesson({ params }: { params: { courseId: string } }) {
  return <AddLessonForm courseId={params.courseId} />;
}
