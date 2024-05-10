"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

export const addCourse = async function addCourseAPI(course: FormData) {
  const supabase = createClient();


  let cover_photo_url;
  const courseID = uuid();
  const coverPhoto = course.get("coverPhoto");
  if (coverPhoto instanceof File && coverPhoto.size > 0) {
    const coverPhotoKey = `courseCoverPhotos/${courseID}`;
    await supabase.storage.from("web").upload(coverPhotoKey, coverPhoto);
    cover_photo_url = supabase.storage.from("web").getPublicUrl(coverPhotoKey).data?.publicUrl;
  }

  const { error } = await supabase.from("courses").insert([{
    id: courseID,
    title: course.get("title") as string,
    course_description: course.get("description") as string,
    cover_photo_url
  }]);

  if (error) throw error;
  
  revalidatePath('/(home)/course', 'page');
  revalidatePath('/(home)/course/[id]', 'page');
};

export const archiveCourses = async function archiveCoursesAPI(courseIds: string[]) {
  const supabase = createClient();
  const { error } = await supabase.from("courses")
    .update({ status: "archived" })
    .in("id", courseIds);

  if (error) throw error;

  revalidatePath('/(home)/course', 'page');
  revalidatePath('/(home)/course/[id]', 'page');
}
