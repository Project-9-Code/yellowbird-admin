import { Enums, Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { Course } from "./course";
import { User } from "./user";

export type Lesson = Tables<"lessons">;
export type LessonBlock = Tables<"lesson_blocks">;
export type LessonBlockTypes = Enums<"block_types">;
export interface LessonWithRelationships extends Omit<Lesson, "course" | "author" | "created_by"> {
  course: Course;
  lesson_blocks: LessonBlock[];
  author: User;
  created_by: User;
}

export const fetchLesson = cache(async function fetchLessonApi(id: string) {
  const superbase = createClient();
  const query = await superbase.from("lessons")
    .select("*, author(id, full_name, organization), course(id, title), lesson_blocks(id, lesson, block_type, media_url, screen_content, question, points, answers, answer_options)")
    .eq("id", id)
    .single<LessonWithRelationships>();

  if (query.error) throw query.error;
  console.log(query.data);
  return query.data;
});
