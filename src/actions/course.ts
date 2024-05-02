"use server";

import { revalidatePath } from "next/cache";

export const addCourse = async function addCourseAPI(course: FormData) {
  

  revalidatePath("/course");
};

export const archiveCourses = async function archiveCoursesAPI(courseIds: string[]) {

  revalidatePath("/course");
}
