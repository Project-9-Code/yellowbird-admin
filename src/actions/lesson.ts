"use server";

import { gql } from "@/graphql";
import { Lesson, LessonBlock, LessonBlockTypes } from "@/graphql/graphql";
import { GRAPHQL_API_URL } from "@/utils/common";
import { uploadFileToStorage } from "@/utils/firebase/client";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import request from "graphql-request";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";

export async function addLesson(authorId: string, lessonData: FormData) {
  const lesson = await cleanLessonData(lessonData, authorId);

  const { addLesson } = await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    mutation AddLesson($lesson: LessonInput!) {
      addLesson(lesson: $lesson) {
        id
      }
    }
  `), { lesson });

  revalidatePath(`/course/${lesson.courseId}`);
  return addLesson;
};

export async function archiveLesson(lessonId: string) {
  await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    mutation ArchiveLesson($lessonId: String!) {
      deleteLesson(lessonId: $lessonId)
    }
  `), { lessonId });

  revalidatePath(`/lesson/${lessonId}`);
}

export async function updateLesson(authorId: string, lessonData: FormData) {
  const lesson = await cleanLessonData(lessonData, authorId);

  const { updateLesson } = await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    mutation UpdateLesson($lesson: LessonUpdateInput!) {
      updateLesson(lesson: $lesson) {
        id
      }
    }
  `), { lesson });

  revalidatePath(`/lesson/${lesson.id}`);
  return updateLesson;
};

export async function deleteLesson(lessonId: string) {
  await request(GRAPHQL_API_URL, gql(/* GraphQL */`
    mutation DeleteLesson($lessonId: String!) {
      deleteLesson(lessonId: $lessonId)
    }
  `), { lessonId });

  revalidatePath(`/lesson/${lessonId}`);
}

function shouldParse(key: string) {
  return key === "answers" || key === "answer_options";
}

async function uploadToS3(block: LessonBlock) {
  return await uploadFileToStorage(`public/lesson/${block.id}/media`, block.mediaUrl as unknown as File)
    .then(async () => await getDownloadURL(ref(getStorage(), `public/lesson/${block.id}/media`)))
    .then((url) => {
      block.mediaUrl = url;
      return block;
    });
}

async function cleanLessonData(lesson: FormData, authorId?: string) {
  const lessonData: Lesson = { id: lesson.get("id") as string ?? uuid(), blocks: [], authorId };

  lesson.forEach((value, key) => {
    if (key === "id") lessonData.id = value as string;
    if (key === "title") lessonData.title = value as string;
    if (key === "description") lessonData.description = value as string;
    if (key === "tags") lessonData.tags = value as string;
    if (key === "courseId") lessonData.courseId = value as string;
    if (key === "recap") lessonData.recapDescription = value as string;
    if (key === "authorId") lessonData.authorId = value as string;

    if (key.startsWith("lessonBlock:")) {
      const [_, blockId, blockType, blockKey] = key.split(":");
      const block = lessonData.blocks?.find((block) => block?.id === blockId) as LessonBlock & { [key: string]: any };

      if (block) {
        block[blockKey] = (shouldParse(blockKey)) ? JSON.parse(value as string) : value;
      } else {
        lessonData.blocks?.push({
          id: blockId,
          type: blockType as LessonBlockTypes,
          [blockKey]: (shouldParse(blockKey)) ? JSON.parse(value as string) : value,
        } as LessonBlock);
      }
    }
  });

  const imageUploads = await Promise.all((lessonData.blocks?.filter(
    (block) => (block?.type === LessonBlockTypes.Media || block?.type === LessonBlockTypes.Video) && (block?.mediaUrl as any) instanceof File
  ) as LessonBlock[]).map(uploadToS3));

  lessonData.blocks = lessonData.blocks?.map((block) => {
    const uploadedBlock = imageUploads.find((uploadedBlock) => uploadedBlock.id === block?.id);
    if (uploadedBlock) return uploadedBlock;
    return block;
  });

  return lessonData;
}
