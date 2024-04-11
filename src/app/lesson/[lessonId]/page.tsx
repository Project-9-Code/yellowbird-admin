import AddLessonForm from "@/components/lesson/AddLessonForm";

export default async function EditLesson(props: { params: { lessonId: string } }) {
  const { params: { lessonId } } = props;
  return <AddLessonForm lessonId={lessonId} edit />;
}
