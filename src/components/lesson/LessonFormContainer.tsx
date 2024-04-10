"use client";

import { addLesson, updateLesson } from "@/actions/lesson";
import { Course, Lesson } from "@/graphql/graphql";
import { PropsWithChildren, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { useAuth } from "../AuthProvider";

export default function LessonFormContainer(
  props: PropsWithChildren<{ lesson?: Lesson, course?: Course, edit?: boolean }>
) {
  const { edit } = props;
  const { user } = useAuth();
  const lessonId = useMemo(() => props.lesson?.id as string ?? uuid(), [props.lesson?.id]);
  const courseId = (props.lesson?.course?.id ?? props.course?.id) as string;

  const onSubmit = useMemo(() => {
    if (edit) return updateLesson.bind(null, user?.uid ?? "");
    return addLesson.bind(null, user?.uid ?? "");
  }, [user?.uid, edit]);

  return (
    <form className="flex flex-col w-full grow overflow-hidden" action={onSubmit}>
      {props.children}
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="id" value={lessonId} />
      <input type="hidden" name="authorId" value={user?.uid} />
    </form>
  );
}
