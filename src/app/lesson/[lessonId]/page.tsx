import { fetchLesson } from "@/api/lesson";
import AddLessonForm from "@/components/lesson/AddLessonForm";

export default async function EditLesson(props: { params: { lessonId: string } }) {
  const { params: { lessonId } } = props;
  const lesson = await fetchLesson(lessonId);
  return <AddLessonForm lesson={lesson} edit />;
}
