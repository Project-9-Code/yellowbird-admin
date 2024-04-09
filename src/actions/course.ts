"use server";

import { Course } from "@/graphql/graphql";
import { request } from "graphql-request";
import { gql } from "@/graphql/gql";
import { storage, uploadFileToStorage } from "@/utils/firebase";
import { revalidatePath } from "next/cache";
import { GRAPHQL_API_URL } from "@/utils/common";
import { v4 as uuid } from "uuid";
import { deleteObject, ref } from "firebase/storage";

export const addCourse = async function addCourseAPI(course: FormData) {
  const id = uuid();
  const coverPhotoKey = `public/course/${id}/cover`;
  const name = course.get("name") as string ?? undefined;
  const coverPhoto = course.get("coverPhoto") as File ?? undefined;
  const description = course.get("description") as string ?? undefined;

  if (coverPhoto) { 
    // Upload cover photo to S3
    await uploadFileToStorage(coverPhotoKey, coverPhoto);
  }

  const { addCourse} = await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    mutation AddCourse($course: CourseInput!) {
      addCourse(course: $course) {
        id
        name
        description
      }
    }
  `), { course: { id, name, description, coverPhoto: (coverPhoto) ? coverPhotoKey : undefined } });

  const data = addCourse as Course;

  revalidatePath("/");
  return data;
};

export const archiveCourses = async function archiveCoursesAPI(courseIds: string[]) {
  await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    mutation Mutation($courseIds: [String]!) {
      bulkDeleteCourses(courseIds: $courseIds)
    }
  `), { courseIds });

  courseIds.forEach((courseId) => {
    try {
      deleteObject(ref(storage, `public/course/${courseId}/cover`));
    } catch (error) {
      console.error("Error deleting cover photo", error);
    }
  });

  revalidatePath("/");
}
