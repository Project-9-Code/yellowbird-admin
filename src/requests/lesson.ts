import { Enums, Tables } from "@/database.types";
import { createClient } from "@/utils/supabase/server";
import { cache } from "react";
import { Course } from "./course";
import { User } from "./user";

export type LessonBlock = Tables<"lesson_blocks">;
export type LessonBlockTypes = Enums<"block_types">;
export type LessonInput = Partial<Tables<"lessons">>;
export type LessonBlockInput = Partial<Tables<"lesson_blocks">>;
export interface Lesson extends Omit<Tables<"lessons">, "course" | "author" | "created_by"> {
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
    .single<Lesson>();

  if (query.error) throw query.error;
  return query.data;
});
