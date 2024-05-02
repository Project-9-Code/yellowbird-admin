import AddLessonForm from "@/components/lesson/AddLessonForm";
import { Course } from "@/requests/course";
import { LessonWithRelationships } from "@/requests/lesson";

export default async function AddCourseLesson({ params }: { params: { courseId: string } }) {
  return <AddLessonForm lesson={{ course: { id: params.courseId } as unknown as Course } as unknown as LessonWithRelationships } />;
}
