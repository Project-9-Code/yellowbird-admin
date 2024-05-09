import { addLesson, updateLesson } from "@/actions/lesson";
import { Lesson } from "@/requests/lesson";
import { User } from "@/requests/user";
import { PropsWithChildren, useMemo } from "react";
import { v4 as uuid } from "uuid";

export default function LessonFormContainer(
  props: PropsWithChildren<{ lesson?: Lesson, courseId?: string, edit?: boolean, user: User | null }>
) {
  const { edit, user } = props;
  const courseId = props.lesson?.course?.id ?? props.courseId;
  const lessonId = useMemo(() => props.lesson?.id as string ?? uuid(), [props.lesson?.id]);
  const submit = edit ? updateLesson : addLesson;

  return (
    <form className="flex flex-col w-full grow overflow-hidden" action={submit}>
      {props.children}
      <input type="hidden" name="course" value={courseId} />
      <input type="hidden" name="id" value={lessonId} />
      <input type="hidden" name="author" value={user?.id} />
    </form>
  );
}
