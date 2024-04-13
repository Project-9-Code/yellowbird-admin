"use client";

import { addLesson, updateLesson } from "@/actions/lesson";
import { Course, Lesson } from "@/graphql/graphql";
import { User } from "@/utils/firebase/common";
import { PropsWithChildren, useMemo } from "react";
import { v4 as uuid } from "uuid";

export default function LessonFormContainer(
  props: PropsWithChildren<{ lesson?: Lesson, course?: Course, edit?: boolean, user: User | null }>
) {
  const { edit, user } = props;
  const lessonId = useMemo(() => props.lesson?.id as string ?? uuid(), [props.lesson?.id]);
  const courseId = (props.lesson?.course?.id ?? props.course?.id) as string;
  console.log("User uuid", user?.uid)
  const submit = useMemo(() => edit ?
    updateLesson.bind(null, user?.uid ?? "") :
    addLesson.bind(null, user?.uid ?? ""),
  [edit, user?.uid]);

  return (
    <form className="flex flex-col w-full grow overflow-hidden" action={submit}>
      {props.children}
      <input type="hidden" name="courseId" value={courseId} />
      <input type="hidden" name="id" value={lessonId} />
      <input type="hidden" name="authorId" value={user?.uid} />
    </form>
  );
}
