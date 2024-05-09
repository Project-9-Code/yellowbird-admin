"use server";

import { LessonBlock, LessonBlockInput, LessonInput } from "@/requests/lesson";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

export async function addLesson(lessonData: FormData) {
  const { lesson, lessonBlocks } = await cleanLessonData(lessonData);
  const supabase = createClient();

  // Upload lesson
  const { error } = await supabase.from("lessons").insert([lesson]);
  if (error) {
    console.log("lessons insert", error);
    throw error;
  }

  // Upload lesson blocks
  const blocks = lessonBlocks.map((block) => ({ ...block, lesson: lesson.id }));
  const { error: blockError } = await supabase.from("lesson_blocks").insert(blocks as LessonBlock[]);
  if (blockError) {
    console.log("lessons update", error);
    throw blockError;
  }

  // Revalidate paths
  revalidatePath(`/course/${lesson.course}`);
  revalidatePath(`/lesson/${lesson.id}`);
};

export async function archiveLesson(lessonId: string) {
  const supabase = createClient();
  await supabase.from("lessons").update({ status: "archived" }).eq("id", lessonId);
  revalidatePath(`/lesson/${lessonId}`);
}

export async function updateLesson(lessonData: FormData) {
  const { lesson, lessonBlocks } = await cleanLessonData(lessonData);
  const supabase = createClient();

  // Update lesson
  const { data, error } = await supabase.from("lessons").upsert([lesson]);
  if (error) throw error;

  // Update lesson blocks
  const blocks = lessonBlocks.map((block) => ({ ...block, lesson: lesson.id }));
  const { error: blockError } = await supabase.from("lesson_blocks").upsert(blocks as LessonBlock[]);
  if (blockError) throw blockError;

  revalidatePath(`/lesson/${lesson.id}`);
  revalidatePath(`/course/${lesson.course}`);
  return updateLesson;
};

export async function deleteLesson(lessonId: string) {
  const supabase = createClient();
  await supabase.from("lessons").delete().eq("id", lessonId);
  revalidatePath(`/lesson/${lessonId}`);
}

function shouldParse(key: string) {
  return key === "answers" || key === "answer_options" || key === "points";
}

async function cleanLessonData(lesson: FormData, author?: string) {
  const lessonData: LessonInput = { id: lesson.get("id") as string ?? uuid(), author: author ?? null };
  let lessonBlocks: LessonBlock[] = [];

  lesson.forEach((value, key) => {
    if (key === "id") lessonData.id = value as string;
    if (key === "title") lessonData.title = value as string;
    if (key === "lesson_description") lessonData.lesson_description = value as string;
    // if (key === "tags") lessonData.tags = value as string;
    if (key === "course") lessonData.course = value as string;
    if (key === "recap") lessonData.recap = value as string;
    if (key === "author") lessonData.author = value as string;

    if (key.startsWith("lessonBlock:")) {
      const [_, blockId, blockType, blockKey] = key.split(":");
      const block = lessonBlocks?.find((block) => block?.id === blockId) as LessonBlockInput & { [key: string]: any };

      if (block) {
        block[blockKey] = (shouldParse(blockKey)) ? JSON.parse(value as string) : value;
      } else {
        lessonBlocks?.push({
          id: blockId,
          block_type: blockType,
          lesson: lessonData.id,
          [blockKey]: (shouldParse(blockKey)) ? JSON.parse(value as string) : value,
        } as LessonBlock);
      }
    }
  });

  
  const supabase = createClient();
  const imageUploads = await Promise.all((lessonBlocks.filter(
    (block) => (block?.block_type === "MEDIA" || block?.block_type === "VIDEO") && (block?.media_url as any) instanceof File
  ) as LessonBlock[]).map(async (block) => {
    const imageKey = `lessonMedia/${block.id}`;
    await supabase.storage.from("web").upload(imageKey, block.media_url as unknown as File);
    return { ...block, media_url: supabase.storage.from("web").getPublicUrl(imageKey).data?.publicUrl };
  }));

  lessonBlocks = lessonBlocks?.map((block) => {
    const uploadedBlock = imageUploads.find((uploadedBlock) => uploadedBlock.id === block?.id);
    if (uploadedBlock) return uploadedBlock;
    return block;
  });

  return { lesson: lessonData, lessonBlocks };
}
