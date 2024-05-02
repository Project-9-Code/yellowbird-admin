import { Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { Lesson, LessonWithRelationships } from "./lesson";

export interface Course extends Omit<Tables<"courses">, "created_by" | "lessons"> {
  created_by: {
    full_name: string;
  };
  lessons: LessonWithRelationships[];
};
export const fetchCourses = cache(async function fetchCoursesAPI() {
  const supabase = createClient();
  const { data, error } = await supabase.from("courses").select("*, created_by(full_name)").order("title", { ascending: true });

  if (error) throw error;

  return data;
});

export const fetchCourse = cache(async function fetchCourseAPI(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("courses")
    .select("*, lessons(id, title, lesson_order, created_at, updated_at, author(id, full_name)), created_by(id, full_name)")
    .eq("id", id)
    .maybeSingle();
  
  if (error) throw error;

  return data;
});

export const fetchCourseMeta = cache(async function fetchCourseMetaAPI(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from("courses").select("id, name").eq("id", id);
  
  if (error) throw error;

  return data;
});
