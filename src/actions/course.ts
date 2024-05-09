"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

export const addCourse = async function addCourseAPI(course: FormData) {
  const supabase = createClient();

  let cover_photo_url;
  const courseID = uuid();
  if (course.get("coverPhoto")) {
    const coverPhotoKey = `courseCoverPhotos/${courseID}`;
    await supabase.storage.from("web").upload(coverPhotoKey, course.get("coverPhoto") as File);
    cover_photo_url = supabase.storage.from("web").getPublicUrl(coverPhotoKey).data?.publicUrl;
  }

  const { error } = await supabase.from("courses").insert([{
    id: courseID,
    title: course.get("title") as string,
    course_description: course.get("description") as string,
    cover_photo_url
  }]);

  if (error) throw error;
  
  revalidatePath("/");
  revalidatePath("/course");
};

export const archiveCourses = async function archiveCoursesAPI(courseIds: string[]) {
  const supabase = createClient();
  const { error } = await supabase.from("courses").delete().in("id", courseIds);

  if (error) throw error;

  revalidatePath("/");
  revalidatePath("/course");
}
